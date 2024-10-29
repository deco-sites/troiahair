import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
// import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";

import AddToCartButtonVNDA from "../../islands/AddToCartButton/vnda.tsx";

//import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  imageNotFound: string;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;
  whatsappNumber: number;

  platform?: Platform;
}

const WIDTH = 143;
const HEIGHT = 130;

function ProductCard({
  product,
  preload,
  itemListName,
  whatsappNumber,
  imageNotFound,
  platform,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  // const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  // const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  // const possibilities = useVariantPossibilities(hasVariant, product);
  // const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  return (
    <div id={id} data-deco="view-product" class="card card-compact group ">
      <div class="">
        {/* Add click event to dataLayer */}
        <SendEventOnClick
          id={id}
          event={{
            name: "select_item" as const,
            params: {
              item_list_name: itemListName,
              items: [eventItem],
            },
          }}
        />

        <div class="flex flex-col hover:transform hover:-translate-y-2 lg:mt-2 mt-8 h-[412px] w-[275px] border border-secondary rounded-lg px-2 pt-[5px]">
          {/* Wishlist button */}
          <div class="flex justify-between items-center w-full pb-3">
            {/* Discount % */}
            {listPrice && price ? (
              <div class="w-[44px] h-[13px] bg-primary rounded flex flex-col items-center ">
                <span class="font-bold text-[9px] text-white">
                  {listPrice && price
                    ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
                    : ""}
                </span>
              </div>
            ) : (
              ""
            )}

            <a
              href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Gostaria de mais informações sobre o produto ${name} https://troiahair.deco.site${relativeUrl}`}
              target="blank"
            >
              <Image
                alt="icone de whatsapp"
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/588fa64d-c23a-43a5-a77e-c4be6d748e74"
                width={20}
                height={20}
                class="hover:scale-125"
              />
            </a>
          </div>

          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
            class={clx(
              " w-[255px] h-[222px] mb-2",
              "grid grid-cols-1 grid-rows-1"
            )}
          >
            <Image
              src={front?.url || imageNotFound}
              alt={front.alternateName}
              width={255}
              height={222}
              style={{ aspectRatio }}
              class={clx(
                "object-cover",
                "rounded w-[255px] h-[222px]",
                "col-span-full row-span-full",
                "transition-opacity opacity-100 lg:group-hover:opacity-0"
              )}
              // sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
            <Image
              src={back?.url || front.url! || imageNotFound}
              alt={back?.alternateName ?? front.alternateName}
              width={255}
              height={222}
              style={{ aspectRatio }}
              class={clx(
                "object-cover",
                "rounded w-[255px] h-[222px]",
                "col-span-full row-span-full",
                "transition-opacity opacity-0 lg:group-hover:opacity-100"
              )}
              // sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* SKU Selector */}
          {/* <ul class="flex items-center justify-center gap-2">
          {variants
            .map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link}>
                  <Avatar
                    content={value}
                    variant={
                      link === relativeUrl
                        ? "active"
                        : link
                        ? "default"
                        : "disabled"
                    }
                  />
                </a>
              </li>
            ))}
        </ul> */}

          {/* Name/Description */}
          <div class="flex flex-col pt-3">
            <h2
              class="font-bold text-[10px] text-neutral text-center h-12 pb-2"
              dangerouslySetInnerHTML={{ __html: name ?? "" }}
            />

            {/* <div
            class="truncate text-xs"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          /> */}
          </div>

          {/* Price from/to */}
          <div class="flex gap-2 items-center justify-center  pb-1 ">
            <span class="line-through text-sm text-primary">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
            <span class="font-bold  text-primary text-center text-[20px]">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>
          <div class="flex flex-col gap-2 justify-betweem mx-auto">
            <AddToCartButtonVNDA
              eventParams={{ items: [eventItem] }}
              productID={productID}
              // additionalProperty={additionalProperty}
              additionalProperty={[]}
              variantStyle="productCard"
            />
            <a
              href={relativeUrl}
              aria-label="view product"
              class="font-semibold uppercase btn btn-accent p-0 w-[153px] h-[18px] text-[8.5px] text-primary rounded-md min-h-0"
            >
              Ver produto
            </a>
          </div>
        </div>
      </div>
      {/* Installments */}
      {/* <span class="text-[7px] text-primary  text-center pt-[9px]">
        ou {installments}
      </span> */}
    </div>
  );
}

export default ProductCard;
