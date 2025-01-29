import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface ServiceProps {
  type?: string;
  label?: string;
  description?: HTMLWidget;
  image: ImageWidget;
  placement: "left" | "right";
}

export interface Props {
  services?: ServiceProps[];
}

const PLACEMENT = {
  left: "flex-col lg:flex-row-reverse",
  right: "flex-col lg:flex-row",
};

export default function Services({
  services = [
    {
      type: "Service",
      label: "Your Title Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, elit arcu ultricies massa, quis ornare nisl libero vitae urna.",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3290/488e5dc5-9a24-48c9-9795-09b97394fb5f",
      placement: "right",
    },
  ],
}: Props) {
  return (
    <div class="flex flex-col w-screen items-center">
      {services?.map((service, index) => (
        <div class="lg:w-[1300px] ">
          <div class="flex flex-col justify-center items-center sm-gap-6 sm:w-screen lg:w-[1300px] mx-auto gap-[21px] bg-primary  h-[163px] ">
            <p class="text-accent  pt-6 lg:pt-0 text-2xl  font-bold">{service.label}</p>
            {service.type && (
              <p class="text-accent text-sm  font-[500]">{service.type}</p>
            )}
          </div>

          <div
            key={index}
            class={`flex first:pt-0 py-[33px]  ${
              PLACEMENT[service.placement]
            } text-left items-center justify-center `}
          >
            <div class="bg-base-200 lg:w-[483px] lg:h-[383px] lg:mr-[20px] rounded-[5px] w-[324px] h-[295px] ">
              <Image
                class="w-full h-full object-cover p-2"
                src={service.image}
                alt={service.label}
                decoding="async"
                loading="lazy"
                width={483}
                height={383}
              />
            </div>
            <div class="lg:w-[661px] text-primary text-xs   m-7 lg:mx-0">
              <p
                class="text-primary text-xs"
                dangerouslySetInnerHTML={{ __html: service.description || "" }}
              ></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
