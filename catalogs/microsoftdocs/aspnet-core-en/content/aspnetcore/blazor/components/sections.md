---
title: ASP.NET Core Blazor sections
author: guardrex
description: Learn how to control the content in a Razor component from a child Razor component.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/sections
---
# ASP.NET Core Blazor sections

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


This article explains how to control the content in a Razor component from a child Razor component.

## Blazor sections

To control the content in a Razor component from a child Razor component, Blazor supports *sections* using the following built-in components:

* [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet): Renders content provided by [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) components with matching [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%252A) or [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) arguments. Two or more [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) components can't have the same [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%252A) or [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A).

* [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent): Provides content as a [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) to [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) components with a matching [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%252A) or [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A). If several [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) components have the same [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%252A) or [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A), the matching [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) component renders the content of the last rendered [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent).

Sections can be used in both [layouts](layouts.md) and across nested parent-child components.

Although the argument passed to [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%252A) can use any type of casing, the documentation adopts kebab casing (for example, `top-bar`), which is a common casing choice for HTML element IDs. [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) receives a static `object` field, and we always recommend Pascal casing for C# field names (for example, `TopbarSection`).

In the following example, the app's main layout component implements an increment counter button for the app's `Counter` component.

If the namespace for sections isn't in the imports file (`_Imports.razor`), add it:

```razor
@using Microsoft.AspNetCore.Components.Sections
```

In the `MainLayout` component (`MainLayout.razor`), place a [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) component and pass a string to the [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%252A) parameter to indicate the section's name. The following example uses the section name `top-bar`:

```razor
<SectionOutlet SectionName="top-bar" />
```

In the `Counter` component (`Counter.razor`), create a [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) component and pass the matching string (`top-bar`) to its [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%252A) parameter:

```razor
<SectionContent SectionName="top-bar">
    <button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
</SectionContent>
```

When the `Counter` component is accessed at `/counter`, the `MainLayout` component renders the increment count button from the `Counter` component where the [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) component is placed. When any other component is accessed, the increment count button isn't rendered.

Instead of using a named section, you can pass a static `object` with the [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) parameter to identify the section. The following example also implements an increment counter button for the app's `Counter` component in the app's main layout.

If you don't want other [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) components to accidentally match the name of a [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet), pass an object [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) parameter to identify the section. This can be useful when designing a [Razor class library (RCL)](class-libraries.md). When a [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) in the RCL uses an object reference with [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) and the consumer places a [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) component with a matching [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) object, an accidental match by name isn't possible when consumers of the RCL implement other [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) components.

The following example also implements an increment counter button for the app's `Counter` component in the app's main layout, using an object reference instead of a section name.

Add a `TopbarSection` static `object` to the `MainLayout` component in an `@code` block:

```razor
@code {
    internal static object TopbarSection = new();
}
```

In the `MainLayout` component's Razor markup, place a [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) component and pass `TopbarSection` to the [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) parameter to indicate the section:

```razor
<SectionOutlet SectionId="TopbarSection" />
```

Add a [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) component to the app's `Counter` component that renders an increment count button. Use the `MainLayout` component's `TopbarSection` section static `object` as the [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) (`MainLayout.TopbarSection`).

In `Counter.razor`:

```razor
<SectionContent SectionId="MainLayout.TopbarSection">
    <button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
</SectionContent>
```

When the `Counter` component is accessed, the `MainLayout` component renders the increment count button where the [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) component is placed.

> **Note:**
> [Microsoft.AspNetCore.Components.Sections.SectionOutlet](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet) and [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) components can only set either [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId%252A) or [Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName%252A), not both.

## `RenderFragment` caching rules and section rendering behavior

When a [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent)'s [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) content changes, which is a different instance than the component where it's rendered, Blazor completely destroys and recreates the section instead of attempting to update the section's content. Unlike normal rendering, the section's content could come from different instances, and it doesn't make sense to attempt processing content from two separate components, which might lead to unexpected results. For a detailed explanation on this behavior, see [Inconsistent component initialization with Blazor SectionOutlet/SectionContent and CascadingValue (`dotnet/aspnetcore` #58316)](https://github.com/dotnet/aspnetcore/issues/58316).

## Section interaction with other Blazor features

A section interacts with other Blazor features in the following ways:

* [Cascading values](cascading-values-and-parameters.md) flow into section content from where the content is defined by the [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) component.
* Unhandled exceptions are handled by [error boundaries](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries) defined around a [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) component.
* A Razor component configured for [streaming rendering](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23streaming-rendering) also configures section content provided by a [Microsoft.AspNetCore.Components.Sections.SectionContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Sections.SectionContent) component to use streaming rendering.
* A section that contains interactive components is statically rendered (non-functional) in a layout component in a Blazor Web App that adopts per-page/component rendering. For more information, see [blazor/components/layouts#statically-rendered-layout-components](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23statically-rendered-layout-components).
