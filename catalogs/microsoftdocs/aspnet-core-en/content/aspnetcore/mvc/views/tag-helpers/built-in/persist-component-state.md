---
title: Persist Component State Tag Helper in ASP.NET Core
author: guardrex
ms.author: wpickett
description: Learn how to use the ASP.NET Core Persist Component State Tag Helper to persist state when prerendering components.
monikerRange: '>= aspnetcore-6.0'
ms.date: 09/25/2023
uid: mvc/views/tag-helpers/builtin-th/persist-component-state-tag-helper
---
# Persist Component State Tag Helper in ASP.NET Core

The Persist Component State Tag Helper saves the state of non-routable Razor components rendered in a page or view of a Razor Pages or MVC app.

## Prerequisites

**Applies to: \>= aspnetcore-8.0**

Follow the guidance in the *Use non-routable components in pages or views* section of the [blazor/components/integration#use-non-routable-components-in-pages-or-views](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fintegration%23use-non-routable-components-in-pages-or-views) article.



**Applies to: < aspnetcore-8.0**

Follow the guidance in the *Configuration* section for either:

* [Blazor WebAssembly](../../../../blazor/components/integration.md)
* [Blazor Server](../../../../blazor/components/integration.md)



## Persist state for prerendered components

**Applies to: \>= aspnetcore-8.0**

To persist state for prerendered components, use the [Persist Component State Tag Helper](persist-component-state.md) ([reference source](https://github.com/dotnet/aspnetcore/blob/main/src/Mvc/Mvc.TagHelpers/src/PersistComponentStateTagHelper.cs)). Add the Tag Helper's tag, `<persist-component-state />`, inside the closing `</body>` tag of the layout in an app that prerenders components.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


In `Pages/Shared/_Layout.cshtml` for embedded components that are either WebAssembly prerendered (`WebAssemblyPrerendered`) or server prerendered (`ServerPrerendered`):

```cshtml
<body>
    ...

    <persist-component-state />
</body>
```

Decide what state to persist using the [Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState) service. [`PersistentComponentState.RegisterOnPersisting`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting%252A) registers a callback to persist the component state before the app is paused. The state is retrieved when the application resumes.

For more information and examples, see [blazor/state-management/prerendered-state-persistence](../../../../blazor/state-management/prerendered-state-persistence.md).



**Applies to: < aspnetcore-8.0**

To persist state for prerendered components, use the [Persist Component State Tag Helper](persist-component-state.md) ([reference source](https://github.com/dotnet/aspnetcore/blob/main/src/Mvc/Mvc.TagHelpers/src/PersistComponentStateTagHelper.cs)). Add the Tag Helper's tag, `<persist-component-state />`, inside the closing `</body>` tag of the `_Host` page in an app that prerenders components.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


In `Pages/_Host.cshtml` of Blazor apps that are either WebAssembly prerendered (`WebAssemblyPrerendered`) in a hosted Blazor WebAssembly app or `ServerPrerendered` in a Blazor Server app:

```cshtml
<body>
    ...

    <persist-component-state />
</body>
```

Decide what state to persist using the [Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState) service. [`PersistentComponentState.RegisterOnPersisting`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting%252A) registers a callback to persist the component state before the app is paused. The state is retrieved when the application resumes.

For more information and examples, see [blazor/components/integration#persist-prerendered-state](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fintegration%23persist-prerendered-state).



## Additional resources

**Applies to: \>= aspnetcore-8.0**

* [mvc/views/tag-helpers/builtin-th/component-tag-helper](component-tag-helper.md)
* [blazor/components/prerender](../../../../blazor/components/prerender.md)
* [Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper)
* [mvc/views/tag-helpers/intro](../intro.md)
* [blazor/components/index](../../../../blazor/components/index.md)



**Applies to: < aspnetcore-8.0**

* [mvc/views/tag-helpers/builtin-th/component-tag-helper](component-tag-helper.md)
* [blazor/components/integration](../../../../blazor/components/integration.md)
* [Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper)
* [mvc/views/tag-helpers/intro](../intro.md)
* [blazor/components/index](../../../../blazor/components/index.md)
