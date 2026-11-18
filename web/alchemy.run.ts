// datos.mati.lol: a static Astro site on Cloudflare Workers, plus its
// Web Analytics site. Deploy from web/ with: bunx alchemy deploy --stage prod
import * as Alchemy from "alchemy";
import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";

const DOMINIO = "datos.mati.lol";

// Web Analytics for this hostname only. The beacon token it returns is
// public and lives in src/analytics.ts.
export const Analytics = Cloudflare.Rum.Site("Analytics", { host: DOMINIO });

export const Website = Cloudflare.Website.Astro("Website", {
  domain: DOMINIO,
  // OG images are rendered with native resvg, which needs Node, not workerd.
  prerenderEnvironment: "node",
  assets: { notFoundHandling: "404-page" },
});

export default Alchemy.Stack(
  "datos-web",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const analytics = yield* Analytics;
    const site = yield* Website;
    return { url: site.url, beaconToken: analytics.siteToken };
  }),
);
