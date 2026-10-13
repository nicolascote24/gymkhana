import images from "@/content/images.json";

export type ImageId = keyof typeof images;

type Props = {
  id: ImageId;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

// Responsive <picture> fed by the build-time manifest (scripts/build-images.mjs).
// Width and height come from the manifest so the browser reserves space.
export default function Picture({ id, alt, sizes, className, priority = false, style }: Props) {
  const img = images[id] as {
    width: number;
    height: number;
    fallback: string;
    sources: { avif: { src: string; w: number }[]; webp: { src: string; w: number }[] };
  };
  const set = (list: { src: string; w: number }[]) => list.map((s) => `${s.src} ${s.w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={set(img.sources.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={set(img.sources.webp)} sizes={sizes} />
      <img
        src={img.fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        className={className}
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
      />
    </picture>
  );
}
