import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import { useId } from "../../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: {
      product: { image: images = [] },
    },
    layout,
  } = props;

  const { width, height } = layout || { width: 300, height: 370 };

  const aspectRatio = `${width} / ${height}`;

  return (
    <div id={id} class="grid grid-flow-row sm:grid-flow-col">
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2  md:max-w-[482px] md:max-h-[462px] w-screen flex items-center justify-center">
        <Slider class="carousel carousel-center gap-6  md:max-w-[482px]   md:w-[482px] md:h-[462px] w-[300px] h-[300px] border border-primary rounded-xl">
          {images.map((img, index) => (
            <Slider.Item index={index} class="carousel-item mx-auto">
              <Image
                class="object-cover"
                sizes="(max-width: 640px) 100vw, 40vw"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton
          class="no-animation absolute left-2 "
          disabled
        >
          <div class="btn btn-circle btn-outline btn-primary border border-primary bg-base-100 text-primary">
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </div>
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2"
          disabled={images.length < 2}
        >
          <div class="btn btn-circle btn-outline btn-primary border border-primary bg-base-100 text-primary">
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </div>
        </Slider.NextButton>

        <div class="absolute top-2 right-2 bg-base-100 rounded-full ">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc((700 * height) / width)}
          />
        </div>
      </div>

      {/* Dots */}
      <ul class="carousel carousel-center gap-1 px-4 sm:px-0 sm:flex-col order-2 sm:order-1  mr-[21px] hidden md:block">
        {images.map((img, index) => (
          <li class="carousel-item min-w-[63px] max-w-[113px] w-[113px] h-[102px] ">
            <Slider.Dot index={index}>
              <Image
                style={{ aspectRatio }}
                class="  object-cover w-[113px] h-[102px] border border-primary rounded-xl"
                width={99}
                height={89}
                src={img.url!}
                alt={img.alternateName}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <Slider.JS rootId={id} />
    </div>
  );
}
