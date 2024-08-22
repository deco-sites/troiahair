import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";
import { useUI } from "../../../sdk/useUI.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 563px))", maxWidth: "563px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-xl text-primary">
              Sua sacola está vazia
            </span>
            <Button
              class="btn btn-primary min-h-0 uppercase rounded-md"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full">
              {/* Subtotal */}
              <div class="py-2 flex flex-col">
                {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                {onAddCoupon && (
                  <Coupon onAddCoupon={onAddCoupon} cupom={coupon} />
                )}
                <div class="w-full flex justify-between px-4 text-sm mt-3">
                  <span class="font-medium text-sm text-primary">Subtotal</span>
                  <span class="font-medium text-sm text-primary">
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div class="border-t border-primary pt-4 flex flex-col justify-end items-end gap-2 mx-4">
                <span class="text-[12px] text-primary">
                  Taxas e fretes serão calculados no checkout
                </span>
              </div>

              <div class="p-4 flex flex-col items-center mt-[60px]">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="btn btn-primary btn-block uppercase min-h-0 h-[48px]"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    <div class="flex justify-between items-center w-full">
                      <span>Finalizar a compra</span>
                      <div>
                        <span>Total</span>
                        <span class="font-medium text-base ml-2">
                          {formatPrice(total, currency, locale)}
                        </span>
                      </div>
                    </div>
                  </Button>
                </a>
                <button
                  onClick={() => displayCart.value = false}
                  class="text-sm text-primary uppercase text-center font-semibold pt-4"
                >
                  continuar comprando
                </button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
