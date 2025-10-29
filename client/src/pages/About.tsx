import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Award, Users, Shield, Target, Heart } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

export default function About() {
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
        "name": "About",
        "item": `${baseUrl}/about`
      }
    ]
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEO 
        title="About Us - Empowering Timeshare Owners Since 2009"
        description="Learn about CalculateTimeshare's mission to provide transparent, free tools and honest information to help timeshare owners understand their costs and explore exit strategies."
        ogUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        schema={breadcrumbSchema}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Info className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
            About CalculateTimeshare
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Helping timeshare owners make informed decisions since 2009
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              We believe every timeshare owner deserves transparency, honest information, and practical tools to understand their ownership costs. Our mission is to empower owners with free calculators and educational resources to make confident decisions about their timeshare future.
            </p>
            <p className="text-muted-foreground">
              Whether you're exploring exit options or simply want to understand your long-term costs, CalculateTimeshare provides the insights you need without pressure, hidden fees, or misleading promises.
            </p>
          </CardContent>
        </Card>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle>Transparency</CardTitle>
                <CardDescription>
                  No hidden fees, no misleading information. We provide honest, accurate calculations and straightforward guidance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-3">
                  <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-chart-2" />
                  </div>
                </div>
                <CardTitle>Owner-First</CardTitle>
                <CardDescription>
                  Your interests come first. We're here to help you, not pressure you into services or solutions that don't fit.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-3">
                  <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-chart-3" />
                  </div>
                </div>
                <CardTitle>Expertise</CardTitle>
                <CardDescription>
                  Over 15 years of timeshare industry knowledge, helping thousands of owners navigate their options successfully.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* What We Offer */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">What We Offer</CardTitle>
            <CardDescription>
              Free tools and resources to help you make informed decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Free Cost Calculator</h3>
                  <p className="text-muted-foreground">
                    Calculate your lifetime timeshare costs including maintenance fees, purchase price, and projected increases. Get personalized exit recommendations based on your situation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Maintenance Fee Projections</h3>
                  <p className="text-muted-foreground">
                    Interactive calculator showing exactly how your maintenance fees will grow over 30 years with adjustable increase rates and detailed breakdowns.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Educational Resources</h3>
                  <p className="text-muted-foreground">
                    Comprehensive blog articles, guides, and real owner stories to help you understand your options and make informed decisions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Exit Strategy Guidance</h3>
                  <p className="text-muted-foreground">
                    Unbiased information about all exit options including resale, exit companies, donation programs, and legal services.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">5,000+</div>
            <div className="text-sm text-muted-foreground">Owners Helped</div>
          </div>
          <div className="text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">15+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">100%</div>
            <div className="text-sm text-muted-foreground">Free Tools</div>
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ready to Get Started?</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-center">
              Use our free calculators to understand your timeshare costs and explore exit options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" data-testid="button-about-cost-calculator" asChild>
                <Link href="/cost-calculator">
                  Calculate My Costs
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                data-testid="button-about-contact"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
