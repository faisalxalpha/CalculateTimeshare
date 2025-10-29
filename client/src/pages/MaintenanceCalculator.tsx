import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { SEO } from "@/components/SEO";

export default function MaintenanceCalculator() {
  const [currentMaintenance, setCurrentMaintenance] = useState(1000);
  const [mortgage, setMortgage] = useState(1000);
  const [annualIncrease, setAnnualIncrease] = useState(5);
  const [projectionYears, setProjectionYears] = useState(30);
  const [isMonthly, setIsMonthly] = useState(false);

  // Calculate projections
  const calculateProjections = () => {
    const data = [];
    let cumulativeCost = 0;

    for (let year = 1; year <= projectionYears; year++) {
      const maintenanceFee = currentMaintenance * Math.pow(1 + annualIncrease / 100, year - 1);
      const mortgagePayment = year <= 10 ? mortgage : 0;
      const yearlyTotal = maintenanceFee + mortgagePayment;
      cumulativeCost += yearlyTotal;

      data.push({
        year,
        maintenance: Math.round(maintenanceFee),
        mortgage: Math.round(mortgagePayment),
        total: Math.round(yearlyTotal),
        cumulative: Math.round(cumulativeCost),
      });
    }

    return data;
  };

  const projections = calculateProjections();
  const totalCost = projections[projections.length - 1]?.cumulative || 0;
  const firstYearCost = projections[0]?.total || 0;
  const year5 = projections[4];
  const year10 = projections[9];
  const year20 = projections[19];
  const year30 = projections[29];

  // Convert to monthly if needed
  const displayValue = (value: number) => {
    return isMonthly ? Math.round(value / 12) : value;
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
        "name": "Maintenance Calculator",
        "item": `${baseUrl}/maintenance-calculator`
      }
    ]
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEO 
        title="Maintenance Fee Calculator - 30 Year Growth Projection"
        description="Project your timeshare maintenance fees over 30 years with adjustable annual increase rates. Visualize the true cost impact with interactive charts and detailed breakdowns."
        ogUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        schema={breadcrumbSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-chart-2/10 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-chart-2" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
            Maintenance Fee Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Project how your timeshare maintenance fees will grow over time
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calculator Settings</CardTitle>
                <CardDescription>
                  Adjust the inputs to see real-time projections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Monthly/Annual Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="display-mode" className="text-base">Display Mode</Label>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${!isMonthly ? 'font-semibold' : 'text-muted-foreground'}`}>Annual</span>
                    <Switch
                      id="display-mode"
                      checked={isMonthly}
                      onCheckedChange={setIsMonthly}
                      data-testid="switch-monthly-annual"
                    />
                    <span className={`text-sm ${isMonthly ? 'font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
                  </div>
                </div>

                {/* Current Maintenance Fee */}
                <div className="space-y-2">
                  <Label htmlFor="maintenance">Current Maintenance (per year)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maintenance"
                      type="number"
                      value={currentMaintenance}
                      onChange={(e) => setCurrentMaintenance(Number(e.target.value))}
                      className="pl-9"
                      data-testid="input-current-maintenance"
                    />
                  </div>
                </div>

                {/* Mortgage Payment */}
                <div className="space-y-2">
                  <Label htmlFor="mortgage">Mortgage (per year, 10 yrs max)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mortgage"
                      type="number"
                      value={mortgage}
                      onChange={(e) => setMortgage(Number(e.target.value))}
                      className="pl-9"
                      data-testid="input-mortgage"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Mortgage payments capped at 10 years</p>
                </div>

                {/* Annual Increase Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Annual % Increase</Label>
                    <span className="text-lg font-semibold text-primary">{annualIncrease}%</span>
                  </div>
                  <Slider
                    value={[annualIncrease]}
                    onValueChange={(value) => setAnnualIncrease(value[0])}
                    min={0}
                    max={20}
                    step={1}
                    className="w-full"
                    data-testid="slider-annual-increase"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>5%</span>
                    <span>10%</span>
                    <span>15%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Projection Years */}
                <div className="space-y-2">
                  <Label htmlFor="years">Projection Years</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="years"
                      type="number"
                      value={projectionYears}
                      onChange={(e) => setProjectionYears(Math.min(50, Math.max(1, Number(e.target.value))))}
                      min={1}
                      max={50}
                      className="pl-9"
                      data-testid="input-projection-years"
                    />
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Estimates only. Adjust inputs to see results update in real time.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>First Year Cost</CardDescription>
                  <CardTitle className="text-3xl">
                    ${displayValue(firstYearCost).toLocaleString()}
                    {isMonthly && <span className="text-base text-muted-foreground">/mo</span>}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Cumulative Cost</CardDescription>
                  <CardTitle className="text-3xl">
                    ${totalCost.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{projectionYears}-Year Total</CardDescription>
                  <CardTitle className="text-3xl text-destructive">
                    ${totalCost.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Projection Chart</CardTitle>
                <CardDescription>
                  Visual representation of your maintenance fee growth over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={projections}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="year"
                      label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                      className="text-xs"
                    />
                    <YAxis
                      label={{ value: 'Annual Cost ($)', angle: -90, position: 'insideLeft' }}
                      className="text-xs"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.375rem',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Total Annual Cost"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Cumulative Cost"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Breakdown</CardTitle>
                <CardDescription>
                  Key milestones in your maintenance fee projection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Year</th>
                        <th className="text-right py-3 px-4 font-semibold">Annual Maintenance</th>
                        <th className="text-right py-3 px-4 font-semibold">Cumulative Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[year5, year10, year20, year30].filter(Boolean).map((data, index) => (
                        <tr key={index} className="border-b hover-elevate">
                          <td className="py-3 px-4">Year {data.year}</td>
                          <td className="text-right py-3 px-4">
                            ${displayValue(data.maintenance).toLocaleString()}
                            {isMonthly && <span className="text-xs text-muted-foreground">/mo</span>}
                          </td>
                          <td className="text-right py-3 px-4 font-semibold">
                            ${data.cumulative.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Ready to Exit Your Timeshare?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Use our Cost & Exit Calculator to get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" size="lg" asChild className="w-full" data-testid="button-cost-calculator-cta">
                  <a href="/cost-calculator">Calculate My Exit Options</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
