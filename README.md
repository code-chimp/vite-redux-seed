# React+Redux Seed (vite)

A React + Redux project powered by [Vite (veet)][vit] with all of my favorite preflight tooling wired up and
ready to go.

Features:

- [Redux / Redux Toolkit][rkt]
- [Bootstrap 5][bst]
- [Fontawesome 6][fa6] Free (easily upgradable)
- Draconian style and code quality enforcement courtesy of [Prettier][pret], [ESLint][esl], [StyleLint][sty] and
  [Vitest][vitst] powered by [Husky][hus] pre-commit hooks
- [Documentation!](docs/README.md)

## Usage

The easiest way to get started with this template is to clone it with [Degit][dgt]:

```shell
npx degit code-chimp/vite-redux-seed new-redux-project
cd new-redux-project
yarn
npx npm-check-updates
```

## NOTE:

Feel free to use this as a basis for your own project but you may want to run `npx npm-check-updates` to ensure you are
getting the latest packages as I will only sporadically update `package.json` as I see major breaking changes or get
security warnings.

[vit]: https://vitejs.dev/ 'Next generation front-end tooling powered by ESBuild.'
[vitst]: https://vitest.dev/ 'Blazing fast unit test framework.'
[rkt]: https://redux-toolkit.js.org/ 'Take a lot of the boilerplate out of developing Redux applications'
[bst]: https://getbootstrap.com/ 'Feature packed front-end toolkit'
[fa6]: https://fontawesome.com/v6/docs/ 'Premier icon library'
[pret]: https://prettier.io/ 'The opinionated code formatter'
[esl]: https://eslint.org/ 'The pluggable linting utility for JavaScript and JSX'
[sty]: https://stylelint.io/ 'A mighty, modern linter that helps you avoid errors and enforce conventions in your styles'
[hus]: https://typicode.github.io/husky/#/ 'Modern git hooks made easy'
[dgt]: https://github.com/Rich-Harris/degit 'straightforward project scaffolding'
