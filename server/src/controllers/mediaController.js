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

// ... (keep your existing uploadMedia function) ...

export const listMedia = async (req, res) => {
  try {
    const { data, error } = await supabase.storage
      .from('site-assets')
      .list(); // Lists all files in the bucket

    if (error) throw error;

    // Map the raw Supabase data into a format the frontend expects
    const formattedData = data
      // Filter out empty folder placeholders
      .filter(file => file.name !== '.emptyFolderPlaceholder')
      .map(file => {
        const publicUrlData = supabase.storage
          .from('site-assets')
          .getPublicUrl(file.name);
        
        // Determine type based on extension or mimetype if available
        let type = 'image';
        if (file.metadata?.mimetype?.startsWith('video/') || file.name.match(/\.(mp4|webm|ogg)$/i)) {
          type = 'video';
        }

        return {
          id: file.id || file.name,
          name: file.name,
          type: type,
          size: file.metadata?.size || 0,
          date: file.created_at,
          url: publicUrlData.data.publicUrl
        };
      })
      // Sort newest first
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('List media error:', error);
    res.status(500).json({ error: 'Failed to fetch media library' });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { fileName } = req.params;
    
    if (!fileName) {
      return res.status(400).json({ error: 'File name is required' });
    }

    const { data, error } = await supabase.storage
      .from('site-assets')
      .remove([fileName]);

    if (error) throw error;

    res.status(200).json({ message: 'File deleted successfully', data });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
};