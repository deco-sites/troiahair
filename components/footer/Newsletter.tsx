import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useRef, useState } from "preact/hooks";

export interface Form {
  placeholder?: string;
  buttonText?: string;

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

function Newsletter({ content, layout = {} }: Props) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const emailInput = formRef.current?.querySelector(
      "#emailInput",
    ) as HTMLInputElement;

    const email = emailInput.value.trim();

    // Adicione mais validações conforme necessário
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/
        .test(
          email,
        );

    setIsFormValid(isEmailValid);
  };

  const sendEmail = async (e: Event) => {
    e.preventDefault();

    if (formRef.current) {
      const emailInput = formRef.current.querySelector(
        "#emailInput",
      ) as HTMLInputElement;
      const email = emailInput.value;

      // Verifica se o formulário é válido antes de enviar
      if (isFormValid) {
        await invoke({
          key: "site/actions/sendNewsletter.ts",
          props: {
            email,
          },
        });

        formRef.current?.reset();
      } else {
        // Exibe uma mensagem de erro ou alerta ao usuário
        console.error("Por favor, preencha o e-mail corretamente");
      }
    }
  };

  // Chama validateForm toda vez que um campo do formulário muda
  const handleInputChange = () => {
    validateForm();
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
        <form ref={formRef} onSubmit={sendEmail}>
          <div class="flex flex-wrap gap-3 items-center">
            <label for="emailInput">
              <input
                name="email"
                type="text"
                id="emailInput"
                onChange={handleInputChange}
                class="font-poppins font-normal text-[10px] text-primary placeholder-primary bg-accent w-44 h-[26px]  rounded-md input input-bordered input-primary"
                placeholder={content?.form?.placeholder || "Digite seu email"}
              />
            </label>
            <input
              type="submit"
              value="Enviar"
              class=" text-[10px] text-primary btn btn-accent h-6 min-h-0 px-3"
            />
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
