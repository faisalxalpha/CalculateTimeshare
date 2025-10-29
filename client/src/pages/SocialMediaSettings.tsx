
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
  facebook: z.string().url({ message: "Please enter a valid URL" }).or(z.literal("")).optional(),
  twitter: z.string().url({ message: "Please enter a valid URL" }).or(z.literal("")).optional(),
  instagram: z.string().url({ message: "Please enter a valid URL" }).or(z.literal("")).optional(),
  linkedin: z.string().url({ message: "Please enter a valid URL" }).or(z.literal("")).optional(),
});

export default function SocialMediaSettings() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  const { data: settings } = useQuery({
    queryKey: ["/api/admin/social-media-settings"],
    onSuccess: (data: any) => {
      const facebook = data.find((s: any) => s.key === "SOCIAL_MEDIA_FACEBOOK");
      const twitter = data.find((s: any) => s.key === "SOCIAL_MEDIA_TWITTER");
      const instagram = data.find((s: any) => s.key === "SOCIAL_MEDIA_INSTAGRAM");
      const linkedin = data.find((s: any) => s.key === "SOCIAL_MEDIA_LINKEDIN");
      if (facebook) form.setValue("facebook", facebook.value || "");
      if (twitter) form.setValue("twitter", twitter.value || "");
      if (instagram) form.setValue("instagram", instagram.value || "");
      if (linkedin) form.setValue("linkedin", linkedin.value || "");
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await apiClient.post("/api/admin/social-media-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social-media-settings"] });
      toast({ title: "Social media settings saved successfully" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save social media settings. Please try again.",
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
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-sans font-bold">Social Media Settings</h1>
              <p className="text-muted-foreground">Configure your website's social media links</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Configuration</CardTitle>
            <CardDescription>
              Configure your website's social media links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={saveMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saveMutation.isPending ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
