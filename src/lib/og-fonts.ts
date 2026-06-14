import { readFileSync } from "node:fs";
import { join } from "node:path";

const fontsDir = join(process.cwd(), "public", "fonts");

function readFont(name: string, extensions: string[]): ArrayBuffer {
  for (const ext of extensions) {
    try {
      return readFileSync(join(fontsDir, `${name}.${ext}`)).buffer;
    } catch {
      // Try next extension
    }
  }
  throw new Error(`Failed to load font: ${name} (tried ${extensions.join(", ")})`);
}

export interface ReferralFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal" | "italic";
}

export function loadReferralFonts(): ReferralFont[] {
  const interRegular = readFont("Inter-Regular", ["woff", "ttf"]);
  const interBold = readFont("Inter-Bold", ["woff", "ttf"]);
  const neoSansBold = readFont("NeoSans-Bold", ["woff", "ttf"]);
  const instrumentSerif = readFont("InstrumentSerif-Regular", ["ttf", "woff"]);

  return [
    { name: "Inter", data: interRegular, weight: 400, style: "normal" },
    { name: "Inter", data: interBold, weight: 700, style: "normal" },
    { name: "All Neo Sans", data: neoSansBold, weight: 700, style: "normal" },
    { name: "Instrument Serif", data: instrumentSerif, weight: 400, style: "normal" },
  ];
}
