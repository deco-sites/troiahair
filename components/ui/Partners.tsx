import { useMemo } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  altText: string;
}

export interface Props {
  title?: string;

  rowImages?: ColumnImages[];
}

export interface ColumnImages {
  colImages: Image[];
}

const IMAGES = [
  {
    altText: "deco",
    image:
      "https://decoims.com/troiahair/af6cca92-1d76-48f2-8f4a-71a72bce45e3/ed85e01cae30b934.svg",
  },
  {
    altText: "deco",
    image:
      "https://decoims.com/troiahair/a0866822-7c92-4e3d-b1dc-727c77452f9c/7b89d6ef10a9ba1e.svg",
  },
];

function Partners(props: Props) {
  const {
    title,
    rowImages,
  } = props;
  const list = useMemo(
    () =>
      rowImages && rowImages.length > 0
        ? rowImages
        : [{ colImages: Array(20).fill(null).map((_, i) => IMAGES[i % 2]) }],
    [],
  );

  return (
    <div class="w-full pb-16">
      <div class="flex flex-col gap-10 lg:gap-16">
        {title && <p class="text-[18px] font-bold text-center">{title}</p>}

        <div class="w-full text-center items-center relative">
          <div class="overflow-hidden pt-2 px-1">
            {list.map(({ colImages }, index) => (
              <div
                class={`flex flex-row flex-nowrap w-full animate-walk text-white ${
                  index > 0 && index < list.length - 1 ? "py-6" : "py-2"
                } items-center gap-24`}
                style={`animation-delay: ${300 * index}ms`}
              >
                {colImages.map((item: Image) => (
                  <img
                    key={index}
                    src={item.image}
                    alt={item.altText || ""}
                  />
                ))}
              </div>
            ))}
          </div>
          <div class="gradient-right" />
          <div class="gradient-left" />
        </div>
      </div>
    </div>
  );
}

export default Partners;
