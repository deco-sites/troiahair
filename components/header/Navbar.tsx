import { Props as SearchbarProps } from "../search/Searchbar.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import Searchbar from "../../islands/Header/Searchbar.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import {
  Buttons,
  Discount,
  LinkTop,
  Logo,
} from "../../components/header/Header.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar({
  items,
  searchbar,
  logo,
  buttons,
  logoPosition = "left",
  //device,
  linksTopBar,
  discountButton,
}: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: Logo;
  buttons?: Buttons;
  logoPosition?: "left" | "center";
  device: "mobile" | "desktop" | "tablet";
  linksTopBar: LinkTop[];
  discountButton: Discount;
}) {
  const platform = usePlatform();

  return (
    <>
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden flex flex-col bg-base-100  w-screen pb-6 "
      >
        <div class="flex justify-between items-center bg-base  px-6 ">
          <MenuButton />
          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center"
              style={{ minHeight: navbarHeight }}
              aria-label="Troia Hair logo"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}

          <div class="flex items-center justify-center font-normal btn btn-accent btn-outline border rounded-full border-primary p-0 m-0 w-[43px] h-[43px] min-h-0 ">
            {platform === "vnda" && <CartButtonVDNA />}
          </div>
          <a
            class="flex items-center text-xs font-thin ml-2"
            href="/entrar"
            aria-label="Account"
          >
            <div class="font-normal btn btn-accent btn-outline border border-primary rounded-full p-0 m-0 w-[43px] h-[43px] min-h-0">
              <Image
                class="rounded-lg"
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/fb00010a-a586-4ede-ba77-653171becd82"
                width={28}
                height={38}
                alt={"Account icon"}
              />
            </div>
          </a>
        </div>

        <div class="w-screen bg-white mx-auto pb-2 lg:pb-4 flex items-center justify-center">
          <div>
            <Searchbar searchbar={searchbar} />
          </div>
        </div>
      </div>

      <div class="hidden lg:flex items-center w-full min-h-[77px] px-6 bg-base-100 justify-between">
        <div
          class={`flex ${
            logoPosition === "left"
              ? "justify-start -order-1"
              : "justify-center"
          }`}
        >
          {logo && (
            <a href="/" aria-label="Store logo" class="block">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}
        </div>

        <div>
          <div class="flex items-center gap-6">
            {!buttons?.hideSearchButton && (
              <div class=" text-xs font-thin">
                <Searchbar searchbar={searchbar} />
              </div>
            )}

            <div class="flex gap-3">
              {linksTopBar &&
                linksTopBar.map((item) => (
                  <a href={item.href} class="text-[10px] text-primary">
                    {item.label}
                  </a>
                ))}
            </div>

            {discountButton && (
              <a
                href={discountButton.href}
                class="bg-primary  rounded-md flex items-center justify-center "
              >
                <div class="flex p-1">
                  {discountButton.image && (
                    <Image
                      class="object-contain pr-1"
                      src={discountButton.image}
                      width={15}
                      height={15}
                      alt={""}
                    />
                  )}
                  <span class="text-[10px] text-base-100 font-semibold">
                    {discountButton.text}
                  </span>
                </div>
              </a>
            )}
          </div>

          <ul
            class={`flex gap-6 mt-1 max-w-[1200px] bg-base-100 ${
              logoPosition === "left" ? "justify-center" : "justify-start"
            }`}
          >
            {items.map((item) => <NavItem item={item} />)}
          </ul>
        </div>

        <div class="flex-none flex items-center justify-end gap-6 col-span-1">
          <div class="flex gap-5 ">
            {!buttons?.hideCartButton && (
              <div class="flex items-center justify-center font-normal btn btn-accent btn-outline border rounded-full border-primary p-0 m-0 w-[43px] h-[43px] min-h-0 ">
                <CartButtonVDNA />
              </div>
            )}

            <a
              class="flex items-center text-xs font-thin"
              href="/entrar"
              aria-label="Account"
            >
              <div class="font-normal btn btn-accent btn-outline border border-primary rounded-full p-0 m-0 w-[43px] h-[43px] min-h-0">
                <Image
                  class="rounded-lg"
                  src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/fb00010a-a586-4ede-ba77-653171becd82"
                  width={28}
                  height={38}
                  alt={""}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
