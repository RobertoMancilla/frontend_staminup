"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProposeDateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId: string;
  serviceName: string;
  currentDate: string;
  onConfirm: (requestId: string, newDate: string, note?: string) => void;
}

export default function ProposeDateModal({
  open,
  onOpenChange,
  requestId,
  serviceName,
  currentDate,
  onConfirm,
}: ProposeDateModalProps) {
  const [newDate, setNewDate] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (!isSubmitting) {
      setNewDate("");
      setNote("");
      onOpenChange(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newDate) {
      alert("Por favor selecciona una fecha");
      return;
    }

    // Validar que la fecha no sea en el pasado
    const selectedDate = new Date(newDate);
    const now = new Date();
    if (selectedDate < now) {
      alert("La fecha propuesta no puede ser en el pasado");
      return;
    }

    setIsSubmitting(true);

    // Simular latencia
    await new Promise((resolve) => setTimeout(resolve, 200));

    await onConfirm(requestId, newDate, note.trim() || undefined);

    setIsSubmitting(false);
    handleClose();
  };

  // Formatear la fecha actual para mostrar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Obtener el mínimo de datetime-local (ahora + 1 hora)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="heading-lg text-primary pr-8 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[var(--color-primary)]" />
            Proponer Nueva Fecha
          </DialogTitle>
          <DialogDescription className="body-base text-secondary">
            Propón una nueva fecha y hora para esta solicitud.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Información del Servicio */}
          <div className="rounded-lg bg-[var(--color-background-secondary)] p-3">
            <p className="body-sm font-medium text-primary mb-1">
              {serviceName}
            </p>
            <p className="body-sm text-secondary">
              Fecha actual: {formatDate(currentDate)}
            </p>
          </div>

          {/* Nueva Fecha */}
          <div className="space-y-2">
            <Label htmlFor="newDate" className="body-base font-medium">
              Nueva fecha y hora <span className="text-red-600">*</span>
            </Label>
            <Input
              id="newDate"
              type="datetime-local"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              min={getMinDateTime()}
              required
            />
          </div>

          {/* Nota Opcional */}
          <div className="space-y-2">
            <Label htmlFor="note" className="body-base font-medium">
              Nota adicional (opcional)
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ejemplo: Tengo más disponibilidad en esta fecha..."
              rows={3}
              maxLength={300}
            />
            <p className="body-sm text-secondary text-right">
              {note.length}/300
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!newDate || isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Proponiendo...
                </>
              ) : (
                "Proponer Fecha"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
