// Real client work and creative direction assets for V DESIGN
import a2Image from '../assets/projects/A2.jpeg';
import wellfitImage from '../assets/projects/WELLFIT.jpeg';
import sbgImage from '../assets/projects/SBG.jpeg';
import ksImage from '../assets/projects/KS.jpeg';

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  summary: string;
  themeColor: string;
  glowColor: string;
  accentBg: string;
  palette: string[];
}

export const projects: Project[] = [
  {
    id: 'a2-return-gift-shop',
    number: '01',
    title: 'A²',
    category: 'Return Gift Shop',
    client: 'A² Return Gift Shop',
    year: '2024',
    image: a2Image,
    summary:
      'Complete brand identity system for an upscale return gift boutique. Built around a sovereign crown emblem, bespoke serif letterforms, and celebratory packaging architecture.',
    themeColor: '#e5b869',
    glowColor: 'rgba(229, 184, 105, 0.25)',
    accentBg: '#12100b',
    palette: ['#c9a96e', '#f5f0e6', '#e5b869', '#141416'],
  },
  {
    id: 'wellfit-mua',
    number: '02',
    title: 'WELLFIT',
    category: 'MUA Artist',
    client: 'WELLFIT — MUA Artist',
    year: '2024',
    image: wellfitImage,
    summary:
      'A refined editorial identity for high-fashion bridal and editorial makeup artist WELLFIT. Pairing delicate single-line silhouette art direction with timeless serif typography.',
    themeColor: '#d8a48f',
    glowColor: 'rgba(216, 164, 143, 0.25)',
    accentBg: '#140f11',
    palette: ['#d8a48f', '#f9ede7', '#1a1819', '#967060'],
  },
  {
    id: 'sbg-homemade-brownies',
    number: '03',
    title: 'SBG',
    category: 'Homemade Brownies',
    client: 'SBG Homemade Brownies',
    year: '2024',
    image: sbgImage,
    summary:
      'Distinctive artisanal identity for small-batch gourmet bakery SBG. Custom chocolate-embossed typography, chef-toque seal emblem, and warm packaging systems.',
    themeColor: '#c27d42',
    glowColor: 'rgba(194, 125, 66, 0.25)',
    accentBg: '#150f0b',
    palette: ['#b87333', '#fdf6ed', '#261811', '#c27d42'],
  },
  {
    id: 'krishika-shree-travels',
    number: '04',
    title: 'KRISHIKA SHREE TRAVELS',
    category: 'Travel Brand',
    client: 'Krishika Shree Travels',
    year: '2024',
    image: ksImage,
    summary:
      'Aerodynamic mobility identity for premium tour and fleet operator Krishika Shree Travels. Features a fluid dual-ribbon road monogram and open-horizon geometry.',
    themeColor: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.25)',
    accentBg: '#08111a',
    palette: ['#2563eb', '#38bdf8', '#0ea5e9', '#0b1120'],
  },
];
