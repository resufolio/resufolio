
# Resufolio

![Resufolio Icon](public/images/resufolio-icon.svg)

Resufolio is a React-Next template designed to quickly and easily create resume and portfolio pages. With a minimalist design and styling using Tailwind, you can customize your pages by combining a variety of components.

## Features

- **Minimalist Design**: Focus on clarity and simplicity.
- **Modular Components**: 20+ documented components with Storybook for easy combination and customization.
- **Tailwind CSS**: Modern and responsive styling.
- **Data in JSON and MDX**: Easily configurable and editable.
- **Project Page Support**: Native and easy to use.
- **Font Awesome Icons**: Integration for a wide range of icons.
- **Dark Mode**: Native support for dark mode.
- **GitHub Pages**: Automated workflow for deployment.
- **TypeScript**: Native support for safer and more efficient development.
- **Simple Installation**: Create your project with a single command.
- **Quick Resume Creation**: Create and customize your resume in minutes.

## Installation

To start a new project with Resufolio, run the following command:

```sh
npx create-next-app --example https://github.com/resufolio/resufolio my-app
```

## Usage

1. Clone the repository or create a new project with the installation command.
2. Navigate to the project directory:
   ```sh
   cd my-app
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

```plaintext
├── .eslintrc.js
├── .gitignore
├── .nvmrc
├── README.md
├── jest.config.js
├── jest.setup.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .github
│   └── workflows
│       └── publish.yml
├── .storybook
│   ├── main.js
│   └── preview.js
├── public
│   ├── favicon.ico
│   └── images
│       ├── avatartion.svg
│       ├── ogimage.png
│       ├── personal.png
│       ├── resufolio-icon.svg
│       └── logos
│           ├── example-article.svg
│           └── example-card.svg
├── src
│   ├── .resufolio.config.json
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── projects
│   │       ├── page.tsx
│   │       └── [slug]
│   │           └── page.tsx
│   ├── components
│   │   ├── article
│   │   ├── billboard
│   │   ├── box
│   │   ├── button
│   │   ├── card
│   │   ├── cards
│   │   ├── dropdown
│   │   ├── flatList
│   │   ├── header
│   │   ├── icon
│   │   ├── link
│   │   ├── list
│   │   ├── modal
│   │   ├── tabList
│   │   ├── tag
│   │   └── textToIcon
│   ├── content
│   │   ├── home.json
│   │   ├── projects.json
│   │   └── projects
│   │       └── example.mdx
│   ├── lib
│   │   ├── Columns.ts
│   │   ├── ComponentsMap.ts
│   │   ├── Content.ts
│   │   ├── paths.ts
│   │   ├── paths.types.ts
│   │   └── breadcrumbs
│   │       ├── Breadcrumbs.types.ts
│   │       └── resufolio
│   │           └── ResufolioConfigs.types.ts
├── styles
    └── globals.css

```

## Customization

- **Styling**: Edit the CSS files in `styles` to customize the appearance.
- **Content**: Modify the JSON files in `data` to change the content of the pages.
- **Components**: Add or edit components in `components` as needed.

## Contribution

Contributions are welcome! Feel free to open issues and pull requests on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Create your resume and portfolio in minutes with Resufolio!
