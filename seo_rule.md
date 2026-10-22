Séparer faits vérifiés / estimations d'outils / hypothèses dans chaque rapport. Les outils tiers donnent des estimations, pas les données de Google.
Ne jamais dire qu'une URL a été testée si elle n'a pas été ouverte.
Pas de faux avis, pas de pages villes quasi identiques, pas de copie de concurrents.
Toute URL modifiée ou supprimée passe par redirect-map.csv approuvé (301 vers l'équivalent, sinon 404/410, jamais tout vers l'accueil).
Next.js App Router : Server Components par défaut, contenu principal dans le HTML serveur, Metadata API, app/sitemap.ts et app/robots.ts. Next.js 16 : jamais priority; preload/eager/fetchPriority seulement sur l'élément LCP si les mesures le justifient.
JSON-LD seulement s'il est exact et correspond au contenu visible.
Standard NCWEB Loi 25 : GA4 et pixels bloqués jusqu'au choix du visiteur, Refuser aussi visible qu'Accepter, préférences modifiables.
robots.txt n'est pas une sécurité : le staging se protège par mot de passe.
Français québécois clair. Build + lint après chaque lot. Rien en production sans mon approbation.
Anti-style IA : passer chaque texte dans la vérification de contenu de Claude SEO (fonctions humanize et verify de /seo content; syntaxe exacte dans docs/COMMANDS.md). Bannir le jargon générique typique de l'IA et vérifier chaque affirmation.
Économie API : sauvegarder les réponses brutes de DataForSEO dans .seo-cache/ (ajouté à .gitignore) et le relire avant tout appel identique, pour ne jamais payer deux fois.
Loi 25 et vitesse : Google Consent Mode v2 sans bloquer le rendu HTML serveur; la bannière ne doit ni devenir l'élément LCP ni décaler la page sur mobile (CLS ≤ 0,1).
Jamais l'Indexing API pour des pages ordinaires (réservée aux offres d'emploi et diffusions en direct) : sitemap, liens internes et inspection d'URL suffisent.
Site bilingue seulement si le client le demande, avec hreflang.