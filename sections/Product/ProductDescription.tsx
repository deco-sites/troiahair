import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

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

function ProductDescription({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Detalhes do produto não encontrado");
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
  const { price = 0, listPrice } = useOffer(offers);

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

  return (
    <div class="flex flex-col  max-w-[1300px]" id={id}>
      {/* Description card */}
      <div class="mt-[14px] sm:mt-6">
        <span class="text-sm">
          {description && (
            <div
              class="ml-2 text-[12px] text-primary h-[97px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default ProductDescription;
