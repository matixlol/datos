import { dichos, ipcMensual, MES, mayus, pct } from "../data/inflacion";
import { COLORES as C, h } from "./h";

export async function ogInflacion() {
  const ipc = await ipcMensual();
  const porMes = new Map(ipc);
  const [ultMes, ultVal] = ipc[ipc.length - 1];
  const principal = dichos.find((d) => d.principal);
  const meta = principal?.objetivo;
  return h(
    "div",
    { width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", background: C.fondo, color: C.tinta, padding: "60px 80px 56px", fontFamily: "Bricolage" },
    h("div", { fontWeight: 500, fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.01em" }, "¿La inflación ya empieza con cero?"),
    h(
      "div",
      { display: "flex", width: "100%", alignItems: "flex-end", justifyContent: "space-between" },
      h("div", { fontWeight: 800, fontSize: 300, lineHeight: 0.8, letterSpacing: "-0.05em", marginLeft: -10 }, ultVal < 1 ? "Sí." : "No."),
      h(
        "div",
        { display: "flex", flexDirection: "column", alignItems: "flex-end" },
        h("div", { fontWeight: 500, fontSize: 40, color: C.gris }, mayus(MES[+ultMes.slice(5) - 1])),
        h("div", { fontWeight: 800, fontSize: 120, lineHeight: 0.9, letterSpacing: "-0.03em" }, pct(ultVal)),
      ),
    ),
    meta && porMes.has(meta)
      ? h("div", { fontFamily: "Familjen", fontSize: 32, color: C.gris }, `Milei lo prometió para ${MES[+meta.slice(5) - 1]}. Fue ${pct(porMes.get(meta)!)}.`)
      : h("div", {}, ""),
  );
}
