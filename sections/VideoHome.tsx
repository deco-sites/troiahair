import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { useSection } from "@deco/deco/hooks";
interface Props {
    /**
     * @title Título
     */
    title: string;
    /**
     * @title Sub-titulo
     * @description Texto auxiliar
     */
    subtile?: string;
    /** @title Logo Youtube */
    imageYoutube?: ImageWidget;
    /**
     * @title You Tube Video
     * @description Link do youTube (link copiado do navegador e nao do botao de Compartilhar)
     */
    videoyt: string;
}
export default function Section({ title, subtile, imageYoutube, videoyt, }: Props) {
    // Extrair o ID do vídeo:
    const videoId = videoyt.split("v=")[1].split("&")[0];
    function getEmbedLink(videoId: string) {
        if (!videoId)
            return "Vídeo não encontrado";
        // Criar o link embeddable:
        if (videoId) {
            const embedLink = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            return embedLink;
        }
    }
    return (<div class="w-screen lg:pt-[30px] lg:mb-2 px-4 mb-10">
      <div class="lg:w-[1300px] md:mx-auto flex flex-col md:gap-5 items-center justify-center ">
        <div class="flex gap-3 ">
          {imageYoutube && (<Image src={imageYoutube} alt="logo youtube" width={100} height={100} class="object-cover lg:w-[80px] lg:h-[80px] w-[50px] h-[50px]"/>)}
          <div class=" mx-auto md:mx-0 flex flex-col items-center md:items-start">
            <h2 class="text-2xl font-semibold text-primary md:pb-4 md:pt-3  pb-3 text-center">
              {title}
            </h2>
            <h4 class="text-sm  text-primary md:pb-5 pb-5 ">{subtile}</h4>
          </div>
        </div>
        <div class="md:w-[667px] md:h-[474px] w-[320px] h-[185px] mx-auto md:mx-0 lg:mb-10">
          <iframe class="md:w-[667px] md:h-[474px] w-[320px] h-[185px]" width="667" height="474" src={getEmbedLink(videoId) || ""} title="YouTube video player" frameborder="0" loading="lazy" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
          </iframe>
        </div>
      </div>
    </div>);
}
