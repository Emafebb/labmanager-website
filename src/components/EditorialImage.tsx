type EditorialImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high";
};

export default function EditorialImage({
  src,
  alt,
  loading = "lazy",
  ...props
}: EditorialImageProps) {
  return (
    // shortcut: requires 400/800 px WebP siblings; regenerate them when replacing an original.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt}
      src={src}
      srcSet={`${src.replace(".webp", "-400.webp")} 400w, ${src.replace(".webp", "-800.webp")} 800w, ${src} ${props.width}w`}
      loading={loading}
      decoding="async"
    />
  );
}
