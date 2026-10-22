# Carte des mots-clés — Festival Gymkhana de Falardeau

Date des données : 22 octobre 2026. Légende : **[Fait]**, **[Outil]** et **[Hypothèse]** (voir SEO-STRATEGY.md).

**Sources**
- **Volumes** : [Outil] Google Ads via DataForSEO, Québec, français. Moyenne mensuelle sur 12 mois, avec le pic du mois le plus haut. « n/d » = Google Ads n'a pas de donnée (volume trop faible).
- **Difficulté (KD 0-100)** : [Outil] DataForSEO Labs, Canada, français. « n/d » = pas de donnée.
- **Intention** : [Outil] DataForSEO Labs (search_intent).
- **Search Console** : **aucune donnée** pour toutes les lignes (pas de propriété, site non publié). C'est un point de départ à créer au lancement.
- **Fonctionnalités Google** : [Fait] observées dans les SERP de Saguenay le 22 octobre 2026.

**Score** (1 à 5 par critère, total sur 20) : **A** = intention d'achat (ici : venir au festival ou s'inscrire), **V** = valeur pour le client, **F** = faisabilité (difficulté et force du top 10), **R** = capacité du client à mieux répondre. On priorise par ce score, pas par volume.

**Constat général** : la niche est petite et très saisonnière. Les recherches de marque explosent en août (« gymkhana falardeau » : 1 000 en août 2026, contre 10 à 40 le reste de l'année). L'enjeu principal n'est pas de gagner des requêtes génériques. Il est de **reprendre la 1ʳᵉ place sur sa propre marque**, aujourd'hui occupée par Facebook et les sites touristiques, et de **corriger les liens qui mènent à l'ancien domaine**.

---

## Clusters priorisés

| # | Cluster | Variantes | Intention [Outil] | Volume [Outil] | KD | Score A/V/F/R = total | Fonctionnalités Google [Fait] | Concurrents dans le top 10 [Fait] | Page cible | Décision | Confiance |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Marque** | gymkhana falardeau ; festival gymkhana ; festival falardeau ; festival gymkhana falardeau ; festival gymkhana de falardeau | Navigationnelle et informationnelle | 110 (pic 1 000, août 2026) ; 10 (pic 90) ; 20 (pic 170) ; 10 (pic 90) ; 140 au Canada [Outil, Labs] | 0 | 5/5/5/5 = **20** | Panneau de connaissance (site = ancien domaine), avis Google, Autres questions posées, vidéos courtes, recherches associées | facebook.com/FGF2015 (1), saguenayfjord.ca (2), bonjourquebec.com (3), saguenaylacsaintjean.ca (4), quebecvacances.com (5), médias | `/` | **Optimiser** : la page existe ; il faut le domaine, la fiche Google et les annuaires (voir link-plan) | Élevée |
| 2 | **Dates et programmation** | festival gymkhana de falardeau 2027 ; gymkhana falardeau programmation | Informationnelle | n/d (apparaît dans les recherches associées [Fait]) | n/d | 5/5/5/5 = **20** | Recherches associées « Gymkhana Falardeau 2026 programmation » | Mêmes sites que 1 ; fiches avec dates contradictoires (Bonjour Québec : « 6 au 9 août 2026 » et « Dates à venir ») | `/#programmation` | **Garder** sur l'accueil. Ajouter le JSON-LD `Event` dès que les dates 2027 sont confirmées | Moyenne (volume inconnu) |
| 3 | **Le sport (spectateurs curieux)** | gymkhana cheval ; course de barils ; course de baril ; barrel racing ; compétition équestre ; course de sauvetage cheval | Informationnelle | 110 (pic 260) ; 70 ; n/d ; 320 ; 50 ; n/d | 0 ; n/d ; — ; 0 ; 0 ; — | 2/4/4/5 = **15** | Aperçu IA, vidéos (YouTube de St-Tite), Autres questions posées (« Quelle est la distance d'une barrel race ? ») | cheval.quebec, wikipedia.org, madbarn.ca, festivalwestern.com (St-Tite), equistro.ca | `/epreuves/` | **Optimiser** : ajouter les réponses directes (distance, temps, pénalités) et la vidéo d'une course réelle | Moyenne |
| 4 | **Compétiteurs** | compétition gymkhana québec ; gymkhana saguenay-lac-st-jean ; compétition baril québec ; calendrier gymkhana | Informationnelle et navigationnelle | n/d (recherches associées [Fait]) | n/d | 5/5/4/5 = **19** | Aperçu IA, recherches associées | datacheval.quebec, lechevalcanadien.ca, pages Facebook de clubs, equi-go.com | `/epreuves/#inscription` + article « Calendrier » (content-plan) | **Optimiser** + **créer** l'article calendrier | Moyenne |
| 5 | **Festival western et country régional** | festival country saguenay ; festival western saguenay ; festival country québec ; festival cowboy ; liste des festivals country 2026 | Informationnelle | 10 (pic 50) ; n/d ; 20 ; 90 (pic 320) ; 590 au Canada [Outil, mots-clés de Chambord] | n/d ; — ; — ; 9 ; n/d | 3/4/3/4 = **14** | Pack local (Boisé, St-Nazaire, Chambord), Autres questions posées (« Où trouver une liste des festivals country prévus ? ») | festivalducowboy.com, rodeoshipshaw.com, quebecvacances.com, bonjourquebec.com, festivalwestern.com | `/` (title et intro) | **Optimiser** : nommer clairement « festival country et western » dans le title, la description et l'intro | Moyenne |
| 6 | **Termes génériques nationaux** | festival western ; festival country ; rodéo ; rodéo québec | Informationnelle | 1 000 (pic 2 900) ; 1 000 (pic 2 900) ; — ; 40 | 28 ; 21 ; 28 ; n/d | 2/2/1/2 = **7** | Panneaux de St-Tite | festivalwestern.com (St-Tite, 8 100/mois sur sa marque), festivalducowboy.com | — | **Ne pas cibler**. « Rodéo » : le FGF n'en a pas, ce serait trompeur | Élevée |
| 7 | **Sorties régionales en été** | festival saguenay ; festival chicoutimi ; festival saguenay août ; festival lac saint jean ; festival gratuit | Informationnelle | 260 (pic 880) ; 210 (pic 880) ; n/d ; 20 ; 30 (pic 140) | 3 ; 9 ; — ; — ; n/d | 3/4/3/3 = **13** | Aperçu IA, Autres questions posées (« Quels sont les prochains festivals à venir ? ») | Agrégateurs : saguenaylacsaintjean.ca, bonjourquebec.com, quebecvacances.com, saguenayfjord.ca | `/` + **présence dans les agrégateurs** | **Optimiser** (mentions « Saguenay », « à 20 minutes de Chicoutimi », « gratuit ») ; gagner surtout par les fiches des agrégateurs (link-plan) | Moyenne |
| 8 | **Famille** | activité famille saguenay ; quoi faire saguenay ; quoi faire en famille saguenay | Informationnelle, un peu commerciale | 90 (pic 320, concurrence Ads HIGH) ; 1 000 (pic 2 900) ; n/d | 8 ; 0 ; — | 3/3/2/3 = **11** | Pack local (Okwari, Contact Nature, Escaparium), Autres questions posées | ville.saguenay.ca, quebecvacances.com (pages « en famille »), saguenayfjord.ca, tripadvisor | `/#activites` | **Ne pas cibler directement** ; demander l'inscription aux pages « en famille, été » de Québec Vacances et Tourisme SLSJ (link-plan) | Moyenne |
| 9 | **Camping** | camping saguenay ; camping falardeau | Commerciale | 1 900 (pic 5 400) ; n/d | n/d | 2/2/1/2 = **7** | Pack local de campings | Campings permanents | `/#visite` | **Ne pas cibler** : camping temporaire de festival, sans réservation. L'information reste sur la page | Élevée |
| 10 | **Programme de soirée** | danse en ligne saguenay ; spectacle country saguenay ; messe country | Navigationnelle et informationnelle | 30 ; 10 ; 10 | n/d | 3/3/4/4 = **14** | — | Écoles de danse, Facebook | `/#programmation` | **Garder** ; nommer les écoles (Pascale Dufour, Nathalie Paquet) et les artistes une fois confirmés | Faible (volumes faibles) |
| 11 | **Municipalité** | saint-david-de-falardeau ; activités à Saint-David-de-Falardeau | Mixte | 3 600 (pic 5 400) ; n/d (Autres questions posées [Fait]) | n/d | 2/3/2/4 = **11** | Autres questions posées : « Quelles sont les activités incontournables à faire à Saint-David-de-Falardeau ? » | villefalardeau.ca, Facebook de la municipalité | — | **Ne pas cibler** ; obtenir un lien depuis le site de la municipalité (link-plan) | Moyenne |

## Questions réelles (« Autres questions posées », SERP de Saguenay, 22 octobre 2026) [Fait]

- Quelles sont les activités incontournables à faire à Saint-David-de-Falardeau ?
- Y aura-t-il un festival de country au Canada en 2026 ?
- Où puis-je trouver une liste des festivals country prévus en 2026 ?
- Quels sont les prochains festivals à venir ?
- Quels spectacles sont prévus au Saguenay en 2026 ?
- Quelle est la programmation estivale pour 2026 ?
- Quelle est la distance d'une barrel race ?
- Où et quand aura lieu le concours western en 2026 ?
- Quelle est la course de cheval la plus connue ?

## Limites des données (à lire)

- **DataForSEO Labs « keyword ideas »** n'a rien donné d'utile pour cette niche : 80 suggestions sans rapport, comme « sommo festival » ou « tour de france 2026 ». Fichier : `.seo-cache/labs-keyword-ideas-canada-fr-2026-10-22.json`. Nous avons utilisé une liste ciblée et les volumes Google Ads.
- **Volumes Google Ads** : des fourchettes arrondies (10, 20, 70…). Sous 10, Google ne donne rien. Ce sont des estimations, pas des données Search Console.
- **Écart de mots-clés (domain_intersection)** : non exécuté. Les deux concurrents directs se positionnent surtout sur le **rodéo**, que le FGF n'offre pas. L'écart partagé observé (festival du cowboy, cowboy fest, rodéo, quebec rodeo) ne correspond pas à l'offre du client.
- **Visibilité IA** : non mesurée (solde DataForSEO épuisé). Observation seulement : Google affiche un « aperçu IA » sur 6 des 9 recherches testées.
