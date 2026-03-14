import type { Person } from '../types/connect';

export const PEOPLE: Person[] = [
  {
    id: 'p1',
    name: 'Amina Khatun',
    initials: 'AK',
    avatar: { from: '#d97706', to: '#92400e' },
    languages: ['Rohingya', 'Bengali', 'English'],
    langCodes: ['roh', 'bn', 'en'],
    city: 'Scarborough, Toronto',
    description:
      'I came here 2 years ago. I love walking together and cooking. I can help you feel at home.',
    coords: { lat: 43.7731, lng: -79.2577 },
    whatsapp: '+14165551001',
  },
  {
    id: 'p2',
    name: 'Mohammed Rashid',
    initials: 'MR',
    avatar: { from: '#7c3aed', to: '#4c1d95' },
    languages: ['Rohingya', 'Bengali'],
    langCodes: ['roh', 'bn'],
    city: 'North York, Toronto',
    description:
      "I know the bus routes well. Let's take the TTC together and practice English along the way.",
    coords: { lat: 43.7615, lng: -79.4111 },
    whatsapp: '+14165551002',
  },
  {
    id: 'p3',
    name: 'Fatima Begum',
    initials: 'FB',
    avatar: { from: '#db2777', to: '#9d174d' },
    languages: ['Rohingya', 'Arabic', 'English'],
    langCodes: ['roh', 'ar', 'en'],
    city: 'Etobicoke, Toronto',
    description:
      "Women's circle and community kitchen every Friday. You are very welcome to join us.",
    coords: { lat: 43.6419, lng: -79.5653 },
    whatsapp: '+14165551003',
  },
  {
    id: 'p4',
    name: 'Karim Ahmed',
    initials: 'KA',
    avatar: { from: '#0ea5e9', to: '#0369a1' },
    languages: ['Bengali', 'English'],
    langCodes: ['bn', 'en'],
    city: 'East York, Toronto',
    description: 'I help with job forms and English practice. We go step by step, no rush.',
    coords: { lat: 43.6889, lng: -79.3296 },
    whatsapp: '+14165551004',
  },
];
