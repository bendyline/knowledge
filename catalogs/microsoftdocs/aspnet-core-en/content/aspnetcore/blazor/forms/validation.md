---
title: ASP.NET Core Blazor forms validation
ai-usage: ai-assisted
author: guardrex
description: Learn how to use validation in Blazor forms.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 09/23/2026
uid: blazor/forms/validation
---
# ASP.NET Core Blazor forms validation

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


This article explains how to validate user input in Blazor forms.

For most forms, the simplest and recommended approach is to add [data annotations validation attributes](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) to the model and place a [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component in the [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm). Blazor also supports custom validation through the form's [Microsoft.AspNetCore.Components.Forms.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext), either directly in the form component or in a reusable validator component.

Related articles provide more detail:

**Applies to: \>= aspnetcore-11.0**

* For writing and configuring model-based validation rules, including custom and asynchronous rules, nested object validation, and localization, see [fundamentals/validation](../../fundamentals/validation.md).
* For live browser validation in static server-side rendering (static SSR), see [blazor/forms/validation-client-side](validation-client-side.md).
* For complete validator-component and remote-validation implementations, see [blazor/forms/validation-advanced](validation-advanced.md).



**Applies to: \>= aspnetcore-10.0 < aspnetcore-11.0**

* For writing and configuring model-based validation rules and nested object validation, see [fundamentals/validation](../../fundamentals/validation.md).
* For complete validator-component and remote-validation implementations, see [blazor/forms/validation-advanced](validation-advanced.md).



**Applies to: < aspnetcore-10.0**

* For complete validator-component and remote-validation implementations, see [blazor/forms/validation-advanced](validation-advanced.md).



<a id="data-annotations-validator-component-and-custom-validation"></a>

## Validate with data annotations

The following model uses [System.ComponentModel.DataAnnotations.RequiredAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RequiredAttribute) and [System.ComponentModel.DataAnnotations.RangeAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RangeAttribute):

`Starship.cs`:

```csharp
using System.ComponentModel.DataAnnotations;

public class Starship
{
    [Required]
    public string? Identifier { get; set; }

    [Range(1, 10, ErrorMessage = "Accommodation must be between 1 and 10.")]
    public int MaximumAccommodation { get; set; }
}
```

Add the model to an `EditForm`, include `DataAnnotationsValidator`, and display errors with [Microsoft.AspNetCore.Components.Forms.ValidationMessage%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.ValidationMessage%25601) or [Microsoft.AspNetCore.Components.Forms.ValidationSummary](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.ValidationSummary). The [Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit%252A) callback is invoked only when validation succeeds:

```razor
<EditForm Model="Model" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <p>
        <label>
            Identifier:
            <InputText @bind-Value="Model.Identifier" />
        </label>
        <ValidationMessage For="() => Model.Identifier" />
    </p>

    <p>
        <label>
            Maximum accommodation:
            <InputNumber @bind-Value="Model.MaximumAccommodation" />
        </label>
        <ValidationMessage For="() => Model.MaximumAccommodation" />
    </p>

    <button type="submit">Submit</button>
</EditForm>

@code {
    private Starship Model { get; } = new Starship();

    private void Submit()
    {
        // Process the valid form.
    }
}
```

**Applies to: \>= aspnetcore-8.0**

For a static SSR form post, assign a unique `FormName` and receive the posted model with `[SupplyParameterFromForm]`:

```razor
<EditForm Model="Model" FormName="starship" OnValidSubmit="Submit">
    ...
</EditForm>

@code {
    [SupplyParameterFromForm]
    private Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();
}
```

For more information about form submission and model binding across render modes, see [blazor/forms/index](index.md) and [blazor/forms/binding](binding.md).



Without a `DataAnnotationsValidator` component, validation attributes on the model don't participate in the form's validation.

### When validation runs

Blazor performs field validation and full-form validation:

* Field validation runs after a field changes. In an interactive form, this occurs in .NET while the user edits the form.
* Full-form validation normally runs when `EditForm` handles submission through `OnValidSubmit` or `OnInvalidSubmit`. An `OnSubmit` handler takes control of validation, as described in [Control form submission](#control-form-submission).

**Applies to: \>= aspnetcore-11.0**

A static SSR form can provide live browser feedback with [blazor/forms/validation-client-side](validation-client-side.md). The form is validated again authoritatively on the server when posted.



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

A static SSR form is validated on the server when posted and doesn't provide live field validation between requests.



Validation results that identify a member are associated with that field. Results without a member name are associated with the model and appear in a validation summary rather than a field's `ValidationMessage` component.

**Applies to: \>= aspnetcore-10.0**

### Configure data annotations validation

`DataAnnotationsValidator` always enables DataAnnotations validation for the form. To use the extended validation capabilities provided by the [Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation) package, call the `AddValidation` extension method in the `Program` file:

```csharp
builder.Services.AddValidation();
```

The `AddValidation` call registers the package's validation services and activates a source generator that creates validation metadata for discovered model types. The available behavior depends on whether that metadata includes the form's model:



**Applies to: \>= aspnetcore-11.0**

| Configuration | Behavior |
| --- | --- |
| Generated metadata is available | Validates nested objects and collections and supports message localization. |
| Generated metadata isn't available | Validates top-level properties, but doesn't validate nested objects or collections and doesn't use the `Microsoft.Extensions.Validation` message-localization pipeline. |



**Applies to: \>= aspnetcore-10.0 < aspnetcore-11.0**

| Configuration | Behavior |
| --- | --- |
| Generated metadata is available | Validates nested objects and collections. |
| Generated metadata isn't available | Validates top-level properties only. |

The `ValidatableTypeAttribute` and `SkipValidationAttribute` APIs are experimental in .NET 10. For details and available workarounds, see [fundamentals/validation#experimental-api-in-apps-that-target-net-10](https://learn.microsoft.com/search/?terms=fundamentals%2Fvalidation%23experimental-api-in-apps-that-target-net-10).



**Applies to: \>= aspnetcore-10.0**

When using `Microsoft.Extensions.Validation`, declare model types in C# files (`.cs`) rather than Razor component files (`.razor`). The source generator creates validation metadata from C# source and can't include model types declared in Razor components.

For configuration requirements, validation order, custom rules, nested object graphs, and generated metadata, see [fundamentals/validation](../../fundamentals/validation.md).



**Applies to: < aspnetcore-10.0**

### Validate nested object graphs

In .NET 9 or earlier, `DataAnnotationsValidator` validates top-level model properties but doesn't recursively validate collection or complex-type properties. For recursive validation, use `ObjectGraphDataAnnotationsValidator` and `[ValidateComplexType]` from the experimental [`Microsoft.AspNetCore.Components.DataAnnotations.Validation` package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.DataAnnotations.Validation):

```razor
<EditForm Model="Model" OnValidSubmit="Submit">
    <ObjectGraphDataAnnotationsValidator />
    ...
</EditForm>
```

```csharp
public class Starship
{
    [ValidateComplexType]
    public ShipDescription Description { get; set; } =
        new ShipDescription();
}
```

The package remains experimental in these framework versions.



**Applies to: < aspnetcore-6.0**

### `[CompareProperty]` attribute

For .NET 5 or earlier, use the experimental package's `ComparePropertyAttribute` instead of [System.ComponentModel.DataAnnotations.CompareAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.CompareAttribute). `ComparePropertyAttribute` associates the validation result with the field consistently during field and full-form validation.



<a id="custom-validation-rules"></a>

**Applies to: \>= aspnetcore-10.0**

### Write model-based custom rules

When built-in attributes can't express a rule, use a custom [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute) or [System.ComponentModel.DataAnnotations.IValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject). For detailed guidance, see [fundamentals/validation#write-custom-validation-rules](https://learn.microsoft.com/search/?terms=fundamentals%2Fvalidation%23write-custom-validation-rules).



**Applies to: < aspnetcore-10.0**

### Write model-based custom rules

When built-in attributes can't express a rule, use a [custom validation attribute](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23custom-attributes) or implement [`IValidatableObject`](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23ivalidatableobject). Both run through `DataAnnotationsValidator`.

When returning a [System.ComponentModel.DataAnnotations.ValidationResult](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationResult) from a custom attribute, include the validated member name so the result can appear in that field's `ValidationMessage` component.



**Applies to: \>= aspnetcore-7.0 < aspnetcore-10.0**

<a id="inject-services-into-a-custom-validation-attribute"></a>

Custom attributes can resolve registered services through [System.ComponentModel.DataAnnotations.ValidationContext.GetService%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationContext.GetService%252A).



## Add validation through `EditContext`

`EditForm` creates an `EditContext` automatically when its `Model` parameter is assigned. To use validation APIs directly, create the context yourself and assign it to the [Microsoft.AspNetCore.Components.Forms.EditForm.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.EditContext) parameter of `EditForm`. Don't assign both `Model` and `EditContext` to the same form.

Custom validation commonly uses:

* [Microsoft.AspNetCore.Components.Forms.EditContext.OnValidationRequested%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.OnValidationRequested%252A) for full-form validation.
* [Microsoft.AspNetCore.Components.Forms.EditContext.OnFieldChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.OnFieldChanged%252A) for field validation.
* [Microsoft.AspNetCore.Components.Forms.ValidationMessageStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.ValidationMessageStore) to add and clear messages.
* [Microsoft.AspNetCore.Components.Forms.EditContext.NotifyValidationStateChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.NotifyValidationStateChanged%252A) to notify the UI after messages change.

The following interactive-form pattern adds a form-level business rule alongside data annotations validation and rechecks the rule when either relevant field changes:

```razor
@implements IDisposable

<EditForm EditContext="editContext" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    ...
</EditForm>

@code {
    private Starship Model { get; } = new Starship();
    private EditContext editContext = default!;
    private ValidationMessageStore messages = default!;

    protected override void OnInitialized()
    {
        editContext = new EditContext(Model);
        messages = new ValidationMessageStore(editContext);
        editContext.OnValidationRequested += ValidateBusinessRules;
        editContext.OnFieldChanged += ValidateChangedField;
    }

    private void ValidateBusinessRules(
        object? sender, ValidationRequestedEventArgs e)
    {
        messages.Clear();
        ValidateIdentifier();
        editContext.NotifyValidationStateChanged();
    }

    private void ValidateChangedField(
        object? sender, FieldChangedEventArgs e)
    {
        if (e.FieldIdentifier.FieldName != nameof(Starship.Identifier) &&
            e.FieldIdentifier.FieldName != nameof(Starship.MaximumAccommodation))
        {
            return;
        }

        messages.Clear(
            editContext.Field(nameof(Starship.Identifier)));
        ValidateIdentifier();
        editContext.NotifyValidationStateChanged();
    }

    private void ValidateIdentifier()
    {
        if (Model.MaximumAccommodation == 1 &&
            string.IsNullOrWhiteSpace(Model.Identifier))
        {
            messages.Add(
                editContext.Field(nameof(Starship.Identifier)),
                "An identifier is required for a single-occupant ship.");
        }
    }

    private void Submit()
    {
        // Process the valid form.
    }

    public void Dispose()
    {
        editContext.OnValidationRequested -= ValidateBusinessRules;
        editContext.OnFieldChanged -= ValidateChangedField;
    }
}
```

An `OnFieldChanged` handler receives the changed field in `e.FieldIdentifier`. Clear or replace the affected messages and call `NotifyValidationStateChanged`, as the preceding example demonstrates.

**Applies to: \>= aspnetcore-8.0**

Static SSR doesn't provide live .NET field validation between requests.



**Applies to: \>= aspnetcore-11.0**

<!-- UPDATE 11.0 - API Browser cross-ref

                   <xref:Microsoft.AspNetCore.Components.Forms.EditContext.RegisterAsyncFieldValidator%2A>
-->

For asynchronous full-form validation, call `e.AddAsyncValidator` from an `OnValidationRequested` handler. For asynchronous field validation in an interactive form, call `EditContext.RegisterAsyncFieldValidator` from an `OnFieldChanged` handler. A new asynchronous validation for the same field supersedes and cancels the previous one.

For model-based asynchronous validation attributes, see [fundamentals/validation#asynchronous-validation-support](https://learn.microsoft.com/search/?terms=fundamentals%2Fvalidation%23asynchronous-validation-support). For a complete reusable validator component, see [blazor/forms/validation-advanced](validation-advanced.md).



For a reusable implementation that encapsulates event subscriptions and its message store, see [blazor/forms/validation-advanced#build-a-validator-component](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation-advanced%23build-a-validator-component).

<a id="validation-summary-and-validation-message-components"></a>

## Display validation messages

Use [Microsoft.AspNetCore.Components.Forms.ValidationMessage%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.ValidationMessage%25601) to display messages associated with one field:

```razor
<ValidationMessage For="() => Model.Identifier" />
```

The `For` expression identifies the field by its model instance and property. Blazor represents this identity with a [Microsoft.AspNetCore.Components.Forms.FieldIdentifier](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FieldIdentifier), so properties with the same name on different model instances are treated as different fields. Using an expression instead of a string also allows refactoring tools to update the property reference.

Use [Microsoft.AspNetCore.Components.Forms.ValidationSummary](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.ValidationSummary) to display messages for the form:

```razor
<ValidationSummary />
```

Assign the summary's `Model` parameter to restrict it to messages associated with a particular model:

```razor
<ValidationSummary Model="Model" />
```

To inspect current messages in code, call [Microsoft.AspNetCore.Components.Forms.EditContext.GetValidationMessages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.GetValidationMessages%252A):

```csharp
var allMessages = editContext.GetValidationMessages();
var fieldMessages = editContext.GetValidationMessages(
    editContext.Field(nameof(Starship.Identifier)));
```

These methods read the current validation state. They don't initiate validation.

## Customize validation appearance

Blazor applies CSS classes that represent field and message state:

| Element | Classes |
| --- | --- |
| Input | `valid` or `invalid`, plus `modified` after the user edits the field |
| Validation message | `validation-message` |
| Validation summary | `validation-summary-errors` or `validation-summary-valid` |

**Applies to: \>= aspnetcore-11.0**

Inputs with asynchronous field validation use `pending` or `faulted`, optionally with `modified`, instead of `valid` or `invalid` while the corresponding state applies.



The Blazor project templates include styles for the common valid and invalid classes. Add styles for other classes as needed. `ValidationMessage` and `ValidationSummary` also accept arbitrary HTML attributes. Supplying a `class` attribute replaces the component's default class.

**Applies to: \>= aspnetcore-5.0**

To change the classes applied to input components, derive from [Microsoft.AspNetCore.Components.Forms.FieldCssClassProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.FieldCssClassProvider).



**Applies to: \>= aspnetcore-8.0**

```csharp
using Microsoft.AspNetCore.Components.Forms;

public sealed class BootstrapFieldCssClassProvider : FieldCssClassProvider
{
    public override string GetFieldCssClass(
        EditContext editContext,
        in FieldIdentifier fieldIdentifier)
    {
        if (!editContext.IsModified(fieldIdentifier))
        {
            return string.Empty;
        }

        return editContext.IsValid(fieldIdentifier)
            ? "is-valid"
            : "is-invalid";
    }
}
```



**Applies to: \>= aspnetcore-5.0 < aspnetcore-8.0**

```csharp
using System.Linq;
using Microsoft.AspNetCore.Components.Forms;

public sealed class BootstrapFieldCssClassProvider : FieldCssClassProvider
{
    public override string GetFieldCssClass(
        EditContext editContext,
        in FieldIdentifier fieldIdentifier)
    {
        if (!editContext.IsModified(fieldIdentifier))
        {
            return string.Empty;
        }

        return editContext.GetValidationMessages(fieldIdentifier).Any()
            ? "is-invalid"
            : "is-valid";
    }
}
```



**Applies to: \>= aspnetcore-11.0**

A custom `FieldCssClassProvider` determines the complete class value for each field. If the form uses asynchronous field validation, handle `IsValidationPending(fieldIdentifier)` and `IsValidationFaulted(fieldIdentifier)` in the provider when pending or faulted classes are required.



**Applies to: \>= aspnetcore-5.0**

Assign the provider to the form's `EditContext`:

```csharp
editContext.SetFieldCssClassProvider(
    new BootstrapFieldCssClassProvider());
```

For custom input markup, call [Microsoft.AspNetCore.Components.Forms.EditContextFieldClassExtensions.FieldCssClass%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContextFieldClassExtensions.FieldCssClass%252A) to obtain the class selected by the current provider.

When an `EditForm` is assigned a model, its child content receives the generated `EditContext`. Capture the context through the `Context` parameter and call `FieldCssClass` to apply the field's classes to surrounding markup:

```razor
<EditForm Model="Model" Context="editContext">
    <DataAnnotationsValidator />

    <div class="@editContext.FieldCssClass(
        () => Model.Identifier)">
        <InputText @bind-Value="Model.Identifier" />
        <ValidationMessage For="() => Model.Identifier" />
    </div>
</EditForm>
```



<a id="display-pending-and-faulted-validation-state"></a>

## Respond to validation state

`EditContext` exposes the current validation state without initiating validation.

* Use `IsModified(field)` or `IsModified()` to determine whether a field or any field in the form has changed.
* Use `GetValidationMessages(field)` or `GetValidationMessages()` to inspect current field or form messages.

**Applies to: \>= aspnetcore-8.0**

Use `IsValid(field)` to determine whether a field currently has validation messages.



**Applies to: < aspnetcore-8.0**

For a field, the absence of messages can be checked with `!editContext.GetValidationMessages(field).Any()`.



The following example displays custom UI only after a field is modified and invalid:

**Applies to: \>= aspnetcore-8.0**

```razor
@{
    var identifier = editContext.Field(nameof(Starship.Identifier));
}

@if (editContext.IsModified(identifier) &&
    !editContext.IsValid(identifier))
{
    <p>Correct the identifier before continuing.</p>
}
```



**Applies to: < aspnetcore-8.0**

```razor
@{
    var identifier = editContext.Field(nameof(Starship.Identifier));
}

@if (editContext.IsModified(identifier) &&
    editContext.GetValidationMessages(identifier).Any())
{
    <p>Correct the identifier before continuing.</p>
}
```



Input components, `ValidationMessage`, and `ValidationSummary` update themselves when validation state changes. A component that renders other conditional validation UI should subscribe to [Microsoft.AspNetCore.Components.Forms.EditContext.OnValidationStateChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.OnValidationStateChanged%252A) and call `StateHasChanged`:

```csharp
private void HandleValidationStateChanged(
    object? sender, ValidationStateChangedEventArgs e) =>
    _ = InvokeAsync(StateHasChanged);
```

Unsubscribe from `OnValidationStateChanged` when the component is disposed.

**Applies to: \>= aspnetcore-11.0**

Use `IsValidationPending(field)` and `IsValidationFaulted(field)` for asynchronous field validation. The parameterless methods describe form-level `ValidateAsync` passes and don't aggregate the state of every field.

These states also include asynchronous work performed by [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator). An `AsyncValidationAttribute` applied to a property uses field state during field validation, including the default `pending` and `faulted` CSS classes. During `ValidateAsync`, asynchronous attributes and [System.ComponentModel.DataAnnotations.IAsyncValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IAsyncValidatableObject) contribute to the form-level state reported by the parameterless methods.

Live pending indicators require an interactive render mode. During a static SSR form post, server-side validation completes before the response is rendered.



## Control form submission

`EditForm` provides three submission callbacks:

| Callback | Behavior |
| --- | --- |
| [Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit%252A) | Runs after automatic validation succeeds. |
| [Microsoft.AspNetCore.Components.Forms.EditForm.OnInvalidSubmit%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnInvalidSubmit%252A) | Runs after automatic validation fails. |
| [Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit%252A) | Gives the handler control of validation and submission. |

`OnValidSubmit` and `OnInvalidSubmit` can be used together. Don't combine `OnSubmit` with either of them.

**Applies to: \>= aspnetcore-11.0**

`EditForm` uses [Microsoft.AspNetCore.Components.Forms.EditContext.ValidateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.ValidateAsync%252A) before invoking `OnValidSubmit` or `OnInvalidSubmit`, so it awaits synchronous and asynchronous validators. When handling `OnSubmit`, call `ValidateAsync` before processing the form:

```razor
<EditForm EditContext="editContext" OnSubmit="HandleSubmit">
    ...
</EditForm>

@code {
    private async Task HandleSubmit(EditContext editContext)
    {
        if (await editContext.ValidateAsync())
        {
            await SaveAsync();
        }
    }
}
```

The synchronous [Microsoft.AspNetCore.Components.Forms.EditContext.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.Validate%252A) method is obsolete in .NET 11. It doesn't await asynchronous validation and throws if a handler attempts to register asynchronous work.

For interactive forms, the form-level pending state can be used to disable submission while `ValidateAsync` is running:

```razor
<button type="submit" disabled="@editContext.IsValidationPending()">
    Save
</button>
```



**Applies to: < aspnetcore-11.0**

When handling `OnSubmit`, call [Microsoft.AspNetCore.Components.Forms.EditContext.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.Validate%252A) before processing the form:

```razor
<EditForm EditContext="editContext" OnSubmit="HandleSubmit">
    ...
</EditForm>

@code {
    private void HandleSubmit(EditContext editContext)
    {
        if (editContext.Validate())
        {
            Save();
        }
    }
}
```



## Additional resources

* [blazor/forms/index](index.md)
* [blazor/forms/binding](binding.md)
* [blazor/forms/input-components](input-components.md)
* [blazor/forms/validation-advanced](validation-advanced.md)

**Applies to: \>= aspnetcore-10.0**

* [fundamentals/validation](../../fundamentals/validation.md)



**Applies to: \>= aspnetcore-11.0**

* [blazor/forms/validation-client-side](validation-client-side.md)
