import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calculator, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEO } from "@/components/SEO";

const formSchema = z.object({
  resortName: z.string().min(1, "Resort name is required"),
  annualMaintenanceFee: z.coerce.number().min(0, "Must be a valid amount"),
  purchasePrice: z.coerce.number().min(0, "Must be a valid amount"),
  yearsOwned: z.coerce.number().min(0, "Must be a valid number"),
  location: z.string().min(1, "Location is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
});

type FormData = z.infer<typeof formSchema>;

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export default function CostCalculator() {
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resortName: "",
      annualMaintenanceFee: 0,
      purchasePrice: 0,
      yearsOwned: 0,
      location: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const submitLead = useMutation({
    mutationFn: async (data: FormData & { calculatorResults: string }) => {
      return await apiRequest("POST", "/api/leads", {
        ...data,
        source: "cost-calculator",
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Sent!",
        description: "We'll contact you shortly with your personalized exit options.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onCalculate = (data: FormData) => {
    // Calculate results
    const avgAnnualIncrease = 0.05; // 5% average annual increase
    const yearsProjected = 30;
    
    const lifetimeMaintenance = Array.from({ length: yearsProjected }, (_, i) => {
      return data.annualMaintenanceFee * Math.pow(1 + avgAnnualIncrease, i);
    }).reduce((sum, val) => sum + val, 0);

    const totalLifetimeCost = data.purchasePrice + lifetimeMaintenance;
    const averageAnnualCost = lifetimeMaintenance / yearsProjected;

    const calculatedResults = {
      purchasePrice: data.purchasePrice,
      lifetimeMaintenance: Math.round(lifetimeMaintenance),
      totalLifetimeCost: Math.round(totalLifetimeCost),
      averageAnnualCost: Math.round(averageAnnualCost),
      yearsOwned: data.yearsOwned,
      totalPaidSoFar: data.purchasePrice + (data.annualMaintenanceFee * data.yearsOwned),
    };

    setResults(calculatedResults);
  };

  const onSubmitQuote = () => {
    if (!results) return;
    
    const formData = form.getValues();
    submitLead.mutate({
      ...formData,
      calculatorResults: JSON.stringify(results),
    });
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : "https://calculatetimeshare.com";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Cost Calculator",
        "item": `${baseUrl}/cost-calculator`
      }
    ]
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEO 
        title="Timeshare Cost Calculator - Calculate True Lifetime Costs"
        description="Free calculator to determine your timeshare's total lifetime cost including maintenance fees, assessments, and exit strategy analysis. Get personalized exit quotes instantly."
        ogUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        schema={breadcrumbSchema}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
            Timeshare Cost & Exit Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your lifetime timeshare costs and get personalized exit options
          </p>
        </div>

        {/* Calculator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Your Timeshare Details</CardTitle>
            <CardDescription>
              Provide accurate information for the most precise cost analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="resortName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resort Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Marriott's Grand Chateau" {...field} data-testid="input-resort-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (State)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-location">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="purchasePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="25000" {...field} data-testid="input-purchase-price" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="annualMaintenanceFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Maintenance Fee ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1200" {...field} data-testid="input-maintenance-fee" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearsOwned"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years Owned</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="5" {...field} data-testid="input-years-owned" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-calculate">
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate My Costs
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Timeshare Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">${results.purchasePrice.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground mt-1">Purchase Price</div>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-chart-2 mx-auto mb-2" />
                    <div className="text-3xl font-bold">${results.lifetimeMaintenance.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground mt-1">30-Year Maintenance</div>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-destructive mx-auto mb-2" />
                    <div className="text-3xl font-bold">${results.totalLifetimeCost.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Lifetime Cost</div>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">${results.averageAnnualCost.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground mt-1">Avg. Annual Cost</div>
                  </div>
                </div>

                <Alert className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Based on a 5% average annual maintenance fee increase over 30 years. Your actual costs may vary.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Exit Options</CardTitle>
                <CardDescription>
                  Based on your timeshare details, here are your best options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg hover-elevate">
                  <h4 className="font-semibold mb-2">1. Professional Exit Service</h4>
                  <p className="text-sm text-muted-foreground">
                    Work with a reputable exit company to legally terminate your timeshare contract.
                    Typical cost: $3,000-$8,000. Timeline: 6-18 months.
                  </p>
                </div>
                <div className="p-4 border rounded-lg hover-elevate">
                  <h4 className="font-semibold mb-2">2. Resale Market</h4>
                  <p className="text-sm text-muted-foreground">
                    List your timeshare on resale platforms. Be prepared for a lower price than purchase.
                    Typical timeline: 3-12 months.
                  </p>
                </div>
                <div className="p-4 border rounded-lg hover-elevate">
                  <h4 className="font-semibold mb-2">3. Donation Program</h4>
                  <p className="text-sm text-muted-foreground">
                    Donate to a qualified charity if eligible. May provide tax benefits.
                    Timeline: 1-3 months.
                  </p>
                </div>

                <Button
                  onClick={onSubmitQuote}
                  size="lg"
                  className="w-full mt-4"
                  disabled={submitLead.isPending}
                  data-testid="button-request-exit-quote"
                >
                  {submitLead.isPending ? "Sending..." : "Request Your Exit Quote"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
