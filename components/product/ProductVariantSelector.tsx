import Avatar from "../../components/ui/Avatar.tsx";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-base text-primary font-semibold">{name}</span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, link]) => {
              const relativeUrl = relative(url);
              const relativeLink = relative(link);
              return (
                <li>
                  <button
                    f-partial={relativeLink}
                    f-client-nav
                    class="text-[9px] btn btn-accent w-9 h-8 min-h-0 border border-primary p-0"
                  >
                    <Avatar
                      content={value}
                      variant={relativeLink === relativeUrl
                        ? "active"
                        : relativeLink
                        ? "default"
                        : "disabled"}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
