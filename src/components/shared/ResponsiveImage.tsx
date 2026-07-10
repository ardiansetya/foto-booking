import Image, { type ImageProps } from "next/image";

interface ResponsiveImageProps extends Omit<ImageProps, "placeholder"> {
  fallbackBlur?: boolean;
}

// Transparent 1x1 pixel WebP as default blur placeholder
const TRANSPARENT_PIXEL =
  "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSbwABc6ANEgA/wG0AAAAANwAAQD///8A";

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className,
  sizes,
  ...props
}: ResponsiveImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      priority={priority}
      sizes={
        sizes ||
        (fill
          ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          : undefined)
      }
      className={`object-cover ${className || ""}`}
      placeholder="blur"
      blurDataURL={TRANSPARENT_PIXEL}
      {...props}
    />
  );
}
