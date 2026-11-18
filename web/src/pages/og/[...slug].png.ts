import type { APIRoute, GetStaticPaths } from "astro";
import { png } from "../../og/h";
import { ogSlug, PAGINAS, type Pagina } from "../../sitio";

export const getStaticPaths = (() =>
  PAGINAS.map((p) => ({ params: { slug: ogSlug(p.path) }, props: { p } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { p } = props as { p: Pagina };
  return new Response(await png(await p.og()), { headers: { "Content-Type": "image/png" } });
};
