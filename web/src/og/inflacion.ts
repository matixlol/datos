import { dichos, ipcMensual, MES, mayus, pct } from "../data/inflacion";
import { COLORES as C, h } from "./h";

export async function ogInflacion() {
  const ipc = await ipcMensual();
  const [ultMes, ultVal] = ipc[ipc.length - 1];
  const ultimo = [...dichos].sort((a, b) => a.fecha.localeCompare(b.fecha)).at(-1)!;
  const fecha = `${+ultimo.fecha.slice(8)} de ${MES[+ultimo.fecha.slice(5, 7) - 1]} de ${ultimo.fecha.slice(0, 4)}`;
  return h(
    "div",
    { width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", background: C.fondo, color: C.tinta, padding: "52px 72px 52px", fontFamily: "Bricolage" },
    h("div", { fontWeight: 500, fontSize: 50, lineHeight: 1.05, letterSpacing: "-0.01em" }, "¿La inflación ya empieza con cero?"),
    h(
      "div",
      { display: "flex", width: "100%", alignItems: "flex-end", justifyContent: "space-between" },
      h("div", { fontWeight: 800, fontSize: 240, lineHeight: 0.8, letterSpacing: "-0.05em", marginLeft: -8 }, ultVal < 1 ? "Sí." : "No."),
      h(
        "div",
        { display: "flex", flexDirection: "column", alignItems: "flex-end" },
        h("div", { fontWeight: 500, fontSize: 36, color: C.gris }, mayus(MES[+ultMes.slice(5) - 1])),
        h("div", { fontWeight: 800, fontSize: 104, lineHeight: 0.9, letterSpacing: "-0.03em" }, pct(ultVal)),
      ),
    ),
    h(
      "div",
      { display: "flex", flexDirection: "column", borderLeft: `6px solid ${C.celeste}`, paddingLeft: 24 },
      h("div", { fontWeight: 500, fontSize: 38, lineHeight: 1.2, maxWidth: 1000 }, `«${ultimo.cita}»`),
      h("div", { fontFamily: "Familjen", fontSize: 26, color: C.gris, marginTop: 8 }, `Milei, ${fecha}`),
    ),
  );
}
