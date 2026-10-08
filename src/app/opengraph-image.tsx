import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Art Engenharia Elétrica: energia solar em Santo André, do projeto à Enel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento (WhatsApp/redes): pôster do vídeo + logo + promessa. */
export default async function OG() {
  const pub = path.join(process.cwd(), "public");
  const [poster, logo] = await Promise.all([readFile(path.join(pub, "og-bg.jpg")), readFile(path.join(pub, "brand/logo-2048.png"))]);
  const src = (b: Buffer, t: string) => `data:${t};base64,${b.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0A0E13" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src(poster, "image/jpeg")} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg, rgba(10,14,19,0.95) 0%, rgba(10,14,19,0.7) 55%, rgba(10,14,19,0.2) 100%)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", color: "#F7F5F0", width: 820 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(logo, "image/png")} alt="" width={300} height={76} />
          <div style={{ marginTop: 40, fontSize: 60, fontWeight: 800, lineHeight: 1.02, display: "flex", flexDirection: "column" }}>
            <span>Energia solar em Santo André.</span>
            <span style={{ color: "#F5A524" }}>Do projeto à Enel.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#A7B1BE", display: "flex" }}>Nota 4,9 no Google · 42 avaliações</div>
        </div>
      </div>
    ),
    size,
  );
}
