import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  AdminContext,
  defaultI18nProvider,
  ResourceDefinitionContextProvider,
} from 'react-admin';
import { describe, it, expect, beforeEach } from 'vitest';
import { NutritionAppMenu } from './NutritionAppMenu';
import { setFeatureEnabled, resetFeatures } from '../../config/features';

const mockDefinitions = {
  user: { name: 'user', hasList: true },
  measurement: { name: 'measurement', hasList: true },
  nutritionist: { name: 'nutritionist', hasList: true },
  referenced_somatotype: { name: 'referenced_somatotype', hasList: true },
};

const renderMenu = () => {
  return render(
    <AdminContext i18nProvider={defaultI18nProvider}>
      <ResourceDefinitionContextProvider definitions={mockDefinitions}>
        <NutritionAppMenu />
      </ResourceDefinitionContextProvider>
    </AdminContext>
  );
};

describe('NutritionAppMenu with Feature Preferences', () => {
  beforeEach(() => {
    resetFeatures();
  });

  it('renders all resource items when all features are enabled', () => {
    renderMenu();

    expect(screen.getByText('Configuración de Módulos')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Measurements')).toBeInTheDocument();
    expect(screen.getByText('Nutritionists')).toBeInTheDocument();
    expect(screen.getByText('Referenced somatotypes')).toBeInTheDocument();
  });

  it('hides nutritionist when nutritionist feature is disabled', () => {
    setFeatureEnabled('nutritionist', false);
    renderMenu();

    expect(screen.queryByText('Nutritionists')).not.toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Measurements')).toBeInTheDocument();
  });

  it('opens the configuration modal when clicking Configuración de Módulos', () => {
    renderMenu();

    const configBtn = screen.getByText('Configuración de Módulos');
    fireEvent.click(configBtn);

    expect(
      screen.getByText('Configuración de Módulos & Funcionalidades')
    ).toBeInTheDocument();
  });
});
