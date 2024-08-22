import { SendEventOnView } from "../../components/Analytics.tsx";
//import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import AddToCartButtonVNDA from "../../islands/AddToCartButton/vnda.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ShippingSimulation from "../../islands/ShippingSimulation.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";

import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductDescription from "../../components/product/ProductDescription.tsx";
import Image from "apps/website/components/Image.tsx";
import Breadcrumb from "../ui/Breadcrumb.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  console.log("product info", product);
  

  return (
    <div class="flex flex-col  max-w-[1300px]" id={id}>
      {/* Code and name */}

      <div class=" bg-primary flex items-center justify-center">
        <span class="font-bold text-2xl uppercase text-accent text-center block py-8 mx-auto my-auto md:w-[1300px] w-screen mt-8 lg:mt-0">
          {layout?.name === "concat"
            ? `${isVariantOf?.name} ${name}`
            : layout?.name === "productGroup"
            ? isVariantOf?.name
            : name}
        </span>
      </div>

      <div class="flex md:mx-6 mt-8 sm:mt-8 flex-col lg:flex-row ">
        <ImageGallerySlider page={page} />
        <div class=" flex flex-col lg:pl-10 md:w-1/2 mt-4 lg:mt-0 w-screen p-4 lg:p-0">
          <Breadcrumb itemListElement={breadcrumb.itemListElement} />
          <div class=" flex flex-col ">
            <div class="flex gap-3">
              {gtin && (
                <span class="text-[9px] font-bold text-primary">
                  Cod. {gtin}
                </span>
              )}
              <span class="uppercase h-[12px] btn btn-primary min-h-0 text-[9px] text-white text-normal">
                TAG
              </span>
            </div>
          </div>

          {/* Avaliador */}

          <div class="flex gap-[15px] pt-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                alt="icone de estrela para avaliar o produto"
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/691a294e-1d0b-4195-b3b9-21a46c9b3214"
                width={18}
                height={18}
              />
            ))}
          </div>

          {/* Prices */}
          <div class="mt-4">
            <div class="flex flex-row gap-2 items-center">
              {(listPrice ?? 0) > price && (
                <span class="line-through text-base-300 text-xl">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              )}
              <span class="font-bold text-3xl text-primary">
                {formatPrice(price, offers?.priceCurrency)}
              </span>
            </div>
            <span class="text-sm text-base-300">{installments}</span>
          </div>

          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6">
            <ProductSelector product={product} />
          </div>

          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-2 w-full h-[64px]">
            {availability === "https://schema.org/InStock" ? (
              <>
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                  variantStyle="productPage"
                  showCounter={true}
                />
               
              </>
            ) : (
              // <OutOfStock productID={productID} />
              <p class="text-primary text-semibold">Produto Indisponível.</p>
            )}
          </div>
          {/* Shipping Simulation */}
          <div class="mt-8">
            <ShippingSimulation
              skuId={product.sku}
              // items={[
              //   {
              //     id: Number(product.sku),
              //     quantity: 1,
              //     seller: seller,
              //   },
              // ]}
            />
          </div>
          {/* Description card */}
          <div class="mt-[14px] sm:mt-6">
            <span class="text-sm">
              {description && (
                // <details>
                //   <summary class="cursor-pointer">Descrição</summary>
                //   <div
                //     class="ml-2 mt-2"
                //     dangerouslySetInnerHTML={{ __html: description }}
                //   />
                // </details>
                <div
                  class="ml-2 text-[12px] text-primary h-[97px] overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </span>
          </div>

          {/* Analytics Event */}
          <SendEventOnView
            id={id}
            event={{
              name: "view_item",
              params: {
                item_list_id: "product",
                item_list_name: "Product",
                items: [eventItem],
              },
            }}
          />
        </div>
      </div>
      {/* <ProductDescription /> */}
    </div>
  );
}

export default ProductInfo;
