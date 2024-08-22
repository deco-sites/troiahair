import { ImageWidget } from "apps/admin/widgets.ts";

export interface ImagesList {
  brandImage: ImageWidget;
  alt?: string | "Brand";
}

interface Props {
  /**
   * @description The description of name.
   */
  title?: string;
  brandImages?: ImagesList[];
}

export default function Section({ title, brandImages }: Props) {
  return (
    <div class="flex flex-col items-center mt-[71px]">
      <p class="text-2xl text-primary uppercase text-center font-bold">
        {title}
      </p>
      <div class="lg:max-w-[1084px] lg:min-w-[211px] max-h-[400px] flex flex-wrap lg:gap-20 w-[300px] gap-12 sm:w-[80vw] mb-9 mt-11 sm:mb-14 sm:mt-[71px] overflow-y-auto">
        {brandImages?.map((item) => (
          <div class="w-[297px] h-[103px] mx-auto lg:w-[211px] lg:h-[68px]">
            <img
              class="object-cover lg:w-[211px] lg:h-[68px]"
              src={item.brandImage}
              alt={item.alt}
              decoding="async"
              loading="lazy"
              width={297}
              height={103}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
