import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";

/** @title {{categorieName}} */
export interface Categorie {
  /** @title Nome da Categoria/Marca */
  categorieName?: string;
  image: ImageWidget;
  /** @title Descrição de acessibilidade e SEO */
  alt: string;
  /** @title Link da Categoria */
  href: string;
}

export interface Props {
  /** @title Título */
  title?: "Nossas Categorias" | "Nossas Marcas";
  /**
   * @title Items
   * @description Insira cada Categoria/Marca
   */
  categories?: Categorie[];
  /**
   * @title Quantidade de Items
   * @description Escolha o numero de itens que vai aparecer inicialmente na tela se houver mais elementos vai criar uma barra de rolagem automaticamente
   */
  layout?: {
    numberOfCategories?: {
      mobile?: 1 | 2 | 3;
      desktop?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    };
    /** @title Mostrar setas de Navegação */
    showArrows?: boolean;
  };
}

function Categories({
  title = "Nossas Categorias",
  layout = {
    numberOfCategories: {
      mobile: 3,
      desktop: 7,
    },
    showArrows: true,
  } as Props["layout"],
  categories = [
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
    {
      categorieName: "Product",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/4f1e6f28-09e1-4fff-b33a-56495902beec",
      alt: "Avatar",
      href: "/",
    },
  ],
}: Props) {
  const id = useId();

  if (!categories || categories.length === 0) {
    return null;
  }

  function SliderItem({ slide, id }: { slide: Categorie; id: string }) {
    const { categorieName, image, alt, href } = slide;

    return (
      <div id={id} class="relative overflow-y-hidden">
        <div class="flex flex-col items-center">
          <a
            href={href}
            class="flex items-center justify-center w-[115px] h-[115px] lg:w-[125px] lg:h-[125px]"
          >
            <div>
              <Image
                class="object-contain hover:w-[100px] hover:h-auto z-10 w-[115px] h-[115px] lg:w-[125px] lg:h-[125px]"
                alt={alt}
                src={image || ""}
                width={125}
                height={125}
                fit="contain"
              />
            </div>
          </a>
          <a href={href}>
            <p class="text-[11px] text-neutral text-center font-medium pt-2">
              {categorieName}
            </p>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div class="w-screen lg:w-full flex flex-col items-center">
      <div class="max-w-[1300px]">
        <h2 class="text-2xl text-primary text-center font-bold uppercase pt-[37px] pb-[25px]">
          {title}
        </h2>

        <div
          id={id}
          class={`grid  overflow-x-auto w-full ${
            layout?.showArrows
              ? "grid-cols-[48px_1fr_48px] items-center"
              : "grid-cols-1"
          }`}
        >
          {layout?.showArrows && (
            <>
              <div class="hidden col-start-1 lg:flex justify-center">
                <Slider.PrevButton class="w-12 h-12 flex justify-center items-center">
                  <Icon
                    size={24}
                    id="ChevronLeft"
                    strokeWidth={3}
                    class="w-5"
                  />
                </Slider.PrevButton>
              </div>
            </>
          )}

          <div class="col-span-1">
            <Slider class="lg:w-[1171px] carousel carousel-center  col-span-full row-span-full gap-[61px] overflow-x-auto w-screen px-3 lg-px-0">
              {categories?.map((slide, index) => (
                <Slider.Item index={index} class="carousel-item">
                  <SliderItem slide={slide} id={`${id}::${index}`} />
                </Slider.Item>
              ))}
            </Slider>
            <Slider.JS rootId={id} />
          </div>

          {layout?.showArrows && (
            <>
              <div class="hidden col-start-3 lg:flex justify-center">
                <Slider.NextButton class="w-12 h-12 flex justify-center items-center text-primary">
                  <Icon size={24} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
