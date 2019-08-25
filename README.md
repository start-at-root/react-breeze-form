# react-breeze-form

[![Build Status](https://travis-ci.org/start-at-root/react-breeze-form.svg?branch=master)](https://travis-ci.org/start-at-root/react-breeze-form)
[![codecov](https://codecov.io/gh/jlison/react-breeze-form/branch/master/graph/badge.svg)](https://codecov.io/gh/jlison/react-breeze-form)
[![Maintainability](https://api.codeclimate.com/v1/badges/f9d7cae974904d3c0747/maintainability)](https://codeclimate.com/github/start-at-root/react-breeze-form/maintainability)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Quickly render bootstrap styled react hook forms using a schema file.

## Notice
**Currently under development**
```
Versions 1.x.xx are under development, and may have breaking changes
```

## Required peer dependencies
* [react-hook-form](https://www.npmjs.com/package/react-hook-form)
* [react-i18next](https://www.npmjs.com/package/react-i18next)
* [react-select](https://www.npmjs.com/package/react-select)
* [reactstrap](https://www.npmjs.com/package/reactstrap)

## Quick example
Convert a configuration object such as:
```jsx
const form = [
  {
    name: "intro",
    type: (
      <div className="my-3" style={{ color: "green", fontWeight: "bold" }}>
        Quick example / Ejemplo rápido
      </div>
    )
  },
  {
    name: "name",
    type: "input",
    inputType: "text",
    header: {
      className: "input-header",
      id: "full-name-header",
      text: "common:fullName"
    },
    inputs: [
      {
        className: "mt-4",
        inputType: "text",
        name: "firstName",
        placeholder: "common:firstName",
        required: "common:requiredField",
        type: "input",
        validate: (value: any) =>
          !value.includes("test") || "common:invalidName"
      },
      {
        className: "mt-4",
        inputType: "text",
        name: "lasttName",
        placeholder: "common:lastName",
        required: "common:requiredField",
        type: "input"
      }
    ]
  },
  {
    name: "zip-language",
    type: "input",
    inputType: "text",
    inputs: [
      {
        name: "zip",
        type: "input",
        inputType: "text",
        className: "mt-2",
        placeholder: "common:zip"
      },
      {
        name: "language",
        type: "singleselect",
        className: "select-double mt-2",
        inputType: "select",
        placeholder: "common:language",
        options: [
          { label: "common:english", value: "en" },
          { label: "common:spanish", value: "es" }
        ]
      }
    ]
  },
  {
    name: "submit",
    type: "submitbtn",
    col: 8,
    placeholder: "common:save"
  }
];
```
... into a full form component:
```jsx
function App() {
  return (
    <div className="App">
        <Form onSubmit={(data) => console.log("Data", data)} 
              form={form} />
    </div>
  );
}
```

## Interactive demo
Demo: [CodeSandBox](https://codesandbox.io/s/rbf-quick-example-qywrh)

## All configuration options
All possible configuration options are defined in the [FormConfig interface file](https://github.com/start-at-root/react-breeze-form/blob/master/src/interfaces/FormConfig.ts#L15)

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
