// Every page of the site, with its title, description and Open Graph image.
// The layout refuses to render a page that is not listed here, and
// /og/<page>.png is generated for every entry, so no page ships without one.
import type { Nodo } from "./og/h";
import { ogCortes } from "./og/cortes";
import { ogInflacion } from "./og/inflacion";
import { ogPicasso } from "./og/picasso";
import { ogSimple } from "./og/simple";

export const SITIO = {
  nombre: "datos",
  url: "https://datos.mati.lol",
};

export interface Pagina {
  path: string;
  titulo: string;
  descripcion: string;
  og: () => Nodo | Promise<Nodo>;
}

export const PAGINAS: Pagina[] = [
  {
    path: "/",
    titulo: "datos",
    descripcion: "Preguntas sobre la Argentina que se contestan con datos.",
    og: () => ogSimple("datos", "Preguntas sobre la Argentina que se contestan con datos."),
  },
  {
    path: "/inflacion",
    titulo: "¿La inflación ya empieza con cero?",
    descripcion: "Milei dijo que la inflación iba a empezar con cero. Mes por mes, lo que dijo y lo que pasó.",
    og: ogInflacion,
  },
  {
    path: "/cortes",
    titulo: "¿Cuántas horas estuvo sin luz tu barrio?",
    descripcion: "Verano por verano, las horas sin luz de cada barrio de Buenos Aires.",
    og: ogCortes,
  },
  {
    path: "/picasso",
    titulo: "¿Lo dijo Picasso?",
    descripcion: "Las frases de famosos que Milei citó en sus discursos oficiales, una por una: quién las dijo de verdad.",
    og: ogPicasso,
  },
  {
    path: "/404",
    titulo: "No existe",
    descripcion: "Esta página no existe.",
    og: () => ogSimple("No existe", "Esta página no existe."),
  },
];

export const pagina = (path: string): Pagina => {
  const limpio = path.replace(/\.html$/, "").replace(/\/(index)?$/, "") || "/";
  const p = PAGINAS.find((x) => x.path === limpio);
  if (!p) throw new Error(`Page ${limpio} is not registered in src/sitio.ts (needed for its Open Graph image).`);
  return p;
};

export const ogSlug = (path: string) => (path === "/" ? "index" : path.slice(1));
