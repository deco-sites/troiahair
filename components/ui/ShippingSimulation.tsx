import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "../../components/ui/Button.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import type { ShippingMethod } from "apps/vnda/utils/client/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  skuId: string;
}

type ShippingResult = { [key: string]: ShippingMethod[] };

function ShippingContent({ simulation }: {
  simulation: Signal<ShippingResult | string | null>;
}) {
  if (typeof simulation.value === "string") {
    return (
      <div class="flex flex-col gap-4 p-4 bg-primary rounded-[4px] relative font-semibold text-base-200 text-center">
        <span>CEP inválido ou localidade não atendida</span>
      </div>
    );
  }
  const methods =
    (Object.values(simulation.value ?? {})[0] ?? []) as ShippingMethod[];
  const locale = "pt-BR";

  const currencyCode = "BRL";

  if (simulation.value == null) {
    return null;
  }
  console.log(simulation.value);
  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-4 bg-base-200 rounded-[4px] relative">
      {methods.map((method: ShippingMethod) => (
        <li class="flex flex-col items-start justify-center border-base-200 not-first-child:border-t flex-wrap gap-4">
          <div class="flex justify-between w-full">
            <span class="text-button text-center text-[14px] font-bold">
              {method.name}
            </span>
            <span class="text-base font-semibold text-right">
              {method.price === 0 ? "Grátis" : (
                formatPrice(method.price, currencyCode, locale)
              )}
            </span>
          </div>
          <span class="text-button text-[12px]">
            {method.description}
          </span>
        </li>
      ))}
      <span class="text-base-300">
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span>
    </ul>
  );
}

function ShippingSimulation({ skuId }: Props) {
  console.log(skuId);

  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<ShippingResult | string | null>(null);
  const { simulate } = useCart();
  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      const data = await simulate({
        skuId,
        zip: postalCode.value,
        quantity: 1,
      });
      simulateResult.value = data as unknown as ShippingResult;
    } catch (error) {
      console.error(error);
      simulateResult.value = "Sem resultados";
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col lg:flex-row w-full">
        <div class="flex items-center gap-2 mr-3">
          <Image
            class="  object-cover w-[34px] h-[34px]"
            width={34}
            height={34}
            src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/94e4ca94-224f-4f7e-962f-a97d6ef16c00"
            alt="icone de um caminhão de entrega"
          />
          <span class="font-semibold text-primary text-xs uppercase">
            Calcule o frete
          </span>
        </div>

        <div class="flex flex-row w-full">
          <form
            class="w-full flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSimulation();
            }}
          >
            <input
              as="input"
              type="text"
              class="flex-grow-[2] border border-primary bg-accent w-[180px] h-[29px] pl-6 py-[11.5px] text-[14px] placeholder:text-[14px] text-primary placeholder:text-primary rounded-sm"
              placeholder="Digite aqui o CEP"
              value={postalCode.value}
              maxLength={8}
              onChange={(e: { currentTarget: { value: string } }) => {
                postalCode.value = e.currentTarget.value;
              }}
            />
            <Button
              loading={loading.value}
              type="submit"
              class="flex-grow md:flex-grow-0 md:px-6 min-h-0 bg-accent font-semibold text-primary uppercase rounded-sm h-[29px] text-[14px]"
            >
              Calcular
            </Button>
          </form>
        </div>
      </div>
      <p class="text-primary text-[10px]">
        Informe seu CEP para consultar os prazos de entrega
      </p>
      <div>
        <ShippingContent simulation={simulateResult} />
      </div>
    </div>
  );
}

export default ShippingSimulation;
