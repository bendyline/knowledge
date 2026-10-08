---
title: Build a .NET MAUI Blazor Hybrid app with a Blazor Web App
ai-usage: ai-assisted
author: guardrex
description: Learn how to build a .NET MAUI Blazor Hybrid app with a Blazor Web App that uses a shared user interface via a Razor class library (RCL).
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 08/31/2026
uid: blazor/hybrid/tutorials/maui-blazor-web-app
---
# Build a .NET MAUI Blazor Hybrid app with a Blazor Web App

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


This article shows you how to build a .NET MAUI Blazor Hybrid app with a Blazor Web App that uses a shared user interface via a Razor class library (RCL).

## Prerequisites and preliminary steps

For prerequisites and preliminary steps, see the [Build your first app](https://learn.microsoft.com/dotnet/maui/get-started/first-app) tutorial. We recommend using the .NET MAUI Blazor Hybrid tutorial to set up your local system for .NET MAUI development before using the guidance in this article.

**Applies to: \>= aspnetcore-9.0**

## .NET MAUI Blazor Hybrid and Web App solution template

The .NET MAUI Blazor Hybrid and Web App solution template sets up a solution that targets Android, iOS, Mac, Windows and Web that reuses UI. You can choose a Blazor interactive render mode for the web app and it creates the appropriate projects for the app, including a Blazor Web App and a .NET MAUI Blazor Hybrid app. A shared Razor class library (RCL) maintains the Razor components for the app's UI. The template also provides sample code to show you how to use dependency injection to provide different interface implementations for the Blazor Hybrid and Blazor Web App, which is covered in the [Using interfaces to support different device implementations](#using-interfaces-to-support-different-device-implementations) section of this article.

If you haven't already installed the .NET MAUI workload, install it now. The .NET MAUI workload provides the project template:

```dotnetcli
dotnet workload install maui
```

Create a solution from the project template with the following .NET CLI command, replacing the `{INTERACTIVITY}` placeholder with the Blazor render mode that you desire to use:

* `Server`: Adopts the Interactive Server render mode and produces a single-project Blazor app.
* `WebAssembly`: Adopts the Interactive WebAssembly render mode and produces two Blazor projects, a server project and a `.Client` project.
* `Auto`: Adopts the Interactive Auto render mode and produces two Blazor projects, a server project and a `.Client` project.

For more information on the preceding render modes and the projects produced, see [blazor/components/render-modes#render-modes](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frender-modes%23render-modes) and the [Use Blazor render modes](#use-blazor-render-modes) section later in this article.

```dotnetcli
dotnet new maui-blazor-web -o MauiBlazorWeb -I {INTERACTIVITY}
```

In the preceding command:

* The `-o|--output` option creates a new folder for the app named `MauiBlazorWeb`.
* The `-I|--InteractivityPlatform` option sets the interactivity render mode. The `{INTERACTIVITY}` placeholder is the interactive Blazor render mode. All three interactive Blazor render modes (`Server`, `WebAssembly`, and `Auto`) are supported by the project template. For more information, see [blazor/components/render-modes#render-modes](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frender-modes%23render-modes) and the [Use Blazor render modes](#use-blazor-render-modes) section.

The preceding command produces a Blazor app that adopts global interactivity, which is important because MAUI apps always run interactively and throw errors on Razor component pages that explicitly specify a render mode. For more information, see [BlazorWebView needs a way to enable overriding ResolveComponentForRenderMode (`dotnet/aspnetcore` #51235)](https://github.com/dotnet/aspnetcore/issues/51235).



**Applies to: < aspnetcore-10.0**

## .NET MAUI Blazor Hybrid and Web App sample app

[Obtain the sample app](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps) named `MauiBlazorWeb` from the [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) (`8.0` or `9.0` folder).

The sample app is a starter solution that contains a .NET MAUI Blazor Hybrid (native, cross-platform) app, a Blazor Web App, and a Razor class library (RCL) that contains the shared UI (Razor components) used by the native and web apps.



**Applies to: < aspnetcore-9.0**

## Migrating a .NET MAUI Blazor Hybrid solution

Instead of [using the sample app](#net-maui-blazor-hybrid-and-web-app-sample-app), you can migrate an existing .NET MAUI Blazor Hybrid app with the guidance in this section using Visual Studio.

Add new project to the solution with the **Blazor Web App** project template. Select the following options:

* **Project name**: Use the solution's name with `.Web` appended. The examples in this article assume the following naming:
  * Solution: `MauiBlazorWeb`
  * MAUI project: `MauiBlazorWeb.Maui`
  * Blazor Web App: `MauiBlazorWeb.Web`
  * Razor class library (RCL) (added in a later step): `MauiBlazorWeb.Shared`
* **Authentication type**: **None**
* **Configure for HTTPS**: Selected (enabled)
* **Interactive render mode**: **Server**
* **Interactivity location**: **Global**
* **Sample pages**: Unselected (disabled)

<!-- UPDATE 11.0 Check on PU issue mentioned below and revise accordingly. -->

The **Interactivity location** setting to **Global** is important because MAUI apps always run interactively and throw errors on Razor component pages that explicitly specify a render mode. If you don't use a global render mode, you must implement the approach described in the [Use Blazor render modes](#use-blazor-render-modes) section after following the guidance in this section. For more information, see [BlazorWebView needs a way to enable overriding ResolveComponentForRenderMode (`dotnet/aspnetcore` #51235)](https://github.com/dotnet/aspnetcore/issues/51235).

Add new **Razor class library** (RCL) project to the solution. The examples in this article assume that the project is named `MauiBlazorWeb.Shared`. Don't select **Support pages and views** when you add the project to the solution.

Add project references to the RCL from both MAUI project and the Blazor Web App project.

Move the `Components` folder and all of its contents from the MAUI project to the RCL. Confirm that the `Components` folder is deleted from the MAUI project.

> **Tip:**
> When moving a folder or file in Visual Studio, either use keyboard commands or the shortcut menu by right-clicking for a cut and paste operation. Dragging the folder in Visual Studio only copies from one location to another, which requires an extra step to delete the original.

Move the `css` folder from the `wwwroot` folder of the MAUI project to the RCL's `wwwroot` folder.

Delete the following files from the RCL's `wwwroot` folder:

* `background.png`
* `exampleJsInterop.js`

In the RCL, replace the root imports file (`_Imports.razor`) with the one in the RCL's `Components` folder, overwriting the existing file in the RCL and deleting the original in the `Components` folder. After moving the file, open it and rename the last two `@using` statements to match the RCL's namespace. In the following example, the RCL's namespace is `MauiBlazorWeb.Shared`:

```razor
@using MauiBlazorWeb.Shared
@using MauiBlazorWeb.Shared.Components
```

In the root of the RCL project, delete the following files:

* `Component1.razor`
* `ExampleJsInterop.cs`

In the RCL, open the `Components/Routes.razor` file and change `MauiProgram` to `Routes`:

```diff
- <Router AppAssembly="@typeof(MauiProgram).Assembly">
+ <Router AppAssembly="@typeof(Routes).Assembly">
```

Open the `MainPage.xaml` file in the MAUI project. Add an `xmlns:shared` reference to the RCL in the [Microsoft.Maui.Controls.ContentPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.ContentPage) attributes. In the following example, the RCL's namespace is `MauiBlazorWeb.Shared`. Set the correct value for both the `clr-namespace` and the `assembly`:

```xml
xmlns:shared="clr-namespace:MauiBlazorWeb.Shared;assembly=MauiBlazorWeb.Shared"
```

Also in the `MainPage.xaml` file, update the [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) root component [Microsoft.AspNetCore.Components.WebView.Maui.RootComponent.ComponentType](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.RootComponent.ComponentType) from `local` to `shared`:

```diff
- <RootComponent Selector="#app" ComponentType="{x:Type local:Components.Routes}" />
+ <RootComponent Selector="#app" ComponentType="{x:Type shared:Components.Routes}" />
```

In the MAUI project, open the `wwwroot/index.html` file and change stylesheets to point to the RCL's static asset path.

Remove the following lines:

```diff
- <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
- <link rel="stylesheet" href="css/app.css" />
```

Replace the preceding lines with the following markup. In the following example, the RCL's static asset path is `_content/MauiBlazorWeb.Shared/`:

```razor
<link rel="stylesheet" href="_content/MauiBlazorWeb.Shared/css/bootstrap/bootstrap.min.css" />
<link rel="stylesheet" href="_content/MauiBlazorWeb.Shared/css/app.css" />
```

In the Blazor Web App, open the imports file (`_Imports.razor`) and add the following two `@using` statements for the RCL. In the following example, the RCL's namespace is `MauiBlazorWeb.Shared`:

```razor
@using MauiBlazorWeb.Shared
@using MauiBlazorWeb.Shared.Components
```

In the Blazor Web App project, open the `App` component (`Components/App.razor`). Remove the `app.css` stylesheet:

```diff
- <link rel="stylesheet" href="app.css" />
```

Replace the preceding line with the RCL's static asset stylesheet references. In the following example, the RCL's static asset path is `_content/MauiBlazorWeb.Shared/`:

```
<link rel="stylesheet" href="_content/MauiBlazorWeb.Shared/css/bootstrap/bootstrap.min.css" />
<link rel="stylesheet" href="_content/MauiBlazorWeb.Shared/css/app.css" />
```

In the Blazor Web App project, delete the following folder and files:

* `Components/Layout` folder
* `Components/Routes.razor`
* `Components/Pages/Home.razor`
* `wwwroot/app.css`

Open the Blazor Web App's `Program.cs` file and add an additional assembly for the RCL to the app. In the following example, the RCL's namespace is `MauiBlazorWeb.Shared`:

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddAdditionalAssemblies(typeof(MauiBlazorWeb.Shared._Imports).Assembly);
```

Run the MAUI project by selecting the project in **Solution Explorer** and using Visual Studio's start button.

Run the Blazor Web App project by selecting the Blazor Web App project in **Solution Explorer** and using Visual Studio's start button with the `https` build configuration.

If you receive a build error that the RCL's assembly can't be resolved, build the RCL project first. If any MAUI project resource errors occur on build, rebuild the MAUI project to clear the errors.



## Use Blazor render modes

**Applies to: \>= aspnetcore-9.0**

Use the guidance in one of the following subsections that matches your app's specifications for applying Blazor [render modes](../../components/render-modes.md) in the Blazor Web App but ignore the render mode assignments in the MAUI project.

Render mode specification subsections:

* [Global Server interactivity](#global-server-interactivity)
* [Global Auto or WebAssembly interactivity](#global-auto-or-webassembly-interactivity)
* [Per-page/component Server interactivity](#per-pagecomponent-server-interactivity)
* [Per-page/component Auto interactivity](#per-pagecomponent-auto-interactivity)
* [Per-page/component WebAssembly interactivity](#per-pagecomponent-webassembly-interactivity)



**Applies to: < aspnetcore-9.0**

Use the guidance in one of the following subsections that matches your app's specifications for applying Blazor [render modes](../../components/render-modes.md) for a given interactivity location in the Blazor Web App but ignore the render mode assignments in the MAUI project.

Render mode and interactivity specification subsections:

* [Global Server interactivity](#global-server-interactivity)
* [Global Auto or WebAssembly interactivity](#global-auto-or-webassembly-interactivity)
* [Per-page/component Server interactivity](#per-pagecomponent-server-interactivity)
* [Per-page/component Auto interactivity](#per-pagecomponent-auto-interactivity)
* [Per-page/component WebAssembly interactivity](#per-pagecomponent-webassembly-interactivity)



### Global Server interactivity

**Applies to: \>= aspnetcore-9.0**

* Interactive render mode: **Server**
* Interactivity location: **Global**
* Solution projects
  * MAUI (`MauiBlazorWeb`)
  * Blazor Web App (`MauiBlazorWeb.Web`)
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components without setting render modes in each component.

Project references: `MauiBlazorWeb` and `MauiBlazorWeb.Web` have a project reference to `MauiBlazorWeb.Shared`.



**Applies to: < aspnetcore-9.0**

* Interactive render mode: **Server**
* Interactivity location: **Global**
* Solution projects
  * MAUI (`MauiBlazorWeb.Maui`)
  * Blazor Web App (`MauiBlazorWeb.Web`)
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components without setting render modes in each component.

Project references: `MauiBlazorWeb.Maui` and `MauiBlazorWeb.Web` have a project reference to `MauiBlazorWeb.Shared`.



### Global Auto or WebAssembly interactivity

**Applies to: \>= aspnetcore-9.0**

* Interactive render mode: **Auto** or **WebAssembly**
* Interactivity location: **Global**
* Solution projects
  * MAUI (`MauiBlazorWeb`)
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components without setting render modes in each component.

Project references:

* `MauiBlazorWeb`, `MauiBlazorWeb.Web`, and `MauiBlazorWeb.Web.Client` projects have a project reference to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.



**Applies to: < aspnetcore-9.0**

* Interactive render mode: **Auto** or **WebAssembly**
* Interactivity location: **Global**
* Solution projects
  * MAUI (`MauiBlazorWeb.Maui`)
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components without setting render modes in each component.

Project references:

* `MauiBlazorWeb.Maui`, `MauiBlazorWeb.Web`, and `MauiBlazorWeb.Web.Client` projects have a project reference to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.



**Applies to: \>= aspnetcore-9.0**

### Per-page/component Server interactivity

* Interactive render mode: **Server**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb`): Calls `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` in `MauiProgram.cs`.
  * Blazor Web App (`MauiBlazorWeb.Web`): Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components that set the `InteractiveServer` render mode in each component.

`MauiBlazorWeb` and `MauiBlazorWeb.Web` have a project reference to `MauiBlazorWeb.Shared`.

Add the following `InteractiveRenderSettings` class to the RCL. The class properties are used to set component render modes.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode). When the components are loaded into a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp 
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared` RCL, replace the `@using` statement for [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) in the Blazor Web App's `_Import` file.

### Per-page/component Auto interactivity

* Interactive render mode: **Auto**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb`): Calls `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` in `MauiProgram.cs`.
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`: Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components that set the `InteractiveAuto` render mode in each component.

Project references:

* `MauiBlazorWeb`, `MauiBlazorWeb.Web`, and `MauiBlazorWeb.Web.Client` have a project reference to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.

Add the following `InteractiveRenderSettings` class is added to the RCL. The class properties are used to set component render modes.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode). When the components are loaded into a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp 
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared.Client` RCL, replace the `@using` statement for [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) in the Blazor Web App's `_Import` file.

### Per-page/component WebAssembly interactivity

* Interactive render mode: **WebAssembly**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb`)
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`: Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCLs
    * `MauiBlazorWeb.Shared`
    * `MauiBlazorWeb.Shared.Client`: Contains the shared Razor components that set the `InteractiveWebAssembly` render mode in each component. The `.Shared.Client` RCL is maintained separately from the `.Shared` RCL because the app should maintain the components that are required to run on WebAssembly separately from the components that run on server and that stay on the server.

Project references:

* `MauiBlazorWeb` and `MauiBlazorWeb.Web` have project references to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.
* `MauiBlazorWeb.Web.Client` and `MauiBlazorWeb.Shared` have a project reference to `MauiBlazorWeb.Shared.Client`.

Add the following [Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies%252A) parameter to the `Router` component instance for the `MauiBlazorWeb.Shared.Client` project assembly (via its imports file, `_Imports.razor`) in the `MauiBlazorWeb.Shared` project's `Routes.razor` file:



**Applies to: \>= aspnetcore-10.0**

```razor
<Router AppAssembly="@typeof(Routes).Assembly" NotFoundPage="typeof(Pages.NotFound)" 
        AdditionalAssemblies="new [] { typeof(MauiBlazorWeb.Shared.Client._Imports).Assembly }">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(Components.Layout.MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
</Router>
```



**Applies to: \>= aspnetcore-9.0 < aspnetcore-10.0**

```razor
<Router AppAssembly="@typeof(Routes).Assembly" 
        AdditionalAssemblies="new [] { typeof(MauiBlazorWeb.Shared.Client._Imports).Assembly }">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(Components.Layout.MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
</Router>
```



**Applies to: \>= aspnetcore-9.0**

Add the `MauiBlazorWeb.Shared.Client` project assembly (via its imports file, `_Imports.razor`) with the following [Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilderExtensions.AddAdditionalAssemblies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilderExtensions.AddAdditionalAssemblies%252A) call in the `MauiBlazorWeb.Web` project's `Program.cs` file:

```csharp
app.MapRazorComponents<App>()    
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(MauiBlazorWeb.Shared._Imports).Assembly)
    .AddAdditionalAssemblies(typeof(MauiBlazorWeb.Shared.Client._Imports).Assembly); 
```

Add the following `InteractiveRenderSettings` class is added to the `.Shared.Client` RCL. The class properties are used to set component render modes for server-based components.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode). When the components are loaded into a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs` (`.Shared.Client` RCL):

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

A slightly different version of the `InteractiveRenderSettings` class is added to the `.Shared` RCL. In the class added to the `.Shared` RCL, `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` of the `.Shared.Client` RCL is called. This ensures that the render mode of WebAssembly components rendered on the MAUI client are unassigned (`null`) because they're interactive by default on the native client.

`InteractiveRenderSettings.cs` (`.Shared` RCL):

```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

namespace MauiBlazorWeb.Shared
{
    public static class InteractiveRenderSettings
    {
        public static IComponentRenderMode? InteractiveServer { get; set; } = 
            RenderMode.InteractiveServer;
        public static IComponentRenderMode? InteractiveAuto { get; set; } = 
            RenderMode.InteractiveAuto;
        public static IComponentRenderMode? InteractiveWebAssembly { get; set; } = 
            RenderMode.InteractiveWebAssembly;

        public static void ConfigureBlazorHybridRenderModes()
        {
            InteractiveServer = null;
            InteractiveAuto = null;
            InteractiveWebAssembly = null;
            MauiBlazorWeb.Shared.Client.InteractiveRenderSettings
                .ConfigureBlazorHybridRenderModes();
        }
    }
}
```

In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp 
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared.Client` RCL, replace the `@using` statement for [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) in the Blazor Web App's `_Import` file.



**Applies to: < aspnetcore-9.0**

### Per-page/component Server interactivity

* Interactive render mode: **Server**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb.Maui`): Calls `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` in `MauiProgram.cs`.
  * Blazor Web App (`MauiBlazorWeb.Web`): Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components that set the `InteractiveServer` render mode in each component.

`MauiBlazorWeb.Maui` and `MauiBlazorWeb.Web` have a project reference to `MauiBlazorWeb.Shared`.

Add the following `InteractiveRenderSettings` class to the RCL. The class properties are used to set component render modes.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode). When the components are loaded into a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp 
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared` RCL, replace the `@using` statement for [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) in the Blazor Web App's `_Import` file.

### Per-page/component Auto interactivity

* Interactive render mode: **Auto**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb.Maui`): Calls `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` in `MauiProgram.cs`.
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`: Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components that set the `InteractiveAuto` render mode in each component.

Project references:

* `MauiBlazorWeb.Maui`, `MauiBlazorWeb.Web`, and `MauiBlazorWeb.Web.Client` have a project reference to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.

Add the following `InteractiveRenderSettings` class is added to the RCL. The class properties are used to set component render modes.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode). When the components are loaded into a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp 
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared` RCL, replace the `@using` statement for [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) in the Blazor Web App's `_Import` file.

### Per-page/component WebAssembly interactivity

* Interactive render mode: **WebAssembly**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb.Maui`)
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`: Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCLs
    * `MauiBlazorWeb.Shared`
    * `MauiBlazorWeb.Shared.Client`: Contains the shared Razor components that set the `InteractiveWebAssembly` render mode in each component. The `.Shared.Client` RCL is maintained separately from the `.Shared` RCL because the app should maintain the components that are required to run on WebAssembly separately from the components that run on server and that stay on the server.

Project references:

* `MauiBlazorWeb.Maui` and `MauiBlazorWeb.Web` have project references to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.
* `MauiBlazorWeb.Web.Client` and `MauiBlazorWeb.Shared` have a project reference to `MauiBlazorWeb.Shared.Client`.

Add the following [Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies%252A) parameter to the `Router` component instance for the `MauiBlazorWeb.Shared.Client` project assembly (via its imports file, `_Imports.razor`) in the `MauiBlazorWeb.Shared` project's `Routes.razor` file:

```razor
<Router AppAssembly="@typeof(Routes).Assembly" 
        AdditionalAssemblies="new [] { typeof(MauiBlazorWeb.Shared.Client._Imports).Assembly }">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(Components.Layout.MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
</Router>
```

Add the `MauiBlazorWeb.Shared.Client` project assembly (via its imports file, `_Imports.razor`) with the following [Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilderExtensions.AddAdditionalAssemblies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilderExtensions.AddAdditionalAssemblies%252A) call in the `MauiBlazorWeb.Web` project's `Program.cs` file:

```csharp
app.MapRazorComponents<App>()    
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(MauiBlazorWeb.Shared._Imports).Assembly)
    .AddAdditionalAssemblies(typeof(MauiBlazorWeb.Shared.Client._Imports).Assembly); 
```

Add the following `InteractiveRenderSettings` class is added to the `.Shared.Client` RCL. The class properties are used to set component render modes for server-based components.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode). When the components are loaded into a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs` (`.Shared.Client` RCL):

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

A slightly different version of the `InteractiveRenderSettings` class is added to the `.Shared` RCL. In the class added to the `.Shared` RCL, `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` of the `.Shared.Client` RCL is called. This ensures that the render mode of WebAssembly components rendered on the MAUI client are unassigned (`null`) because they're interactive by default on the native client.

`InteractiveRenderSettings.cs` (`.Shared` RCL):

```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

namespace MauiBlazorWeb.Shared
{
    public static class InteractiveRenderSettings
    {
        public static IComponentRenderMode? InteractiveServer { get; set; } = 
            RenderMode.InteractiveServer;
        public static IComponentRenderMode? InteractiveAuto { get; set; } = 
            RenderMode.InteractiveAuto;
        public static IComponentRenderMode? InteractiveWebAssembly { get; set; } = 
            RenderMode.InteractiveWebAssembly;

        public static void ConfigureBlazorHybridRenderModes()
        {
            InteractiveServer = null;
            InteractiveAuto = null;
            InteractiveWebAssembly = null;
            MauiBlazorWeb.Shared.Client.InteractiveRenderSettings
                .ConfigureBlazorHybridRenderModes();
        }
    }
}
```

In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp 
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared.Client` RCL, replace the `@using` statement for [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by [Microsoft.AspNetCore.Components.Web.RenderMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.RenderMode) via in the Blazor Web App's `_Import` file.



## Using interfaces to support different device implementations

The following example demonstrates how to use an interface to call into different implementations across the web app and the native (MAUI) app. The following example creates a component that displays the device form factor. Use the MAUI abstraction layer for native apps and provide an implementation for the web app.

**Applies to: \>= aspnetcore-9.0**

In the Razor class library (RCL), a `Services` folder contains an `IFormFactor` interface.

`Services/IFormFactor.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Shared/Services/IFormFactor.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

The `Home` component (`Components/Pages/Home.razor`) of the RCL displays the form factor and platform.

`Components/Pages/Home.razor`:

```razor
@page "/"
@using MauiBlazorWeb.Shared.Services
@inject IFormFactor FormFactor

<PageTitle>Home</PageTitle>

<h1>Hello, world!</h1>

Welcome to your new app running on <em>@factor</em> using <em>@platform</em>.

@code {
    private string factor => FormFactor.GetFormFactor();
    private string platform => FormFactor.GetPlatform();
}
```



**Applies to: < aspnetcore-9.0**

In the Razor class library (RCL), an `Interfaces` folder contains an `IFormFactor` interface.

`Interfaces/IFormFactor.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/MauiBlazorWeb/MauiBlazorWeb.Shared/Interfaces/IFormFactor.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

The following `DeviceFormFactor` component is present in the RCL's `Components` folder.

`Components/Pages/DeviceFormFactor.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/MauiBlazorWeb/MauiBlazorWeb.Shared/Components/Pages/DeviceFormFactor.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)

In the RCL, an entry for the `DeviceFormFactor` component is part of the navigation menu in the `NavMenu` component.

In `Components/Layout/NavMenu.razor`:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="device-form-factor">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Form Factor
    </NavLink>
</div>
```



The web and native apps contain the implementations for `IFormFactor`.

In the Blazor Web App, a folder named `Services` contains the following `FormFactor.cs` file with the `FormFactor` implementation for web app use.

`Services/FormFactor.cs` (`MauiBlazorWeb.Web` project):

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Web/Services/FormFactor.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)



**Applies to: < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/MauiBlazorWeb/MauiBlazorWeb.Web/Services/FormFactor.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)



In the MAUI project, a folder named `Services` contains the following `FormFactor.cs` file with the `FormFactor` implementation for native use. The MAUI abstractions layer is used to write code that works on all native device platforms.

**Applies to: \>= aspnetcore-9.0**

`Services/FormFactor.cs` (`MauiBlazorWeb` project):

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb/Services/FormFactor.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)



**Applies to: < aspnetcore-9.0**

`Services/FormFactor.cs` (`MauiBlazorWeb.Maui` project):

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/MauiBlazorWeb/MauiBlazorWeb.Maui/Services/FormFactor.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md)



Dependency injection is used to obtain the implementations of these services.

In the MAUI project, the `MauiProgram.cs` file has following `using` statements at the top of the file:

**Applies to: \>= aspnetcore-9.0**

```csharp
using MauiBlazorWeb.Services;
using MauiBlazorWeb.Shared.Interfaces;
```



**Applies to: < aspnetcore-9.0**

```csharp
using MauiBlazorWeb.Maui.Services;
using MauiBlazorWeb.Shared.Interfaces;
```



Immediately before the call to `builder.Build()`, `FormFactor` is registered to add device-specific services used by the RCL:

```csharp
builder.Services.AddSingleton<IFormFactor, FormFactor>();
```

In the Blazor Web App, the `Program` file has the following `using` statements at the top of the file:

```csharp
using MauiBlazorWeb.Shared.Interfaces;
using MauiBlazorWeb.Web.Services;  
```

Immediately before the call to `builder.Build()`, `FormFactor` is registered to add device-specific services used by the Blazor Web App:

```csharp
builder.Services.AddScoped<IFormFactor, FormFactor>();
```

If the solution also targets WebAssembly via a `.Web.Client` project, an implementation of the preceding API is also required in the `.Web.Client` project.

You can also use compiler preprocessor directives in your RCL to implement different UI depending on the device the app is running on. For this scenario, the app must multi-target the RCL just like the MAUI app does. For an example, see the [`BethMassi/BethTimeUntil` GitHub repository](https://github.com/BethMassi/BethTimeUntil).

## Additional resources

* [blazor/hybrid/security/index](../security/index.md)
* [blazor/components/render-modes](../../components/render-modes.md)
* [blazor/hybrid/reuse-razor-components](../reuse-razor-components.md)
