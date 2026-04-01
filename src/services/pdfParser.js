import * as pdfjsLib from 'pdfjs-dist';

// Set worker - try bundled first, fallback to CDN
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
} catch (e) {
  // Fallback: use CDN worker matching the installed version
  const version = pdfjsLib.version || '4.0.379';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;
}

/**
 * Extract text from a PDF file
 * @param {File} file - The PDF File object
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
    }).promise;

    const textParts = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (pageText) {
        textParts.push(`--- Page ${i} ---\n${pageText}`);
      }
    }

    return textParts.join('\n\n');
  } catch (err) {
    console.error('PDF extraction error:', err);
    throw new Error('PDF_EXTRACT_FAILED: ' + err.message);
  }
}

/**
 * Extract text from a plain text file or PDF
 * @param {File} file - The File object
 * @returns {Promise<string>} - The text content
 */
export async function extractTextFromFile(file) {
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    return extractTextFromPDF(file);
  }

  // For text, images etc - read as text
  return file.text();
}
