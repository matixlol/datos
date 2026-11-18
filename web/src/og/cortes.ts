import D from "../data/cortes/barrios.json";
import { COLORES as C, h } from "./h";

// Most and fewest hours without power per home in the latest summer.
export function ogCortes() {
  const v = String(D.veranos.at(-1));
  const orden = [...D.barrios].sort((a, b) => b.horas[v] - a.horas[v]);
  const [mas, menos] = [orden[0], orden.at(-1)!];
  const n = (x: number) => x.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fila = (b: typeof mas, color: string) =>
    h("div", { display: "flex", flexDirection: "column" },
      h("div", { fontFamily: "Familjen", fontSize: 34, color: C.gris }, b.barrio),
      h("div", { display: "flex", alignItems: "flex-end", fontWeight: 800, fontSize: 150, lineHeight: 0.85, letterSpacing: "-0.04em", color },
        n(b.horas[v]), h("div", { fontSize: 44, fontWeight: 700, marginLeft: 12, marginBottom: 8, letterSpacing: 0 }, "horas")));
  return h(
    "div",
    { width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", background: C.fondo, color: C.tinta, padding: "56px 72px", fontFamily: "Bricolage" },
    h("div", { fontWeight: 600, fontSize: 58, lineHeight: 1.05, letterSpacing: "-0.01em" }, "¿Cuántas horas estuvo sin luz tu barrio?"),
    h("div", { display: "flex", gap: 96 }, fila(mas, C.tinta), fila(menos, C.gris)),
    h("div", { fontFamily: "Familjen", fontSize: 28, color: C.gris }, `Promedio por casa, verano ${v}/${String(+v + 1).slice(2)} · datos.mati.lol/cortes`),
  );
}
