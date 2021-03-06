import React from 'react';
import { InMemoryCache } from '@apollo/client';
import { render, RenderOptions } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

interface CustomRenderOptions {
  apolloMocks?: MockedResponse[];
  cache?: InMemoryCache;
}

const ComponentProviders = ({ children, apolloMocks = [], cache }: any) => {
  return (
    <MockedProvider mocks={apolloMocks} addTypename={true} cache={cache}>
      {children}
    </MockedProvider>
  );
};

export const customRenderForComponent = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'> & CustomRenderOptions
) =>
  render(ui, {
    wrapper: (props: any) => <ComponentProviders {...props} {...options} />,
    ...options,
  });
