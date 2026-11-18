// Monthly consumer inflation (INDEC) and Milei's "starts with zero" quotes.
// CPI is fetched at build time; if the API is down the committed copy is used.
import dichosJson from "./dichos.json";
import ipcGuardado from "./ipc.json";

export interface Dicho {
  fecha: string;
  lugar: string;
  cita: string;
  fuente: string;
  objetivo?: string;
  contra?: string;
  nota?: string;
  broma?: boolean;
  principal?: boolean;
}

export const dichos = dichosJson as Dicho[];

const API =
  "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&start_date=2023-11-01&format=json&limit=200";

let cache: Promise<[string, number][]> | null = null;

/** [YYYY-MM, monthly % change], from December 2023 on. */
export function ipcMensual(): Promise<[string, number][]> {
  return (cache ??= (async () => {
    let niveles = ipcGuardado as [string, number][];
    try {
      const r = await fetch(API, { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(20_000) });
      if (r.ok) niveles = ((await r.json()) as { data: [string, number][] }).data;
    } catch {
      // keep the committed copy
    }
    const out: [string, number][] = [];
    for (let i = 1; i < niveles.length; i++) {
      out.push([niveles[i][0].slice(0, 7), Math.round((niveles[i][1] / niveles[i - 1][1] - 1) * 1000) / 10]);
    }
    return out.filter(([m]) => m >= "2023-12");
  })());
}

export const MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
export const MES3 = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
export const pct = (v: number) => v.toFixed(1).replace(".", ",") + "%";
export const nombreMes = (ym: string) => `${MES[+ym.slice(5) - 1]} de ${ym.slice(0, 4)}`;
export const mayus = (s: string) => s[0].toUpperCase() + s.slice(1);
