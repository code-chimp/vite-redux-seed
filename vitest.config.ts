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
      reporters: ['junit'],
      outputFile: {
        junit: './coverage/junit.xml',
      },
      coverage: {
        provider: 'istanbul',
        reporter: ['json', 'lcov', 'text', 'cobertura'],
        all: true,
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/@enums/**',
          'src/@interfaces/**',
          'src/@mocks/**',
          'src/@types/**',
          'src/**/index.{ts,tsx}',
          'src/main.tsx',
          'src/routes.tsx',
        ],
        branches: 80,
        functions: 90,
        statements: 90,
      },
    },
  }),
);
