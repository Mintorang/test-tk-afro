export interface MenuItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  sizeOptions: SizeOption[];
  defaultSizeIndex: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface SizeOption {
  size: string;
  price: number;
  portionInfo: string;
}

export const categories: Category[] = [
  {
    id: "rice",
    name: "Rice Dishes",
    description: "Authentic Nigerian rice specialties",
    imageUrl: "/images/dishes/jollofmeal.png"
  },
  {
    id: "soups-stews",
    name: "Soups & Stews",
    description: "Traditional Nigerian soups and stews",
    imageUrl: "/images/dishes/egusi1.png"
  },
  {
    id: "proteins",
    name: "Protein Dishes",
    description: "Variety of peppered meats and fish",
    imageUrl: "/images/dishes/Turkey.png"
  },
  {
    id: "sides",
    name: "Side Dishes",
    description: "Delicious sides including plantain and beans",
    imageUrl: "/images/dishes/beans_dodo.jpeg"
  },
  {
    id: "snacks",
    name: "Snacks & Pastries",
    description: "Nigerian snacks and pastries",
    imageUrl: "/images/dishes/tk-meatpie.png"
  },
  {
    id: "platters",
    name: "Fish Platters",
    description: "Special fish platters",
    imageUrl: "/images/dishes/tkfish3.png"
  },
  {
    id: "extras",
    name: "Extras & Packages",
    description: "Combos, postage and special packages",
    imageUrl: "/images/dishes/package.png"
  }
];

export const featuredDishes: MenuItem[] = [
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    description: "Our signature Jollof rice cooked with rich tomato sauce and aromatic spices",
    imageUrl: "/images/dishes/Jollof.jpeg",
    category: "Rice Dishes",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 50.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "fried-rice",
    name: "Fried Rice",
    description: "Flavorful fried rice with a perfect blend of peppers and seasonings",
    imageUrl: "/images/updates/friedrice.jpeg",
    category: "Rice Dishes",
    sizeOptions: [
      { size: "2L", price: 40.00, portionInfo: "2 Litres" },
      { size: "4L", price: 65.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "coconut-rice",
    name: "Coconut Rice",
    description: "Aromatic coconut rice made with fresh coconut milk",
    imageUrl: "/images/dishes/coconut_rice.jpeg",
    category: "Rice Dishes",
    sizeOptions: [
      { size: "2L", price: 50.00, portionInfo: "2 Litres" },
      { size: "4L", price: 80.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "native-rice",
    name: "Native Rice",
    description: "Traditional native rice cooked to perfection",
    imageUrl: "/images/dishes/pepperednativerice.jpg",
    category: "Rice Dishes",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "yam-porridge",
    name: "Yam Porridge",
    description: "Creamy yam porridge (Asaro) cooked with palm oil and seasonings",
    imageUrl: "/images/dishes/Yam porridge_(Asaro).jpg",
    category: "Rice Dishes",
    sizeOptions: [
      { size: "2L", price: 55.00, portionInfo: "2 Litres" },
      { size: "4L", price: 90.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  // Proteins - Peppered
  {
    id: "peppered-beef-chicken",
    name: "Peppered Beef and Chicken",
    description: "Perfectly seasoned combination of beef and chicken",
    imageUrl: "/images/dishes/chicken.png",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-assorted-meat",
    name: "Peppered Assorted Meat",
    description: "Spicy assorted meats in a rich pepper sauce",
    imageUrl: "/images/dishes/Assortedmeat.png",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 65.00, portionInfo: "2 Litres" },
      { size: "4L", price: 110.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-beef-fish",
    name: "Peppered Beef and Fish",
    description: "Combination of peppered beef and fish",
    imageUrl: "/images/dishes/Assorted_beef_fish.jpg",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 65.00, portionInfo: "2 Litres" },
      { size: "4L", price: 110.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-beef-turkey",
    name: "Peppered Beef and Turkey",
    description: "Peppered beef combined with turkey",
    imageUrl: "/images/dishes/peppered-turkey.jpg",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 65.00, portionInfo: "2 Litres" },
      { size: "4L", price: 110.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-beef-only",
    name: "Peppered Beef (Only)",
    description: "Peppered beef cooked to tender perfection",
    imageUrl: "/images/dishes/Assorted_beef_fish.jpg",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 70.00, portionInfo: "2 Litres" },
      { size: "4L", price: 120.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-hard-chicken",
    name: "Peppered Hard Chicken",
    description: "Peppered chicken (hard) with rich seasoning",
    imageUrl: "/images/dishes/softchicken.jpg",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 55.00, portionInfo: "2 Litres" },
      { size: "4L", price: 85.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-grilled-soft-chicken",
    name: "Peppered Grilled Soft Chicken",
    description: "Grilled soft chicken in pepper sauce",
    imageUrl: "/images/dishes/gpsoftchicken.jpg",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 55.00, portionInfo: "2 Litres" },
      { size: "4L", price: 85.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-fish",
    name: "Peppered Fish",
    description: "Spicy peppered fish",
    imageUrl: "/images/dishes/peppered_fish.jpg",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-turkey-wings",
    name: "Peppered Turkey Wings",
    description: "Peppered turkey wings",
    imageUrl: "/images/dishes/peppered-turkey.jpg",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "peppered-goat-meat",
    name: "Peppered Goat Meat",
    description: "Spicy peppered goat meat",
    imageUrl: "/images/dishes/pepperedgoatmeat.jpeg",
    category: "Protein Dishes",
    sizeOptions: [
      { size: "2L", price: 65.00, portionInfo: "2 Litres" },
      { size: "4L", price: 110.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  // Stews
  {
    id: "assorted-stew",
    name: "Assorted Stew",
    description: "Assorted stew with rich flavours",
    imageUrl: "/images/dishes/assorted-stew.jpeg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "chicken-stew",
    name: "Chicken Stew",
    description: "Hearty chicken stew",
    imageUrl: "/images/dishes/chicken-stew.png",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 55.00, portionInfo: "2 Litres" },
      { size: "4L", price: 85.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "fish-stew",
    name: "Fish Stew",
    description: "Delicious fish stew",
    imageUrl: "/images/dishes/Fish-stew.png",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "goat-meat-stew",
    name: "Goat Meat Stew",
    description: "Rich goat meat stew",
    imageUrl: "/images/dishes/pepperedgoatmeat.jpeg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 65.00, portionInfo: "2 Litres" },
      { size: "4L", price: 110.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "efo-riro",
    name: "Efo Riro",
    description: "Spinach stew with assorted meats and fish",
    imageUrl: "/images/dishes/efo-riro.png",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 99.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "efo-riro-with-fish",
    name: "Efo Riro (with fish)",
    description: "Efo Riro served with fish",
    imageUrl: "/images/dishes/efo-riro.jpg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    description: "Ground melon seed soup with assorted meat and vegetables",
    imageUrl: "/images/dishes/egusi_soup.jpg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 70.00, portionInfo: "2 Litres" },
      { size: "4L", price: 115.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "assorted-okra-soup",
    name: "Assorted Okra Soup",
    description: "Assorted okra soup",
    imageUrl: "/images/dishes/seafood-okro.png",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 65.00, portionInfo: "2 Litres" },
      { size: "4L", price: 110.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "seafood-okra-soup",
    name: "Seafood Okra Soup",
    description: "Okra soup with seafood",
    imageUrl: "/images/dishes/seafood-okro.jpg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 80.00, portionInfo: "2 Litres" },
      { size: "4L", price: 125.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "ayamase-sauce",
    name: "Ayamase Sauce",
    description: "Spicy green pepper sauce (Ofada style)",
    imageUrl: "/images/dishes/ayamase.jpg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 70.00, portionInfo: "2 Litres" },
      { size: "4L", price: 115.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "ofada-sauce",
    name: "Ofada Sauce",
    description: "Ofada sauce",
    imageUrl: "/images/dishes/ofada_sauce.jpg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 70.00, portionInfo: "2 Litres" },
      { size: "4L", price: 115.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "ogbono-soup",
    name: "Ogbono Soup",
    description: "Ogbono soup",
    imageUrl: "/images/dishes/ogbono soup.jpeg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "dodo-gizzards",
    name: "Dodo Gizzards",
    description: "Fried plantain with gizzards",
    imageUrl: "/images/dishes/dodogizz.jpg",
    category: "Side Dishes",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "assorted-meat-pepper-soup",
    name: "Assorted Meat Pepper Soup",
    description: "Assorted meat pepper soup",
    imageUrl: "/images/dishes/assorted-meat stew.jpg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 55.00, portionInfo: "2 Litres" },
      { size: "4L", price: 90.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "goat-meat-pepper-soup",
    name: "Goat Meat Pepper Soup",
    description: "Goat meat pepper soup",
    imageUrl: "/images/dishes/pepperedgoatmeat.jpeg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 60.00, portionInfo: "2 Litres" },
      { size: "4L", price: 100.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "fish-pepper-soup",
    name: "Fish Pepper Soup",
    description: "Spicy fish pepper soup",
    imageUrl: "/images/dishes/fishpeppersoup.jpg",
    category: "Soups & Stews",
    sizeOptions: [
      { size: "2L", price: 55.00, portionInfo: "2 Litres" },
      { size: "4L", price: 90.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "plantain",
    name: "Plantain",
    description: "Fried plantain side",
    imageUrl: "/images/dishes/plantain.jpeg",
    category: "Side Dishes",
    sizeOptions: [
      { size: "2L", price: 40.00, portionInfo: "2 Litres" },
      { size: "4L", price: 70.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "ofada-rice-only",
    name: "Ofada Rice (Only)",
    description: "Ofada rice only",
    imageUrl: "/images/dishes/ofada-sauce.jpg",
    category: "Rice Dishes",
    sizeOptions: [
      { size: "2L", price: 40.00, portionInfo: "2 Litres" },
      { size: "4L", price: 70.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "ewa-agoyin-with-sauces",
    name: "Ewa Agoyin (with 2 takeaway sauces)",
    description: "Ewa Agoyin served with two takeaway sauces",
    imageUrl: "/images/dishes/ewa_agoyin.jpeg",
    category: "Side Dishes",
    sizeOptions: [
      { size: "2L", price: 65.00, portionInfo: "2 Litres (with takeaway)" },
      { size: "4L", price: 110.00, portionInfo: "4 Litres (with 2 takeaway sauces)" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "beans-porridge",
    name: "Beans Porridge",
    description: "Hearty beans porridge",
    imageUrl: "/images/dishes/beans_porridge.jpg",
    category: "Side Dishes",
    sizeOptions: [
      { size: "2L", price: 55.00, portionInfo: "2 Litres" },
      { size: "4L", price: 90.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "agoyin-sauce-only",
    name: "Agoyin Sauce (Only)",
    description: "Agoyin sauce available separately",
    imageUrl: "/images/dishes/agoyin_sauce.jpeg",
    category: "Side Dishes",
    sizeOptions: [
      { size: "2L", price: 65.00, portionInfo: "2 Litres" },
      { size: "4L", price: 110.00, portionInfo: "4 Litres" }
    ],
    defaultSizeIndex: 0
  },
  // Snacks & Pastries
  {
    id: "pack-10-meat-pies",
    name: "Pack of 10 Meat Pies",
    description: "Pack of 10 assorted meat pies",
    imageUrl: "/images/dishes/tk-meatpie.png",
    category: "Snacks & Pastries",
    sizeOptions: [
      { size: "pack of 10", price: 25.00, portionInfo: "Pack of 10" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "pack-10-sausage-rolls",
    name: "Pack of 10 Sausage Rolls",
    description: "Pack of 10 sausage rolls",
    imageUrl: "/images/dishes/sausageroll.jpeg",
    category: "Snacks & Pastries",
    sizeOptions: [
      { size: "pack of 10", price: 25.00, portionInfo: "Pack of 10" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "pack-10-chicken-pies",
    name: "Pack of 10 Chicken Pies",
    description: "Pack of 10 chicken pies",
    imageUrl: "/images/dishes/meatpiedelight.jpeg",
    category: "Snacks & Pastries",
    sizeOptions: [
      { size: "pack of 10", price: 25.00, portionInfo: "Pack of 10" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "pack-10-fish-pies",
    name: "Pack of 10 Fish Pies",
    description: "Pack of 10 fish pies",
    imageUrl: "/images/dishes/tk-meatpie.png",
    category: "Snacks & Pastries",
    sizeOptions: [
      { size: "pack of 10", price: 25.00, portionInfo: "Pack of 10" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "tray-puff-puff",
    name: "Tray Puff Puff",
    description: "Tray of puff puff",
    imageUrl: "/images/dishes/puffpuff.jpg",
    category: "Snacks & Pastries",
    sizeOptions: [
      { size: "tray", price: 45.00, portionInfo: "Tray" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "tray-mix-and-match",
    name: "Tray Mix and Match",
    description: "Mix-and-match tray of snacks",
    imageUrl: "/images/dishes/mix_and_match.jpeg",
    category: "Snacks & Pastries",
    sizeOptions: [
      { size: "tray", price: 55.00, portionInfo: "Tray" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "combo-tilapia-platter",
    name: "Combo Tilapia Fish Platter",
    description: "Tilapia fish combo platter",
    imageUrl: "/images/dishes/tilapia_platter.jpeg",
    category: "Extras & Packages",
    sizeOptions: [
      { size: "combo", price: 35.00, portionInfo: "Combo" }
    ],
    defaultSizeIndex: 0
  },
  {
    id: "combo-croker-platter",
    name: "Combo Croker Fish Platter",
    description: "Croker fish combo platter",
    imageUrl: "/images/dishes/croker_platter.jpeg",
    category: "Extras & Packages",
    sizeOptions: [
      { size: "combo", price: 40.00, portionInfo: "Combo" }
    ],
    defaultSizeIndex: 0
  },
  
  {
    id: "small-treats-package",
    name: "Small Treats Package",
    description: "Feeds up to 8 to 10 people: includes 2L Jollof, 2L Fried Rice, 2L Gizzdodo, 2L Efo-riro, 2L assorted stew, 2L Chicken & Beef",
    imageUrl: "/images/dishes/small_treats.jpeg",
    category: "Extras & Packages",
    sizeOptions: [
      { size: "package", price: 250.00, portionInfo: "Package" }
    ],
    defaultSizeIndex: 0
  }
];

// Export all menu items (alias for featuredDishes)
export const allMenuItems = featuredDishes;
