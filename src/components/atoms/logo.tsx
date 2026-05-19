import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";

import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  textSize?: string;
  fill?: boolean;
};

export const Logo = async ({ size = 40, textSize = "text-xl", fill = false }: Props) => {
  const width = size * 2;
  const locale = await getLocale();
  return (
    <Link href={`/${locale}`} className="flex items-center gap-3">
      <div
        className={cn("flex items-center justify-center rounded-md p-1.5", fill && "bg-white")}
        style={{ width: width, height: width }}
      >
        <Image
          src="/icons/logo-transparent.webp"
          alt="ScanNow"
          width={width}
          height={width}
          className="object-contain"
        />
      </div>
      <span className={`text-primary-container font-black tracking-tighter uppercase ${textSize}`}>
        Scan Now
      </span>
    </Link>
  );
};
