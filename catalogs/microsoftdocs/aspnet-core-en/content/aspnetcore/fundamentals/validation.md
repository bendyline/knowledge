---
title: Validation in ASP.NET Core
ai-usage: ai-assisted
author: Youssef1313
description: Use Microsoft.Extensions.Validation in ASP.NET Core to validate models.
monikerRange: '>= aspnetcore-10.0'
ms.author: ygerges
ms.date: 09/23/2026
uid: fundamentals/validation
---
# Validation in ASP.NET Core

[Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation) provides model validation for Blazor and Minimal API projects.

Validation rules are declared the same way in both frameworks, using [data annotations attributes](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) and [System.ComponentModel.DataAnnotations.IValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject). This article describes the validation behavior that both frameworks share:

**Applies to: \>= aspnetcore-11.0**

Asynchronous validation attributes and [System.ComponentModel.DataAnnotations.IAsyncValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IAsyncValidatableObject) are also supported.



* Minimal APIs use the service to validate a request before the endpoint handler runs. For guidance on how validation is surfaced in an endpoint, see [fundamentals/minimal-apis#validation-support-in-minimal-apis](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%23validation-support-in-minimal-apis).
* Blazor uses the service through the [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component. For guidance on how validation is surfaced in a form, see [blazor/forms/validation](../blazor/forms/validation.md).

While the API in the [`Microsoft.Extensions.Validation` NuGet package](https://www.nuget.org/packages/Microsoft.Extensions.Validation) can be used in scenarios outside ASP.NET Core, this article focuses on ASP.NET Core. The API isn't supported for MVC or Razor Pages. For validation guidance that applies to MVC and Razor Pages, see [mvc/models/validation](../mvc/models/validation.md).

## Register validation services

Call [Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%252A) on [Microsoft.AspNetCore.Builder.WebApplicationBuilder.Services%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder.Services%252A) in the app's `Program` file:

```csharp
builder.Services.AddValidation();
```

For Minimal APIs, this enables automatic validation of supported parameters before the endpoint handler runs.

Blazor forms can perform basic top-level DataAnnotations validation without calling `AddValidation`. Registering the service enables nested object and collection validation when the form model is discovered by the validation source generator.

**Applies to: \>= aspnetcore-11.0**

Generated validation metadata also enables message localization.



Validation uses a source generator that creates metadata for validatable types in the assembly where `AddValidation` is called. For types declared in another assembly, see [Register validation across assemblies](#register-validation-across-assemblies).

### Behavior without generated validation metadata

The consequence of omitting [Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%252A), or of calling it without the required type being discovered by the source generator, differs by framework, as shown in the following table.

**Applies to: \>= aspnetcore-11.0**

| Framework | Behavior without generated validation metadata |
| --- | --- |
| Minimal APIs | No automatic validation runs. Invalid input reaches the endpoint handler instead of being rejected before the handler executes. |
| Blazor | The [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component falls back to [System.ComponentModel.DataAnnotations.Validator](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Validator), which validates top-level properties only. Nested objects, collection items, and the [`Microsoft.Extensions.Validation` message-localization pipeline](#localize-validation-messages) aren't supported on the fallback path. |



**Applies to: < aspnetcore-11.0**

| Framework | Behavior without generated validation metadata |
| --- | --- |
| Minimal APIs | No automatic validation runs. Invalid input reaches the endpoint handler instead of being rejected before the handler executes. |
| Blazor | The [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component falls back to [System.ComponentModel.DataAnnotations.Validator](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Validator), which validates top-level properties only. Nested objects and collection items aren't validated on the fallback path. |



Missing metadata doesn't produce a runtime exception or log entry. Build analyzers report many unsupported configurations, but other missing-metadata cases might not produce a diagnostic. For checks to perform when expected validation is missing, see [Troubleshoot generated validation metadata](#troubleshoot-generated-validation-metadata).

<a id="validatable-entities"></a>

## How validation runs

Minimal APIs begin with endpoint parameter validation. Blazor begins with validation of the form's model. Both frameworks then use the same model validation order and object-graph traversal.

<a id="parameter-validation"></a>

### Minimal API parameter validation

For each supported endpoint parameter:

1. Validate [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute) instances applied directly to the parameter.
1. If the parameter value is an `IEnumerable`, validate each non-`null` element. Otherwise, validate the parameter value itself.

**Applies to: < aspnetcore-11.0**

> **Note:**
> Prior to the release of .NET 11, there's a known limitation where nullable value types declared as Minimal API parameters aren't validated. For more information, see [Validation attributes are ignored for nullable value types when passing a null value (`dotnet/aspnetcore` #67033)](https://github.com/dotnet/aspnetcore/issues/67033).



<a id="type-validation"></a>
<a id="property-validation"></a>

### Model validation order

When validating a model:

1. Validate the attributes on each property, then validate the property's value. If the value is an `IEnumerable`, validate each non-`null` element. If property validation produces an error, the remaining steps are skipped.
1. Validate attributes applied to the model type. If type-level validation produces an error, the remaining step is skipped.
1. Run [System.ComponentModel.DataAnnotations.IValidatableObject.Validate%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject.Validate%252A) if the model implements [System.ComponentModel.DataAnnotations.IValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject).

### Nested objects and collections

Validation recurses into nested objects and collection items, so a rule declared on a nested property is enforced when the root model is validated. Without generated validation metadata, Blazor only validates the top-level properties of a form model.

To validate a nested object graph:

1. Call [Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%252A) in the `Program` file where services are registered.
1. Declare model types in C# files (`.cs`), not in Razor component files (`.razor`).
1. Annotate the root model type with [Microsoft.Extensions.Validation.ValidatableTypeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation.ValidatableTypeAttribute) (`[ValidatableType]`). Types reachable from the root are discovered automatically.

In the following example, only the root `Order` type is annotated. The other model types are reachable from `Order` and are included in its validation graph.

`Order.cs`:

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Validation;

[ValidatableType]
public class Order
{
    public Customer Customer { get; set; } = new();
    public List<OrderItem> OrderItems { get; set; } = [];
}

public class Customer
{
    [Required(ErrorMessage = "Name is required.")]
    public string? FullName { get; set; }

    public ShippingAddress ShippingAddress { get; set; } = new();
}

public class ShippingAddress
{
    [Required(ErrorMessage = "Street is required.")]
    public string? Street { get; set; }
}

public class OrderItem
{
    [Required(ErrorMessage = "Description is required.")]
    public string? Description { get; set; }

    [Range(1, 1000)]
    public int Quantity { get; set; }
}
```

Errors from nested members use paths such as `Customer.ShippingAddress.Street` or `OrderItems[0].Description`.

For model types defined in another assembly or in a Blazor Web App's `.Client` project, see [Register validation across assemblies](#register-validation-across-assemblies).

<a id="explicit-validation-skipping"></a>

### Skip validation

Apply [Microsoft.Extensions.Validation.SkipValidationAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation.SkipValidationAttribute) to a property or parameter to skip validation for that property or parameter. Apply it to a type to skip validation for all properties and parameters of that type, including nested properties when the type is complex.

## Write custom validation rules

When the [built-in validation attributes](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23built-in-attributes) don't express a rule, write a custom [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute) or implement [System.ComponentModel.DataAnnotations.IValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject) on the model. Both are discovered and executed by [Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation) in Blazor and Minimal API apps.

### Custom validation attributes

Derive from [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute) and override [System.ComponentModel.DataAnnotations.ValidationAttribute.IsValid%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute.IsValid%252A) to validate a single value.

Pass the validation context's [System.ComponentModel.DataAnnotations.ValidationContext.MemberName](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationContext.MemberName) when creating the [System.ComponentModel.DataAnnotations.ValidationResult](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationResult). Without a member name, the result isn't associated with a field, which prevents the error from being displayed next to the corresponding input in a Blazor form:

```csharp
using System.ComponentModel.DataAnnotations;

public class EvenNumberAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value,
        ValidationContext validationContext)
    {
        if (value is int number && number % 2 != 0)
        {
            return new ValidationResult(
                "The value must be an even number.",
                [ validationContext.MemberName! ]);
        }

        return ValidationResult.Success;
    }
}
```

Apply the attribute to a property in the same way as a built-in attribute:

```csharp
public class Order
{
    [EvenNumber]
    public int Quantity { get; set; }
}
```

### Resolve services in a validation attribute

A validation attribute obtains services from dependency injection (DI) through the validation context, which makes rules that require a database lookup or a configured option possible:

```csharp
protected override ValidationResult? IsValid(object? value,
    ValidationContext validationContext)
{
    var catalog = validationContext.GetService<IProductCatalog>();

    // ...
}
```

For a service that must be resolved, use [Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService%252A). Services resolved this way must be registered in the app's service container.

### Class-level validation with `IValidatableObject`

Implement [System.ComponentModel.DataAnnotations.IValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject) for a rule that spans several properties because an attribute applied to one property can't reliably observe the others. Class-level validation runs after property validation and only if property validation succeeds:

```csharp
using System.ComponentModel.DataAnnotations;

public class DateRange : IValidatableObject
{
    public DateOnly Start { get; set; }
    public DateOnly End { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (End < Start)
        {
            yield return new ValidationResult(
                "End date must fall on or after the start date.",
                [ nameof(End) ]);
        }
    }
}
```

**Applies to: \>= aspnetcore-11.0**

For rules that require I/O, such as a database or web API call, see the [Asynchronous validation support](#asynchronous-validation-support) section instead.



**Applies to: \>= aspnetcore-11.0**

> **Note:**
> In a Blazor form that uses static server-side rendering (static SSR), custom attributes aren't enforced by the browser unless the attribute also supplies a client-side rule. For more information, see [blazor/forms/validation-client-side](../blazor/forms/validation-client-side.md).



**Applies to: \>= aspnetcore-11.0**

## Asynchronous validation support

[Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation) supports asynchronous validation. Apply custom implementations of `AsyncValidationAttribute` to parameters, types, or properties, and they're called asynchronously. In addition, types can implement `IAsyncValidatableObject` as well.

Asynchronous validation operations can run in parallel, and their execution and completion order isn't guaranteed. Validation rules must not depend on a particular order.

`IAsyncValidatableObject` and `AsyncValidationAttribute` require synchronous **and** asynchronous validation logic. For example, the `Validate` and `ValidateAsync` methods of `IAsyncValidatableObject` must be implemented for objects that use the interface. However, validation never calls both methods. If validation is called through an asynchronous code path, only `ValidateAsync` is called. If validation is called through a synchronous code path, only `Validate` is called.

For Minimal API validation, [Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation) always calls the asynchronous path and never the synchronous path.

Blazor form validation calls the asynchronous path for per-field validation and when the form is validated with [Microsoft.AspNetCore.Components.Forms.EditContext.ValidateAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.ValidateAsync%252A), which is what [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) uses on submit. The synchronous path is only reached through the [Microsoft.AspNetCore.Components.Forms.EditContext.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.Validate%252A) method, which is obsolete in .NET 11 or later. Asynchronous rules therefore work in Blazor forms without additional configuration.

If your implementation can't support the synchronous path, throw [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException).

The following example performs property-level asynchronous validation with a custom `AsyncValidationAttribute`. The attribute uses a hypothetical `IUserService` to check whether an email address is already registered. Empty values are left to [System.ComponentModel.DataAnnotations.RequiredAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RequiredAttribute), and the cancellation token is passed to the asynchronous operation:

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;

public sealed class UniqueEmailAttribute : AsyncValidationAttribute
{
    public UniqueEmailAttribute()
    {
        ErrorMessage = "Email is already registered.";
    }

    protected override async Task<ValidationResult?> IsValidAsync(
        object? value,
        ValidationContext validationContext,
        CancellationToken cancellationToken)
    {
        if (value is not string email || string.IsNullOrWhiteSpace(email))
        {
            return ValidationResult.Success;
        }

        var userService =
            validationContext.GetRequiredService<IUserService>();

        return await userService.IsEmailExistsAsync(
            email, cancellationToken)
                ? new ValidationResult(
                    FormatErrorMessage(validationContext.DisplayName),
                    [validationContext.MemberName!])
                : ValidationResult.Success;
    }

    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        throw new InvalidOperationException(
            "Synchronous validation isn't supported.");
    }
}

public class RegistrationModel
{
    [Required, EmailAddress, UniqueEmail]
    public string Email { get; set; } = string.Empty;
}
```

The following example shows object-level asynchronous validation with `IAsyncValidatableObject`. It uses a hypothetical `IUserService` to check a database for an existing email address. Because the rule requires asynchronous I/O, the required synchronous `Validate` implementation throws [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException).

```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

public class ValidateUser : IAsyncValidatableObject
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    // Asynchronous validation path
    public async IAsyncEnumerable<ValidationResult> ValidateAsync(
        ValidationContext validationContext, 
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var userService = validationContext.GetService<IUserService>();

        if (userService is not null)
        {
            // Asynchronous call that checks a database via a service
            if (await userService.IsEmailExistsAsync(Email, cancellationToken))
            {
                yield return new ValidationResult(
                    "Email is already registered.", new[] { nameof(Email) });
            }
        }
    }

    // Synchronous validation path that throws InvalidOperationException
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        throw new InvalidOperationException("Synchronous validation isn't supported.");
    }
}
```



**Applies to: \>= aspnetcore-11.0**

## Localize validation messages

Validation error messages and the display names of validated members are localized by [Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation). The same rules apply wherever the model is validated, so a message localizes identically in a Minimal API endpoint and in a Blazor form.

### Activate localization

Localization activates automatically when an [Microsoft.Extensions.Localization.IStringLocalizerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizerFactory) is available in the service container. Call [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A) to register the standard localization services, then call [Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%252A):

```csharp
builder.Services.AddLocalization();
builder.Services.AddValidation();
```

There's no separate package or additional opt-in call.

> **Important:**
> `AddLocalization` registers localization services but doesn't select the culture for a request or circuit. Validation resource lookup uses [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture). For request culture providers, including query string, cookie, and `Accept-Language` header selection, see [fundamentals/localization/select-language-culture](localization/select-language-culture.md). For configuring culture selection across Blazor render modes, see [blazor/globalization-localization](../blazor/globalization-localization.md).

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Validation;

[ValidatableType]
public class CustomerModel
{
    // "CustomerName" is looked up as the resource key for the display name.
    [Display(Name = "CustomerName")]
    // "NameRequired" is looked up as the resource key for the error message.
    [Required(ErrorMessage = "NameRequired")]
    public string? Name { get; set; }
}
```

By default, keys are resolved against the resources of the type that declares the member. If a key doesn't resolve, the attribute's built-in error message is used, so a missing resource degrades to the non-localized message rather than surfacing the key to the user.

### Message lookup keys

When [System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessage](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessage) is set, its value is the lookup key and it takes precedence.

When `ErrorMessage` isn't set, conventional keys are tried in order from most to least specific:

1. `{DeclaringType}_{MemberName}_{AttributeType}_Error`
1. `{DeclaringType}_{AttributeType}_Error`
1. `{AttributeType}_Error`

For example, a [System.ComponentModel.DataAnnotations.RequiredAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RequiredAttribute) on the `Name` property of `CustomerModel` is looked up in this order: `CustomerModel_Name_RequiredAttribute_Error`, `CustomerModel_RequiredAttribute_Error`, and `RequiredAttribute_Error`. If none resolve, the attribute's built-in message is used.

This makes it possible to translate or override the default message of an attribute across an entire app without setting `ErrorMessage` on every attribute instance:

```csharp
[ValidatableType]
public class CustomerModel
{
    // Resolves the localized string for 'RequiredAttribute_Error'.
    [Required]
    public string? Name { get; set; }
}
```

Two details affect key construction:

* The member segment is skipped for type-level attributes that report no member names.
* A nullable value type contributes its underlying type name.

### Where resource files are located

Keys are resolved from `.resx` files through ASP.NET Core's standard [Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer) infrastructure, so the usual naming and placement conventions apply. Per-type resolution is the default and needs no configuration beyond the resources path:

```csharp
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.AddValidation();
```

Under the configured `ResourcesPath`, the type's full name minus the project's root namespace is used as a dotted path. For a project root namespace of `Contoso`, French messages for `Contoso.Models.Customer` are read from `Resources/Models/Customer.fr.resx` (equivalently `Resources/Models.Customer.fr.resx`). For a full description of the conventions, see [fundamentals/localization/provide-resources](localization/provide-resources.md).

For per-type lookup, place the resource files in the project that declares the validated type. For example, if a Blazor Web App's form models are declared in its `.Client` project, place their per-type resources in that project. The model assembly's root namespace and the configured `ResourcesPath` determine the resource name.

### Use a shared resource file

To resolve keys from one resource file for every validated type instead of per-type resources, set `ValidationOptions.LocalizerProvider`:

```csharp
builder.Services.AddValidation(options =>
{
    options.LocalizerProvider = (_, factory) => factory.Create(typeof(ValidationMessages));
});
```

The delegate also receives the validated type, so an app can select different resources for different model types.

The marker type passed to `factory.Create` identifies both the resource name and the assembly containing the resource. This makes a shared resource in the host project an alternative to placing per-type resources in a referenced model assembly.

### Localize from a source other than resource files

To read localized strings from a database, JSON files, or another source, register a custom [Microsoft.Extensions.Localization.IStringLocalizerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizerFactory). A user-registered factory takes precedence over the default resource file implementation:

```csharp
builder.Services.AddSingleton<IStringLocalizerFactory, JsonStringLocalizerFactory>();
builder.Services.AddValidation();
```

### Attributes that localize themselves

Attributes configured with [System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessageResourceType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessageResourceType) or [System.ComponentModel.DataAnnotations.DisplayAttribute.ResourceType%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute.ResourceType%252A) perform their own resource lookup and aren't processed by the `Microsoft.Extensions.Validation` localizer.

### Format a custom attribute's message

A custom attribute that substitutes its own values into a message template implements `IValidationMessageFormatter`. The framework calls `FormatMessage` with the culture, the localized template, and the resolved display name:

```csharp
using System.Globalization;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Validation;

public sealed class DivisibleByAttribute : ValidationAttribute, IValidationMessageFormatter
{
    public int Divisor { get; init; }

    // Fills {0} with the display name and {1} with the divisor.
    public string FormatMessage(CultureInfo culture, string template, string displayName) =>
        string.Format(culture, template, displayName, Divisor);
}
```

> **Note:**
> This localization pipeline requires [Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation). A Blazor form whose model isn't discovered by the validation source generator falls back to [System.ComponentModel.DataAnnotations.Validator](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Validator). Attributes configured to localize themselves with `ErrorMessageResourceType` continue to do so, but the generated lookup conventions and `ValidationOptions.LocalizerProvider` aren't available. For more information, see [Behavior without generated validation metadata](#behavior-without-generated-validation-metadata).



## Configure generated validation metadata

[Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation) uses a Roslyn source generator to create validation metadata at build time. Minimal API parameter types are discovered from endpoint handler signatures. Blazor form model types are included by applying [Microsoft.Extensions.Validation.ValidatableTypeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation.ValidatableTypeAttribute).

<a id="force-generate-validatable-type-information"></a>

### Include root model types

Apply `[ValidatableType]` to a Blazor form's root model type and to any other root type that the source generator can't discover from a Minimal API endpoint signature. Types reachable from the root are included automatically.

### Model types can't be declared in Razor component files

The Razor compiler and the validation feature both use source generators. A source generator can't inspect another generator's output, so the validation generator can't include model types declared in Razor component files (`.razor`). Declare model types in regular C# files (`.cs`) instead.

**Applies to: \>= aspnetcore-11.0**

Applying `[ValidatableType]` to a type in generated code produces warning ASP0037.



<a id="register-validation-in-multi-assembly-apps"></a>

### Register validation across assemblies

The source generator creates metadata only for the assembly where [Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%252A) is called. Calling `AddValidation` only from the host app doesn't generate metadata for types declared in a referenced assembly, such as a class library or the `.Client` project of a Blazor Web App.

To validate types from separate assemblies:

* If the assembly is a plain class library (it isn't based on the `Microsoft.NET.Sdk.Web` or `Microsoft.NET.Sdk.Razor` SDKs), add a package reference to the project for the [`Microsoft.Extensions.Validation` NuGet package](https://www.nuget.org/packages/Microsoft.Extensions.Validation).
* Create an extension method in each assembly that declares validatable types. The method calls [Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%252A) so that the source generator runs in that assembly:

  ```csharp
  namespace ValidatableTypesAssembly.Extensions;

  public static class ServiceCollectionExtensions
  {
      public static IServiceCollection AddValidationForLibraryTypes(
          this IServiceCollection services)
      {
          return services.AddValidation();
      }
  }
  ```

* Call each of those extension methods from the host app, along with `AddValidation` for the host app's own types:

  ```csharp
  using ValidatableTypesAssembly.Extensions;

  ...

  builder.Services.AddValidationForLibraryTypes();
  builder.Services.AddValidation();
  ```

The preceding approach validates the types from both assemblies.

For a Blazor Web App whose form models are declared in the `.Client` project, create the validation-registration extension method in that project and call it from the server project's `Program` file.

For Minimal API endpoints and models defined in referenced assemblies, see [fundamentals/minimal-apis#validation-support-in-minimal-apis](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%23validation-support-in-minimal-apis).

### Troubleshoot generated validation metadata

Missing generated validation metadata doesn't produce a runtime exception or log entry. If expected validation behavior is missing, confirm all of the following:

* `AddValidation` is called from the assembly that declares the validatable types.
* Blazor root form models and other roots not discovered from Minimal API signatures have `[ValidatableType]`.
* Model types are declared in `.cs` files.
* Validated types and properties are accessible to generated code.

**Applies to: \>= aspnetcore-11.0**

Build analyzers report common unsupported configurations:

* [diagnostics/asp0033](../diagnostics/asp0033.md) and [diagnostics/asp0034](../diagnostics/asp0034.md) report inaccessible validatable types and endpoint parameter types.
* [diagnostics/asp0035](../diagnostics/asp0035.md) and [diagnostics/asp0036](../diagnostics/asp0036.md) report inaccessible validated properties or property types.
* [diagnostics/asp0037](../diagnostics/asp0037.md) reports `[ValidatableType]` applied to generated code.
* [diagnostics/asp0038](../diagnostics/asp0038.md) reports `[ValidatableType]` used without a matching `AddValidation` call.

Other missing-metadata cases might not produce a diagnostic.



For the runtime behavior when metadata isn't available, see [Behavior without generated validation metadata](#behavior-without-generated-validation-metadata).

**Applies to: \>= aspnetcore-10.0 < aspnetcore-11.0**

## Experimental API in apps that target .NET 10

Attributes from the [`Microsoft.Extensions.Validation` NuGet package](https://www.nuget.org/packages/Microsoft.Extensions.Validation) ([Microsoft.Extensions.Validation.ValidatableTypeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation.ValidatableTypeAttribute) and [Microsoft.Extensions.Validation.SkipValidationAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation.SkipValidationAttribute)) are published as *experimental* in .NET 10. The package is intended to provide a new shared infrastructure for validation features across frameworks, and publishing experimental types provides greater flexibility for the final design of the public API for better support in consuming frameworks. As of .NET 11, the attributes are no longer experimental, so the guidance in this section doesn't apply to apps that target .NET 11 or later.

In Blazor apps, types are made available via a generated embedded attribute. If a web app project that uses the `Microsoft.NET.Sdk.Web` SDK (`<Project Sdk="Microsoft.NET.Sdk.Web">`) or an RCL that uses the `Microsoft.NET.Sdk.Razor` SDK (`<Project Sdk="Microsoft.NET.Sdk.Razor">`) contains Razor components (`.razor`), the framework automatically generates an internal attribute inside the project (`Microsoft.Extensions.Validation.Embedded.ValidatableType`, `Microsoft.Extensions.Validation.Embedded.SkipValidation`). These types are interchangeable with the actual attributes and not marked experimental. In the majority of cases, developers use the `[ValidatableType]`/`[SkipValidation]` attributes on their classes without concern over their source.

However, the preceding approach isn't viable in plain class libraries that use the `Microsoft.NET.Sdk` SDK (`<Project Sdk="Microsoft.NET.Sdk">`). Using the types in a plain class library results in a code analysis warning:

> ASP0029: 'Microsoft.Extensions.Validation.ValidatableTypeAttribute' is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

The warning can be suppressed using any of the following approaches:

* A `<NoWarn>` property in the project file:

  ```xml
  <PropertyGroup>
    <NoWarn>$(NoWarn);ASP0029</NoWarn>
  </PropertyGroup>
  ```

* A [`pragma` directive](https://learn.microsoft.com/cpp/preprocessor/pragma-directives-and-the-pragma-keyword) where the attribute is used:

  ```csharp
  #pragma warning disable ASP0029
  [Microsoft.Extensions.Validation.ValidatableType]
  #pragma warning restore ASP0029
  ```

* An [EditorConfig file (`.editorconfig`)](https://learn.microsoft.com/visualstudio/ide/create-portable-custom-editor-options) rule:

  ```
  dotnet_diagnostic.ASP0029.severity = none
  ```

If suppressing the warning isn't acceptable, manually create the embedded attribute in the library that the Web and Razor SDKs generate automatically.

`ValidatableTypeAttribute.cs`:

```csharp
namespace Microsoft.Extensions.Validation.Embedded
{
    [AttributeUsage(AttributeTargets.Class)]
    internal sealed class ValidatableTypeAttribute : Attribute
    {
    }
}
```

Use the exact namespace (`Microsoft.Extensions.Validation.Embedded`) and class name ([Microsoft.Extensions.Validation.ValidatableTypeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation.ValidatableTypeAttribute)) in order for the validation source generator to detect and use the type. You can declare a global `using` statement for the namespace, either with a `global using Microsoft.Extensions.Validation.Embedded;` statement or with a `<Using Include="Microsoft.Extensions.Validation.Embedded" />` item in the library's project file.

Whichever approach is adopted, denote the presence of the workaround for a future update to your code when the app can target .NET 11 or later. At that time, you can remove your workarounds from the app.



## Additional resources

**Applies to: \>= aspnetcore-11.0**

* [blazor/forms/validation](../blazor/forms/validation.md)
  * [blazor/forms/validation-client-side](../blazor/forms/validation-client-side.md)
  * [blazor/forms/validation-advanced](../blazor/forms/validation-advanced.md)
* [fundamentals/minimal-apis](minimal-apis.md)
  * [Validation support in Minimal APIs](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%23validation-support-in-minimal-apis)
* [fundamentals/localization/make-content-localizable](localization/make-content-localizable.md)
* [mvc/models/validation](../mvc/models/validation.md)



**Applies to: < aspnetcore-11.0**

* [blazor/forms/validation](../blazor/forms/validation.md)
* [Validation support in Minimal APIs](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%23validation-support-in-minimal-apis)
* [mvc/models/validation](../mvc/models/validation.md)
