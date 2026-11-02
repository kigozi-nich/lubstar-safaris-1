import Image from "next/image";

export function LogoMark({ size = 40 }: { size?: number }) {
  return <Image src="/logo-mark.svg" alt="" width={size} height={size} priority />;
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-xl uppercase tracking-[0.25em] ${light ? "text-white" : "text-stone-900"}`}
        >
          Lubstar
        </span>
        <span
          className={`mt-1 text-[10px] uppercase tracking-[0.5em] ${light ? "text-amber-300" : "text-amber-700"}`}
        >
          Safaris
        </span>
      </span>
    </span>
  );
}
