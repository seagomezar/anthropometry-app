import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserImportModal, parseCSV } from './UserImportModal';

vi.mock('react-admin', () => ({
  useTranslate: () => (key, options) => (options && options._ ? options._ : key),
  usePermissions: () => ({ permissions: { role: 'nutritionist', nutritionistId: 2 } }),
  useNotify: () => vi.fn(),
  useRefresh: () => vi.fn(),
}));

describe('UserImportModal & CSV Parsing', () => {
  it('parses valid CSV text into structured patient objects', () => {
    const csv = `firstname,lastname,email,phone,gender,birthday,address
Mateo,Valencia,mateo.valencia@ejemplo.com,3001112233,M,1999-05-12,Envigado`;

    const records = parseCSV(csv, 2);
    expect(records.length).toBe(1);
    expect(records[0].firstname).toBe('Mateo');
    expect(records[0].lastname).toBe('Valencia');
    expect(records[0].email).toBe('mateo.valencia@ejemplo.com');
    expect(records[0].gender).toBe(true);
    expect(records[0].nutritionist_id).toBe(2);
    expect(records[0].isValid).toBe(true);
  });

  it('marks records without valid email or name as invalid', () => {
    const invalidCsv = `firstname,lastname,email,phone,gender,birthday,address
,,noemail,123,F,2000-01-01,Direccion`;

    const records = parseCSV(invalidCsv, 2);
    expect(records.length).toBe(1);
    expect(records[0].isValid).toBe(false);
  });

  it('renders modal with template download and upload dropzone', () => {
    render(<UserImportModal open={true} onClose={vi.fn()} />);
    expect(screen.getByText(/Carga Masiva de Pacientes/i)).toBeInTheDocument();
    expect(screen.getByText(/Descargar Plantilla CSV/i)).toBeInTheDocument();
  });
});
