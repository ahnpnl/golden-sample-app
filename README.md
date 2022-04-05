# Golden Sample Angular App

This golden sample provides examples of the code structure, configuration, and best practices for using the Backbase Angular tools.


## Table of Contents
* [Overview of the app](#overview-of-the-app)
* [Prerequisites](#prerequisites)
* [Authentication](#authentication)
* [Generate an application](#generate-an-application)
* [Generate a library](#generate-a-library)
* [Load app on a development server](#load-app-on-a-development-server)
* [Code scaffolding](#code-scaffolding)
* [Build](#build)
* [Tests](#tests)
* [Understand your workspace](#understand-your-workspace)
* [Running with docker](#running-with-docker)
* [Package as a runnable Docker container](#package-as-a-runnable-docker-container)
* [Further help](#further-help)





## Overview of the app
This project is a complete reference implementation for building a new Angular single page application(SPA) with Backbase components and libraries.  It includes best practices that front-end developers can use to build their own web applications.

This README provides an overview and set-up of the app, and further guidance is provided as comments in the code to further guide you.

The project uses the latest versions of the tools and libraries.
  
 
 ### Components included in the app
  - Auth module: define authentication
  - Locale selector for SPA: support multiple languages. Check the example codes [here](https://github.com/Backbase/golden-sample-app/tree/master/apps/golden-sample-app/src/app/locale-selector)
  - Entitlements: configure [entitlements](https://community.backbase.com/documentation/foundation_angular/latest/entitlements) for different scenarios. Check the example code in the [`app.component.html`](https://github.com/Backbase/golden-sample-app/blob/738df3de9fb15f96c9fa2017d00269ced63bebaa/apps/golden-sample-app/src/app/app.component.html#L50) and [`entitlementsTriplets.ts`](https://github.com/Backbase/golden-sample-app/blob/master/apps/golden-sample-app/src/app/services/entitlementsTriplets.ts)
  - Configure journeys
    - This is [an example](https://github.com/Backbase/golden-sample-app/blob/master/libs/transactions/src/lib/services/transactions-journey-config.service.ts) of how the journey configuration might be defined in the application 
    - By default, it will provide some value intended by the journey developers and exported by public API. Check the [`index.ts`](https://github.com/Backbase/golden-sample-app/blob/master/libs/transactions/src/index.ts#L1), however, you can customize values during the creation of applications like [`transactions-journey-bundle.module.ts`](https://github.com/Backbase/golden-sample-app/blob/master/apps/golden-sample-app/src/app/transactions/transactions-journey-bundle.module.ts#L15)
  - Communication service or how to communicate between journeys

    - There are 3 parts of the communication chain:
      - Source journey (the one that will send some data or signal) should define and export. Check the [`make-transfer-communication.service.ts`](https://github.com/Backbase/golden-sample-app/blob/master/libs/transfer/src/lib/services/make-transfer-communication.service.ts)
      - The destination journey (the one that will receive the data of signal) should also define the interface of the service that it expects. Check the [`communication/index.ts`](https://github.com/Backbase/golden-sample-app/blob/master/libs/transactions/src/lib/communication/index.ts)
      - The actual implementation of the service lives on the application level and must implement both of the available interfaces (or abstract classes) from source and destination journeys. Check the example [`journey-communication.service.ts`](https://github.com/Backbase/golden-sample-app/blob/master/apps/golden-sample-app/src/app/services/journey-communication.service.ts)
      - Do not forget, that communication service from the application level should be provided to the journeys modules in the bundle files (to avoid breaking lazy loading). Check the [`transactions-journey-bundle.module.ts`](https://github.com/Backbase/golden-sample-app/blob/master/apps/golden-sample-app/src/app/transactions/transactions-journey-bundle.module.ts)
    - The general explanation of the communication service idea and  its theoretical underlying can be found in [communicate_between_journeys](https://community.backbase.com/documentation/foundation_angular/latest/communicate_between_journeys)
  - Simple examples of journeys such as [transactions](https://github.com/Backbase/golden-sample-app/tree/master/libs/transactions) and [transfer](https://github.com/Backbase/golden-sample-app/tree/master/libs/transfer)

## Prerequisites
- Install the following VSCode extensions:  

    - [nrwl.angular-console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console): to find and run the Nx Commands.
    - [firsttris.vscode-jest-runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner): to isolated tests while you are developing. 


- For AWS environments with specific WAF configurations, you may need to use `http://0.0.0.0:4200/` when accessing the app locally, in order to successfully authenticate.



## Authentication

### Important Info

The code that is used for authentication is not for production purposes, this is the example to understand the concepts lying under the hood.
Do not copy-paste anything related to the authentication to your banking application.

### How to add authentication to your app

Check the example code in the [`app.module.ts`](https://github.com/Backbase/golden-sample-app/blob/master/apps/golden-sample-app/src/app/app.module.ts#L46), the related `AuthConfig` in the[`environment.ts`](https://github.com/Backbase/golden-sample-app/blob/master/apps/golden-sample-app/src/environments/environment.ts#L44) files, and the `APP_INITIALIZER` provider logic.
Secure routes with `AuthGuard`s. We rely on <https://github.com/manfredsteyer/angular-oauth2-oidc>, check their documentation for more details.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can also use Nx Console to generate libraries as well.

When using [Nx](https://nx.dev/), you can create multiple applications and libraries in the same workspace.

After the app has been generated, use tags in `nx.json` and `.eslintrs.json` to impose constraints on the dependency graph. [Nx Tags](https://nx.dev/structure/monorepo-tags)

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use Nx Console to generate libraries as well.

Libraries can be shared across libraries and applications. You can import them from `@backbase/mylib`.


## Load app on a development server

Run `ng serve my-app` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

To run the project on a development server, run 
`ng build my-app

The build artifacts are stored in the `dist/` directory. 

To build the app to production, use the `--prod` flag.

## Tests

- Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

-  Running end-to-end tests

Run `npx playwright test`

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Running with docker

Run `ng build --configuration production` and then `docker-compose up` to startup the docker container with the application

## Package as a runnable Docker container

Run `ng build:docker` (after a successful build with `ng build`) to create a Docker image. Start a new container with `npm run start:docker`.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
