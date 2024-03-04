module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-console': 'warn',
    'react/self-closing-comp': 'warn',
    'react/react-in-jsx-scope': 'off',
    curly: ['error'],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external', // 외부 라이브러리 (차크라)
          'internal', // 내부경로를 다르게 설정했을 때
          'parent', // 상대경로 부모 (../pages/home)
          'sibling', // 상대경로 형제(./bar/baz)
          'index', // 상대경로 현재(./)
          'object', // 타입스크립트에서만 사용가능
          'type', // 타입
          'unknown', //  alias
        ],
        pathGroups: [
          {
            // 리액트 관련 import문을 다른 외부 라이브러리보다 위에 위치시킴 'react', 'react-dom', 'react-router-dom
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/core/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/features/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/pages/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/shared/*',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc', // 오름차순
          caseInsensitive: true, // 대문자 우선
        },
      },
    ],
  },
};
