
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/queryClient";

interface AppSettings {
  key: string;
  value: string;
}

export function SettingsForm() {
  const [settings, setSettings] = useState<AppSettings[]>([]);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [adminUrl, setAdminUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    apiClient.get("/api/admin/settings").then((response) => {
      setSettings(response.data);
      const webhookUrlSetting = response.data.find(
        (s: AppSettings) => s.key === "webhook_url"
      );
      if (webhookUrlSetting) {
        setWebhookUrl(webhookUrlSetting.value);
      }
      const adminUrlSetting = response.data.find(
        (s: AppSettings) => s.key === "admin_url"
      );
      if (adminUrlSetting) {
        setAdminUrl(adminUrlSetting.value);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const promises = [];
    promises.push(
      apiClient.post("/api/admin/settings", {
        key: "webhook_url",
        value: webhookUrl,
      })
    );
    promises.push(
      apiClient.post("/api/admin/settings", {
        key: "admin_url",
        value: adminUrl,
      })
    );
    Promise.all(promises).then(() => {
      toast({ title: "Settings updated successfully" });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="webhookUrl" className="block text-sm font-medium mb-1">
            Webhook URL
          </label>
          <Input
            id="webhookUrl"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="Enter your webhook URL"
          />
        </div>
        <div>
          <label htmlFor="adminUrl" className="block text-sm font-medium mb-1">
            Admin URL
          </label>
          <Input
            id="adminUrl"
            value={adminUrl}
            onChange={(e) => setAdminUrl(e.target.value)}
            placeholder="Enter your admin URL slug"
          />
        </div>
        <Button type="submit">Save Settings</Button>
      </div>
    </form>
  );
}
