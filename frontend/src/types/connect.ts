export type ConnectSection = 'people' | 'events' | 'leaders' | null;
export type SpeakFn = (text: string) => void;

export interface LatLng {
  lat: number;
  lng: number;
}

export interface AvatarStyle {
  from: string;
  to: string;
}

export interface Person {
  id: string;
  name: string;
  initials: string;
  avatar: AvatarStyle;
  languages: string[];
  langCodes: string[];
  city: string;
  description: string;
  coords: LatLng;
  whatsapp?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  emoji: string;
  location: string;
  dateTime: string;
  description: string;
  coords: LatLng;
}

export interface Leader {
  id: string;
  name: string;
  initials: string;
  avatar: AvatarStyle;
  role: string;
  languages: string[];
  langCodes: string[];
  helpOffered: string;
  coords: LatLng;
  whatsapp?: string;
  verified: boolean;
}

export const LANG_FILTERS = [
  { id: '', label: 'All' },
  { id: 'roh', label: 'Rohingya' },
  { id: 'bn', label: 'Bengali' },
  { id: 'en', label: 'English' },
  { id: 'ar', label: 'Arabic' },
  { id: 'so', label: 'Somali' },
] as const;
