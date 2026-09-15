import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NutritionistProfileModal } from './NutritionistProfileModal';
import authProvider from '../../Providers/authProvider';

vi.mock('react-admin', () => ({
  useTranslate: () => (key, options) => (options && options._ ? options._ : key),
  usePermissions: () => ({ permissions: { role: 'nutritionist', nutritionistId: 2 } }),
  useGetIdentity: () => ({ data: { id: 2, fullName: 'Dra. Carolina Gomez' } }),
  useNotify: () => vi.fn(),
}));

describe('NutritionistProfileModal Component', () => {
  beforeEach(() => {
    vi.spyOn(authProvider, 'getNutritionistProfile').mockResolvedValue({
      id: 2,
      firstname: 'Carolina',
      lastname: 'Gomez',
      email: 'carolina.gomez@anthropometry.com',
      phone: '+573104567890',
      address: 'Medellín, El Poblado',
      users_aggregate: { aggregate: { count: 1 } },
    });
  });

  it('renders profile title, specialist ID, and contact fields', async () => {
    render(<NutritionistProfileModal open={true} onClose={vi.fn()} />);

    expect(screen.getByText(/Mi Perfil Profesional/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByDisplayValue('Carolina')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Gomez')).toBeInTheDocument();
      expect(screen.getByDisplayValue('carolina.gomez@anthropometry.com')).toBeInTheDocument();
      expect(screen.getByText('#2')).toBeInTheDocument();
    });
  });

  it('validates password mismatch before submission', async () => {
    render(<NutritionistProfileModal open={true} onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Carolina')).toBeInTheDocument();
    });

    const newPwdInput = screen.getByLabelText('Nueva Contraseña');
    const confirmPwdInput = screen.getByLabelText('Confirmar Nueva Contraseña');

    fireEvent.change(newPwdInput, { target: { value: 'NewPassword2026!' } });
    fireEvent.change(confirmPwdInput, { target: { value: 'MismatchPassword!' } });

    const saveBtn = screen.getByRole('button', { name: /Guardar Cambios/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
  });
});
