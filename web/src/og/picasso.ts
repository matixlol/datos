import C from "../data/picasso/citas.json";
import { COLORES as K, h } from "./h";

const ROJO = "#C2410C";

// Which quote leads the card. Alejandro Magno while the 17 Nov speech is news;
// set back to "picasso" once it is not.
const DESTACADA = "alejandro";
const MES = "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre".split(" ");

// One apocryphal quote, the name crossed out, and that it is not the only one.
export function ogPicasso() {
  const p = C.find((c) => c.id === DESTACADA)!;
  const picasso = C.find((c) => c.id === "picasso")!;
  const u = p.usos.at(-1)!.fecha;
  const cuando = p.usos.length === 1 ? `Milei, el ${+u.slice(8)} de ${MES[+u.slice(5, 7) - 1]}:` : `Milei, en ${p.usos.length} discursos oficiales:`;
  const nunca = C.filter((c) => c.veredicto === "no la dijo").length;
  const tachado = (t: string) =>
    h("div", { display: "flex", position: "relative" }, t,
      h("div", { position: "absolute", left: -6, right: -6, top: "54%", height: 8, background: ROJO, borderRadius: 4 }));
  const origen = (p as { origen?: { texto: string } }).origen;
  return h(
    "div",
    { width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", background: K.fondo, color: K.tinta, padding: "52px 72px 0", fontFamily: "Bricolage" },
    h("div", { display: "flex", flexDirection: "column" },
      h("div", { fontFamily: "Familjen", fontWeight: 600, fontSize: 30, color: K.gris }, cuando),
      h("div", { fontWeight: 700, fontSize: 68, lineHeight: 1.04, letterSpacing: "-0.015em", marginTop: 14, maxWidth: 1050 }, `«${p.frase}»`),
      h("div", { display: "flex", alignItems: "baseline", gap: 24, marginTop: 24, fontSize: 52, lineHeight: 1 },
        h("div", { display: "flex", fontWeight: 600, color: K.gris }, "—", h("div", { display: "flex", marginLeft: 14 }, tachado(p.autor))),
        h("div", { fontWeight: 800, color: ROJO }, "Nunca la dijo."))),
    // where the wording circulated before Milei used it
    origen
      ? h("div", { display: "flex", flexDirection: "column", padding: "18px 24px", borderRadius: 14, background: "rgba(194,65,12,0.08)", fontFamily: "Familjen", fontSize: 27, lineHeight: 1.3 },
          h("div", { fontWeight: 600, color: ROJO }, "De dónde lo sacó."),
          h("div", { fontWeight: 500, marginTop: 4 }, origen.texto))
      : h("div", { display: "flex" }),
    // X draws the domain over the bottom-left corner, so the bottom band only holds our own domain, on the right
    h("div", { display: "flex", justifyContent: "flex-end", gap: 36, alignItems: "center", height: 100, fontFamily: "Familjen", fontSize: 26 },
      h("div", { fontWeight: 600, color: K.tinta }, p.id === "picasso" ? `Y no es la única: ${nunca} de ${C.length} frases de famosos.` : `Tampoco la de Picasso. En total, ${nunca} de ${C.length} frases de famosos.`),
      h("div", { fontWeight: 500, color: K.gris }, "datos.mati.lol/picasso")),
  );
}
