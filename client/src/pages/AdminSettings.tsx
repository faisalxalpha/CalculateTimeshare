import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient, apiClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save } from "lucide-react";

const formSchema = z.object({
  webhookUrl: z.string().url({ message: "Please enter a valid URL" }).or(z.literal("")).optional(),
});

export default function AdminSettings() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      webhookUrl: "",
    },
  });

  const { data: settings } = useQuery({
    queryKey: ["/api/admin/settings"],
    onSuccess: (data: any) => {
      const webhook = data.find((s: any) => s.key === "WEBHOOK_URL");
      if (webhook) {
        form.setValue("webhookUrl", webhook.value || "");
      }
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await apiClient.post("/api/admin/settings", { key: "WEBHOOK_URL", value: data.webhookUrl || "" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({ title: "Settings saved successfully" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    saveMutation.mutate(data);
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-sans font-bold">Admin Settings</h1>
              <p className="text-muted-foreground">Configure webhook and notification settings</p>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <Card>
          <CardHeader>
            <CardTitle>Webhook Configuration</CardTitle>
            <CardDescription>
              Configure where lead notifications should be sent. This webhook will receive all form submissions from calculators and contact forms.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="webhookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webhook URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://hooks.zapier.com/hooks/catch/..."
                          data-testid="input-webhook-url"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your webhook URL (e.g., Zapier, Make.com, or custom endpoint). Leave empty to disable webhook notifications.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Webhook Payload Format</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Your webhook will receive a POST request with the following JSON structure:
                </p>
                <pre className="text-xs bg-card p-3 rounded border overflow-x-auto">
{`{
  "source": "cost-calculator" | "maintenance-calculator" | "contact-form",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "resortName": "Resort Name",
  "annualMaintenanceFee": 1200,
  "purchasePrice": 25000,
  "yearsOwned": 5,
  "location": "Florida",
  "message": "User message",
  "calculatorResults": "{ ... }",
  "timestamp": "2025-01-01T12:00:00Z"
}`}
                </pre>
              </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={saveMutation.isPending}
                  data-testid="button-save-settings"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saveMutation.isPending ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Email Configuration Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Email notifications are automatically configured via Resend integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All lead submissions are automatically sent to your configured admin email address via Resend. 
              No additional configuration needed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
