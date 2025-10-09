import type { Comprobante } from '../resources/xmlTypes/www.sat.gob.mx/cfd/4.js';

export interface ValidationResponse {
  isValid: boolean;
  errors: string[];
  parsedContent?: any;
}