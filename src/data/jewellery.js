import jumukkaImg from "../assets/images/jumukka.png";
import girlImg from "../assets/images/girl.png";
import banglesCardImg from "../assets/images/story/bangles-card.webp";

export const brand = {
  name: "ORRA",
  fullName: "ORRA Premium Imitation Gold Jewellery",
  tagline: "Shine Beyond Gold",
  motto: "Elegance That Lasts",
  descriptor: "Premium Imitation Gold Jewellery",
  about:
    "ORRA crafts pieces for the moments that linger — bridal mornings, festive evenings, and the quiet days in between. Every design balances heritage craft with a modern, wearable silhouette.",
  aboutSecondary:
    "From our Cochin atelier to your occasion, we work in gold-tone finishes, temple motifs, and refined everyday forms — always with a restrained, editorial eye.",
  whatsapp: "918943351809",
  email: "enquiriesorra@gmail.com",
  phone: "+91 89433 51809",
  address: "PPDO Building, Chakkaraparambu, Pin 682032, Ernakulam, Cochin, Kerala",
  location: "Ernakulam, Cochin, Kerala",
  instagram: "orra_imitationsgold",
  instagramUrl: "https://instagram.com/orra_imitationsgold",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM",
  logo: "/orra-logo.png?v=2",
};

export const navLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Pieces", href: "#featured" },
  { label: "Collections", href: "#collections" },
  // { label: "Occasions", href: "#occasions" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Contact", href: "#contact" },
];

export const categories = [
  {
    id: "rings",
    name: "Rings",
    description: "Statement, stackable, and bridal bands",
    count: 36,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Cocktail Rings",
        image:
          "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Stackable Rings",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Bridal Bands",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Temple Rings",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Adjustable Rings",
        image:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Solitaire Style",
        image:
          "https://images.unsplash.com/photo-1603561596112-0a132b7576cc?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "earrings",
    name: "Earrings",
    description: "Jhumkas, studs, and danglers",
    count: 62,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Jhumkas",
        image:
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Studs",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Chandbalis",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Hoops / Balis",
        image:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Danglers",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Ear Cuffs",
        image:
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "bangles",
    name: "Bangles",
    description: "Pairs, kadas, and bridal sets",
    count: 41,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Pair Bangles",
        image:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Kadas",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Single Bangle",
        image:
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Kemp Bangles",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Bridal Sets",
        image: banglesCardImg,
      },
      {
        name: "Changeable",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "necklaces",
    name: "Necklaces",
    description: "Chokers, haaram, and layered forms",
    count: 48,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Short Necklaces",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Long Haaram",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Chokers",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Layered Necklaces",
        image:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Pendant Sets",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Bridal Sets",
        image:
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "kerala-traditional",
    name: "Kerala Traditional",
    description: "Kasumala, mullamottu, and heritage forms",
    count: 29,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Kasumala",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Mullamottu Mala",
        image:
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Oddiyanam",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Kerala Jhumkas",
        image:
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Temple Cascades",
        image:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Traditional Sets",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "temple-collections",
    name: "Temple Collections",
    description: "Goddess motifs and antique temple finish",
    count: 44,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Temple Necklaces",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Temple Earrings",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Temple Bangles",
        image:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Goddess Motifs",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Antique Finish",
        image:
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Bridal Temple Sets",
        image:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "simple-chains",
    name: "Simple Chains",
    description: "Everyday links for quiet layering",
    count: 32,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Cable Chains",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Box Chains",
        image:
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Rope Chains",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Pendant Chains",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Everyday Links",
        image:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Layering Chains",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "anklets",
    name: "Anklet",
    description: "Payals and soft chain forms for the ankle",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Payal / Anklets",
        image:
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Bridal Anklets",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Bell Anklets",
        image:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Chain Anklets",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Toe Ring Sets",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Dual Pair",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "bracelets",
    name: "Bracelets",
    description: "Delicate chains and cuff forms",
    count: 28,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=80",
    types: [
      {
        name: "Chain Bracelets",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Cuffs",
        image:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Charm Bracelets",
        image:
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Tennis Style",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Kada Bracelets",
        image:
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Delicate Links",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
];

/** Curated wall for Featured (20 pieces + scroll story anchor). */
export const featuredPieces = [
  {
    id: "aurora-choker",
    name: "Aurora Choker",
    category: "necklaces",
    collection: "Bridal",
    price: 4890,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "temple-drop",
    name: "Temple Drop Earrings",
    category: "earrings",
    collection: "Heritage",
    price: 3290,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "solenne-ring",
    name: "Solenne Cocktail Ring",
    category: "rings",
    collection: "Everyday",
    price: 2190,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "pearl-cascade",
    name: "Pearl Cascade Necklace",
    category: "necklaces",
    collection: "Everyday",
    price: 2790,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "kemp-bangle",
    name: "Kemp Pair Bangle",
    category: "bangles",
    collection: "Festive",
    price: 3590,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "solstice-studs",
    name: "Solstice Studs",
    category: "earrings",
    collection: "Minimal",
    price: 1890,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "lumen-band",
    name: "Lumen Stack Band",
    category: "rings",
    collection: "Minimal",
    price: 1490,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "kasumala-gold",
    name: "Kasumala Cascade",
    category: "kerala-traditional",
    collection: "Heritage",
    price: 5990,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "silk-cuff",
    name: "Silk Chain Bracelet",
    category: "bracelets",
    collection: "Everyday",
    price: 1990,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "goddess-haaram",
    name: "Goddess Temple Haaram",
    category: "temple-collections",
    collection: "Bridal",
    price: 6890,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "chandbali-dusk",
    name: "Dusk Chandbali",
    category: "earrings",
    collection: "Festive",
    price: 2790,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "mullamottu-mala",
    name: "Mullamottu Mala",
    category: "kerala-traditional",
    collection: "Bridal",
    price: 4590,
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "antique-kada",
    name: "Antique Finish Kada",
    category: "bangles",
    collection: "Heritage",
    price: 4190,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "cable-everyday",
    name: "Everyday Cable Chain",
    category: "simple-chains",
    collection: "Minimal",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "bridal-anklet",
    name: "Bridal Chain Anklet",
    category: "anklets",
    collection: "Bridal",
    price: 2290,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "temple-band",
    name: "Meenakshi Temple Band",
    category: "rings",
    collection: "Heritage",
    price: 1890,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "layered-lumen",
    name: "Lumen Layered Set",
    category: "necklaces",
    collection: "Everyday",
    price: 3490,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tennis-glow",
    name: "Tennis Glow Bracelet",
    category: "bracelets",
    collection: "Minimal",
    price: 2590,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "antique-temple-set",
    name: "Antique Temple Set",
    category: "temple-collections",
    collection: "Bridal",
    price: 7490,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "meenaxi-bangles",
    name: "Meenaxi Temple Bangles",
    category: "bangles",
    collection: "Bridal",
    price: 5290,
    image: banglesCardImg,
    isStoryPiece: true,
  },
];

/** Category browse products — shown under each category in Categories. */
export const categoryPieces = [
  {
    id: "solenne-ring",
    name: "Solenne Cocktail Ring",
    category: "rings",
    type: "Cocktail Rings",
    collection: "Everyday",
    price: 2190,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "lumen-band",
    name: "Lumen Stack Band",
    category: "rings",
    type: "Stackable Rings",
    collection: "Minimal",
    price: 1490,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "temple-band",
    name: "Meenakshi Temple Band",
    category: "rings",
    type: "Temple Rings",
    collection: "Heritage",
    price: 1890,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "temple-drop",
    name: "Temple Drop Earrings",
    category: "earrings",
    type: "Danglers",
    collection: "Heritage",
    price: 3290,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "solstice-studs",
    name: "Solstice Studs",
    category: "earrings",
    type: "Studs",
    collection: "Minimal",
    price: 1890,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "chandbali-dusk",
    name: "Dusk Chandbali",
    category: "earrings",
    type: "Chandbalis",
    collection: "Festive",
    price: 2790,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "kemp-bangle",
    name: "Kemp Pair Bangle",
    category: "bangles",
    type: "Kemp Bangles",
    collection: "Festive",
    price: 3590,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "meenaxi-bangles",
    name: "Meenaxi Temple Bangles",
    category: "bangles",
    type: "Bridal Sets",
    collection: "Bridal",
    price: 5290,
    image: banglesCardImg,
  },
  {
    id: "antique-kada",
    name: "Antique Finish Kada",
    category: "bangles",
    type: "Kadas",
    collection: "Heritage",
    price: 4190,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "aurora-choker",
    name: "Aurora Choker",
    category: "necklaces",
    type: "Chokers",
    collection: "Bridal",
    price: 4890,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "pearl-cascade",
    name: "Pearl Cascade Necklace",
    category: "necklaces",
    type: "Short Necklaces",
    collection: "Everyday",
    price: 2790,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "layered-lumen",
    name: "Lumen Layered Set",
    category: "necklaces",
    type: "Layered Necklaces",
    collection: "Everyday",
    price: 3490,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "kasumala-gold",
    name: "Kasumala Cascade",
    category: "kerala-traditional",
    type: "Kasumala",
    collection: "Heritage",
    price: 5990,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "mullamottu-mala",
    name: "Mullamottu Mala",
    category: "kerala-traditional",
    type: "Mullamottu Mala",
    collection: "Bridal",
    price: 4590,
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "kerala-jhumka",
    name: "Kerala Motif Jhumka",
    category: "kerala-traditional",
    type: "Kerala Jhumkas",
    collection: "Festive",
    price: 2690,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "goddess-haaram",
    name: "Goddess Temple Haaram",
    category: "temple-collections",
    type: "Temple Necklaces",
    collection: "Bridal",
    price: 6890,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "temple-jhumka-set",
    name: "Temple Jhumka Set",
    category: "temple-collections",
    type: "Temple Earrings",
    collection: "Heritage",
    price: 3890,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "antique-temple-set",
    name: "Antique Temple Set",
    category: "temple-collections",
    type: "Bridal Temple Sets",
    collection: "Bridal",
    price: 7490,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "cable-everyday",
    name: "Everyday Cable Chain",
    category: "simple-chains",
    type: "Cable Chains",
    collection: "Minimal",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "box-chain-soft",
    name: "Soft Box Chain",
    category: "simple-chains",
    type: "Box Chains",
    collection: "Everyday",
    price: 1490,
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "layer-trio",
    name: "Layer Trio Chain",
    category: "simple-chains",
    type: "Layering Chains",
    collection: "Everyday",
    price: 1990,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "silver-payal",
    name: "Bell Payal Pair",
    category: "anklets",
    type: "Bell Anklets",
    collection: "Festive",
    price: 1690,
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "bridal-anklet",
    name: "Bridal Chain Anklet",
    category: "anklets",
    type: "Bridal Anklets",
    collection: "Bridal",
    price: 2290,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "delicate-anklet",
    name: "Delicate Link Anklet",
    category: "anklets",
    type: "Chain Anklets",
    collection: "Everyday",
    price: 1190,
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "silk-cuff",
    name: "Silk Chain Bracelet",
    category: "bracelets",
    type: "Chain Bracelets",
    collection: "Everyday",
    price: 1990,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "charm-cuff",
    name: "Charm Cuff Bracelet",
    category: "bracelets",
    type: "Cuffs",
    collection: "Festive",
    price: 2390,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tennis-glow",
    name: "Tennis Glow Bracelet",
    category: "bracelets",
    type: "Tennis Style",
    collection: "Minimal",
    price: 2590,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  },
];

export const collections = [
  {
    id: "bridal",
    name: "Bridal",
    tagline: "Ceremony pieces with quiet grandeur",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "festive",
    name: "Festive",
    tagline: "Colour, light, and celebration",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "everyday",
    name: "Everyday",
    tagline: "Refined forms for daily wear",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1600&q=80",
  },
];

export const occasions = [
  {
    id: "bridal-morning",
    name: "Bridal mornings",
    detail: "Sets composed for ceremony light — layered, luminous, lasting.",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "festive-evening",
    name: "Festive evenings",
    detail: "Colour and motif for celebrations that ask for presence.",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "quiet-days",
    name: "Quiet days",
    detail: "Everyday forms with a refined edge — worn without effort.",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1400&q=80",
  },
];

export const whyChooseUs = {
  eyebrow: "Why choose us",
  headline: "Elegance that lasts",
  description:
    "ORRA is built for occasions that matter — premium imitation gold with heritage craft, wearable comfort, and a finish that holds its light.",
  motto: "Shine Beyond Gold",
  quote: "Every piece is finished to hold light — never to shout.",
  points: [
    {
      id: "finish",
      title: "Premium gold-tone finish",
      description:
        "Deep, lasting tones chosen to catch light without glare — polished for bridal, festive, and everyday wear.",
    },
    {
      id: "craft",
      title: "Hand-finished detail",
      description:
        "Temple motifs, stone settings, and forms refined by hand so every piece feels considered, not mass-made.",
    },
    {
      id: "wear",
      title: "Made to be worn",
      description:
        "Balanced weight, secure closures, and comfort designed for real celebrations — not just the photoshoot.",
    },
    {
      id: "trust",
      title: "Private enquiry first",
      description:
        "From our Cochin studio, we guide you by WhatsApp — quiet advice, clear options, no pressure.",
    },
  ],
  stats: [
    { value: "Cochin", label: "Studio city" },
    { value: "100%", label: "Hand inspected" },
    { value: "ORRA", label: "Atelier standard" },
  ],
};

export const jhumkaStory = {
  brand: "ORRA",
  eyebrow: "The Drop",
  headline: "Crafted to Tell Your Story",
  line: "A single jhumka, suspended in light — then worn where elegance begins.",
  settleLine: "Worn where light lingers.",
  brandLine: "ORRA · Shine Beyond Gold",
  cta: { label: "Explore Collection", href: "#categories" },
  secondaryCta: { label: "View Details", href: "#featured" },
  jhumka: jumukkaImg,
  jhumkaAlt: "Gold temple jhumka earring",
  portrait: girlImg,
  portraitAlt: "Woman in profile, ear ready for a jhumka",
  // Tunable: % within the locked 2:3 portrait frame — stud center on piercing
  // (transformOrigin on jhumka is 50% 29.5% = red-stone / stud center in jumukka.png)
  earAnchor: { x: "70%", y: "39.2%" },
  earAnchorMobile: { x: "70%", y: "39.2%" },
};

export const hero = {
  headline: "Shine Beyond Gold.",
  subline:
    "Premium imitation gold jewellery for bridal, festive, and everyday moments — composed with restraint and lasting finish.",
  cta: "Shop categories",
  ctaHref: "#categories",
  secondaryCta: "View pieces",
  secondaryCtaHref: "#featured",
  image:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80",
  imageAlt:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
  slides: [
    {
      id: "signature",
      label: "Signature",
      primary:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80",
      secondary:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "bridal",
      label: "Bridal",
      primary:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=80",
      secondary:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "festive",
      label: "Festive",
      primary:
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=2000&q=80",
      secondary:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "everyday",
      label: "Everyday",
      primary:
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=2000&q=80",
      secondary:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
    },
  ],
};
