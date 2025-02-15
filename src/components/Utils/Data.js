

const ProjectsData = [
    {
        "id": 0,
        "categorie": 0,
        "name": "Sea Of Sharks",
        "description": "Projet personnel réalisé sur mon temps libre, né de ma passion pour les jeux vidéo. Sea of Shark est un jeu où le joueur doit sauver la cargaison du capitaine Flyn tout en évitant les requins. Un système de classement permet aux joueurs de se comparer et de relever le défi.",
        "stacks": "Three.js, Vanilla.js",
        "link": "https://seaofsharks.vercel.app/",
        "year": 2022
    },
    {
        "id": 1,
        "categorie": 0,
        "name": "Olympique Lyonnais",
        "description": "Projet développé pour le club e-Lounge de l’Olympique Lyonnais. Les spectateurs participent à un jeu interactif où ils doivent répondre à des quiz en direct. Chaque bonne réponse fait avancer leur avatar vers les buts, créant une expérience ludique et engageante. L’objectif est d’animer les matchs et d’encourager l’interaction entre les supporters.",
        "stacks": "Svelte, Supabase, Three.js",
        "link": "",
        "year": 2024
    },
    {
        "id": 2,
        "categorie": 0,
        "name": "A deux mains",
        "description": "Projet réalisé en collaboration avec le musée de l'Orangerie pour élargir son audience. Nous avons conçu un site interactif racontant l’histoire du musée à travers trois lettres échangées entre Guillaume Apollinaire et Paul Guillaume.",
        "stacks": "Three.js, Vanilla.js",
        "link": "https://a-deux-mains.vercel.app/",
        "year": 2023
    },
    {
        "id": 3,
        "categorie": 0,
        "name": "Intel Adversegame",
        "description": "À l’occasion de la sortie de la dernière carte Intel, Samsung et Intel ont organisé un jeu concours. Les participants devaient se prendre en photo dans un cadre sportif et la publier sur le site pour être soumis aux votes des utilisateurs. Côté client, un dashboard permettait de trier les photos avant leur mise en ligne.",
        "stacks": "Svelte, Supabase",
        "link": "https://jeuxintel2024.fr/",
        "year": 2024
    },
    {
        "id": 4,
        "categorie": 4,
        "name": "Pixel Draw",
        "description": "Ce projet permet aux utilisateurs de réaliser des illustrations en pixel art de manière intuitive. Ils peuvent importer une image de référence pour la décalquer, ajuster la grille de pixels selon leurs besoins et utiliser une palette de couleurs personnalisable. Une fois leur création terminée, ils ont la possibilité de la télécharger.",
        "stacks": "Three.js, Vanilla.js",
        "link": "https://pixel-art-dun.vercel.app/",
        "year": 2022
    },
    {
        "id": 5,
        "categorie": 1,
        "name": "Sol De Janeiro",
        "description": "Pour le lancement de nouveaux produits, nous avons utilisé la réalité augmentée afin de donner vie aux packagings. Chaque boîte était dotée d’un code-barres et d’une image déclenchant une scène interactive, offrant ainsi une expérience immersive et engageante aux consommateurs.",
        "stacks": "Svelte, 8th-Wall, Three.js",
        "link": "https://soldejaneiro-celebrate-out-loud.com/",
        "year": 2024
    },
    {
        "id": 6,
        "categorie": 1,
        "name": "Century Box",
        "description": "Pour le lancement de nouveaux produits, nous avons utilisé la réalité augmentée afin de donner vie aux packagings. Chaque boîte était dotée d’un code-barres et d’une image déclenchant une scène interactive, offrant ainsi une expérience immersive et engageante aux consommateurs.",
        "stacks": "Svelte, 8th-Wall, Three.js",
        "link": "https://ar.atomicdigital.design/centurybox_demopackaging/",
        "year": 2024
    },
    {
        "id": 7,
        "categorie": 1,
        "name": "Diriyah Outernetpiece",
        "description": "Projet utilisant la technologie image tracking de 8th Wall pour superposer une scène 3D à une image détectée. Lorsqu’une image de référence est scannée, un contenu interactif apparaît précisément à sa position, enrichissant ainsi l’expérience visuelle et immersive.",
        "stacks": "Svelte, 8th-Wall, Three.js",
        "link": "https://ar.atomicdigital.design/piece-of-diriyah-ko/",
        "year": 2024
    },
    {
        "id": 8,
        "categorie": 1,
        "name": "Renault Mobilize",
        "description": "À l’occasion du Salon de l’Auto, nous avons conçu une expérience immersive combinant plusieurs technologies de réalité augmentée. Cette installation offrait aux visiteurs une interaction innovante avec les véhicules Renault, enrichissant leur découverte grâce à des animations et des contenus interactifs.",
        "stacks": "Three.js, 8th-Wall, Vanilla.js",
        "link": "https://ar.atomicdigital.design/mobilize-salon-auto/",
        "year": 2022
    },
    {
        "id": 9,
        "categorie": 1,
        "name": "Stevemadden",
        "description": "Projet utilisant la technologie image tracking de 8th Wall pour superposer une scène 3D à une image détectée. Lorsqu’une image de référence est scannée, un contenu interactif apparaît précisément à sa position, enrichissant ainsi l’expérience visuelle et immersive.",
        "stacks": "Three.js, 8th-Wall, Vanilla.js",
        "link": "",
        "year": 2022
    },
    {
        "id": 10,
        "categorie": 2,
        "name": "Electronicarts",
        "description": "À l’occasion de la sortie du jeu Immortals of Aveum, nous avons créé une version miniature du jeu pour sa promotion. L'objectif était de recréer l'expérience la plus fidèle possible à l'original,",
        "stacks": "Lens Studio, Vanilla.js",
        "link": "",
        "year": 2023
    },
    {
        "id": 11,
        "categorie": 2,
        "name": "Rabanne Phantom",
        "description": "Pour la sortie du nouveau parfum Phantom de Paco Rabanne, nous avons conçu une expérience immersive en réalité augmentée. Ce runner plongeait l’utilisateur dans un univers parisien ou il pouvait collecter des pièces.",
        "stacks": "Lens Studio, Vanilla.js",
        "link": "",
        "year": 2024
    },
    {
        "id": 12,
        "categorie": 2,
        "name": "Valentino",
        "description": "Ce projet utilise la réalité augmentée pour superposer des éléments numériques interactifs sur le monde réel. Grâce à des technologies comme le world tracking, il offre une expérience immersive où les utilisateurs peuvent interagir avec des objets 3D et découvrir des contenus enrichis.",
        "stacks": "Lens Studio, Vanilla.js",
        "link": "",
        "year": 2024
    },
    {
        "id": 13,
        "categorie": 2,
        "name": "Cartier Jewelry",
        "description": "Ce projet a permis à Cartier de promouvoir ses montres à travers une expérience de réalité augmentée. Les utilisateurs pouvaient essayer différents bijoux virtuellement, sans se déplacer en magasin, offrant ainsi une expérience immersive et pratique pour découvrir les produits.",
        "stacks": "Lens Studio, Vanilla.js",
        "link": "",
        "year": 2022
    },
    {
        "id": 14,
        "categorie": 2,
        "name": "Cruise Lanyard",
        "description": "Ce projet utilise la réalité augmentée pour superposer des éléments numériques interactifs sur le monde réel. Grâce à des technologies comme le tracking d’images, il offre une expérience immersive où les utilisateurs peuvent interagir avec des objets 3D et découvrir des contenus enrichis.",
        "stacks": "Lens Studio, Vanilla.js",
        "link": "",
        "year": 2023
    },
    {
        "id": 15,
        "categorie": 0,
        "name": "Neighborfood",
        "description": "Ce projet a pour but de connecter les voisins et permettre à ceux qui sont cuisiniers amateurs de proposer leurs spécialités culinaires à leur voisinage. L'application permet aux utilisateurs d'acheter des plats faits maison, créés par des particuliers à proximité, favorisant ainsi la convivialité et le travail à domicile.",
        "stacks": "Ruby-On-Rails, PostgreSQL",
        "link": "",
        "year": 2022
    },
    {
        "id": 16,
        "categorie": 0,
        "name": "32 Bits-Burger",
        "description": "À l’occasion de l’ouverture du restaurant 32 Bits Burger à Montpellier, j'ai conçu un site vitrine pour présenter le concept, le menu et les informations pratiques du restaurant. Ce site contient aussi toutes les informations nécessaires pour visiter le restaurant.",
        "stacks": "Vanilla.js",
        "link": "",
        "year": 2023
    },
    {
        "id": 17,
        "categorie": 3,
        "name": "Sïbo",
        "description": "Sibö est un jeu collaboratif en duo sur PC où les joueurs doivent unir leurs forces pour surmonter divers obstacles et retourner dans le monde réel. L’entraide et la stratégie sont essentielles pour progresser dans ce défi captivant.",
        "stacks": "Unity",
        "link": "",
        "year": 2023
    },
    {
        "id": 19,
        "categorie": 0,
        "name": "Poke 810",
        "description": "Ce projet, réalisé dans le cadre d’un exercice du Wagon, consiste en un clone du site Airbnb, mais au lieu d’appartements, notre version permet de louer des Pokémons. La page d'accueil met en avant les cinq Pokémons les plus populaires, les plus puissants et les plus attractifs. Ce projet a été réalisé en collaboration avec Corentin et Isabelle.",
        "stacks": "Ruby-On-Rails, PostgreSQL",
        "link": "",
        "year": 2022
    },
    {
        "id": 20,
        "categorie": 2,
        "name": "Orange Rugby",
        "description": "À l’occasion de la Coupe du Monde de Rugby, nous avons créé une expérience immersive en partenariat avec Orange. Des joueurs de rugby grandeur nature apparaissaient dans les rues de Paris.",
        "stacks": "Lens Studio, Vanilla.js",
        "link": "",
        "year": 2023
    },
    {
        "id": 21,
        "categorie": 4,
        "name": "Sound Visualisation",
        "description": "Réalisé sur mon temps libre, ce projet permet aux utilisateurs de vivre une expérience sonore unique, tout en la visualisant dans un univers immersif. L’objectif est de fusionner son et visuel pour offrir une immersion totale.",
        "stacks": "Three.js, Vanilla.js",
        "link": "https://sound-visualisation.vercel.app/",
        "year": 2023
    },
    {
        "id": 22,
        "categorie": 4,
        "name": "Haunted House",
        "description": "Ce projet a été réalisé pour apprendre les bases de Three.js. Il s’agit d’une première exploration de la création d’animations et de scènes en 3D sur le web, permettant de mieux comprendre la manipulation des objets et des caméras dans un environnement virtuel.",
        "stacks": "Three.js, Vanilla.js",
        "link": "https://ibra-haunted-house.vercel.app/",
        "year": 2023
    },
    {
        "id": 23,
        "categorie": 4,
        "name": "Data Visualisation",
        "description": "Ce projet propose une manière originale de visualiser les données relatives au cinéma français. Grâce à une interface interactive, il permet de présenter de manière claire et dynamique des informations sur l’évolution du secteur.",
        "stacks": "Three.js, Vanilla.js",
        "link": "https://data-visualisation-self.vercel.app/",
        "year": 2023
    },
    {
        "id": 24,
        "categorie": 4,
        "name": "DrawOnMesh",
        "description": "Ce projet a été réalisé pour apprendre les bases de Three.js. Il s’agit d’une première exploration de la création d’animations et de scènes en 3D sur le web, permettant de mieux comprendre la manipulation des objets et des caméras dans un environnement virtuel.",
        "stacks": "Three.js, Vanilla.js",
        "link": "https://exp-taupe.vercel.app/",
        "year": 2024
    },
    {
        "id": 25,
        "categorie": 1,
        "name": "Calvin Klein Chalk",
        "description": "Ce projet a été réalisé pour promouvoir la nouvelle collection de Calvin Klein. L’utilisateur est invité à plonger dans un univers totalement immersif, offrant une expérience interactive et captivante en lien avec l’identité de la marque.",
        "stacks": "Svelte, 8th-Wall, Three.js",
        "link": "",
        "year": 2023
    },
    {
        "id": 26,
        "categorie": 1,
        "name": "New Year Operation",
        "description": "Chaque fin d’année, nous envoyons une carte de vœux interactive à nos clients. Pour 2025, nous avons conçu une carte en réalité augmentée qui révèle une scène festive animée avec des feux d’artifice, offrant une expérience immersive et originale pour célébrer la nouvelle année.",
        "stacks": "Three.js, Vanilla.js, 8th-wall",
        "link": "https://ar.atomicdigital.design/newyear2025/",
        "year": 2024
    }
]
export default ProjectsData;