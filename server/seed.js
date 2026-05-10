const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  // MEN
  { name: "Premium Leather Belt", price: 1500, image: "/images/products/men/belt.jpg", category: "men" },
  { name: "Urban Black Hoodie", price: 4000, image: "/images/products/men/black-hoodie.jpg", category: "men", isNew: true },
  { name: "Streetwear Black Jacket", price: 5500, image: "/images/products/men/black-jacket.jpg", category: "men" },
  { name: "Tailored Wool Blazer", price: 7500, image: "/images/products/men/blazer.jpg", category: "men", aiRecommended: true },
  { name: "Business Casual Blazer", price: 7200, image: "/images/products/men/blazer2.jpg", category: "men" },
  { name: "Slim Fit Chinos", price: 2800, image: "/images/products/men/chinos.jpg", category: "men" },
  { name: "Classic Denim Jacket", price: 4500, image: "/images/products/men/denim-jacket.jpg", category: "men", isSale: true, originalPrice: 6000 },
  { name: "Essential Hoodie", price: 3500, image: "/images/products/men/hoodie.jpg", category: "men" },
  { name: "Oxford Button Down", price: 3200, image: "/images/products/men/oxford.jpg", category: "men" },
  { name: "Classic Polo Shirt", price: 2200, image: "/images/products/men/polo.jpg", category: "men" },
  { name: "Sport Polo Blue", price: 2400, image: "/images/products/men/polo2.jpg", category: "men" },
  { name: "Signature Polo", price: 2500, image: "/images/products/men/poloshirt.jpg", category: "men" },
  { name: "Winter Wool Scarf", price: 1200, image: "/images/products/men/scarf.jpg", category: "men" },
  { name: "Casual Linen Shirt", price: 2900, image: "/images/products/men/shirt.jpg", category: "men" },
  { name: "Formal Office Shirt", price: 3100, image: "/images/products/men/shirt2.jpg", category: "men" },
  { name: "Merino Wool Sweater", price: 4800, image: "/images/products/men/sweater.jpg", category: "men", aiRecommended: true },
  { name: "Basic Cotton Tee", price: 1200, image: "/images/products/men/tee.jpg", category: "men" },
  { name: "V-Neck Graphic Tee", price: 1400, image: "/images/products/men/tee2.jpg", category: "men" },
  { name: "Trouser & Shirt Set", price: 6500, image: "/images/products/men/trouser-shirtset.jpg", category: "men", isNew: true },
  { name: "Tailored Trousers", price: 3800, image: "/images/products/men/trousers.jpg", category: "men" },
  { name: "Contrast Shirt Set", price: 5800, image: "/images/products/men/trousershirt-2.jpg", category: "men" },
  { name: "Premium Co-ord Set", price: 6200, image: "/images/products/men/trousershirt3.jpg", category: "men", isSale: true, originalPrice: 8000 },
  { name: "Quilted Puffer Vest", price: 4200, image: "/images/products/men/vest.jpg", category: "men" },
  { name: "Heavy Wool Shirt", price: 3900, image: "/images/products/men/woolshirt.jpg", category: "men" },
  // WOMEN
  { name: "Designer Handbag", price: 4500, image: "/images/products/women/bag.jpg", category: "women", aiRecommended: true },
  { name: "Chic Leather Tote", price: 4800, image: "/images/products/women/bag2.jpg", category: "women" },
  { name: "Floral Summer Blouse", price: 2800, image: "/images/products/women/blouse.jpg", category: "women" },
  { name: "Cozy Knit Cardigan", price: 3500, image: "/images/products/women/cardigan.jpg", category: "women" },
  { name: "Longline Winter Coat", price: 8500, image: "/images/products/women/coat.jpg", category: "women", isNew: true },
  { name: "Silk Midi Dress", price: 5200, image: "/images/products/women/dress.jpg", category: "women" },
  { name: "Evening Floral Dress", price: 5500, image: "/images/products/women/dress2.jpg", category: "women" },
  { name: "Crystal Drop Earrings", price: 1200, image: "/images/products/women/ear-ring.jpg", category: "women" },
  { name: "Golden Hoop Earrings", price: 1500, image: "/images/products/women/earrings.jpg", category: "women" },
  { name: "High-Rise Skinny Jeans", price: 3200, image: "/images/products/women/jeans.jpg", category: "women" },
  { name: "Luxury Silk Scarf", price: 1800, image: "/images/products/women/scarf.jpg", category: "women" },
  { name: "Traditional Shawl", price: 2500, image: "/images/products/women/shawl.jpg", category: "women" },
  { name: "Silky 3-Piece Suite", price: 7800, image: "/images/products/women/silky3.jpg", category: "women", isNew: true },
  { name: "Pleated A-Line Skirt", price: 2900, image: "/images/products/women/skirt.jpg", category: "women" },
  { name: "Soft Turtleneck Sweater", price: 3400, image: "/images/products/women/sweater.jpg", category: "women" },
  { name: "Wide Leg Trousers", price: 3100, image: "/images/products/women/trousers.jpg", category: "women" },
  { name: "Premium Leather Purse", price: 4200, image: "/images/products/women/womenbag.jpg", category: "women" },
  { name: "Classic Trench Coat", price: 7200, image: "/images/products/women/womencoat2.jpg", category: "women", isSale: true, originalPrice: 9000 },
  { name: "Embroidered Party Dress", price: 6500, image: "/images/products/women/womendress4.jpg", category: "women" },
  { name: "Satin Evening Gown", price: 5900, image: "/images/products/women/womensilkydress2.jpg", category: "women", aiRecommended: true },
  { name: "Silk Wrap Dress", price: 5400, image: "/images/products/women/wrap-dress.jpg", category: "women" },
  // KIDS
  { name: "Kids Winter Beanie", price: 800, image: "/images/products/kids/beanie.jpg", category: "kids" },
  { name: "Boys Brown Jacket", price: 3200, image: "/images/products/kids/brown-jacket.jpg", category: "kids", isNew: true },
  { name: "Infant Cardigan", price: 2200, image: "/images/products/kids/cardigan.jpg", category: "kids" },
  { name: "Little Girls Dress", price: 2800, image: "/images/products/kids/dress.jpg", category: "kids" },
  { name: "Cotton Kids Hoodie", price: 2500, image: "/images/products/kids/hoodie.jpg", category: "kids" },
  { name: "Toddler Denim Jacket", price: 3100, image: "/images/products/kids/jacket.jpg", category: "kids" },
  { name: "Comfy Kids Joggers", price: 1500, image: "/images/products/kids/joggers.jpg", category: "kids" },
  { name: "Kids Frauk", price: 2900, image: "/images/products/kids/kid-frauk.jpg", category: "kids" },
  { name: "Kids Fleece Hoodie", price: 2400, image: "/images/products/kids/kid-hoodie.jpg", category: "kids" },
  { name: "Kids Velcro Shoes", price: 2600, image: "/images/products/kids/kid-shoes.jpg", category: "kids", aiRecommended: true },
  { name: "Kids Cotton Trousers", price: 1800, image: "/images/products/kids/kid-trouser.jpg", category: "kids" },
  { name: "Kids Denim Jacket v2", price: 3300, image: "/images/products/kids/kids-jacket2.jpg", category: "kids" },
  { name: "Kids Summer Set 2", price: 3500, image: "/images/products/kids/kids-set2.jpg", category: "kids" },
  { name: "Boys Winter Set", price: 4200, image: "/images/products/kids/kidset-2.jpg", category: "kids", isNew: true },
  { name: "Kids Casual Set", price: 3800, image: "/images/products/kids/kidset.jpg", category: "kids" },
  { name: "Kids Patterned Shirt", price: 1900, image: "/images/products/kids/kidshirt.jpg", category: "kids" },
  { name: "Girls Stretch Leggings", price: 1100, image: "/images/products/kids/leggings.jpg", category: "kids" },
  { name: "Kids Puffer Jacket", price: 4900, image: "/images/products/kids/puffer.jpg", category: "kids", isSale: true, originalPrice: 6500 },
  { name: "Yellow Kids Raincoat", price: 2700, image: "/images/products/kids/raincoat.jpg", category: "kids" },
  { name: "Kids Basic Set", price: 3000, image: "/images/products/kids/set.jpg", category: "kids" },
  { name: "Kids Athletic Sneakers", price: 3400, image: "/images/products/kids/sneakers.jpg", category: "kids", aiRecommended: true },
  { name: "Kids Character Tshirt", price: 1300, image: "/images/products/kids/tshirt.jpg", category: "kids" },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Seeded", products.length, "products!");
  mongoose.disconnect();
}

seed().catch(console.error);