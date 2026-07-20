import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090b",
        borderRadius: 9,
        color: "#fbbf24",
        fontSize: 34,
        fontWeight: 800,
        fontFamily: "sans-serif",
      }}
    >
      O
    </div>,
    { ...size },
  );
}
