import { Star, CheckCircle, Briefcase } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ProviderData } from "@/hooks/useProviders";

interface ProviderCardProps {
  provider: ProviderData;
}

/**
 * Componente para mostrar información de un proveedor
 * Presentacional puro - recibe datos por props
 */
export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Avatar con badge de verificación */}
        <div className="flex-shrink-0 relative">
          <img
            src={provider.avatarUrl || "https://i.pravatar.cc/150?img=0"}
            alt={provider.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          {provider.verified && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <CheckCircle className="w-5 h-5 text-green-500 fill-green-500" />
            </div>
          )}
        </div>

        {/* Información del proveedor */}
        <div className="flex-1 min-w-0">
          {/* Nombre y rating */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="heading-sm text-primary mb-1">{provider.name}</h3>
              <div className="flex items-center gap-2 text-muted body-sm">
                <Briefcase className="w-4 h-4" />
                <span>{provider.experience}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="body-sm font-semibold text-primary">
                {provider.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="body-base text-secondary mb-3 line-clamp-2">
            {provider.bio}
          </p>

          {/* Stats */}
          <p className="body-sm text-muted mb-4">
            {provider.completedJobs} trabajos completados
          </p>

          {/* Botón */}
          <Button
            variant="outline"
            className="w-full sm:w-auto rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            Ver perfil
          </Button>
        </div>
      </div>
    </Card>
  );
}
