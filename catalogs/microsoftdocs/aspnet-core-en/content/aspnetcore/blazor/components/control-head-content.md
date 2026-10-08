---
title: Control head content in ASP.NET Core Blazor apps
author: guardrex
description: Learn how to control head content in Blazor apps, including how to set the page title from a component.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/control-head-content
---
# Control `<head>` content in ASP.NET Core Blazor apps

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


Razor components can modify the HTML `<head>` element content of a page, including setting the page's title (`<title>` element) and modifying metadata (`<meta>` elements).

## Control `<head>` content in a Razor component

Specify the page's title with the [Microsoft.AspNetCore.Components.Web.PageTitle](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.PageTitle) component, which enables rendering an HTML `<title>` element to a [`HeadOutlet` component](#headoutlet-component).
    
Specify `<head>` element content with the [Microsoft.AspNetCore.Components.Web.HeadContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadContent) component, which provides content to a [`HeadOutlet` component](#headoutlet-component).

The following example sets the page's title and description using Razor.

`ControlHeadContent.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ControlHeadContent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/control-head-content.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/ControlHeadContent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/control-head-content.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/control-head-content/ControlHeadContent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/control-head-content.md)



**Applies to: < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/control-head-content/ControlHeadContent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/control-head-content.md)



**Applies to: < aspnetcore-7.0**

## Control `<head>` content during prerendering

*This section applies to prerendered Blazor WebAssembly apps and Blazor Server apps.*

When Razor components are prerendered, the use of a layout page (`_Layout.cshtml`) is required to control `<head>` content with the [Microsoft.AspNetCore.Components.Web.PageTitle](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.PageTitle) and [Microsoft.AspNetCore.Components.Web.HeadContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadContent) components. The reason for this requirement is that components that control `<head>` content must be rendered before the layout with the [Microsoft.AspNetCore.Components.Web.HeadOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadOutlet) component. **This order of rendering is required to control head content.**

If the shared `_Layout.cshtml` file doesn't have a [Component Tag Helper](../../mvc/views/tag-helpers/built-in/component-tag-helper.md) for a [Microsoft.AspNetCore.Components.Web.HeadOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadOutlet) component, add it to the `<head>` elements.

In a **required**, shared `_Layout.cshtml` file of a Blazor Server app or Razor Pages/MVC app that embeds components into pages or views:

```cshtml
<component type="typeof(HeadOutlet)" render-mode="ServerPrerendered" />
```

In a **required**, shared `_Layout.cshtml` file of a prerendered hosted Blazor WebAssembly app:

```cshtml
<component type="typeof(HeadOutlet)" render-mode="WebAssemblyPrerendered" />
```



## Set a page title for components via a layout

Set the page title in a [layout component](layouts.md):

```razor
@inherits LayoutComponentBase

<PageTitle>Page Title</PageTitle>

<div class="page">
    ...  
</div>
```

## `HeadOutlet` component

The [Microsoft.AspNetCore.Components.Web.HeadOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadOutlet) component renders content provided by [Microsoft.AspNetCore.Components.Web.PageTitle](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.PageTitle) and [Microsoft.AspNetCore.Components.Web.HeadContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadContent) components.

**Applies to: \>= aspnetcore-8.0**

In a Blazor Web App created from the project template, the [Microsoft.AspNetCore.Components.Web.HeadOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadOutlet) component in `App.razor` renders `<head>` content:

```razor
<head>
    ...
    <HeadOutlet />
</head>
```



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

In Blazor Server apps created from the Blazor Server project template, a [Component Tag Helper](../../mvc/views/tag-helpers/built-in/component-tag-helper.md) renders `<head>` content for the [Microsoft.AspNetCore.Components.Web.HeadOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadOutlet) component in `Pages/_Host.cshtml`:

```cshtml
<head>
    ...
    <component type="typeof(HeadOutlet)" render-mode="ServerPrerendered" />
</head>
```



**Applies to: < aspnetcore-7.0**

In Blazor Server apps created from the Blazor Server project template, a [Component Tag Helper](../../mvc/views/tag-helpers/built-in/component-tag-helper.md) renders `<head>` content for the [Microsoft.AspNetCore.Components.Web.HeadOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadOutlet) component in `Pages/_Layout.cshtml`:

```cshtml
<head>
    ...
    <component type="typeof(HeadOutlet)" render-mode="ServerPrerendered" />
</head>
```



In an app created from the Blazor WebAssembly project template, the [Microsoft.AspNetCore.Components.Web.HeadOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HeadOutlet) component is added to the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents) collection of the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder) in the client-side `Program` file:

```csharp
builder.RootComponents.Add<HeadOutlet>("head::after");
```

When the [`::after` pseudo-selector](https://developer.mozilla.org/docs/Web/CSS/::after) is specified, the contents of the root component are appended to the existing head contents instead of replacing the content. This allows the app to retain static head content in `wwwroot/index.html` without having to repeat the content in the app's Razor components.

**Applies to: \>= aspnetcore-8.0**

## Set a default page title in a Blazor Web App

Set the page title in the `App` component (`App.razor`):

```razor
<head>
    ...
    <HeadOutlet />
    <PageTitle>Page Title</PageTitle>
</head>
```



## Not found page title in a Blazor WebAssembly app

**Applies to: \>= aspnetcore-8.0**

In Blazor apps created from the Blazor WebAssembly Standalone App project template, the `NotFound` component template in the `App` component (`App.razor`) sets the page title to `Not found`.



**Applies to: < aspnetcore-8.0**

In Blazor apps created from a Blazor project template, the `NotFound` component template in the `App` component (`App.razor`) sets the page title to `Not found`.



`App.razor`:

```razor
<NotFound>
    <PageTitle>Not found</PageTitle>
    ...
</NotFound>
```

## Additional resources

* [Control headers in C# code at startup](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23control-headers-in-c-code)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))

Mozilla MDN Web Docs documentation:

* [What's in the head? Metadata in HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)
* [`<head>`: The Document Metadata (Header) element](https://developer.mozilla.org/docs/Web/HTML/Element/head)
* [`<title>`: The Document Title element](https://developer.mozilla.org/docs/Web/HTML/Element/title)
* [`<meta>`: The metadata element](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
