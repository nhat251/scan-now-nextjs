import sharp from "sharp";

export async function loadImageAsPngDataUrl(url: string, size?: number): Promise<string> {
  const buffer = await (async () => {
    if (url.startsWith("data:")) {
      return Buffer.from(url.split(",")[1], "base64");
    }
    if (url.startsWith("http")) {
      const ab = await fetch(url).then((r) => r.arrayBuffer());
      return Buffer.from(new Uint8Array(ab));
    }
    return await readLocalFile(url);
  })();

  let pipeline = sharp(buffer);
  if (size) {
    pipeline = pipeline.resize(size, size, { fit: "cover" });
  }
  const pngBuffer = await pipeline.png({ quality: 85, compressionLevel: 9 }).toBuffer();
  return `data:image/png;base64,${pngBuffer.toString("base64")}`;
}

async function readLocalFile(path: string): Promise<Uint8Array> {
  const { readFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  return new Uint8Array(readFileSync(join(process.cwd(), "public", path)));
}
