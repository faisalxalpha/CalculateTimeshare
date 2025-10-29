
import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const socialMediaSchema = z.object({
  facebook: z.string().url().or(z.literal("")).optional(),
  twitter: z.string().url().or(z.literal("")).optional(),
  instagram: z.string().url().or(z.literal("")).optional(),
  linkedin: z.string().url().or(z.literal("")).optional(),
});

router.get("/api/admin/social-media-settings", async (req, res) => {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        in: [
          "SOCIAL_MEDIA_FACEBOOK",
          "SOCIAL_MEDIA_TWITTER",
          "SOCIAL_MEDIA_INSTAGRAM",
          "SOCIAL_MEDIA_LINKEDIN",
        ],
      },
    },
  });
  res.json(settings);
});

router.post("/api/admin/social-media-settings", async (req, res) => {
  const result = socialMediaSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  const { facebook, twitter, instagram, linkedin } = result.data;

  await prisma.$transaction([
    prisma.setting.upsert({
      where: { key: "SOCIAL_MEDIA_FACEBOOK" },
      update: { value: facebook || "" },
      create: { key: "SOCIAL_MEDIA_FACEBOOK", value: facebook || "" },
    }),
    prisma.setting.upsert({
      where: { key: "SOCIAL_MEDIA_TWITTER" },
      update: { value: twitter || "" },
      create: { key: "SOCIAL_MEDIA_TWITTER", value: twitter || "" },
    }),
    prisma.setting.upsert({
      where: { key: "SOCIAL_MEDIA_INSTAGRAM" },
      update: { value: instagram || "" },
      create: { key: "SOCIAL_MEDIA_INSTAGRAM", value: instagram || "" },
    }),
    prisma.setting.upsert({
      where: { key: "SOCIAL_MEDIA_LINKEDIN" },
      update: { value: linkedin || "" },
      create: { key: "SOCIAL_MEDIA_LINKEDIN", value: linkedin || "" },
    }),
  ]);

  res.json({ message: "Social media settings updated successfully" });
});

export default router;
