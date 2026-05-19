import Image from "next/image";
import Link from "next/link";

type Props = {
  size?: number;
  textSize?: string;
  variant?: "transparent" | "fill";
};

export const Logo = ({ size = 40, textSize = "text-xl", variant = "transparent" }: Props) => {
  const width = size * 2;

  return (
    <Link href="/" className="flex items-center gap-3">
      {variant === "fill" ? (
        <div
          className="flex items-center justify-center rounded-xl bg-white p-1.5"
          style={{ width: width + 12, height: width + 12 }}
        >
          <Image
            src="/icons/logo-transparent.webp"
            alt="ScanNow"
            width={width}
            height={width}
            className="object-contain"
          />
        </div>
      ) : (
        <Image
          src="/icons/logo-transparent.webp"
          alt="ScanNow"
          width={width}
          height={width}
          className="object-contain"
        />
      )}
      <span className={`font-black tracking-tighter uppercase ${textSize}`}>Scan Now</span>
    </Link>
  );
};
