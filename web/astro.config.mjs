import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";

// Fails the build if any generated page lacks an Open Graph image.
const exigirOg = {
  name: "exigir-og",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const root = fileURLToPath(dir);
      const htmls = [];
      const walk = async (d) => {
        for (const e of await readdir(d, { withFileTypes: true })) {
          const p = join(d, e.name);
          if (e.isDirectory()) await walk(p);
          else if (e.name.endsWith(".html")) htmls.push(p);
        }
      };
      await walk(root);
      const faltan = [];
      for (const f of htmls) {
        const html = await readFile(f, "utf8");
        const m = html.match(/<meta property="og:image" content="[^"]*\/og\/([^"]+\.png)"/);
        if (!m) { faltan.push(`${f}: no og:image`); continue; }
        try { await readFile(join(root, "og", m[1])); } catch { faltan.push(`${f}: og/${m[1]} not generated`); }
      }
      if (faltan.length) throw new Error("Pages without an Open Graph image:\n" + faltan.join("\n"));
    },
  },
};

export default defineConfig({
  site: "https://datos.mati.lol",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [exigirOg],
});
