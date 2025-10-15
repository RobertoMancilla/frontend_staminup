'use client';

import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types';

/**
 * Hook de autenticación mock
 * Simula el comportamiento de autenticación sin backend
 */
export function useAuthMock() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Solo acceder a localStorage después del montaje en el cliente
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('auth_mock');
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          setAuthState(parsed);
        } catch (error) {
          console.error('Error parsing stored auth:', error);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock de validación simple
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substring(7),
        email,
        name: email.split('@')[0],
        userType: 'client',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      };

      const mockToken = 'mock-jwt-token-' + Math.random().toString(36);

      const newAuthState = {
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
      };

      setAuthState(newAuthState);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_mock', JSON.stringify(newAuthState));
      }
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    userType: 'client' | 'provider'
  ): Promise<void> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password.length >= 6 && name) {
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substring(7),
        email,
        name,
        userType,
        avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      };

      const mockToken = 'mock-jwt-token-' + Math.random().toString(36);

      const newAuthState = {
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
      };

      setAuthState(newAuthState);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_mock', JSON.stringify(newAuthState));
      }
    } else {
      throw new Error('Datos inválidos');
    }
  };

  const logout = (): void => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_mock');
    }
  };

  // Evitar problemas de hydration retornando estado inicial hasta que esté montado
  if (!mounted) {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
      loading: true,
      login,
      register,
      logout,
    };
  }

  return {
    ...authState,
    loading,
    login,
    register,
    logout,
  };
}
