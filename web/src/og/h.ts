// Minimal element builder for satori, so Open Graph images can be written
// without React: h("div", { display: "flex" }, "text", h("span", {}, "…")).
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

export type Nodo = { type: string; props: { style?: Record<string, unknown>; children?: unknown } } | string;

export const h = (type: string, style: Record<string, unknown> = {}, ...children: Nodo[]): Nodo => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

export const ANCHO = 1200;
export const ALTO = 630;

// Paths are resolved from the project root: Astro bundles this file, so
// import.meta.url does not point at src/ during the build.
const fuente = (archivo: string) => readFileSync(resolve(process.cwd(), "src/og/fonts", archivo));
let fuentes: Parameters<typeof satori>[1]["fonts"] | null = null;
const cargarFuentes = () =>
  (fuentes ??= [
    { name: "Bricolage", data: fuente("bricolage-500.ttf"), weight: 500, style: "normal" },
    { name: "Bricolage", data: fuente("bricolage-800.ttf"), weight: 800, style: "normal" },
    { name: "Familjen", data: fuente("familjen-400.ttf"), weight: 400, style: "normal" },
  ]);

export async function svg(nodo: Nodo): Promise<string> {
  return satori(nodo as never, { width: ANCHO, height: ALTO, fonts: cargarFuentes() });
}

// Laid out at 1200×630 but rasterized at 2×, so the card stays sharp on
// high-density screens and when X or WhatsApp scale it up.
export const ESCALA = 2;
export async function png(nodo: Nodo): Promise<Uint8Array> {
  return new Resvg(await svg(nodo), { fitTo: { mode: "width", value: ANCHO * ESCALA } }).render().asPng();
}

export const COLORES = { fondo: "#F3F3F1", tinta: "#15171C", gris: "#5E626B", celeste: "#2F7DC4" };
