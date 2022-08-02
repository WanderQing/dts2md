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

### Get Function name rule

1. If function has jsDoc
2. Then get function's jsdoc first line text
3. Else get function's name

### Example

`Code1`
```typescript
// index.ts
import { generate } from '@wanderqing/dts2md';
generate({
  src: './src',
  out: './docs'
})
```

```shell
# If you installed ts-node
ts-node index.ts
```

Create a typescript definition file `src/example.d.ts`. 

**How to generate definition file**

1. Pass `-d` option to `tsc` command.
2. set `declaration: true` in your `tsconfig.json`.

`.example.d.ts`
```typescript
/**
 * Get sum of two numbers
 * @param a  a number
 * @param b  anthoer number
 */
declare function add(a: number, b: number): number;
```

Run `Code1` you will get Some markdown files in your `out` dir

`docs/example.md`

    ## Get sum of two Numbers
    ```typescript
    /**
      * Get sum of two numbers
      * @param a  a number
      * @param b  anthoer number
    */
    declare function add(a: number, b: number): number;
    ```
