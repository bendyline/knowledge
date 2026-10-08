---
title: ASP.NET Core Blazor project structure
author: guardrex
description: Learn about ASP.NET Core Blazor app project structure.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/project-structure
---
# ASP.NET Core Blazor project structure

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


This article describes the files and folders that make up a Blazor app generated from a Blazor project template.

**Applies to: \>= aspnetcore-8.0**

## Blazor Web App

Blazor Web App project template: `blazor`

The Blazor Web App project template provides a single starting point for using Razor components (`.razor`) to build any style of web UI, both server-side rendered and client-side rendered. It combines the strengths of Blazor Server and Blazor WebAssembly with server-side and client-side rendering, streaming rendering, enhanced navigation and form handling, and the ability to add interactivity using either Blazor Server or Blazor WebAssembly on a per-component basis.

If both client-side rendering (CSR) and interactive server-side rendering (interactive SSR) are selected on app creation, the project template uses the Interactive Auto render mode. The automatic rendering mode initially uses interactive SSR while the .NET app bundle and runtime are downloaded to the browser. After the .NET WebAssembly runtime is activated, rendering switches to CSR.

The Blazor Web App template enables both static and interactive server-side rendering using a single project. If you also enable Interactive WebAssembly rendering, the project includes an additional client project (`.Client`) for your WebAssembly-based components. The built output from the client project is downloaded to the browser and executed on the client. Components using the Interactive WebAssembly or Interactive Auto render modes must be located in the `.Client` project.

The component folder structure of the `.Client` project differs from the Blazor Web App's main project folder structure because the main project is a standard ASP.NET Core project. The main project must take into account other assets for ASP.NET Core projects that are unrelated to Blazor. You're welcome to use whatever component folder structure you wish in the `.Client` project. You're free to mirror the component folder layout of the main project in the `.Client` project if you wish. Note that namespaces might require adjustments for such assets as layout files if you move components into different folders than the project template uses.

More information on components and render modes is found in the [blazor/components/index](components/index.md) and [blazor/components/render-modes](components/render-modes.md) articles.

Based on the interactive render mode selected at app creation, the `Layout` folder is either in the server project in the `Components` folder or at the root of the `.Client` project. The folder contains the following layout components and stylesheets:



**Applies to: \>= aspnetcore-10.0**

* The `MainLayout` component (`MainLayout.razor`) is the app's [layout component](components/layouts.md).
* The `MainLayout.razor.css` is the collocated (next to the component) stylesheet for the app's main layout.
* The `NavMenu` component (`NavMenu.razor`) implements sidebar navigation. The component includes [`NavLink` components](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which render navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component indicates to the user which component is currently displayed.
* The `NavMenu.razor.css` is the collocated stylesheet for the app's navigation menu.
* The `ReconnectModal` component reflects the server-side connection state in the UI and is included when the app's interactive render mode is either Interactive Server or Interactive Auto. For more information, see [blazor/fundamentals/signalr#reflect-the-server-side-connection-state-in-the-ui](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23reflect-the-server-side-connection-state-in-the-ui).
* The `ReconnectModal.razor.css` is the collocated stylesheet for the `ReconnectModal` component.
* The `ReconnectModal.razor.js` is the collocated JavaScript file for the `ReconnectModal` component.



**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

* The `MainLayout` component (`MainLayout.razor`) is the app's [layout component](components/layouts.md).
* The `MainLayout.razor.css` is the collocated (next to the component) stylesheet for the app's main layout.
* The `NavMenu` component (`NavMenu.razor`) implements sidebar navigation. The component includes [`NavLink` components](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which render navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component indicates to the user which component is currently displayed.
* The `NavMenu.razor.css` is the collocated stylesheet for the app's navigation menu.



**Applies to: \>= aspnetcore-8.0**

The `Routes` component (`Routes.razor`) is either in the server project or the `.Client` project and sets up routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. For client-side interactive components, the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

The `Components` folder of the server project holds the app's server-side Razor components. Shared components are often placed at the root of the `Components` folder, while layout and page components are usually placed in folders within the `Components` folder.

The `Components/Pages` folder of the server project contains the app's routable server-side Razor components. The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive.



**Applies to: \>= aspnetcore-10.0**

The `NotFound` component (`NotFound.razor`) implements a Not Found page to display when content isn't found for a request path. For more information, see [blazor/fundamentals/navigation#not-found-responses](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23not-found-responses).



**Applies to: \>= aspnetcore-8.0**

The `App` component (`App.razor`) is the root component of the app with HTML `<head>` markup, the `Routes` component, and the Blazor `<script>` tag. The root component is the first component that the app loads.

An imports file (`_Imports.razor`) in each of the server and `.Client` projects includes common Razor directives for Razor components of either project, such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

The `Properties` folder of the server project holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


The `wwwroot` folder of the server project is the [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the server project that holds the app's public static assets.

The `Program.cs` file of the server project is the project's entry point that sets up the ASP.NET Core web application [host](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23host-definition) and contains the app's startup logic, including service registrations, configuration, logging, and request processing pipeline:

* Services for Razor components are added by calling [Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A). [Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%252A) adds services to support rendering Interactive Server components. [Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddInteractiveWebAssemblyComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddInteractiveWebAssemblyComponents%252A) adds services to support rendering Interactive WebAssembly components.
* [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) discovers available components and specifies the root component for the app (the first component loaded), which by default is the `App` component (`App.razor`). [Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%252A) configures interactive server-side rendering (interactive SSR) for the app. [Microsoft.AspNetCore.Builder.WebAssemblyRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveWebAssemblyRenderMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebAssemblyRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveWebAssemblyRenderMode%252A) configures the Interactive WebAssembly render mode for the app.

The app settings files (`appsettings.Development.json`, `appsettings.json`) in either the server or `.Client` project provide [configuration settings](fundamentals/configuration.md). In the server project, settings files are at the root of the project. In the `.Client` project, settings files are consumed from the [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder, `wwwroot`. 

In the `.Client` project:

* The `Pages` folder contains routable client-side Razor components. The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive.

* The `wwwroot` folder is the [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the `.Client` project that holds the app's public static assets.

* The `Program.cs` file is the project's entry point that sets up the WebAssembly [host](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fgeneric-host%23host-definition) and contains the project's startup logic, including service registrations, configuration, logging, and request processing pipeline.

Additional files and folders may appear in an app produced from a Blazor Web App project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.



**Applies to: < aspnetcore-8.0**

## Blazor Server



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

Blazor Server project templates: `blazorserver`, `blazorserver-empty`

The Blazor Server templates create the initial files and directory structure for a Blazor Server app:

* If the `blazorserver` template is used, the app is populated with the following:
  * Demonstration code for a `FetchData` component that loads data from a weather forecast service (`WeatherForecastService`) and user interaction with a `Counter` component.
  * [Bootstrap](https://getbootstrap.com/) frontend toolkit.
* If the `blazorserver-empty` template is used, the app is created without demonstration code and Bootstrap.

Project structure:

* `Data` folder: Contains the `WeatherForecast` class and implementation of the `WeatherForecastService` that provides example weather data to the app's `FetchData` component.

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`) and the root Razor page of a Blazor Server app. The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following:
  * `_Host.cshtml`: The root page of the app implemented as a Razor Page:
    * When any page of the app is initially requested, this page is rendered and returned in the response.
    * The Host page specifies where the root `App` component (`App.razor`) is rendered.
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `Error` component (`Error.razor`): Rendered when an unhandled exception occurs in the app.
  * `FetchData` component (`FetchData.razor`): Implements the Fetch data page.
  * `Index` component (`Index.razor`): Implements the Home page.

* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `Shared` folder: Contains the following shared components and stylesheets:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `MainLayout.razor.css`: Stylesheet for the app's main layout.
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `NavMenu.razor.css`: Stylesheet for the app's navigation menu.
  * `SurveyPrompt` component (`SurveyPrompt.razor`): Blazor survey component.

* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets.

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

* `appsettings.json` and environmental app settings files: Provide [configuration settings](fundamentals/configuration.md) for the app.

* `Program.cs`: The app's entry point that sets up the ASP.NET Core [host](../fundamentals/host/generic-host.md) and contains the app's startup logic, including service registrations and request processing pipeline configuration:

  * Specifies the app's [dependency injection (DI)](../fundamentals/dependency-injection.md) services. Services are added by calling [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A), and the `WeatherForecastService` is added to the service container for use by the example `FetchData` component.
  * Configures the app's request handling pipeline:
    * [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) is called to set up an endpoint for the real-time connection with the browser. The connection is created with [SignalR](../signalr/introduction.md), which is a framework for adding real-time web functionality to apps.
    * [`MapFallbackToPage("/_Host")`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapFallbackToPage%252A) is called to set up the root page of the app (`Pages/_Host.cshtml`) and enable navigation.

Additional files and folders may appear in an app produced from a Blazor Server project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

Blazor Server project template: `blazorserver`

The Blazor Server template creates the initial files and directory structure for a Blazor Server app. The app is populated with demonstration code for a `FetchData` component that loads data from a registered service, `WeatherForecastService`, and user interaction with a `Counter` component.

* `Data` folder: Contains the `WeatherForecast` class and implementation of the `WeatherForecastService` that provides example weather data to the app's `FetchData` component.

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`) and the root Razor page of a Blazor Server app. The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following:
  * `_Host.cshtml`: The root page of the app implemented as a Razor Page:
    * When any page of the app is initially requested, this page is rendered and returned in the response.
    * The Host page specifies where the root `App` component (`App.razor`) is rendered.
  * `_Layout.cshtml`: The layout page for the `_Host.cshtml` root page of the app.
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `Error` component (`Error.razor`): Rendered when an unhandled exception occurs in the app.
  * `FetchData` component (`FetchData.razor`): Implements the Fetch data page.
  * `Index` component (`Index.razor`): Implements the Home page.

* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `Shared` folder: Contains the following shared components and stylesheets:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `MainLayout.razor.css`: Stylesheet for the app's main layout.
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `NavMenu.razor.css`: Stylesheet for the app's navigation menu.
  * `SurveyPrompt` component (`SurveyPrompt.razor`): Blazor survey component.

* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets.

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

* `appsettings.json` and environmental app settings files: Provide [configuration settings](fundamentals/configuration.md) for the app.

* `Program.cs`: The app's entry point that sets up the ASP.NET Core [host](../fundamentals/host/generic-host.md) and contains the app's startup logic, including service registrations and request processing pipeline configuration:

  * Specifies the app's [dependency injection (DI)](../fundamentals/dependency-injection.md) services. Services are added by calling [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A), and the `WeatherForecastService` is added to the service container for use by the example `FetchData` component.
  * Configures the app's request handling pipeline:
    * [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) is called to set up an endpoint for the real-time connection with the browser. The connection is created with [SignalR](../signalr/introduction.md), which is a framework for adding real-time web functionality to apps.
    * [`MapFallbackToPage("/_Host")`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapFallbackToPage%252A) is called to set up the root page of the app (`Pages/_Host.cshtml`) and enable navigation.

Additional files and folders may appear in an app produced from a Blazor Server project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

Blazor Server project template: `blazorserver`

The Blazor Server template creates the initial files and directory structure for a Blazor Server app. The app is populated with demonstration code for a `FetchData` component that loads data from a registered service, `WeatherForecastService`, and user interaction with a `Counter` component.

* `Data` folder: Contains the `WeatherForecast` class and implementation of the `WeatherForecastService` that provides example weather data to the app's `FetchData` component.

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`) and the root Razor page of a Blazor Server app. The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following:
  * `_Host.cshtml`: The root page of the app implemented as a Razor Page:
    * When any page of the app is initially requested, this page is rendered and returned in the response.
    * The Host page specifies where the root `App` component (`App.razor`) is rendered.
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `Error` component (`Error.razor`): Rendered when an unhandled exception occurs in the app.
  * `FetchData` component (`FetchData.razor`): Implements the Fetch data page.
  * `Index` component (`Index.razor`): Implements the Home page.

* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `Shared` folder: Contains the following shared components and stylesheets:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `MainLayout.razor.css`: Stylesheet for the app's main layout.
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `NavMenu.razor.css`: Stylesheet for the app's navigation menu.
  * `SurveyPrompt` component (`SurveyPrompt.razor`): Blazor survey component.

* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets.

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

* `appsettings.json` and environmental app settings files: Provide [configuration settings](fundamentals/configuration.md) for the app.

* `Program.cs`: The app's entry point that sets up the ASP.NET Core [host](../fundamentals/host/generic-host.md).

* `Startup.cs`: Contains the app's startup logic. The `Startup` class defines two methods:

  * `ConfigureServices`: Configures the app's [dependency injection (DI)](../fundamentals/dependency-injection.md) services. Services are added by calling [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A), and the `WeatherForecastService` is added to the service container for use by the example `FetchData` component.
  * `Configure`: Configures the app's request handling pipeline:
    * [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) is called to set up an endpoint for the real-time connection with the browser. The connection is created with [SignalR](../signalr/introduction.md), which is a framework for adding real-time web functionality to apps.
    * [`MapFallbackToPage("/_Host")`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapFallbackToPage%252A) is called to set up the root page of the app (`Pages/_Host.cshtml`) and enable navigation.

Additional files and folders may appear in an app produced from a Blazor Server project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.



**Applies to: < aspnetcore-5.0**

Blazor Server project template: `blazorserver`

The Blazor Server template creates the initial files and directory structure for a Blazor Server app. The app is populated with demonstration code for a `FetchData` component that loads data from a registered service, `WeatherForecastService`, and user interaction with a `Counter` component.

* `Data` folder: Contains the `WeatherForecast` class and implementation of the `WeatherForecastService` that provides example weather data to the app's `FetchData` component.

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`) and the root Razor page of a Blazor Server app. The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following:
  * `_Host.cshtml`: The root page of the app implemented as a Razor Page:
    * When any page of the app is initially requested, this page is rendered and returned in the response.
    * The Host page specifies where the root `App` component (`App.razor`) is rendered.
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `Error` component (`Error.razor`): Rendered when an unhandled exception occurs in the app.
  * `FetchData` component (`FetchData.razor`): Implements the Fetch data page.
  * `Index` component (`Index.razor`): Implements the Home page.

* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `Shared` folder: Contains the following shared components:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `SurveyPrompt` component (`SurveyPrompt.razor`): Blazor survey component.

* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets.

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

* `appsettings.json` and environmental app settings files: Provide [configuration settings](fundamentals/configuration.md) for the app.

* `Program.cs`: The app's entry point that sets up the ASP.NET Core [host](../fundamentals/host/generic-host.md).

* `Startup.cs`: Contains the app's startup logic. The `Startup` class defines two methods:

  * `ConfigureServices`: Configures the app's [dependency injection (DI)](../fundamentals/dependency-injection.md) services. Services are added by calling [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A), and the `WeatherForecastService` is added to the service container for use by the example `FetchData` component.
  * `Configure`: Configures the app's request handling pipeline:
    * [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) is called to set up an endpoint for the real-time connection with the browser. The connection is created with [SignalR](../signalr/introduction.md), which is a framework for adding real-time web functionality to apps.
    * [`MapFallbackToPage("/_Host")`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapFallbackToPage%252A) is called to set up the root page of the app (`Pages/_Host.cshtml`) and enable navigation.

Additional files and folders may appear in an app produced from a Blazor Server project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.



**Applies to: \>= aspnetcore-8.0**

## Standalone Blazor WebAssembly

Standalone Blazor WebAssembly project template: `blazorwasm`

The Blazor WebAssembly template creates the initial files and directory structure for a standalone Blazor WebAssembly app:

* If the `blazorwasm` template is used, the app is populated with the following:
  * Demonstration code for a `Weather` component that loads data from a static asset (`weather.json`) and user interaction with a `Counter` component.
  * [Bootstrap](https://getbootstrap.com/) frontend toolkit.
* The `blazorwasm` template can also be generated without sample pages and styling.

Project structure:

* `Layout` folder: Contains the following layout components and stylesheets:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `MainLayout.razor.css`: Stylesheet for the app's main layout.
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `NavMenu.razor.css`: Stylesheet for the app's navigation menu.



**Applies to: \>= aspnetcore-10.0**

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`). The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following components:
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `Index` component (`Index.razor`): Implements the Home page.
  * `Weather` component (`Weather.razor`): Implements the Weather page.
  * `NotFound` component (`NotFound.razor`): Implements a Not Found page to display when content isn't found for a request path. For more information, see [blazor/fundamentals/navigation#not-found-responses](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23not-found-responses).



**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`). The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following components:
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `Index` component (`Index.razor`): Implements the Home page.
  * `Weather` component (`Weather.razor`): Implements the Weather page.



**Applies to: \>= aspnetcore-8.0**

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.
  
* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets, including `appsettings.json` and environmental app settings files for [configuration settings](fundamentals/configuration.md) and sample weather data (`sample-data/weather.json`). The `index.html` webpage is the root page of the app implemented as an HTML page:
  * When any page of the app is initially requested, this page is rendered and returned in the response.
  * The page specifies where the root `App` component is rendered. The component is rendered at the location of the `div` DOM element with an `id` of `app` (`<div id="app">Loading...</div>`).

* `Program.cs`: The app's entry point that sets up the WebAssembly host:
  
  * The `App` component is the root component of the app. The `App` component is specified as the `div` DOM element with an `id` of `app` (`<div id="app">Loading...</div>` in `wwwroot/index.html`) to the root component collection (`builder.RootComponents.Add<App>("#app")`).
  * [Services](fundamentals/dependency-injection.md) are added and configured (for example, `builder.Services.AddSingleton<IMyDependency, MyDependency>()`).

Additional files and folders may appear in an app produced from a Blazor WebAssembly project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

## Blazor WebAssembly

Blazor WebAssembly project templates: `blazorwasm`, `blazorwasm-empty`

The Blazor WebAssembly templates create the initial files and directory structure for a Blazor WebAssembly app:

* If the `blazorwasm` template is used, the app is populated with the following:
  * Demonstration code for a `FetchData` component that loads data from a static asset (`weather.json`) and user interaction with a `Counter` component.
  * [Bootstrap](https://getbootstrap.com/) frontend toolkit.
* If the `blazorwasm-empty` template is used, the app is created without demonstration code and Bootstrap.

Project structure:

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`). The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following components:
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `FetchData` component (`FetchData.razor`): Implements the Fetch data page.
  * `Index` component (`Index.razor`): Implements the Home page.
  
* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `Shared` folder: Contains the following shared components and stylesheets:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `MainLayout.razor.css`: Stylesheet for the app's main layout.
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `NavMenu.razor.css`: Stylesheet for the app's navigation menu.
  * `SurveyPrompt` component (`SurveyPrompt.razor`) (*ASP.NET Core in .NET 7 or earlier*): Blazor survey component.

* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets, including `appsettings.json` and environmental app settings files for [configuration settings](fundamentals/configuration.md). The `index.html` webpage is the root page of the app implemented as an HTML page:
  * When any page of the app is initially requested, this page is rendered and returned in the response.
  * The page specifies where the root `App` component is rendered. The component is rendered at the location of the `div` DOM element with an `id` of `app` (`<div id="app">Loading...</div>`).

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

* `Program.cs`: The app's entry point that sets up the WebAssembly host:
  
  * The `App` component is the root component of the app. The `App` component is specified as the `div` DOM element with an `id` of `app` (`<div id="app">Loading...</div>` in `wwwroot/index.html`) to the root component collection (`builder.RootComponents.Add<App>("#app")`).
  * [Services](fundamentals/dependency-injection.md) are added and configured (for example, `builder.Services.AddSingleton<IMyDependency, MyDependency>()`).

Additional files and folders may appear in an app produced from a Blazor WebAssembly project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

A *hosted Blazor WebAssembly solution* includes the following ASP.NET Core projects:

* "Client": The Blazor WebAssembly app.
* "Server": An app that serves the Blazor WebAssembly app and weather data to clients.
* "Shared": A project that maintains common classes, methods, and resources.

The solution is generated from the Blazor WebAssembly project template in Visual Studio with the **ASP.NET Core Hosted** checkbox selected or with the `-ho|--hosted` option using the .NET CLI's `dotnet new blazorwasm` command. For more information, see [blazor/tooling](tooling.md).

The project structure of the client-side app in a hosted Blazor Webassembly solution ("Client" project) is the same as the project structure for a standalone Blazor WebAssembly app. Additional files in a hosted Blazor WebAssembly solution:

* The "Server" project includes a weather forecast controller at `Controllers/WeatherForecastController.cs` that returns weather data to the "Client" project's `FetchData` component.
* The "Shared" project includes a weather forecast class at `WeatherForecast.cs` that represents weather data for the "Client" and "Server" projects.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

## Blazor WebAssembly

Blazor WebAssembly project template: `blazorwasm`

The Blazor WebAssembly template creates the initial files and directory structure for a Blazor WebAssembly app. The app is populated with demonstration code for a `FetchData` component that loads data from a static asset, `weather.json`, and user interaction with a `Counter` component.

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`). The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following components:
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `FetchData` component (`FetchData.razor`): Implements the Fetch data page.
  * `Index` component (`Index.razor`): Implements the Home page.
  
* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `Shared` folder: Contains the following shared components and stylesheets:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `MainLayout.razor.css`: Stylesheet for the app's main layout.
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `NavMenu.razor.css`: Stylesheet for the app's navigation menu.
  * `SurveyPrompt` component (`SurveyPrompt.razor`): Blazor survey component.

* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets, including `appsettings.json` and environmental app settings files for [configuration settings](fundamentals/configuration.md). The `index.html` webpage is the root page of the app implemented as an HTML page:
  * When any page of the app is initially requested, this page is rendered and returned in the response.
  * The page specifies where the root `App` component is rendered. The component is rendered at the location of the `div` DOM element with an `id` of `app` (`<div id="app">Loading...</div>`).

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

* `Program.cs`: The app's entry point that sets up the WebAssembly host:
  
  * The `App` component is the root component of the app. The `App` component is specified as the `div` DOM element with an `id` of `app` (`<div id="app">Loading...</div>` in `wwwroot/index.html`) to the root component collection (`builder.RootComponents.Add<App>("#app")`).
  * [Services](fundamentals/dependency-injection.md) are added and configured (for example, `builder.Services.AddSingleton<IMyDependency, MyDependency>()`).

Additional files and folders may appear in an app produced from a Blazor WebAssembly project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.

A *hosted Blazor WebAssembly solution* includes the following ASP.NET Core projects:

* "Client": The Blazor WebAssembly app.
* "Server": An app that serves the Blazor WebAssembly app and weather data to clients.
* "Shared": A project that maintains common classes, methods, and resources.

The solution is generated from the Blazor WebAssembly project template in Visual Studio with the **ASP.NET Core Hosted** checkbox selected or with the `-ho|--hosted` option using the .NET CLI's `dotnet new blazorwasm` command. For more information, see [blazor/tooling](tooling.md).

The project structure of the client-side app in a hosted Blazor Webassembly solution ("Client" project) is the same as the project structure for a standalone Blazor WebAssembly app. Additional files in a hosted Blazor WebAssembly solution:

* The "Server" project includes a weather forecast controller at `Controllers/WeatherForecastController.cs` that returns weather data to the "Client" project's `FetchData` component.
* The "Shared" project includes a weather forecast class at `WeatherForecast.cs` that represents weather data for the "Client" and "Server" projects.



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

## Blazor WebAssembly

Blazor WebAssembly project template: `blazorwasm`

The Blazor WebAssembly template creates the initial files and directory structure for a Blazor WebAssembly app. The app is populated with demonstration code for a `FetchData` component that loads data from a static asset, `weather.json`, and user interaction with a `Counter` component.

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`). The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following components:
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `FetchData` component (`FetchData.razor`): Implements the Fetch data page.
  * `Index` component (`Index.razor`): Implements the Home page.
  
* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `Shared` folder: Contains the following shared components and stylesheets:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `MainLayout.razor.css`: Stylesheet for the app's main layout.
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `NavMenu.razor.css`: Stylesheet for the app's navigation menu.
  * `SurveyPrompt` component (`SurveyPrompt.razor`): Blazor survey component.

* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets, including `appsettings.json` and environmental app settings files for [configuration settings](fundamentals/configuration.md). The `index.html` webpage is the root page of the app implemented as an HTML page:
  * When any page of the app is initially requested, this page is rendered and returned in the response.
  * The page specifies where the root `App` component is rendered. The component is rendered at the location of the `div` DOM element with an `id` of `app` (`<div id="app">Loading...</div>`).

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

* `Program.cs`: The app's entry point that sets up the WebAssembly host:
  
  * The `App` component is the root component of the app. The `App` component is specified as the `div` DOM element with an `id` of `app` (`<div id="app">Loading...</div>` in `wwwroot/index.html`) to the root component collection (`builder.RootComponents.Add<App>("#app")`).
  * [Services](fundamentals/dependency-injection.md) are added and configured (for example, `builder.Services.AddSingleton<IMyDependency, MyDependency>()`).

Additional files and folders may appear in an app produced from a Blazor WebAssembly project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.

A *hosted Blazor WebAssembly solution* includes the following ASP.NET Core projects:

* "Client": The Blazor WebAssembly app.
* "Server": An app that serves the Blazor WebAssembly app and weather data to clients.
* "Shared": A project that maintains common classes, methods, and resources.

The solution is generated from the Blazor WebAssembly project template in Visual Studio with the **ASP.NET Core Hosted** checkbox selected or with the `-ho|--hosted` option using the .NET CLI's `dotnet new blazorwasm` command. For more information, see [blazor/tooling](tooling.md).

The project structure of the client-side app in a hosted Blazor Webassembly solution ("Client" project) is the same as the project structure for a standalone Blazor WebAssembly app. Additional files in a hosted Blazor WebAssembly solution:

* The "Server" project includes a weather forecast controller at `Controllers/WeatherForecastController.cs` that returns weather data to the "Client" project's `FetchData` component.
* The "Shared" project includes a weather forecast class at `WeatherForecast.cs` that represents weather data for the "Client" and "Server" projects.



**Applies to: < aspnetcore-5.0**

## Blazor WebAssembly

Blazor WebAssembly project template: `blazorwasm`

The Blazor WebAssembly template creates the initial files and directory structure for a Blazor WebAssembly app. The app is populated with demonstration code for a `FetchData` component that loads data from a static asset, `weather.json`, and user interaction with a `Counter` component.

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`). The route for each page is specified using the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. The template includes the following components:
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `FetchData` component (`FetchData.razor`): Implements the Fetch data page.
  * `Index` component (`Index.razor`): Implements the Home page.
  
* `Properties` folder: Holds [development environment configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23development-and-launchsettingsjson) in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.


* `Shared` folder: Contains the following shared components:
  * `MainLayout` component (`MainLayout.razor`): The app's [layout component](components/layouts.md).
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the [`NavLink` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component) ([Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink)), which renders navigation links to other Razor components. The [Microsoft.AspNetCore.Components.Routing.NavLink](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NavLink) component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `SurveyPrompt` component (`SurveyPrompt.razor`): Blazor survey component.

* `wwwroot` folder: The [Web Root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) folder for the app containing the app's public static assets, including `appsettings.json` and environmental app settings files for [configuration settings](fundamentals/configuration.md). The `index.html` webpage is the root page of the app implemented as an HTML page:
  * When any page of the app is initially requested, this page is rendered and returned in the response.
  * The page specifies where the root `App` component is rendered. The component is rendered at the location of the `app` DOM element (`<app>Loading...</app>`).

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component. The [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component intercepts browser navigation and renders the page that matches the requested address.

* `Program.cs`: The app's entry point that sets up the WebAssembly host:

  * The `App` component is the root component of the app. The `App` component is specified as the `app` DOM element (`<app>Loading...</app>` in `wwwroot/index.html`) to the root component collection (`builder.RootComponents.Add<App>("app")`).
  * [Services](fundamentals/dependency-injection.md) are added and configured (for example, `builder.Services.AddSingleton<IMyDependency, MyDependency>()`).

Additional files and folders may appear in an app produced from a Blazor WebAssembly project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.

A *hosted Blazor WebAssembly solution* includes the following ASP.NET Core projects:

* "Client": The Blazor WebAssembly app.
* "Server": An app that serves the Blazor WebAssembly app and weather data to clients.
* "Shared": A project that maintains common classes, methods, and resources.

The solution is generated from the Blazor WebAssembly project template in Visual Studio with the **ASP.NET Core Hosted** checkbox selected or with the `-ho|--hosted` option using the .NET CLI's `dotnet new blazorwasm` command. For more information, see [blazor/tooling](tooling.md).

The project structure of the client-side app in a hosted Blazor Webassembly solution ("Client" project) is the same as the project structure for a standalone Blazor WebAssembly app. Additional files in a hosted Blazor WebAssembly solution:

* The "Server" project includes a weather forecast controller at `Controllers/WeatherForecastController.cs` that returns weather data to the "Client" project's `FetchData` component.
* The "Shared" project includes a weather forecast class at `WeatherForecast.cs` that represents weather data for the "Client" and "Server" projects.



## Location of the Blazor script

**Applies to: \>= aspnetcore-10.0**

The Blazor script is served as a static web asset with automatic compression and fingerprinting. For more information, see [blazor/fundamentals/static-files](fundamentals/static-files.md).

In a Blazor Web App, the Blazor script is located in the `Components/App.razor` file:

```razor
<script src="@Assets["_framework/blazor.web.js"]"></script>
```

In a Blazor Server app, the Blazor script is located in the `Pages/_Host.cshtml` file:

```html
<script src="_framework/blazor.server.js"></script>
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

The Blazor script is served from an embedded resource in the ASP.NET Core shared framework.

In a Blazor Web App, the Blazor script is located in the `Components/App.razor` file:

```razor
<script src="_framework/blazor.web.js"></script>
```

In a Blazor Server app, the Blazor script is located in the `Pages/_Host.cshtml` file:

```html
<script src="_framework/blazor.server.js"></script>
```



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

The Blazor script is served from an embedded resource in the ASP.NET Core shared framework.

In a Blazor Server app, the Blazor script is located in the `Pages/_Host.cshtml` file:

```html
<script src="_framework/blazor.server.js"></script>
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

The Blazor script is served from an embedded resource in the ASP.NET Core shared framework.

In a Blazor Server app, the Blazor script is located in the `Pages/_Layout.cshtml` file:

```html
<script src="_framework/blazor.server.js"></script>
```



**Applies to: < aspnetcore-6.0**

The Blazor script is served from an embedded resource in the ASP.NET Core shared framework.

In a Blazor Server app, the Blazor script is located in the `Pages/_Host.cshtml` file:

```html
<script src="_framework/blazor.server.js"></script>
```



For a Blazor Web App or a Blazor Server app, the project must contain at least one Razor component file (`.razor`) in order to automatically include the Blazor script when the app is published. If the project doesn't contain at least one Razor component, set the `RequiresAspNetWebAssets` MSBuild property to `true` in the app's project file to include the Blazor script:

```xml
<RequiresAspNetWebAssets>true</RequiresAspNetWebAssets>
```

In a Blazor WebAssembly app, the Blazor script content is located in the `wwwroot/index.html` file:

**Applies to: \>= aspnetcore-10.0**

```html
<script src="_framework/blazor.webassembly#[.{fingerprint}].js"></script>
```

When the app is published, the `{fingerprint}` placeholder is automatically replaced with a unique hash for cache busting.



**Applies to: < aspnetcore-10.0**

```html
<script src="_framework/blazor.webassembly.js"></script>
```



## Location of `<head>` and `<body>` content

**Applies to: \>= aspnetcore-8.0**

In a Blazor Web App, `<head>` and `<body>` content is located in the `Components/App.razor` file.



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

In a Blazor Server app, `<head>` and `<body>` content is located in the `Pages/_Host.cshtml` file.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

In a Blazor Server app, `<head>` and `<body>` content is located in the `Pages/_Layout.cshtml` file.



**Applies to: < aspnetcore-6.0**

In a Blazor Server app, `<head>` and `<body>` content is located in the `Pages/_Host.cshtml` file.



In a Blazor WebAssembly app, `<head>` and `<body>` content is located in the `wwwroot/index.html` file.

**Applies to: < aspnetcore-8.0**

## Dual Blazor Server/Blazor WebAssembly app

To create an app that can run as either a Blazor Server app or a Blazor WebAssembly app, one approach is to place all of the app logic and components into a [Razor class library (RCL)](components/class-libraries.md) and reference the RCL from separate Blazor Server and Blazor WebAssembly projects. For common services whose implementations differ based on the hosting model, define the service interfaces in the RCL and implement the services in the Blazor Server and Blazor WebAssembly projects.



## Additional resources

**Applies to: \>= aspnetcore-7.0**

* [blazor/tooling](tooling.md)
* [blazor/hosting-models](hosting-models.md)
* [fundamentals/apis](../fundamentals/apis.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))



**Applies to: < aspnetcore-7.0**

* [blazor/tooling](tooling.md)
* [blazor/hosting-models](hosting-models.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))
