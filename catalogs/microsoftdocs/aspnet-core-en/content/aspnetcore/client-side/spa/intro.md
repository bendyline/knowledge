---
title: Overview of Single Page Apps (SPAs) - ASP.NET Core
author: wadepickett
ms.author: wpickett
monikerRange: '>= aspnetcore-6.0'
description: Learn how to get started with Single Page Apps (SPAs) in ASP.NET Core and find links to tutorials for detailed procedures.
ms.date: 04/24/2026
uid: spa/intro

# customer intent: As an ASP.NET developer, I want to get an overview of SPAs in ASP.NET Core, so I can determine the appropriate tutorial to create apps.
---
# Overview of Single Page Apps (SPAs) in ASP.NET Core

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


## Visual Studio tutorials

To get started, follow one of the tutorials in the Visual Studio documentation:

* [Create an ASP.NET Core app with Angular](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-angular)
* [Create an ASP.NET Core app with React](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-react)
* [Create an ASP.NET Core app with Vue](https://learn.microsoft.com/visualstudio/javascript/tutorial-asp-net-core-with-vue)

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

- [Developing Single Page Apps](https://learn.microsoft.com/aspnet/core/client-side/spa/intro?view=aspnetcore-7.0\&preserve-view=true#developing-single-page-apps)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**
<!-- Content from https://github.com/dotnet/AspNetCore.Docs/issues/26373 -->

## Architecture of Single Page Application templates

The Single Page Application (SPA) templates for [Angular](https://angular.dev/) and [React](https://reactjs.org/) offer the ability to develop Angular and React apps that are hosted inside a .NET backend server.

At publish time, the files of the Angular and React app are copied to the `wwwroot` folder and are served via the [static file middleware](../../fundamentals/static-files.md).

Rather than returning HTTP 404 (Not Found), a fallback route handles unknown requests to the backend and serves the `index.html` for the SPA.

During development, the app is configured to use the frontend proxy. React and Angular use the same frontend proxy.

When the app launches, the `index.html` page is opened in the browser. A special middleware that is only enabled in development:

* Intercepts the incoming requests.
* Checks whether the proxy is running.
* Redirects to the URL for the proxy if it's running or launches a new instance of the proxy.
* Returns a page to the browser that auto refreshes every few seconds until the proxy is up and the browser is redirected.

Browser Proxy Server diagram

The primary benefit the ASP.NET Core SPA templates provide:

* Launches a proxy if it's not already running.
* Setting up HTTPS.
* Configuring some requests to be proxied to the backend ASP.NET Core server.

When the browser sends a request for a backend endpoint, for example `/weatherforecast` in the templates. The SPA proxy receives the request and sends it back to the server transparently. The server responds and the SPA proxy sends the request back to the browser:

Proxy Server diagram

## Published Single Page Apps

When the app is published, the SPA becomes a collection of files in the `wwwroot` folder.

There is no runtime component required to serve the app:

[language="csharp" source="\~/client-side/spa/intro/samples/Program.cs" highlight="13,21"::: (complete source file; reference: \~/client-side/spa/intro/samples/Program.cs)](../../../_code/aspnetcore/client-side/spa/intro/samples/Program.cs.md)

In the preceding template generated `Program.cs` file:
* `app.`[Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) allows the files to be served.
* `app.`[Microsoft.AspNetCore.Builder.StaticFilesEndpointRouteBuilderExtensions.MapFallbackToFile%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFilesEndpointRouteBuilderExtensions.MapFallbackToFile%252A)`("index.html")` enables serving the default document for any unknown request the server receives.

When the app is published with [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish), the following tasks in the `csproj` file ensures that [`npm restore`](https://www.npmjs.com/package/restore) runs and that the appropriate npm script runs to generate the production artifacts:

[language="xml" source="\~/client-side/spa/intro/samples/MyReact.csproj" range="27-99"::: (complete source file; reference: \~/client-side/spa/intro/samples/MyReact.csproj)](../../../_code/aspnetcore/client-side/spa/intro/samples/MyReact.csproj.md)

## Developing Single Page Apps

The project file defines a few properties that control the behavior of the app during development:

[language="xml" source="\~/client-side/spa/intro/samples/MyReact.csproj" highlight="11-12,17"::: (complete source file; reference: \~/client-side/spa/intro/samples/MyReact.csproj)](../../../_code/aspnetcore/client-side/spa/intro/samples/MyReact.csproj.md)

* `SpaProxyServerUrl`: Controls the URL where the server expects the SPA proxy to be running. This is the URL:
  * The server pings after launching the proxy to know if it's ready.
  * Where it redirects the browser after a successful response.
* `SpaProxyLaunchCommand`:  The command the server uses to launch the SPA proxy when it detects the proxy is not running.

The package `Microsoft.AspNetCore.SpaProxy` is responsible for the preceding logic to detect the proxy and redirect the browser.

The [hosting startup assembly](../../fundamentals/host/platform-specific-configuration.md) defined in `Properties/launchSettings.json` is used to automatically add the required components during development necessary to detect if the proxy is running and launch it otherwise:

[language="json" source="\~/client-side/spa/intro/samples/launchSettings.json" highlight="17,25"::: (complete source file; reference: \~/client-side/spa/intro/samples/launchSettings.json)](../../../_code/aspnetcore/client-side/spa/intro/samples/launchSettings.json.md)

### Setup for the client app

This setup is specific to the frontend framework the app is using, however many aspects of the configuration are similar.

#### Angular setup

The template generated `ClientApp/package.json` file:

  [language="json" source="\~/client-side/spa/intro/samples/Ang_package.json" highlight="6-9"::: (complete source file; reference: \~/client-side/spa/intro/samples/Ang_package.json)](../../../_code/aspnetcore/client-side/spa/intro/samples/Ang_package.json.md)

* Contains scripts that launching the angular development server:
* The `prestart` script invokes `ClientApp/aspnetcore-https.js`, which is responsible for ensuring the development server HTTPS certificate is available to the SPA proxy server.
* The `start:windows` and `start:default`:

  * Launch the Angular development server via [`ng serve`](https://angular.dev/cli/serve).
  * Provide the port, the options to use HTTPS, and the path to the certificate and the associated key. The provide port number matches the port number specified in the `.csproj` file.

The template generated `ClientApp/angular.json` file contains:

* The `serve` command.
* A `proxyconfig` element in the `development` configuration to indicate that `proxy.conf.js` should be used to configure the frontend proxy, as shown in the following highlighted JSON:

  [language="json" source="\~/client-side/spa/intro/samples/angular.json" highlight="71-80"::: (complete source file; reference: \~/client-side/spa/intro/samples/angular.json)](../../../_code/aspnetcore/client-side/spa/intro/samples/angular.json.md)

`ClientApp/proxy.conf.js` defines the routes that need to be proxied back to the server backend. The general set of options is defined at [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) for react and angular since they both use the same proxy.

The following highlighted code from `ClientApp/proxy.conf.js` uses logic based on the environment variables set during development to determine the port the backend is running on:

  [language="javascript" source="\~/client-side/spa/intro/samples/Ang_proxy.conf.js" highlight="3-4"::: (complete source file; reference: \~/client-side/spa/intro/samples/Ang_proxy.conf.js)](../../../_code/aspnetcore/client-side/spa/intro/samples/Ang_proxy.conf.js.md)

#### React setup

* The `package.json` scripts section contains the following scripts that launches the react app during development, as shown in the following highlighted code:

  [language="json" source="\~/client-side/spa/intro/samples/React_package.json" highlight="51-53"::: (complete source file; reference: \~/client-side/spa/intro/samples/React_package.json)](../../../_code/aspnetcore/client-side/spa/intro/samples/React_package.json.md)

* The `prestart` script invokes:

  * `aspnetcore-https.js`, which is responsible for ensuring the development server HTTPS certificate is available to the SPA proxy server.
  * Invokes `aspnetcore-react.js` to setup the appropriate `.env.development.local` file to use the HTTPS local development certificate. `aspnetcore-react.js` configures the HTTPS local development certificate by adding `SSL_CRT_FILE=<certificate-path>` and `SSL_KEY_FILE=<key-path>` to the file.

* The `.env.development` file defines the port for the development server and specifies HTTPS.

The `src/setupProxy.js` configures the SPA proxy to forward the requests to the backend. The general set of options is defined in [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).

The following highlighted code in `ClientApp/src/setupProxy.js` uses logic based on the environment variables set during development to determine the port the backend is running on:

  [language="javascript" source="\~/client-side/spa/intro/samples/setupProxy.js" highlight="4-5"::: (complete source file; reference: \~/client-side/spa/intro/samples/setupProxy.js)](../../../_code/aspnetcore/client-side/spa/intro/samples/setupProxy.js.md)

## Supported SPA framework version in ASP.NET Core SPA templates

The SPA project templates that ship with each ASP.NET Core release reference the latest version of the appropriate SPA framework.

SPA frameworks typically have a shorter release cycle than .NET. Because of the two different release cycles, the supported version of the SPA framework and .NET can get out of sync: the major SPA framework version, that a .NET major release depends on, can go out of support, while the .NET version the SPA framework shipped with is still supported.

The ASP.NET Core SPA templates can be updated in a patch release to a new SPA framework version to keep the templates in a supported and safe state.

## Additional resources

* [security/authentication/identity/spa](../../security/authentication/identity-api-authorization.md)
* [spa/angular](angular.md)
* [spa/react](react.md)
* [Hosting Startup Assemblies](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23hosting-startup-assemblies)
