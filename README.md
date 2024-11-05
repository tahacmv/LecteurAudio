# 🎵 Projet de Lecteur Audio avec Visualiseur de Fréquences

Ce projet est une application web qui comprend deux composants web distincts :
1. Un lecteur audio avec des contrôles de base (lecture, pause, volume, piste suivante/précédente).
2. Un visualiseur audio qui affiche des formes et des couleurs synchronisées avec les fréquences de l’audio.

## 🎯 Fonctionnalités

- **Lecteur Audio** : Composant `<audio-player>` qui permet de lire, mettre en pause, ajuster le volume, et naviguer entre différentes pistes audio.
- **Visualiseur de Fréquences** : Composant `<audio-visualizer>` qui analyse les fréquences audio et les affiche sous forme de barres colorées et animées sur un canevas.

## 🚀 Installation et Utilisation

### Prérequis

Aucun prérequis particulier. Ce projet est uniquement basé sur HTML, CSS, et JavaScript et peut être ouvert directement dans un navigateur compatible.

### Étapes d'Installation

1. Clonez le dépôt du projet :

   ```bash
   git clone https://github.com/votre_nom_utilisateur/audio-visualizer.git
   ```

2. Dans VsCode, Ouvrez le fichier `index.html` avec l'option open with live server.

### Structure du Projet

- **`audio-player`** : Composant de lecteur audio qui gère les contrôles audio et l’analyse des fréquences via le Web Audio API.
- **`audio-visualizer`** : Composant de visualisation qui affiche des barres colorées représentant les fréquences de l’audio en temps réel.

## 📄 Exemple d'Utilisation

Pour utiliser les composants dans une page HTML, vous pouvez ajouter le code suivant dans le fichier `index.html` :

```html
<audio-player id="audioPlayer"></audio-player>
<audio-visualizer id="audioVisualizer"></audio-visualizer>

<script>
  const audioPlayer = document.getElementById("audioPlayer");
  const audioVisualizer = document.getElementById("audioVisualizer");

  // Lier l'analyser du lecteur audio au visualiseur
  audioVisualizer.setAnalyserNode(audioPlayer.getAnalyserNode());
</script>
```

## 📚 Explication du Code

### `audio-player`

Le composant `<audio-player>` est responsable de :

1. La lecture et la mise en pause de l’audio.
2. L’ajustement du volume de l’audio.
3. La création d’un `AnalyserNode` avec le Web Audio API, qui capture les données de fréquences en temps réel.

### `audio-visualizer`

Le composant `<audio-visualizer>` reçoit l’analyser du lecteur audio et affiche les fréquences sous forme de barres colorées et dynamiques. 

### Communication entre les Composants

- Le composant `<audio-player>` expose une fonction `getAnalyserNode()` pour fournir l’analyser au composant `<audio-visualizer>`.
- Le composant `<audio-visualizer>` utilise la méthode `setAnalyserNode(analyser)` pour démarrer l’animation et afficher les fréquences audio.

## 🎨 Personnalisation

Vous pouvez personnaliser l’apparence et le style du visualiseur en modifiant les couleurs, la taille des barres, et les types de formes affichées dans le composant `<audio-visualizer>`.

## 💡 Idées d'Amélioration

- **Formes Personnalisées** : Expérimenter avec des formes différentes comme des cercles ou des ondes.
- **Effets de Transition** : Ajouter des transitions et effets pour rendre les visualisations encore plus dynamiques.
- **Interactivité** : Ajouter des options pour ajuster la sensibilité des visualisations ou changer le style des animations.

## 🛠️ Technologies Utilisées

- **HTML/CSS** : Structure et styles de base.
- **JavaScript (Web Components)** : Création de composants web personnalisés pour le lecteur et le visualiseur.
- **Web Audio API** : Analyse des fréquences audio et traitement du son.

## 📜 Licence

Ce projet est sous licence MIT. Vous êtes libre de le modifier et de le distribuer selon les conditions de la licence.

---

### 🎉 Merci d'avoir consulté ce projet ! 

N'hésitez pas à proposer des améliorations et à partager votre propre version de ce lecteur audio avec visualiseur !

--- 

Ce README fournit un aperçu clair du projet, des étapes d’installation, des fonctionnalités et des instructions d’utilisation en français.