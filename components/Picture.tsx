import images from "@/content/images.json";

export type ImageId = keyof typeof images;

type Props = {
  id: ImageId;
  alt: string;
  sizes: string;
  className?: string;
  // Above the fold: load at once. Only the LCP image also gets high fetch
  // priority (seo_rule.md, rule 5); the hero sets that one itself.
  eager?: boolean;
  style?: React.CSSProperties;
};

// Responsive <picture> fed by the build-time manifest (scripts/build-images.mjs).
// Width and height come from the manifest so the browser reserves space.
export default function Picture({ id, alt, sizes, className, eager = false, style }: Props) {
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
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}
