import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AtelierTour, TOUR_STORAGE_KEY } from './AtelierTour';

vi.mock('react-admin', () => ({
  useTranslate: () => (key, options) => {
    if (options && options._) return options._;
    return key;
  },
}));

describe('AtelierTour Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders step 1 with title and navigation when open', () => {
    render(<AtelierTour open={true} onClose={vi.fn()} />);
    expect(screen.getByText(/Bienvenido al Atelier de Antropometría/i)).toBeInTheDocument();
    expect(screen.getByText(/Paso 1 de 6/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeInTheDocument();
  });

  it('advances through steps on clicking Siguiente and finishes', () => {
    const handleClose = vi.fn();
    render(<AtelierTour open={true} onClose={handleClose} />);

    // Advance to step 2
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 2 de 6/i)).toBeInTheDocument();
    expect(screen.getByText(/Expedientes de Pacientes & Atletas/i)).toBeInTheDocument();

    // Advance to step 3
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 3 de 6/i)).toBeInTheDocument();
    expect(screen.getByText(/Protocolos de Medición ISAK/i)).toBeInTheDocument();

    // Advance to step 4
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 4 de 6/i)).toBeInTheDocument();

    // Advance to step 5
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 5 de 6/i)).toBeInTheDocument();

    // Advance to step 6 (Final step)
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 6 de 6/i)).toBeInTheDocument();
    expect(screen.getByText(/Perfil Profesional & Seguridad/i)).toBeInTheDocument();

    // Finish button
    const finishBtn = screen.getByRole('button', { name: /Comenzar a Trabajar/i });
    expect(finishBtn).toBeInTheDocument();
    fireEvent.click(finishBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it('can navigate backwards with Anterior button', () => {
    render(<AtelierTour open={true} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 2 de 6/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Anterior/i }));
    expect(screen.getByText(/Paso 1 de 6/i)).toBeInTheDocument();
  });

  it('saves completion to localStorage when dontShowAgain is checked', () => {
    const handleClose = vi.fn();
    render(<AtelierTour open={true} onClose={handleClose} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const closeBtn = screen.getByLabelText(/Saltar Tutorial/i);
    fireEvent.click(closeBtn);
    expect(localStorage.getItem(TOUR_STORAGE_KEY)).toBe('true');
  });
});
