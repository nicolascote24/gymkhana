// Consent (Loi 25, seo_rule.md rules 7 and 12). No tracker runs before the
// visitor chooses: Google Analytics 4 is loaded only after « Accepter », with
// Google Consent Mode v2 defaulting everything to denied. The choice is kept
// in this browser only (localStorage) and can be changed from the footer.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const CONSENT_KEY = "fgf-consentement";
// Asking again after 12 months, as the choice may have changed.
const MAX_AGE = 365 * 24 * 3600 * 1000;

export type Choice = "accepte" | "refuse";

export function readChoice(): Choice | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const { choice, at } = JSON.parse(raw) as { choice: Choice; at: number };
    return Date.now() - at < MAX_AGE ? choice : null;
  } catch {
    return null;
  }
}

export function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, at: Date.now() }));
  } catch {
    // Private mode: the choice holds for this visit only.
  }
}

type Gtag = (...args: unknown[]) => void;
const w = () => window as unknown as { dataLayer: unknown[]; gtag?: Gtag };

// Consent Mode v2: everything denied until the visitor accepts.
function stub(): Gtag {
  const win = w();
  win.dataLayer = win.dataLayer || [];
  win.gtag =
    win.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer.push(arguments);
    };
  return win.gtag;
}

let loaded = false;
export function startAnalytics() {
  if (!GA_ID || loaded) return;
  loaded = true;
  const gtag = stub();
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  // IP-based location stays approximate; no advertising signals.
  gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function stopAnalytics() {
  const gtag = w().gtag;
  if (gtag) gtag("consent", "update", { analytics_storage: "denied" });
}

// Conversion events, without personal data: the kind of link, never the
// number or the address itself.
export function track(event: string) {
  const gtag = w().gtag;
  if (loaded && gtag) gtag("event", event);
}
