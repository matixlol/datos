import C from "../data/picasso/citas.json";
import { COLORES as K, h } from "./h";

// The Picasso quote, the verdict, and how many famous quotes were never said.
export function ogPicasso() {
  const p = C.find((c) => c.id === "picasso")!;
  const nunca = C.filter((c) => c.veredicto === "no la dijo").length;
  return h(
    "div",
    { width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", background: K.fondo, color: K.tinta, padding: "52px 72px", fontFamily: "Bricolage" },
    h(
      "div",
      { display: "flex", flexDirection: "column" },
      h("div", { fontFamily: "Familjen", fontSize: 30, color: K.gris }, "Milei la citó como de Picasso:"),
      h("div", { fontWeight: 500, fontSize: 52, lineHeight: 1.12, letterSpacing: "-0.01em", marginTop: 14, maxWidth: 1040 }, `«${p.frase}»`),
    ),
    h(
      "div",
      { display: "flex", alignItems: "flex-end", justifyContent: "space-between" },
      h("div", { fontWeight: 800, fontSize: 200, lineHeight: 0.8, letterSpacing: "-0.05em", marginLeft: -8, color: "#C2410C" }, "No."),
      h(
        "div",
        { display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right" },
        h("div", { fontWeight: 800, fontSize: 64, lineHeight: 0.95 }, `${nunca} de ${C.length}`),
        h("div", { fontFamily: "Familjen", fontSize: 26, color: K.gris, marginTop: 8, maxWidth: 520, textAlign: "right" }, "frases de famosos que citó Milei no las dijo quien él dice"),
      ),
    ),
    h("div", { fontFamily: "Familjen", fontSize: 26, color: K.gris }, "¿Lo dijo Picasso? · datos.mati.lol/picasso"),
  );
}
