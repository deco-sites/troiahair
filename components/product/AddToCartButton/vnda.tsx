import { PropertyValue } from "apps/commerce/types.ts";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { useState } from "preact/hooks";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  productID: string;
  additionalProperty: PropertyValue[];
  showCounter?: boolean;
}

function AddToCartButton(
  { productID, eventParams, variantStyle, showCounter }: Props,
) {
  const { addItem } = useCart();
  const [qtd, setQtd] = useState(1);
  const onAddItem = () =>
    // @ts-ignore atributes is not required
    addItem({
      quantity: qtd,
      itemId: productID,
    });

  return (
    <>
      {showCounter && (
        <div class="container h-screen flex  gap-2">
          <button
            class="btn  btn-accent no-animation min-h-0 w-[27px] h-[23px] border border-primary"
            onClick={() => setQtd(qtd - 1)}
          >
            <span class="text-primary font-semibold">-</span>
          </button>
          <span class="text-base-200  font-bold w-[53px] h-[23px] bg-primary rounded-sm text-center">
            {qtd}
          </span>
          <button
            class="btn  btn-accent no-animation min-h-0 w-[27px] h-[23px] border border-primary"
            onClick={() => setQtd(qtd + 1)}
          >
            <span class="text-primary  font-bold">+</span>
          </button>
        </div>
      )}
      <Button
        onAddItem={onAddItem}
        eventParams={eventParams}
        variantStyle={variantStyle}
      />
    </>
  );
}

export default AddToCartButton;
