import Button from "../../../components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  cupom?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ cupom, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  return (
    <div class="flex justify-between items-center px-4">
      {/* <span class="text-sm text-primary">+ Adicionar cupom de desconto</span> */}
      {display
        ? (
          <form
            class="join"
            onSubmit={async (e) => {
              e.preventDefault();
              const {
                currentTarget: { elements },
              } = e;

              const input = elements.namedItem("cupom") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                await onAddCoupon(text);
                setDisplay(false);
              } finally {
                setLoading(false);
              }
            }}
          >
            <input
              name="coupon"
              class="input join-item input-bordered input-primary text-primary min-h-0 h-[34px]"
              type="text"
              value={cupom ?? ""}
              placeholder={"Cupom"}
            />
            <Button
              class="join-item btn btn-primary min-h-0 h-[34px]"
              type="submit"
              htmlFor="coupon"
              loading={loading}
            >
              Ok
            </Button>
          </form>
        )
        : (
          <Button
            class="btn-ghost font-normal text-primary"
            onClick={() => setDisplay(true)}
          >
            {cupom || "+ Adicionar cupom de desconto"}
          </Button>
        )}
    </div>
  );
}

export default Coupon;
