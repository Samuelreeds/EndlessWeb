import { supabase } from '../config/supabase.js';
import sharp from 'sharp';
import crypto from 'crypto';

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // 1. Process image with Sharp
    // Sharp automatically detects format from buffer and converts to WebP
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 }) 
      .toBuffer();

    const uniqueId = crypto.randomUUID();
    const fileName = `${uniqueId}.webp`;

    // 2. Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('site-assets')
      .upload(fileName, processedImageBuffer, {
        contentType: 'image/webp', // Always webp
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('site-assets')
      .getPublicUrl(fileName);

    res.status(200).json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error('Conversion/Upload error:', error);
    res.status(500).json({ error: 'Failed to process and upload image' });
  }
};