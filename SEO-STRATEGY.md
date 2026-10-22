> **Décisions du 22 octobre 2026** : domaine définitif **festivalfalardeau.ca** (acheté). L'utilisateur s'occupe de la fiche Google, du courriel exposé et de la correction des liens entrants avec le client. Robots d'IA : autorisés (approuvé).

# Stratégie SEO — Festival Gymkhana de Saint-David-de-Falardeau

Recherche du 22 octobre 2026. Aucun code modifié. Site analysé : version locale (`http://localhost:4173`, build de production), aucune URL de production.

**Légende utilisée dans tous les livrables**
- **[Fait]** : vérifié par nous aujourd'hui (page ouverte, fichier lu, requête exécutée).
- **[Outil]** : estimation d'un outil tiers (DataForSEO, Google Ads). Ce ne sont pas des données de Google Search Console.
- **[Hypothèse]** : notre lecture, à valider.
- **À CONFIRMER** : information à obtenir du client.

**Sources client** : il n'y a ni `CLAUDE.md` ni `notes-client.md` dans le projet. Nous avons utilisé `seo_rule.md`, `PRODUCT.md`, `references/brief.md` et `docs/gabarit-site-premium/2-DOSSIER-CLIENT.md`.

---

## 1. Entreprise

| Élément | Valeur | Statut |
|---|---|---|
| Nom | Festival Gymkhana de Saint-David-de-Falardeau (forme courte : Festival Gymkhana de Falardeau, sigle FGF) | [Fait] brief |
| Type | Organisme à but non lucratif, comité de bénévoles | [Fait] brief ; statut juridique exact À CONFIRMER |
| Fondation | 2007, par Suzie Gauthier | [Fait] brief |
| Éditions | 17ᵉ édition du 6 au 9 août 2026 | [Fait] Le Réveil, CKAJ, saguenayfjord.ca |
| Lieu | Place des Festivals, 51, rue du Chalet, Saint-David-de-Falardeau (Qc) G0V 1C0 | [Fait] fiche Google et brief. Attention : saguenayfjord.ca affiche « 100, rue du Chalet » |
| Contact | 418-540-5700 (info, camping), 418-820-6134 (kiosques), festivalfalardeau@gmail.com | [Fait] brief |
| Domaine | Ancien domaine `festivalfalardeau.com` perdu en décembre 2025 | [Fait] brief. Aujourd'hui, le domaine ne répond pas à nos requêtes ; nous ne pouvons pas confirmer son contenu actuel |
| Nouveau domaine | `festivalfalardeau.ca` est enregistré et affiche « Coming Soon » | [Fait] DNS et page ouverte. **À CONFIRMER : appartient-il au festival ?** |

## 2. Services (ce que le site « vend »)

Entrée gratuite, donc la « conversion » est une visite planifiée ou une inscription, pas un achat.
1. **Le festival grand public** : 4 jours en août, spectacles country, danse en ligne, zone familiale, déjeuners, messe country.
2. **La compétition de gymkhana** (environ 100 cavaliers, CBSLC, règlements de Cheval Québec) : spectateurs et compétiteurs.
3. **Le camping temporaire** : 40 $ la fin de semaine, sans réservation.
4. **Les kiosques et exposants**.
5. **Les partenariats et commandites** (paliers « Au grand galop », etc.).

## 3. Zones

- **Zone principale** : Saguenay (Chicoutimi est à 20 minutes), Saint-David-de-Falardeau, Saint-Honoré, Shipshaw.
- **Zone secondaire** : Saguenay–Lac-Saint-Jean, et les compétiteurs du circuit de la Côte-Nord.
- **Pages par ville** : aucune. Le festival a un seul lieu, et une page par ville ne serait que du texte presque identique (règle 3 de `seo_rule.md`).

## 4. Différenciation (ce que personne d'autre ne peut copier)

- **Le gymkhana comme cœur du festival.** Dans la région, Festival Western du Boisé et Festival du Cowboy de Chambord misent sur le **rodéo**. Le FGF est le festival du **gymkhana sanctionné** (course de barils, sauvetage, relais…). [Fait] pages concurrentes ouvertes
- **L'entrée gratuite pour tout** : site, compétitions, spectacles. Chambord vend des billets ; Boisé vend un passeport (55 $ selon SimpleTix). [Fait] SERP et pages
- **Familial et de proximité** : 20 minutes de Chicoutimi, déjeuners communautaires, messe country.
- **Expertise réelle** : règlement officiel, juges, épreuves expliquées. La page `/epreuves/` va déjà plus loin que Wikipédia et Cheval Québec pour un spectateur. [Fait] comparaison à l'étape D

## 5. Preuves disponibles et manquantes

| Preuve | Statut |
|---|---|
| « Plus de 12 000 visiteurs » | [Outil/tiers] Québec Vacances et saguenayfjord.ca. **À CONFIRMER par le client avant tout usage** |
| « Plus de 145 chevaux, plus de 300 départs » (2019) | [Fait] Le Quotidien, 10 août 2019. Chiffre daté |
| « Records d'achalandage » (14ᵉ édition, 2023) | [Fait] Radio-Canada |
| Avis Google : 4,8/5 sur 4 avis | [Fait] fiche Google via DataForSEO |
| Photos réelles | [Fait] banque client ; versions sans filigrane promises |
| Résultats des compétitions, palmarès, nombre de cavaliers par édition | À CONFIRMER |
| Témoignages | Absents. Aucun faux avis (règle 3) |

## 6. Objectifs de conversion

1. **Planifier sa visite** : clic sur « Itinéraire », lecture de la programmation, appel au 418-540-5700.
2. **Compétiteurs** : clic sur l'inscription par courriel, téléchargement du règlement.
3. **Exposants** : appel au 418-820-6134.
4. **Partenaires** : courriel « Devenir partenaire ».
5. **Suivre le festival** : clic vers Facebook.

Aucun outil de mesure n'est installé sur le site. [Fait] code. À prévoir, sous le standard Loi 25 (règles 7 et 12) : bannière de consentement, GA4 bloqué jusqu'au choix, Consent Mode v2. Ces clics seront à suivre comme événements.

## 7. Robots d'IA

**Recommandation : autoriser** les robots d'IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) et le robot de recherche OAI-SearchBot. Le `robots.txt` actuel autorise tout. [Fait]

Raison [Hypothèse] : un festival gratuit a intérêt à être cité quand quelqu'un demande « quoi faire au Saguenay en août ». Aucun contenu payant n'est à protéger. **À CONFIRMER** avec le client.

## 8. Problèmes critiques trouvés (avant tout le reste)

1. **La fiche Google du festival n'est pas revendiquée, et son lien « site web » pointe vers `festivalfalardeau.com/portail2/`**, le domaine perdu. [Fait] DataForSEO business listings et panneau de connaissance sur 4 recherches. Chaque personne qui clique « Site Web » dans Google part vers le nouveau propriétaire du domaine.
2. **L'adresse courriel `info@festivalfalardeau.com` est encore publiée** (fiche saguenayfjord.ca). [Fait] page ouverte. Les messages envoyés à cette adresse peuvent arriver chez le nouveau propriétaire du domaine. C'est un risque de confidentialité, à corriger partout.
3. **Le domaine de production n'est pas réglé.** Le site déclare `festivalgymkhanafalardeau.ca` (URL canoniques, sitemap, robots), un domaine qui n'existe pas. Le logo, lui, affiche `www.festivalfalardeau.ca`. [Fait] DNS. Il faut fixer `NEXT_PUBLIC_SITE_URL` avant la mise en ligne.
4. **Adresses incohérentes** : 51 ou 100, rue du Chalet. [Fait] Google et brief contre saguenayfjord.ca.
5. **La page 404 hérite de l'URL canonique de l'accueil.** Elle est déjà en `noindex`, donc l'impact est faible. [Fait] build local

## 9. État des lieux technique (étape A)

| Point | État [Fait] |
|---|---|
| Framework | Next.js 16.3.8, App Router, export statique, React 19.3 |
| Pages indexables | `/` (1 212 mots) et `/epreuves/` (1 586 mots) |
| Métadonnées | Title et description uniques, canonical, Open Graph, `lang="fr-CA"` |
| H1 | Un par page : « Festival Gymkhana de Saint-David-de-Falardeau » et « Les épreuves » |
| Sitemap / robots | `app/sitemap.ts` et `app/robots.ts` présents |
| JSON-LD | Organization + Place (accueil), BreadcrumbList (épreuves). Pas d'`Event` : les dates 2027 ne sont pas connues, donc pas de données inventées (règle 6) |
| Analytics | Aucun |
| Performance | Lighthouse mobile : 96 (accueil) et 98 (épreuves). 100 en SEO, accessibilité et bonnes pratiques |
| Search Console / GA4 | **Non disponibles** : aucune propriété (pas de domaine en production). Pas de point de départ daté possible. À brancher dès la mise en ligne |
| Ancien site | La liste complète des anciennes URL n'a pas pu être récupérée (Wayback Machine hors ligne le 22 octobre). Seule URL connue : `/portail2/`. À COMPLÉTER |

## 10. Coût DataForSEO de cette recherche

[Outil] Estimation selon la grille publique de DataForSEO, à valider dans le tableau de bord (`/seo-spend`) :

| Appel | Nombre | Coût estimé (USD) |
|---|---|---|
| SERP en direct (organic live advanced) | 9 | ≈ 0,02 $ |
| Business listings (carte) | 1 | ≈ 0,01 $ |
| Labs keyword ideas (résultat inutilisable, voir keyword-map) | 1 | ≈ 0,02 $ |
| Volumes Google Ads (4 lots de 10, limite de l'outil) | 4 | ≈ 0,20 à 0,30 $ |
| Difficulté et intention (bulk) | 2 | ≈ 0,02 $ |
| Mots-clés positionnés de 2 concurrents | 2 | ≈ 0,05 $ |
| **Total** | **19** | **≈ 0,30 à 0,45 $** |

**Le solde semble épuisé** : 4 appels ont échoué avec une erreur 402 (paiement requis) et n'ont pas été facturés. Il s'agit de 3 appels Backlinks et d'une recherche Google. Le module Backlinks et la visibilité IA n'ont donc pas pu être mesurés. Les réponses sont dans `.seo-cache/`, ajouté au `.gitignore`.
