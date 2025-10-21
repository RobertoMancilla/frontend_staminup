"use client";

import {
  X,
  User,
  Clock,
  MapPin,
  Phone,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ProviderRequest } from "@/types";

interface RequestDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: ProviderRequest | null;
  onOpenChat: (requestId: string) => void;
}

const STATUS_CONFIG = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  accepted: { label: "Aceptada", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rechazada", color: "bg-red-100 text-red-800" },
  in_progress: { label: "En Proceso", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completada", color: "bg-gray-100 text-gray-800" },
  cancelled: { label: "Cancelada", color: "bg-gray-100 text-gray-800" },
};

const ACTION_LABELS = {
  created: "Solicitud creada",
  accepted: "Solicitud aceptada",
  rejected: "Solicitud rechazada",
  in_progress: "Trabajo iniciado",
  completed: "Trabajo completado",
  cancelled: "Solicitud cancelada",
  date_proposed: "Nueva fecha propuesta",
};

export default function RequestDetailDrawer({
  open,
  onOpenChange,
  request,
  onOpenChat,
}: RequestDetailDrawerProps) {
  if (!request) return null;

  const statusConfig = STATUS_CONFIG[request.status];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="heading-lg text-primary pr-8">
            Detalle de Solicitud
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Header con Cliente */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[var(--color-primary)]">
              {request.userAvatar ? (
                <Image
                  src={request.userAvatar}
                  alt={request.userName}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white">
                  <User className="h-8 w-8" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="heading-md text-primary">{request.serviceName}</h3>
              <p className="body-base text-secondary">{request.userName}</p>
              <Badge className={`${statusConfig.color} mt-2`}>
                {statusConfig.label}
              </Badge>
            </div>
          </div>

          {/* Detalles de la Solicitud */}
          <div className="space-y-4">
            <h4 className="body-lg font-semibold text-primary">
              Información de la Solicitud
            </h4>

            <div className="grid gap-4">
              {/* Fecha Preferida */}
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="body-sm font-medium text-primary">
                    Fecha solicitada
                  </p>
                  <p className="body-sm text-secondary">
                    {formatDate(request.preferredDate)}
                  </p>
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="body-sm font-medium text-primary">Dirección</p>
                  <p className="body-sm text-secondary">{request.address}</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="body-sm font-medium text-primary">
                    Teléfono de contacto
                  </p>
                  <p className="body-sm text-secondary">
                    {request.contactPhone}
                  </p>
                </div>
              </div>

              {/* Monto */}
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="body-sm font-medium text-primary">Monto</p>
                  <p className="body-sm text-secondary font-semibold">
                    ${request.amount.toLocaleString("es-MX")} MXN
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="pt-4 border-t">
              <p className="body-sm font-medium text-primary mb-2">
                Descripción del servicio
              </p>
              <p className="body-sm text-secondary">{request.description}</p>
            </div>

            {/* Razón de Rechazo (si aplica) */}
            {request.status === "rejected" && request.rejectionReason && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="body-sm font-medium text-red-900 mb-1">
                  Motivo del rechazo
                </p>
                <p className="body-sm text-red-800">
                  {request.rejectionReason}
                </p>
              </div>
            )}
          </div>

          {/* Timeline / Historial */}
          <div className="space-y-4 pt-4 border-t">
            <h4 className="body-lg font-semibold text-primary">
              Historial de la Solicitud
            </h4>

            <div className="space-y-3">
              {request.history.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-6 before:bottom-0 before:w-[2px] before:bg-gray-200 last:before:hidden"
                >
                  <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-[var(--color-primary)] border-2 border-white" />
                  <div className="flex-1 pb-4">
                    <p className="body-sm font-medium text-primary">
                      {ACTION_LABELS[entry.action] || entry.action}
                    </p>
                    <p className="body-sm text-secondary">
                      {formatDate(entry.timestamp)}
                    </p>
                    {entry.note && (
                      <p className="body-sm text-secondary mt-1 italic">
                        {entry.note}
                      </p>
                    )}
                    {entry.reason && (
                      <p className="body-sm text-red-700 mt-1">
                        Motivo: {entry.reason}
                      </p>
                    )}
                    {entry.proposedDate && (
                      <p className="body-sm text-blue-700 mt-1">
                        Nueva fecha: {formatDate(entry.proposedDate)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => onOpenChat(request.requestId)}
              className="flex-1 gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Abrir Chat
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
