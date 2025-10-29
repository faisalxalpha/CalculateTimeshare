
import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string(),
});

router.get("/api/admin/seo-settings", async (req, res) => {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        in: ["SEO_TITLE", "SEO_DESCRIPTION", "SEO_KEYWORDS"],
      },
    },
  });
  res.json(settings);
});

router.post("/api/admin/seo-settings", async (req, res) => {
  const result = seoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  const { title, description, keywords } = result.data;

  await prisma.$transaction([
    prisma.setting.upsert({
      where: { key: "SEO_TITLE" },
      update: { value: title },
      create: { key: "SEO_TITLE", value: title },
    }),
    prisma.setting.upsert({
      where: { key: "SEO_DESCRIPTION" },
      update: { value: description },
      create: { key: "SEO_DESCRIPTION", value: description },
    }),
    prisma.setting.upsert({
      where: { key: "SEO_KEYWORDS" },
      update: { value: keywords },
      create: { key: "SEO_KEYWORDS", value: keywords },
    }),
  ]);

  res.json({ message: "SEO settings updated successfully" });
});

export default router;
