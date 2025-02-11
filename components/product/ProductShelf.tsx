import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCard from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import Rating from "../daisy/Rating.tsx";
import type { Props as ratingProps } from "../daisy/Rating.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  /** @hide */
  layout?: {
    // numberOfSliders?: {
    //   mobile?: 1 | 2 | 3 | 4 | 5;
    //   desktop?: 1 | 2 | 3 | 4 | 5;
    // };
    showArrows?: false;
  };
  // rating?: ratingProps;
  whatsappNumber: number;

  /** @description  Imagem que será usada quando não tem imagem na VNDA*/
  imageNotFound: ImageWidget;
}

function ProductShelf({
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
  const slideDesktop = {
    1: "md:w-4/5",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  return (
    <div class="md:max-w-[1300px] w-screen py-12 flex flex-col gap-6  mx-auto">
      <div class="flex flex-col items-center pb-5">
        <h2 class="text-2xl text-primary font-bold pb-2">{title}</h2>
        <p class="text-base text-neutral">{description}</p>
      </div>

      <div id={id} class=" h-auto ">
        <Slider class="md:max-w-[1300px] w-screen carousel carousel-center sm:carousel-end mx-auto">
          <div class="flex gap-5 mx-auto p-5 overflow-x-auto custom-scroll">
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

        {
          /* {layout?.showArrows && (
          <div class="flex justify-between ">
            <div class="relative block z-10">
              <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center text-primary">
                <Icon size={24} id="ChevronLeft" strokeWidth={3} class="w-5" />
              </Slider.PrevButton>
            </div>
            <div class="relative block z-10">
              <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center text-primary">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </div>
        )} */
        }
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
  );
}

export default ProductShelf;
