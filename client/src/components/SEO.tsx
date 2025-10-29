import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
  schema?: Record<string, any>;
}

export function SEO({ title, description, ogImage, ogUrl, schema }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | CalculateTimeshare.com`;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? "property" : "name";
      let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Standard meta tags
    updateMetaTag("description", description);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", "website", true);
    
    if (ogUrl) {
      updateMetaTag("og:url", ogUrl, true);
    }
    
    if (ogImage) {
      updateMetaTag("og:image", ogImage, true);
    }

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    if (ogImage) {
      updateMetaTag("twitter:image", ogImage);
    }

    // JSON-LD Schema
    if (schema) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup is optional since meta tags will be updated by the next page
    };
  }, [title, description, ogImage, ogUrl, schema]);

  return null;
}
