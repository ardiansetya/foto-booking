import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidToken } from "@/lib/adminAuth";

export const runtime = "nodejs";

// Client-side direct upload token endpoint. Outside /api/admin so the
// Blob completion callback (unauthenticated) is not blocked by middleware;
// the token request itself is authed here via the admin cookie.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const raw = request.headers.get("cookie") ?? "";
        const entry = raw
          .split(";")
          .map((c) => c.trim())
          .find((c) => c.startsWith(`${ADMIN_COOKIE}=`));
        const cookie = entry
          ? decodeURIComponent(entry.slice(ADMIN_COOKIE.length + 1))
          : undefined;
        if (!(await isValidToken(cookie))) {
          throw new Error("Not authorized");
        }
        return {
          allowedContentTypes: ["image/webp", "image/jpeg", "image/png"],
          addRandomSuffix: false,
          maximumSizeInBytes: 15 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // Manifest is updated by the client via /api/admin/photo (POST).
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    const message = (error as Error).message;
    return NextResponse.json(
      { error: message },
      { status: message === "Not authorized" ? 401 : 400 },
    );
  }
}
