import { ImageWidget } from "apps/admin/widgets.ts";

import Image from "apps/website/components/Image.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../components/Analytics.tsx";
import ProductCard from "../components/product/ProductCard.tsx";
import Icon from "../components/ui/Icon.tsx";
import Slider from "../components/ui/Slider.tsx";
import { clx } from "../sdk/clx.ts";
import { useId } from "../sdk/useId.ts";
import { useOffer } from "../sdk/useOffer.ts";
import { usePlatform } from "../sdk/usePlatform.tsx";

interface Props {
  /** @description Tamanho do banner  largura: 280px altura: 310px*/
  brandBanner: ImageWidget;
  alt: string;
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    // numberOfSliders?: {
    //   mobile?: 1 | 2 | 3 | 4 | 5;
    //   desktop?: 1 | 2 | 3 | 4 | 5;
    // };
    showArrows?: boolean;
  };

  whatsappNumber: number;

  /** @description  Imagem que será usada quando não tem imagem na VNDA*/
  imageNotFound: ImageWidget;
}

export default function Section({
  brandBanner,
  alt,
  products,
  title,
  description,
  layout,
  whatsappNumber,
  imageNotFound,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  return (
    <div class="hidden lg:flex flex-col max-w-[1300px] mx-auto mb-12 ">
      <div class="flex flex-col items-center pb-5">
        <h2 class="text-2xl text-primary font-bold pb-2 uppercase">{title}</h2>
        <p class="text-base text-neutral">{description}</p>
      </div>
      <div class="flex items-center">
        <Image
          class="object-contain w-[280px] h-[412px] rounded-lg mt-3"
          alt={alt || ""}
          src={brandBanner}
          width={280}
          height={412}
          fit="contain"
        />
        <div class="flex-grow max-w-[1000px]  flex flex-col gap-6  mx-auto">
          <div id={id} class=" h-auto pt-2    ">
            <Slider class="md:max-w-[1000px] w-screen overflow-x-auto carousel carousel-center sm:carousel-end mx-auto">
              <div class="flex gap-5 mx-auto px-5">
                {products?.map((product, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item justify-center ml-4 first:ml-0 "
                    // slideDesktop[layout?.numberOfSliders?.desktop ?? 2],
                    // slideMobile[layout?.numberOfSliders?.mobile ?? 5],
                  >
                    <div>
                      <ProductCard
                        product={product}
                        itemListName={title}
                        platform={platform}
                        index={index}
                        whatsappNumber={whatsappNumber}
                        imageNotFound={imageNotFound}
                      />
                    </div>
                  </Slider.Item>
                ))}
              </div>
            </Slider>

            {layout?.showArrows && (
              <div class="flex justify-between ">
                <div class="relative block z-10">
                  <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center text-primary">
                    <Icon
                      size={24}
                      id="ChevronLeft"
                      strokeWidth={3}
                      class="w-5"
                    />
                  </Slider.PrevButton>
                </div>
                <div class="relative block z-10">
                  <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center text-primary">
                    <Icon size={24} id="ChevronRight" strokeWidth={3} />
                  </Slider.NextButton>
                </div>
              </div>
            )}
            <Slider.JS rootId={id} />
            <SendEventOnView
              id={id}
              event={{
                name: "view_item_list",
                params: {
                  item_list_name: title,
                  items: products.map((product, index) =>
                    mapProductToAnalyticsItem({
                      index,
                      product,
                      ...useOffer(product.offers),
                    })
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
