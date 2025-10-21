"use client";

import { useState } from "react";
import { AlertTriangle, Flag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProviderRequest } from "@/types";

interface ReportRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: ProviderRequest;
  onSuccess?: (reportId: string, category: string) => void;
}

const REPORT_CATEGORIES = [
  {
    id: "fake_request",
    label: "Solicitud falsa",
    description: "La solicitud parece ser fraudulenta o no legítima",
  },
  {
    id: "inappropriate_behavior",
    label: "Comportamiento inapropiado",
    description: "El cliente tuvo un comportamiento no profesional",
  },
  {
    id: "payment_issue",
    label: "Problema de pago",
    description: "Problemas con el pago o método de pago",
  },
  {
    id: "dangerous_conditions",
    label: "Condiciones peligrosas",
    description: "El lugar de trabajo presenta condiciones inseguras",
  },
  {
    id: "spam",
    label: "Spam o solicitud duplicada",
    description: "Solicitud repetida o spam",
  },
  {
    id: "other",
    label: "Otro",
    description: "Otro tipo de problema no listado",
  },
];

export default function ReportRequestModal({
  open,
  onOpenChange,
  request,
  onSuccess,
}: ReportRequestModalProps) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (!isSubmitting) {
      setCategory("");
      setDescription("");
      onOpenChange(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert("Por favor selecciona una categoría");
      return;
    }

    if (description.trim().length < 20) {
      alert(
        "Por favor proporciona una descripción más detallada (mínimo 20 caracteres)"
      );
      return;
    }

    setIsSubmitting(true);

    // Simular envío de datos
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generar ID único para el reporte
    const reportId = `rep_${Date.now()}`;

    console.log("Reporte de request enviado:", {
      id: reportId,
      requestId: request.requestId,
      category,
      description,
      timestamp: new Date().toISOString(),
    });

    setIsSubmitting(false);

    // Mostrar mensaje de éxito
    alert(
      "Tu reporte ha sido enviado exitosamente. Nuestro equipo lo revisará y se pondrá en contacto contigo pronto."
    );

    if (onSuccess) {
      onSuccess(reportId, category);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-scroll scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="heading-lg text-primary pr-8 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-[var(--color-error)]" />
            Reportar Solicitud
          </DialogTitle>
          <DialogDescription className="body-base text-secondary">
            Reporta problemas con esta solicitud. Tu reporte será revisado por
            nuestro equipo de soporte.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Información de la Solicitud */}
          <div className="rounded-lg bg-[var(--color-background-secondary)] p-4">
            <h3 className="body-base font-semibold text-primary mb-2">
              {request.serviceName}
            </h3>
            <p className="body-sm text-secondary">
              Cliente: {request.userName}
            </p>
            <p className="body-sm text-secondary">
              Fecha solicitada:{" "}
              {new Date(request.preferredDate).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="body-sm text-secondary">
              Estado: <span className="font-medium">{request.status}</span>
            </p>
          </div>

          {/* Categoría del Problema */}
          <div className="space-y-3">
            <label className="body-base font-medium text-primary">
              Tipo de problema{" "}
              <span className="text-[var(--color-error)]">*</span>
            </label>
            <div className="space-y-2">
              {REPORT_CATEGORIES.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex items-start gap-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    category === cat.id
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={category === cat.id}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <div className="flex-1">
                    <div className="body-base font-medium text-primary">
                      {cat.label}
                    </div>
                    <div className="body-sm text-secondary">
                      {cat.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Descripción Detallada */}
          <div className="space-y-3">
            <label
              htmlFor="description"
              className="body-base font-medium text-primary"
            >
              Descripción detallada{" "}
              <span className="text-[var(--color-error)]">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Por favor describe el problema con el mayor detalle posible..."
              maxLength={1000}
              rows={6}
              className="w-full rounded-lg border border-gray-300 p-3 body-base text-primary placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              required
            />
            <div className="flex justify-between items-center">
              <p className="body-sm text-secondary">Mínimo 20 caracteres</p>
              <p className="body-sm text-secondary">
                {description.length}/1000 caracteres
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                !category || description.trim().length < 20 || isSubmitting
              }
              className="w-full sm:w-auto gap-2 bg-[var(--color-error)] hover:bg-[var(--color-error)]/90"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Enviando...
                </>
              ) : (
                <>
                  <Flag className="h-4 w-4" />
                  Enviar Reporte
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
