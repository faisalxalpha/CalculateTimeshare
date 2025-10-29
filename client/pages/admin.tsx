
import { SettingsForm } from "../components/admin/settings-form";

export function Admin() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <SettingsForm />
    </div>
  );
}
