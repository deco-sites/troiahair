import { useRef, useState } from "preact/hooks";
import { invoke } from "../runtime.ts";

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

const NewsletterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const emailInput = formRef.current?.querySelector(
      "#emailInput"
    ) as HTMLInputElement;

    const email = emailInput.value.trim();

    // Adicione mais validações conforme necessário
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/.test(
        email
      );

    setIsFormValid(isEmailValid);
  };

  const sendEmail = async (e: Event) => {
    e.preventDefault();

    if (formRef.current) {
      const emailInput = formRef.current.querySelector(
        "#emailInput"
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
    <form
      class="mt-[29px] flex items-end flex-col"
      ref={formRef}
      onSubmit={sendEmail}
    >
      <div class="">
        <label for="emailInput">
          <p class="font-bold text-[10px] pt-[30px]">*E-mail</p>
          <input
            type="text"
            id="emailInput"
            onChange={handleInputChange}
            class="md:w-[468px] w-[333px] h-5 border border-base-200 text-[12px] focus:border-primary pl-2"
          />
        </label>
      </div>

      <div
        class="btn w-[92px] h-[25px] flex items-center justify-center btn-accent rounded-sm mt-[26px] min-h-0 text-primary"
        // Desabilita o botão se o formulário não for válido
        disabled={!isFormValid}
      >
        <input type="submit" value="Enviar" class=" text-[10px] " />
      </div>
    </form>
  );
};

export default NewsletterForm;
