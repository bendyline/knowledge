---
title: Reuse Razor components in ASP.NET Core Blazor Hybrid apps
author: guardrex
description: Learn how to author and organize Razor components for the web and Web Views in Blazor Hybrid apps.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/reuse-razor-components
---
# Reuse Razor components in ASP.NET Core Blazor Hybrid

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


This article explains how to author and organize Razor components for the web and Web Views in Blazor Hybrid apps.

Razor components work across hosting models (Blazor WebAssembly, Blazor Server, and in the Web View of Blazor Hybrid) and across platforms (Android, iOS, and Windows). Hosting models and platforms have unique capabilities that components can leverage, but components executing across hosting models and platforms must leverage unique capabilities separately, which the following examples demonstrate:

* Blazor WebAssembly supports synchronous JavaScript (JS) interop, which isn't supported by the strictly asynchronous JS interop communication channel in Blazor Server and Web Views of Blazor Hybrid apps.
* Components in a Blazor Server app can access services that are only available on the server, such as an Entity Framework database context.
* Components in a `BlazorWebView` can directly access native desktop and mobile device features, such as geolocation services. Blazor Server and Blazor WebAssembly apps must rely upon web API interfaces of apps on external servers to provide similar features.

## Design principles

In order to author Razor components that can seamlessly work across hosting models and platforms, adhere to the following design principles:

* Place shared UI code in Razor class libraries (RCLs), which are containers designed to maintain reusable pieces of UI for use across different hosting models and platforms.
* Implementations of unique features shouldn't exist in RCLs. Instead, the RCL should define abstractions (interfaces and base classes) that hosting models and platforms implement.
* Only opt-in to unique features by hosting model or platform. For example, Blazor WebAssembly supports the use of [Microsoft.JSInterop.IJSInProcessRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessRuntime) and [Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference) in a component as an optimization, but only use them with conditional casts and fallback implementations that rely on the universal [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) and [Microsoft.JSInterop.IJSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSObjectReference) abstractions that all hosting models and platforms support. For more information on [Microsoft.JSInterop.IJSInProcessRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessRuntime), see [blazor/js-interop/call-javascript-from-dotnet#synchronous-js-interop-in-client-side-components](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23synchronous-js-interop-in-client-side-components). For more information on [Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference), see [blazor/js-interop/call-dotnet-from-javascript#synchronous-js-interop-in-client-side-components](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-dotnet-from-javascript%23synchronous-js-interop-in-client-side-components).
* As a general rule, use CSS for HTML styling in components. The most common case is for consistency in the look and feel of an app. In places where UI styles must differ across hosting models or platforms, use CSS to style the differences.
* If some part of the UI requires additional or different content for a target hosting model or platform, the content can be encapsulated inside a component and rendered inside the RCL using [`DynamicComponent`](../components/dynamiccomponent.md). Additional UI can also be provided to components via [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) instances. For more information on [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment), see [Child content render fragments](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23child-content-render-fragments) and [Render fragments for reusable rendering logic](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23render-fragments-for-reusable-rendering-logic).

## Project code organization

As much as possible, place code and static content in Razor class libraries (RCLs). Each hosting model or platform references the RCL and registers individual implementations in the app's service collection that a Razor component might require.

Each target assembly should contain only the code that is specific to that hosting model or platform along with the code that helps bootstrap the app.

Blazor WebAssembly, Blazor Server, and WebView each have a project reference for the Razor class library (RCL).

## Use abstractions for unique features

The following example demonstrates how to use an abstraction for a geolocation service by hosting model and platform.

* In a Razor class library (RCL) used by the app to obtain geolocation data for the user's location on a map, the `MapComponent` Razor component injects an `ILocationService` service abstraction.
* `App.Web` for Blazor WebAssembly and Blazor Server projects implement `ILocationService` as `WebLocationService`, which uses web API calls to obtain geolocation data.
* `App.Desktop` for .NET MAUI, WPF, and Windows Forms, implement `ILocationService` as `DesktopLocationService`. `DesktopLocationService` uses platform-specific device features to obtain geolocation data.

In a Razor class library (RCL), MapComponent injects an ILocationService service. Separately, App.Web (Blazor WebAssembly and Blazor Server projects) implement ILocationService as WebLocationService. Separately, App.Desktop (.NET MAUI, WPF, Windows Forms) implement ILocationService as DesktopLocationService.

## .NET MAUI Blazor platform-specific code

A common pattern in .NET MAUI is to create separate implementations for different platforms, such as defining partial classes with platform-specific implementations. For example, see the following diagram, where partial classes for `CameraService` are implemented in each of `CameraService.Windows.cs`, `CameraService.iOS.cs`, `CameraService.Android.cs`, and `CameraService.cs`:

Partial classes for CameraService are implemented in each of CameraService.Windows.cs, CameraService.iOS.cs, CameraService.Android.cs, and CameraService.cs.

Where you want to pack platform-specific features into a class library that can be consumed by other apps, we recommend that you follow a similar approach to the one described in the preceding example and create an abstraction for the Razor component:

* Place the component in a Razor class library (RCL).
* From a .NET MAUI class library, reference the RCL and create the platform-specific implementations.
* Within the consuming app, reference the .NET MAUI class library.

The following example demonstrates the concepts for images in an app that organizes photographs:

* A .NET MAUI Blazor Hybrid app uses `InputPhoto` from an RCL that it references.
* The .NET MAUI app also references a .NET MAUI class library.
* `InputPhoto` in the RCL injects an `ICameraService` interface, which is defined in the RCL.
* `CameraService` partial class implementations for `ICameraService` are in the .NET MAUI class library (`CameraService.Windows.cs`, `CameraService.iOS.cs`, `CameraService.Android.cs`), which references the RCL.

A .NET MAUI Blazor Hybrid app uses InputPhoto from a Razor class library (RCL) that it references. The .NET MAUI app also references a .NET MAUI class library. InputPhoto in the RCL injects an ICameraService interface defined in the RCL. CameraService partial class implementations for ICameraService are in the .NET MAUI class library (CameraService.Windows.cs, CameraService.iOS.cs, CameraService.Android.cs), which references the RCL.

**Applies to: \>= aspnetcore-8.0**

For an example, see [blazor/hybrid/tutorials/maui-blazor-web-app#using-interfaces-to-support-different-device-implementations](https://learn.microsoft.com/search/?terms=blazor%2Fhybrid%2Ftutorials%2Fmaui-blazor-web-app%23using-interfaces-to-support-different-device-implementations).



## Additional resources

* [blazor/hybrid/class-libraries-best-practices](class-libraries-best-practices.md)
* eShop Reference Application (AdventureWorks): The .NET MAUI Blazor Hybrid app is in the `src/HybridApp` folder.
  * For Azure hosting: [`Azure-Samples/eShopOnAzure` GitHub repository](https://github.com/Azure-Samples/eShopOnAzure)
  * For general non-Azure hosting: [`dotnet/eShop` GitHub repository](https://github.com/dotnet/eShop).
