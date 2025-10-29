
import { type Request, Response } from 'express';
import { db } from '../db';

export async function getSettings(req: Request, res: Response) {
  const settings = await db.query.app_settings.findMany();
  res.json(settings);
}

export async function updateSettings(req: Request, res: Response) {
  const { key, value } = req.body;

  await db
    .insert(db.models.app_settings)
    .values({ key, value })
    .onConflict('key')
    .doUpdateSet({ value });

  res.json({ message: 'Settings updated successfully' });
}
