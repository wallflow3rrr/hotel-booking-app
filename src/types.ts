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
  id: number;
  room_id: number;
  guest_name: string;
  email: string;
  start_date: string; 
  end_date: string;
  guests: number;
  guest_ages?: number[];
}
