/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "../../components/product/ProductCard.tsx";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSuggestions } from "../../sdk/useSuggestions.ts";
import { useUI } from "../../sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "../../apps/site.ts";
import Image from "apps/website/components/Image.tsx";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Mensagem inicial da barra de pesquisa
  //  * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Pagina do resultado de pesquisa
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Sugestões de pesquisa
   * @description Não esta disponível na plataforma VNDA
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div
      class=" h-[18px] gap-8 md:px-4 "
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form
        id={id}
        action={action}
        class="join lg:max-w-[434px] w-[350px] h-[18px] border-[0.5px] border-primary"
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class="input  join-item flex-grow text-[10px] placeholder-primary text-primary  
          w-[434px] h-[16px] min-h-0"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          aria-haspopup="listbox"
          aria-expanded={displaySearchPopup.value}
          autocomplete="off"
        />

        <Button
          type="submit"
          class="join-item h-4 min-h-0 bg-base-100 border-none"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : (
              <Image
                class="rounded-lg"
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/12fe600b-0a00-46e4-baeb-a9e57f72180c"
                width={13}
                height={13}
                alt={""}
              />
            )}
        </Button>

        {
          /* <Button
          type="button"
          class="join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => displaySearchPopup.value = false}
          ariaLabel={displaySearchPopup.value ? "open search" : "search closed"}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button> */
        }
      </form>

      <div
        class={`overflow-y-scroll ${!hasProducts && !hasTerms ? "hidden" : ""}`}
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
          <div class="flex flex-col gap-6">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {searches.map(({ term }) => (
                <li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                    <span>
                      <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Produtos sugeridos
            </span>
            <Slider class="carousel">
              {products.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                >
                  <ProductCard
                    product={product}
                    platform={platform}
                    index={index}
                    itemListName="Suggeestions"
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
