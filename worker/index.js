// Cloudflare Worker in front of the static export.
//
// Production (`npm run deploy`): the files in ./out are served directly by
// Cloudflare; this Worker is not called for them.
//
// Staging (`npm run deploy:staging`): every request comes here first
// (run_worker_first) and needs the staging password (HTTP Basic, any user
// name). robots.txt is no protection (seo_rule.md, rule 8); the password is.
// Set it once with: npx wrangler secret put STAGING_PASSWORD --env staging
const worker = {
  async fetch(request, env) {
    if (env.STAGING_PASSWORD) {
      const auth = request.headers.get("Authorization") ?? "";
      const [scheme, encoded] = auth.split(" ");
      const password = scheme === "Basic" && encoded ? atob(encoded).split(":").slice(1).join(":") : "";
      if (!timingSafeEqual(password, env.STAGING_PASSWORD)) {
        return new Response("Accès réservé à l'équipe du projet.", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="Festival Gymkhana - staging", charset="UTF-8"',
            "Content-Type": "text/plain; charset=utf-8",
            "X-Robots-Tag": "noindex, nofollow",
          },
        });
      }
      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);
      headers.set("X-Robots-Tag", "noindex, nofollow");
      headers.set("Cache-Control", "private, no-store");
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;

// Constant-time comparison, so the password cannot be guessed from timings.
function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}
