import D from "../data/cortes/barrios.json";
import { COLORES as C, h, type Nodo } from "./h";

// Same scale as the page map: lights on (warm yellow) through grey to lights off (near black).
const STOPS = [[246, 214, 122], [128, 132, 142], [22, 24, 29]];
const color = (x: number) => {
  const t = Math.sqrt(Math.min(x, 10) / 10) * 2, i = Math.min(Math.floor(t), 1), f = t - i;
  return `rgb(${STOPS[i].map((c, j) => Math.round(c + (STOPS[i + 1][j] - c) * f)).join(",")})`;
};
const CELESTE = "#2F7DC4";
type Barrio = (typeof D.barrios)[number];
const horas = (b: Barrio, v: string) => b.horas[v as keyof Barrio["horas"]];

// The worst barrio of the latest summer, the best one, and the map, ending in "¿Y tu barrio?".
export function ogCortes() {
  const v = String(D.veranos.at(-1));
  const orden = [...D.barrios].sort((a, b) => horas(b, v) - horas(a, v));
  const [mas, menos] = [orden[0], orden.at(-1)!];
  const dur = (x: number) => (x >= 1 ? `${x.toLocaleString("es-AR", { maximumFractionDigits: 1 })} horas` : `${Math.round(x * 60)} minutos`);
  const [, , vw, vh] = D.viewBox.split(" ").map(Number);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${D.viewBox}"><g stroke="${C.fondo}" stroke-width="70" stroke-linejoin="round">${D.barrios
    .map((b) => `<path d="${b.path}" fill="${color(horas(b, v))}"/>`).join("")}</g><path d="${mas.path}" fill="none" stroke="${CELESTE}" stroke-width="260" stroke-linejoin="round"/></svg>`;
  const alto = 520, ancho = Math.round((alto * vw) / vh);
  const mapa: Nodo = { type: "img", props: { src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`, width: ancho, height: alto, style: { position: "absolute", right: 56, top: 55 } } } as Nodo;
  const corto = `${v}/${String(+v + 1).slice(2)}`;
  return h(
    "div",
    { width: "100%", height: "100%", position: "relative", boxSizing: "border-box", display: "flex", flexDirection: "column", background: C.fondo, color: C.tinta, padding: "60px 72px 0", fontFamily: "Bricolage" },
    mapa,
    h("div", { fontFamily: "Familjen", fontWeight: 600, fontSize: 30, color: C.gris }, `Horas sin luz por casa, verano ${corto}`),
    h("div", { fontWeight: 700, fontSize: 50, marginTop: 30, color: CELESTE }, mas.barrio),
    h("div", { display: "flex", alignItems: "flex-end", fontWeight: 800, fontSize: 168, lineHeight: 0.82, letterSpacing: "-0.045em", marginTop: 8 },
      mas.horas[v as keyof Barrio["horas"]].toLocaleString("es-AR", { maximumFractionDigits: 1 }),
      h("div", { fontSize: 54, fontWeight: 700, letterSpacing: 0, marginLeft: 14, marginBottom: 10 }, "horas")),
    h("div", { fontWeight: 600, fontSize: 38, marginTop: 22, color: C.gris }, `${menos.barrio}: ${dur(horas(menos, v))}.`),
    h("div", { display: "flex", flexGrow: 1 }),
    h("div", { fontWeight: 800, fontSize: 58, lineHeight: 1 }, "¿Y tu barrio?"),
    h("div", { display: "flex", justifyContent: "flex-end", alignItems: "center", height: 115, fontFamily: "Familjen", fontWeight: 500, fontSize: 26, color: C.gris }, "datos.mati.lol/cortes"),
  );
}
