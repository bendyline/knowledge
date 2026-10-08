---
title: ASP.NET Core Blazor attribute splatting and arbitrary parameters
author: guardrex
description: Learn how components can capture and render additional attributes in addition to the component's declared parameters.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/attribute-splatting
---
# ASP.NET Core Blazor attribute splatting and arbitrary parameters

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


Components can capture and render additional attributes in addition to the component's declared parameters and fields. Additional attributes can be captured in a dictionary and then applied to an element, called *splatting*, when the component is rendered using the [`@attributes`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attributes) Razor directive attribute. This scenario is useful for defining a component that produces a markup element that supports a variety of customizations. For example, it can be tedious to define attributes separately for an `<input>` that supports many parameters or fields.

## Attribute splatting

In the following `Splat` component:

* The first `<input>` element (`id="useIndividualParams"`) uses individual component fields.
* The second `<input>` element (`id="useAttributesDict"`) uses attribute splatting.

`Splat.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Splat.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Splat.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/Splat.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/Splat.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/Splat.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/Splat.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



Except for `id`, the rendered `<input>` elements in the webpage have identical attributes:

```html
<input id="useIndividualParams"
       maxlength="10"
       placeholder="Input placeholder text"
       required="required"
       size="50">

<input id="useAttributesDict"
       maxlength="10"
       placeholder="Input placeholder text"
       required="required"
       size="50">
```

Although the preceding example uses fields for the first `<input>` element (`id="useIndividualParams"`), the same behavior applies when component parameters are used.

## Arbitrary attributes

To accept arbitrary attributes, define a [component parameter](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23component-parameters) with the [Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues) property set to `true`:

```razor
@code {
    [Parameter(CaptureUnmatchedValues = true)]
    public Dictionary<string, object>? InputAttributes { get; set; }
}
```

The [Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues) property on [`[Parameter]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterAttribute) allows the parameter to match all attributes that don't match any other parameter. A component can only define a single parameter with [Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues). The property type used with [Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterAttribute.CaptureUnmatchedValues) must be assignable from [`Dictionary<string, object>`](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%25602) with string keys. Use of [`IEnumerable<KeyValuePair<string, object>>`](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%25601) or [`IReadOnlyDictionary<string, object>`](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyDictionary%25602) are also options in this scenario.

The position of [`@attributes`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attributes) relative to the position of element attributes is important. When [`@attributes`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attributes) are splatted on the rendered element, the attributes are processed from right to left (last to first) with the first attribute winning for any common attributes. Consider the following example of a parent component that consumes a child component, where the child sets an "`extra`" attribute and the parent component splats an "`extra`" attribute on the child component.

`AttributeOrderChild1.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/AttributeOrderChild1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/AttributeOrderChild1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Shared/splat-attributes-and-arbitrary-parameters/AttributeOrderChild1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Shared/splat-attributes-and-arbitrary-parameters/AttributeOrderChild1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Shared/splat-attributes-and-arbitrary-parameters/AttributeOrderChild1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Shared/splat-attributes-and-arbitrary-parameters/AttributeOrderChild1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-9.0**

`AttributeOrder1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/AttributeOrder1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`AttributeOrder1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/AttributeOrder1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`AttributeOrderParent1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/AttributeOrderParent1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`AttributeOrderParent1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/AttributeOrderParent1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`AttributeOrderParent1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/AttributeOrderParent1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: < aspnetcore-5.0**

`AttributeOrderParent1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/AttributeOrderParent1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



The `AttributeOrderChild1` component's `extra` attribute is set to the right of [`@attributes`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attributes). The `AttributeOrderParent1` component's rendered `<div>` contains `extra="5"` when passed through the additional attribute because the attributes are processed right to left (last to first) with the first "`extra`" attribute winning, which is the hard-coded `extra` HTML attribute of the `AttributeOrderParent1` component:

```html
<div extra="5" />
```

In the following example, the order of `extra` and [`@attributes`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23attributes) is reversed in the child component's `<div>`. In this scenario, the `AttributeOrderParent2` component's rendered `<div>` contains `extra="10"` when passed through the additional attribute because the first "`extra`" attribute processed is the splatted `extra` HTML attribute from the parent component.

`AttributeOrderChild2.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/AttributeOrderChild2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/AttributeOrderChild2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Shared/splat-attributes-and-arbitrary-parameters/AttributeOrderChild2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Shared/splat-attributes-and-arbitrary-parameters/AttributeOrderChild2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Shared/splat-attributes-and-arbitrary-parameters/AttributeOrderChild2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Shared/splat-attributes-and-arbitrary-parameters/AttributeOrderChild2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-9.0**

`AttributeOrder2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/AttributeOrder2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`AttributeOrder2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/AttributeOrder2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`AttributeOrderParent2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/AttributeOrderParent2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`AttributeOrderParent2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/AttributeOrderParent2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`AttributeOrderParent2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/AttributeOrderParent2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



**Applies to: < aspnetcore-5.0**

`AttributeOrderParent2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/splat-attributes-and-arbitrary-parameters/AttributeOrderParent2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/splat-attributes-and-arbitrary-parameters.md)



The `<div>` in the parent component's rendered webpage contains `extra="10"`:

```html
<div extra="10" />
```
