// src/types.ts

export interface Room {
  id: number;
  title: string;
  description: string;
  price: number;
  available_beds: number;
  bed_type: string;
  images: string[];
}

export interface Booking {
  id?: number;
  roomId: number;
  guestName: string;
  email?: string;
  startDate: string; 
  endDate: string;
  guests?: number;
  guestAges?: number[];
}