import { formidable } from 'formidable';
import { promises as fs } from 'fs';
import { XMLParser } from 'fast-xml-parser';

export default defineEventHandler(async (event) => {
  // 1. Create a new Formidable form instance
  const form = formidable({});

  try {
    // 2. Parse the incoming request containing the form data
    const [fields, files] = await form.parse(event.node.req);

    // 3. --- VALIDATION ---
    // Get the uploaded file from the files object
    // 'xmlFile' should match the 'name' attribute of your <input type="file">
    const uploadedFile = files.xmlFile?.[0];

    // Check if a file was uploaded
    if (!uploadedFile) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded.',
      });
    }

    // Check if the file is an XML file
    if (uploadedFile.mimetype !== 'text/xml' && uploadedFile.mimetype !== 'application/xml') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file type. Please upload an XML file.',
      });
    }

    // 4. --- PARSING ---
    // Read the content of the uploaded XML file
    const xmlFileContent = await fs.readFile(uploadedFile.filepath, 'utf8');

    // Create an XML parser instance
    const parser = new XMLParser();
    const parsedData = parser.parse(xmlFileContent);

    // 5. Return the parsed data
    return {
      status: 'success',
      data: parsedData,
      fileName: uploadedFile.originalFilename,
    };
  }
  catch (error) {
    // Handle any errors that occur during parsing or validation
    console.error('Upload error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while processing the file.',
    });
  }
});
