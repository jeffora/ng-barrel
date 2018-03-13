## Angular Compiler Barrel Failure

This repository contains a minimal reproduction of [an issue](https://github.com/dherges/ng-packagr/issues/195) with Angular Compiler and barrel files.

With a relatively simple setup, it is possible to create a library build that is missing metadata, but otherwise completes successfully.
The issue only surfaces when an application tries to include this library and build with AOT, at which point it will fail with an obscure
error message:

```
ERROR in : Unexpected value 'undefined' imported by the module 'AppModule in /barrel-app/node_modules/barrel-lib/barrel-lib.d.ts'
```

The repo contains two projects

- an Angular application
- an Angular library and sub-application (intended to be loaded by the first)

### Reproduction Steps

In order to reproduce the issue, follow the following steps:

1. Clone the repository and `cd` into the project directory
2. Build the library project:
  - `cd barrel-lib`
  - `npm i`
  - `npm run build`
  - `cd dist`
  - `npm link`
  - `rm -rf node_modules`
  - `cd ../..`
3. Now the library project is built and linked as barrel-lib
4. Trigger error in the application:
  - `cd barrel-app`
  - `npm i`
  - `npm link barrel-lib`
  - `npm run build`
5. This should fail with the error: `ERROR in : Unexpected value 'undefined' imported by the module 'AppModule in barrel-app/node_modules/barrel-lib/barrel-lib.d.ts'`

Note that in the `barrel-lib.metadata.json` file in `barrel-lib/dist`, there is no metadata entry for the `ToolModule` (named `ɵb`).

### Rectification Steps

In order to see the metadata generated correctly, and for the application to build successfully, follow these steps:

1. In `barrel-lib/src/app/app.module.ts` change the import path `import { ToolModule } from '../tools';` to `import { ToolModule } from '../tools/index';` (note the appended `/index`)
2. Re-run `npm run build` in `barrel-lib`
3. The metadata in `barrel-lib/dist/barrel-lib.metadata.json` should now include an entry for `ɵb`
4. Re-run `npm run build` in `barrel-app`, and it should complete successfully
