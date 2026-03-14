import type { Leader } from '../types/connect';

export const LEADERS: Leader[] = [
  {
    id: 'l1',
    name: 'Sarah Hassan',
    initials: 'SH',
    avatar: { from: '#059669', to: '#065f46' },
    role: 'Community leader',
    languages: ['English', 'Arabic', 'Somali'],
    langCodes: ['en', 'ar', 'so'],
    helpOffered: 'Transit, housing, and daily life questions. Can meet in person or by phone.',
    coords: { lat: 43.7415, lng: -79.3271 },
    whatsapp: '+14165552001',
    verified: true,
  },
  {
    id: 'l2',
    name: 'David Osman',
    initials: 'DO',
    avatar: { from: '#7c3aed', to: '#5b21b6' },
    role: 'Settlement worker',
    languages: ['English', 'Somali'],
    langCodes: ['en', 'so'],
    helpOffered:
      'Job readiness, government forms, and finding services. Walk you through step by step.',
    coords: { lat: 43.7234, lng: -79.4567 },
    whatsapp: '+14165552002',
    verified: true,
  },
  {
    id: 'l3',
    name: 'Layla Rahman',
    initials: 'LR',
    avatar: { from: '#db2777', to: '#9d174d' },
    role: 'Peer supporter',
    languages: ['English', 'Bengali', 'Rohingya'],
    langCodes: ['en', 'bn', 'roh'],
    helpOffered: 'Friendly ear and practical tips for women and families. Here to support you.',
    coords: { lat: 43.6917, lng: -79.2889 },
    whatsapp: '+14165552003',
    verified: true,
  },
];
