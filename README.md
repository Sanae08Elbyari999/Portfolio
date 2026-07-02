# Portfolio — Sanae EL-BYARI

Portfolio personnel moderne avec design dark/yellow.

## Structure
```
portfolio/
├── index.html              ← Page principale
├── css/
│   └── style.css           ← Tous les styles
├── js/
│   └── main.js             ← Animations, typewriter, révélations
└── assets/
    └── images/
        ├── photo_profile1.png   ← Photo debout
        ├── photo_profile2.png   ← Photo souriante
        └── photo_profile3.png   ← Photo avec lunettes (hero)
```

## Pour ajouter vos captures d'écran

### Dans les expériences
Cliquez directement sur les zones grises "Cliquez pour ajouter une capture"
→ Un file picker s'ouvre, choisissez votre image.

Ou remplacez dans le HTML les blocs `screenshot-placeholder` par :
```html
<img src="assets/images/mon-screen.png" alt="..." class="screenshot-img" />
```

### Dans les projets académiques
Remplacez le contenu de chaque `.proj-screenshot` par une vraie image :
```html
<div class="proj-screenshot">
  <img src="assets/images/food-delivery.png" alt="Food Delivery" />
</div>
```

## Personnalisation rapide

- **Couleur accent** : cherchez `--accent: #f5c518` dans style.css
- **Votre nom** : cherchez `Sanae EL-BYARI` dans index.html
- **Vos liens** : section `#contact` et nav `.nav-cta`

## Ouverture
Double-cliquez sur `index.html` ou servez avec :
```bash
npx serve .
# ou
python -m http.server 8080
```
