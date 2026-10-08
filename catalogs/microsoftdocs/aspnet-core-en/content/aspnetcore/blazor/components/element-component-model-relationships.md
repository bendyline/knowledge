---
title: Retain element, component, and model relationships in ASP.NET Core Blazor
author: guardrex
description: Learn how to use the @key directive attribute to retain element, component, and model relationships when rendering and the elements or components subsequently change.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/key
---
# Retain element, component, and model relationships in ASP.NET Core Blazor

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


This article explains how to use the `@key` directive attribute to retain element, component, and model relationships when rendering and the elements or components subsequently change.

## Use of the `@key` directive attribute

When rendering a list of elements or components and the elements or components subsequently change, Blazor must decide which of the previous elements or components are retained and how model objects should map to them. Normally, this process is automatic and sufficient for general rendering, but there are often cases where controlling the process using the [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) directive attribute is required.

Consider the following example that demonstrates a collection mapping problem that's solved by using [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key).

For the following components:

* The `Details` component receives data (`Data`) from the parent component, which is displayed in an `<input>` element. Any given displayed `<input>` element can receive the focus of the page from the user when they select one of the `<input>` elements.
* The parent component creates a list of person objects for display using the `Details` component. Every three seconds, a new person is added to the collection.

This demonstration allows you to:

* Select an `<input>` from among several rendered `Details` components.
* Study the behavior of the page's focus as the people collection automatically grows.

`Details.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Details.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Details.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Shared/element-component-model-relationships/Details.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Shared/element-component-model-relationships/Details.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Shared/element-component-model-relationships/Details.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Shared/element-component-model-relationships/Details.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



In the following parent component, each iteration of adding a person in `OnTimerCallback` results in Blazor rebuilding the entire collection. The page's focus remains on the *same index* position of `<input>` elements, so the focus shifts each time a person is added. *Shifting the focus away from what the user selected isn't desirable behavior.* After demonstrating the poor behavior with the following component, the [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) directive attribute is used to improve the user's experience.

**Applies to: \>= aspnetcore-9.0**

`People.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/People.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`People.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/People.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`PeopleExample.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/element-component-model-relationships/PeopleExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`PeopleExample.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/element-component-model-relationships/PeopleExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`PeopleExample.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/element-component-model-relationships/PeopleExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



**Applies to: < aspnetcore-5.0**

`PeopleExample.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/element-component-model-relationships/PeopleExample.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/element-component-model-relationships.md)



The contents of the `people` collection changes with inserted, deleted, or re-ordered entries. Rerendering can lead to visible behavior differences. For example, each time a person is inserted into the `people` collection, the user's focus is lost.

The mapping process of elements or components to a collection can be controlled with the [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) directive attribute. Use of [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) guarantees the preservation of elements or components based on the key's value. If the `Details` component in the preceding example is keyed on the `person` item, Blazor ignores rerendering `Details` components that haven't changed.

To modify the parent component to use the [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) directive attribute with the `people` collection, update the `<Details>` element to the following:

```razor
<Details @key="person" Data="@person.Data" />
```

When the `people` collection changes, the association between `Details` instances and `person` instances is retained. When a `Person` is inserted at the beginning of the collection, one new `Details` instance is inserted at that corresponding position. Other instances are left unchanged. Therefore, the user's focus isn't lost as people are added to the collection.

Other collection updates exhibit the same behavior when the [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) directive attribute is used:

* If an instance is deleted from the collection, only the corresponding component instance is removed from the UI. Other instances are left unchanged.
* If collection entries are re-ordered, the corresponding component instances are preserved and re-ordered in the UI.

> **Important:**
> Keys are local to each container element or component. Keys aren't compared globally across the document.

## When to use `@key`

Typically, it makes sense to use [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) whenever a list is rendered (for example, in a [`foreach`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/foreach-in) block) and a suitable value exists to define the [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key).

You can also use [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) to preserve an element or component subtree when an object doesn't change, as the following examples show.

Example 1:

```razor
<li @key="person">
    <input value="@person.Data" />
</li>
```

Example 2:

```razor
<div @key="person">
    @* other HTML elements *@
</div>
```

If an `person` instance changes, the [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) attribute directive forces Blazor to:

* Discard the entire `<li>` or `<div>` and their descendants.
* Rebuild the subtree within the UI with new elements and components.

This is useful to guarantee that no UI state is preserved when the collection changes within a subtree.

## Scope of `@key`

The [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) attribute directive is scoped to its own siblings within its parent.

Consider the following example. The `first` and `second` keys are compared against each other within the same scope of the outer `<div>` element:

```razor
<div>
    <div @key="first">...</div>
    <div @key="second">...</div>
</div>
```

The following example demonstrates `first` and `second` keys in their own scopes, unrelated to each other and without influence on each other. Each [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) scope only applies to its parent `<div>` element, not across the parent `<div>` elements:

```razor
<div>
    <div @key="first">...</div>
</div>
<div>
    <div @key="second">...</div>
</div>
```

For the `Details` component shown earlier, the following examples render `person` data within the same [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) scope and demonstrate typical use cases for [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key):

```razor
<div>
    @foreach (var person in people)
    {
        <Details @key="person" Data="@person.Data" />
    }
</div>
```

```razor
@foreach (var person in people)
{
    <div @key="person">
        <Details Data="@person.Data" />
    </div>
}
```

```razor
<ol>
    @foreach (var person in people)
    {
        <li @key="person">
            <Details Data="@person.Data" />
        </li>
    }
</ol>
```

The following examples only scope [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) to the `<div>` or `<li>` element that surrounds each `Details` component instance. Therefore, `person` data for each member of the `people` collection is **not** keyed on each `person` instance across the rendered `Details` components. Avoid the following patterns when using [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key):

```razor
@foreach (var person in people)
{
    <div>
        <Details @key="person" Data="@person.Data" />
    </div>
}
```

```razor
<ol>
    @foreach (var person in people)
    {
        <li>
            <Details @key="person" Data="@person.Data" />
        </li>
    }
</ol>
```

## When not to use `@key`

There's a performance cost when rendering with [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key). The performance cost isn't large, but only specify [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) if preserving the element or component benefits the app.

Even if [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) isn't used, Blazor preserves child element and component instances as much as possible. The only advantage to using [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) is control over *how* model instances are mapped to the preserved component instances, instead of Blazor selecting the mapping.

## Values to use for `@key`

Generally, it makes sense to supply one of the following values for [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key):

* Model object instances. For example, the `Person` instance (`person`) was used in the earlier example. This ensures preservation based on object reference equality.
* Unique identifiers. For example, unique identifiers can be based on primary key values of type `int`, `string`, or `Guid`.

Ensure that values used for [`@key`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23key) don't clash. If clashing values are detected within the same parent element, Blazor throws an exception because it can't deterministically map old elements or components to new elements or components. Only use distinct values, such as object instances or primary key values.
