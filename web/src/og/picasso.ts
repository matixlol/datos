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
  return h(
    "div",
    { width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", background: K.fondo, color: K.tinta, padding: "60px 72px 0", fontFamily: "Bricolage" },
    h("div", { fontFamily: "Familjen", fontWeight: 600, fontSize: 32, color: K.gris }, cuando),
    h("div", { fontWeight: 700, fontSize: 76, lineHeight: 1.04, letterSpacing: "-0.015em", marginTop: 18, maxWidth: 1050 }, `«${p.frase}»`),
    h("div", { display: "flex", alignItems: "baseline", gap: 26, marginTop: 32, fontSize: 60, lineHeight: 1 },
      h("div", { display: "flex", fontWeight: 600, color: K.gris }, "—", h("div", { display: "flex", marginLeft: 14 }, tachado(p.autor))),
      h("div", { fontWeight: 800, color: ROJO }, "Nunca la dijo.")),
    h("div", { display: "flex", flexGrow: 1 }),
    // X draws the domain over the bottom-left corner, so the bottom ~115px only holds our own domain, on the right
    h("div", { fontFamily: "Familjen", fontWeight: 600, fontSize: 30, color: K.tinta }, p.id === "picasso" ? `Y no es la única: ${nunca} de las ${C.length} frases de famosos que citó.` : `Tampoco la de Picasso, que repitió ${picasso.usos.length} veces. En total, ${nunca} de ${C.length} frases de famosos.`),
    h("div", { display: "flex", justifyContent: "flex-end", alignItems: "center", height: 115, fontFamily: "Familjen", fontWeight: 500, fontSize: 26, color: K.gris }, "datos.mati.lol/picasso"),
  );
}
