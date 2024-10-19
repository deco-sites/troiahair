import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface BannerItem {
  /**
   * @description Nome do elemento que irá aparecer na lista do admin
   */
  label?: string;
  /** @title Link */
  href: string;
  /**
   * @title Link
   * @description Tamanho do Banner (comprimento: 300px, largura: 320px)
   */
  banner: ImageWidget;
  /**
   * @description Descrição de acessibilidade e SEO
   */
  alt?: string;
}

export interface LongBanner {
  /** @title Link */
  href: string;
  /**
   * @title Imagem
   * @description Tamanho do Banner (comprimento: 300px, largura: 320px)
   */
  banner: ImageWidget;
  /**
   * @description Descrição de acessibilidade e SEO
   */
  alt?: string;
}

interface Props {
  /**
   * @title Tipo de Banner
   * @description Escolher entre banner único grande ou 4 banners Pequenos
   */
  bannerType: "Banner Grande" | "Lista de banners";
  /**
   * @title Lista de Banners Pequenos
   * @minItems 4
   * @maxItems 4
   */
  bannerList?: BannerItem[];
  /** @title Banner Grande */
  wideBanner?: LongBanner;
}

export default function Section({ bannerList, wideBanner, bannerType }: Props) {
  return (
    <>
      {bannerType === "Lista de banners" && (
        <div class="flex gap-6 md:max-w-[1300px] mx-auto p-4 overflow-x-auto ">
          <div className="flex gap-6">
            {bannerList?.map((item) => (
              <div class="w-[300px] h-[320px] ">
                <a href={item.href}>
                  <Image
                    class="rounded-lg object-cover"
                    src={item.banner || ""}
                    width={300}
                    height={320}
                    alt={item.alt}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      {bannerType === "Banner Grande" && (
        <div class="md:w-[1300px]  md:mx-auto w-screen pt-4 pb-4 md:px-auto">
          <a href={wideBanner?.href}>
            <Image
              class="md:rounded-lg object-cover"
              src={wideBanner?.banner || ""}
              width={1300}
              height={320}
              alt={wideBanner?.alt}
            />
          </a>
        </div>
      )}
    </>
  );
}
