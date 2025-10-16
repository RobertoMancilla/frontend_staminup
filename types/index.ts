// Types for Stamin-Up application

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'client' | 'provider';
  avatarUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  provider: Provider;
  category: Category;
  price: number;
  priceType: 'fixed' | 'hourly' | 'negotiable';
  imageUrl: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
  availability: string[];
  createdAt: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  bio: string;
  rating: number;
  completedJobs: number;
  verified: boolean;
  joinedDate: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description: string;
  imageUrl?: string;
}

export interface Review {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  location?: string;
}

// Client Profile Types
export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  profileImage: string;
}

// Order Rating - Calificación embebida en la orden
export interface OrderRating {
  value: number;
  createdAt: string;
}

// Order Report - Reporte embebido en la orden (información resumida)
export interface OrderReport {
  id: string;
  category: 'not_completed' | 'poor_quality' | 'behavior' | 'price_issue' | 'no_show' | 'fraud' | 'other';
  status: 'pending' | 'in_review' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface Order {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  status: 'Completado' | 'En curso' | 'Pendiente' | 'Cancelado';
  price: number;
  rating?: OrderRating;
  reports?: OrderReport[];
}

// Client Review - Reseña completa del cliente (para la sección "Mis Reseñas")
export interface ClientReview {
  id: string;
  orderId: string;
  serviceName: string;
  providerName: string;
  rating: number;
  comment: string;
  date: string;
  tags?: string[];
}
