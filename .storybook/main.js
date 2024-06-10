module.exports = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-webpack5-compiler-babel',
        '@chromatic-com/storybook'
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {}
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript'
    }
};
