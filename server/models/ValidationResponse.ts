import type { Comprobante } from 'Resources/xmlTypes/www.sat.gob.mx/cfd/4.d.ts';

export interface ValidationResponse {
  isValid: boolean;
  errors: string[];
  parsedContent?: Comprobante;
}