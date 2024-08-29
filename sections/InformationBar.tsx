import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
   * @title Bloco de Informações
   */
export interface SlideProps {
  /**
   * @description Nome do elemento que irá aparecer na lista do admin
   */
  label?: string;
  /**
   * @title Texto principal
   */
  title: string;
  /**
   * @title Subtítulo
   */
  subtitle?: string;
  /**
   * @title Repetição
   * @description Número de vezes que o mesmo item vai repetir
   */
  repeat?: number;
  /**
   * @title Icone
   * @description icone (largura: 41px, altura: 41px)
   */
  image?: ImageWidget;
}

export interface Props {
  /**
   * @title Items
   */
  content?: SlideProps[];
}

export default function Slide({ content }: Props) {
  const slideContent = content?.map(
    ({ image, title, subtitle, repeat = 1 }) => {
      return (
        <div class="flex flex-col items-center bg-primary ">
          <div class="flex items-center justify-center py-auto">
            {Array(repeat)
              .fill(0)
              .map(() => (
                <div class="flex justify-center items-center bg-primary gap-5 h-[56px]">
                  <Image
                    width={45}
                    height={45}
                    class="w-[45px] h-[45px]"
                    src={image || ""}
                    alt={title}
                    decoding="async"
                    loading="lazy"
                  />
                  <div class="w-[200px] mr-20">
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
    <div class="bg-primary relative w-full overflow-hidden h-[56px]">
      <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-11">
        {slideContent}
      </div>
    </div>
  );
}
