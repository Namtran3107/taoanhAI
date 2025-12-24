
export type AspectRatio = '16:9' | '9:16';

export interface ReferenceImage {
  id: string;
  data: string; // base64
  mimeType: string;
}

export interface DesignConfig {
  prompt: string;
  aspectRatio: AspectRatio;
  showProductRight: boolean;
  referenceImages: ReferenceImage[];
}

export interface GenerationState {
  isGenerating: boolean;
  resultUrl: string | null;
  error: string | null;
}
