"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import ProfileHero from "@/components/profile/ProfileHero";
import RequestsList from "@/components/provider/RequestsList";
import CalendarPlaceholder from "@/components/provider/CalendarPlaceholder";
import RejectRequestModal from "@/components/provider/RejectRequestModal";
import EditRequestModal from "@/components/provider/EditRequestModal";
import RequestDetailDrawer from "@/components/provider/RequestDetailDrawer";
import ReportRequestModal from "@/components/provider/ReportRequestModal";
import ChatPlaceholderDialog from "@/components/provider/ChatPlaceholderDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useProviderUser } from "@/hooks/useProviderUser";
import { useProviderRequests } from "@/hooks/useProviderRequests";
import { useCalendar } from "@/hooks/useCalendar";
import type { ProviderRequest, ProviderUser, ClientUser } from "@/types";

export default function ProviderPage() {
  const {
    provider,
    loading: providerLoading,
    updateProvider,
  } = useProviderUser();
  const {
    requests,
    loading: requestsLoading,
    acceptRequest,
    rejectRequest,
    updateRequest,
    deleteRequest,
  } = useProviderRequests();
  const { calendar, loading: calendarLoading } = useCalendar();

  // Modals state
  const [rejectModal, setRejectModal] = useState<{
    open: boolean;
    requestId: string;
    serviceName: string;
  }>({ open: false, requestId: "", serviceName: "" });

  const [editModal, setEditModal] = useState<{
    open: boolean;
    request: ProviderRequest | null;
  }>({ open: false, request: null });

  const [detailDrawer, setDetailDrawer] = useState<{
    open: boolean;
    request: ProviderRequest | null;
  }>({ open: false, request: null });

  const [reportModal, setReportModal] = useState<{
    open: boolean;
    request: ProviderRequest | null;
  }>({ open: false, request: null });

  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    requestId: string;
    serviceName: string;
  }>({ open: false, requestId: "", serviceName: "" });

  const [chatDialog, setChatDialog] = useState(false);

  // Handlers
  const handleAccept = async (requestId: string) => {
    await acceptRequest(requestId);
    // Mostrar alerta de éxito
    setTimeout(() => {
      alert("Solicitud aceptada exitosamente");
    }, 250);
  };

  const handleReject = (requestId: string) => {
    const request = requests.find((r) => r.requestId === requestId);
    if (request) {
      setRejectModal({
        open: true,
        requestId,
        serviceName: request.serviceName,
      });
    }
  };

  const handleRejectConfirm = async (requestId: string, reason: string) => {
    await rejectRequest(requestId, reason);
    // Mostrar alerta de éxito
    setTimeout(() => {
      alert("Solicitud rechazada");
    }, 250);
  };

  const handleEdit = (requestId: string) => {
    const request = requests.find((r) => r.requestId === requestId);
    if (request) {
      setEditModal({ open: true, request });
    }
  };

  const handleEditConfirm = async (
    requestId: string,
    updates: Partial<ProviderRequest>
  ) => {
    await updateRequest(requestId, updates);
    // Mostrar alerta de éxito
    setTimeout(() => {
      alert("Solicitud actualizada exitosamente");
    }, 250);
  };

  const handleDelete = (requestId: string) => {
    const request = requests.find((r) => r.requestId === requestId);
    if (request) {
      setDeleteConfirm({
        open: true,
        requestId,
        serviceName: request.serviceName,
      });
    }
  };

  const handleDeleteConfirm = async (requestId: string) => {
    await deleteRequest(requestId);
    setDeleteConfirm({ open: false, requestId: "", serviceName: "" });
    // Mostrar alerta de éxito
    setTimeout(() => {
      alert("Solicitud eliminada");
    }, 250);
  };

  const handleOpenChat = () => {
    setChatDialog(true);
  };

  const handleReport = (requestId: string) => {
    const request = requests.find((r) => r.requestId === requestId);
    if (request) {
      setReportModal({ open: true, request });
    }
  };

  const handleViewDetail = (requestId: string) => {
    const request = requests.find((r) => r.requestId === requestId);
    if (request) {
      setDetailDrawer({ open: true, request });
    }
  };

  const handleUpdateUser = (updates: Partial<ClientUser>) => {
    // Convertir ClientUser a ProviderUser para compatibilidad
    updateProvider(updates as Partial<ProviderUser>);
  };

  // Convertir ProviderUser a ClientUser para ProfileHero
  const localUser: ClientUser | null = provider
    ? {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        address: provider.address,
        memberSince: provider.memberSince,
        profileImage: provider.profileImage,
      }
    : null;

  if (providerLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (!provider || !localUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-lg text-primary mb-4">
            Error al cargar el proveedor
          </h1>
          <p className="body-base text-secondary">
            No se pudo cargar la información del proveedor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero con ProfileHero */}
      <ProfileHero user={localUser} onUpdateUser={handleUpdateUser} />

      {/* Contenido Principal */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Columna Izquierda: Solicitudes (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="heading-lg text-primary">
                Solicitudes de Servicio
              </h2>
              <p className="body-base text-secondary">
                {requests.length} total{requests.length !== 1 ? "es" : ""}
              </p>
            </div>

            <RequestsList
              requests={requests}
              loading={requestsLoading}
              onAccept={handleAccept}
              onReject={handleReject}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onOpenChat={handleOpenChat}
              onReport={handleReport}
              onViewDetail={handleViewDetail}
            />
          </div>

          {/* Columna Derecha: Calendario (1/3) */}
          <div className="space-y-6">
            <h2 className="heading-lg text-primary">Calendario</h2>
            <CalendarPlaceholder
              calendar={calendar}
              loading={calendarLoading}
            />
          </div>
        </div>
      </section>

      {/* Modals y Dialogs */}
      <RejectRequestModal
        open={rejectModal.open}
        onOpenChange={(open) => setRejectModal({ ...rejectModal, open })}
        requestId={rejectModal.requestId}
        serviceName={rejectModal.serviceName}
        onConfirm={handleRejectConfirm}
      />

      {editModal.request && (
        <EditRequestModal
          open={editModal.open}
          onOpenChange={(open) => setEditModal({ ...editModal, open })}
          request={editModal.request}
          onConfirm={handleEditConfirm}
        />
      )}

      <RequestDetailDrawer
        open={detailDrawer.open}
        onOpenChange={(open) => setDetailDrawer({ ...detailDrawer, open })}
        request={detailDrawer.request}
        onOpenChat={handleOpenChat}
      />

      {reportModal.request && (
        <ReportRequestModal
          open={reportModal.open}
          onOpenChange={(open) => setReportModal({ ...reportModal, open })}
          request={reportModal.request}
        />
      )}

      <AlertDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar solicitud?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar la solicitud &quot;
              {deleteConfirm.serviceName}&quot;? Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteConfirm(deleteConfirm.requestId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ChatPlaceholderDialog open={chatDialog} onOpenChange={setChatDialog} />
    </div>
  );
}
