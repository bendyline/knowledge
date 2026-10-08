---
title: ASP.NET Core Blazor Hybrid
author: guardrex
description: Explore ASP.NET Core Blazor Hybrid, a way to build interactive client-side web UI with .NET in an ASP.NET Core app.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/index
---
# ASP.NET Core Blazor Hybrid

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


This article explains ASP.NET Core Blazor Hybrid, a way to build interactive client-side web UI with .NET in an ASP.NET Core app.

Use *Blazor Hybrid* to blend desktop and mobile native client frameworks with .NET and Blazor.

In a Blazor Hybrid app, [Razor components](../components/index.md) run natively on the device. Components render to an embedded Web View control through a local interop channel. Components don't run in the browser, and WebAssembly isn't involved. Razor components load and execute code quickly, and components have full access to the native capabilities of the device through the .NET platform. Component styles rendered in a Web View are platform dependent and may require you to account for rendering differences across platforms using custom stylesheets.

Blazor Hybrid articles cover subjects pertaining to integrating [Razor components](../components/index.md) into native client frameworks.

## Blazor Hybrid apps with .NET MAUI

Blazor Hybrid support is built into the [.NET Multi-platform App UI (.NET MAUI)](https://learn.microsoft.com/dotnet/maui/what-is-maui) framework. .NET MAUI includes the [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) control that permits rendering [Razor components](../components/index.md) into an embedded Web View. By using .NET MAUI and Blazor together, you can reuse one set of web UI components across mobile, desktop, and web.

## Blazor Hybrid apps with WPF and Windows Forms

Blazor Hybrid apps can be built with [Windows Presentation Foundation (WPF)](https://learn.microsoft.com/dotnet/desktop/wpf/overview/) and [Windows Forms](https://learn.microsoft.com/dotnet/desktop/winforms/overview/). Blazor provides `BlazorWebView` controls for both of these frameworks ([WPF `BlazorWebView`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView), [Windows Forms  `BlazorWebView`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView)). Razor components run natively in the Windows desktop and render to an embedded Web View. Using Blazor in WPF and Windows Forms enables you to add new UI to your existing Windows desktop apps that can be reused across platforms with .NET MAUI or on the web.

## Web View configuration

Blazor Hybrid exposes the underlying Web View configuration for different platforms through events of the `BlazorWebView` control:

* `BlazorWebViewInitializing` provides access to the settings used to create the Web View on each platform, if settings are available.
* `BlazorWebViewInitialized` provides access to the Web View to allow further configuration of the settings.

Use the preferred patterns on each platform to attach event handlers to the events to execute your custom code.

API documentation:

* .NET MAUI
  * [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView.BlazorWebViewInitializing](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView.BlazorWebViewInitializing)
  * [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView.BlazorWebViewInitialized](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView.BlazorWebViewInitialized)
* WPF
  * [Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.BlazorWebViewInitializing](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.BlazorWebViewInitializing)
  * [Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.BlazorWebViewInitialized](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.BlazorWebViewInitialized)
* Windows Forms
  * [Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView.BlazorWebViewInitializing](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView.BlazorWebViewInitializing)
  * [Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView.BlazorWebViewInitialized](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView.BlazorWebViewInitialized)

## Unhandled exceptions in Windows Forms and WPF apps

*This section only applies to Windows Forms and WPF Blazor Hybrid apps.*

Create a callback for `UnhandledException` on the [System.AppDomain.CurrentDomain](https://learn.microsoft.com/search/?terms=System.AppDomain.CurrentDomain) property. The following example uses a [compiler directive](https://learn.microsoft.com/dotnet/csharp/language-reference/preprocessor-directives/preprocessor-if) to display a [System.Windows.Forms.MessageBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MessageBox) that either alerts the user that an error has occurred or shows the error information to the developer. Log the error information in `error.ExceptionObject`.

```csharp
AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
{
#if DEBUG
    MessageBox.Show(text: error.ExceptionObject.ToString(), caption: "Error");
#else
    MessageBox.Show(text: "An error has occurred.", caption: "Error");
#endif
    
    // Log the error information (error.ExceptionObject)
};
```

## Globalization and localization

*This section only applies to .NET MAUI Blazor Hybrid apps.*

.NET MAUI configures the [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) and [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture) based on the device's ambient information.

[Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer) and other API in the [Microsoft.Extensions.Localization](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization) namespace generally work as expected, along with globalization formatting, parsing, and binding that relies on the user's culture.

When dynamically changing the app culture at runtime, the app must be reloaded to reflect the change in culture, which takes care of rerendering the root component and passing the new culture to rerendered child components.

.NET's resource system supports embedding localized images (as blobs) into an app, but Blazor Hybrid can't display the embedded images in Razor components at this time. Even if a user reads an image's bytes into a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) using [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager), the framework doesn't currently support rendering the retrieved image in a Razor component.

For more information, see the following resources:

* [Localization (.NET MAUI documentation)](https://learn.microsoft.com/dotnet/maui/fundamentals/localization)
* [Blazor Image component to display images that are not accessible through HTTP endpoints (dotnet/aspnetcore #25274)](https://github.com/dotnet/aspnetcore/issues/25274)

**Applies to: \>= aspnetcore-8.0**

## Access scoped services from native UI

[Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) has a [Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.TryDispatchAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.TryDispatchAsync%252A) method that calls a specified `Action<ServiceProvider>` asynchronously and passes in the scoped services available in Razor components. This enables code from the native UI to access scoped services such as [Microsoft.AspNetCore.Components.NavigationManager](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager):

```csharp
private async void MyMauiButtonHandler(object sender, EventArgs e)
{
    var wasDispatchCalled = await _blazorWebView.TryDispatchAsync(sp =>
    {
        var navMan = sp.GetRequiredService<NavigationManager>();
        navMan.CallSomeNavigationApi(...);
    });

    if (!wasDispatchCalled)
    {
        ...
    }
}
```

When `wasDispatchCalled` is `false`, consider what to do if the call wasn't dispatched. Generally, the dispatch shouldn't fail. If it fails, OS resources might be exhausted. If resources are exhausted, consider logging a message, throwing an exception, and perhaps alerting the user.



## Additional resources

* [blazor/hybrid/tutorials/index](tutorials/index.md)
* [.NET Multi-platform App UI (.NET MAUI)](https://learn.microsoft.com/dotnet/maui/what-is-maui)
* [Windows Presentation Foundation (WPF)](https://learn.microsoft.com/dotnet/desktop/wpf/overview/)
* [Windows Forms](https://learn.microsoft.com/dotnet/desktop/winforms/overview/)
