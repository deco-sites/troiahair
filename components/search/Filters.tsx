import Avatar from "../../components/ui/Avatar.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return (
            range && (
              <ValueItem
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <div>
      <ul class="flex flex-col gap-6 p-4">
        {filters.filter(isToggle).map(
          (filter) =>
            filter.label === "marca" && (
              <li class="flex flex-col gap-4 ">
                <span class="text-lg font-semibold text-primary">Marcas</span>
                <FilterValues {...filter} />
              </li>
            ),
        )}
      </ul>
      <ul class="flex flex-col gap-6 p-4">
        {filters.filter(isToggle).map(
          (filter) =>
            filter.label === "categoria" && (
              <li class="flex flex-col gap-4 ">
                <span class="text-lg font-semibold text-primary">
                  Categoria
                </span>
                <FilterValues {...filter} />
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

export default Filters;
