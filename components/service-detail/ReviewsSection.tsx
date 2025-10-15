import { Review } from "@/types";
import { Star, MessageSquare } from "lucide-react";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  isLoading: boolean;
}

/**
 * Componente que muestra las reseñas y calificaciones del servicio
 * Incluye resumen estadístico y lista de reseñas
 */
export function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
  isLoading,
}: ReviewsSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  // Calcular distribución de estrellas
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MessageSquare className="w-8 h-8 text-primary" />
        <div>
          <h2 className="heading-md text-primary">Reseñas y Calificaciones</h2>
          <p className="body-base text-secondary">
            Conoce lo que opinan nuestros clientes
          </p>
        </div>
      </div>

      {/* Resumen de calificaciones */}
      <div className="grid md:grid-cols-3 gap-8 p-8 bg-secondary rounded-2xl shadow-md">
        {/* Promedio general */}
        <div className="text-center md:border-r border-gray-300 pr-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-6xl font-bold text-primary">
              {averageRating.toFixed(1)}
            </span>
            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="body-base text-secondary">
            Basado en {totalReviews} {totalReviews === 1 ? "reseña" : "reseñas"}
          </p>
        </div>

        {/* Distribución de estrellas */}
        <div className="md:col-span-2 space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="body-sm text-secondary font-medium w-12">
                {rating} ★
              </span>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="body-sm text-muted w-12 text-right font-medium">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de reseñas */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, 5).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {reviews.length > 5 && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  className="rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Ver todas las reseñas ({reviews.length})
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-secondary rounded-2xl">
            <MessageSquare className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="body-lg text-muted">
              Este servicio aún no tiene reseñas.
            </p>
            <p className="body-sm text-muted mt-2">
              ¡Sé el primero en dejar tu opinión!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
