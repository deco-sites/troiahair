import { HTMLWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @description The description of name.
   */
  title?: string;
  text: HTMLWidget;
}

export default function LongTextContent({ title, text }: Props) {
  return (
    <div class="text-primary md:max-w-[1300px] mx-auto ">
      <h4 class="font-bold text-xl text-center my-12">{title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        class="leading-loose mb-10 px-10 text-neutral"
      >
      </div>
    </div>
  );
}
