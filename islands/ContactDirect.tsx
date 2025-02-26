import { useRef, useState } from "preact/hooks";
import { invoke } from "../runtime.ts";
import Image from "apps/website/components/Image.tsx";
// import { Secret } from "apps/website/loaders/secret.ts";

// interface EmailJSProps {
//   serviceId: string;
//   templateId: string;
//   publicKey: string;
//   privateKey: Secret;
// }

interface Props {
  modalImg: string;
  alt: string;
  title: string;
  message: string;
}

const ContactDirect = ({ modalImg, alt, title, message }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);

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
    const pixInput = formRef.current?.querySelector(
      "#pixInput",
    ) as HTMLInputElement;

    const nome = nomeInput.value.trim().length > 2;
    const email = emailInput.value.trim();
    const assunto = assuntoInput.value.trim().length > 2;
    const mensagem = mensagemInput.value?.trim().length > 3;
    const pix = pixInput.value.trim().length > 2;

    // Adicione mais validações conforme necessário
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/
        .test(
          email,
        );

    setIsFormValid(nome && assunto && isEmailValid && mensagem && pix);
  };

  const sendEmail = async (e: Event) => {
    e.preventDefault();

    if (formRef.current) {
      const nomeInput = formRef.current.querySelector(
        "#nomeInput",
      ) as HTMLInputElement;
      const nome = nomeInput.value;

      const emailInput = formRef.current.querySelector(
        "#emailInput",
      ) as HTMLInputElement;
      const email = emailInput.value;

      const telefoneInput = formRef.current.querySelector(
        "#telefoneInput",
      ) as HTMLInputElement;
      const telefone = telefoneInput.value;

      const pixInput = formRef.current.querySelector(
        "#pixInput",
      ) as HTMLInputElement;
      const pix = pixInput.value;

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
            email,
            telefone,
            pix,
            assunto,
            mensagem,
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
    <>
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
          <label for="pixInput">
            <p class="font-bold text-[10px] pt-[30px]">*Pix</p>
            <input
              type="text"
              id="pixInput"
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
          <input
            type="submit"
            value="Enviar"
            class=" text-[10px] "
            onClick={() => {
              setEmailConfirm(true), window.scrollTo(0, 0);
            }}
          />
        </div>
      </form>
      {emailConfirm && (
        <div class="flex flex-col-reverse lg:flex-row w-72 lg:w-[1000px] lg:h-[420px] lg:p-5 p-2 bg-primary gap-2 lg:gap-5 z-40 rounded-md border border-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src={modalImg}
            alt={alt}
            width={563}
            height={398}
            fit="contain"
          />
          <div class="bg-base-100 rounded-sm  p-2 lg:p-5 flex flex-col w-full">
            <div class="flex justify-end h-10 lg:mb-12">
              <span
                class="cursor-pointer font-semibold  text-lg hover:text-xl"
                onClick={() => {
                  setEmailConfirm(false);
                }}
              >
                x
              </span>
            </div>
            <div class="flex flex-col items-center justify-center text-[18px] ">
              <h4 class="text-2xl text-primary uppercase text-center font-semibold lg:pb-5 pb-3">
                {title}
              </h4>
              <p class="text-center pb-3 lg:pb-0">{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactDirect;
