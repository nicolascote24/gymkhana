# Processus complet et messages à envoyer

Voici la suite exacte des étapes du projet Gymkhana, avec les messages que tu as envoyés, réécrits avec des variables.
Remplace les `{{...}}`. Ce qui est entre crochets `[ ]` est un choix à faire au moment venu.

## Étape 0 — Préparer l'environnement (une fois)
- Skills installés : `frontend-stack` (routeur), `impeccable`, `taste-skill`, `emil-design-eng` (animations), `ui-ux-pro-max`, `frontend-design`.
- Un navigateur automatisé pour les captures (Playwright MCP ; en cloud, ajouter `--no-sandbox`).
- Le dossier client prêt (voir `2-DOSSIER-CLIENT.md`).

## Étape 1 — Premier message
Coller `1-PROMPT-DE-DEPART.md` (variables remplacées).
Claude répond avec : un diagnostic, environ 10 questions numérotées, et une invitation à partager les références. **Il ne code pas.**

## Étape 2 — Répondre aux questions en un seul message
Modèle (c'est la forme de tes réponses pour Gymkhana) :

```
1- dates : {{connues / inconnues : on peut supposer et décider plus tard}}
2- objectif du site : {{ex. renseigner les visiteurs et montrer la programmation}}
3- publics / nature : {{ex. famille, compétition, country}}
4- couleurs et ambiance : {{ex. sable chaud, western mais ambiance festival}}, moderne et premium
5- logo : {{garder tel quel / à refaire}}
6- photos : utilise les photos fournies ; si tu as besoin d'autres photos, dis-le-moi ou propose d'en générer pour un résultat premium
7- hero : la photo hero_idee est une idée ; si tu as mieux c'est ok, je veux absolument un résultat premium, ultra haut de gamme et moderne
8- technique : on utilise {{Next.js}}
9- langue : {{français}}
10- sections : je pensais {{hero - c'est quoi - programmation - activités - …}} ; choisis les sections qui conviennent le mieux, comme le ferait un pro UI/UX designer et développeur

Je veux vraiment une identité forte {{IDENTITE}}, tout en restant moderne et premium.
```

## Étape 3 — Choisir la direction
Claude propose 3 directions distinctes et une recommandation. Ta réponse type :

```
Oui pour la direction [1], et ok pour la structure.
[Garde aussi de la direction 2 : … ]
N'oublie pas que ce n'est pas seulement « {{NOM_COURT}} », mais « {{NOM_COMPLET}} ».
Le site doit être au maximum premium et haut de gamme !
```

Claude pose ensuite quelques dernières questions de cadrage (installations, contenu provisoire…) : réponds-y.

## Étape 4 — Valider le plan
Claude présente le plan de match puis, avant de coder, écrit `PRODUCT.md` et le contrat de direction. Ta réponse : `ok` / tes corrections.

## Étape 5 — Le hero, seul, jusqu'à validation
C'est l'étape qui demande le plus d'allers-retours (4 à 5 pour Gymkhana). Messages utiles :

```
Regarde-le avec les yeux et le goût d'un pro designer et UI/UX qui veut un résultat moderne et haut de gamme, et dis-moi ce que tu en penses.
```
```
J'aime le hero en général, mais repense-le entièrement pour un résultat haut de gamme, premium et moderne qui fera WOW. Utilise bien ton routeur de skills.
```
```
[Si une version précédente était meilleure] Finalement je préférais la version d'avant, avec [tel élément] mieux positionné.
```
Ne passe pas à la suite tant que le hero ne te plaît pas.

## Étape 6 — Les autres sections
```
Passe aux autres sections comme tu l'avais prévu. N'oublie pas que chaque section doit être premium et haut de gamme !
```
Claude construit, vérifie en captures ordinateur et mobile, puis t'envoie une planche de captures.

## Étape 7 — Critique et audit
```
Fais un audit et une critique du site, s'il te plaît.
```
(Il utilise les commandes `critique` et `audit` du skill impeccable.)
Puis, aux questions de priorité, réponds par exemple :
```
Règle tout ça. Agis comme un designer professionnel de sites web et choisis ce qui est le mieux.
```

## Étape 8 — Retours de goût, section par section
Forme qui a bien marché :
```
Le site est très bien en général, mais [ce qui choque] : [ex. la nav ne fait pas moderne sur la même couleur ; certaines typos trop grandes ; la section X n'est pas assez premium ; les fonds pâles sont un peu fades].
Analyse ça comme un pro designer doublé d'un pro dev UI/UX avec les meilleurs goûts. Le site doit être moderne, premium, stunning, avec une belle identité {{IDENTITE}}.
```
```
Je ne suis pas certain de comprendre cette section et à quoi elle sert : analyse-la comme un pro designer et développeur web senior, utilise ton routeur de skills et regarde comment faire mieux.
```

## Étape 9 — Vérifier les sources (règle « n'invente rien »)
```
Section par section, dis-moi où tu as pris l'information.
```
Tout ce qui est marqué « mon texte », « supposition » ou « illustration » est à valider avec le client.

## Étape 10 — Mise en ligne
Vercel : importer le dépôt GitHub, puis Deploy. Chaque modification poussée met le site à jour.

---

## Les règles qui ont fait le résultat
1. **Aucun code avant un plan approuvé.**
2. **Du vrai contenu dès le départ** : dossier client, vraies photos, image de hero.
3. **Le routeur de skills** (`frontend-stack`) choisit le skill qui mène à chaque étape.
4. **N'inventer aucune information** ; tout ce qui est provisoire est étiqueté.
5. **Le hero validé seul**, avant le reste du site.
6. **Des captures ordinateur et mobile** à chaque étape, et une critique et un audit à la fin.
7. **Toujours rappeler l'exigence** : premium, moderne, haut de gamme, WOW.
