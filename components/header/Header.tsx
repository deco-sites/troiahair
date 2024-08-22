import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Drawers from "../../islands/Header/Drawers.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
// import { headerHeight } from "./constants.ts";

export interface Logo {
  /**
   * @title Logo
   * @description Imagem do logo
   */
  src: ImageWidget;
  /**
   * @description Descrição de acessibilidade e SEO
   */
  alt: string;
  /**
   * @title Largura
   * @description largura 137px
   */
  width?: number;
  /**
   * @title Altura
   * @description altura 58px
   */
  height?: number;
}

export interface Buttons {
  /**
   * @title Desabilitar botão de Pesquisa
   */
  hideSearchButton?: boolean;
  /**
   * @title Desabilitar botão de Usuário
   */
  hideAccountButton?: boolean;
  // hideWishlistButton?: boolean;
  /**
   * @title Desabilitar botão do Carrinho de Compra
   */
  hideCartButton?: boolean;
}

export interface LinkTop {
  /**
   * @title Texto do Link
   */
  label: string;
  /**
   * @title Link
   */
  href: string;
}

export interface Discount {
  /**
   * @title Imagem
   * @description Icone quadrado
   */
  image?: ImageWidget;
  /**
   * @title Texto
   */
  text: string;
  /**
   * @title Link
   */
  href: string;
}

export interface Props {
  /**
   * @title Alertas
   * @description mensagem no topo do site
   */
  alerts?: string[];
  /**
   * @title Autoplay intervalo entre os alertas
   * @description tempo em segundos
   */
  interval?: number;

  /** @title Barra de Pesquisa */
  searchbar?: Omit<SearchbarProps, "platform">;
  /**
   * @title Links
   * @description Links que ficam do lado direito da barra de Pesquisa
   */
  linksTopBar?: LinkTop[];
  /**
   * @title Mini banner
   * @description Foi inicialmente definido como desconto mas pode ser alterado.
   */
  discountButton?: Discount;

  /**
   * @title Barra de navegação
   * @description Esta barra de navegação é usada no desktop e menu do celular
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;
  logoPosition?: "left" | "center";
  /**
   * @title Elementos do Topo do site
   * @description Habilita/Desabilita elementos
   */
  buttons?: Buttons;
}

function Header({
  
  alerts,
  interval,
  searchbar,
  linksTopBar = [
    {
      label: "atacado",
      href: "/",
    },
    {
      label: "varejo",
      href: "/",
    },
  ],
  discountButton = {
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/737c6d84-d81f-4d10-8d4a-ac4dde84e2b0",
    text: "Promoções Imperdíveis",
    href: "/",
  },
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "left",
  buttons,
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header class="min-h-[77px] max-w-[1300px] p-0 mx-auto bg-white">
        <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
          <div class="fixed left-0 w-full z-50 bg-base-100">
            <div class=" max-w-[1300px]   mx-auto ">
              {alerts && alerts.length > 0 && <Alert alerts={alerts} interval={interval}/>}
              <Navbar
                device={device}
                items={items}
                searchbar={searchbar && { ...searchbar, platform }}
                logo={logo}
                logoPosition={logoPosition}
                buttons={buttons}
                linksTopBar={linksTopBar}
                discountButton={discountButton}
              />
            </div>
          </div>
        </Drawers>
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
