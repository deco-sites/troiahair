export default function MobileApps(
  { content }: { content: { apple?: string; android?: string } },
) {
  return (
    <>
      {(content?.apple || content?.android) && (
        <div class="flex gap-[30px] lg:flex-wrap">
          {content?.apple && (
            <a
              href={content?.apple}
              target="_blank"
              aria-label={`Download on the App Store at link ${content?.apple}`}
            >
              <img
                loading="lazy"
                width="100"
                height="30"
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/d2ac9bb9-db63-4cad-a374-b3b9a2017335"
                alt="Download on the App Store"
              />
            </a>
          )}
          {content?.android && (
            <a
              href={content?.android}
              target="_blank"
              aria-label={`Get it on Google Play at link ${content?.android}`}
            >
              <img
                loading="lazy"
                width="100"
                height="30"
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10800/bd2bcc17-be34-4b25-a1cc-71a3fb5db668"
                alt="Get it on Google Play"
              />
            </a>
          )}
        </div>
      )}
    </>
  );
}
