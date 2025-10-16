"use client";

import { useParams } from "next/navigation";
import { ServiceHero } from "@/components/service-detail/ServiceHero";
import { ServiceDetails } from "@/components/service-detail/ServiceDetails";
import { ProvidersList } from "@/components/service-detail/ProvidersList";
import { ReviewsSection } from "@/components/service-detail/ReviewsSection";
import { ServiceCTA } from "@/components/service-detail/ServiceCTA";
import { ServiceDetailSkeleton } from "@/components/service-detail/ServiceDetailSkeleton";
import Section from "@/components/layout/Section";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { useProviders } from "@/hooks/useProviders";
import { useReviews } from "@/hooks/useReviews";
import { AlertCircle } from "lucide-react";

/**
 * Página de detalle de servicio
 * Ruta: /services/[id]
 *
 * Muestra toda la información completa de un servicio:
 * - Hero con imagen y datos principales
 * - Detalles y características
 * - Proveedores disponibles
 * - Reseñas y calificaciones
 * - CTA final
 */
export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id as string;

  // Hooks para obtener datos
  const {
    service,
    isLoading: serviceLoading,
    error: serviceError,
  } = useServiceDetail(serviceId);
  const { providers, isLoading: providersLoading } = useProviders(serviceId);
  const { reviews, isLoading: reviewsLoading } = useReviews(serviceId);

  // Handlers para acciones (modales se implementarán después)
  const handleStartRequest = () => {
    console.log("Iniciar request para servicio:", serviceId);
    alert("Modal de request - Se implementará próximamente");
    // TODO: Abrir modal de solicitud de servicio
  };

  const handleContactSpecialist = () => {
    console.log("Contactar especialista para servicio:", serviceId);
    alert("Modal de contacto - Se implementará próximamente");
    // TODO: Abrir modal de contacto
  };

  // Estado de carga
  if (serviceLoading) {
    return <ServiceDetailSkeleton />;
  }

  // Estado de error
  if (serviceError) {
    return (
      <Section size="lg">
        <div className="text-center py-16 max-w-2xl mx-auto">
          <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
          <h2 className="heading-lg text-primary mb-3">
            Error al cargar el servicio
          </h2>
          <p className="body-base text-secondary mb-6">
            {serviceError.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </Section>
    );
  }

  // Estado de no encontrado
  if (!service) {
    return (
      <Section size="lg">
        <div className="text-center py-16 max-w-2xl mx-auto">
          <AlertCircle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="heading-lg text-primary mb-3">
            Servicio no encontrado
          </h2>
          <p className="body-base text-secondary mb-6">
            El servicio que buscas no existe o ha sido removido.
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </Section>
    );
  }

  // Renderizado exitoso
  return (
    <div>
      {/* Hero Section */}
      <ServiceHero service={service} onStartRequest={handleStartRequest} />

      {/* Detalles del servicio */}
      <Section size="sm" background="white">
        <ServiceDetails service={service} />
      </Section>

      {/* Proveedores disponibles */}
      <Section size="md" background="secondary">
        <ProvidersList providers={providers} isLoading={providersLoading} />
      </Section>

      {/* Reseñas y calificaciones */}
      <Section size="md" background="white">
        <ReviewsSection
          reviews={reviews}
          averageRating={service.rating}
          totalReviews={service.reviewCount}
          isLoading={reviewsLoading}
        />
      </Section>

      {/* CTA final */}
      {/* <Section size="md" background="secondary">
        <ServiceCTA onContactClick={handleContactSpecialist} />
      </Section> */}
    </div>
  );
}
