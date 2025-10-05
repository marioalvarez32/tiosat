import fs from 'fs';
import path from 'path';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import type { ValidationResponse } from '../models/ValidationResponse';
import type { Comprobante } from 'Resources/xmlTypes/www.sat.gob.mx/cfd/4';

export async function parseAndvalidateCfdi(xmlFileContent: string): Promise<ValidationResponse> {
  try {
    const errors: string[] = [];

    // Basic XML validation first
    const validationResult = XMLValidator.validate(xmlFileContent);

    if (validationResult !== true) {
      console.error('XML is not well-formed:', validationResult);
      return { isValid: false, errors: [validationResult.err.msg] };
    }

    // Parse XML to validate CFDI structure
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      parseAttributeValue: true,
      removeNSPrefix: true,
    });

    const xmlDoc = await parser.parse(xmlFileContent);

    // Check if root element is Comprobante
    if (!xmlDoc['Comprobante']) {
      errors.push('Missing root element Comprobante');
    }

    const comprobante = xmlDoc['Comprobante'];
    if (comprobante) {
      // Check required attributes
      const requiredAttrs = ['Version', 'Fecha', 'Sello', 'FormaPago', 'NoCertificado'];
      requiredAttrs.forEach((attr) => {
        if (!comprobante[`${attr}`]) {
          errors.push(`Missing required attribute: ${attr}`);
        }
      });

      // Check required elements
      if (!comprobante['Emisor']) {
        errors.push('Missing required element: Emisor');
      }
      if (!comprobante['Receptor']) {
        errors.push('Missing required element: Receptor');
      }
      if (!comprobante['Conceptos']) {
        errors.push('Missing required element: Conceptos');
      }
    }

    if (errors.length === 0) {
      return { isValid: true, errors: [], parsedContent: xmlDoc as Comprobante };
    } else {
      return { isValid: false, errors };
    }
  } catch (error) {
    return { isValid: false, errors: [error as string] };
  }
}