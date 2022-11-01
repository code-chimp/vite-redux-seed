import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts',
      coverage: {
        provider: 'istanbul',
        all: true,
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/@enums/**',
          'src/@interfaces/**',
          'src/@mocks/**',
          'src/@types/**',
          'src/services/**',
          'src/**/index.{ts,tsx}',
          'src/main.tsx',
          'src/routes.tsx',
        ],
        branches: 85,
        functions: 90,
        statements: 90,
      },
    },
  }),
);
