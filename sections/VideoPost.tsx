import IframeLoader from "../islands/YtVideo.tsx";

interface Props {
  /**
   * @description The description of title.
   */
  title: string;
  subtile?: string;
  text: string;
  video?: string;
}

export default function Section({ title, subtile, text, video }: Props) {
  return (
    <div class="w-screen pt-[30px]">
      <div class="md:w-[1300px] md:mx-auto bg-primary flex flex-col-reverse md:gap-[61px] md:px-14 md:py-4 md:flex-row ">
        <div class="md:w-[526px] mx-8 md:mx-0 mb-[65px] md:mb-0">
          <h3 class="text-2xl font-bold text-accent md:pb-5 md:pt-3 pt-[53px] pb-3">
            {title}
          </h3>
          <h4 class="text-base font-semibold text-accent md:pb-10 pb-4">
            {subtile}
          </h4>
          <p class="text-[12px] text-accent sm:max-h-[276px]">{text}</p>
        </div>
        <div class="md:w-[620px] md:h-[374px] border-4 border-base-200 rounded-2xl w-[390px] h-[235px] mx-auto mt-10 md:mt-0">
          <IframeLoader
            videoLink={video || ""}
            preload={false}
            width={620}
            height={374}
          />
        </div>
      </div>
    </div>
  );
}
