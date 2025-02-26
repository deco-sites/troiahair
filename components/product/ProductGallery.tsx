import { Head } from "$fresh/runtime.ts";
import { PageInfo, Product } from "apps/commerce/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import { Format } from "../../components/search/SearchResult.tsx";
import Spinner from "../../components/ui/Spinner.tsx";
import ShowMore from "../../islands/ShowMore.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  pageInfo: PageInfo;
  offset: number;
  layout?: {
    columns?: Columns;
    format?: Format;
  };
  url: URL;
  whatsappNumber: number;
  imageNotFound: string;
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

function ProductGallery({
  products,
  pageInfo,
  layout,
  offset,
  url,
  whatsappNumber,
  imageNotFound,
}: Props) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  const nextPage = pageInfo.nextPage
    ? new URL(pageInfo.nextPage, url.href)
    : null;
  const partialUrl = nextPage ? new URL(nextPage.href) : null;
  if (pageInfo.nextPage && nextPage) {
    partialUrl?.searchParams.set("partial", "true");
  }

  return (
    <div class="w-full">
      {
        /* {layout?.format == "Show More" && (
        <Head>
          {pageInfo.nextPage && <link rel="next" href={pageInfo.nextPage} />}
          {pageInfo.previousPage && (
            <link rel="prev" href={pageInfo.previousPage} />
          )}
        </Head>
      )} */
      }
      <div
        class={`grid ${mobile} justify-center items-center ${desktop} lg:gap-10 gap-3`}
      >
        {products?.map((product, index) => (
          <ProductCard
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            platform={platform}
            whatsappNumber={whatsappNumber}
            imageNotFound={imageNotFound}
          />
        ))}
      </div>
      {
        /* {layout && layout?.format === "Show More" && (
        <>
          <ShowMore pageInfo={pageInfo}>
            {partialUrl && (
              <div>
                <div class="mt-2">
                  <Spinner size={24} />
                </div>
                <button
                  id={`show-more-button-${pageInfo.currentPage}`}
                  class="btn cursor-pointer hidden w-0 h-0 absolute"
                  {...usePartialSection({
                    href: partialUrl.href,
                    mode: "append",
                  })}
                >
                  Show More
                </button>
              </div>
            )}
          </ShowMore>
        </>
      )} */
      }
    </div>
  );
}

export default ProductGallery;
