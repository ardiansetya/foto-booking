import { NextResponse } from "next/server";

interface DriveFile {
  id: string;
  name: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get("f");

  if (!folderId || !/^[\w-]+$/.test(folderId)) {
    return NextResponse.json({ error: "invalid_folder" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  try {
    const files: DriveFile[] = [];
    let pageToken: string | undefined;

    do {
      const params = new URLSearchParams({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "nextPageToken,files(id,name)",
        pageSize: "1000",
        key: apiKey,
      });
      if (pageToken) params.set("pageToken", pageToken);

      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
      );
      if (!res.ok) {
        return NextResponse.json({ error: "drive_error" }, { status: 502 });
      }
      const data: { nextPageToken?: string; files?: DriveFile[] } =
        await res.json();
      files.push(...(data.files ?? []));
      pageToken = data.nextPageToken;
    } while (pageToken);

    files.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true }),
    );

    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ error: "drive_error" }, { status: 502 });
  }
}
