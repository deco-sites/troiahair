import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
// import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Descrição de acessibilidade e SEO
   */
  alt: string;
  /**
   * @description Link opcional
   */
  href?: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  /**
   * @title Banners por linha
   * @description layout inicial de 1 banner para mobile e 2 para desktop
   */
  itemsPerLine: {
    /**
     * @default 1
     * @description tamanho da imagem 1 banner: largura 383px, altura 264px, 2 banners: largura 191px, altura 2
     */
    mobile?: 1 | 2;
    /** @default 2 */
    desktop?: 1 | 2 | 4 | 6 | 8;
  };
  /**
   * @title Arredondamento dos cantos da imagem
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

const DEFAULT_PROPS: Props = {
  banners: [
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://decoims.com/troiahair/aeb81535-944b-442f-af01-c9e902306a60/f2033f011d1e64c6.jpg",
      srcDesktop:
        "https://decoims.com/troiahair/0b549907-fc30-4bb2-97a2-c35f23e0cae2/1c059717e8f34f42.jpg",
    },
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://decoims.com/troiahair/7c2ada4a-99e8-4d48-9217-7fe5a5727710/eff3c3bfc5ada040.jpg",
      srcDesktop:
        "https://decoims.com/troiahair/3466f165-8481-4cdd-ab7b-b270c41d77e2/6a52ba3304762f4a.jpg",
    },
  ],
  borderRadius: {
    mobile: "none",
    desktop: "none",
  },
  itemsPerLine: {
    mobile: 1,
    desktop: 2,
  },
};

export default function BannnerGrid(props: Props) {
  const {
    itemsPerLine,
    borderRadius,
    banners = [],
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <section class=" md:w-[1300px] px-4 md:px-0 mx-auto py-5 overflow-x-auto">
      <div
        class={`grid gap-4 md:gap-6 max-w-[1193px] mx-auto ${
          MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]}`}
      >
        {banners.map(({ href, srcMobile, srcDesktop, alt }) => (
          <a
            href={href}
            class={`overflow-hidden  ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
          >
            <Picture>
              <Source
                media="max-width: 400px"
                src={srcMobile}
                width={400}
                height={161}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={563}
                height={398}
              />
              <img
                class=" object-contain lg:max-w-[563px] w-full h-auto"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        ))}
      </div>
    </section>
  );
}
