import Image from "next/image";

type ProductThumbProps = {
  src: string;
  alt?: string;
};

export function ProductThumb({ src, alt = "" }: ProductThumbProps) {
  return (
    <div className="thumb-media" aria-hidden={alt ? undefined : true}>
      <Image
        className="thumb-shot"
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
