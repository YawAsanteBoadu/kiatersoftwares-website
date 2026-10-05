import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "KAiTER Softwares — We Turn Business Challenges Into Digital Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = await readFile(path.join(process.cwd(), "public/images/brand/kaiter-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #070c1d 0%, #0d152d 60%, #0a4f17 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img src={markSrc} width={88} height={88} alt="" />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          KA<span style={{ color: "#01ed03" }}>i</span>TER Softwares
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
          <span>We Turn Business Challenges Into</span>
          <span style={{ color: "#01ed03" }}>Digital Systems.</span>
        </div>
        <div style={{ fontSize: 30, color: "#cfd6e6" }}>We Don&apos;t Just Build. We Understand. We Transform.</div>
      </div>
    </div>,
    size,
  );
}
