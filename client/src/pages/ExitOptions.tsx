import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, LogOut, DollarSign, Gift, Scale, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function ExitOptions() {
  const options = [
    {
      icon: LogOut,
      title: "Professional Exit Service",
      description: "Work with a reputable timeshare exit company to legally terminate your contract",
      pros: [
        "Handled by professionals",
        "Legal protection",
        "Can exit difficult contracts",
        "No direct resort negotiation"
      ],
      cons: [
        "Costs $3,000-$10,000",
        "Timeline: 6-18 months",
        "Must research company carefully"
      ],
      color: "text-primary"
    },
    {
      icon: DollarSign,
      title: "Resale Market",
      description: "List your timeshare on the resale market and find a buyer",
      pros: [
        "Potential to recoup some money",
        "Direct control over process",
        "Lower upfront costs",
        "Many listing platforms available"
      ],
      cons: [
        "Prices typically very low",
        "Can take 6-24 months",
        "Competition from resort",
        "May need to pay commission"
      ],
      color: "text-chart-2"
    },
    {
      icon: Gift,
      title: "Donation Program",
      description: "Donate your timeshare to a qualified charity if you meet eligibility requirements",
      pros: [
        "Potential tax deduction",
        "Feel-good contribution",
        "Faster than resale",
        "No negotiation required"
      ],
      cons: [
        "Limited accepting charities",
        "Must meet specific criteria",
        "Deduction may be limited",
        "Processing fees may apply"
      ],
      color: "text-chart-3"
    },
    {
      icon: Scale,
      title: "Legal Services",
      description: "Hire an attorney specializing in timeshare law to explore contract termination",
      pros: [
        "Expert legal representation",
        "Can identify contract loopholes",
        "Handles complex situations",
        "May find violations by resort"
      ],
      cons: [
        "Can be expensive",
        "No guaranteed outcome",
        "Takes significant time",
        "May damage resort relationship"
      ],
      color: "text-chart-4"
    }
  ];

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
        "name": "Exit Options",
        "item": `${baseUrl}/exit-options`
      }
    ]
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEO 
        title="Timeshare Exit Options - Compare Exit Strategies"
        description="Comprehensive comparison of timeshare exit strategies including resale, donation, exit companies, and direct resort negotiation. Find the best option for your situation."
        ogUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        schema={breadcrumbSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <LogOut className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
            Timeshare Exit Options
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore proven strategies for exiting your timeshare contract legally and safely
          </p>
        </div>

        {/* Exit Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-exit-option-${index}`}>
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg bg-${option.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{option.title}</CardTitle>
                  <CardDescription className="text-base">{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-chart-2" />
                      Pros
                    </h4>
                    <ul className="space-y-2">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-chart-2 mt-0.5">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      Cons
                    </h4>
                    <ul className="space-y-2">
                      {option.cons.map((con, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-destructive mt-0.5">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Quick Comparison</CardTitle>
            <CardDescription>
              Compare key factors across all exit options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Factor</th>
                    <th className="text-center py-3 px-4 font-semibold">Exit Service</th>
                    <th className="text-center py-3 px-4 font-semibold">Resale</th>
                    <th className="text-center py-3 px-4 font-semibold">Donation</th>
                    <th className="text-center py-3 px-4 font-semibold">Legal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover-elevate">
                    <td className="py-3 px-4">Typical Cost</td>
                    <td className="text-center py-3 px-4">$3K-$10K</td>
                    <td className="text-center py-3 px-4">$500-$2K</td>
                    <td className="text-center py-3 px-4">$500-$1.5K</td>
                    <td className="text-center py-3 px-4">$5K-$15K</td>
                  </tr>
                  <tr className="border-b hover-elevate">
                    <td className="py-3 px-4">Timeline</td>
                    <td className="text-center py-3 px-4">6-18 months</td>
                    <td className="text-center py-3 px-4">6-24 months</td>
                    <td className="text-center py-3 px-4">1-3 months</td>
                    <td className="text-center py-3 px-4">12-36 months</td>
                  </tr>
                  <tr className="border-b hover-elevate">
                    <td className="py-3 px-4">Success Rate</td>
                    <td className="text-center py-3 px-4">High</td>
                    <td className="text-center py-3 px-4">Medium</td>
                    <td className="text-center py-3 px-4">Medium</td>
                    <td className="text-center py-3 px-4">Variable</td>
                  </tr>
                  <tr className="hover-elevate">
                    <td className="py-3 px-4">Complexity</td>
                    <td className="text-center py-3 px-4">Low</td>
                    <td className="text-center py-3 px-4">Medium</td>
                    <td className="text-center py-3 px-4">Low</td>
                    <td className="text-center py-3 px-4">High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">Get Personalized Recommendations</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Use our free calculator to see which exit option is best for your specific situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="flex-1 w-full" data-testid="button-calculate-exit" asChild>
                <Link href="/cost-calculator">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Calculate My Best Exit Option
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 w-full bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                data-testid="button-contact-expert"
                asChild
              >
                <Link href="/contact">
                  Speak with an Expert
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
