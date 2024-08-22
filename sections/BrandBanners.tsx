import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface BannerList {
  image: ImageWidget;
  alt?: string;
  href?: string;
}

interface Props {
  bannersType: "Grande" | "Medio";
  /**
   * @description The description of image.
   * @maxItems 2
   */
  banners: BannerList[];
  mobile: boolean;
}

export default function BrandBanners(
  { banners = [], bannersType = "Medio", mobile = true }: Props,
) {
  return (
    <div
      class={`md:max-w-[1114px] md:w-full flex justify-between mx-auto my-9 ${
        mobile && "w-[360px] "
      }`}
    >
      {bannersType === "Medio"
        ? (
          banners.map((item) => (
            <a
              href={item.href}
              class={`bg-accent rounded-xl md:w-[493px]  h-auto ${
                item.href ? "cursor-pointer" : "cursor-default"
              } ${mobile && "w-[170px]"}`}
            >
              <Image
                class={`md:p-3 object-cover md:w-[493px]  h-auto ${
                  mobile && " p-2"
                }`}
                alt={item.alt}
                src={item.image}
                width={493}
                height={324}
              />
            </a>
          ))
        )
        : (
          <a
            href={banners[0].href}
            class={`bg-accent rounded-xl  ${
              banners[0].href ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <Image
              class="p-3 object-cover"
              alt={banners[0].alt}
              src={banners[0].image}
              width={1114}
              height={324}
            />
          </a>
        )}
    </div>
  );
}
