export async function loadImageAsPngDataUrl(url: string): Promise<string> {
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

  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function readLocalFile(path: string): Promise<Uint8Array> {
  const { readFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  return new Uint8Array(readFileSync(join(process.cwd(), "public", path)));
}
