# eslint-config-mcansh

An eslint config based on airbnb's with common rule changes I make.

## Installation

```bash
  yarn add -D eslint-config-mcansh
```

then install the peerDependencies

base config:

```bash
yarn add -D eslint eslint-config-{airbnb-base,kentcdodds} eslint-plugin-{promise,import} babel-eslint
```

default react:

```bash
default react: yarn add -D eslint eslint-config-{airbnb,kentcdodds} eslint-plugin-{import,promise,react,react-hooks,jsx-a11y}
```

typescript react:

```bash
yarn add -D eslint eslint-config-{airbnb,kentcdodds} eslint-plugin-{import,promise,react,react-hooks,jsx-a11y} @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

followed by adding it to your eslint config

for react (javascript)

```javascript
module.exports = {
  extends: ['mcansh'],
};
```

for react (typescript)

```typescript
module.exports = {
  extends: ['mcansh/typescript'],
};
```

for everything else

```javascript
module.exports = {
  extends: ['mcansh/base'],
};
```
