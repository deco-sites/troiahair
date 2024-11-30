import BackToTop from "../../components/footer/BackToTop.tsx";
import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
//import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social from "../../components/footer/Social.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";



export type Item = {
  /**
   * @title Título
   * @description Palavra que vai aparecer no site
   */
  label: string;
  /** @title Link(url) */
  href: string;
};

export type Section = {
  /** @title Nome da Coluna de Link */
  label: string;
  /** @title Links */
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link para o Aplicativo da Apple */
  apple?: string;
  /** @description Link para o Aplicativo Android */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";

  /**
   * @title Variações de Layout do Footer
   */
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    //regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  /** @description Escolha entre colocar a Imagem do Logo e escrever o nome do site*/
  logo?: {
    /**
     * @title Imagem
     * @description tamanho máximo (largura: 200px, altura: 64px) */
    image: ImageWidget;
    /** @title Nome do site */
    textLogo?: string;
    /** @title Descrição ou Slogan do Site */
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  /** @title Lista de Links */
  sections?: Section[];
  /** @title Social Media Links */
  social?: {
    /** @description Texto que vai em cima dos icones */
    title?: string;
    /**
     * @title Icone das Redes Sociais
     * @description Escolher */
    items: SocialItem[];
  };
  /** @title Formas de Pagamento */
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  /** @title Links para o download dos aplicativos */
  mobileApps?: MobileApps;
  //regionOptions?: RegionOptions;
  extraLinks?: Item[];
  
  /** @description selos de confiança */
  sealImage?: {
    seal: ImageWidget;
    label: string;
  }[];
  /** @title Voltar para o topo */
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

const LAYOUT = {
  Primary: "bg-primary text-primary-content",
  Secondary: "bg-secondary text-secondary-content",
  Accent: "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [
    {
      label: "Sobre",
      items: [
        {
          href: "/quem-somos",
          label: "Quem somos",
        },
        {
          href: "/termos-de-uso",
          label: "Termos de uso",
        },
        {
          href: "/trabalhe-conosco",
          label: "Trabalhe conosco",
        },
      ],
    },
    {
      label: "Atendimento",
      items: [
        {
          href: "/centraldeatendimento",
          label: "Central de atendimento",
        },
        {
          href: "/whatsapp",
          label: "Fale conosco pelo WhatsApp",
        },
        {
          href: "/trocaedevolucao",
          label: "Troca e devolução",
        },
      ],
    },
  ],
  social = {
    title: "Redes sociais",
    items: [
      { label: "Instagram", link: "/" },
      { label: "Tiktok", link: "/" },
    ],
  },
  sealImage,
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  //regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      //regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? (
    <></>
  ) : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled:
          layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? (
    <></>
  ) : (
    <FooterItems
      sections={sections}
      justify={
        layout?.variation == "Variation 2" || layout?.variation == "Variation 3"
      }
    />
  );
  const _social = layout?.hide?.socialLinks ? (
    <></>
  ) : (
    <Social content={social} vertical={layout?.variation == "Variation 3"} />
  );
  const _payments = layout?.hide?.paymentMethods ? (
    <></>
  ) : (
    <PaymentMethods content={payments} />
  );
  const _apps = layout?.hide?.mobileApps ? (
    <></>
  ) : (
    <MobileApps content={mobileApps} />
  );
  // const _region = layout?.hide?.regionOptions
  //   ? <></>
  //   : <RegionSelector content={regionOptions} />;
  const _links = layout?.hide?.extraLinks ? (
    <></>
  ) : (
    <ExtraLinks content={extraLinks} />
  );



  return (
    <footer
      class={clx(
        "font-poppins lg:max-w-none w-screen mx-auto flex-col pt-[53px] pb-2 md:pb-10 flex justify-center items-center",
        LAYOUT[layout?.backgroundColor ?? "Primary"]
      )}
    >
      <div class="lg:w-[1153px] flex flex-col ">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col ">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12 ">
              {_logo}
              {_sectionLinks}
              {_newsletter}
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
              {_payments}
              {_social}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
                {_apps}
                {/* {_region} */}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
                {_apps}
                {/* {_region} */}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                  {_apps}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
                {/* {_region} */}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                  <div class="lg:flex-auto">{_payments}</div>
                  <div class="lg:flex-auto">{_social}</div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-10">
                  {/* {_region} */}
                  {_apps}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
              {_logo}
              <PoweredByDeco />
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col mb-3 mx-5">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}

            <div class="flex flex-col justify-between md:flex-row gap-6 lg:gap-20 md:justify-between mb-10 mt-[30px]">
              <div>
                <a href="/">{_logo}</a>
                {_sectionLinks}
              </div>
              <div class="flex flex-col gap-[30px] mr-[56px] w-[300px]lg:w-[350px]">
                {_payments}
                {_social}
                {sealImage && (
                  <div class="flex flex-col lg:flex-row  justify-center items-center gap-4">
                    {sealImage.map((image) => (
                      <div>
                        <img
                          loading="lazy"
                          width="130"
                          height="60"
                          src={image.seal}
                          alt={image.label}
                          class="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {_apps}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center mt-[30px]">
              {/* <PoweredByDeco /> */}
              <p class="text-[9px] text-base-200">
                © Copyright Tróia Hair -CNPJ: 13.422.865/0001-98 - 2024. Todos os
                direitos reservados.
              </p>
              <a href="https://tec3commerce.com.br/" target="blank">
                <p class="text-[9px] text-base-200 pb-2">Desenvolvido por:</p>
                <img
                  loading="lazy"
                  width="77"
                  height="24"
                  src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/a2ca2da9-c6b7-430a-9948-b80b58a5a1a5"
                  alt="tec3 logo"
                />
              </a>
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
                {/* {_region} */}
              </div>
            </div>
          </div>
        )}
      </div>
      {layout?.hide?.backToTheTop ? (
        <></>
      ) : (
        <BackToTop content={backToTheTop?.text} />
      )}
    </footer>
  );
}

export default Footer;
