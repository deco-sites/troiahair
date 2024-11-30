import CartLinkVDNA from "../../islands/Header/Cart/vndaFooter.tsx";

import { usePlatform } from "../../sdk/usePlatform.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems({
  sections,
  justify = false,
}: {
  sections: Section[];
  justify: boolean;
}) {
  const platform = usePlatform();
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-medium text-[14px]">{section.label}</span>
                  <ul class={`flex flex-col gap-3 flex-wrap ]`}>
                    {section.items?.map((item) => (
                      <li>
                        {item.label === "Meu pedido" ? (
                          <div class="block link link-hover text-[11px]">
                            {platform === "vnda" && <CartLinkVDNA />}
                          </div>
                        ) : (
                          <a
                            href={item.href}
                            class="block link link-hover text-[11px]"
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-4">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow ">
                  <input id={section.label} type="checkbox" class="min-h-[0]" />
                  <label
                    htmlFor={section.label}
                    class="collapse-title min-h-[0] !p-0 flex gap-2"
                  >
                    <span>{section.label}</span>
                  </label>
                  <div class="collapse-content">
                    <ul class={`flex flex-col gap-1 pl-5 pt-2`}>
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
