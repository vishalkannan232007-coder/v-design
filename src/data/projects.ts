// Project data types and real client work for V DESIGN
import a2Image from '../assets/projects/A2.jpeg';
import wellfitImage from '../assets/projects/WELLFIT.jpeg';
import sbgImage from '../assets/projects/SBG.jpeg';
import ksImage from '../assets/projects/KS.jpeg';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  description: string;
  tags: string[];
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: 'a2-return-gift-shop',
    number: '01',
    title: 'A²',
    subtitle: 'RETURN GIFT SHOP',
    category: 'Brand Identity',
    year: '2024',
    image: a2Image,
    description:
      'Complete brand identity for A², an elegant return gift shop. Crown emblem, flowing banner typography, and celebratory color palette designed to make every gift and celebration unforgettable.',
    tags: ['Logo Design', 'Brand Identity', 'Visual System', 'Packaging'],
    accentColor: '#c9a96e',
  },
  {
    id: 'wellfit-mua',
    number: '02',
    title: 'WELLFIT',
    subtitle: 'MUA ARTIST',
    category: 'Brand Identity',
    year: '2024',
    image: wellfitImage,
    description:
      'Luxury beauty and makeup artistry identity for WELLFIT. Rose gold framed aesthetics, delicate line illustration, and refined editorial typography capturing elegance and glam.',
    tags: ['Logo Design', 'Brand Identity', 'Beauty & Luxury', 'Editorial'],
    accentColor: '#d4a0b0',
  },
  {
    id: 'sbg-homemade-brownies',
    number: '03',
    title: 'SBG',
    subtitle: 'HOMEMADE BROWNIES',
    category: 'Brand Identity',
    year: '2024',
    image: sbgImage,
    description:
      'Artisan bakery brand identity for SBG Homemade Brownies. Warm, handcrafted character featuring chocolate cookie typography, chef toque icon, and packaging emblem crafted with love.',
    tags: ['Logo Design', 'Brand Identity', 'Packaging Identity', 'Artisan'],
    accentColor: '#b87333',
  },
  {
    id: 'krishika-shree-travels',
    number: '04',
    title: 'KRISHIKA SHREE TRAVELS',
    subtitle: 'JOURNEY BEYOND DESTINATIONS',
    category: 'Brand Identity',
    year: '2024',
    image: ksImage,
    description:
      'Dynamic travel identity for Krishika Shree Travels. Aerodynamic monogram, open roadway, scenic coastlines and bold dual-tone palette representing seamless exploration.',
    tags: ['Logo Design', 'Brand Identity', 'Visual Identity', 'Travel & Tour'],
    accentColor: '#2575fc',
  },
];
