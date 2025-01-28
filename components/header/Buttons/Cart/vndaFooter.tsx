import Button from "../../../../components/ui/Button.tsx";

import { useUI } from "../../../../sdk/useUI.ts";

function CartLink() {
  const { displayCart } = useUI();

  const onClick = () => {
    displayCart.value = true;
  };

  return (
    <div class="indicator">
      <a
        class="block link link-hover text-[11px]"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        onClick={onClick}
      >
        Meu pedido
      </a>
    </div>
  );
}

export default CartLink;
