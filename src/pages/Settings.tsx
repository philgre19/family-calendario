import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/MainLayout";
import { useSettings } from "@/hooks/useSettings";
import { useNavigate } from "react-router-dom";
import { 
  Palette, 
  Bell, 
  Users, 
  LayoutGrid, 
  Trophy, 
  Shield, 
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Settings() {
  const { settings, loading, error, updateSettings } = useSettings();
  const navigate = useNavigate();

  const handleToggleNotifications = async () => {
    const updated = await updateSettings({ 
      notifications_enabled: !settings?.notifications_enabled 
    });
    if (updated) {
      toast.success(
        `Notifications ${updated.notifications_enabled ? 'activées' : 'désactivées'}`
      );
    }
  };

  const handleToggleGamification = async () => {
    const updated = await updateSettings({ 
      gamification_enabled: !settings?.gamification_enabled 
    });
    if (updated) {
      toast.success(
        `Gamification ${updated.gamification_enabled ? 'activée' : 'désactivée'}`
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[180px] rounded-lg" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Paramètres</h1>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SettingCard
            title="Apparence"
            description="Personnalisez les couleurs, thèmes et le mode clair/sombre"
            icon={<Palette className="h-5 w-5" />}
            onClick={() => navigate("/settings/appearance")}
          />

          <SettingCard
            title="Notifications"
            description="Gérez vos préférences de notifications et alertes"
            icon={<Bell className="h-5 w-5" />}
            onClick={() => navigate("/settings/notifications")}
            action={
              <Switch
                checked={settings?.notifications_enabled || false}
                onCheckedChange={handleToggleNotifications}
                aria-label="Toggle notifications"
              />
            }
            badge={settings?.notifications_enabled ? "Activées" : "Désactivées"}
          />

          <SettingCard
            title="Gestion des utilisateurs"
            description="Gérez les membres de la famille et leurs rôles"
            icon={<Users className="h-5 w-5" />}
            onClick={() => navigate("/user-settings")}
          />

          <SettingCard
            title="Dashboard"
            description="Personnalisez l'affichage et l'ordre des widgets"
            icon={<LayoutGrid className="h-5 w-5" />}
            onClick={() => navigate("/settings/dashboard")}
          />

          <SettingCard
            title="Gamification"
            description="Configurez le système de points et de quêtes"
            icon={<Trophy className="h-5 w-5" />}
            onClick={() => navigate("/settings/gamification")}
            action={
              <Switch
                checked={settings?.gamification_enabled || false}
                onCheckedChange={handleToggleGamification}
                aria-label="Toggle gamification"
              />
            }
            badge={settings?.gamification_enabled ? "Activé" : "Désactivé"}
          />

          <SettingCard
            title="Sécurité"
            description="Gérez la sécurité et exportez vos données"
            icon={<Shield className="h-5 w-5" />}
            onClick={() => navigate("/settings/security")}
          />
        </div>
      </div>
    </MainLayout>
  );
}

function SettingCard({
  title,
  description,
  icon,
  onClick,
  action,
  badge,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  action?: React.ReactNode;
  badge?: string;
}) {
  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-md transition-all duration-200 relative group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold mb-2 pr-8">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {action && (
          <div className="absolute top-4 right-4" onClick={e => e.stopPropagation()}>
            {action}
          </div>
        )}
      </div>
      {badge && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
          {badge}
        </span>
      )}
      <ChevronRight 
        className="absolute right-4 bottom-4 h-5 w-5 text-muted-foreground/50 
                   transition-transform duration-200 group-hover:translate-x-1" 
      />
    </Card>
  );
}
