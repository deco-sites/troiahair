import Icon from "../../components/ui/Icon.tsx";

export default function BackToTop({ content }: { content?: string }) {
  return (
    <>
      {content && (
        <div class="w-full flex items-center justify-center">
          <a href="#top" class="flex flex-col items-center justify-center">
            <Icon id="ChevronUp" width={24} height={24} />
            {content}
          </a>
        </div>
      )}
    </>
  );
}
