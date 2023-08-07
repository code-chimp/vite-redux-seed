# React/TSX Style Guide

_A mostly reasonable approach to React and TSX_

## Table of Contents

1. [Basic Rules](#basic-rules)
1. [Class vs Functional Components](#class-vs-functional-components)
1. [Barrel Files and Component Naming](#barrel-files-and-component-naming)
1. [Alignment](#alignment)
1. [Quotes](#quotes)
1. [Spacing](#spacing)
1. [Props](#props)
1. [Parentheses](#parentheses)
1. [Tags](#tags)
1. [Methods](#methods)
1. [Ordering](#ordering)
1. [Reference](#reference)

## Basic Rules

- Only include one React component per file.
  - However, multiple [Functional Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) are allowed per file.
    eslint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).
- Always use TSX syntax.

## Class vs Functional Components

- If you have a large amount of internal state and/or depend on several `useEffect`s that would be easier described as lifecycle events, extend React.Component.

  ```typescript jsx
  class Listing extends React.Component {
    // ...
    render() {
      return <div>{this.state.hello}</div>;
    }
  }
  ```

  And if you don't have an over abundance of state, prefer arrow functions over classes:

  ```typescript jsx
  // bad
  class Listing extends React.Component {
    render() {
      return <div>{this.props.hello}</div>;
    }
  }

  // good
  export interface IListingProps {
    hello: string;
  }

  const Listing: FC<IListingProps> = ({ hello }) => <div>{hello}</div>;

  export default Listing;
  ```

## Barrel Files and Component Naming

- **Barrel**: create barrel exports for all React components. _(really it just looks nicer)_
- **Extensions**: Use `.tsx` extension for React components.
- **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.tsx`. eslint:
  [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

  ```typescript jsx
  // bad
  import reservationCard from '../components/ReservationCard/ReservationCard';

  // good
  import ReservationCard from '../components/ReservationCard';
  ```

_ex: /src/components/ReservationCard/index.ts_

    src/
    └── components/
        └── ReservationCard/
            ├── index.ts
            ├── ReservationCard.tsx
            └── ReservationCard.test.tsx

_/src/components/ReservationCard/index.ts_

```typescript jsx
export { default } from './ReservationCard';
```

## Alignment

- Follow these alignment styles for TSX syntax. prettier: [`jsxBracketSameLine`](https://prettier.io/docs/en/options.html#jsx-brackets)

  ```typescript jsx
  // bad
  <Foo superLongParam="bar"
       anotherSuperLongParam="baz" />

  // good
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  />

  // if props fit in one line then keep it on the same line
  <Foo bar="bar" />

  // children get indented normally
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz">
    <Quux />
  </Foo>
  ```

## Quotes

- Always use double quotes (`"`) for JSX attributes. eslint: [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes)

  ```typescript jsx
  // bad
  <Foo bar='bar' />

  // good
  <Foo bar="bar" />

  // bad
  <Foo style={{ left: "20px" }} />

  // good
  <Foo style={{ left: '20px' }} />
  ```

## Spacing

- Always include a single space in your self-closing tag. prettier: [`bracketSpacing`](https://prettier.io/docs/en/options.html#bracket-spacing)

  ```typescript jsx
  // bad
  <Foo/>

  // very bad
  <Foo                 />

  // bad
  <Foo
   />

  // just get out
  <Foo





   />

  // good
  <Foo />
  ```

- Do not pad TSX curly braces with spaces. eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

  ```typescript jsx
  // bad
  <Foo bar={ baz } />

  // good
  <Foo bar={baz} />
  ```

## Props

- Always use camelCase for prop names.

  ```typescript jsx
  // bad
  <Foo
    UserName="hello"
    phone_number={12345678}
  />

  // good
  <Foo
    userName="hello"
    phoneNumber={12345678}
  />
  ```

- Omit the value of the prop when it is explicitly `true`. eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

  ```typescript jsx
  // bad
  <Foo hidden={true} />

  // good
  <Foo hidden />
  ```

- Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>` must have `role="presentation"`. eslint: [`jsx-a11y/img-has-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-has-alt.md)

  ```typescript jsx
  // bad
  <img src="hello.jpg" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />

  // good
  <img src="hello.jpg" alt="" />

  // good
  <img src="hello.jpg" role="presentation" />
  ```

- Do not use words like "image", "photo", or "picture" in `<img>` `alt` props. eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

  > Why? Screenreaders already announce `img` elements as images, so there is no need to include this information in the alt text.

  ```typescript jsx
  // bad
  <img src="hello.jpg" alt="Picture of me waving hello" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />
  ```

- Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/roles#role_definitions). eslint: [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

  ```typescript jsx
  // bad - not an ARIA role
  <div role="datepicker" />

  // bad - abstract ARIA role
  <div role="range" />

  // good
  <div role="button" />
  ```

- Do not use `accessKey` on elements. eslint: [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

  > Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

  ```typescript jsx
  // bad
  <div accessKey="h" />

  // good
  <div />
  ```

- Avoid using an array index as `key` prop, prefer a unique ID. ([why?](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))

  ```typescript jsx
  // bad
  {
    todos.map((todo, index) => <Todo {...todo} key={index} />);
  }

  // good
  {
    todos.map(todo => <Todo {...todo} key={todo.id} />);
  }
  ```

## Parentheses

- Wrap TSX tags in parentheses when they span more than one line. eslint: [`react/wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md)

  ```typescript jsx
  // bad
  render () {
    return <MyComponent className="long body" foo="bar">
             <MyChild />
           </MyComponent>;
  }

  // good
  render () {
    return (
      <MyComponent className="long body" foo="bar">
        <MyChild />
      </MyComponent>
    );
  }

  // good, when single line
  render () {
    const body = <div>hello</div>;

    return <MyComponent>{body}</MyComponent>;
  }
  ```

## Tags

- Always self-close tags that have no children. eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

  ```typescript jsx
  // bad
  <Foo className="stuff"></Foo>

  // good
  <Foo className="stuff" />
  ```

- If your component has multi-line properties, close its tag on the next line. prettier: [`jsxBracketSameLine`](https://prettier.io/docs/en/options.html#jsx-brackets)

  ```typescript jsx
  // bad
  <Foo
    bar="bar"
    baz="baz" />

  // good
  <Foo
    bar="bar"
    baz="baz"
  />
  ```

## Methods

- Use arrow functions to close over local variables.

  ```typescript jsx
  function ItemList(props) {
    return (
      <ul>
        {props.items.map((item, index) => {
          <Item key={item.key} onClick={() => doSomethingWith(item.name, index)} />;
        })}
      </ul>
    );
  }
  ```

- Implicity bind event handlers by defining them as arrow function class properties. eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

  > Why? A bind call in the render path creates a brand new function on every single render.

  ```typescript jsx
  // bad
  class Foo extends React.Component {
    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv.bind(this)} />;
    }
  }

  // good
  class Foo extends React.Component {
    onClickDiv: () => {
      // do stuff
    };

    render() {
      return <div onClick={this.onClickDiv} />;
    }
  }
  ```

- Do not use underscore prefix for internal methods of a React component. (**Note:** this is a pattern from the earliest days of React)

  ```typescript jsx
  // bad
  class Foo extends React.Component {
    _onClickSubmit() {
      // do stuff
    }

    // other stuff
  }

  // good
  class Foo extends React.Component {
    onClickSubmit() {
      // do stuff
    }

    // other stuff
  }
  ```

- Be sure to return a value in your `render` methods. eslint: [`require-render-return`](https://github.com/yannickcr/eslint-plugin-react/pull/502)

  ```typescript jsx
  // bad
  render () {
    (<div />)
  }

  // good
  render () {
    return (<div />)
  }
  ```

## Ordering

- Suggested ordering for class components:

1. `constructor`
1. optional `static` methods
1. `getChildContext`
1. `componentWillMount`
1. `componentDidMount`
1. `componentWillReceiveProps`
1. `shouldComponentUpdate`
1. `componentWillUpdate`
1. `componentDidUpdate`
1. `componentWillUnmount`
1. `render`
1. _clickHandlers or eventHandlers_ like `onClickSubmit()` or `onChangeDescription()`
1. _getter methods for `render`_ like `getSelectReason()` or `getFooterContent()`
1. _Optional render methods_ like `renderNavigation()` or `renderProfilePicture()`

- How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

  ```typescript jsx
  import React, { Component, PropTypes } from 'react';

  export default class Link extends Component {
    static propTypes = {
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      text: PropTypes.string,
    };

    static defaultProps = {
      text: 'Hello World',
    };

    render() {
      const { id, url, text } = this.props;

      return (
        <a href={url} data-id={id}>
          {text}
        </a>
      );
    }
  }
  ```

## Reference

- This document is based on the [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react).

**[back to top](#table-of-contents)**
