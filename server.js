const express = require("express");
const app = express();
const Joi = require("joi");
const cors = require("cors");
const multer = require("multer");

let products = 
[
  {
    "_id" : 1,
    "img_name" : "image/Junghans.webp",
    "info" : [
      "Junghans Max Bill",
      "Lucretia",
      "The Bauhaus is a German artistic movement which lasted from 1919-1933. Its goal was to merge all artistic mediums into one unified approach, that of combining an individual's artistry with mass production and function. Bauhaus design is often abstract, angular, and geometric, with little ornamentation."
    ],
    "posted": "Jan 8, 2023",
    "price" : "$1200.00",
    "size" : "38mm",
    "brand" : "Junghans",
    "gender" : "Unisex"
  },
  {
    "_id" : 2,
    "img_name" : "image/col.webp",
    "info" : [
      "Prada Luna Rossa Ocean Eau de Parfum",
      "Lucretia",
      "Prada Luna Rossa Ocean Eau de Parfum is a new cologne for men with intensity and a long-lasting scent that holds a powerful, transformative journey to open new horizons."
    ],
    "posted": "Jan 8, 2023",
    "price" : "$150.00",
    "size" : "50ml",
    "brand" : "Prada",
    "gender" : "Men"
  },
  {
    "_id" : 3,
    "img_name" : "image/pants.webp",
    "info" : [
      "Cariaggi Cashmere Pants",
      "Lucretia",
      "Ideal for when you're on the slopes or even lounging at home, Finely provides effortless at ease style. Extremely soft and insulating, our high quality cashmere provides unmatched comfort. Using Cariaggi cashmere, we only source the best quality cashmere that is sustainably and ethically collected during shedding season"
    ],
    "posted": "Jan 8, 2023",
    "price" : "$900.00",
    "size" : "32",
    "brand" : "Cariaggi",
    "gender" : "Men"
  },
  {
    "_id" : 4,
    "img_name" : "image/airforce.webp",
    "info" : [
      "Jordan 1 Retro High OG Chicago Reimagined Lost & Found 2022",
      "Lucretia",
      "Inspired by the 1985 classic, the Jordan 1 Retro High OG Reimagined Lost and Found hit the shelves in November 2022. The shoe comes with aged detailing and distressed features throughout. The Lost and Found version has a vintage look and a dusty finish. The uppers are constructed using cracked leather and have pre-yellowed accents that lend a fabricated worn-out look. The mid-panel, leather on the collar, and the toe feature a cracked finish that complements the scuffs across the packaging. There are subtle differences in each pair that remind sneakerheads of the original colorway. Just like the OG Air Jordan 1 Chicago, the Lost and Found version comes with a larger Swoosh on the side panel that mimics the look of the 80s."
    ],
    "posted": "Jan 8, 2023",
    "price" : "$200.00",
    "size" : "10 women, 8 men",
    "brand" : "Nike",
    "gender" : "Unisex"
  },
  {
    "_id" : 5,
    "img_name" : "image/espresso.webp",
    "info" : [
      "saeco xelsis super automatic espresso machine",
      "Lucretia",
      "At the nexus of versatility, masterful design and superb performance is the brand-new WMF 1500 S+. Ideal for medium-usage environments averaging 100 cups per day, the stylishly constructed and compact 1500 S+ produces unparalleled coffee indulgences."
    ],
    "posted": "Jan 8, 2023",
    "price" : "$1800.00",
    "size" : "12.8 x 32.2 x 23.2",
    "brand" : "Saeco",
    "gender" : "Unisex"
  },
  {
    "_id" : 6,
    "img_name" : "image/legmes.webp",
    "info" : [
      "Hyperice NormaTec Pulse 2.0 Recovery System",
      "Lucretia",
      "Warmup and recover like never before. The Normatec 2.0 uses dynamic air compression to create a restorative massage that is shown to increase circulation and help you feel refreshed faster. "
    ],
    "posted": "Jan 8, 2023",
    "price" : "$899.99",
    "size" : "Medium",
    "brand" : "Hyperice",
    "gender" : "Unisex"
  },
  {
    "_id" : 7,
    "img_name" : "image/garden.jpg",
    "info" : [
      "Gardyn Hydroponics Growing System Indoor Garden Vertical Garden Planter",
      "Lucretia",
      "All In One: Gardyn Gen 1.0 home indoor growing garden kit produces food in weeks. Delivery includes plant seeds, plant food, LED grow light, water tank, light timer, all accessories. It's like an indoor greenhouse kit for a regular and tiny home & kitchen."
    ],
    "posted": "Jan 8, 2023",
    "price" : "$699",
    "size" : "12 x 24x 60",
    "brand" : "Gardyn",
    "gender" : "none"
  },
  {
    "_id" : 8,
    "img_name" : "image/robe.webp",
    "info" : [
      "Versace Unisex Barocco Sleeve Robe",
      "Lucretia",
      "Versace barocco sleeve robe with all-over print logo detail. Approx. length: 45 size Medium.Shawl collar with logo opening.Long sleeves. Self-tie belt."
    ],
    "posted": "Jan 8, 2023",
    "price" : "$595",
    "size" : "Medium",
    "brand" : "Versace",
    "gender" : "Unisex"
  }
];


app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, __dirname + "/public/image");
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  },
});

const upload = multer({ storage });



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  res.json(products);
});

app.post("/api/", upload.single("image"), (req, res) => {
  const result = validateProduct(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const product = {
    id: products.length + 1,
    img_name: req.file.originalname,
    info: JSON.parse(req.body.info), // Parse the JSON string to get the array
    posted: req.body.date,
    price: req.body.price,
    size: req.body.size,
    brand: req.body.brand,
    gender: req.body.gender,
  };

  products.push(product);
  res.send(product);
});


const validateProduct = (product) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    image: Joi.any().required(),
    info: Joi.any().required(),
    posted: Joi.any().required(),
    price: Joi.string().required(),
    brand: Joi.string().required(),
    gender: Joi.string().required(),
  });

  return schema.validate(product);
}

app.listen(3000, () => {
  console.log("Im up");
});