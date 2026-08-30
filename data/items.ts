import { CategorySlug } from "./categories";

export interface Item {
  /** unique, url-safe id used in links like /catalog/tents-canopies/20x20-frame-tent */
  slug: string;
  name: string;
  category: CategorySlug;
  /** optional free-text grouping shown as a badge on the item, e.g. "Ceremony Stage Setups" */
  subcategory?: string;
  price: number;
  priceUnit: "per day" | "per event" | "each";
  description: string;
  /** relative path under /public, e.g. "/images/tents-canopies/20x20-frame-tent.jpg" */
  image?: string;
  /** shown in the homepage "Featured" strip */
  featured?: boolean;
}

// This is the whole product catalog. To add a new rental item, add a new
// object below with a unique `slug`. To retire an item, delete its object.
// No other file needs to change — every page reads from the functions
// at the bottom of this file, not this array directly.
export const items: Item[] = [
  // ---- Props & Indian Furniture (primary focus category) ----
  {
    slug: "wooden-jhula-swing",
    name: "Wooden Jhula (Hanging Swing)",
    category: "props-indian-furniture",
    subcategory: "Traditional Furniture",
    price: 180,
    priceUnit: "per event",
    description:
      "A carved wooden hanging swing, a centerpiece for haldi ceremonies, mehndi functions, and traditional photo setups.",
    image: "/images/props-indian-furniture/wooden-jhula-swing.jpg",
    featured: true,
  },
  {
    slug: "bride-groom-sweetheart-chairs",
    name: "Bride & Groom Sweetheart Chairs (Carved Wood)",
    category: "props-indian-furniture",
    subcategory: "Traditional Furniture",
    price: 150,
    priceUnit: "per event",
    description: "A matched pair of ornately carved wooden chairs for the couple's seating on stage.",
    image: "/images/props-indian-furniture/bride-groom-sweetheart-chairs.jpg",
    featured: true,
  },
  {
    slug: "brass-urli-flower-bowl",
    name: "Brass Urli (Floating Flower Bowl)",
    category: "props-indian-furniture",
    subcategory: "Decorative Props",
    price: 35,
    priceUnit: "per event",
    description: "A large brass urli filled with floating flowers and candles, used as an entrance or table centerpiece.",
    image: "/images/props-indian-furniture/brass-urli-flower-bowl.jpg",
  },
  {
    slug: "mandap-pillar-set",
    name: "Mandap Pillar Set (4 Pieces)",
    category: "props-indian-furniture",
    subcategory: "Ceremony Setups",
    price: 850,
    priceUnit: "per event",
    description:
      "Four decorated pillars with floral drapery forming a wedding mandap, the traditional canopy for the marriage ceremony.",
    image: "/images/props-indian-furniture/mandap-pillar-set.jpg",
    featured: true,
  },
  {
    slug: "decorative-peetha-pair",
    name: "Decorative Peetha / Bajot (Low Stool, Pair)",
    category: "props-indian-furniture",
    subcategory: "Traditional Furniture",
    price: 45,
    priceUnit: "per event",
    description: "A pair of low, hand-painted wooden stools traditionally used for pooja or ceremonial seating.",
    image: "/images/props-indian-furniture/decorative-peetha-pair.jpg",
  },
  {
    slug: "antique-style-trunk-prop",
    name: "Antique-Style Trunk / Chest Prop",
    category: "props-indian-furniture",
    subcategory: "Decorative Props",
    price: 40,
    priceUnit: "per event",
    description: "A vintage-look wooden trunk used as a decorative accent or photo prop.",
    image: "/images/props-indian-furniture/antique-style-trunk-prop.jpg",
  },
  {
    slug: "dhoti-function-stage-setup",
    name: "Dhoti Function Stage Setup",
    category: "props-indian-furniture",
    subcategory: "Ceremony Setups",
    price: 450,
    priceUnit: "per event",
    description:
      "A traditional backdrop and seating arrangement for a boy's dhoti (upanayanam-style) coming-of-age ceremony.",
    image: "/images/props-indian-furniture/dhoti-function-stage-setup.jpg",
  },
  {
    slug: "girls-maturity-function-decor",
    name: "Half Saree Function Decor Package",
    category: "props-indian-furniture",
    subcategory: "Ceremony Setups",
    price: 400,
    priceUnit: "per event",
    description:
      "A traditional backdrop with floral and seating decor for a half saree (coming-of-age) function.",
    image: "/images/props-indian-furniture/girls-maturity-function-decor.jpg",
    featured: true,
  },
  {
    slug: "haldi-ceremony-prop-set",
    name: "Haldi Ceremony Prop Set",
    category: "props-indian-furniture",
    subcategory: "Decorative Props",
    price: 90,
    priceUnit: "per event",
    description: "Decorated thalis, flower baskets, and small stools for a haldi (turmeric) ceremony setup.",
    image: "/images/props-indian-furniture/haldi-ceremony-prop-set.jpg",
  },

  // ---- Tents & Canopies ----
  {
    slug: "10x10-pop-up-canopy",
    name: "10x10 Pop-Up Canopy",
    category: "tents-canopies",
    price: 75,
    priceUnit: "per day",
    description: "A compact pop-up tent, ideal for small backyard gatherings.",
    image: "/images/tents-canopies/10x10-pop-up-canopy.jpg",
  },
  {
    slug: "20x20-frame-tent",
    name: "20x20 Frame Tent",
    category: "tents-canopies",
    price: 250,
    priceUnit: "per day",
    description: "A mid-size open-sided frame tent, seats roughly 40 guests.",
    image: "/images/tents-canopies/20x20-frame-tent.jpg",
    featured: true,
  },
  {
    slug: "40x60-pole-tent",
    name: "40x60 Pole Tent",
    category: "tents-canopies",
    price: 650,
    priceUnit: "per day",
    description: "A large event tent suited for weddings and big parties.",
    image: "/images/tents-canopies/40x60-pole-tent.jpg",
  },

  // ---- Tables & Chairs ----
  {
    slug: "60in-round-table",
    name: '60" Round Table (Seats 8)',
    category: "tables-chairs",
    price: 12,
    priceUnit: "each",
    description: "Standard round banquet table, seats up to 8 guests.",
    image: "/images/tables-chairs/60in-round-table.jpg",
  },
  {
    slug: "8ft-banquet-table",
    name: "8ft Banquet Table",
    category: "tables-chairs",
    price: 10,
    priceUnit: "each",
    description: "Rectangular folding table, seats up to 8 guests.",
    image: "/images/tables-chairs/8ft-banquet-table.jpg",
  },
  {
    slug: "white-folding-chair",
    name: "White Folding Chair",
    category: "tables-chairs",
    price: 2,
    priceUnit: "each",
    description: "Sturdy white resin folding chair.",
    image: "/images/tables-chairs/white-folding-chair.jpg",
  },
  {
    slug: "gold-chiavari-chair",
    name: "Chiavari Chair (Gold)",
    category: "tables-chairs",
    price: 6.5,
    priceUnit: "each",
    description: "Elegant gold chiavari chair for weddings and formal events.",
    image: "/images/tables-chairs/gold-chiavari-chair.jpg",
    featured: true,
  },

  // ---- Linens & Decor ----
  {
    slug: "white-tablecloth-120",
    name: 'White Polyester Tablecloth (120")',
    category: "linens-decor",
    price: 8,
    priceUnit: "each",
    description: "Floor-length white tablecloth for round tables.",
    image: "/images/linens-decor/white-tablecloth-120.jpg",
  },
  {
    slug: "satin-table-runner",
    name: "Satin Table Runner (Assorted Colors)",
    category: "linens-decor",
    price: 4,
    priceUnit: "each",
    description: "Satin table runner available in multiple colors.",
    image: "/images/linens-decor/satin-table-runner.jpg",
  },
  {
    slug: "cafe-string-lights-48ft",
    name: "String Lights (Café Bulb, 48ft)",
    category: "linens-decor",
    price: 25,
    priceUnit: "each",
    description: "Warm café-bulb string lights, 48 feet, great for tent or patio lighting.",
    image: "/images/linens-decor/cafe-string-lights-48ft.jpg",
  },
  {
    slug: "balloon-arch-kit",
    name: "Balloon Arch Kit",
    category: "linens-decor",
    price: 120,
    priceUnit: "per event",
    description: "A full balloon arch, assembled on site in your chosen colors.",
    image: "/images/linens-decor/balloon-arch-kit.jpg",
  },

  // ---- Bounce Houses & Games ----
  {
    slug: "standard-bounce-house",
    name: "Standard Bounce House (13x13)",
    category: "bounce-houses-games",
    price: 150,
    priceUnit: "per day",
    description: "Classic inflatable bounce house for backyard parties.",
    image: "/images/bounce-houses-games/standard-bounce-house.jpg",
    featured: true,
  },
  {
    slug: "bounce-house-water-slide-combo",
    name: "Bounce House + Water Slide Combo",
    category: "bounce-houses-games",
    price: 275,
    priceUnit: "per day",
    description: "Combination inflatable bounce house and water slide.",
    image: "/images/bounce-houses-games/bounce-house-water-slide-combo.jpg",
  },
  {
    slug: "giant-jenga",
    name: "Giant Jenga Lawn Game",
    category: "bounce-houses-games",
    price: 35,
    priceUnit: "per day",
    description: "Life-size stacking block game for the lawn or patio.",
    image: "/images/bounce-houses-games/giant-jenga.jpg",
  },
  {
    slug: "cornhole-board-set",
    name: "Cornhole Board Set",
    category: "bounce-houses-games",
    price: 30,
    priceUnit: "per day",
    description: "A pair of regulation cornhole boards with bags.",
    image: "/images/bounce-houses-games/cornhole-board-set.jpg",
  },
];

export function getAllItems(): Item[] {
  return items;
}

export function getItemsByCategory(category: CategorySlug): Item[] {
  return items.filter((item) => item.category === category);
}

export function getItemBySlug(slug: string): Item | undefined {
  return items.find((item) => item.slug === slug);
}

export function getFeaturedItems(): Item[] {
  return items.filter((item) => item.featured);
}
