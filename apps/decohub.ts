import Decohub, { State } from "apps/decohub/mod.ts";

/**
 * @title Deco Hub
 * @description Unlock apps and integrations on deco.cx
 * @category Tool
 * @logo https://decoims.com/troiahair/3e9a0910-5231-4416-a059-106eba1613f7/2e9ac4b3512a8410.png
 */
export default function App(params: State) {
  return Decohub(params);
}

export { Preview } from "apps/decohub/mod.ts";
