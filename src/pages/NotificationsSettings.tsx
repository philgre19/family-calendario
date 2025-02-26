
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useSettings } from "@/hooks/useSettings";

export default function NotificationsSettings() {
  const { settings, loading, error, updateSettings } = useSettings();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const availableEvents = [
    { id: "new_task", label: "Nouvelle tâche" },
    { id: "task_completed", label: "Tâche terminée" },
    { id: "new_event", label: "Nouvel événement" },
    { id: "reminder", label: "Rappels" }
  ];

  useEffect(() => {
    if (settings) {
      setNotificationsEnabled(settings.notifications_enabled || false);
      setSelectedEvents(settings.notification_events || []);
    }
  }, [settings]);

  async function handleSave() {
    await updateSettings({
      notifications_enabled: notificationsEnabled,
      notification_events: selectedEvents
    });
    toast.success("Paramètres de notifications mis à jour !");
  }

  if (loading) return <MainLayout><div className="p-6">Chargement...</div></MainLayout>;
  if (error) return <MainLayout><div className="p-6 text-red-500">Erreur: {error}</div></MainLayout>;

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-gray-600">Gérez vos préférences de notifications.</p>

        <div className="flex flex-col gap-4 max-w-sm mt-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Activer les notifications</label>
              <p className="text-sm text-gray-500">Recevoir des notifications de l'application</p>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          {notificationsEnabled && (
            <div className="space-y-4 mt-4">
              <h3 className="font-medium">Événements à notifier</h3>
              {availableEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={event.id}
                    checked={selectedEvents.includes(event.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedEvents([...selectedEvents, event.id]);
                      } else {
                        setSelectedEvents(selectedEvents.filter(e => e !== event.id));
                      }
                    }}
                  />
                  <label htmlFor={event.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {event.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          <Button onClick={handleSave} className="mt-4">
            Sauvegarder
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
