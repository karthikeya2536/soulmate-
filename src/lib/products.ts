import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  colors: string[];
  sizes: number[];
  isNew: boolean;
}

export const products: Product[] = [
  {
    id: "the-muse",
    name: "The Muse",
    category: "Heels",
    price: 385,
    description:
      "A sculptural stiletto in buttery nappa leather. The curved heel mirrors the arch of a violin — made for nights that become stories.",
    image: "/assets/images/product-pump.jpg",
    colors: ["Noir", "Blush", "Ivory"],
    sizes: [35, 36, 37, 38, 39, 40, 41],
    isNew: true,
  },
  {
    id: "the-poet",
    name: "The Poet",
    category: "Flats",
    price: 295,
    description:
      "A ballet flat reimagined. Unlined calfskin molds to your foot over time — each pair writes its own story.",
    image: "/assets/images/product-oxford.jpg",
    colors: ["Sand", "Noir", "Rose Gold"],
    sizes: [35, 36, 37, 38, 39, 40, 41],
    isNew: false,
  },
  {
    id: "the-rebel",
    name: "The Rebel",
    category: "Boots",
    price: 495,
    description:
      "An ankle boot with a silk lining and a solid brass heel cap. Soft where it needs to be, sharp where it counts.",
    image: "/assets/images/product-boot.jpg",
    colors: ["Noir", "Espresso", "Olive"],
    sizes: [35, 36, 37, 38, 39, 40, 41],
    isNew: true,
  },
  {
    id: "the-dreamer",
    name: "The Dreamer",
    category: "Sandals",
    price: 345,
    description:
      "Minimalist sandal with an architectural heel. Italian vegetable-tanned leather — wears in, never wears out.",
    image: "/assets/images/product-sandal.jpg",
    colors: ["Tan", "Noir", "Blush"],
    sizes: [35, 36, 37, 38, 39, 40, 41],
    isNew: false,
  },
  {
    id: "the-icon",
    name: "The Icon",
    category: "Sneakers",
    price: 265,
    description:
      "A refined sneaker in LWG-certified leather. The sole is hand-stitched in the Marche region — luxury you can live in every day.",
    image: "/assets/images/product-sneaker.jpg",
    colors: ["White", "Sand", "Noir"],
    sizes: [35, 36, 37, 38, 39, 40, 41],
    isNew: false,
  },
  {
    id: "the-lover",
    name: "The Lover",
    category: "Heels",
    price: 420,
    description:
      "A strappy evening sandal with a hand-set crystal buckle. The heel catches light like champagne in a coupe.",
    image: "/assets/images/hero-shoe.jpg",
    colors: ["Gold", "Noir", "Blush"],
    sizes: [35, 36, 37, 38, 39, 40, 41],
    isNew: true,
  },
];

export const categories = [
  "All",
  "Heels",
  "Flats",
  "Boots",
  "Sandals",
  "Sneakers",
] as const;