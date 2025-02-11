import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

interface Props {
  /**
   * @description Imagem com largura= 1300px, altura=300px. Imagem em outros tamanhos serão redimencionadas e poderão perder a qualidade.
   */
  image: ImageWidget;
  /**
   * @description Imagem com largura= 430px, altura=200px.
   */
  imageMobile: ImageWidget;
  alt?: string;
}

export default function DirectTopImage({ image, alt, imageMobile }: Props) {
  return (
    <div class="flex justify-center w-full max-w-[1300px] mx-auto mt-12 lg:mt-0">
      <Picture>
        <Source
          class=" object-cover"
          src={imageMobile}
          width={430}
          height={150}
          media="(max-width: 767px)"
        />
        <Source
          class=" object-cover mx-auto"
          src={image}
          width={1300}
          height={300}
          media="(min-width: 767px)"
        />
        <img class="w-full mx-auto" src={image} alt={alt} />
      </Picture>
    </div>
  );
}
