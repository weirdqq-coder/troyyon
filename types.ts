export interface ImageData {
  /** Raw base64 string, without the data URL prefix */
  base64: string;
  /** The MIME type of the image, e.g., 'image/jpeg' */
  mimeType: string;
  /** The full data URL (base64 prefixed) for displaying in an <img> tag */
  dataUrl: string;
}
