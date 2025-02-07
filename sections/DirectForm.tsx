import ContactDirect from "../islands/ContactDirect.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @title Imagem do modal( Mensagem de envio de formulário)
   * @description Tamanho da imagem (largura: 563px, altura: 398px)
   */
  modalImg: ImageWidget;
  alt: string;
  title: string;
  message: string;

  /** @title Titulo do download do App */
  titleDownloadApp: string;
  /** @title Mensagem dos botões de download do App */
  downloadSubtitle: string;
}

export default function DirectForm({
  modalImg,
  alt,
  title,
  message,
  titleDownloadApp,
  downloadSubtitle,
}: Props) {
  return (
    <div class="flex  md:w-[1200px] justify-between mx-auto md:mt-[66px] mt-[50px] mb-[49px] flex-col ">
      <div class="flex mx-auto gap-10">
        <a
          href="https://play.google.com/store/apps/details?id=com.vnda.direct"
          target="_blank"
        >
          <img
            src="https://data.decoassets.com/troiahair/c0ece3fa-2df3-4306-9d5d-aca253cf0938/app-android.png"
            alt="app-android"
            class="w-32 h-auto "
          />
        </a>
        <a
          href="https://apps.apple.com/br/app/vnda-direct/id1557929203"
          target="_blank"
        >
          <img
            src="https://data.decoassets.com/troiahair/8e5a751a-3a9a-4281-8ec3-0c93ecd9fe8b/app-Apple.png"
            alt="app-apple"
            class="w-32 h-auto "
          />
        </a>
      </div>
      <div class="flex flex-col items-start md:mt-0 mt-[52px]  mx-auto">
        <p class="md:text-base text-[11px]">Formulário de Contato</p>

        <p class="md:text-[12px] text-[9px] mt-[6px] ">
          Campos marcados com asterisco são de preenchimento obrigatório.
        </p>
        <ContactDirect
          modalImg={modalImg}
          alt={alt}
          title={title}
          message={message}
        />
      </div>
    </div>
  );
}
