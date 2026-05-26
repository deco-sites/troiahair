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
                src="https://decoims.com/troiahair/53540b3e-bba9-40f0-9beb-f41a9d16dfe5/9a46f2c99e20a534.png"
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
                src="https://decoims.com/troiahair/aa598f1e-b4f9-4637-97af-03d0b520bf44/d674728eea9d6d95.png"
                alt="Get it on Google Play"
              />
            </a>
          )}
        </div>
      )}
    </>
  );
}
