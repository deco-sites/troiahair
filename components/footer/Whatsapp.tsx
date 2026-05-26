import Image from "apps/website/components/Image.tsx";

export interface Props {
  /**
   * @title Número de Whatsapp
   * @description Insira somente números ex:55000000000 (incluir o código do país).
   */
  whatsappNumber: number;
  // /**
  //  * @title Mensagem Inicial
  //  * @description Mensagem inicial que ja vai preenchida para o cliente enviar a loja.
  //  */
  // message: string;
}

export default function Whatsapp({
  whatsappNumber = 5522222222,
  //message = "hello capy",
}: Props) {
  return (
    <div>
      <a
        href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`}
        target="_blank"
        class="fixed bottom-6 right-6 z-40"
      >
        <Image
          src="https://decoims.com/troiahair/6579fe52-14f8-449c-be19-6d0d56ef115d/af71eedece20da58.png"
          alt="whatsapp icon"
          width={60}
          height={60}
          loading="lazy"
        />
      </a>
    </div>
  );
}
