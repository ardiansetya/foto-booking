import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Omegraduation - Jasa Foto Wisuda & Wedding Profesional";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#09090b",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#fbbf24",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        Fotografi Wisuda & Wedding
      </div>
      <div
        style={{
          display: "flex",
          color: "#fafafa",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -2,
          marginBottom: 24,
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          display: "flex",
          color: "#a1a1aa",
          fontSize: 32,
          maxWidth: 800,
        }}
      >
        Momen berharga, kualitas sinematik. Area Solo, Semarang, Jogja,
        Salatiga, Kudus.
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 12,
          background: "#fbbf24",
          display: "flex",
        }}
      />
    </div>,
    { ...size },
  );
}
