---
title: ASP.NET Core Blazor input components
author: guardrex
description: Learn about built-in Blazor input components.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/forms/input-components
---
# ASP.NET Core Blazor input components

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


This article describes Blazor's built-in input components.

## Input components

The Blazor framework provides built-in input components to receive and validate user input. The built-in input components in the following table are supported in an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) with an [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext).

**Applies to: \>= aspnetcore-7.0**

The components in the table are also supported outside of a form in Razor component markup. Inputs are validated when they're changed and when a form is submitted.



**Applies to: \>= aspnetcore-5.0**

| Input component | Rendered as&hellip; |
| --- | --- |
| [Microsoft.AspNetCore.Components.Forms.InputCheckbox](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputCheckbox) | `<input type="checkbox">` |
| [Microsoft.AspNetCore.Components.Forms.InputDate%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputDate%25601) | `<input type="date">` |
| [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) | `<input type="file">` |
| [Microsoft.AspNetCore.Components.Forms.InputNumber%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputNumber%25601) | `<input type="number">` |
| [Microsoft.AspNetCore.Components.Forms.InputRadio%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadio%25601) | `<input type="radio">` |
| [Microsoft.AspNetCore.Components.Forms.InputRadioGroup%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadioGroup%25601) | Group of child [Microsoft.AspNetCore.Components.Forms.InputRadio%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadio%25601) |
| [Microsoft.AspNetCore.Components.Forms.InputSelect%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputSelect%25601) | `<select>` |
| [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) | `<input>` |
| [Microsoft.AspNetCore.Components.Forms.InputTextArea](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputTextArea) | `<textarea>` |
| [`Label<TValue>`](#label-component) (.NET 11 or later) | `<label>` |

For more information on the [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component, see [blazor/file-uploads](../file-uploads.md).



**Applies to: < aspnetcore-5.0**

| Input component | Rendered as&hellip; |
| --- | --- |
| [Microsoft.AspNetCore.Components.Forms.InputCheckbox](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputCheckbox) | `<input type="checkbox">` |
| [Microsoft.AspNetCore.Components.Forms.InputDate%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputDate%25601) | `<input type="date">` |
| [Microsoft.AspNetCore.Components.Forms.InputNumber%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputNumber%25601) | `<input type="number">` |
| [Microsoft.AspNetCore.Components.Forms.InputSelect%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputSelect%25601) | `<select>` |
| [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) | `<input>` |
| [Microsoft.AspNetCore.Components.Forms.InputTextArea](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputTextArea) | `<textarea>` |

> **Note:**
> [Microsoft.AspNetCore.Components.Forms.InputRadio%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadio%25601) and [Microsoft.AspNetCore.Components.Forms.InputRadioGroup%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputRadioGroup%25601) components are available in .NET 5 or later. For more information, select a .NET 5 or later version of this article.



All of the input components, including [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm), support arbitrary attributes. Any attribute that doesn't match a component parameter is added to the rendered HTML element.

Input components provide default behavior for validating when a field is changed:

* For input components in a form with an [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext), the default validation behavior includes updating the field CSS class to reflect the field's state as valid or invalid with validation styling of the underlying HTML element.
* For controls that don't have an [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext), the default validation reflects the valid or invalid state but doesn't provide validation styling to the underlying HTML element.

Some components include useful parsing logic. For example, [Microsoft.AspNetCore.Components.Forms.InputDate%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputDate%25601) and [Microsoft.AspNetCore.Components.Forms.InputNumber%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputNumber%25601) handle unparseable values gracefully by registering unparseable values as validation errors. Types that can accept null values also support nullability of the target field (for example, `int?` for a nullable integer).

**Applies to: \>= aspnetcore-9.0**

The [Microsoft.AspNetCore.Components.Forms.InputNumber%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputNumber%25601) component supports the [`type="range"` attribute](https://developer.mozilla.org/docs/Web/HTML/Element/input/range), which creates a range input that supports model binding and form validation, typically rendered as a slider or dial control rather than a text box:

```razor
<InputNumber @bind-Value="..." max="..." min="..." step="..." type="range" />
```



**Applies to: \>= aspnetcore-5.0**

For more information on the [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component, see [blazor/file-uploads](../file-uploads.md).



## Example form

The following `Starship` type, which is used in several of this article's examples and examples in other *Forms* node articles, defines a diverse set of properties with data annotations:

* `Id` is required because it's annotated with the [System.ComponentModel.DataAnnotations.RequiredAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RequiredAttribute). `Id` requires a value of at least one character but no more than 16 characters using the [System.ComponentModel.DataAnnotations.StringLengthAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.StringLengthAttribute).
* `Description` is optional because it isn't annotated with the [System.ComponentModel.DataAnnotations.RequiredAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RequiredAttribute).
* `Classification` is required.
* The `MaximumAccommodation` property defaults to zero but requires a value from one to 100,000 per its [System.ComponentModel.DataAnnotations.RangeAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RangeAttribute).
* `IsValidatedDesign` requires that the property have a `true` value, which matches a selected state when the property is bound to a checkbox in the UI (`<input type="checkbox">`).
* `ProductionDate` is a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and required.

`Starship.cs`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Starship.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Starship.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Starship.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Starship.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Starship.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Starship.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



The following form accepts and validates user input using:

* The properties and validation defined in the preceding `Starship` model.
* Several of Blazor's built-in input components.

When the model property for the ship's classification (`Classification`) is set, the option matching the model is checked. For example, `checked="@(Model!.Classification == "Exploration")"` for the classification of an exploration ship. The reason for explicitly setting the checked option is that the value of a `<select>` element is only present in the browser. If the form is rendered on the server after it's submitted, any state from the client is overridden with state from the server, which doesn't ordinarily mark an option as checked. By setting the checked option from the model property, the classification always reflects the model's state. This preserves the classification selection across form submissions that result in the form rerendering on the server. In situations where the form isn't rerendered on the server, such as when the Interactive Server render mode is applied directly to the component, explicit assignment of the checked option from the model isn't necessary because Blazor preserves the state for the `<select>` element on the client.

`Starship3.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Starship3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: < aspnetcore-8.0**

```razor
@page "/starship-3"
@inject ILogger<Starship3> Logger

<h1>Starfleet Starship Database</h1>

<h2>New Ship Entry Form</h2>

<EditForm Model="Model" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <div>
        <label>
            Identifier:
            <InputText @bind-Value="Model!.Id" />
        </label>
    </div>
    <div>
        <label>
            Description (optional):
            <InputTextArea @bind-Value="Model!.Description" />
        </label>
    </div>
    <div>
        <label>
            Primary Classification:
            <InputSelect @bind-Value="Model!.Classification">
                <option value="">Select classification ...</option>
                <option value="Exploration">Exploration</option>
                <option value="Diplomacy">Diplomacy</option>
                <option value="Defense">Defense</option>
            </InputSelect>
        </label>
    </div>
    <div>
        <label>
            Maximum Accommodation:
            <InputNumber @bind-Value="Model!.MaximumAccommodation" />
        </label>
    </div>
    <div>
        <label>
            Engineering Approval:
            <InputCheckbox @bind-Value="Model!.IsValidatedDesign" />
        </label>
    </div>
    <div>
        <label>
            Production Date:
            <InputDate @bind-Value="Model!.ProductionDate" />
        </label>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</EditForm>

@code {
    private Starship? Model { get; set; }

    protected override void OnInitialized() =>
        Model ??= new() { ProductionDate = DateTime.UtcNow };

    private void Submit()
    {
        Logger.LogInformation("Id = {Id} Description = {Description} " +
            "Classification = {Classification} MaximumAccommodation = " +
            "{MaximumAccommodation} IsValidatedDesign = " +
            "{IsValidatedDesign} ProductionDate = {ProductionDate}", 
            Model?.Id, Model?.Description, Model?.Classification, 
            Model?.MaximumAccommodation, Model?.IsValidatedDesign, 
            Model?.ProductionDate);
    }
}
```



The [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) in the preceding example creates an [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext) based on the assigned `Starship` instance (`Model="..."`) and handles a valid form. The next example demonstrates how to assign an [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext) to a form and validate when the form is submitted.

In the following example:

* A shortened version of the earlier `Starfleet Starship Database` form (`Starship3` component) is used that only accepts a value for the starship's Id. The other `Starship` properties receive valid default values when an instance of the `Starship` type is created.
* The `Submit` method executes when the **`Submit`** button is selected.
* The form is validated by calling [Microsoft.AspNetCore.Components.Forms.EditContext.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.Validate%252A) in the `Submit` method.
* Logging is executed depending on the validation result.

`Starship4.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Starship4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: < aspnetcore-8.0**

```razor
@page "/starship-4"
@inject ILogger<Starship4> Logger

<EditForm EditContext="editContext" OnSubmit="Submit">
    <DataAnnotationsValidator />
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
    private EditContext? editContext;

    private Starship Model { get; set; }

    protected override void OnInitialized()
    {
        Model ??= 
            new()
            {
                Id = "NCC-1701",
                Classification = "Exploration",
                MaximumAccommodation = 150,
                IsValidatedDesign = true,
                ProductionDate = new DateTime(2245, 4, 11)
            };
        editContext = new(Model);
    }

    private async Task Submit()
    {
        if (editContext != null && editContext.Validate())
        {
            Logger.LogInformation("Submit called: Form is valid");

            // await ...
        }
        else
        {
            Logger.LogInformation("Submit called: Form is INVALID");
        }
    }
}
```



> **Note:**
> Changing the [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext) after it's assigned is **not** supported.

**Applies to: \>= aspnetcore-6.0**

## Multiple option selection with the `InputSelect` component

Binding supports [`multiple`](https://developer.mozilla.org/docs/Web/HTML/Attributes/multiple) option selection with the [Microsoft.AspNetCore.Components.Forms.InputSelect%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputSelect%25601) component. The [`@onchange`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23onevent) event provides an array of the selected options via [event arguments (`ChangeEventArgs`)](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fevent-handling%23event-arguments). The value must be bound to an array type, which results in the [Microsoft.AspNetCore.Components.Forms.InputSelect%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputSelect%25601) component automatically adding the [`multiple` attribute](https://developer.mozilla.org/docs/Web/HTML/Attributes/multiple) to the `<select>` element when the component is rendered.

In the following example, the user must select at least two starship classifications but no more than three classifications.

`Starship5.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Starship5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/input-components.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

```razor
@page "/starship-5"
@using System.ComponentModel.DataAnnotations
@inject ILogger<Starship5> Logger

<h1>Bind Multiple <code>InputSelect</code> Example</h1>

<EditForm EditContext="editContext" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <div>
        <label>
            Select classifications (Minimum: 2, Maximum: 3):
            <InputSelect @bind-Value="Model!.SelectedClassification">
                <option value="@Classification.Exploration">Exploration</option>
                <option value="@Classification.Diplomacy">Diplomacy</option>
                <option value="@Classification.Defense">Defense</option>
                <option value="@Classification.Research">Research</option>
            </InputSelect>
        </label>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</EditForm>

@if (Model?.SelectedClassification?.Length > 0)
{
    <div>@string.Join(", ", Model.SelectedClassification)</div>
}

@code {
    private EditContext? editContext;

    private Starship? Model { get; set; }

    protected override void OnInitialized()
    {
        Model ??= new();
        editContext = new(Model);
    }

    private void Submit()
    {
        Logger.LogInformation("Submit called: Processing the form");
    }

    private class Starship
    {
        [Required]
        [MinLength(2, ErrorMessage = "Select at least two classifications.")]
        [MaxLength(3, ErrorMessage = "Select no more than three classifications.")]
        public Classification[]? SelectedClassification { get; set; } =
            new[] { Classification.None };
    }

    private enum Classification { None, Exploration, Diplomacy, Defense, Research }
}
```



**Applies to: \>= aspnetcore-6.0**

For information on how empty strings and `null` values are handled in data binding, see the [Binding `InputSelect` options to C# object `null` values](#binding-inputselect-options-to-c-object-null-values) section.



## Binding `InputSelect` options to C# object `null` values

For information on how empty strings and `null` values are handled in data binding, see [blazor/components/data-binding#binding-select-element-options-to-c-object-null-values](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fdata-binding%23binding-select-element-options-to-c-object-null-values).

**Applies to: \>= aspnetcore-5.0**

## Display name support

Several built-in components support display names with the [Microsoft.AspNetCore.Components.Forms.InputBase%601.DisplayName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601.DisplayName%252A) parameter.

In the `Starfleet Starship Database` form (`Starship3` component) of the [Example form](#example-form) section, the production date of a new starship doesn't specify a display name:

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" />
</label>
```

If the field contains an invalid date when the form is submitted, the error message doesn't display a friendly name. The field name, "`ProductionDate`" doesn't have a space between "`Production`" and "`Date`" when it appears in the validation summary:

> The ProductionDate field must be a date.

Set the [Microsoft.AspNetCore.Components.Forms.InputBase%601.DisplayName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601.DisplayName%252A) property to a friendly name with a space between the words "`Production`" and "`Date`":

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" 
        DisplayName="Production Date" />
</label>
```

The validation summary displays the friendly name when the field's value is invalid:

> The Production Date field must be a date.



**Applies to: \>= aspnetcore-11.0**

<!-- UPDATE 11.0 - API cross-link 

                   <xref:Microsoft.AspNetCore.Components.Forms.DisplayName%601>
-->
The `DisplayName` component can be used to display property names from metadata attributes

```csharp
[Required, DisplayName("Production Date")]
public DateTime ProductionDate { get; set; }
```

The [`[Display]` attribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute) on the model class property is supported:

```csharp
[Required, Display(Name = "Production Date")]
public DateTime ProductionDate { get; set; }
```

Between the two approaches, the `[Display]` attribute is recommended, which makes additional properties available. The `[Display]` attribute also enables assigning a resource type for localization. When both attributes are present, `[Display]` takes precedence over `[DisplayName]`. If neither attribute is present, the component falls back to the property name.

Use the `DisplayName` component in labels or table headers:

```razor
<label>
    <DisplayName For="@(() => Model!.ProductionDate)" />
    <InputDate @bind-Value="Model!.ProductionDate" />
</label>
```



**Applies to: \>= aspnetcore-11.0**

## `Label` component

<!-- UPDATE 11.0 - API cross-link 

                   <xref:Microsoft.AspNetCore.Components.Forms.Label%601>
-->

The `Label` component renders a `<label>` element that automatically extracts the display name from a model property using `[Display]` or `[DisplayName]` attributes. This simplifies form creation by eliminating the need to manually specify label text.

### Nested pattern

The nested pattern wraps the input component inside the label:

```razor
<Label For="() => Model!.ProductionDate">
    <InputDate @bind-Value="Model!.ProductionDate" />
</Label>
```

This renders:

```html
<label>Production Date<input type="date" ... /></label>
```

### Non-nested pattern

For accessibility requirements or styling flexibility, use the non-nested pattern where the label's `for` attribute references the input's `id`:

```razor
<Label For="() => Model!.ProductionDate" />
<InputDate @bind-Value="Model!.ProductionDate" />
```

This renders:

```html
<label for="Model_ProductionDate">Production Date</label>
<input id="Model_ProductionDate" type="date" ... />
```

The `id` attribute is automatically sanitized to create a valid HTML id (dots are replaced with underscores to avoid CSS selector conflicts).

Input components automatically generate an `id` attribute based on the bound expression. If an explicit `id` is provided, it takes precedence:

```razor
<Label For="() => Model!.ProductionDate" for="prod-date" />
<InputDate @bind-Value="Model!.ProductionDate" id="prod-date" />
```



## Error message template support

[Microsoft.AspNetCore.Components.Forms.InputDate%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputDate%25601) and [Microsoft.AspNetCore.Components.Forms.InputNumber%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputNumber%25601) support error message templates:

* [Microsoft.AspNetCore.Components.Forms.InputDate%601.ParsingErrorMessage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputDate%25601.ParsingErrorMessage%252A)
* [Microsoft.AspNetCore.Components.Forms.InputNumber%601.ParsingErrorMessage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputNumber%25601.ParsingErrorMessage%252A)

**Applies to: \>= aspnetcore-5.0**

In the `Starfleet Starship Database` form (`Starship3` component) of the [Example form](#example-form) section with a [friendly display name](#display-name-support) assigned, the `Production Date` field produces an error message using the following default error message template:

```css
The {0} field must be a date.
```

The position of the `{0}` placeholder is where the value of the [Microsoft.AspNetCore.Components.Forms.InputBase%601.DisplayName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601.DisplayName%252A) property appears when the error is displayed to the user.

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" 
        DisplayName="Production Date" />
</label>
```

> The Production Date field must be a date.

Assign a custom template to [Microsoft.AspNetCore.Components.Forms.InputDate%601.ParsingErrorMessage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputDate%25601.ParsingErrorMessage%252A) to provide a custom message:

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" 
        DisplayName="Production Date" 
        ParsingErrorMessage="The {0} field has an incorrect date value." />
</label>
```

> The Production Date field has an incorrect date value.



**Applies to: < aspnetcore-5.0**

In the `Starfleet Starship Database` form (`Starship3` component) of the [Example form](#example-form) section uses a default error message template:

```css
The {0} field must be a date.
```

The position of the `{0}` placeholder is where the value of the [Microsoft.AspNetCore.Components.Forms.InputBase%601.DisplayName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601.DisplayName%252A) property appears when the error is displayed to the user.

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" />
</label>
```

> The ProductionDate field must be a date.

Assign a custom template to [Microsoft.AspNetCore.Components.Forms.InputDate%601.ParsingErrorMessage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputDate%25601.ParsingErrorMessage%252A) to provide a custom message:

```razor
<label>
    Production Date:
    <InputDate @bind-Value="Model!.ProductionDate" 
        ParsingErrorMessage="The {0} field has an incorrect date value." />
</label>
```

> The ProductionDate field has an incorrect date value.



**Applies to: \>= aspnetcore-10.0**

## `InputHidden` component to handle hidden input fields in forms

The [`InputHidden` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputHidden) provides a hidden input field for storing string values.

In the following example, a hidden input field is created for the form's `Parameter` property. When the form is submitted, the value of the hidden field is displayed:

```razor
<EditForm Model="Parameter" OnValidSubmit="Submit" FormName="InputHidden Example">
    <InputHidden id="hidden" @bind-Value="Parameter" />
    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Hello @Parameter!</p>
}

@code {
    private bool submitted;

    [SupplyParameterFromForm] 
    public string Parameter { get; set; } = "stranger";

    private void Submit() => submitted = true;
}
```
