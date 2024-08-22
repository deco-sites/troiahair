import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  logo?: {
    image?: ImageWidget;
    textLogo?: string;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col gap-3">
          <div class="w-28 max-h-16">
            <Image
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              width={200}
              height={200}
            />
          </div>
        </div>
      )}
      <div class="">
        <a
          class="font-poppins font-bold text-xl block hover:underline link no-underline py-1"
          href={"/"}
        >
          {logo?.textLogo}
        </a>
      </div>
      <div class="text-xs pb-[22px]">{logo?.description}</div>
    </>
  );
}
