import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

async function loadTypeScriptEslint() {
  try {
    const [parserModule, pluginModule] = await Promise.all([
      import('@typescript-eslint/parser'),
      import('@typescript-eslint/eslint-plugin'),
    ])

    return {
      parser: parserModule.default,
      plugin: pluginModule.default,
    }
  } catch {
    return null
  }
}

const typescriptEslint = await loadTypeScriptEslint()

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['vite.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
  typescriptEslint
    ? {
        files: ['**/*.{js,jsx,ts,tsx}'],
        extends: [
          js.configs.recommended,
          reactHooks.configs.flat.recommended,
          reactRefresh.configs.vite,
        ],
        plugins: {
          '@typescript-eslint': typescriptEslint.plugin,
        },
        languageOptions: {
          ecmaVersion: 'latest',
          globals: globals.browser,
          parser: typescriptEslint.parser,
          parserOptions: {
            ecmaVersion: 'latest',
            ecmaFeatures: { jsx: true },
            sourceType: 'module',
          },
        },
        rules: {
          'no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars': [
            'error',
            {
              argsIgnorePattern: '^_',
              varsIgnorePattern: '^[A-Z_]',
            },
          ],
        },
      }
    : {
        files: ['**/*.{js,jsx}'],
        extends: [
          js.configs.recommended,
          reactHooks.configs.flat.recommended,
          reactRefresh.configs.vite,
        ],
        languageOptions: {
          ecmaVersion: 'latest',
          globals: globals.browser,
          parserOptions: {
            ecmaVersion: 'latest',
            ecmaFeatures: { jsx: true },
            sourceType: 'module',
          },
        },
        rules: {
          'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
        },
      },
])
