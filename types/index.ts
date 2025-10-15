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
