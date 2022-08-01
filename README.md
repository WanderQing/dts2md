# dts2md

Convert your `.d.ts` files to markdown files.

List all function and function's comment from your `.d.ts`.

## install

```shell
npm install @wanderqing/dts2md
```

or

```shell
yarn add @wanderqing/dts2md
```

## Usage

1. support JSDoc comment
2. support function declaration and arrow function

### Example

```typescript
// index.ts
import { generate } from '@wanderqing/dts2md';
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
