import * as React from 'react';
import { createTestWrapper } from '@takamol/react-qiwa-core';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import { Layout } from '.';

describe('Layout', () => {
  it("should load it's contents with skeleton whe auth is loading", async () => {
    createTestWrapper({
      children: (
        <Layout>
          <div>Content</div>
        </Layout>
      ),
    });

    await waitForElementToBeRemoved(screen.getByRole('progressbar'));

    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });
});
