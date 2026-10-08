---
title: Use React with ASP.NET Core
author: SteveSandersonMS
description: Learn how to get started with the ASP.NET Core Single Page Application (SPA) project template for React and Create React App (CRA).
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 04/24/2026
uid: spa/react

# customer intent: As an ASP.NET developer, I want to get started with the SPA project template for React and CRA, so I can use React and create apps.
---
# Use React with ASP.NET Core

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


**Applies to: \>= aspnetcore-8.0**

Visual Studio provides project templates for creating single-page apps (SPAs) based on JavaScript technologies, such as [Angular](https://angular.dev/), [React](https://react.dev/), and [Vue](https://vuejs.org/) that have an ASP.NET Core backend. These templates:

* Create a Visual Studio solution with a frontend project and a backend project.
* Use the Visual Studio project type for JavaScript and TypeScript (*.esproj*) for the frontend.
* Use an ASP.NET Core project for the backend.

Projects created by using the Visual Studio templates can be run from the command line on Windows, Linux, and macOS. To run the app, use `dotnet run --launch-profile https` to run the server project. Running the server project automatically starts the frontend JavaScript development server. The `https` launch profile is currently required.


## Visual Studio tutorial

To get started, follow the [Create an ASP.NET Core app with React](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-react) tutorial in the Visual Studio documentation.

For more information, see [JavaScript and TypeScript in Visual Studio](https://learn.microsoft.com/visualstudio/javascript/javascript-in-visual-studio)

## ASP.NET Core SPA templates

Visual Studio includes templates for building ASP.NET Core apps with a JavaScript or TypeScript frontend. These templates are available in Visual Studio 2022 version 17.8 or later with the **ASP.NET and web development** workload installed.

The Visual Studio templates for building ASP.NET Core apps with a JavaScript or TypeScript frontend offer the following benefits:

* Clean project separation for the frontend and backend.
* Stay up-to-date with the latest frontend framework versions.
* Integrate with the latest frontend framework command-line tooling, such as [Vite](https://vite.dev/).
* Templates for both JavaScript and TypeScript (only TypeScript for Angular).
* Rich JavaScript and TypeScript code editing experience.
* Integrate JavaScript build tools with the .NET build.
* npm dependency management UI.
* Compatible with Visual Studio Code debugging and launch configuration.
* Run frontend unit tests in [Test Explorer](https://learn.microsoft.com/visualstudio/test/run-unit-tests-with-test-explorer) by using JavaScript test frameworks.

## Legacy ASP.NET Core SPA templates

Earlier versions of the .NET SDK included what are now legacy templates for building SPA apps with ASP.NET Core. For documentation on these older templates, see the .NET 7 version of the [SPA overview](intro.md) and the [Angular](angular.md) and [React](react.md) articles.

 
## Related content

- [Overview of Single Page Apps (SPAs) in ASP.NET Core](intro.md)




**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

The ASP.NET Core with React project template provides a convenient starting point for ASP.NET Core apps using React and [Create React App](https://create-react-app.dev/) (CRA) to implement a rich, client-side user interface (UI).

The project template is equivalent to creating both an ASP.NET Core project to act as a web API and a CRA React project to act as a UI. This project combination offers the convenience of hosting both projects in a single ASP.NET Core project that can be built and published as a single unit.

The project template isn't meant for server-side rendering (SSR). For SSR with React and Node.js, consider [Next.js](https://nextjs.org/) or [Razzle](https://razzlejs.org/).

## Create a new app

Create a new project from a command prompt using the command `dotnet new react` in an empty directory. For example, the following commands create the app in a `my-new-app` directory and switch to that directory:

```dotnetcli
dotnet new react -o my-new-app
cd my-new-app
```

Run the app from either Visual Studio or the .NET CLI:

# [Visual Studio](#tab/visual-studio)

Open the generated `.csproj` file, and run the app as normal from there.

The build process restores npm dependencies on the first run, which can take several minutes. Subsequent builds are much faster.

# [.NET CLI](#tab/net-cli)

Ensure you have an environment variable called `ASPNETCORE_ENVIRONMENT` with value of `Development`. On Windows (in non-PowerShell prompts), run `SET ASPNETCORE_ENVIRONMENT=Development`. On Linux or macOS, run `export ASPNETCORE_ENVIRONMENT=Development`.

Run [dotnet build](https://learn.microsoft.com/dotnet/core/tools/dotnet-build) to verify your app builds correctly. On the first run, the build process restores npm dependencies, which can take several minutes. Subsequent builds are much faster.

Run [dotnet run](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) to start the app.

---

The project template creates an ASP.NET Core app and a React app. The ASP.NET Core app is intended to be used for data access, authorization, and other server-side concerns. The React app, residing in the `ClientApp` subdirectory, is intended to be used for all UI concerns.

## Add pages, images, styles, modules, etc.

The `ClientApp` directory is a standard CRA React app. See the official [CRA documentation](https://create-react-app.dev/docs/getting-started/) for more information.

There are slight differences between the React app created by this template and the one created by CRA itself; however, the app's capabilities are unchanged. The app created by the template contains a [Bootstrap](https://getbootstrap.com/)-based layout and a basic routing example.

## Install npm packages

To install third-party npm packages, use a command prompt in the `ClientApp` subdirectory. For example:

```console
cd ClientApp
npm install <package_name>
```

## Publish and deploy

In development, the app runs in a mode optimized for developer convenience. For example, JavaScript bundles include source maps (so that when debugging, you can see your original source code). The app watches JavaScript, HTML, and CSS file changes on disk and automatically recompiles and reloads when it sees those files change.

In production, serve a version of your app that's optimized for performance. This is configured to happen automatically. When you publish, the build configuration emits a minified, transpiled build of your client-side code. Unlike the development build, the production build doesn't require Node.js to be installed on the server.

You can use standard [ASP.NET Core hosting and deployment methods](../../host-and-deploy/index.md).

## Run the CRA server independently

The project is configured to start its own instance of the CRA development server in the background when the ASP.NET Core app starts in development mode. This is convenient because it means you don't have to run a separate server manually.

There's a drawback to this default setup. Each time you modify your C# code and your ASP.NET Core app needs to restart, the CRA server restarts. A few seconds are required to start back up. If you're making frequent C# code edits and don't want to wait for the CRA server to restart, run the CRA server externally, independently of the ASP.NET Core process.

To run the CRA server externally, switch to the `ClientApp` subdirectory in a command prompt and launch the CRA development server:

```console
cd ClientApp
npm start
```

When you start your ASP.NET Core app, it won't launch a CRA server. The instance you started manually is used instead. This enables it to start and restart faster. It's no longer waiting for your React app to rebuild each time.

## Configure proxy middleware for SignalR

For more information, see  [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).


## Additional resources

* [security/authentication/identity/spa](../../security/authentication/identity-api-authorization.md)



**Applies to: < aspnetcore-6.0**

The updated React project template provides a convenient starting point for ASP.NET Core apps using React and [create-react-app](https://github.com/facebookincubator/create-react-app) (CRA) conventions to implement a rich, client-side user interface (UI).

The template is equivalent to creating both an ASP.NET Core project to act as an API backend, and a standard CRA React project to act as a UI, but with the convenience of hosting both in a single app project that can be built and published as a single unit.

The React project template isn't meant for server-side rendering (SSR). For SSR with React and Node.js, consider [Next.js](https://github.com/zeit/next.js/) or [Razzle](https://github.com/jaredpalmer/razzle).

## Create a new app

Create a new project from a command prompt using the command `dotnet new react` in an empty directory. For example, the following commands create the app in a `my-new-app` directory and switch to that directory:

```dotnetcli
dotnet new react -o my-new-app
cd my-new-app
```

Run the app from either Visual Studio or the .NET CLI:

# [Visual Studio](#tab/visual-studio)

Open the generated `.csproj` file, and run the app as normal from there.

The build process restores npm dependencies on the first run, which can take several minutes. Subsequent builds are much faster.

# [.NET CLI](#tab/net-cli)

Ensure you have an environment variable called `ASPNETCORE_ENVIRONMENT` with value of `Development`. On Windows (in non-PowerShell prompts), run `SET ASPNETCORE_ENVIRONMENT=Development`. On Linux or macOS, run `export ASPNETCORE_ENVIRONMENT=Development`.

Run [dotnet build](https://learn.microsoft.com/dotnet/core/tools/dotnet-build) to verify your app builds correctly. On the first run, the build process restores npm dependencies, which can take several minutes. Subsequent builds are much faster.

Run [dotnet run](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) to start the app.

---

The project template creates an ASP.NET Core app and a React app. The ASP.NET Core app is intended to be used for data access, authorization, and other server-side concerns. The React app, residing in the `ClientApp` subdirectory, is intended to be used for all UI concerns.

## Add pages, images, styles, modules, etc.

The `ClientApp` directory is a standard CRA React app. See the official [CRA documentation](https://create-react-app.dev/docs/getting-started/) for more information.

There are slight differences between the React app created by this template and the one created by CRA itself; however, the app's capabilities are unchanged. The app created by the template contains a [Bootstrap](https://getbootstrap.com/)-based layout and a basic routing example.

## Install npm packages

To install third-party npm packages, use a command prompt in the `ClientApp` subdirectory. For example:

```console
cd ClientApp
npm install --save <package_name>
```

## Publish and deploy

In development, the app runs in a mode optimized for developer convenience. For example, JavaScript bundles include source maps (so that when debugging, you can see your original source code). The app watches JavaScript, HTML, and CSS file changes on disk and automatically recompiles and reloads when it sees those files change.

In production, serve a version of your app that's optimized for performance. This is configured to happen automatically. When you publish, the build configuration emits a minified, transpiled build of your client-side code. Unlike the development build, the production build doesn't require Node.js to be installed on the server.

You can use standard [ASP.NET Core hosting and deployment methods](../../host-and-deploy/index.md).

## Run the CRA server independently

The project is configured to start its own instance of the CRA development server in the background when the ASP.NET Core app starts in development mode. This is convenient because it means you don't have to run a separate server manually.

There's a drawback to this default setup. Each time you modify your C# code and your ASP.NET Core app needs to restart, the CRA server restarts. A few seconds are required to start back up. If you're making frequent C# code edits and don't want to wait for the CRA server to restart, run the CRA server externally, independently of the ASP.NET Core process. To do so:

1. Add a `.env` file to the `ClientApp` subdirectory with the following setting:

   ```
   BROWSER=none
   ```

    This will prevent your web browser from opening when starting the CRA server externally.

2. In a command prompt, switch to the `ClientApp` subdirectory, and launch the CRA development server:

   ```console
   cd ClientApp
   npm start
   ```

3. Modify your ASP.NET Core app to use the external CRA server instance instead of launching one of its own. In your *Startup* class, replace the `spa.UseReactDevelopmentServer` invocation with the following:

   ```csharp
   spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
   ```

When you start your ASP.NET Core app, it won't launch a CRA server. The instance you started manually is used instead. This enables it to start and restart faster. It's no longer waiting for your React app to rebuild each time.

> **Important:**
> "Server-side rendering" is not a supported feature of this template. Our goal with this template is to meet parity with "create-react-app". As such, scenarios and features not included in a "create-react-app" project (such as SSR) are not supported and are left as an exercise for the user.

## Configure proxy middleware for SignalR

For more information, see  [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).


## Additional resources

* [security/authentication/identity/spa](../../security/authentication/identity-api-authorization.md)
