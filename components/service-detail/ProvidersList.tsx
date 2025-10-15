import { ProviderData } from "@/hooks/useProviders";
import { ProviderCard } from "@/components/ProviderCard";
import { Users } from "lucide-react";

interface ProvidersListProps {
  providers: ProviderData[];
  isLoading: boolean;
}

/**
 * Componente que muestra la lista de proveedores disponibles
 * para un servicio específico
 */
export function ProvidersList({ providers, isLoading }: ProvidersListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (providers.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-primary" />
        <div>
          <h2 className="heading-md text-primary">Profesionales Disponibles</h2>
          <p className="body-base text-secondary">
            {providers.length}{" "}
            {providers.length === 1
              ? "profesional ofrece"
              : "profesionales ofrecen"}{" "}
            este servicio
          </p>
        </div>
      </div>

      {/* Grid de proveedores */}
      <div className="grid md:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}
