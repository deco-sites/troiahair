import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center justify-center gap-9 max-w-[1300px]">
      <a href={url} class="">
        <span class="group-hover:underline text-xs font-thin text-primary">
          {name}
        </span>
      </a>

      {children && children.length > 0 && (
        <div class="fixed hidden hover:flex mt-[360px] group-hover:flex bg-base-100 z-50 items-center gap-4 justify-end max-w-[1300px] text-primary p-5 ">
          {image?.url && (
            <Image
              class="p-4"
              src={image.url}
              alt={image.alternateName}
              width={300}
              height={332}
              loading="lazy"
            />
          )}
          <ul class="flex flex-col items-start justify-center gap-2">
            {children.map((node) => (
              <li class="py-1 pr-6">
                <a class="hover:underline" href={node.url}>
                  <span>{node.name}</span>
                </a>

                <ul class="flex flex-col gap-1 mt-4">
                  {node.children?.map((leaf) => (
                    <li>
                      <a class="hover:underline" href={leaf.url}>
                        <span class="text-xs">{leaf.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavItem;
