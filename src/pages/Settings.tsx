
import { Card } from "@/components/ui/card"; 
import { MainLayout } from "@/components/MainLayout";

export default function Settings() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>Paramètres</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SettingCard
            title="Apparence"
            description="Couleurs, Thèmes, Mode Clair/Sombre"
            onClick={() => {
              window.location.href = "/settings/appearance";
            }}
          />

          <SettingCard
            title="Notifications"
            description="Activer/désactiver, choix des événements, etc."
            onClick={() => alert("Notifications - à implémenter")}
          />

          <SettingCard
            title="Gestion des utilisateurs"
            description="Membres de la famille, rôles, mot de passe"
            onClick={() => alert("Gestion des utilisateurs - à implémenter")}
          />

          <SettingCard
            title="Dashboard"
            description="Disposition des widgets, ordre, etc."
            onClick={() => alert("Dashboard - à implémenter")}
          />

          <SettingCard
            title="Gamification"
            description="Points, quêtes, style RPG..."
            onClick={() => alert("Gamification - à implémenter")}
          />

          <SettingCard
            title="Sécurité"
            description="Verrouillage par code, exporter ses données, etc."
            onClick={() => alert("Sécurité - à implémenter")}
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
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </Card>
  );
}
