import { supabase } from '../config/supabase.js';
import sharp from 'sharp';
import crypto from 'crypto';

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const uniqueId = crypto.randomUUID();
    let fileBuffer;
    let fileName;
    let contentType = req.file.mimetype;

    // 1. Check if the file is a video
    if (req.file.mimetype.startsWith('video/')) {
      // Bypass Sharp, keep original buffer and detect extension
      fileBuffer = req.file.buffer;
      const ext = req.file.originalname ? req.file.originalname.split('.').pop() : 'mp4';
      fileName = `${uniqueId}.${ext}`;
    } else {
      // 2. Process images with Sharp
      fileBuffer = await sharp(req.file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 }) 
        .toBuffer();
        
      fileName = `${uniqueId}.webp`;
      contentType = 'image/webp'; // Always webp for images
    }

    // 3. Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('site-assets')
      .upload(fileName, fileBuffer, {
        contentType: contentType,
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
    res.status(500).json({ error: 'Failed to process and upload media' });
  }
};