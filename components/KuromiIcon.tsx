import Image from 'next/image';

export default function KuromiIcon({ size = 24 }: { size?: number }) {
  return (
    <Image
      src="/kuromi-icon.png"
      alt="Kuromi"
      width={size}
      height={size}
      className="object-contain"
      priority
    />
  );
}
