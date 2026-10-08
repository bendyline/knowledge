---
title: ASP.NET Core Razor component generic type support
author: guardrex
description: Learn about generic type support in ASP.NET Core Razor components.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/generic-type-support
---
# ASP.NET Core Razor component generic type support

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


This article describes generic type support in Razor components.

If you're new to generic types, see [Generic classes and methods (C# Guide)](https://learn.microsoft.com/dotnet/csharp/fundamentals/types/generics) for general guidance on the use of generics before reading this article.

The example code in this article is only available for the latest .NET release in the [Blazor sample apps](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps).

## Generic type parameter support

The [`@typeparam`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23typeparam) directive declares a [generic type parameter](https://learn.microsoft.com/dotnet/csharp/programming-guide/generics/generic-type-parameters) for the generated component class:

```razor
@typeparam TItem
```

C# syntax with [`where`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/where-generic-type-constraint) type constraints is supported:

```razor
@typeparam TEntity where TEntity : IEntity
```

A [Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment) generic type is supported, but components aren't supported as the generic type. To render components by type, consider using a [Microsoft.AspNetCore.Components.DynamicComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.DynamicComponent). For more information, see [blazor/components/dynamiccomponent](dynamiccomponent.md).

In the following example, the `ListItems1` component is generically typed as `TExample`, which represents the type of the `ExampleList` collection.

`ListItems1.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListItems1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/ListItems1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



The following component renders two `ListItems1` components:

* String or integer data is assigned to the `ExampleList` parameter of each component.
* Type `string` or `int` that matches the type of the assigned data is set for the type parameter (`TExample`) of each component.

`Generics1.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Generics1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Generics1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



For more information, see [mvc/views/razor#typeparam](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23typeparam). For an example of generic typing with templated components, see [blazor/components/templated-components](templated-components.md).

**Applies to: \>= aspnetcore-6.0**

## Cascaded generic type support

An ancestor component can cascade a type parameter by name to descendants using the [`[CascadingTypeParameter]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.CascadingTypeParameterAttribute). This attribute allows a generic type inference to use the specified type parameter automatically with descendants that have a type parameter with the same name.

By adding `@attribute [CascadingTypeParameter(...)]` to a component, the specified generic type argument is automatically used by descendants that:

* Are nested as child content for the component in the same `.razor` document.
* Also declare a [`@typeparam`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23typeparam) with the exact same name.
* Don't have another value explicitly supplied or implicitly inferred for the type parameter. If another value is supplied or inferred, it takes precedence over the cascaded generic type.

When receiving a cascaded type parameter, components obtain the parameter value from the closest ancestor that has a [`[CascadingTypeParameter]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.CascadingTypeParameterAttribute) with a matching name. Cascaded generic type parameters are overridden within a particular subtree.

Matching is only performed by name. Therefore, we recommend avoiding a cascaded generic type parameter with a generic name, for example `T` or `TItem`. If a developer opts into cascading a type parameter, they're implicitly promising that its name is unique enough not to clash with other cascaded type parameters from unrelated components.

Generic types can be cascaded to child components with either of the following approaches for ancestor (parent) components, which are demonstrated in the following two sub-sections:

* Explicitly set the cascaded generic type.
* Infer the cascaded generic type.

The following subsections provide examples of the preceding approaches using the following `ListDisplay1` component. The component receives and renders list data generically typed as `TExample`. To make each instance of `ListDisplay1` stand out, an additional component parameter controls the color of the list.

`ListDisplay1.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListDisplay1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/ListDisplay1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0**

### Explicit generic types based on ancestor components

The demonstration in this section cascades a type explicitly for `TExample`.

> **Note:**
> This section uses the preceding `ListDisplay1` component in the [Cascaded generic type support](#cascaded-generic-type-support) section.

The following `ListItems2` component receives data and cascades a generic type parameter named `TExample` to its descendent components. In the upcoming parent component, the `ListItems2` component is used to display list data with the preceding `ListDisplay1` component.

`ListItems2.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListItems2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/ListItems2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0**

The following parent component sets the child content ([Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment)) of two `ListItems2` components specifying the `ListItems2` types (`TExample`), which are cascaded to child components. `ListDisplay1` components are rendered with the list item data shown in the example. String data is used with the first `ListItems2` component, and integer data is used with the second `ListItems2` component.

`Generics2.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Generics2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Generics2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0**

Specifying the type explicitly also allows the use of [cascading values and parameters](cascading-values-and-parameters.md) to provide data to child components, as the following demonstration shows.

`ListDisplay2.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListDisplay2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/ListDisplay2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0**

`ListItems3.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListItems3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/ListItems3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0**

When cascading the data in the following example, the type must be provided to the component.

`Generics3.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Generics3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Generics3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0**

When multiple generic types are cascaded, values for all generic types in the set must be passed. In the following example, `TItem`, `TValue`, and `TEdit` are `GridColumn` generic types, but the parent component that places `GridColumn` doesn't specify the `TItem` type:

```razor
<GridColumn TValue="string" TEdit="TextEdit" />
```

The preceding example generates a compile-time error that the `GridColumn` component is missing the `TItem` type parameter. Valid code specifies all of the types:

```razor
<GridColumn TValue="string" TEdit="TextEdit" TItem="User" />
```

### Infer generic types based on ancestor components

The demonstration in this section cascades a type inferred for `TExample`.

> **Note:**
> This section uses the `ListDisplay` component in the [Cascaded generic type support](#cascaded-generic-type-support) section.

`ListItems4.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListItems4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/ListItems4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0**

The following component with inferred cascaded types provides different data for display.

`Generics4.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Generics4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Generics4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0**

The following component with inferred cascaded types provides the same data for display. The following example directly assigns the data to the components.

`Generics5.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Generics5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Generics5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/generic-type-support.md)
