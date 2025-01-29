import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface SlideProps {
  title: string;
  subtitle?: string;
  label?: string;
  repeat?: number;
  image?: ImageWidget;
}

export interface Props {
  content?: SlideProps[];
}

export default function Slide({
  content,
}: Props) {
  const slideContent = content?.map(
    ({ image, title, subtitle, repeat = 1 }) => {
      return (
        <div class="flex flex-col items-center bg-primary ">
          <div class="flex items-center justify-center py-auto">
            {Array(repeat)
              .fill(0)
              .map(() => (
                <div class="flex justify-center items-center bg-primary gap-5 h-[60px]">
                  <Image
                    width={41}
                    class=""
                    src={image || ""}
                    alt={title}
                    decoding="async"
                    loading="lazy"
                  />
                  <div class="w-[250px] mr-20">
                    <h5 class="font-bold text-[10px] text-white">{title}</h5>
                    <p class="font-normal text-[10px] text-white">{subtitle}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    },
  );
  return (
    <div class="bg-primary relative w-full overflow-hidden h-[60px]">
      <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-11">
        {slideContent}
      </div>
    </div>
  );
}
