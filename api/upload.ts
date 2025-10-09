import type { VercelRequest, VercelResponse } from '@vercel/node';
import { formidable } from 'formidable';
import { promises as fs } from 'fs';
import { createResponse } from './utils/ResponseUtils.js';
import { parseAndvalidateCfdi } from './utils/FileService.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({});

  try {
    const [fields, files] = await form.parse(request);

    // 3. --- VALIDATION ---
    // Get the uploaded file from the files object
    // 'xmlFile' should match the 'name' attribute of your <input type="file">
    const uploadedFile = files.xmlFile?.[0];

    if (!uploadedFile) {
      throw createResponse(400, 'No file uploaded.');
    }
    
    // Check if the file is an XML file
    if (uploadedFile.mimetype !== 'text/xml' && uploadedFile.mimetype !== 'application/xml') {
      throw createResponse(400, 'Invalid file type. Please upload an XML file.');
    }

    // 4. --- PARSING ---
    // Read the content of the uploaded XML file
    const xmlFileContent = await fs.readFile(uploadedFile.filepath, 'utf8');
    
    const validationResponse = await parseAndvalidateCfdi(xmlFileContent);

    if (!validationResponse.isValid) {
      return response.status(400).json({ error: validationResponse.errors });
    }
    
    return response.status(200)
      .json({
        status: 'success',
        parsedContent: validationResponse.parsedContent,
        fileName: uploadedFile.originalFilename,
      });
  } catch (error) {
    return response.status(500)
      .json({ error: 'Processing failed' });
  }
};
