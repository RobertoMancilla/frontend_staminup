import { useState, useEffect } from 'react';

/**
 * Interfaz extendida para Provider con datos de la API mock
 */
interface ProviderData {
  id: string;
  name: string;
  experience: string;
  rating: number;
  completedJobs: number;
  serviceIds: string[];
  avatarUrl?: string;
  verified: boolean;
  bio: string;
  specialties: string[];
}

/**
 * Hook para obtener los proveedores que ofrecen un servicio
 * Usa datos mock de /data/providers.json
 */
export function useProviders(serviceId: string | undefined) {
  const [providers, setProviders] = useState<ProviderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProviders() {
      if (!serviceId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Cargar datos mock
        const response = await fetch('/data/providers.json');
        if (!response.ok) {
          throw new Error('Error al cargar los proveedores');
        }

        const allProviders: ProviderData[] = await response.json();
        const serviceProviders = allProviders.filter((p) => 
          p.serviceIds.includes(serviceId)
        );
        
        setProviders(serviceProviders);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
        setProviders([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProviders();
  }, [serviceId]);

  return { providers, isLoading, error };
}

export type { ProviderData };
