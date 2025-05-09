// src/types.ts

export interface Room {
  id: number;
  title: string;
  description: string;
  price: number;
  availableBeds: number; // Вместо "available"
  bedType: string;
  images: string[];
}

export interface Booking {
  id?: number;
  roomId: number;
  guestName: string;
  email?: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;
  guests?: number;
  guestAges?: number[];
}