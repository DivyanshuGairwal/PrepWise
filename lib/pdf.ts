import { PDFParse } from 'pdf-parse';

/**
 * Parses a PDF buffer and extracts text.
 * Runs only on the server side.
 */
export async function parsePdf(buffer: Buffer): Promise<string> {
  try {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    return data.text || '';
  } catch (error: any) {
    console.error("PDF Parsing error:", error);
    throw new Error(`Failed to parse PDF file. Ensure it is a valid, unencrypted PDF. Error: ${error.message || error}`);
  }
}
