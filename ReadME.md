

# Example using ReScript as a pure js library


[index.mjs](./index.mjs) is a word counting program.
It could be run directly.

You can also bundle it into [index.bundle.mjs](./index.bundle.mjs)

```
npx esbuild index.mjs --bundle --platform=node --outfile=index.bundle.mjs --minify-syntax --format=esm
```