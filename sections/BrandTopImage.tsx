import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  /**
   * @description Imagem com largura= 1300px, altura=300px. Imagem em outros tamanhos serão redimencionadas e poderão perder a qualidade.
   */
  image: ImageWidget;
  alt?: string;
}

export default function BrandTopImage({ image, alt }: Props) {
  return (
    <div class="hidden md:flex md:max-w-[1300px] md:mx-auto">
      <Image
        class="object-cover"
        src={image}
        alt={alt}
        width={1300}
        height={300}
      />
    </div>
  );
}
