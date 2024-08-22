import { useRef, useState } from "preact/hooks";
import { invoke } from "../runtime.ts";
import { Secret } from "apps/website/loaders/secret.ts";

interface EmailJSProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: Secret;
}

const ContactUs = (sendEmailProps: EmailJSProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const nomeInput = formRef.current?.querySelector(
      "#nomeInput",
    ) as HTMLInputElement;
    const emailInput = formRef.current?.querySelector(
      "#emailInput",
    ) as HTMLInputElement;
    const assuntoInput = formRef.current?.querySelector(
      "#assuntoInput",
    ) as HTMLInputElement;
    const mensagemInput = formRef.current?.querySelector(
      "#mensagemInput",
    ) as HTMLTextAreaElement;

    const nome = nomeInput.value.trim().length > 2;
    const email = emailInput.value.trim();
    const assunto = assuntoInput.value.trim().length > 2;
    const mensagem = mensagemInput.value?.trim().length > 3;

    // Adicione mais validações conforme necessário
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/
        .test(email);

    setIsFormValid(
      nome && assunto && isEmailValid && mensagem,
    );
  };

  const sendEmail = async (e: Event) => {
    e.preventDefault();

    if (formRef.current) {
      const nomeInput = formRef.current.querySelector(
        "#nomeInput",
      ) as HTMLInputElement;
      const nome = nomeInput.value;

      const empresaInput = formRef.current.querySelector(
        "#empresaInput",
      ) as HTMLInputElement;
      const empresa = empresaInput.value;

      const emailInput = formRef.current.querySelector(
        "#emailInput",
      ) as HTMLInputElement;
      const email = emailInput.value;

      const telefoneInput = formRef.current.querySelector(
        "#telefoneInput",
      ) as HTMLInputElement;
      const telefone = telefoneInput.value;

      const assuntoInput = formRef.current.querySelector(
        "#assuntoInput",
      ) as HTMLInputElement;
      const assunto = assuntoInput.value;

      const mensagemInput = formRef.current.querySelector(
        "#mensagemInput",
      ) as HTMLTextAreaElement;
      const mensagem = mensagemInput.value?.trim() || "";

      // Verifica se o formulário é válido antes de enviar
      if (isFormValid) {
        await invoke({
          key: "site/actions/sendEmail.ts",
          props: {
            nome,
            empresa,
            email,
            telefone,
            assunto,
            mensagem,
            sendEmailProps,
          },
        });

        formRef.current?.reset();
      } else {
        // Exibe uma mensagem de erro ou alerta ao usuário
        console.error(
          "Por favor, preencha todos os campos obrigatórios corretamente.",
        );
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
        <label for="nomeInput">
          <p class="font-bold text-[10px]">*Nome</p>
          <input
            type="text"
            id="nomeInput"
            onChange={handleInputChange}
            class="md:w-[468px] w-[333px] h-5 border border-base-200 text-[12px] focus:border-primary pl-2"
          />
        </label>
        <label for="empresaInput">
          <p class="font-bold text-[10px] pt-[30px]">Empresa</p>
          <input
            type="text"
            id="empresaInput"
            class="md:w-[468px] w-[333px] h-5 border border-base-200 text-[12px] focus:border-primary pl-2"
          />
        </label>
        <label for="emailInput">
          <p class="font-bold text-[10px] pt-[30px]">*E-mail</p>
          <input
            type="text"
            id="emailInput"
            onChange={handleInputChange}
            class="md:w-[468px] w-[333px] h-5 border border-base-200 text-[12px] focus:border-primary pl-2"
          />
        </label>
        <label for="telefoneInput">
          <p class="font-bold text-[10px] pt-[30px]">Telefone</p>
          <input
            type="text"
            id="telefoneInput"
            class="md:w-[468px] w-[333px] h-5 border border-base-200 text-[12px] focus:border-primary pl-2"
          />
        </label>
        <label for="assuntoInput">
          <p class="font-bold text-[10px] pt-[30px]">*Assunto</p>
          <input
            type="text"
            id="assuntoInput"
            onChange={handleInputChange}
            class="md:w-[468px] w-[333px] h-5 border border-base-200 text-[12px] focus:border-primary pl-2"
          />
        </label>
        <label htmlFor="mensagemInput">
          <p class="font-bold text-[10px] pt-[30px]">*Mensagem</p>
        </label>
        <textarea
          id="mensagemInput"
          rows={5}
          cols={40}
          onChange={handleInputChange}
          class="md:w-[468px] w-[333px] h-[170px] border border-base-200 text-[12px] focus:border-primary pl-2"
        />
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

export default ContactUs;
