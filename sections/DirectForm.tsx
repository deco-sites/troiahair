import ContactDirect from "../islands/ContactDirect.tsx";

// interface Props {
//   /**
//    * @description The description of name.
//    */
//   name?: string;
// }

export default function Section() {
  return (
    <div class="flex md:w-[1200px] justify-between mx-auto md:mt-[66px] mt-[50px] mb-[49px] md:flex-row flex-col-reverse ">
      <div class="flex flex-col items-start md:mt-0 mt-[52px]  mx-auto">
        <p class="md:text-base text-[11px] font-bold ">Formulário de Contato</p>

        <p class="md:text-[12px] text-[9px] mt-[6px] ">
          Campos marcados com asterisco são de preenchimento obrigatório.
        </p>
        <ContactDirect />
      </div>
    </div>
  );
}
