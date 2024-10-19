import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @title Título
   * @description Texto opcional que aparece em cima da Imagem */
  title?: string;
  /**
   * @title Subtitulo
   * @description Texto opcional que aparece em cima da Imagem e abaixo do titulo */
  subtitle?: string;
  /**
   * @title Imagem desktop
   * @description Tamanho da Imagem (largura: 1300px altura: 195px) */
  desktop: ImageWidget;
  /**
   * @title Imagem Mobile
   * @description Tamanho da Imagem (largura: 360px altura: 120px) */
  mobile: ImageWidget;
  /** @description Descrição de acessibilidade e SEO */
  alt?: string;
  /** @title Link */
  href?: string;
}

export default function LongBanner({
  mobile =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
  desktop =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
  alt = "a",
  title = "",
  subtitle = "",
}: Props) {
  return (
    <div class="mx-auto max-w-[1300px] max-h-[195px] relative mt-8 lg:mt-0">
      <div class="container flex flex-col items-center justify-center sm:items-start  w-full absolute top-10 left-7 z-10">
        {title && (
          <p>
            <span class="text-3xl font-medium text-primary">{title}</span>
          </p>
        )}
        {subtitle && (
          <p>
            <span class="text-xl font-medium text-primary">{subtitle}</span>
          </p>
        )}
      </div>
      <Picture>
        <Source
          class=" object-cover object-top h-[120px]"
          src={mobile}
          width={360}
          height={120}
          media="(max-width: 767px)"
        />
        <Source
          class=" object-cover object-top h-[195px]"
          src={desktop}
          width={1300}
          height={195}
          media="(min-width: 767px)"
        />
        <img
          class="w-full h-[120px] md:h-[195px] mx-auto"
          src={desktop}
          alt={alt}
        />
      </Picture>
    </div>
  );
}
