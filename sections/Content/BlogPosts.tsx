import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
// import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Testimonial {
  content?: {
    description: string;
    avatar: ImageWidget;
    /** @description Descrição da imagem */
    alt: string;
    name: string;
    position: string;
    date: string;
  };
}

export interface Props {
  title?: string;
  subtitle: string;
  testimonials?: Testimonial[];
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    // headerAlignment?: "center" | "left";
    // headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
}

function BlogPosts({
  title = "NOSSOS CLIENTES RECOMENDAM A TRÓIA HAIR",
  subtitle =
    "Lorem ipsum dolor sit amet consectetur. Enim est porttitor gravida dolor id. Id ipsum semper euismod euismod. Risus parturient non tempus eget libero ullamcorper ultricies tellus. Accumsan turpis tempor nunc tellus ut.",
  layout = {
    numberOfSliders: {
      mobile: 1,
      desktop: 3,
    },
    // headerAlignment: "center",
    // headerfontSize: "Normal",
    showArrows: false,
  } as Props["layout"],
  testimonials = [
    {
      content: {
        description:
          "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
        avatar:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
        alt: "Avatar",
        name: "Name Surname",
        position: "Position, Company name",
        date: "Avaliado em 04 de maio de 2024 às 16:04",
      },
    },
    {
      content: {
        description:
          "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
        avatar:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
        alt: "Avatar",
        name: "Name Surname",
        position: "Position, Company name",
        date: "Avaliado em 04 de maio de 2024 às 16:04",
      },
    },
    {
      content: {
        description:
          "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
        avatar:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
        alt: "Avatar",
        name: "Name Surname",
        position: "Position, Company name",
        date: "Avaliado em 04 de maio de 2024 às 16:04",
      },
    },
  ],
}: Props) {
  const id = useId();

  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  // const slideDesktop = {
  //   1: "md:w-full",
  //   2: "md:w-1/2",
  //   3: "md:w-1/3",
  //   4: "md:w-1/4",
  //   5: "md:w-1/5",
  // };

  // const slideMobile = {
  //   1: "w-full",
  //   2: "w-1/2",
  //   3: "w-1/3",
  //   4: "w-1/4",
  //   5: "w-1/5",
  // };

  function SliderItem({ slide, id }: { slide: Testimonial; id: string }) {
    const { content } = slide;

    return (
      <div id={id} class="relative overflow-y-hidden w-full min-h-[292px]">
        <div class="flex flex-col justify-center gap-16 p-8 h-[409px] w-[327px]">
          <div class="flex flex-col items-center gap-5">
            <Image
              class="object-cover rounded-full bg-primary"
              alt={content?.alt}
              src={content?.avatar || ""}
              width={186}
              height={186}
            />
            <div class="flex flex-col">
              <p class="font-semibold  w-[327px] text-primary text-center text-base">
                {content?.name}
              </p>
              <p class="text-primary text-center text-[10px]">
                {content?.position}
              </p>
              <p class="text-xs w-[327px] h-[120px] overflow-y-auto text-primary text-center pt-6">
                {content?.description}
              </p>
              <p class="text-[10px] w-[327px] text-primary text-center pt-6">
                {content?.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="w-screen border-t-2 border-primary py-[52px] px-3">
      <div class="flex flex-col  min-h-min  lg:container md:max-w-6xl lg:mx-auto mx-4  ">
        <h2 class="text-2xl text-primary font-bold pb-5 uppercase">{title}</h2>
        <p class="text-base text-primary">{subtitle}</p>
      </div>
      <div
        id={id}
        class={`grid lg:container md:max-w-6xl mx-auto   ${
          layout?.showArrows
            ? "grid-cols-[48px_1fr_48px] items-center"
            : "grid-cols-1"
        }`}
      >
        {layout?.showArrows && (
          <>
            <div class="col-start-1 flex justify-center">
              <Slider.PrevButton class="w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronLeft" strokeWidth={3} class="w-5" />
              </Slider.PrevButton>
            </div>
          </>
        )}

        <div class="col-span-1 lg:w-[1141px] w-[327px] overflow-x-auto mx-auto">
          <Slider class="lg:w-[1141px] carousel carousel-center  col-span-full row-span-full gap-20 pt-10">
            {testimonials?.map((slide, index) => (
              <Slider.Item index={index} class="carousel-item">
                <SliderItem slide={slide} id={`${id}::${index}`} />
              </Slider.Item>
            ))}
          </Slider>
          <Slider.JS rootId={id} />
        </div>

        {layout?.showArrows && (
          <>
            <div class="col-start-3 flex justify-center">
              <Slider.NextButton class="w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogPosts;
