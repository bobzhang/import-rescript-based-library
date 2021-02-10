

# Example using [ReScript](https://github.com/rescript-lang/rescript-compiler) as a pure js library


[index.mjs](./index.mjs) is a word counting program.

It use the Belt.Map module from ReScript standard library.

You can run it via `node ./index.mjs`


You can also bundle it into [index.bundle.mjs](./index.bundle.mjs)

```
npx esbuild index.mjs --bundle --platform=node --outfile=index.bundle.mjs --minify-syntax --format=esm
```

The great thing with Belt.Map libraries is that it is functional and support custom data type. 

The experience could be improved in the future, e.g, generating typescript declarations.