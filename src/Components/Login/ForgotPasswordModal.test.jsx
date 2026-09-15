import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import authProvider from '../../Providers/authProvider';

vi.mock('react-admin', () => ({
  useTranslate: () => (key, options) => (options && options._ ? options._ : key),
}));

describe('ForgotPasswordModal Component', () => {
  it('renders assistance modal when open', () => {
    render(<ForgotPasswordModal open={true} onClose={vi.fn()} />);
    expect(screen.getByText(/Asistencia para Acceso/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/especialista@anthropometry.com/i)).toBeInTheDocument();
  });

  it('submits email and displays registration confirmation', async () => {
    vi.spyOn(authProvider, 'requestPasswordAssistance').mockResolvedValue({
      recognized: true,
      email: 'carolina.gomez@anthropometry.com',
    });

    render(<ForgotPasswordModal open={true} onClose={vi.fn()} />);

    const emailInput = screen.getByPlaceholderText(/especialista@anthropometry.com/i);
    fireEvent.change(emailInput, { target: { value: 'carolina.gomez@anthropometry.com' } });

    const submitBtn = screen.getByRole('button', { name: /Solicitar Asistencia/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Protocolo de Restablecimiento Registrado/i)).toBeInTheDocument();
      expect(screen.getByText(/Canal de Soporte Directo/i)).toBeInTheDocument();
    });
  });
});
