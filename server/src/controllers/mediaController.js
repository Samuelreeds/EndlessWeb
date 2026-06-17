import { supabase } from '../config/supabase.js';
import sharp from 'sharp';
import crypto from 'crypto';

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // 1. Process image with Sharp
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // 2. Generate a unique filename
    const uniqueId = crypto.randomUUID();
    const fileName = `${uniqueId}.webp`;

    // 3. Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('SITE-ASSETS')
      .upload(fileName, processedImageBuffer, {
        contentType: 'image/webp',
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: 'Failed to upload image to storage' });
    }

    // 4. Retrieve the Public URL
    const { data: publicUrlData } = supabase.storage
      .from('SITE-ASSETS')
      .getPublicUrl(fileName);

    res.status(200).json({
      message: 'Image uploaded successfully',
      url: publicUrlData.publicUrl,
    });
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ error: 'Internal server error during media upload' });
  }
};