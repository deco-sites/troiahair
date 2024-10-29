import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductDescription({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Detalhes do produto não encontrado");
  }

  const { product } = page;
  const { isVariantOf } = product;
  const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;

  function processDescription(description: string) {
    // Remover comentários HTML (<!-- -->)
    description = description.replace(/<!--.*?-->/g, "");

    // converter as linhas em branco
    description = description.replace(/\n/g, "<br>");

    // converter para negrito
    const regexBold = /\*\*(.*?)\*\*/gm;
    let matchBold;
    while ((matchBold = regexBold.exec(description)) !== null) {
      description = description.replace(
        matchBold[0],
        `<strong>${matchBold[1]}</strong>`
      );
    }

    // Converter cabeçalhos Markdown para HTML com classes Tailwind

    const regexh4 = /<br>\s*####\s*(.*?)\s*<br>/gm;
    let matchH4;
    while ((matchH4 = regexh4.exec(description)) !== null) {
      description = description.replace(
        matchH4[0],
        `<h4 class="pt-5"><span class="text-base font-medium pt-7 pb-4">${matchH4[1]}</span></h4>`
      );
    }

    const regexh3 = /<br>\s*###\s*(.*?)\s*<br>/gm;
    let matchH3;
    while ((matchH3 = regexh3.exec(description)) !== null) {
      description = description.replace(
        matchH3[0],
        `<div class="pt-10"><h3><span class="text-lg font-semibold mt-7 mb-4">${matchH3[1]}</span></h3></div>`
      );
    }

    const regexh2 = /<br>\s*##\s*(.*?)\s*<br>/gm;
    let matchH2;
    while ((matchH2 = regexh2.exec(description)) !== null) {
      description = description.replace(
        matchH2[0],
        `<h2 class="pt-10"><span class="text-xl font-bold mt-7 mb-4">${matchH2[1]}</span></h2>`
      );
    }

    const regexh1 = /<br>\s*#\s*(.*?)\s*<br>/gm;
    let matchH1;
    while ((matchH1 = regexh1.exec(description)) !== null) {
      description = description.replace(
        matchH1[0],
        `<h1 class="pt-10"><span class="text-2xl font-bold mb-4">${matchH1[1]}</span></h1>`
      );
    }

    // Adicionar classes Tailwind às imagens
    const regexImg = /!\[\]\((.*?)\)/g; // Regex para encontrar o link da imagem
    let matchImg;

    while ((matchImg = regexImg.exec(description)) !== null) {
      description = description.replace(
        matchImg[0],
        ` <Image
            class="w-[70%] mx-auto"
            src="${matchImg[1]}"
            alt={"img.alternateName"}
            width={300}
            height={300}
            loading="lazy"
          />`
      );
    }

    return description;
  }

  return (
    <div class="flex flex-col  max-w-[1100px] mx-auto" id={id}>
      {/* Description card */}
      <div class="mt-[14px] sm:mt-6">
        <span class="text-sm">
          {description && (
            <div
              class="ml-2 text-[12px] text-primary"
              dangerouslySetInnerHTML={{
                __html: processDescription(description),
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default ProductDescription;
