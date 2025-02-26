import { Card } from "@/components/ui/card"; 
import { MainLayout } from "@/components/MainLayout";
import { useSettings } from "@/hooks/useSettings";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { settings, loading, error } = useSettings();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>Paramètres</span>
        </h1>

        {loading && <div>Chargement...</div>}
        {error && <div className="text-red-500">Erreur: {error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SettingCard
            title="Apparence"
            description="Couleurs, Thèmes, Mode Clair/Sombre"
            onClick={() => navigate("/settings/appearance")}
          />

          <SettingCard
            title="Notifications"
            description="Activer/désactiver, choix des événements, etc."
            onClick={() => navigate("/settings/notifications")}
            badge={settings?.notifications_enabled ? "Activées" : "Désactivées"}
          />

          <SettingCard
            title="Gestion des utilisateurs"
            description="Membres de la famille, rôles, mot de passe"
            onClick={() => navigate("/settings/users")}
          />

          <SettingCard
            title="Dashboard"
            description="Disposition des widgets, ordre, etc."
            onClick={() => navigate("/settings/dashboard")}
          />

          <SettingCard
            title="Gamification"
            description="Points, quêtes, style RPG..."
            onClick={() => navigate("/settings/gamification")}
            badge={settings?.gamification_enabled ? "Activé" : "Désactivé"}
          />

          <SettingCard
            title="Sécurité"
            description="Verrouillage par code, exporter ses données, etc."
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
  onClick,
  badge,
}: {
  title: string;
  description: string;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition relative"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
      {badge && (
        <span className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Card>
  );
}
