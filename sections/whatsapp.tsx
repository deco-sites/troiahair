import Image from "apps/website/components/Image.tsx";

interface Props {
  /**
   * @title Número de Whatsapp
   * @description Insira somente números ex:55000000000 (incluir o código do país).
   */
  whatsappNumber: number;
  /**
   * @title Mensagem Inicial
   * @description Mensagem inicial que ja vai preenchida para o cliente enviar a loja.
   */
  message: string;
}

export default function Whatsapp(
  { whatsappNumber = 5522222222, message = "hello capy" }: Props,
) {
  return (
    <div>
      <a
        href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`}
        target="_blank"
        class="fixed bottom-6 right-6 z-40"
      >
        <Image
          src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/1e07fe4f-c0f8-48d5-a1e1-977df17a6f0e"
          alt="whatsapp icon"
          width={60}
          height={60}
          loading="lazy"
        />
      </a>
    </div>
  );
}
