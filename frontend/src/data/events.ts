import type { CommunityEvent } from '../types/connect';

export const EVENTS: CommunityEvent[] = [
  {
    id: 'e1',
    title: 'Bus orientation – Learn the TTC',
    emoji: '🚌',
    location: 'Kennedy Station, Scarborough',
    dateTime: 'Saturday · 10:00 AM',
    description:
      'A community leader takes a small group to the bus stop. Learn to pay, read signs, and plan your trip. English practice along the way.',
    coords: { lat: 43.7327, lng: -79.2628 },
  },
  {
    id: 'e2',
    title: 'English practice walk',
    emoji: '🌳',
    location: 'High Park, Toronto',
    dateTime: 'Sunday · 9:00 AM',
    description:
      'Walk together in the park and use simple English. Perfect for beginners. Friendly and relaxed.',
    coords: { lat: 43.6536, lng: -79.4648 },
  },
  {
    id: 'e3',
    title: "Women's support circle",
    emoji: '🌸',
    location: 'Scarborough Civic Centre',
    dateTime: 'Tuesday · 2:00 PM',
    description:
      'Safe space to share, make friends, and practice English with other women. All welcome.',
    coords: { lat: 43.7731, lng: -79.2577 },
  },
  {
    id: 'e4',
    title: 'Community kitchen',
    emoji: '🍲',
    location: 'Community centre, North York',
    dateTime: 'Friday · 5:00 PM',
    description:
      'Cook and eat together. Learn words for food and daily life. Very welcoming for families.',
    coords: { lat: 43.7539, lng: -79.2938 },
  },
];
