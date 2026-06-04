import Image from "next/image";

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={40}
      height={40}
      className={`w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-200 ease-out ${className}`}
      aria-hidden="true"
    />
  );
}
