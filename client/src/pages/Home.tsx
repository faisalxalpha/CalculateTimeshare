import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, FileText, CheckCircle, Users, DollarSign, Award, ArrowRight, Clock, Shield } from "lucide-react";
import heroImage from "@assets/generated_images/Happy_family_beach_vacation_ffbc6032.png";
import { SEO } from "@/components/SEO";

export default function Home() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : "https://calculatetimeshare.com";
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "CalculateTimeshare.com",
        "url": baseUrl,
        "description": "Free timeshare calculators and exit strategy resources",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/blog?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does my timeshare really cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your timeshare's true cost includes purchase price, maintenance fees, special assessments, travel costs, and opportunity cost. Use our calculator to see your total 30-year projection."
            }
          },
          {
            "@type": "Question",
            "name": "Can I get out of my timeshare?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, there are several proven exit strategies including resale, donation, timeshare exit companies, and direct resort negotiation. We provide free analysis and recommendations."
            }
          },
          {
            "@type": "Question",
            "name": "Are maintenance fees going to keep increasing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Historically, timeshare maintenance fees increase 3-8% annually. Our calculator shows projected costs over 30 years based on different increase rates."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col">
      <SEO 
        title="Free Timeshare Cost Calculator & Exit Strategy Guide"
        description="Calculate your timeshare's true lifetime cost and explore proven exit strategies. Free analysis, personalized exit quotes, and maintenance fee projections. Over 5,000 owners helped."
        ogImage={heroImage}
        ogUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        schema={schema}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-tight">
                Calculate Your Timeshare's
                <span className="text-primary"> True Cost</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Discover the real lifetime cost of your timeshare and explore proven exit strategies. 
                Get a free analysis and personalized exit quote in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="default" className="w-full sm:w-auto" data-testid="button-hero-cost-calculator" asChild>
                  <Link href="/cost-calculator">
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate My Costs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-hero-exit-options" asChild>
                  <Link href="/exit-options">
                    Explore Exit Options
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-chart-2" />
                  <span className="text-sm text-muted-foreground">100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-chart-2" />
                  <span className="text-sm text-muted-foreground">No Obligations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-chart-2" />
                  <span className="text-sm text-muted-foreground">5,000+ Helped</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative">
              <img
                src={heroImage}
                alt="Happy family enjoying vacation freedom"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              Free Timeshare Calculators
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our powerful tools to understand your timeshare's true cost and plan your exit strategy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cost & Exit Calculator Card */}
            <Link href="/cost-calculator">
              <Card className="hover-elevate transition-all cursor-pointer" data-testid="card-cost-calculator">
                <CardHeader className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Cost & Exit Calculator</CardTitle>
                  <CardDescription className="text-base">
                    Calculate your lifetime timeshare costs including maintenance fees, and get personalized exit options based on your situation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-chart-2" />
                      Total ownership cost projection
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-chart-2" />
                      Personalized exit recommendations
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-chart-2" />
                      Free exit quote request
                    </li>
                  </ul>
                  <div className="text-primary font-semibold flex items-center justify-center gap-2" data-testid="button-launch-cost-calculator">
                    Launch Calculator
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Maintenance Fee Calculator Card */}
            <Link href="/maintenance-calculator">
              <Card className="hover-elevate transition-all cursor-pointer" data-testid="card-maintenance-calculator">
                <CardHeader className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-chart-2" />
                  </div>
                  <CardTitle className="text-2xl">Maintenance Fee Calculator</CardTitle>
                  <CardDescription className="text-base">
                    Project how your maintenance fees will grow over time with adjustable increase rates and see the 30-year impact.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-chart-2" />
                      30-year cost projection
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-chart-2" />
                      Interactive growth rate slider
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-chart-2" />
                      Visual chart & detailed table
                    </li>
                  </ul>
                  <div className="text-primary font-semibold flex items-center justify-center gap-2" data-testid="button-launch-maintenance-calculator">
                    Launch Calculator
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">5,000+</div>
              <div className="text-sm text-muted-foreground mt-1">Owners Helped</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">15+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">$50K+</div>
              <div className="text-sm text-muted-foreground mt-1">Average Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert advice and real stories from timeshare owners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                title: "How to Calculate the True Cost of Your Timeshare",
                excerpt: "Learn the hidden costs and long-term financial impact of timeshare ownership.",
                category: "Guides"
              },
              {
                title: "What Timeshare Exit Companies Won't Tell You",
                excerpt: "Discover the truth about exit companies and what to watch out for.",
                category: "Exit Tips"
              },
              {
                title: "How Maintenance Fees Grow Over 30 Years",
                excerpt: "See real projections and understand the compounding impact of fee increases.",
                category: "Guides"
              }
            ].map((post, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-blog-preview-${index}`}>
                <CardHeader>
                  <div className="text-xs font-semibold text-primary mb-2">{post.category}</div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/blog">
                    <Button variant="ghost" className="w-full" data-testid={`button-read-blog-${index}`}>
                      Read More <FileText className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg" data-testid="button-view-all-articles">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "How do I calculate my timeshare maintenance fees?",
                answer: "Use our free Maintenance Fee Calculator to project your fees over 30 years. Simply enter your current annual maintenance fee, mortgage payment (if applicable), and expected annual increase rate. The calculator will show you yearly costs and cumulative totals."
              },
              {
                question: "What are my options for exiting a timeshare?",
                answer: "Common exit options include selling on the resale market, using a timeshare exit company, legal termination services, or donating to a charity. Each option has pros and cons depending on your specific situation. Use our Cost & Exit Calculator to get personalized recommendations."
              },
              {
                question: "Are timeshare maintenance fees tax deductible?",
                answer: "Generally, timeshare maintenance fees are not tax deductible unless you rent out your timeshare and report the income. Consult with a tax professional for your specific situation."
              },
              {
                question: "How much do timeshare exit companies charge?",
                answer: "Costs vary widely, typically ranging from $3,000 to $10,000 or more. Be wary of companies requiring large upfront fees before delivering results. Always research companies thoroughly and read reviews before committing."
              }
            ].map((faq, index) => (
              <Card key={index} data-testid={`card-faq-${index}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
            Ready to Calculate Your Exit Strategy?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Get a free analysis of your timeshare costs and personalized exit recommendations in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cost-calculator">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" data-testid="button-cta-get-started">
                Get Started Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" data-testid="button-cta-contact">
                Contact an Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
