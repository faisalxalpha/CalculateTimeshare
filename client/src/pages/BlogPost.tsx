import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowLeft, FileText } from "lucide-react";
import { format } from "date-fns";
import { SEO } from "@/components/SEO";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string;
};

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  const { data: recentPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : "https://calculatetimeshare.com";
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt || post.metaDescription,
        "image": post.featuredImage,
        "datePublished": post.publishedAt,
        "dateModified": post.publishedAt,
        "author": {
          "@type": "Organization",
          "name": "CalculateTimeshare.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "CalculateTimeshare.com",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        }
      },
      {
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
            "name": "Blog",
            "item": `${baseUrl}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `${baseUrl}/blog/${post.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEO 
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        ogImage={post.featuredImage}
        ogUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        schema={articleSchema}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" data-testid="button-back-to-blog" asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <article>
          <div className="mb-6">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto rounded-xl mb-8 shadow-lg"
            />
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-primary">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>

        {/* Related Posts */}
        {recentPosts && recentPosts.length > 1 && (
          <div className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-sans font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="hover-elevate transition-all cursor-pointer h-full">
                      <CardHeader>
                        <Badge className="w-fit mb-2">{relatedPost.category}</Badge>
                        <CardTitle className="text-base line-clamp-2">{relatedPost.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Card className="mt-12 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Ready to Calculate Your Exit Strategy?</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Use our free calculators to understand your costs and explore exit options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild className="flex-1">
                <a href="/cost-calculator">Cost Calculator</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="flex-1 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                <a href="/maintenance-calculator">Maintenance Calculator</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
