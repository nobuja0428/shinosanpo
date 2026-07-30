import type { ImageDisclosure } from "@/content";
import { withBasePath } from "@/config/site";

export function MediaImage({
  image,
  eager = false
}: {
  image: ImageDisclosure;
  eager?: boolean;
}) {
  return (
    <figure className="mediaFigure">
      <div className="imageFrame">
        {/* next/imageを使わず、静的exportで予測可能なパスと寸法を保持する */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath(image.src)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
        {image.kind === "ai-image" && <span className="imageLabel">{image.label}</span>}
      </div>
      {image.kind === "ai-image" && (
        <figcaption>AI生成画像を使用しています。実景とは異なる場合があります。</figcaption>
      )}
    </figure>
  );
}
