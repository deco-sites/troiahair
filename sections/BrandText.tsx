import { HTMLWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @description The description of name.
   */
  title: string;
  text: HTMLWidget;
  backgroundColor: boolean;
  mobile: boolean;
}

export default function BrandText({
  title,
  text,
  backgroundColor = true,
  mobile = true,
}: Props) {
  return (
    <div
      class={`text-primary md:max-w-[1114px] h-auto md:mx-auto mb-[58px]  ${
        backgroundColor
          ? "bg-gray-200 md:rounded-xl md:pt-[56px] md:pb-[79px] w-screen py-10"
          : "mt-[97px]"
      } ${mobile || "hidden"}`}
    >
      <p class="text-2xl text-center font-bold uppercase  mb-[56px] w-[220px] md:w-[360px] mx-auto">
        {title}
      </p>
      <div
        class={`text-[12px] ${
          backgroundColor ? "md:px-[42px] px-7" : "px-6"
        } w-screen md:w-full leading-7`}
        dangerouslySetInnerHTML={{ __html: text }}
      >
      </div>
    </div>
  );
}
