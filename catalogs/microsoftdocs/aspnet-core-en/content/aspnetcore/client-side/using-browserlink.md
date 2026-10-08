---
title: Browser link in ASP.NET Core
author: tdykstra
description: Explains how browser link is a Visual Studio feature that links the Development environment with one or more web browsers.
monikerRange: '>= aspnetcore-1.1'
ms.author: tdykstra
ms.date: 06/05/2024
uid: client-side/using-browserlink
---
# Browser link in ASP.NET Core

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


**Applies to: \>= aspnetcore-6.0**

By [Nicolò Carandini](https://github.com/ncarandini) and [Tom Dykstra](https://github.com/tdykstra)

Browser link is a Visual Studio feature. It creates a communication channel between the `Development` environment and one or more web browsers. Use browser link to:

* Refresh your web app in several browsers at once.
* Test across multiple browsers with specific settings such as screen sizes.
* Select UI elements in browsers in real-time, see what markup and source it's correlated to in Visual Studio.
* Conduct real-time browser test automation.

## Runtime compilation vs. hot reload

Use browser Link with [runtime compilation](../mvc/views/view-compilation.md) or [hot reload](../test/hot-reload.md) to see the effect of run-time changes in Razor (`.cshtml`) files. We recommend hot reload.

## How to use browser link

When you have an ASP.NET Core project open, Visual Studio shows the browser link toolbar control next to the **Debug Type** toolbar control:

browser link drop-down menu

From the browser link toolbar control, you can:

* Refresh the web app in several browsers at once.
* Open the **Browser Link Dashboard**.
* Enable or disable **Browser Link**.
* Enable or disable **CSS Hot Reload**.

## Refresh the web app in several browsers at once

To choose a single web browser to launch when starting the project, use the drop-down menu in the **Debug Target** toolbar control:

F5 drop-down menu

To open multiple browsers at once, choose **Browse with...** from the same drop-down. Hold down the <kbd>Ctrl</kbd> key to select the browsers you want, and then click **Browse**:

Open many browsers at once

The following screenshot shows Visual Studio with the Index view open and two open browsers:

Sync with two browsers example

Hover over the browser link toolbar control to see the browsers that are connected to the project:

Hover tip

Change the Index view, and all connected browsers are updated when you click the browser link refresh button:

Browsers sync to changes

browser link also works with browsers that you launch from outside Visual Studio and navigate to the app URL.

## The browser link dashboard

Open the **browser link dashboard** window from the browser link drop down menu to manage the connection with open browsers:

how-to-open-browserlink-dashboard

The connected browsers are shown with the path to the page that each browser is showing:

Browser link dashboard two connections

You can also click on an individual browser name to refresh only that browser.

## Enable or disable browser link

When you re-enable browser link after disabling it, you must refresh the browsers to reconnect them.

## Enable or disable CSS hot reload

When CSS hot reload is enabled, connected browsers are automatically refreshed when you make any change to CSS files.

## How it works

browser link uses [SignalR](../signalr/introduction.md) to create a communication channel between Visual Studio and the browser. When browser link is enabled, Visual Studio acts as a SignalR server that multiple clients (browsers) can connect to. browser link also registers a middleware component in the ASP.NET Core request pipeline. This component injects special `<script>` references into every page request from the server. You can see the script references by selecting **View source** in the browser and scrolling to the end of the `<body>` tag content:

```html
    <!-- Visual Studio browser link -->
    <script type="application/json" id="__browserLink_initializationData">
        {"requestId":"a717d5a07c1741949a7cefd6fa2bad08","requestMappingFromServer":false}
    </script>
    <script type="text/javascript" src="http://localhost:54139/b6e36e429d034f578ebccd6a79bf19bf/browserLink" async="async"></script>
    <!-- End browser link -->
</body>
```

Your source files aren't modified. The middleware component injects the script references dynamically.

Because the browser-side code is all JavaScript, it works on all browsers that SignalR supports without requiring a browser plug-in.



**Applies to: \>= aspnetcore-1.1 < aspnetcore-6.0**

By [Nicolò Carandini](https://github.com/ncarandini) and [Tom Dykstra](https://github.com/tdykstra)

Browser Link is a Visual Studio feature. It creates a communication channel between the `Development` environment and one or more web browsers. Use Browser Link to:

* Refresh your web app in several browsers at once.
* Test across multiple browsers with specific settings such as screen sizes.
* Select UI elements in browsers in real-time, see what markup and source it's correlated to in Visual Studio.
* Conduct real-time browser test automation. Browser Link is also extensible.

## Browser Link setup



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

Add the [Microsoft.VisualStudio.Web.BrowserLink](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.BrowserLink/) package to your project. For ASP.NET Core Razor Pages or MVC projects, also enable runtime compilation of Razor (`.cshtml`) files as described in [mvc/views/view-compilation](../mvc/views/view-compilation.md). Razor syntax changes are applied only when runtime compilation has been enabled.



**Applies to: \>= aspnetcore-2.1 <= aspnetcore-2.2**

When converting an ASP.NET Core 2.0 project to ASP.NET Core 2.1 and transitioning to the [Microsoft.AspNetCore.App metapackage](../fundamentals/metapackage-app.md), install the [Microsoft.VisualStudio.Web.BrowserLink](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.BrowserLink/) package for Browser Link functionality. The ASP.NET Core 2.1 project templates use the `Microsoft.AspNetCore.App` metapackage by default.



**Applies to: \= aspnetcore-2.0**

The ASP.NET Core 2.0 **Web Application**, **Empty**, and **Web API** project templates use the [Microsoft.AspNetCore.All metapackage](../fundamentals/metapackage.md), which contains a package reference for [Microsoft.VisualStudio.Web.BrowserLink](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.BrowserLink/). Therefore, using the `Microsoft.AspNetCore.All` metapackage requires no further action to make Browser Link available for use.



**Applies to: <= aspnetcore-1.1**

The ASP.NET Core 1.x **Web Application** project template has a package reference for the [Microsoft.VisualStudio.Web.BrowserLink](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.BrowserLink/) package. Other project types require you to add a package reference to `Microsoft.VisualStudio.Web.BrowserLink`.



**Applies to: \>= aspnetcore-1.1 < aspnetcore-6.0**

### Configuration

Call `UseBrowserLink` in the `Startup.Configure` method:

```csharp
app.UseBrowserLink();
```

The `UseBrowserLink` call is typically placed inside an `if` block that only enables Browser Link in the `Development` environment. For example:

```csharp
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseBrowserLink();
}
```

For more information, see [fundamentals/environments](../fundamentals/environments.md).

## How to use Browser Link

When you have an ASP.NET Core project open, Visual Studio shows the Browser Link toolbar control next to the **Debug Target** toolbar control:

Browser Link drop-down menu

From the Browser Link toolbar control, you can:

* Refresh the web app in several browsers at once.
* Open the **Browser Link Dashboard**.
* Enable or disable **Browser Link**. Note: Browser Link is disabled by default in Visual Studio.
* Enable or disable [CSS Auto-Sync](#enable-or-disable-css-auto-sync).

## Refresh the web app in several browsers at once

To choose a single web browser to launch when starting the project, use the drop-down menu in the **Debug Target** toolbar control:

F5 drop-down menu

To open multiple browsers at once, choose **Browse with...** from the same drop-down. Hold down the <kbd>Ctrl</kbd> key to select the browsers you want, and then click **Browse**:

Open many browsers at once

The following screenshot shows Visual Studio with the Index view open and two open browsers:

Sync with two browsers example

Hover over the Browser Link toolbar control to see the browsers that are connected to the project:

Hover tip

Change the Index view, and all connected browsers are updated when you click the Browser Link refresh button:

Browsers sync to changes

Browser Link also works with browsers that you launch from outside Visual Studio and navigate to the app URL.

### The Browser Link Dashboard

Open the **Browser Link Dashboard** window from the Browser Link drop down menu to manage the connection with open browsers:

open-browserslink-dashboard

If no browser is connected, you can start a non-debugging session by selecting the **View in Browser** link:

Browserlink dashboard no connections

Otherwise, the connected browsers are shown with the path to the page that each browser is showing:

Browserlink dashboard two connections

You can also click on an individual browser name to refresh only that browser.

### Enable or disable Browser Link

When you re-enable Browser Link after disabling it, you must refresh the browsers to reconnect them.

### Enable or disable CSS Auto-Sync

When CSS Auto-Sync is enabled, connected browsers are automatically refreshed when you make any change to CSS files.

## How it works

Browser Link uses [SignalR](../signalr/introduction.md) to create a communication channel between Visual Studio and the browser. When Browser Link is enabled, Visual Studio acts as a SignalR server that multiple clients (browsers) can connect to. Browser Link also registers a middleware component in the ASP.NET Core request pipeline. This component injects special `<script>` references into every page request from the server. You can see the script references by selecting **View source** in the browser and scrolling to the end of the `<body>` tag content:

```html
    <!-- Visual Studio Browser Link -->
    <script type="application/json" id="__browserLink_initializationData">
        {"requestId":"a717d5a07c1741949a7cefd6fa2bad08","requestMappingFromServer":false}
    </script>
    <script type="text/javascript" src="http://localhost:54139/b6e36e429d034f578ebccd6a79bf19bf/browserLink" async="async"></script>
    <!-- End Browser Link -->
</body>
```

Your source files aren't modified. The middleware component injects the script references dynamically.

Because the browser-side code is all JavaScript, it works on all browsers that SignalR supports without requiring a browser plug-in.
