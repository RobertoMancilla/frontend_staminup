'use client';

import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types';

/**
 * Hook de autenticación mock
 * Simula el comportamiento de autenticación sin backend
 */
export function useAuthMock() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    // Solo acceder a localStorage después del montaje en el cliente
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('auth_mock');
      
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          setAuthState(parsed);
        } catch (error) {
          console.error('❌ [useAuthMock] Error parsing stored auth:', error);
        }
      }
    } else {
      console.log('⚠️ [useAuthMock] Window no disponible (SSR)');
    }
    setLoading(false);
    console.log('✅ [useAuthMock] Loading completado');
    
    return () => {
      console.log('🧹 [useAuthMock] Cleanup - componente desmontándose');
    };
  }, []);
  
  const login = async (email: string, password: string): Promise<void> => {
    console.log('🔐 [LOGIN] Inicio de login con email:', email);
    
    // Simular delay de red
    console.log('⏳ [LOGIN] Simulando delay de red (800ms)...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock de validación simple
    console.log('🔍 [LOGIN] Validando credenciales...');
    if (email && password.length >= 6) {
      console.log('✅ [LOGIN] Credenciales válidas');
      
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

      console.log('👤 [LOGIN] Usuario mock creado:', {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        userType: mockUser.userType
      });
      console.log('🎫 [LOGIN] Token generado:', mockToken);

      setAuthState(newAuthState);
      console.log('📝 [LOGIN] Estado actualizado en React');
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_mock', JSON.stringify(newAuthState));
        console.log('💾 [LOGIN] Auth guardado en localStorage');
      }
      
      console.log('🎉 [LOGIN] Login completado exitosamente');
    } else {
      console.log('❌ [LOGIN] Credenciales inválidas - email:', email, 'password length:', password.length);
      throw new Error('Credenciales inválidas');
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    userType: 'client' | 'provider'
  ): Promise<void> => {
    console.log('📝 [REGISTER] Inicio de registro con:', {
      email,
      name,
      userType,
      passwordLength: password.length
    });
    
    // Simular delay de red
    console.log('⏳ [REGISTER] Simulando delay de red (1000ms)...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('🔍 [REGISTER] Validando datos...');
    if (email && password.length >= 6 && name) {
      console.log('✅ [REGISTER] Datos válidos');
      
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

      console.log('👤 [REGISTER] Usuario mock creado:', {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        userType: mockUser.userType
      });
      console.log('🎫 [REGISTER] Token generado:', mockToken);

      setAuthState(newAuthState);
      console.log('📝 [REGISTER] Estado actualizado en React');
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_mock', JSON.stringify(newAuthState));
        console.log('💾 [REGISTER] Auth guardado en localStorage');
      }
      
      console.log('🎉 [REGISTER] Registro completado exitosamente');
    } else {
      console.log('❌ [REGISTER] Datos inválidos:', {
        hasEmail: !!email,
        passwordLength: password.length,
        hasName: !!name
      });
      throw new Error('Datos inválidos');
    }
  };

  const logout = (): void => {
    console.log('🚪 [LOGOUT] Iniciando logout...');
    console.log('👤 [LOGOUT] Usuario actual:', authState.user?.name);
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    console.log('📝 [LOGOUT] Estado limpiado en React');
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_mock');
      console.log('💾 [LOGOUT] Auth removido de localStorage');
    }
    
    console.log('✅ [LOGOUT] Logout completado');
  };

  console.log('📊 [useAuthMock] Estado actual:', {
    isAuthenticated: authState.isAuthenticated,
    userName: authState.user?.name,
    userEmail: authState.user?.email,
    loading
  });

  return {
    ...authState,
    loading,
    login,
    register,
    logout,
  };
}
