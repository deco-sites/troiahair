import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface TopItem {
  /**
   * @description Nome do item no painel admin.
   */
  label?: string;
  image?: ImageWidget;
  href?: string;
  title: string;
  subtitle?: string;
}

interface Props {
  imageFormat: "Quadrado" | "Circulo";
  content: TopItem[];
}

export default function TopBar({ imageFormat = "Quadrado", content }: Props) {
  return (
    <div class="hidden md:flex md:max-w-[1103px] md:mx-auto md:justify-between md:visible md:py-[75px]">
      {content.map((item) => (
        <a href={item.href} class="flex items-center">
          <div
            class={`flex items-center justify-center bg-accent w-[64px] h-[64px] ${
              imageFormat === "Circulo" && "rounded-full p-1"
            }`}
          >
            {item.image && (
              <Image
                class="object-cover"
                src={item.image}
                alt={item.title}
                width={60}
                height={42}
              />
            )}
          </div>
          <div class="ml-[20px] text-[12px] text-primary">
            <p>{item.title}</p>
            <p>{item.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
