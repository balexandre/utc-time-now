/*

    'extends': ['airbnb/base', 'plugin:prettier/recommended'],
    'plugins': ['prettier'],

    npm i -D eslint-config-airbnb eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier prettier
*/

module.exports = {
    extends: ['airbnb/base', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
        },
    },
    env: {
        es6: true,
        browser: true,
        node: true,
        mocha: true,
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'prettier/prettier': ['error'],
        'class-methods-use-this': 'off',
        'max-len': 'off',
        'no-param-reassign': 'off',
        'no-unused-vars': 'off',
    },
};
