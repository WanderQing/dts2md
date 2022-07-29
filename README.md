# dts2md

Convert your `.d.ts` files to markdown files.

List all function and function's comment from your `.d.ts`.

## install

```shell
npm install @wdq/dts2md
```

or

```shell
yarn add @wdq/dts2md
```

## Build

```shell
npm run build
```

or

```shell
yarn run build
```

## Usage

dts2md supports function declaration statement, don't supports arrow function statement, for example `const add = (a: number, b :number) => number`

### Example

```typescript
// index.ts
import { generate } from '@wdq/dts2md';
generate({
  src: './src',
  out: './docs'
})
```

```shell
ts-node index.ts
```

Input a typescript definition file `src/example/d.ts`

```typescript
// .example.d.ts
/**
 * Get sum of two numbers
 * @param a  a number
 * @param b  anthoer number
 */
declare function add(a: number, b: number): number;
```

Output a markdown file `docs/example.md`

    ## Get sum of two Numbers
    ```typescript
    /**
      * Get sum of two numbers
      * @param a  a number
      * @param b  anthoer number
    */
    declare function add(a: number, b: number): number;
    ```
