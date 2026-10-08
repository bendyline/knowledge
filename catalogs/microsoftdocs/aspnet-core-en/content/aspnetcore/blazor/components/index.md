---
title: ASP.NET Core Razor components
ai-usage: ai-assisted
author: guardrex
description: Learn how to create and use Razor components in Blazor apps, including guidance on Razor syntax, component naming, namespaces, and component parameters.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 07/14/2026
uid: blazor/components/index
---
# ASP.NET Core Razor components

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


This article explains how to create and use Razor components in Blazor apps, including guidance on Razor syntax, component naming, namespaces, and component parameters.

## Razor components

Blazor apps are built using *Razor components*, informally known as *Blazor components* or only *components*. A component is a self-contained portion of user interface (UI) with processing logic to enable dynamic behavior. Components can be nested, reused, shared among projects, and used in MVC and Razor Pages apps.

Components render into an in-memory representation of the browser's [Document Object Model (DOM)](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) called a *render tree*, which is used to update the UI in a flexible and efficient way.

Although "Razor components" shares some naming with other ASP.NET Core content-rendering technologies, Razor components must be distinguished from the following different features in ASP.NET Core:

* [Razor views](../../tutorials/first-mvc-app/adding-view.md), which are [Razor-based](../../mvc/views/razor.md) markup pages for MVC apps.
* [View components](../../mvc/views/view-components.md), which are for rendering chunks of content rather than whole responses in Razor Pages and MVC apps.

**Applies to: \>= aspnetcore-8.0**

> **Important:**
> When using a Blazor Web App, most of the Blazor documentation example components ***require*** interactivity to function and demonstrate the concepts covered by the articles. *Interactivity* makes it possible for users to interact with rendered components. This includes app responses to [Document Object Model (DOM)](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) events and state changes tied to C# members via Blazor's event handlers and binding. When you test an example component provided by an article in a Blazor Web App, make sure that either the app adopts global interactivity or the component adopts an interactive render mode. More information on this subject is provided by [blazor/components/render-modes](render-modes.md), which is the next article in the table of contents after this article.



## Component classes

Components are implemented using a combination of C# and HTML markup in [Razor](../../mvc/views/razor.md) component files with the `.razor` file extension.

[Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase) is the base class for components described by Razor component files. [Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase) implements the lowest abstraction of components, the [Microsoft.AspNetCore.Components.IComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.IComponent) interface. [Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase) defines component properties and methods for basic functionality, for example, to process a set of built-in component lifecycle events.

[`ComponentBase` in `dotnet/aspnetcore` reference source](https://github.com/dotnet/aspnetcore/blob/main/src/Components/Components/src/ComponentBase.cs): The reference source contains additional remarks on the built-in lifecycle events. However, keep in mind that the internal implementations of component features are subject to change at any time without notice.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


Developers typically create Razor components from Razor component files (`.razor`) or base their components on [Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase), but components can also be built by implementing [Microsoft.AspNetCore.Components.IComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.IComponent). Developer-built components that implement [Microsoft.AspNetCore.Components.IComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.IComponent) can take low-level control over rendering at the cost of having to manually trigger rendering with events and lifecycle methods that the developer must create and maintain.

Additional conventions adopted by Blazor documentation example code and sample apps is found in [blazor/fundamentals/index#razor-components](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23razor-components).

### Razor syntax

Components use [Razor syntax](../../mvc/views/razor.md). Two Razor features are extensively used by components, *directives* and *directive attributes*. These are reserved keywords prefixed with `@` that appear in Razor markup:

* [Directives](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23directives): Change the way component markup is compiled or functions. For example, the [`@page`][9] directive specifies a routable component with a route template that can be reached directly by a user's request in the browser at a specific URL.

  By convention, a component's directives at the top of a component definition (`.razor` file) are placed in a consistent order. For repeated directives, directives are placed alphabetically by namespace or type, except `@using` directives, which have special second-level ordering.
  
  The following order is adopted by Blazor sample apps and documentation. Components provided by a Blazor project template may differ from the following order and use a different format. For example, Blazor framework Identity components include blank lines between blocks of `@using` directives and blocks of `@inject` directives. You're free to use a custom ordering scheme and format in your own apps.

  Documentation and sample app Razor directive order:

  * `@page`
  * `@rendermode` (.NET 8 or later)
  * `@using`
    * `System` namespaces (alphabetical order)
    * `Microsoft` namespaces (alphabetical order)
    * Third-party API namespaces (alphabetical order)
    * App namespaces (alphabetical order)
  * Other directives (alphabetical order)

  > **Note:**
  > A *render mode* is only applied in Blazor Web Apps and includes modes that establish user interactivity with the rendered component. For more information, see [blazor/components/render-modes](render-modes.md).

  No blank lines appear among the directives. One blank line appears between the directives and the first line of Razor markup.

  Example:

  ```razor
  @page "/doctor-who-episodes/{season:int}"
  @rendermode InteractiveWebAssembly
  @using System.Globalization
  @using System.Text.Json
  @using Microsoft.AspNetCore.Localization
  @using Mandrill
  @using BlazorSample.Components.Layout
  @attribute [Authorize]
  @implements IAsyncDisposable
  @inject IJSRuntime JS
  @inject ILogger<DoctorWhoEpisodes> Logger

  <PageTitle>Doctor Who Episode List</PageTitle>

  ...
  ```

* [Directive attributes](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23directive-attributes): Change the way a component element is compiled or functions.

  Example:

  ```razor
  <input @bind="episodeId" />
  ```

  You can prefix directive attribute values with the at symbol (`@`) for non-explicit Razor expressions (`@bind="@episodeId"`), but we don't recommend it, and the docs don't adopt the approach in examples. 

Directives and directive attributes used in components are explained further in this article and other articles of the Blazor documentation set. For general information on Razor syntax, see [mvc/views/razor](../../mvc/views/razor.md).

### Component name, class name, and namespace

**Applies to: \>= aspnetcore-8.0**

A component's name must start with an uppercase character:

<span aria-hidden="true">✔️</span><span class="visually-hidden">Supported:</span> `ProductDetail.razor`

<span aria-hidden="true">❌</span><span class="visually-hidden">Unsupported:</span> `productDetail.razor`

Common Blazor naming conventions used throughout the Blazor documentation include:

* File paths and file names use Pascal case&dagger; and appear before showing code examples. If a path is present, it indicates the typical folder location. For example, `Components/Pages/ProductDetail.razor` indicates that the `ProductDetail` component has a file name of `ProductDetail.razor` and resides in the `Pages` folder of the `Components` folder of the app.
* Component file paths for routable components match their URLs in kebab case&Dagger; with hyphens appearing between words in a component's route template. For example, a `ProductDetail` component with a route template of `/product-detail` (`@page "/product-detail"`) is requested in a browser at the relative URL `/product-detail`.

&dagger;Pascal case (upper camel case) is a naming convention without spaces and punctuation and with the first letter of each word capitalized, including the first word.  
&Dagger;Kebab case is a naming convention without spaces and punctuation that uses lowercase letters and dashes between words.

Components are ordinary [C# classes](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/classes) and can be placed anywhere within a project. Components that produce webpages usually reside in the `Components/Pages` folder. Non-page components are frequently placed in the `Components` folder or a custom folder added to the project.

Typically, a component's namespace is derived from the app's root namespace and the component's location (folder) within the app. If the app's root namespace is `BlazorSample` and the `Counter` component resides in the `Components/Pages` folder:

* The `Counter` component's namespace is `BlazorSample.Components.Pages`.
* The fully qualified type name of the component is `BlazorSample.Components.Pages.Counter`.

For custom folders that hold components, add an [`@using`][2] directive to the parent component or to the app's imports file (`_Imports.razor`). The following example makes components in the `AdminComponents` folder available:

```razor
@using BlazorSample.AdminComponents
```

> **Note:**
> [`@using`][2] directives in the imports file (`_Imports.razor`) are only applied to Razor files (`.razor`), not C# files (`.cs`).

Aliased [`using`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-directive) statements are supported. In the following example, the public `WeatherForecast` class of the `GridRendering` component is made available as `WeatherForecast` in a component elsewhere in the app:

```razor
@using WeatherForecast = Components.Pages.GridRendering.WeatherForecast
```

Components can also be referenced using their fully qualified names, which doesn't require an [`@using`][2] directive. The following example directly references the `ProductDetail` component in the `AdminComponents/Pages` folder of the app:

```razor
<BlazorSample.AdminComponents.Pages.ProductDetail />
```

The namespace of a component authored with Razor is based on the following (in priority order):

* The [`@namespace`][8] directive in the Razor file's markup (for example, `@namespace BlazorSample.CustomNamespace`).
* The project's `RootNamespace` in the project file (for example, `<RootNamespace>BlazorSample</RootNamespace>`).
* The project namespace and the path from the project root to the component. For example, the framework resolves `{PROJECT NAMESPACE}/Components/Pages/Home.razor` with a project namespace of `BlazorSample` to the namespace `BlazorSample.Components.Pages` for the `Home` component. `{PROJECT NAMESPACE}` is the project namespace. Components follow C# name binding rules. For the `Home` component in this example, the components in scope are all of the components:
  * In the same folder, `Components/Pages`.
  * The components in the project's root that don't explicitly specify a different namespace.

The following are **not** supported:

* The [`global::`](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/namespace-alias-qualifier) qualification.
* Partially-qualified names. For example, you can't add `@using BlazorSample.Components` to a component and then reference the `NavMenu` component in the app's `Components/Layout` folder (`Components/Layout/NavMenu.razor`) with `<Layout.NavMenu></Layout.NavMenu>`.



**Applies to: < aspnetcore-8.0**

A component's name must start with an uppercase character:

<span aria-hidden="true">✔️</span><span class="visually-hidden">Supported:</span> `ProductDetail.razor`

<span aria-hidden="true">❌</span><span class="visually-hidden">Unsupported:</span> `productDetail.razor`

Common Blazor naming conventions used throughout the Blazor documentation include:

* File paths and file names use Pascal case&dagger; and appear before showing code examples. If a path is present, it indicates the typical folder location. For example, `Pages/ProductDetail.razor` indicates that the `ProductDetail` component has a file name of `ProductDetail.razor` and resides in the `Pages` folder of the app.
* Component file paths for routable components match their URLs in kebab case&Dagger; with hyphens appearing between words in a component's route template. For example, a `ProductDetail` component with a route template of `/product-detail` (`@page "/product-detail"`) is requested in a browser at the relative URL `/product-detail`.

&dagger;Pascal case (upper camel case) is a naming convention without spaces and punctuation and with the first letter of each word capitalized, including the first word.  
&Dagger;Kebab case is a naming convention without spaces and punctuation that uses lowercase letters and dashes between words.

Components are ordinary [C# classes](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/classes) and can be placed anywhere within a project. Components that produce webpages usually reside in the `Pages` folder. Non-page components are frequently placed in the `Shared` folder or a custom folder added to the project.

Typically, a component's namespace is derived from the app's root namespace and the component's location (folder) within the app. If the app's root namespace is `BlazorSample` and the `Counter` component resides in the `Pages` folder:

* The `Counter` component's namespace is `BlazorSample.Pages`.
* The fully qualified type name of the component is `BlazorSample.Pages.Counter`.

For custom folders that hold components, add an [`@using`][2] directive to the parent component or to the app's imports file (`_Imports.razor`). The following example makes components in the `AdminComponents` folder available:

```razor
@using BlazorSample.AdminComponents
```

> **Note:**
> [`@using`][2] directives in the imports file (`_Imports.razor`) are only applied to Razor files (`.razor`), not C# files (`.cs`).

Aliased [`using`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-directive) statements are supported. In the following example, the public `WeatherForecast` class of the `GridRendering` component is made available as `WeatherForecast` in a component elsewhere in the app:

```razor
@using WeatherForecast = Pages.GridRendering.WeatherForecast
```

Components can also be referenced using their fully qualified names, which doesn't require an [`@using`][2] directive. The following example directly references the `ProductDetail` component in the `Components` folder of the app:

```razor
<BlazorSample.Components.ProductDetail />
```

The namespace of a component authored with Razor is based on the following (in priority order):

* The [`@namespace`][8] directive in the Razor file's markup (for example, `@namespace BlazorSample.CustomNamespace`).
* The project's `RootNamespace` in the project file (for example, `<RootNamespace>BlazorSample</RootNamespace>`).
* The project namespace and the path from the project root to the component. For example, the framework resolves `{PROJECT NAMESPACE}/Pages/Index.razor` with a project namespace of `BlazorSample` to the namespace `BlazorSample.Pages` for the `Index` component. `{PROJECT NAMESPACE}` is the project namespace. Components follow C# name binding rules. For the `Index` component in this example, the components in scope are all of the components:
  * In the same folder, `Pages`.
  * The components in the project's root that don't explicitly specify a different namespace.

The following are **not** supported:

* The [`global::`](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/namespace-alias-qualifier) qualification.
* Partially-qualified names. For example, you can't add `@using BlazorSample` to a component and then reference the `NavMenu` component in the app's `Shared` folder (`Shared/NavMenu.razor`) with `<Shared.NavMenu></Shared.NavMenu>`.



### Partial class support

Components are generated as [C# partial classes](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) and are authored using either of the following approaches:

* A single file contains C# code defined in one or more [`@code`][1] blocks, HTML markup, and Razor markup. Blazor project templates define their components using this single-file approach.
* HTML and Razor markup are placed in a Razor file (`.razor`). C# code is placed in a code-behind file defined as a partial class (`.cs`).

**Applies to: \>= aspnetcore-5.0**

> **Note:**
> A component stylesheet that defines component-specific styles is a separate file (`.css`). Blazor CSS isolation is described later in [blazor/components/css-isolation](css-isolation.md).



The following example shows the default `Counter` component with an [`@code`][1] block in an app generated from a Blazor project template. Markup and C# code are in the same file. This is the most common approach taken in component authoring.

`Counter.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Counter.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Counter.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/Counter.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/Counter.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/Counter.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/Counter.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



The following `Counter` component splits presentation HTML and Razor markup from the C# code using a code-behind file with a partial class. Splitting the markup from the C# code is favored by some organizations and developers to organize their component code to suit how they prefer to work. For example, the organization's UI expert can work on the presentation layer independently of another developer working on the component's C# logic. The approach is also useful when working with automatically-generated code or source generators. For more information, see [Partial Classes and Methods (C# Programming Guide)](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods).

`CounterPartialClass.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CounterPartialClass.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/CounterPartialClass.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/CounterPartialClass.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/CounterPartialClass.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/CounterPartialClass.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/CounterPartialClass.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



`CounterPartialClass.razor.cs`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CounterPartialClass.razor.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/CounterPartialClass.razor.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

```csharp
namespace BlazorSample.Pages;

public partial class CounterPartialClass
{
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```



**Applies to: < aspnetcore-6.0**

```csharp
namespace BlazorSample.Pages
{
    public partial class CounterPartialClass
    {
        private int currentCount = 0;

        private void IncrementCount()
        {
            currentCount++;
        }
    }
}
```



[`@using`][2] directives in the imports file (`_Imports.razor`) are only applied to Razor files (`.razor`), not C# files (`.cs`). Add namespaces to a partial class file as needed.

Typical namespaces used by components:

**Applies to: \>= aspnetcore-8.0**

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.Sections
using Microsoft.AspNetCore.Components.Web;
using static Microsoft.AspNetCore.Components.Web.RenderMode;
using Microsoft.AspNetCore.Components.Web.Virtualization;
using Microsoft.JSInterop;
```

Typical namespaces also include the namespace of the app and the namespace corresponding to the app's `Components` folder:

```csharp
using BlazorSample;
using BlazorSample.Components;
```

Additional folders can also be included, such as the `Layout` folder:

```razor
using BlazorSample.Components.Layout;
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.Web.Virtualization;
using Microsoft.JSInterop;
```

Typical namespaces also include the namespace of the app and the namespace corresponding to the app's `Shared` folder:

```csharp
using BlazorSample;
using BlazorSample.Shared;
```



**Applies to: < aspnetcore-6.0**

```csharp
using System.Net.Http;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;
```

Typical namespaces also include the namespace of the app and the namespace corresponding to the app's `Shared` folder:

```csharp
using BlazorSample;
using BlazorSample.Shared;
```



### Specify a base class

The [`@inherits`][6] directive is used to specify a base class for a component. Unlike using [partial classes](#partial-class-support), which only split markup from C# logic, using a base class allows you to inherit C# code for use across a group of components that share the base class's properties and methods. Using base classes reduce code redundancy in apps and are useful when supplying base code from class libraries to multiple apps. For more information, see [Inheritance in C# and .NET](https://learn.microsoft.com/dotnet/csharp/fundamentals/tutorials/inheritance).

In the following example, the `BlazorRocksBase1` base class derives from [Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase).

`BlazorRocks1.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/BlazorRocks1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/BlazorRocks1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/BlazorRocks1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/BlazorRocks1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/BlazorRocks1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/BlazorRocks1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



`BlazorRocksBase1.cs`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/BlazorRocksBase1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/BlazorRocksBase1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/BlazorRocksBase1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/BlazorRocksBase1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/BlazorRocksBase1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/BlazorRocksBase1.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



### Markup

A component's UI is defined using [Razor syntax](../../mvc/views/razor.md), which consists of Razor markup, C#, and HTML. When an app is compiled, the HTML markup and C# rendering logic are converted into a component class. The name of the generated class matches the name of the file.

Members of the component class are defined in one or more [`@code`][1] blocks. In [`@code`][1] blocks, component state is specified and processed with C#:

* Property and field initializers.
* Parameter values from arguments passed by parent components and route parameters.
* Methods for user event handling, lifecycle events, and custom component logic.

Component members are used in rendering logic using C# expressions that start with the `@` symbol. For example, a C# field is rendered by prefixing `@` to the field name. The following `Markup` component evaluates and renders:

* `headingFontStyle` for the CSS property value `font-style` of the heading element.
* `headingText` for the content of the heading element.

`Markup.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Markup.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Markup.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/Markup.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/Markup.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/Markup.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/Markup.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



> **Note:**
> Examples throughout the Blazor documentation specify the [`private` access modifier](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/private) for private members. Private members are scoped to a component's class. However, C# assumes the `private` access modifier when no access modifier is present, so explicitly marking members "`private`" in your own code is optional. For more information on access modifiers, see [Access Modifiers (C# Programming Guide)](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers).

The Blazor framework processes a component internally as a [*render tree*](https://developer.mozilla.org/docs/Web/Performance/How_browsers_work#render), which is the combination of a component's DOM and [Cascading Style Sheet Object Model (CSSOM)](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model). After the component is initially rendered, the component's render tree is regenerated in response to events. Blazor compares the new render tree against the previous render tree and applies any modifications to the browser's DOM for display. For more information, see [blazor/components/rendering](rendering.md).

Razor syntax for C# control structures, directives, and directive attributes are lowercase (examples: [`@if`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23conditionals-if-else-if-else-and-switch), [`@code`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23code), [`@bind`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23bind)). Property names are uppercase (example: `@Body` for [Microsoft.AspNetCore.Components.LayoutComponentBase.Body](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.LayoutComponentBase.Body)).

### Asynchronous methods (`async`) don't support returning `void`

The Blazor framework doesn't track `void`-returning asynchronous methods (`async`). As a result, the entire process fails when an exception isn't caught if `void` is returned. Always return a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)/[System.Threading.Tasks.ValueTask](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask) from asynchronous methods.

### Nested components

Components can include other components by declaring them using HTML syntax. The markup for using a component looks like an HTML tag where the name of the tag is the component type.

Consider the following `Heading` component, which can be used by other components to display a heading.

`Heading.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Heading.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Heading.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Shared/index/Heading.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Shared/index/Heading.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Shared/index/Heading.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Shared/index/Heading.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



The following markup in the `HeadingExample` component renders the preceding `Heading` component at the location where the `<Heading />` tag appears.

`HeadingExample.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/HeadingExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/HeadingExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/HeadingExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/HeadingExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/HeadingExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/HeadingExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



If a component contains an HTML element with an uppercase first letter that doesn't match a component name within the same namespace, a warning is emitted indicating that the element has an unexpected name. Adding an [`@using`][2] directive for the component's namespace makes the component available, which resolves the warning. For more information, see the [Component name, class name, and namespace](#component-name-class-name-and-namespace) section.

The `Heading` component example shown in this section doesn't have an [`@page`][9] directive, so the `Heading` component isn't directly accessible to a user via a direct request in the browser. However, any component with an [`@page`][9] directive can be nested in another component. If the `Heading` component was directly accessible by including `@page "/heading"` at the top of its Razor file, then the component would be rendered for browser requests at both `/heading` and `/heading-example`.

## Component parameters

*Component parameters* pass data to components and are defined using public [C# properties](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/properties) on the component class with the [`[Parameter]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterAttribute).

In the following `ParameterChild` component, component parameters include:

* Built-in reference types.

  * [System.String](https://learn.microsoft.com/search/?terms=System.String) to pass a title in `Title`.
  * [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) to pass a count in `Count`.

* A user-defined reference type (`PanelBody`) to pass a Bootstrap card body in `Body`.

  `PanelBody.cs`:

  **Applies to: \>= aspnetcore-9.0**

  [Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/PanelBody.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



  **Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

  [Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/PanelBody.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



  **Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

  [Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/PanelBody.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



  **Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

  [Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/PanelBody.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



  **Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

  [Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/PanelBody.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



  **Applies to: < aspnetcore-5.0**

  [Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/PanelBody.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



`ParameterChild.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ParameterChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/ParameterChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Shared/index/ParameterChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Shared/index/ParameterChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Shared/index/ParameterChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Shared/index/ParameterChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



> **Warning:**
> Providing initial values for component parameters is supported, but don't create a component that writes to its own parameters after the component is rendered for the first time. For more information, see [blazor/components/overwriting-parameters](overwriting-parameters.md).

The component parameters of the `ParameterChild` component can be set by arguments in the HTML tag that renders an instance of the `ParameterChild` component. The following parent component renders two `ParameterChild` components:

* The first `ParameterChild` component is rendered without supplying parameter arguments.
* The second `ParameterChild` component receives values for `Title` and `Body` from the parent component, which uses an [explicit C# expression](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23explicit-razor-expressions) to set the values of the `PanelBody`'s properties.

**Applies to: \>= aspnetcore-9.0**

`Parameter1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`Parameter1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`ParameterParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/ParameterParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`ParameterParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/ParameterParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`ParameterParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/ParameterParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

`ParameterParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/ParameterParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



The following rendered HTML markup from the parent component shows `ParameterChild` component default values when the parent component doesn't supply component parameter values. When the parent component provides component parameter values, they replace the `ParameterChild` component's default values.

> **Note:**
> For clarity, most of the rendered CSS style classes and some elements aren't shown in the following rendered HTML markup. The main concept demonstrated by the following example is that the parent component assigned values to the child component using its component parameters.

```html
<h1>Child component (without attribute values)</h1>

<div>Set By Child</div>
<div style="font-style:normal">
    <p>Card content set by child.</p>
</div>

<h1>Child component (with attribute values)</h1>

<div>Set by Parent</div>
<div style="font-style:italic">
    <p>Set by parent.</p>
</div>
```

Assign a C# field, property, or result of a method to a component parameter as an HTML attribute value. The value of the attribute can typically be any C# expression that matches the type of the parameter. The value of the attribute can optionally lead with a [Razor reserved `@` symbol](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23razor-syntax), but it isn't required.

If the component parameter is of type string, then the attribute value is instead treated as a C# string literal. If you want to specify a C# expression instead, then use the `@` prefix.

The following parent component displays four instances of the preceding `ParameterChild` component and sets their `Title` parameter values to:

* The value of the `title` field.
* The result of the `GetTitle` C# method.
* The current local date in long format with [System.DateTime.ToLongDateString%2A](https://learn.microsoft.com/search/?terms=System.DateTime.ToLongDateString%252A), which uses an [implicit C# expression](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23implicit-razor-expressions).
* The `panelData` object's `Title` property.

The fifth `ParameterChild` component instance also sets the `Count` parameter. Note how a `string`-typed parameter requires an `@` prefix to ensure that an expression isn't treated as a string literal. However, `Count` is a nullable integer ([System.Int32](https://learn.microsoft.com/search/?terms=System.Int32)), so `Count` can receive the value of `count` without an `@` prefix. You can establish an alternative code convention that requires developers in your organization to always prefix with `@`. Either way, we merely recommend that you adopt a consistent approach for how component parameters are passed in Razor markup.

Quotes around parameter attribute values are optional in most cases per the HTML5 specification. For example, `Value=this` is supported, instead of `Value="this"`. However, we recommend using quotes because it's easier to remember and widely adopted across web-based technologies.

Throughout the documentation, code examples:

* Always use quotes. Example: `Value="this"`.
* Don't use the `@` prefix with nonliterals unless required. Example: `Count="count"`, where `count` is a number-typed variable. `Count="@count"` is a valid stylistic approach, but the documentation and examples don't adopt the convention.
* Always avoid `@` for literals, outside of Razor expressions. Example: `IsFixed="true"`. This includes keywords (for example, `this`) and `null`, but you can choose to use them if you wish. For example, `IsFixed="@true"` is uncommon but supported.

**Applies to: \>= aspnetcore-9.0**

`Parameter2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`Parameter2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`ParameterParent2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/ParameterParent2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`ParameterParent2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/ParameterParent2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

`ParameterParent2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/ParameterParent2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



> **Note:**
> When assigning a C# member to a component parameter, don't prefix the parameter's HTML attribute with `@`.
>
> Correct (`Title` is a string parameter, `Count` is a number-typed parameter):
>
> ```razor
> <ParameterChild Title="@title" Count="count" />
> ```
>
> ```razor
> <ParameterChild Title="@title" Count="@count" />
> ```
>
> Incorrect:
>
> ```razor
> <ParameterChild @Title="@title" @Count="count" />
> ```
>
> ```razor
> <ParameterChild @Title="@title" @Count="@count" />
> ```

Unlike in Razor pages (`.cshtml`), Blazor can't perform asynchronous work in a Razor expression while rendering a component. This is because Blazor is designed for rendering interactive UIs. In an interactive UI, the screen must always display something, so it doesn't make sense to block the rendering flow. Instead, asynchronous work is performed during one of the [asynchronous lifecycle events](lifecycle.md). After each asynchronous lifecycle event, the component may render again. The following Razor syntax is **not** supported:

```razor
<ParameterChild Title="await ..." />
<ParameterChild Title="@await ..." />
```

The code in the preceding example generates a *compiler error* when the app is built:

> The 'await' operator can only be used within an async method. Consider marking this method with the 'async' modifier and changing its return type to 'Task'.

To obtain a value for the `Title` parameter in the preceding example asynchronously, the component can use the [`OnInitializedAsync` lifecycle event](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23component-initialization-oninitializedasync), as the following example demonstrates:

```razor
<ParameterChild Title="@title" />

@code {
    private string? title;
    
    protected override async Task OnInitializedAsync()
    {
        title = await ...;
    }
}
```

For more information, see [blazor/components/lifecycle](lifecycle.md).

Use of an explicit Razor expression to concatenate text with an expression result for assignment to a parameter is **not** supported. The following example seeks to concatenate the text "`Set by `" with an object's property value. Although this syntax is supported in a Razor page (`.cshtml`), it isn't valid for assignment to the child's `Title` parameter in a component. The following Razor syntax is **not** supported:

```razor
<ParameterChild Title="Set by @(panelData.Title)" />
```

The code in the preceding example generates a *compiler error* when the app is built:

> Component attributes do not support complex content (mixed C# and markup).

To support the assignment of a composed value, use a method, field, or property. The following example performs the concatenation of "`Set by `" and an object's property value in the C# method `GetTitle`:

**Applies to: \>= aspnetcore-9.0**

`Parameter3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`Parameter3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`ParameterParent3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/ParameterParent3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`ParameterParent3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/ParameterParent3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`ParameterParent3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/ParameterParent3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

`ParameterParent3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/ParameterParent3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



For more information, see [mvc/views/razor](../../mvc/views/razor.md).

> **Warning:**
> Providing initial values for component parameters is supported, but don't create a component that writes to its own parameters after the component is rendered for the first time. For more information, see [blazor/components/overwriting-parameters](overwriting-parameters.md).

Component parameters should be declared as [automatically-implemented properties (*auto properties*)](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/auto-implemented-properties), meaning that they shouldn't contain custom logic in their `get` or `set` accessors. For example, the following `StartData` property is an auto property:

```csharp
[Parameter]
public DateTime StartData { get; set; }
```

Don't place custom logic in the `get` or `set` accessor because component parameters are purely intended for use as a channel for a parent component to flow information to a child component. If a `set` accessor of a child component property contains logic that causes rerendering of the parent component, an infinite rendering loop results. Other side effects include unexpected extra renderings and parameter value overwrites.

To transform a received parameter value:

* Leave the parameter property as an auto-property to represent the supplied raw data.
* Create a different property or method to supply the transformed data based on the parameter property.

Override [`OnParametersSetAsync`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23after-parameters-are-set-onparameterssetasync) to transform a received parameter each time new data is received.

Writing an initial value to a component parameter is supported because initial value assignments don't interfere with the Blazor's automatic component rendering. The following assignment of the current local [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) with [System.DateTime.Now](https://learn.microsoft.com/search/?terms=System.DateTime.Now) to `StartData` is valid syntax in a component:

```csharp
[Parameter]
public DateTime StartData { get; set; } = DateTime.Now;
```

After the initial assignment of [System.DateTime.Now](https://learn.microsoft.com/search/?terms=System.DateTime.Now), do **not** assign a value to `StartData` in developer code. For more information, see [blazor/components/overwriting-parameters](overwriting-parameters.md).

**Applies to: \>= aspnetcore-6.0**

Apply the [`[EditorRequired]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EditorRequiredAttribute) to specify a required component parameter. If a parameter value isn't provided, editors or build tools may display warnings to the user. This attribute is only valid on properties also marked with the [`[Parameter]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterAttribute). The [Microsoft.AspNetCore.Components.EditorRequiredAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EditorRequiredAttribute) is enforced at design-time and when the app is built. The attribute isn't enforced at runtime, and it doesn't guarantee a non-`null` parameter value.

```csharp
[Parameter]
[EditorRequired]
public string? Title { get; set; }
```

Single-line attribute lists are also supported:

```csharp
[Parameter, EditorRequired]
public string? Title { get; set; }
```



**Applies to: \>= aspnetcore-7.0**

Don't use the [`required` modifier](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/required) or [`init` accessor](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/init) on component parameter properties. Components are usually instantiated and assigned parameter values using [reflection](https://learn.microsoft.com/dotnet/csharp/advanced-topics/reflection-and-attributes/), which bypasses the guarantees that `init` and `required` are designed to make. Instead, use the [`[EditorRequired]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EditorRequiredAttribute) to specify a required component parameter.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

Don't use the [`init` accessor](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/init) on component parameter properties because setting component parameter values with [Microsoft.AspNetCore.Components.ParameterView.SetParameterProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterView.SetParameterProperties%252A) uses [reflection](https://learn.microsoft.com/dotnet/csharp/advanced-topics/reflection-and-attributes/), which bypasses the init-only setter restriction. Use the [`[EditorRequired]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EditorRequiredAttribute) to specify a required component parameter.



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

Don't use the [`init` accessor](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/init) on component parameter properties because setting component parameter values with [Microsoft.AspNetCore.Components.ParameterView.SetParameterProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterView.SetParameterProperties%252A) uses [reflection](https://learn.microsoft.com/dotnet/csharp/advanced-topics/reflection-and-attributes/), which bypasses the init-only setter restriction.



**Applies to: \>= aspnetcore-9.0**

[`Tuples`](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-tuples) ([API documentation](https://learn.microsoft.com/search/?terms=System.Tuple)) are supported for component parameters and [`RenderFragment`](#child-content-render-fragments) types. The following component parameter example passes three values in a `Tuple`:

`RenderTupleChild.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/RenderTupleChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

`RenderTupleParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/RenderTupleParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)
    
[Named tuples](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-tuples#tuple-field-names) are supported, as seen in the following example:

`NamedTupleChild.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/NamedTupleChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

`NamedTuples.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/NamedTuples.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

Quote &copy;2005 [Universal Pictures](https://www.uphe.com): [Serenity](https://www.uphe.com/movies/serenity-2005) ([Nathan Fillion](https://www.imdb.com/name/nm0277213/))



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[`Tuples`](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-tuples) ([API documentation](https://learn.microsoft.com/search/?terms=System.Tuple)) are supported for component parameters and [`RenderFragment`](#child-content-render-fragments) types. The following component parameter example passes three values in a `Tuple`:

`RenderTupleChild.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/RenderTupleChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

`RenderTupleParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/RenderTupleParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)
    
[Named tuples](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-tuples#tuple-field-names) are supported, as seen in the following example:

`NamedTupleChild.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/NamedTupleChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

`NamedTuples.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/NamedTuples.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

Quote &copy;2005 [Universal Pictures](https://www.uphe.com): [Serenity](https://www.uphe.com/movies/serenity-2005) ([Nathan Fillion](https://www.imdb.com/name/nm0277213/))



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

[`Tuples`](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-tuples) ([API documentation](https://learn.microsoft.com/search/?terms=System.Tuple)) are supported for component parameters and [`RenderFragment`](#child-content-render-fragments) types. The following component parameter example passes three values in a `Tuple`:

`RenderTupleChild.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/Shared/index/RenderTupleChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

`RenderTupleParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/Pages/index/RenderTupleParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)
    
[Named tuples](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-tuples#tuple-field-names) are supported, as seen in the following example:

`RenderNamedTupleChild.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/Shared/index/RenderNamedTupleChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

`RenderNamedTupleParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/Pages/index/RenderNamedTupleParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)

Quote &copy;2005 [Universal Pictures](https://www.uphe.com): [Serenity](https://www.uphe.com/movies/serenity-2005) ([Nathan Fillion](https://www.imdb.com/name/nm0277213/))



**Applies to: \>= aspnetcore-11.0**

Support for [C# union types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/union) allows a single component parameter to represent a value that's exactly one of a fixed set of types with compiler-enforced exhaustive pattern matching. A component parameter is set by direct assignment when a component is rendered from Razor markup or through [Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder.AddComponentParameter%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder.AddComponentParameter%252A).

<!-- UPDATE 11.0 - Remove the NOTE at GA -->

> **Note:**
> During the preview of .NET 11, the following example requires the app's project file to specify the "`preview`" C# language version:
>
> ```xml
> <LangVersion>preview</LangVersion>
> ```

The following C# union type, `SlotContent`, accepts text, a [Microsoft.AspNetCore.Components.MarkupString](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.MarkupString), or a [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment):

```csharp
using Microsoft.AspNetCore.Components;

public union SlotContent(string, MarkupString, RenderFragment);
```

The following `Slot` component exposes a component parameter typed to the `SlotContent` union and renders the union's content using two implementations of the [C# `switch` expression](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/switch-expression), one through an assignment to a [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) (`ContentSwitch`) and one via an inline `switch` expression. In the following example, the [`[EditorRequired]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EditorRequiredAttribute) specifies that `Content` is a required component parameter at design-time or build-time.

`Slot.razor`:

```razor
<h2><code>ContentSwitch</code></h2>

<div>
    @ContentSwitch()
</div>

<h2>Inline <code>switch</code> expression</h2>

<div>
    @switch (Content)
    {
        case string text:
            @text
            break;
        case MarkupString html:
            @html
            break;
        case RenderFragment fragment:
            @fragment
            break;
        default:
            <em>Empty slot!</em>
            break;
    }
</div>

@code {
    [Parameter, EditorRequired] 
    public SlotContent Content { get; set; }

    private RenderFragment ContentSwitch() => Content switch
    {
        string text => @<span>@text</span>,
        MarkupString html => @<span>@html</span>,
        RenderFragment fragment => fragment,
        _ => @<em>Empty slot!</em>
    };
}
```

The following `SlotExample` component uses the preceding `SlotContent` type and `Slot` component.

`SlotExample.razor`:

```razor
@page "/slot-example"

<h1>Plain text</h1>

<Slot Content="@("Simple plain text slot")" />

<h1><code>MarkupString</code></h1>

<Slot Content='@((MarkupString)"<strong>Bold HTML slot</strong>")' />

<h1><code>RenderFragment</code></h1>

<Slot Content="@content" />

@code {
    private SlotContent content;

    protected override void OnInitialized()
    {
        content = new SlotContent((RenderFragment)(b =>
        {
            b.OpenElement(0, "button");
            b.AddAttribute(1, "onclick", EventCallback.Factory.Create(this, Increment));
            b.AddContent(2, "Count: ");
            b.AddContent(3, currentCount);
            b.CloseElement();
        }));
    }

    private int currentCount = 0;

    private void Increment() => currentCount++;
}
```

<!-- UPDATE 11.0 - Remove the following paragraph per resolution of the PU issue -->

The string-literal shortcut applies only to parameters declared as `string`. A parameter declared as a C# union type, even one whose cases include `string`, isn't a `string`-typed parameter, so the attribute value must be a C# expression. Use the `@` prefix, as demonstrated by `Content="@("Simple plain text slot")"` in the preceding example.

<!-- UPDATE 11.0 - Track on https://github.com/dotnet/razor/issues/13200 for 
                   the following feature. -->

Populating a union-typed parameter via a [child content render fragment](#child-content-render-fragments) (`<Slot>...</Slot>`) isn't supported at this time but might be introduced in a future preview release.

<!-- UPDATE 13.0 - Remove the following cross-link when C# unions get some time on them (target removal for .NET 13) -->

For more information, see [Explore union types in C# 15](https://devblogs.microsoft.com/dotnet/csharp-15-union-types/).



## Route parameters

Components can specify route parameters in the route template of the [`@page`][9] directive. The [Blazor router](../fundamentals/routing.md) uses route parameters to populate corresponding component parameters.

`RouteParameter1.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/RouteParameter1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/RouteParameter1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/routing/RouteParameter1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/routing/RouteParameter1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/routing/RouteParameter1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/routing/RouteParameter1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0**

For more information, see the *Route parameters* section of [blazor/fundamentals/routing#route-parameters](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-parameters). Optional route parameters are also supported and covered in the same section. For information on catch-all route parameters (`{*pageRoute}`), which capture paths across multiple folder boundaries, see the *Catch-all route parameters* section of [blazor/fundamentals/routing#catch-all-route-parameters](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23catch-all-route-parameters).



**Applies to: < aspnetcore-5.0**

For more information, see the *Route parameters* section of [blazor/fundamentals/routing#route-parameters](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-parameters). Optional route parameters aren't supported, so two [`@page`][9] directives are required (see the *Route parameters* section for more information). For information on catch-all route parameters (`{*pageRoute}`), which capture paths across multiple folder boundaries, see the *Catch-all route parameters* section of [blazor/fundamentals/routing#catch-all-route-parameters](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23catch-all-route-parameters).



**Applies to: \>= aspnetcore-9.0**

> **Warning:**
> With compression, which is enabled by default, avoid creating secure (authenticated/authorized) interactive server-side components that render data from untrusted sources. Untrusted sources include route parameters, query strings, data from JS interop, and any other source of data that a third-party user can control (databases, external services). For more information, see [blazor/fundamentals/signalr#websocket-compression-for-interactive-server-components](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23websocket-compression-for-interactive-server-components) and [blazor/security/interactive-server-side-rendering](../security/interactive-server-side-rendering.md).




## Child content render fragments

Components can set the content of another component. The assigning component provides the content between the child component's opening and closing tags.

In the following example, the `RenderFragmentChild` component has a `ChildContent` component parameter that represents a segment of the UI to render as a [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment). The position of `ChildContent` in the component's Razor markup is where the content is rendered in the final HTML output.

`RenderFragmentChild.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/RenderFragmentChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/RenderFragmentChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Shared/index/RenderFragmentChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Shared/index/RenderFragmentChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Shared/index/RenderFragmentChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Shared/index/RenderFragmentChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



> **Important:**
> The property receiving the [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) content must be named `ChildContent` by convention.
>
> [Event callbacks](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fevent-handling%23eventcallback) aren't supported for [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment).

The following component provides content for rendering the `RenderFragmentChild` by placing the content inside the child component's opening and closing tags.

**Applies to: \>= aspnetcore-9.0**

`RenderFragments.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/RenderFragments.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`RenderFragments.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/RenderFragments.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`RenderFragmentParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/RenderFragmentParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`RenderFragmentParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/RenderFragmentParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`RenderFragmentParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/RenderFragmentParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

`RenderFragmentParent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/RenderFragmentParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



Render fragments are used to render child content throughout Blazor apps and are described with examples in the following articles and article sections:

* [Blazor layouts](layouts.md)
* [Pass data across a component hierarchy](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23pass-data-across-a-component-hierarchy)
* [Templated components](templated-components.md)
* [Global exception handling](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23global-exception-handling)

> **Note:**
> Blazor framework's [built-in Razor components](built-in-components.md) use the same `ChildContent` component parameter convention to set their content. You can see the components that set child content by searching for the component parameter property name `ChildContent` in the [API documentation (filters API with the search term "ChildContent")](https://learn.microsoft.com/dotnet/api/?term=ChildContent).

## Render fragments for reusable rendering logic

You can factor out child components purely as a way of reusing rendering logic. In any component's `@code` block, define a [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) and render the fragment from any location as many times as needed:

```razor
@RenderWelcomeInfo

<p>Render the welcome info a second time:</p>

@RenderWelcomeInfo

@code {
    private RenderFragment RenderWelcomeInfo =  @<p>Welcome to your new app!</p>;
}
```

For more information, see [Reuse rendering logic](https://learn.microsoft.com/search/?terms=blazor%2Fperformance%2Frendering%23define-reusable-renderfragments-in-code).

## Loop variables with component parameters and child content

Rendering components inside a [`for`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/for) loop requires a local index variable if the incrementing loop variable is used by the component's parameters or [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) child content.

Consider the following `RenderFragmentChild2` component that has both a component parameter (`Id`) and a render fragment to display child content (`ChildContent`).

`RenderFragmentChild2.razor`:

```razor
<div class="card w-25" style="margin-bottom:15px">
    <div class="card-header font-weight-bold">Child content (@Id)</div>
    <div class="card-body">@ChildContent</div>
</div>

@code {
    [Parameter]
    public string? Id { get; set; }

    [Parameter]
    public RenderFragment? ChildContent { get; set; }
}
```

When rendering the `RenderFragmentChild2` component in a parent component, use a local index variable (`ct` in the following example) instead of the loop variable (`c`) when assigning the component parameter value and providing the child component's content:

```razor
@for (int c = 1; c < 4; c++)
{
    var ct = c;

    <RenderFragmentChild2 Id="@($"Child{ct}")">
        Count: @ct
    </RenderFragmentChild2>
}
```

Alternatively, use a [`foreach`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/foreach-in) loop with [System.Linq.Enumerable.Range%2A](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Range%252A) instead of a [`for`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/for) loop:

```razor
@foreach (var c in Enumerable.Range(1, 3))
{
    <RenderFragmentChild2 Id="@($"Child{c}")">
        Count: @c
    </RenderFragmentChild2>
}
```

## Capture references to components

Component references provide a way to reference a component instance for issuing commands. To capture a component reference:

* Add an [`@ref`][4] attribute to the child component.
* Define a field with the same type as the child component.

When the component is rendered, the field is populated with the component instance. You can then invoke .NET methods on the instance.

Consider the following `ReferenceChild` component that logs a message when its `ChildMethod` is called.

`ReferenceChild.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ReferenceChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/ReferenceChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Shared/index/ReferenceChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Shared/index/ReferenceChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Shared/index/ReferenceChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Shared/index/ReferenceChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



A component reference is only populated after the component is rendered and its output includes `ReferenceChild`'s element. Until the component is rendered, there's nothing to reference. Don't attempt to call a referenced component method to an event handler directly (for example, `@onclick="childComponent!.ChildMethod(5)"`) because the reference variable may not be assigned at the time the click event is assigned.

To manipulate component references after the component has finished rendering, use the [`OnAfterRender` or `OnAfterRenderAsync` methods](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23after-component-render-onafterrenderasync).

The following example uses the preceding `ReferenceChild` component.

`ReferenceParent.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ReferenceParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/ReferenceParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/ReferenceParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/ReferenceParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/ReferenceParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/ReferenceParent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



While capturing component references use a similar syntax to [capturing element references](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23capture-references-to-elements), capturing component references isn't a JavaScript interop feature. Component references aren't passed to JavaScript code. Component references are only used in .NET code.

> **Important:**
> Do **not** use component references to mutate the state of child components. Instead, use normal declarative component parameters to pass data to child components. Use of component parameters result in child components that rerender at the correct times automatically. For more information, see the [component parameters](#component-parameters) section and the [blazor/components/data-binding](data-binding.md) article.

## Apply an attribute

Attributes can be applied to components with the [`@attribute`][7] directive. The following example applies the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) to the component's class:

```razor
@page "/"
@attribute [Authorize]
```

## Conditional HTML element attributes and DOM properties

Blazor adopts the following general behaviors:

* For HTML attributes, Blazor sets or removes the attribute conditionally based on the .NET value. If the .NET value is `false` or `null`, the attribute isn't set or is removed if it was previously set.
* For DOM properties, such as `checked` or `value`, Blazor sets the DOM property based on the .NET value. If the .NET value is `false` or `null`, the DOM property is reset to a default value.

Which Razor syntax attributes correspond to HTML attributes and which ones correspond to DOM properties remains undocumented because this is a framework implementation detail that might change without notice.

> **Warning:**
> Some HTML attributes, such as [`aria-pressed`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles/button_role#Toggle_buttons), must have a string value of either "true" or "false". Since they require a string value and not a boolean, you must use a .NET `string` and not a `bool` for their value. This is a requirement set by browser DOM APIs.

## Raw HTML

Strings are normally rendered using DOM text nodes, which means that any markup they may contain is ignored and treated as literal text. To render raw HTML, wrap the HTML content in a [Microsoft.AspNetCore.Components.MarkupString](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.MarkupString) value. The value is parsed as HTML or SVG and inserted into the DOM.

> **Warning:**
> Rendering raw HTML constructed from any untrusted source is a **security risk** and should **always** be avoided.

The following example shows using the [Microsoft.AspNetCore.Components.MarkupString](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.MarkupString) type to add a block of static HTML content to the rendered output of a component.

**Applies to: \>= aspnetcore-9.0**

`MarkupStrings.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/MarkupStrings.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`MarkupStrings.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/MarkupStrings.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`MarkupStringExample.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/MarkupStringExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`MarkupStringExample.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/MarkupStringExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`MarkupStringExample.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/MarkupStringExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

`MarkupStringExample.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/MarkupStringExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



## Razor templates

Render fragments can be defined using Razor template syntax to define a UI snippet. Razor templates use the following format:

```razor
@<{HTML tag}>...</{HTML tag}>
```

The following example illustrates how to specify [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) and [Microsoft.AspNetCore.Components.RenderFragment%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment%25601) values and render templates directly in a component. Render fragments can also be passed as arguments to [templated components](templated-components.md).

`RazorTemplate.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/RazorTemplate.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/RazorTemplate.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/index/RazorTemplate.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/index/RazorTemplate.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/index/RazorTemplate.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/index/RazorTemplate.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/index.md)



Rendered output of the preceding code:

```html
<p>The time is 4/19/2021 8:54:46 AM.</p>
<p>Pet: Nutty Rex</p>
```

When the Razor delegate must return more than one HTML element, wrap the result in a `<text>` tag for an [explicit delimited transition](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23explicit-delimited-transition):

```razor
@RenderTwoElements()

<h2>ReturnIf</h2>
@ReturnIf()

<h2>ReturnForeach</h2>
@ReturnForeach()

@code {
    private bool showTrueStatement = true;

    private RenderFragment RenderTwoElements() =>
        @<text>
            <h2>Render Two Elements</h2>
            @ChildFragment
        </text>;

    private RenderFragment ChildFragment => @<p>This is a paragraph.</p>;

    private RenderFragment ReturnIf() =>
        @<text>
            @if (showTrueStatement)
            {
                <p>This is true!</p>
            }
            else
            {
                <p>This is false!</p>
            }
        </text>;

    private RenderFragment ReturnForeach() =>
        @<text>
            @foreach (var item in new[] { 1, 2, 3 })
            {
                <p>Item: @item</p>
            }
        </text>;
}
```

## Static assets

Blazor follows the convention of ASP.NET Core apps for static assets. Static assets are located in the project's [`web root` (`wwwroot`) folder](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) or folders under the `wwwroot` folder.

Use a base-relative path (`/`) to refer to the web root for a static asset. In the following example, `logo.png` is physically located in the `{PROJECT ROOT}/wwwroot/images` folder. `{PROJECT ROOT}` is the app's project root.

```razor
<img alt="Company logo" src="/images/logo.png" />
```

Components do **not** support tilde-slash notation (`~/`).

For information on setting an app's base path, see [blazor/host-and-deploy/app-base-path](../host-and-deploy/app-base-path.md).

## Tag Helpers aren't supported in components

[`Tag Helpers`](../../mvc/views/tag-helpers/intro.md) aren't supported in components. To provide Tag Helper-like functionality in Blazor, create a component with the same functionality as the Tag Helper and use the component instead.

## Scalable Vector Graphics (SVG) images

Since Blazor renders HTML, browser-supported images, including [Scalable Vector Graphics (SVG) images (`.svg`)](https://developer.mozilla.org/docs/Web/SVG), are supported via the `<img>` tag:

```html
<img alt="Example image" src="image.svg" />
```

Similarly, SVG images are supported in the CSS rules of a stylesheet file (`.css`):

```css
.element-class {
    background-image: url("image.svg");
}
```

**Applies to: \>= aspnetcore-6.0**

Blazor supports the [`<foreignObject>`](https://developer.mozilla.org/docs/Web/SVG/Element/foreignObject) element to display arbitrary HTML within an SVG. The markup can represent arbitrary HTML, a [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment), or a Razor component.

The following example demonstrates:

* Display of a `string` (`@message`).
* Two-way binding with an `<input>` element and a `value` field.
* A `Robot` component.

```razor
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" rx="10" ry="10" width="200" height="200" stroke="black" 
        fill="none" />
    <foreignObject x="20" y="20" width="160" height="160">
        <p>@message</p>
    </foreignObject>
</svg>

<svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="200" height="200">
        <label>
            Two-way binding:
            <input @bind="value" @bind:event="oninput" />
        </label>
    </foreignObject>
</svg>

<svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject>
        <Robot />
    </foreignObject>
</svg>

@code {
    private string message = "Lorem ipsum dolor sit amet, consectetur adipiscing " +
        "elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    private string? value;
}
```



## Whitespace rendering behavior

**Applies to: \>= aspnetcore-5.0**

Unless the [`@preservewhitespace`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23preservewhitespace) directive is used with a value of `true`, extra whitespace is removed if:

* Leading or trailing within an element.
* Leading or trailing within a [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment)/[Microsoft.AspNetCore.Components.RenderFragment%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment%25601) parameter (for example, child content passed to another component).
* It precedes or follows a C# code block, such as `@if` or `@foreach`.

Whitespace removal might affect the rendered output when using a CSS rule, such as `white-space: pre`. To disable this performance optimization and preserve the whitespace, take one of the following actions:

* Add the `@preservewhitespace true` directive at the top of the Razor file (`.razor`) to apply the preference to a specific component.
* Add the `@preservewhitespace true` directive inside an imports file (`_Imports.razor`) to apply the preference to a subdirectory or to the entire project.

In most cases, no action is required, as apps typically continue to behave normally (but faster). If stripping whitespace causes a rendering problem for a particular component, use `@preservewhitespace true` in that component to disable this optimization.



**Applies to: < aspnetcore-5.0**

Whitespace is retained in a component's source markup. Whitespace-only text renders in the browser's DOM even when there's no visual effect.

Consider the following component markup:

```razor
<ul>
    @foreach (var item in Items)
    {
        <li>
            @item.Text
        </li>
    }
</ul>
```

The preceding example renders the following unnecessary whitespace:

* Outside of the `@foreach` code block.
* Around the `<li>` element.
* Around the `@item.Text` output.

A list of 100 items results in over 400 areas of whitespace. None of the extra whitespace visually affects the rendered output.

When rendering static HTML for components, whitespace inside a tag isn't preserved. For example, view the rendered output of the following `<img>` tag in a component Razor file (`.razor`):

```razor
<img     alt="Example image"   src="img.png"     />
```

Whitespace isn't preserved from the preceding markup:

```razor
<img alt="Example image" src="img.png" />
```



**Applies to: \>= aspnetcore-6.0**

## Root component

A *root Razor component* (*root component*) is the first component loaded of any component hierarchy created by the app.



**Applies to: \>= aspnetcore-8.0**

In an app created from the Blazor Web App project template, the `App` component (`App.razor`) is specified as the default root component by the type parameter declared for the call to [`MapRazorComponents<TRootComponent>`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) in the server-side `Program` file. The following example shows the use of the `App` component as the root component, which is the default for an app created from the Blazor project template:

```csharp
app.MapRazorComponents<App>();
```

> **Note:**
> Making a root component interactive, such as the `App` component, isn't supported.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

In an app created from the Blazor Server project template, the `App` component (`App.razor`) is specified as the default root component in `Pages/_Host.cshtml` using the [Component Tag Helper](../../mvc/views/tag-helpers/built-in/component-tag-helper.md):

```cshtml
<component type="typeof(App)" render-mode="ServerPrerendered" />
```



**Applies to: \>= aspnetcore-6.0**

In an app created from the Blazor WebAssembly project template, the `App` component (`App.razor`) is specified as the default root component in the `Program` file:

```csharp
builder.RootComponents.Add<App>("#app");
```

In the preceding code, the CSS selector, `#app`, indicates that the `App` component is specified for the `<div>` in `wwwroot/index.html` with an `id` of `app`:

```html
<div id="app">...</app>
```



MVC and Razor Pages apps can also use the [Component Tag Helper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper) to register statically-rendered Blazor WebAssembly root components:

```cshtml
<component type="typeof(App)" render-mode="WebAssemblyPrerendered" />
```

Statically-rendered components can only be added to the app. They can't be removed or updated afterwards.

For more information, see the following resources:

* [mvc/views/tag-helpers/builtin-th/component-tag-helper](../../mvc/views/tag-helpers/built-in/component-tag-helper.md)
* [blazor/components/integration](integration.md)

<!--Reference links in article-->
[1]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#code]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23code\)
[2]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#using]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using\)
[3]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#attributes]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attributes\)
[4]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#ref]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23ref\)
[5]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#key]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key\)
[6]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#inherits]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23inherits\)
[7]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#attribute]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attribute\)
[8]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#namespace]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23namespace\)
[9]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#page]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page\)
[10]: https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/[mvc/views/razor#bind]\(https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23bind\)
