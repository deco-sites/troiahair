import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  /** @title Nome da Categoria */
  /** @description Preencher o nome da categoria e a Descrição ajuda o SEO */
  title?: string;
  description?: HTMLWidget;

  layout?: Layout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  whatsappNumber: number;
  imageNotFound: ImageWidget;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Não encontramos nenhum produto, tente novamente!</span>
    </div>
  );
}

function Result({
  title,
  description,
  page,
  layout,
  startingPage = 0,
  url: _url,
  whatsappNumber,
  imageNotFound,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;

  return (
    <>
      <div class=" max-w-[1300px] px-4 sm:py-10 mx-auto mb-4">
        {(isFirstPage || !isPartial) && (
          <SearchControls
            sortOptions={sortOptions}
            filters={filters}
            breadcrumb={breadcrumb}
            displayFilter={layout?.variant === "drawer"}
          />
        )}

        <div class="flex flex-row">
          {layout?.variant === "aside" &&
            filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="lg:pl-8 mx-auto">
            <div class="mt-0 lg:mt-10 ">
              {title && (
                <h2 class="font-semibold uppercase text-xl text-primary">
                  {title}
                </h2>
              )}
              {description && (
                <div
                  class="text-[12px] text-neutral mt-4 pr-10"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              )}
            </div>
            <div class="flex-grow mt-8" id={id}>
              <ProductGallery
                products={products}
                offset={offset}
                layout={{ columns: layout?.columns, format }}
                pageInfo={pageInfo}
                url={url}
                whatsappNumber={whatsappNumber}
                imageNotFound={imageNotFound}
              />
            </div>
          </div>
        </div>

        {format == "Pagination" && products.length > 12 && (
          <div class="flex justify-center my-4 text-primary">
            <div class="join">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: ReturnType<typeof loader>) {
  //const hasImage = page?.products.map((item) => !item.image);
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
