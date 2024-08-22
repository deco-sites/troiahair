import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col",
        tiled && "lg:flex-row lg:w-full lg:justify-between ",
      )}
    >
      <div class="flex flex-col ">
        {content?.title && (
          <h4 class="font-poppins text-[22px] font-normal leading-7 tracking-wide">
            {content?.title}
          </h4>
        )}
        {content?.description && (
          <div class="font-poppins text-xs font-normal pt-3">
            {content?.description}
          </div>
        )}
      </div>
      <div class="flex flex-col gap-4 mr-[76px] mb-[17px]">
        <form class="form-control" onSubmit={handleSubmit}>
          <div class="flex flex-wrap gap-3 ">
            <input
              name="email"
              class="font-poppins font-normal text-[9px] text-primary placeholder-primary bg-accent w-44 h-6  rounded-md input input-bordered input-primary"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="btn disabled:loading font-poppins font-normal btn-accent w-[92px] h-6 text-[9px] text-primary placeholder-primary rounded-md min-h-0 "
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
        {content?.form?.helpText && (
          <div
            class="text-[8px]"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;
