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
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "../../apps/site.ts";
import Image from "apps/website/components/Image.tsx";
import { type Resolved } from "@deco/deco";
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
function Searchbar({ placeholder = "What are you looking for?", action = "/s", name = "q", loader, platform, }: Props) {
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
    return (<div class="lg:h-[18px] h-[30px] gap-4 md:px-4 " style={{ gridTemplateRows: "min-content auto" }}>
      <form id={id} action={action} class="join lg:max-w-[434px] w-[350px] lg:h-[18px] h-[34px] border border-primary">
        <input ref={searchInputRef} id="search-input" class="input  join-item flex-grow text-[10px] placeholder-primary text-primary  
          w-[434px] lg:h-[16px] h-[32px] min-h-0" name={name} onInput={(e) => {
            const value = e.currentTarget.value;
            if (value) {
                sendEvent({
                    name: "search",
                    params: { search_term: value },
                });
            }
            setQuery(value);
        }} placeholder={placeholder} role="combobox" aria-controls="search-suggestion" aria-haspopup="listbox" aria-expanded={displaySearchPopup.value} autocomplete="off"/>

        <Button type="submit" class="join-item h-4 min-h-0 bg-base-100 border-none lg:py-0 py-[6px]" aria-label="Search" for={id} tabIndex={-1}>
          {loading.value
            ? <span class="loading loading-spinner loading-xs"/>
            : (<Image class="rounded-lg h-[18px] w-[18px] lg:h-[14px] lg:w-[14px]" src="https://deco-sites-assets.s3.sa-east-1.amazonaws.com/troiahair/c0639430-1b5d-4abd-b233-ea19da14efe2/search-icon.png" width={18} height={18} alt={""}/>)}
        </Button>
      </form>

      <div class={`overflow-y-scroll ${!hasProducts && !hasTerms ? "hidden" : ""}`}>
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
          <div class="flex flex-col gap-6">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {searches.map(({ term }) => (<li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                    <Image class="rounded-lg" src="https://deco-sites-assets.s3.sa-east-1.amazonaws.com/troiahair/c0639430-1b5d-4abd-b233-ea19da14efe2/search-icon.png" width={18} height={18} alt={""}/>
                    <span dangerouslySetInnerHTML={{ __html: term }}/>
                  </a>
                </li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>);
}
export default Searchbar;
