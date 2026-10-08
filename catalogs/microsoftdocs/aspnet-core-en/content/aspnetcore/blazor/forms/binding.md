---
title: ASP.NET Core Blazor forms binding
ai-usage: ai-assisted
author: guardrex
description: Learn how to use binding in Blazor forms.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 09/23/2026
uid: blazor/forms/binding
---
# ASP.NET Core Blazor forms binding

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


This article explains how to use binding in Blazor forms.

## `EditForm`/`EditContext` model

An [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) creates an [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext) based on the assigned object as a [cascading value](../components/cascading-values-and-parameters.md) for other components in the form. The [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext) tracks metadata about the edit process, including which form fields have been modified and the current validation messages. Assigning to either an [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model) or an [Microsoft.AspNetCore.Components.Forms.EditForm.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.EditContext) can bind a form to data.

## Model binding

Assignment to [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model):

**Applies to: \>= aspnetcore-8.0**

```razor
<EditForm ... Model="Model" ...>
    ...
</EditForm>

@code {
    [SupplyParameterFromForm]
    private Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();
}
```



**Applies to: < aspnetcore-8.0**

```razor
<EditForm ... Model="Model" ...>
    ...
</EditForm>

@code {
    public Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();
}
```

> **Note:**
> Most of this article's form model examples bind forms to C# *properties*, but C# field binding is also supported.



When a different object instance is assigned to the [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model) parameter of `EditForm`, the form creates a new `EditContext`. The new context starts with no modified fields or validation messages.

## Context binding

Assignment to [Microsoft.AspNetCore.Components.Forms.EditForm.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.EditContext):

**Applies to: \>= aspnetcore-8.0**

```razor
<EditForm ... EditContext="editContext" ...>
    ...
</EditForm>

@code {
    private EditContext? editContext;

    [SupplyParameterFromForm]
    private Starship? Model { get; set; }

    protected override void OnInitialized()
    {
        Model ??= new();
        editContext = new(Model);
    }
}
```



**Applies to: < aspnetcore-8.0**

```razor
<EditForm ... EditContext="editContext" ...>
    ...
</EditForm>

@code {
    private EditContext? editContext;

    public Starship? Model { get; set; }

    protected override void OnInitialized()
    {
        Model ??= new();
        editContext = new(Model);
    }
}
```



Assign **either** an [Microsoft.AspNetCore.Components.Forms.EditForm.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.EditContext) **or** a [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model) to an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm). If both are assigned, a runtime error is thrown.

**Applies to: \>= aspnetcore-8.0**

## Supported types

Binding supports:

* Primitive types
* Collections
* Complex types
* Recursive types
* Types with constructors
* Enums

You can also use the [`[DataMember]`](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) and [`[IgnoreDataMember]`](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IgnoreDataMemberAttribute) attributes to customize model binding. Use these attributes to rename properties, ignore properties, and mark properties as required.

When binding a type with constructor parameters, if a constructor parameter matches a property by name, the constructor parameter takes precedence. The mapper uses the property's explicit `DataMember.Name`, if present, as the form field name, but otherwise ignores the property's mapping attributes. Constructor parameters are always required.

## Additional binding options

Additional model binding options are available from [Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions) when calling [Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A):

* [Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingCollectionSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingCollectionSize%252A): Maximum number of elements allowed in a form collection.
* [Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingRecursionDepth%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingRecursionDepth%252A): Maximum depth allowed when recursively mapping form data.
* [Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingErrorCount%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingErrorCount%252A): Maximum number of errors allowed when mapping form data.
* [Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingKeySize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingKeySize%252A): Maximum size of the buffer used to read form data keys.

The following demonstrates the default values assigned by the framework:

```csharp
builder.Services.AddRazorComponents(options =>
{
    options.FormMappingUseCurrentCulture = true;
    options.MaxFormMappingCollectionSize = 1024;
    options.MaxFormMappingErrorCount = 200;
    options.MaxFormMappingKeySize = 1024 * 2;
    options.MaxFormMappingRecursionDepth = 64;
}).AddInteractiveServerComponents();
```

## Form names

Use the [Microsoft.AspNetCore.Components.Forms.EditForm.FormName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.FormName%252A) parameter to assign a form name. Form names must be unique to bind model data. The following form is named `RomulanAle`:

```razor
<EditForm ... FormName="RomulanAle" ...>
    ...
</EditForm>
```

Supplying a form name:

* Is required for all forms that are submitted by statically-rendered server-side components.
* Isn't required for forms that are submitted by interactively-rendered components, which includes forms in Blazor WebAssembly apps and components with an interactive render mode. However, we recommend supplying a unique form name for every form to prevent runtime form posting errors if interactivity is ever dropped for a form.

The form name is only checked when the form is posted to an endpoint as a traditional HTTP POST request from a statically-rendered server-side component. The framework doesn't throw an exception at the point of rendering a form, but only at the point that an HTTP POST arrives and doesn't specify a form name.

There's an unnamed (empty string) form scope above the app's root component, which suffices when there are no form name collisions in the app. If form name collisions are possible, such as when including a form from a library and you have no control of the form name used by the library's developer, provide a form name scope with the [Microsoft.AspNetCore.Components.Forms.FormMappingScope](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FormMappingScope) component in the Blazor Web App's main project.

In the following example, the `HelloFormFromLibrary` component has a form named `Hello` and is in a library.

`HelloFormFromLibrary.razor`:

```razor
<EditForm FormName="Hello" Model="this" OnSubmit="Submit">
    <InputText @bind-Value="Name" />
    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Hello @Name from the library's form!</p>
}

@code {
    bool submitted = false;

    [SupplyParameterFromForm]
    private string? Name { get; set; }

    private void Submit() => submitted = true;
}
```

The following `NamedFormsWithScope` component uses the library's `HelloFormFromLibrary` component and also has a form named `Hello`. The [Microsoft.AspNetCore.Components.Forms.FormMappingScope](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FormMappingScope) component's scope name is `ParentContext` for any forms supplied by the `HelloFormFromLibrary` component. Although both of the forms in this example have the form name (`Hello`), the form names don't collide and events are routed to the correct form for form POST events.

`NamedFormsWithScope.razor`:

```razor
@page "/named-forms-with-scope"

<div>Hello form from a library</div>

<FormMappingScope Name="ParentContext">
    <HelloFormFromLibrary />
</FormMappingScope>

<div>Hello form using the same form name</div>

<EditForm FormName="Hello" Model="this" OnSubmit="Submit">
    <InputText @bind-Value="Name" />
    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Hello @Name from the app form!</p>
}

@code {
    bool submitted = false;

    [SupplyParameterFromForm]
    private string? Name { get; set; }

    private void Submit() => submitted = true;
}
```

## Supply a parameter from the form (`[SupplyParameterFromForm]`)

The `[SupplyParameterFromForm]` attribute indicates that the value of the associated property should be supplied from the form data for the form. Data in the request that matches the name of the property is bound to the property. Inputs based on `InputBase<TValue>` generate form value names that match the names Blazor uses for model binding. Unlike component parameter properties (`[Parameter]`), properties annotated with `[SupplyParameterFromForm]` aren't required to be marked `public`.

Blazor form mapping with [`[SupplyParameterFromForm]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute) doesn't use MVC model binding. Attributes in the [Microsoft.AspNetCore.Mvc.ModelBinding](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding) namespace, such as [`[BindNever]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindNeverAttribute) and [`[BindRequired]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindRequiredAttribute), aren't supported. Don't use these attributes to prevent overposting. Instead, use a dedicated form model, view model, or data transfer object (DTO) that includes only the properties users are allowed to modify. For more information, see [Mitigate overposting attacks](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Findex%23mitigate-overposting-attacks).

You can specify the following form binding parameters to the [`[SupplyParameterFromForm]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute):

* [Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute.Name%252A): Gets or sets the name for the parameter. The name is used to determine the prefix to use to match the form data and decide whether or not the value needs to be bound.
* [Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute.FormName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute.FormName%252A): Gets or sets the name for the handler. The name is used to match the parameter to the form by form name to decide whether or not the value needs to be bound.

The following example independently binds two forms to their models by form name.

`Starship6.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship6.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Starship6.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0**

## Nest and bind forms

The following guidance demonstrates how to nest and bind child forms.

The following ship details class (`ShipDetails`) holds a description and length for a subform.

`ShipDetails.cs`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/ShipDetails.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/ShipDetails.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0**

The following `Ship` class names an identifier (`Id`) and includes the ship details.

`Ship.cs`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Ship.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Ship.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0**

The following subform is used for editing values of the `ShipDetails` type. This is implemented by inheriting [Microsoft.AspNetCore.Components.Forms.Editor%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.Editor%25601) at the top of the component. [Microsoft.AspNetCore.Components.Forms.Editor%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.Editor%25601) ensures that the child component generates the correct form field names based on the model (`T`), where `T` in the following example is `ShipDetails`.

`StarshipSubform.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/StarshipSubform.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/StarshipSubform.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0**

The main form is bound to the `Ship` class. The `StarshipSubform` component is used to edit ship details, bound as `Model!.Details`.

`Starship7.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship7.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Starship7.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0**

## Initialize form data with static SSR

When a component adopts static SSR, the [`OnInitialized{Async}` lifecycle method](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23component-initialization-oninitializedasync) and the [`OnParametersSet{Async}` lifecycle method](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23after-parameters-are-set-onparameterssetasync) fire when the component is initially rendered and on every form POST to the server. To initialize form model values, confirm if the model already has data before assigning new model values in `OnParametersSet{Async}`, as the following example demonstrates.

`StarshipInit.razor`:

```razor
@page "/starship-init"
@inject ILogger<StarshipInit> Logger

<EditForm Model="Model" OnValidSubmit="Submit" FormName="StarshipInit">
    <div>
        <label>
            Identifier:
            <InputText @bind-Value="Model!.Id" />
        </label>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</EditForm>

@code {
    [SupplyParameterFromForm]
    private Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    protected override void OnParametersSet()
    {
        if (Model!.Id == default)
        {
            LoadData();
        }
    }

    private void LoadData()
    {
        Model!.Id = "Set by LoadData";
    }

    private void Submit()
    {
        Logger.LogInformation("Id = {Id}", Model?.Id);
    }

    public class Starship
    {
        public string? Id { get; set; }
    }
}
```

## Advanced form mapping error scenarios

The framework instantiates and populates the [Microsoft.AspNetCore.Components.Forms.FormMappingContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FormMappingContext) for a form, which is the context associated with a given form's mapping operation. Each mapping scope (defined by a [Microsoft.AspNetCore.Components.Forms.FormMappingScope](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FormMappingScope) component) instantiates [Microsoft.AspNetCore.Components.Forms.FormMappingContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FormMappingContext). Each time a `[SupplyParameterFromForm]` asks the context for a value, the framework populates the [Microsoft.AspNetCore.Components.Forms.FormMappingContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FormMappingContext) with the attempted value and any mapping errors.

Developers aren't expected to interact with [Microsoft.AspNetCore.Components.Forms.FormMappingContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FormMappingContext) directly, as it's mainly a source of data for [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601), [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext), and other internal implementations to show mapping errors as validation errors. In advanced custom scenarios, developers can access [Microsoft.AspNetCore.Components.Forms.FormMappingContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FormMappingContext) directly as a `[CascadingParameter]` to write custom code that consumes the attempted values and mapping errors.



## `InputText` based on the input event

Use the [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) component to create a custom component that uses the `oninput` event ([`input`](https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event)) instead of the `onchange` event ([`change`](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)). Use of the `input` event triggers field validation on each keystroke.

The following `CustomInputText` component inherits the framework's `InputText` component and sets event binding to the `oninput` event ([`input`](https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event)).

`CustomInputText.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/CustomInputText.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)

The `CustomInputText` component can be used anywhere [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) is used. The following  component uses the shared `CustomInputText` component.

`Starship11.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship11.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Starship11.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/binding.md)



**Applies to: < aspnetcore-8.0**

```razor
@page "/starship-11"
@using System.ComponentModel.DataAnnotations
@inject ILogger<Starship11> Logger

<EditForm Model="Model" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <CustomInputText @bind-Value="Model!.Id" />
    <button type="submit">Submit</button>
</EditForm>

<div>
    CurrentValue: @Model?.Id
</div>

@code {
    public Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    private void Submit()
    {
        Logger.LogInformation("Submit called: Processing the form");
    }

    public class Starship
    {
        [Required]
        [StringLength(10, ErrorMessage = "Id is too long.")]
        public string? Id { get; set; }
    }
}
```



## Custom input components

For custom input processing scenarios, the following subsections demonstrate custom input components:

* [Input component based on `InputBase<T>`](#input-component-based-on-inputbaset): The component inherits from [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601), which provides a base implementation for binding, callbacks, and validation. Components that inherit from [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601) must be used in a Blazor form ([Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm)).

* [Input component with full developer control](#input-component-with-full-developer-control): The component takes full control of input processing. The component's code must manage binding, callbacks, and validation. The component can be used inside or outside of a Blazor form.

We recommend that you derive your custom input components from [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601) unless specific requirements prevent you from doing so. The [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601) class is actively maintained by the ASP.NET Core team, ensuring it stays up-to-date with the latest Blazor features and framework changes.

### Input component based on `InputBase<T>`

The following example component:

* Inherits from [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601). Components that inherit from [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601) must be used in a Blazor form ([Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm)).
* Takes boolean input from a checkbox.
* Sets the background color of its container `<div>` based on the checkbox's state, which occurs when the `AfterChange` method executes after binding (`@bind:after`).
* Is required to override the base class's `TryParseValueFromString` method but doesn't process string input data because a checkbox doesn't provide string data. Example implementations of `TryParseValueFromString` for other types of input components that process string input are available in the [ASP.NET Core reference source](https://github.com/search?q=repo%3Adotnet%2Faspnetcore%20TryParseValueFromString&type=code).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


`EngineeringApprovalInputDerived.razor`:

```razor
@using System.Diagnostics.CodeAnalysis
@inherits InputBase<bool>

<div class="@divCssClass">
    <label>
        Engineering Approval:
        <input @bind="CurrentValue" @bind:after="AfterChange" class="@CssClass" 
            type="checkbox" />
    </label>
</div>

@code {
    private string? divCssClass;

    private void AfterChange()
    {
        divCssClass = CurrentValue ? "bg-success text-white" : null;
    }

    protected override bool TryParseValueFromString(
        string? value, out bool result, 
        [NotNullWhen(false)] out string? validationErrorMessage)
            => throw new NotSupportedException(
                "This component does not parse string inputs. " +
                $"Bind to the '{nameof(CurrentValue)}' property, " +
                $"not '{nameof(CurrentValueAsString)}'.");
}
```

To use the preceding component in the [starship example form (`Starship3.razor`/`Starship.cs`)](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Finput-components%23example-form), replace the `<div>` block for the engineering approval field with an `EngineeringApprovalInputDerived` component instance bound to the model's `IsValidatedDesign` property:

```diff
- <div>
-     <label>
-         Engineering Approval: 
-         <InputCheckbox @bind-Value="Model!.IsValidatedDesign" />
-     </label>
- </div>
+ <EngineeringApprovalInputDerived @bind-Value="Model!.IsValidatedDesign" />
```

If the component that inherits from [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601) is ever statically rendered, assign the [Microsoft.AspNetCore.Components.Forms.InputBase%601.NameAttributeValue](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601.NameAttributeValue) property to the `name` attribute of `<input>` elements:

```razor
<input @bind="CurrentValue" @bind:after="AfterChange" class="@CssClass"
    type="checkbox" name="@NameAttributeValue" />
```

The preceding assignment isn't necessary if the component is guaranteed to always render interactively.

### Input component with full developer control

The following example component:

* Doesn't inherit from [Microsoft.AspNetCore.Components.Forms.InputBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601). The component takes full control of input processing, including binding, callbacks, and validation. The component can be used inside or outside of a Blazor form ([Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm)).
* Takes boolean input from a checkbox.
* Changes the background color if the checkbox is checked.

Code in the component includes:

* The `Value` property is used with two-way binding to get or set the value of the input. `ValueChanged` is the callback that updates the bound value.

* When used in a Blazor form:

  * The [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext) is a [cascading value](../components/cascading-values-and-parameters.md).
  * `fieldCssClass` styles the field based on the result of [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext) validation.
  * `ValueExpression` is an expression (`Expression<Func<T>>`) assigned by the framework that identifies the bound value.
  * [Microsoft.AspNetCore.Components.Forms.FieldIdentifier](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FieldIdentifier) uniquely identifies a single field that can be edited, usually corresponding to a model property. The field identifier is created with the expression that identifies the bound value (`ValueExpression`).

* In the `OnChange` event handler:

  * The value of the checkbox input is obtained from [Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs).
  * The background color and text color of the container `<div>` element are set.
  * [Microsoft.AspNetCore.Components.EventCallback.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback.InvokeAsync%252A) invokes the delegate associated with the binding and dispatches an event notification to consumers that the value has changed.
  * If the component is used in an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) (the `EditContext` property isn't `null`), [Microsoft.AspNetCore.Components.Forms.EditContext.NotifyFieldChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.NotifyFieldChanged%252A) is called to trigger validation.

`EngineeringApprovalInputStandalone.razor`:

```razor
@using System.Globalization
@using System.Linq.Expressions

<div class="@divCssClass">
    <label>
        Engineering Approval:
        <input class="@fieldCssClass" @onchange="OnChange" type="checkbox" 
            value="@Value" />
    </label>
</div>

@code {
    private string? divCssClass;
    private FieldIdentifier fieldIdentifier;
    private string? fieldCssClass => EditContext?.FieldCssClass(fieldIdentifier);

    [CascadingParameter]
    private EditContext? EditContext { get; set; }

    [Parameter]
    public bool? Value { get; set; }

    [Parameter]
    public EventCallback<bool> ValueChanged { get; set; }

    [Parameter]
    public Expression<Func<bool>>? ValueExpression { get; set; }

    protected override void OnInitialized()
    {
        fieldIdentifier = FieldIdentifier.Create(ValueExpression!);
    }

    private async Task OnChange(ChangeEventArgs args)
    {
        BindConverter.TryConvertToBool(args.Value, CultureInfo.CurrentCulture, 
            out var value);

        divCssClass = value ? "bg-success text-white" : null;

        await ValueChanged.InvokeAsync(value);
        EditContext?.NotifyFieldChanged(fieldIdentifier);
    }
}
```

To use the preceding component in the [starship example form (`Starship3.razor`/`Starship.cs`)](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Finput-components%23example-form), replace the `<div>` block for the engineering approval field with a `EngineeringApprovalInputStandalone` component instance bound to the model's `IsValidatedDesign` property:

```diff
- <div>
-     <label>
-         Engineering Approval: 
-         <InputCheckbox @bind-Value="Model!.IsValidatedDesign" />
-     </label>
- </div>
+ <EngineeringApprovalInputStandalone @bind-Value="Model!.IsValidatedDesign" />
```

The `EngineeringApprovalInputStandalone` component is also functional outside of an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm):

```razor
<EngineeringApprovalInputStandalone @bind-Value="ValidDesign" />

<div>
    <b>ValidDesign:</b> @ValidDesign
</div>

@code {
    private bool ValidDesign { get; set; }
}
```

## Radio buttons

**Applies to: \>= aspnetcore-5.0**

The example in this section is based on the `Starfleet Starship Database` form (`Starship3` component) of the [Example form](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Finput-components%23example-form) section of this article.

Add the following [`enum` types](https://learn.microsoft.com/dotnet/csharp/language-reference/language-specification/enums) to the app. Create a new file to hold them or add them to the `Starship.cs` file.

```csharp
public class ComponentEnums
{
    public enum Manufacturer { SpaceX, NASA, ULA, VirginGalactic, Unknown }
    public enum Color { ImperialRed, SpacecruiserGreen, StarshipBlue, VoyagerOrange }
    public enum Engine { Ion, Plasma, Fusion, Warp }
}
```

Make the `ComponentEnums` class accessible to the:

* `Starship` model in `Starship.cs` (for example, `using static ComponentEnums;`).
* `Starfleet Starship Database` form (`Starship3.razor`) (for example, `@using static ComponentEnums`).

Use [Microsoft.AspNetCore.Components.Forms.InputRadio%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadio%25601) components with the [Microsoft.AspNetCore.Components.Forms.InputRadioGroup%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadioGroup%25601) component to create a radio button group. In the following example, properties are added to the `Starship` model described in the [Example form](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Finput-components%23example-form) section of the *Input components* article:

```csharp
[Required]
[Range(typeof(Manufacturer), nameof(Manufacturer.SpaceX), 
    nameof(Manufacturer.VirginGalactic), ErrorMessage = "Pick a manufacturer.")]
public Manufacturer Manufacturer { get; set; } = Manufacturer.Unknown;

[Required, EnumDataType(typeof(Color))]
public Color? Color { get; set; } = null;

[Required, EnumDataType(typeof(Engine))]
public Engine? Engine { get; set; } = null;
```

Update the `Starfleet Starship Database` form (`Starship3` component) of the [Example form](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Finput-components%23example-form) section of the *Input components* article. Add the components to produce:

* A radio button group for the ship manufacturer.
* A nested radio button group for engine and ship color.

> **Note:**
> Nested radio button groups aren't often used in forms because they can result in a disorganized layout of form controls that may confuse users. However, there are cases when they make sense in UI design, such as in the following example that pairs recommendations for two user inputs, ship engine and ship color. One engine and one color are required by the form's validation. The form's layout uses nested [Microsoft.AspNetCore.Components.Forms.InputRadioGroup%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadioGroup%25601)s to pair engine and color recommendations. However, the user can combine any engine with any color to submit the form.

> **Note:**
> Be sure to make the `ComponentEnums` class available to the component for the following example:
>
> ```razor
> @using static ComponentEnums
> ```

```razor
<fieldset>
    <legend>Manufacturer</legend>
    <InputRadioGroup @bind-Value="Model!.Manufacturer">
        @foreach (var manufacturer in Enum.GetValues<Manufacturer>())
        {
            <div>
                <label>
                    <InputRadio Value="manufacturer" />
                    @manufacturer
                </label>
            </div>
        }
    </InputRadioGroup>
</fieldset>

<fieldset>
    <legend>Engine and Color</legend>
    <p>
        Engine and color pairs are recommended, but any
        combination of engine and color is allowed.
    </p>
    <InputRadioGroup Name="engine" @bind-Value="Model!.Engine">
        <InputRadioGroup Name="color" @bind-Value="Model!.Color">
            <div style="margin-bottom:5px">
                <div>
                    <label>
                        <InputRadio Name="engine" Value="Engine.Ion" />
                        Ion
                    </label>
                </div>
                <div>
                    <label>
                        <InputRadio Name="color" Value="Color.ImperialRed" />
                        Imperial Red
                    </label>
                </div>
            </div>
            <div style="margin-bottom:5px">
                <div>
                    <label>
                        <InputRadio Name="engine" Value="Engine.Plasma" />
                        Plasma
                    </label>
                </div>
                <div>
                    <label>
                        <InputRadio Name="color" Value="Color.SpacecruiserGreen" />
                        Spacecruiser Green
                    </label>
                </div>
            </div>
            <div style="margin-bottom:5px">
                <div>
                    <label>
                        <InputRadio Name="engine" Value="Engine.Fusion" />
                        Fusion
                    </label>
                </div>
                <div>
                    <label>
                        <InputRadio Name="color" Value="Color.StarshipBlue" />
                        Starship Blue
                    </label>
                </div>
            </div>
            <div style="margin-bottom:5px">
                <div>
                    <label>
                        <InputRadio Name="engine" Value="Engine.Warp" />
                        Warp
                    </label>
                </div>
                <div>
                    <label>
                        <InputRadio Name="color" Value="Color.VoyagerOrange" />
                        Voyager Orange
                    </label>
                </div>
            </div>
        </InputRadioGroup>
    </InputRadioGroup>
</fieldset>
```

> **Note:**
> If `Name` is omitted, [Microsoft.AspNetCore.Components.Forms.InputRadio%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadio%25601) components are grouped by their most recent ancestor.

If you implemented the preceding Razor markup in the `Starship3` component of the [Example form](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Finput-components%23example-form) section of the *Input components* article, update the logging for the `Submit` method:

```csharp
Logger.LogInformation("Id = {Id} Description = {Description} " +
    "Classification = {Classification} MaximumAccommodation = " +
    "{MaximumAccommodation} IsValidatedDesign = " +
    "{IsValidatedDesign} ProductionDate = {ProductionDate} " +
    "Manufacturer = {Manufacturer}, Engine = {Engine}, " +
    "Color = {Color}",
    Model?.Id, Model?.Description, Model?.Classification,
    Model?.MaximumAccommodation, Model?.IsValidatedDesign,
    Model?.ProductionDate, Model?.Manufacturer, Model?.Engine, 
    Model?.Color);
```



**Applies to: < aspnetcore-5.0**

When working with radio buttons in a form, data binding is handled differently than other elements because radio buttons are evaluated as a group. The value of each radio button is fixed, but the value of the radio button group is the value of the selected radio button. The following example shows how to:

* Handle data binding for a radio button group.
* Support validation using a custom [Microsoft.AspNetCore.Components.Forms.InputRadio%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadio%25601) component.

`InputRadio.razor`:

```razor
@using System.Globalization
@inherits InputBase<TValue>
@typeparam TValue

<input @attributes="AdditionalAttributes" type="radio" value="@SelectedValue" 
       checked="@(SelectedValue.Equals(Value))" @onchange="OnChange" />

@code {
    [Parameter]
    public TValue SelectedValue { get; set; }

    private void OnChange(ChangeEventArgs args)
    {
        CurrentValueAsString = args.Value.ToString();
    }

    protected override bool TryParseValueFromString(string value, 
        out TValue result, out string errorMessage)
    {
        var success = BindConverter.TryConvertTo<TValue>(
            value, CultureInfo.CurrentCulture, out var parsedValue);
        if (success)
        {
            result = parsedValue;
            errorMessage = null;

            return true;
        }
        else
        {
            result = default;
            errorMessage = "The field isn't valid.";

            return false;
        }
    }
}
```

For more information on generic type parameters (`@typeparam`), see the following articles:

* [mvc/views/razor#typeparam](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23typeparam)
* [blazor/components/index#generic-type-parameter-support](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23generic-type-parameter-support)
* [blazor/components/templated-components](../components/templated-components.md)

Use the following example model.

`StarshipModel.cs`:

```csharp
using System.ComponentModel.DataAnnotations;

namespace BlazorServer80
{
    public class Model
    {
        [Range(1, 5)]
        public int Rating { get; set; }
    }
}
```

The following `RadioButtonExample` component uses the preceding `InputRadio` component to obtain and validate a rating from the user:

`RadioButtonExample.razor`:

```razor
@page "/radio-button-example"
@using System.ComponentModel.DataAnnotations
@using Microsoft.Extensions.Logging
@inject ILogger<RadioButtonExample> Logger

<h1>Radio Button Example</h1>

<EditForm Model="Model" OnValidSubmit="HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    @for (int i = 1; i <= 5; i++)
    {
        <div>
            <label>
                <InputRadio name="rate" SelectedValue="i" 
                    @bind-Value="Model.Rating" />
                @i
            </label>
        </div>
    }

    <div>
        <button type="submit">Submit</button>
    </div>
</EditForm>

<div>@Model.Rating</div>

@code {
    public StarshipModel Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    private void HandleValidSubmit()
    {
        Logger.LogInformation("HandleValidSubmit called");
    }
}
```
