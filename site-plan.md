> **Mise à jour du 22 octobre 2026 (décision du client)** : le site compte seulement ces pages indexables : `/`, `/activite-festival/` (remplace « Le festival », axée sur les activités), `/epreuves-gymkhana/` (ancienne `/epreuves/`, 301 en place) et `/confidentialite/` (Loi 25), plus la page 404. Les pages Éditions, Contact et Nouvelles ne sont **pas** créées ; les coordonnées restent dans « Planifier ma visite » et le pied de page.

# Plan du site — Festival Gymkhana de Falardeau

Date : 22 octobre 2026. Principe : peu de pages, chacune avec une raison d'exister. Pas de pages par ville (un seul lieu ; règle 3). Toute URL modifiée passe par `redirect-map.csv` (règle 4).

**Prérequis avant la mise en ligne**
- Fixer le domaine définitif (`festivalfalardeau.ca` ? **À CONFIRMER**) dans `NEXT_PUBLIC_SITE_URL`. Il alimente les URL canoniques, le sitemap et robots.txt.
- Corriger la 404 : retirer l'URL canonique héritée de l'accueil.
- Passer le modèle de titre de « %s | Festival Gymkhana de Falardeau » (33 caractères) à **« %s | Gymkhana de Falardeau »** (22 caractères), pour que les titres des pages internes restent sous environ 60 caractères.

**Légende** : ✅ existe, ✳️ à créer. « Title » = le titre complet affiché dans Google.

---

## ✅ 1. Accueil — `/`

- **Intention** : marque, dates, programmation, « quoi faire au Saguenay en août ».
- **Title proposé** : `Festival Gymkhana de Falardeau, Saguenay | Entrée gratuite` (58 car.)
  - Actuel : `Festival Gymkhana de Saint-David-de-Falardeau | Saguenay` (55). Le nom complet reste dans le H1.
- **Meta description** : « Festival country et western gratuit à 20 minutes de Chicoutimi : compétition de gymkhana, spectacles, danse en ligne et activités familiales, en août. » (environ 150 car.)
- **H1** : Festival Gymkhana de Saint-David-de-Falardeau (inchangé)
- **H2** : Le festival en bref · Programmation · Le gymkhana · En famille · Planifier ma visite · Comme la famille · Partenaires (inchangés). Ajouter dans « En bref » la phrase-réponse à la question réelle « Quelles sont les activités incontournables à faire à Saint-David-de-Falardeau ? »
- **Information unique** : programme heure par heure, la gratuité, le gymkhana sanctionné CBSLC, le camping sans réservation, les règles du site.
- **Preuves nécessaires** : nombre de visiteurs et de cavaliers vérifiés (**À CONFIRMER**), photos sans filigrane.
- **Liens sortants** : `/epreuves/`, `/le-festival/`, `/editions/`, `/contact/`, Facebook, itinéraire.
- **Liens entrants** : toutes les pages (logo, pied de page), articles `/nouvelles/`.
- **Données structurées** : `Organization` (déjà là). `Event` **seulement quand les dates 2027 sont confirmées** : `startDate`, `endDate`, `location` (Place), `isAccessibleForFree: true`, `eventStatus`, `organizer` (règle 6).

## ✅ 2. Épreuves — `/epreuves/`

- **Intention** : compétiteurs (règlement, inscription) et spectateurs curieux (« course de barils », « gymkhana cheval »).
- **Title proposé** : `Épreuves de gymkhana et inscription | Gymkhana de Falardeau` (59 car.)
- **H1** : Les épreuves (inchangé)
- **H2 existants** : Comment ça se juge · Les jeux de centre · Les jeux de tour · Le Grand Prix · Le règlement officiel · S'inscrire
- **À ajouter, tiré des vraies questions** : un bloc court « La course de barils en chiffres » (distance du patron, temps typiques, pénalité si un baril tombe) qui répond à « Quelle est la distance d'une barrel race ? ». Données à valider avec le règlement de Cheval Québec ; ne rien inventer.
- **Information unique** : vidéo d'une course de barils filmée au festival ; lien vers le calendrier CBSLC ; exigences sanitaires (test de Coggins).
- **Preuves** : règlement officiel en PDF (déjà lié), nom des juges et officiels de l'édition (**À CONFIRMER**).
- **Liens** : entrants depuis l'accueil (section gymkhana, bandeau, menu) ; sortants vers `/#jour-samedi`, `/contact/`, cheval.quebec.
- **Données structurées** : `BreadcrumbList` (déjà là). Pas de `FAQPage` (résultats enrichis FAQ retirés par Google le 7 mai 2026).

## ✳️ 3. À propos — `/le-festival/`

- **Intention** : confiance (E-E-A-T) ; journalistes et partenaires.
- **Title** : `Notre histoire depuis 2007, comité et bénévoles | Gymkhana de Falardeau` (environ 72 car., **trop long**) → `Histoire du festival depuis 2007 | Gymkhana de Falardeau` (56 car.)
- **H1** : Le festival depuis 2007
- **H2** : Une idée née à cheval (texte de la fondatrice, Suzie Gauthier) · Le comité et les bénévoles · Le circuit CBSLC et Cheval Québec · Le festival en chiffres
- **Information unique** : le texte d'origine de la fondatrice (dans le brief), les vrais noms du comité 2025, environ 60 bénévoles.
- **Preuves** : photos du comité, chiffres d'édition (**À CONFIRMER**), articles de presse (Le Quotidien, Radio-Canada, Le Réveil, CKAJ).
- **Liens** : entrant depuis la section « Comme la famille » de l'accueil (remplace la section repliée sur téléphone) ; sortants vers `/editions/` et `/contact/`.
- **Données structurées** : `AboutPage`, `Organization` (`foundingDate` 2007, `founder`).

## ✳️ 4. Réalisations — `/editions/`

- **Intention** : preuves, fraîcheur, recherches « festival gymkhana 2025 » ou « 2026 ».
- **Title** : `Éditions passées, programmes et photos | Gymkhana de Falardeau` (60 car.)
- **H1** : Les éditions passées
- **H2** : une section par édition (2026 · 2025 · 2024 · 2023), avec les artistes, les faits saillants et les photos.
- **Information unique** : les programmes réels (le brief contient 2023, 2024 et 2025), les gagnants du Grand Prix (**À CONFIRMER**), les médias qui en ont parlé.
- **Preuves** : photos par édition, liens vers les articles.
- **Liens** : sortants vers `/le-festival/` et l'accueil ; entrants depuis le pied de page et les articles de bilan.
- **Données structurées** : `CollectionPage` ; pas d'`Event` pour les éditions passées (inutile).
- **Note** : sur l'accueil, la programmation 2024 « en aperçu » pourra être remplacée par le vrai programme 2027 une fois publié. L'ancienne vivra ici.

## ✳️ 5. Contact — `/contact/`

- **Intention** : information, camping, kiosques et exposants, partenariat, médias.
- **Title** : `Nous joindre : info, kiosques et partenariat | Gymkhana de Falardeau` (environ 68 car., trop long) → `Nous joindre, kiosques et médias | Gymkhana de Falardeau` (55 car.)
- **H1** : Nous joindre
- **H2** : Information et camping · Kiosques et exposants · Devenir partenaire · Médias (photos, logo, communiqués)
- **Information unique** : bons numéros par besoin, trousse média (logo, photos HD, fiche technique). La trousse attire des liens de médias.
- **Liens** : entrants depuis le menu, le pied de page et les sections partenaires et visite ; sortants vers courriel, téléphone et Facebook.
- **Données structurées** : `ContactPage`, `Organization.contactPoint`.

## ✳️ 6. Nouvelles — `/nouvelles/` + articles `/nouvelles/<slug>/`

- **Intention** : soutenir les clusters 3, 4 et 7 (voir content-plan.md) ; donner aux médias et aux annuaires une page à lier.
- **Title de l'index** : `Nouvelles du festival | Gymkhana de Falardeau` (45 car.)
- **Liens** : chaque article est lié à la page de service qu'il soutient (`/epreuves/`, `/` ou `/contact/`).
- **Données structurées** : `Article` (auteur réel, date de publication).

## ✳️ 7. Confidentialité — `/confidentialite/` (requis, pas pour le SEO)

Obligatoire dès que des mesures d'audience sont ajoutées (Loi 25, règles 7 et 12). Indexable, sans priorité.

---

## Pages à **ne pas** créer

| Idée | Pourquoi non |
|---|---|
| Une page par ville (Chicoutimi, Jonquière…) | Un seul lieu ; ce serait du texte presque identique (règle 3) |
| « Rodéo Saguenay » | Le FGF n'a pas de rodéo |
| « Camping Saguenay » | Camping temporaire de festival ; l'information reste dans « Planifier ma visite » |
| Une FAQ séparée avec `FAQPage` | Les réponses ont leur place dans les pages qui en parlent ; le résultat enrichi FAQ n'existe plus |

## Maillage interne résumé

```
Accueil ──> Épreuves ──> (#inscription) Contact
   │  └──> Le festival ──> Éditions
   └──> Contact      Nouvelles/* ──> page de service soutenue
Pied de page (toutes les pages) ──> Accueil, Épreuves, Le festival, Éditions, Contact, Nouvelles
```
