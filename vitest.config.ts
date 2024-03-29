import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest.setup.ts'],
      reporters: ['junit'],
      outputFile: {
        junit: './coverage/junit.xml',
      },
      coverage: {
        provider: 'istanbul',
        reporter: ['json', 'text', 'cobertura', 'html'],
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
          'src/router.tsx',
        ],
        branches: 85,
        functions: 90,
        statements: 90,
      },
    },
  }),
);
