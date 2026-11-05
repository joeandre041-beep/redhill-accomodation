import room1 from '../assets/room1.jpg';
import room2 from '../assets/room2.jpg';
import room3 from '../assets/room3.jpg';
import room4 from '../assets/room4.jpg';
import kitchen from '../assets/kitchen.jpg';
import sitting from '../assets/sitting.jpg';
import garden from '../assets/garden.jpg';

export type RoomStatus = 'available' | 'occupied';

export type Room = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  sleeps: number;
  bed: string;
  size: string;
  status: RoomStatus;
  availableFrom?: string;
  features: string[];
};

export const rooms: Room[] = [
  {
    id: 'hearth',
    name: 'The Hearth Room',
    tagline: 'Four-poster, fireplace, garden window',
    description:
      'Our coziest room. A timber four-poster, a wood stove for cooler evenings, and a sash window looking into the trees. Made for deep, quiet sleep.',
    image: room1,
    price: 89,
    sleeps: 2,
    bed: 'Queen four-poster',
    size: '20 m²',
    status: 'available',
    features: ['Wood stove', 'Garden window', 'Blackout drapes', 'Tea tray', 'Ensuite'],
  },
  {
    id: 'veranda',
    name: 'The Veranda Room',
    tagline: 'Balcony, garden views, morning light',
    description:
      'Soft blue walls, a draped bed, and glass doors that open onto a small balcony above the garden. Wake to birdsong and a pot of tea.',
    image: room2,
    price: 79,
    sleeps: 2,
    bed: 'Queen bed',
    size: '18 m²',
    status: 'available',
    features: ['Private balcony', 'Garden view', 'Mosquito net', 'Tea set', 'Ensuite'],
  },
  {
    id: 'amber',
    name: 'The Amber Room',
    tagline: 'Warm light, sitting corner, parquet floors',
    description:
      'A golden, lived-in room with parquet floors, a sitting corner by the window, and a wide, comfortable bed. Ideal for a longer, slower stay.',
    image: room3,
    price: 85,
    sleeps: 2,
    bed: 'Queen bed',
    size: '22 m²',
    status: 'occupied',
    availableFrom: '12 Apr',
    features: ['Sitting chairs', 'Writing desk', 'Parquet floors', 'Warm lighting', 'Ensuite'],
  },
  {
    id: 'terrace',
    name: 'The Terrace Suite',
    tagline: 'King bed, private terrace, modern calm',
    description:
      'Our most spacious room. Crisp linens, a king bed, and a private terrace looking onto greenery. Quiet luxury for two.',
    image: room4,
    price: 119,
    sleeps: 2,
    bed: 'King bed',
    size: '28 m²',
    status: 'available',
    features: ['Private terrace', 'King bed', 'Work desk', 'Premium linens', 'Ensuite'],
  },
];

export const sharedSpaces = [
  {
    id: 'kitchen',
    name: 'Guest kitchen',
    image: kitchen,
    desc: 'A fully equipped shared kitchen — cook, brew, and help yourself. Fridge space, stove, kettle and basics provided.',
  },
  {
    id: 'sitting',
    name: 'Sitting lounge',
    image: sitting,
    desc: 'A covered outdoor lounge for slow mornings and easy evenings. Cushions, shade, and room to stretch out.',
  },
  {
    id: 'garden',
    name: 'The garden',
    image: garden,
    desc: 'Stone paths, a quiet archway, and flowers. Wander, sit, or take your coffee under the trees.',
  },
];

export { garden as gardenImage };
