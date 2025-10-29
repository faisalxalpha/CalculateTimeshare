
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertLeadSchema } from "@shared/schema";
import { getUncachableResendClient } from "./resend-client";
import { adminRouter } from "./routers/admin_router";

export async function registerRoutes(app: Express): Promise<Server> {
  // ============ BLOG ROUTES ============
  
  // Get all blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Create new blog post
  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  // Update blog post
  app.put("/api/blog/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  // Delete blog post
  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogPost(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // ============ LEAD ROUTES ============
  
  // Create new lead (from calculators or contact form)
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);

      // Send email notification via Resend
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        await client.emails.send({
          from: fromEmail,
          to: fromEmail, // Send to the same email (will be configured in Resend)
          subject: `New Lead: ${validatedData.source}`,
          html: `
            <h2>New Lead Submission</h2>
            <p><strong>Source:</strong> ${validatedData.source}</p>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone || 'N/A'}</p>
            ${validatedData.resortName ? `<p><strong>Resort:</strong> ${validatedData.resortName}</p>` : ''}
            ${validatedData.location ? `<p><strong>Location:</strong> ${validatedData.location}</p>` : ''}
            ${validatedData.annualMaintenanceFee ? `<p><strong>Annual Maintenance Fee:</strong> $${validatedData.annualMaintenanceFee}</p>` : ''}
            ${validatedData.purchasePrice ? `<p><strong>Purchase Price:</strong> $${validatedData.purchasePrice}</p>` : ''}
            ${validatedData.yearsOwned ? `<p><strong>Years Owned:</strong> ${validatedData.yearsOwned}</p>` : ''}
            ${validatedData.message ? `<p><strong>Message:</strong> ${validatedData.message}</p>` : ''}
            ${validatedData.calculatorResults ? `<p><strong>Calculator Results:</strong> ${validatedData.calculatorResults}</p>` : ''}
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Continue even if email fails
      }

      // Send webhook notification
      try {
        const webhookSetting = await storage.getSetting("WEBHOOK_URL");
        if (webhookSetting && webhookSetting.value) {
          await fetch(webhookSetting.value, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...validatedData,
              id: lead.id,
              timestamp: new Date().toISOString(),
            }),
          });
        }
      } catch (webhookError) {
        console.error("Error sending webhook:", webhookError);
        // Continue even if webhook fails
      }

      res.status(201).json(lead);
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(400).json({ error: "Invalid lead data" });
    }
  });

  // Get all leads
  app.get("/api/leads", async (req, res) => {
    try {
      const allLeads = await storage.getLeads();
      res.json(allLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.use('/api/admin', adminRouter);

  // ============ SEO ROUTES ============
  
  // Sitemap.xml
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      const baseUrl = `https://${req.get('host')}`;
      
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/cost-calculator</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/maintenance-calculator</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/exit-options</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${posts.map(post => `<url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date((post.updatedAt || post.publishedAt) as Date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n  ')}
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const baseUrl = `https://${req.get('host')}`;
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml`;

    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);
  return httpServer;
}
