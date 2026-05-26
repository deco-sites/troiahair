import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { type SectionProps } from "@deco/deco";
// import Image from "apps/website/components/Image.tsx";
/**
 * @titleBy matcher
 */
export interface Banner {
    /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
    matcher: string;
    /** @description text to be rendered on top of the image */
    title?: string;
    /** @description text to be rendered on top of the image */
    subtitle?: string;
    image: {
        /** @description Image for big screens */
        desktop: ImageWidget;
        /** @description Image for small screens */
        mobile: ImageWidget;
        /** @description image alt text */
        alt?: string;
    };
}
const DEFAULT_PROPS = {
    banners: [
        {
            image: {
                mobile: "https://decoims.com/troiahair/d2466a2b-fa4e-4a8e-a65d-d7da1d2e8b84/7ee0ee2e45e2e5d4.png",
                desktop: "https://decoims.com/troiahair/2bf2be31-e283-4d45-895f-6767887920df/2cf8c9a31c6df315.png",
                alt: "a",
            },
            title: "Woman",
            matcher: "/*",
            subtitle: "As",
        },
    ],
};
function Banner(props: SectionProps<ReturnType<typeof loader>>) {
    const { banner } = props;
    if (!banner) {
        return null;
    }
    const { title, image, subtitle } = banner;
    return (<div class="mx-auto max-w-[1300px] max-h-[195px]">
      <Picture preload>
        <Source class=" object-cover object-top" src={image.mobile} width={360} height={120} media="(max-width: 767px)"/>
        <Source class=" object-cover object-top" src={image.desktop} width={1300} height={195} media="(min-width: 767px)"/>
        <img class="w-full" src={image.desktop} alt={image.alt ?? title}/>
      </Picture>

      <div class="container flex flex-col items-center justify-center sm:items-start  w-full">
        <h1>
          <span class="text-5xl font-medium text-primary">
            {title}
          </span>
        </h1>
        <h2>
          <span class="text-xl font-medium text-base-100">
            {subtitle}
          </span>
        </h2>
      </div>
    </div>);
}
export interface Props {
    banners?: Banner[];
}
export const loader = (props: Props, req: Request) => {
    const { banners } = { ...DEFAULT_PROPS, ...props };
    const banner = banners.find(({ matcher }) => new URLPattern({ pathname: matcher }).test(req.url));
    return { banner };
};
export default Banner;
