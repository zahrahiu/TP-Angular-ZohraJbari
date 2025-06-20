const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let cart = [];

app.get("/api/products", (req, res) => {
let products = [
  {
    id: "1",
    name: "1 Million",
description: "1 Million de Paco Rabanne est bien plus qu’un parfum : c’est une déclaration audacieuse. Ce chef-d'œuvre doré séduit dès les premiers instants avec une fraîcheur explosive de pamplemousse et de menthe poivrée, suivie par l’intensité sensuelle de la cannelle et la noblesse du cuir. L’ambre chaleureux et les bois blancs laissent un sillage puissant et inoubliable. Un parfum idéal pour l’homme confiant, charismatique et ambitieux. Ingrédients principaux : pamplemousse, menthe poivrée, cannelle, cuir, ambre, bois blancs."
,    imageUrl: "assets/images/1 million.png",
    ingredientsImageUrl: "assets/images/1 million ingredients.png", 
    hoverImageUrl: "assets/images/1 million package.png",
    category: "homme",
    genre: "oriental épicé",
    marque: "Paco Rabanne",
    price: 1000,
    discountPercentage: 30,
    quantity: 10,
    offerEndsInSeconds: 120,
     volumes: [
      { label: "50ml", price: 950, imageUrl: "assets/images/1 million 50 ml.png" },
      { label: "100ml", price: 1000, imageUrl: "assets/images/1 million.png"},
      { label: "200ml", price: 1800 ,imageUrl: "assets/images/1 million 200 ml.png"}
    ]
  },
  {
    id: "BLEUCHANEL",
    name: "Bleu de Chanel",
description: "Bleu de Chanel incarne l’homme libre, élégant et mystérieux. Sa composition sophistiquée débute sur des notes vivifiantes de pamplemousse et de gingembre, équilibrées par la chaleur des bois précieux et l'encens. Un équilibre parfait entre fraîcheur et profondeur, idéal pour les esprits indépendants. Ce parfum enveloppe celui qui le porte d’une aura magnétique et irrésistible. Ingrédients principaux : pamplemousse, gingembre, bois de santal, cèdre, patchouli, encens."
,imageUrl: "assets/images/bleu de chanel.png",
       ingredientsImageUrl: "assets/images/bleu de chanel ingredients.png.jpg", 

      hoverImageUrl: "assets/images/bleu de chanel pachage.png",
    category: "homme",
    genre: "aromatique boisé",
    marque: "Chanel",
    price: 2200,
    discountPercentage: 20,
    quantity: 8,
    offerEndsInSeconds: 12000,
    volumes: [
      { label: "50ml", price: 1000, imageUrl: "assets/images/bleu de chanel 50 ml.png" },
      { label: "100ml", price: 2200 ,imageUrl: "assets/images/bleu de chanel.png"},
    ]
  },
  {
    id: "CHANCECHANEL",
    name: "Chance Chanel",
description: "Chance de Chanel est une ode à l’optimisme et à la spontanéité. Cette fragrance joyeuse et pétillante s’ouvre sur un éclat de poivre rose, révélant un cœur floral doux de jasmin, puis s’épanouit sur un fond de patchouli velouté et de musc blanc. Un parfum féminin, libre et inattendu, qui laisse un sillage de lumière et d’élégance. Ingrédients principaux : poivre rose, jasmin, patchouli, musc blanc, iris."
,     imageUrl: "assets/images/Chance Chanel.png",
    ingredientsImageUrl: "assets/images/chance chanel ingredients.jpg", 

    hoverImageUrl: "assets/images/Chance Chanel package.png",
    category: "femme",
    genre: "floral fruité",
    marque: "Chanel",
    price: 1950,
    discountPercentage: 30,
    quantity: 5,
    offerEndsInSeconds: 420
  },
  {
    id: "JADORE",
    name: "Dior J'adore",
description: "J’adore de Dior incarne la beauté radieuse et la féminité absolue. C’est un bouquet floral somptueux où l’ylang-ylang se mêle à la rose damascena et au jasmin sambac, créant une harmonie parfaite. L’ajout de notes fruitées et musquées apporte de la douceur et de la sensualité à ce parfum envoûtant. Son flacon bijou reflète le raffinement et la grâce. Ingrédients principaux : ylang-ylang, rose damascena, jasmin sambac, orchidée, prune, musc."
,    imageUrl: "assets/images/dior j'adore.png",
     ingredientsImageUrl: "assets/images/dior j'adore ingredients.png", 

    hoverImageUrl: "assets/images/dior j'adore package.png",
    category: "femme",
    genre: "floral",
    marque: "Dior",
    price: 2500,
    quantity: 6,
    volumes: [
      { label: "100ml", price: 2500 ,imageUrl: "assets/images/dior j'adore.png"},
      { label: "150ml", price: 3000, imageUrl: "assets/images/dior j'adore 150 ml.png" },

    ]
  },
  {
    id: "LAVIEESTBELLE",
    name: "La Vie est Belle",
   description: "La Vie est Belle est plus qu’un parfum : c’est une déclaration de bonheur et de liberté. Ce jus gourmand marie la douceur fruitée de la poire, la noblesse de l’iris, et la chaleur du patchouli. La vanille et la praline viennent enrober le tout pour offrir un sillage réconfortant et lumineux. Il incarne une féminité naturelle, éclatante et joyeuse. Ingrédients principaux : poire, iris, praline, vanille, patchouli, fève tonka."
,imageUrl: "assets/images/La vie est belle.png",
        ingredientsImageUrl: "assets/images/la vie est belle ingrediants.png", 

    hoverImageUrl: "assets/images/la vie est belle package.png",
    category: "femme",
    genre: "floral gourmand",
    marque: "Lancôme",
    price: 2300,
    quantity: 7,
     volumes: [
      { label: "15ml", price: 1500, imageUrl: "assets/images/La vie est belle 15ml.png" },
      { label: "50ml", price: 2300,imageUrl: "assets/images/La vie est belle.png"},
      { label: "100ml", price: 3000 , imageUrl: "assets/images/La vie est belle 100ml.png" },

    ]
  },
  {
    id: "SAUVAGE",
    name: "Sauvage - Dior",
    description: "Sauvage de Dior est une explosion de fraîcheur brute et magnétique. Inspiré par les grands espaces et la nature sauvage, il s’ouvre sur la bergamote éclatante de Calabre, suivie de la puissance du poivre noir et de la profondeur minérale de l’ambroxan. Ce parfum incarne la virilité à l’état pur, entre tradition et modernité. Son sillage intense laisse une impression inoubliable de force et de liberté. Ingrédients principaux : bergamote, poivre noir, ambroxan, lavande, élémi, vétiver."
, imageUrl: "assets/images/sauvage.png",
           ingredientsImageUrl: "assets/images/sauvage ingredients.jpg", 

    hoverImageUrl: "assets/images/sauvage package.png",
    category: "homme",
    genre: "aromatique fougère",
    marque: "Dior",
    price: 2400,
    discountPercentage: 50,
    quantity: 9,
    offerEndsInSeconds: 22000,
    volumes: [
      { label: "50ml", price: 950, imageUrl: "assets/images/sauvage 50ml.png" },
      { label: "100ml", price: 2400,imageUrl: "assets/images/sauvage.png"},
      { label: "150ml", price: 2900 , imageUrl: "assets/images/sauvage 150ml.png" },

    ]
  },
  {
    id: "SOSCANDAL",
    name: "So Scandal",
   description: "So Scandal est un parfum provocateur, ultra-féminin et glamour. Il capture l’audace et l’élégance à travers un trio floral enivrant : jasmin sambac, tubéreuse et fleur d’oranger. Une touche laiteuse vient adoucir cette composition sensuelle et raffinée. Parfait pour les femmes qui aiment se faire remarquer avec classe et audace. Ingrédients principaux : jasmin sambac, tubéreuse, fleur d’oranger, lait chaud."
, imageUrl: "assets/images/So Scandal.png",
              ingredientsImageUrl: "assets/images/So Scandal ingredients.png", 

    hoverImageUrl: "assets/images/So scandal package.png",
    category: "femme",
    genre: "floral tubéreuse",
    marque: "Jean Paul Gaultier",
    price: 2100,
    quantity: 4,
    volumes: [
      { label: "30ml", price: 750, imageUrl: "assets/images/so scandal 30ml.png" },
      { label: "50ml", price: 1500, imageUrl: "assets/images/so scandal 50ml.png"},
      { label: "150ml", price: 2100 ,imageUrl: "assets/images/So Scandal.png" },

    ]
  },
  {
    id: "VERSACEEROS",
    name: "Versace Eros",
    description: "Versace Eros est une fragrance envoûtante pour l’homme passionné et sûr de lui. Dès les premières secondes, la fraîcheur de la menthe et du citron s’impose, suivie par la douceur sucrée de la pomme verte. Le cœur révèle une alliance puissante de fèves tonka et de géranium, avant de laisser place à une vanille sensuelle et addictive. Une composition équilibrée entre intensité et sensualité. Ingrédients principaux : menthe, citron, pomme verte, fève tonka, géranium, vanille."
,
    imageUrl: "assets/images/versace.png",
                 ingredientsImageUrl: "assets/images/versace ingredients.jpg", 

    hoverImageUrl: "assets/images/versace package .png",
    category: "homme",
    genre: "aromatique fougère",
    marque: "Versace",
    price: 2150,
    quantity: 6,
    volumes: [
      { label: "5ml", price: 200, imageUrl: "assets/images/versace 5ml.png" },
      { label: "30ml", price: 950, imageUrl: "assets/images/versace 30ml.png"},
       { label: "50ml", price: 1500, imageUrl: "assets/images/versace 50ml.png" },
      { label: "100ml", price: 2150 ,imageUrl: "assets/images/versace.png" },

    ]
  },
  {
    id: "BONBONS",
    name: "Bon Bons",
   description: "Bon Bons est une déclaration de gourmandise et de tendresse. Créé par Viktor & Rolf, ce parfum séduit par sa douceur exquise et son design emblématique en forme de nœud. Il marie les notes crémeuses du caramel à la pêche juteuse, enrichies de touches de vanille et de bois ambré. Idéal pour celles et ceux qui aiment les senteurs sucrées, joyeuses et réconfortantes. Ingrédients principaux : caramel, pêche, vanille, bois ambré, fleur d’amandier, sucre glace."
, imageUrl: "assets/images/bon bons.jpg",
    category: "enfants",
    genre: "gourmand fruité",
    marque: "Viktor & Rolf",
    price: 1900,
    discountPercentage: 30,
    quantity: 7,
    offerEndsInSeconds: 12000
  },
  {
    id: "FROZEN",
    name: "Frozen Parfum",
    description: "Frozen Parfum est une invitation à l’univers magique des princesses. Inspirée du célèbre film de Disney, cette fragrance féerique s’adresse aux enfants rêveuses. Elle s’ouvre sur des notes fruitées glacées, suivies de fleurs de neige et d’un cœur sucré délicat. C’est un parfum doux, tendre et scintillant, parfait pour les petites princesses modernes. Ingrédients principaux : fruits givrés, vanille blanche, fleurs de neige, sucre glace, fleur de coton."
,imageUrl: "assets/images/frozen.jpg",
    category: "enfants",
    genre: "floral fruité",
    marque: "Disney",
    price: 1300,
    quantity: 12
  }
];


  res.send(products);
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

const users = {
  "email@email.com": {
    firstName: "Mohamed",
    lastName: "Ks",
    email: "email@email.com",
    password: "test",
  },
};

app.post("/api/signin", (req, res) => {
  const user = users[req.body.email];
  if (user && user.password === req.body.password) {
    res.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(401).send("Invalid user credentials.");
  }
});

const port = 3001;
app.listen(port, () => console.log(`API Server listening on port ${port}`));


