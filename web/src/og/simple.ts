import { COLORES as C, h } from "./h";

// Default card: title and one line, for pages without a custom image.
export const ogSimple = (titulo: string, bajada: string) =>
  h(
    "div",
    { width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", background: C.fondo, color: C.tinta, padding: "72px 80px", fontFamily: "Familjen" },
    h("div", { display: "flex", flexDirection: "column" },
      h("div", { fontFamily: "Bricolage", fontWeight: 800, fontSize: 104, lineHeight: 1, letterSpacing: "-0.03em" }, titulo),
      h("div", { marginTop: 28, fontSize: 38, lineHeight: 1.25, color: C.gris, maxWidth: 900 }, bajada),
    ),
    h("div", { fontSize: 28, color: C.gris }, "datos.mati.lol"),
  );
