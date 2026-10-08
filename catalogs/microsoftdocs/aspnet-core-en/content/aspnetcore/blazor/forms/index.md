---
title: ASP.NET Core Blazor forms overview
author: guardrex
description: Learn how to use forms in Blazor.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 09/22/2026
uid: blazor/forms/index
---
# ASP.NET Core Blazor forms overview

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


This article explains how to use forms in Blazor.

## Input components and forms

The Blazor framework supports forms and provides built-in input components:

**Applies to: \>= aspnetcore-8.0**

* Bound to an object or model that can use [data annotations](../../mvc/models/validation.md).
  * HTML forms with the `<form>` element.
  * [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) components.
* [Built-in input components](input-components.md).



**Applies to: < aspnetcore-8.0**

* An [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component bound to an object or model that can use [data annotations](../../mvc/models/validation.md).
* [Built-in input components](input-components.md).



**Applies to: \>= aspnetcore-11.0**

In Blazor Web Apps that use static server-side rendering (static SSR), input components automatically participate in client-side validation when the form contains a [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component. For details, see [blazor/forms/validation-client-side](validation-client-side.md).



> **Note:**
> Unsupported ASP.NET Core validation features are covered in the [Unsupported validation features](#unsupported-validation-features) section.

The [Microsoft.AspNetCore.Components.Forms](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms) namespace provides:

* Classes for managing form elements, state, and validation.
* Access to built-in Input\* components.

A project created from the Blazor project template includes the namespace in the app's imports file (`_Imports.razor`), which makes the namespace available to the app's Razor components.

**Applies to: \>= aspnetcore-8.0**

Standard HTML forms are supported. Create a form using the normal HTML `<form>` tag and specify an `@onsubmit` handler for handling the submitted form request.

`StarshipPlainForm.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/StarshipPlainForm.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/StarshipPlainForm.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/index.md)



**Applies to: \>= aspnetcore-8.0**

In the preceding `StarshipPlainForm` component:

* The form is rendered where the `<form>` element appears. The form is named with the [`@formname`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23formname) directive attribute, which uniquely identifies the form to the Blazor framework.
* The model is created in the component's `@code` block and held in a `public` property (`Model`). The `[SupplyParameterFromForm]` attribute indicates that the value of the associated property should be supplied from the form data. Data in the request that matches the property's name is bound to the property.
* The [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) component is an input component for editing string values. The `@bind-Value` directive attribute binds the `Model.Id` model property to the [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) component's [Microsoft.AspNetCore.Components.Forms.InputBase%601.Value%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601.Value%252A) property.
* The `Submit` method is registered as a handler for the <!-- <xref:Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit> --> `@onsubmit` callback. The handler is called when the form is submitted by the user.

> **Important:**
> Always use the [`@formname`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23formname) directive attribute with a unique form name.

Blazor enhances page navigation and form handling by intercepting the request in order to apply the response to the existing DOM, preserving as much of the rendered form as possible. The enhancement avoids the need to fully load the page and provides a much smoother user experience, similar to a single-page app (SPA), although the component is rendered on the server. For more information, see [blazor/fundamentals/navigation#enhanced-navigation-and-form-handling](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling).

<!-- UPDATE 11.0 - Check the PU issue (backlogged as of 2/27/25 -->

[Streaming rendering](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23streaming-rendering) is supported for plain HTML forms. Note that when `POST`ing a form, only DOM updates inside the form's handlers are streamed (for example, `@onsubmit`). Updates inside `OnInitializedAsync` are only streamed for `GET` requests. For more information, see [Allow streaming the loading phase of POST responses (`dotnet/aspnetcore` #50994)](https://github.com/dotnet/aspnetcore/issues/50994).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


The preceding example includes antiforgery support by including an [Microsoft.AspNetCore.Components.Forms.AntiforgeryToken](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.AntiforgeryToken) component in the form. Antiforgery support is explained further in the [Antiforgery support](#antiforgery-support) section of this article.

To submit a form based on another element's DOM events, for example `oninput` or `onblur`, use JavaScript to submit the form ([`submit`](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit)).

Instead of using plain forms in Blazor apps, a form is typically defined with Blazor's built-in form support using the framework's [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component. The following Razor component demonstrates typical elements, components, and Razor code to render a webform using an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component.



**Applies to: < aspnetcore-8.0**

A form is defined using the Blazor framework's [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component. The following Razor component demonstrates typical elements, components, and Razor code to render a webform using an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component.



`Starship1.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Starship1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/index.md)



**Applies to: \>= aspnetcore-8.0**

In the preceding `Starship1` component:

* The [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component is rendered where the `<EditForm>` element appears. The form is named with the [Microsoft.AspNetCore.Components.Forms.EditForm.FormName](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.FormName) property, which uniquely identifies the form to the Blazor framework.
* The model is created in the component's `@code` block and held in a `public` property (`Model`). The property is assigned to the [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model) parameter. The `[SupplyParameterFromForm]` attribute indicates that the value of the associated property should be supplied from the form data. Data in the request that matches the property's name is bound to the property.
* The [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) component is an [input component](input-components.md) for editing string values. The `@bind-Value` directive attribute binds the `Model.Id` model property to the [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) component's [Microsoft.AspNetCore.Components.Forms.InputBase%601.Value%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601.Value%252A) property.
* The `Submit` method is registered as a handler for the [Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit) callback. The handler is called when the form is submitted by the user.

> **Important:**
> Always use the [Microsoft.AspNetCore.Components.Forms.EditForm.FormName](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.FormName) property with a unique form name.

Blazor enhances page navigation and form handling for [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) components. For more information, see [blazor/fundamentals/navigation#enhanced-navigation-and-form-handling](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling).

<!-- UPDATE 11.0 - Check the PU issue (backlogged as of 2/27/25 -->

[Streaming rendering](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23streaming-rendering) is supported for [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm). Note that when `POST`ing a form, only DOM updates inside the form's handlers are streamed (for example, `OnValidSubmit`). Updates inside `OnInitializedAsync` are only streamed for `GET` requests. For more information, see [Allow streaming the loading phase of POST responses (`dotnet/aspnetcore` #50994)](https://github.com/dotnet/aspnetcore/issues/50994).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).




**Applies to: < aspnetcore-8.0**

```razor
@page "/starship-1"
@inject ILogger<Starship1> Logger

<EditForm Model="Model" OnSubmit="Submit">
    <InputText @bind-Value="Model!.Id" />
    <button type="submit">Submit</button>
</EditForm>

@code {
    public Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    private void Submit()
    {
        Logger.LogInformation("Model.Id = {Id}", Model?.Id);
    }

    public class Starship
    {
        public string? Id { get; set; }
    }
}
```

In the preceding `Starship1` component:

* The [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component is rendered where the `<EditForm>` element appears.
* The model is created in the component's `@code` block and held in a private field (`model`). The field is assigned to the [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model) parameter.
* The [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) component is an input component for editing string values. The `@bind-Value` directive attribute binds the `Model.Id` model property to the [Microsoft.AspNetCore.Components.Forms.InputText](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputText) component's [Microsoft.AspNetCore.Components.Forms.InputBase%601.Value%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputBase%25601.Value%252A) property&dagger;.
* The `Submit` method is registered as a handler for the [Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit) callback. The handler is called when the form is submitted by the user.



&dagger;For more information on property binding, see [blazor/components/data-binding#binding-with-component-parameters](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fdata-binding%23binding-with-component-parameters).

In the next example, the preceding component is modified to create the form in the `Starship2` component:

* [Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit) is replaced with [Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit), which processes assigned event handler if the form is valid when submitted by the user.
* A [Microsoft.AspNetCore.Components.Forms.ValidationSummary](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.ValidationSummary) component is added to display validation messages when the form is invalid on form submission.
* The data annotations validator ([Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component&dagger;) attaches validation support using data annotations:
  * If the `<input>` form field is left blank when the **`Submit`** button is selected, an error appears in the validation summary ([Microsoft.AspNetCore.Components.Forms.ValidationSummary](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.ValidationSummary) component&Dagger;) ("`The Id field is required.`") and `Submit` is **not** called.
  * If the `<input>` form field contains more than ten characters when the **`Submit`** button is selected, an error appears in the validation summary ("`Id is too long.`"). `Submit` is **not** called.
  * If the `<input>` form field contains a valid value when the **`Submit`** button is selected, `Submit` is called.

&dagger;The [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component is covered in the [Data Annotations Validator component and custom validation](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation) section. &Dagger;The [Microsoft.AspNetCore.Components.Forms.ValidationSummary](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.ValidationSummary) component is covered in the [Validation Summary and Validation Message components](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components) section.

`Starship2.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/index.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Starship2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/forms/index.md)



**Applies to: < aspnetcore-8.0**

```razor
@page "/starship-2"
@using System.ComponentModel.DataAnnotations
@inject ILogger<Starship2> Logger

<EditForm Model="Model" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <InputText @bind-Value="Model!.Id" />
    <button type="submit">Submit</button>
</EditForm>

@code {
    public Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    private void Submit()
    {
        Logger.LogInformation("Id = {Id}", Model?.Id);
    }

    public class Starship
    {
        [Required]
        [StringLength(10, ErrorMessage = "Id is too long.")]
        public string? Id { get; set; }
    }
}
```



## Handle form submission

The [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) provides the following callbacks for handling form submission:

* Use [Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit) to assign an event handler to run when a form with valid fields is submitted.
* Use [Microsoft.AspNetCore.Components.Forms.EditForm.OnInvalidSubmit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnInvalidSubmit) to assign an event handler to run when a form with invalid fields is submitted.
* Use [Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit) to assign an event handler to run regardless of the form fields' validation status. The form is validated by calling [Microsoft.AspNetCore.Components.Forms.EditContext.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.Validate%252A) in the event handler method. If [Microsoft.AspNetCore.Components.Forms.EditContext.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditContext.Validate%252A) returns `true`, the form is valid.

## Clear a form or field

Reset a form by clearing its model back to its default state, which can be performed inside or outside of an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm)'s markup:

```razor
<button @onclick="ClearForm">Clear form</button>

...

private void ClearForm() => Model = new();
```

Alternatively, use an explicit Razor expression:

```razor
<button @onclick="@(() => Model = new())">Clear form</button>
```

Reset a field by clearing its model value back to its default state:

```razor
<button @onclick="ResetId">Reset Identifier</button>

...

private void ResetId() => Model!.Id = string.Empty;
```

Alternatively, use an explicit Razor expression:

```razor
<button @onclick="@(() => Model!.Id = string.Empty)">Reset Identifier</button>
```

There's no need to call [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) in the preceding examples because [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) is automatically called by the Blazor framework to rerender the component after an event handler is invoked. If an event handler isn't used to invoke the methods that clear a form or field, then developer code should call [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) to rerender the component.

**Applies to: \>= aspnetcore-8.0**

## Antiforgery support

Antiforgery services are automatically added to Blazor apps when [Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A) is called in the `Program` file.



**Applies to: \>= aspnetcore-11.0**

Automatic Cross-Site Request Forgery (CSRF) protection middleware is enabled by default in apps built with `WebApplication.CreateBuilder`. The middleware inspects the `Sec-Fetch-Site` and `Origin` headers on unsafe HTTP methods and records a validation verdict on the request. Blazor server-side rendering (SSR) form posts enforce that verdict and return `400 Bad Request` for cross-origin form posts that aren't trusted.

Token-based antiforgery services are added to the app when [Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A) is called in the `Program` file. However, token validation only runs when antiforgery middleware is explicitly added to the request processing pipeline by calling [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A).

Adding token-based antiforgery middleware doesn't replace the automatic header-based CSRF protection middleware. When an app calls [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A), both defense mechanisms run for a form post:

* The header-based CSRF protection middleware runs first and records its verdict.
* Antiforgery middleware performs token-based validation.

The token-based result from antiforgery middleware is authoritative and overrides the earlier header-based CSRF middleware verdict.

To explicitly add antiforgery middleware, call [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) after the call to [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A). If there are calls to [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A) and [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A), the call to [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) must go between them. A call to [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) must be placed after calls to [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A).

To disable the automatic header-based CSRF protection middleware, set the `DisableCsrfProtection` configuration key to true. For example, use the app settings file (`appsettings.json`) to disable the middleware:

```json
{
  "DisableCsrfProtection": true
}
```

The `DisableCsrfProtection` configuration setting can be supplied by any configuration source, including via an environment variable (`DisableCsrfProtection=true`).

> **Warning:**
> Disabling the automatic CSRF protection middleware removes the default header-based (`Sec-Fetch-Site`/`Origin`) protection for the entire app. Only disable it if you provide an alternative CSRF defense, such as explicitly adopting token-based antiforgery middleware by calling [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A).

For more information, see [Automatic CSRF protection](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23automatic-csrf-protection-in-aspnet-core).

> **Important:**
> The following guidance on the [Microsoft.AspNetCore.Components.Forms.AntiforgeryToken](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.AntiforgeryToken) component and the [Microsoft.AspNetCore.Components.Forms.AntiforgeryStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.AntiforgeryStateProvider) service only apply to an app that explicitly adopts token-based antiforgery middleware by calling [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) in its request processing pipeline.



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

The app uses antiforgery middleware by calling [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) in its request processing pipeline in the `Program` file. [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) is called after the call to [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A). If there are calls to [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A) and [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A), the call to [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) must go between them. A call to [Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A) must be placed after calls to [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A).



**Applies to: \>= aspnetcore-8.0**

The [Microsoft.AspNetCore.Components.Forms.AntiforgeryToken](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.AntiforgeryToken) component renders an antiforgery token as a hidden field, and the `[RequireAntiforgeryToken]` attribute enables antiforgery protection. If an antiforgery check fails, a [`400 - Bad Request`](https://developer.mozilla.org/docs/Web/HTTP/Status/400) response is thrown and the form isn't processed.

For forms based on [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm), the [Microsoft.AspNetCore.Components.Forms.AntiforgeryToken](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.AntiforgeryToken) component and `[RequireAntiforgeryToken]` attribute are automatically added to provide antiforgery protection.

For forms based on the HTML `<form>` element, manually add the [Microsoft.AspNetCore.Components.Forms.AntiforgeryToken](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.AntiforgeryToken) component to the form:

```razor
<form method="post" @onsubmit="Submit" @formname="starshipForm">
    <AntiforgeryToken />
    <input id="send" type="submit" value="Send" />
</form>

@if (submitted)
{
    <p>Form submitted!</p>
}

@code{
    private bool submitted = false;

    private void Submit() => submitted = true;
}
```

> **Warning:**
> For forms based on either [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) or the HTML `<form>` element, antiforgery protection can be disabled by passing `required: false` to the `[RequireAntiforgeryToken]` attribute. The following example disables antiforgery and is ***not recommended*** for public apps:
>
> ```razor
> @using Microsoft.AspNetCore.Antiforgery
> @attribute [RequireAntiforgeryToken(required: false)]
> ```

For more information, see [blazor/security/index#antiforgery-support](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23antiforgery-support).



**Applies to: \>= aspnetcore-8.0**

## Mitigate overposting attacks

Statically-rendered server-side forms, such as those typically used in components that create and edit records in a database with a form model, can be vulnerable to an *overposting* attack, also known as a *mass assignment* attack. An overposting attack occurs when a malicious user issues an HTML form POST to the server that processes data for properties that aren't part of the rendered form and that the developer doesn't wish to allow users to modify. The term "overposting" literally means that the malicious user has *over*-POSTed with the form.

Overposting isn't a concern when the model doesn't include restricted properties for create and update operations. However, it's important to keep overposting in mind when working with static SSR-based Blazor forms that you maintain.

To mitigate overposting, we recommend using a separate view model/data transfer object (DTO) for the form and database with create (insert) and update operations. When the form is submitted, only properties of the view model/DTO are used by the component and C# code to modify the database. Any extra data included by a malicious user is discarded, so the malicious user is prevented from conducting an overposting attack.



**Applies to: \>= aspnetcore-8.0**

## Enhanced form handling

[Enhance navigation](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling) for form POST requests with the [Microsoft.AspNetCore.Components.Forms.EditForm.Enhance%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Enhance%252A) parameter for [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) forms or the `data-enhance` attribute for HTML forms (`<form>`):

```razor
<EditForm ... Enhance ...>
    ...
</EditForm>
```

```html
<form ... data-enhance ...>
    ...
</form>
```

<span aria-hidden="true">❌</span><span class="visually-hidden">Unsupported:</span> You can't set enhanced navigation on a form's ancestor element to enable enhanced form handling.

```html
<div ... data-enhance ...>
    <form ...>
        <!-- NOT enhanced -->
    </form>
</div>
```

Enhanced form posts only work with Blazor endpoints. Posting an enhanced form to non-Blazor endpoint results in an error.

To disable enhanced form handling:

* For an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm), remove the [Microsoft.AspNetCore.Components.Forms.EditForm.Enhance%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Enhance%252A) parameter from the form element (or set it to `false`: `Enhance="false"`).
* For an HTML `<form>`, remove the `data-enhance` attribute from form element (or set it to `false`: `data-enhance="false"`).

Blazor's enhanced navigation and form handling may undo dynamic changes to the DOM if the updated content isn't part of the server rendering. To preserve the content of an element, use the `data-permanent` attribute.

In the following example, the content of the `<div>` element is updated dynamically by a script when the page loads:

```html
<div data-permanent>
    ...
</div>
```

To disable enhanced navigation and form handling globally, see [blazor/fundamentals/startup#enhanced-navigation-and-form-handling](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23enhanced-navigation-and-form-handling).

For guidance on using the `enhancedload` event to listen for enhanced page updates, see [blazor/fundamentals/navigation#enhanced-navigation-and-form-handling](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling).



## Examples

**Applies to: \>= aspnetcore-8.0**

Examples don't adopt enhanced form handling for form POST requests, but all of the examples can be updated to adopt the enhanced features by following the guidance in the [Enhanced form handling](#enhanced-form-handling) section.



**Applies to: < aspnetcore-5.0**

Examples use the [target-typed `new` operator](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/new-operator#target-typed-new), which was introduced with C# 9 and .NET 5. In the following example, the type isn't explicitly stated for the `new` operator:

```csharp
public ShipDescription ShipDescription { get; set; } = new();
```

If using C# 8 or earlier (ASP.NET Core 3.1), modify the example code to state the type to the `new` operator:

```csharp
public ShipDescription ShipDescription { get; set; } = new ShipDescription();
```



**Applies to: < aspnetcore-6.0**

Components use nullable reference types (NRTs), and the .NET compiler performs null-state static analysis, both of which are supported in .NET 6 or later. For more information, see [migration/50-to-60#nullable-reference-types-nrts-and-net-compiler-null-state-static-analysis](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23nullable-reference-types-nrts-and-net-compiler-null-state-static-analysis).

If using C# 9 or earlier (.NET 5 or earlier), remove the NRTs from the examples. Usually, this merely involves removing the question marks (`?`) and exclamation points (`!`) from the types in the example code.

The .NET SDK applies implicit global `using` directives to projects when targeting .NET 6 or later. The examples use a logger to log information about form processing, but it isn't necessary to specify an `@using` directive for the [Microsoft.Extensions.Logging](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging) namespace in the component examples. For more information, see [.NET project SDKs: Implicit using directives](https://learn.microsoft.com/dotnet/core/project-sdk/overview#implicit-using-directives).

If using C# 9 or earlier (.NET 5 or earlier), add `@using` directives to the top of the component after the `@page` directive for any API required by the example. Find API namespaces through Visual Studio (right-click the object and select **Peek Definition**) or the [.NET API browser](https://learn.microsoft.com/dotnet/api/).



To demonstrate how forms work with [data annotations](../../mvc/models/validation.md) validation, example components rely on [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) API. If you wish to avoid an extra line of code in components that use data annotations, make the namespace available throughout the app's components with the imports file (`_Imports.razor`):

```razor
@using System.ComponentModel.DataAnnotations
```

Form examples reference aspects of the [Star Trek](http://www.startrek.com/) universe. Star Trek is a copyright &copy;1966-2023 of [CBS Studios](https://www.paramount.com/brand/cbs-studios) and [Paramount](https://www.paramount.com).

**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

## Client-side validation requires a circuit

In Blazor Web Apps, client-side validation requires an active Blazor SignalR circuit. Client-side validation isn't available to forms in components that have adopted static server-side rendering (static SSR). Forms that adopt static SSR are validated on the server after the form is submitted.



**Applies to: \>= aspnetcore-11.0**

## Client-side validation in static SSR forms

In Blazor Web Apps, forms in components that adopt static server-side rendering (static SSR) gain client-side validation automatically when a [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component is present in the form. For details, see [blazor/forms/validation-client-side](validation-client-side.md).



## Unsupported validation features

All of the [data annotation built-in validators](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23built-in-attributes) are supported in Blazor except for the [`[Remote]` validation attribute](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23remote-attribute).

jQuery validation isn't supported in Razor components. We recommend any of the following approaches:

**Applies to: \>= aspnetcore-11.0**

* Follow the guidance in [blazor/forms/validation](validation.md) for any of the following scenarios:
  * Server-side validation in a Blazor Web App that adopts an interactive render mode.
  * Client-side validation in [static SSR forms](validation-client-side.md).
  * Client-side validation in a standalone Blazor WebAssembly app.
* Use native HTML validation attributes (see [Client-side form validation](https://developer.mozilla.org/docs/Learn/Forms/Form_validation)).
* Adopt a third-party validation JavaScript library.



**Applies to: < aspnetcore-11.0**

* Follow the guidance in [blazor/forms/validation](validation.md) for either:
  * Server-side validation in a Blazor Web App that adopts an interactive render mode.
  * Client-side validation in a standalone Blazor WebAssembly app.
* Use native HTML validation attributes (see [Client-side form validation](https://developer.mozilla.org/docs/Learn/Forms/Form_validation)).
* Adopt a third-party validation JavaScript library.



## Additional resources

**Applies to: \>= aspnetcore-8.0**

* [blazor/file-uploads](../file-uploads.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))
* [ASP.NET Core GitHub repository (`dotnet/aspnetcore`) forms test assets](https://github.com/dotnet/aspnetcore/tree/main/src/Components/test/testassets/Components.TestServer/RazorComponents/Pages/Forms)



**Applies to: < aspnetcore-8.0**

* [blazor/file-uploads](../file-uploads.md)
* [blazor/security/webassembly/hosted-with-microsoft-entra-id](../security/webassembly/hosted-with-microsoft-entra-id.md)
* [blazor/security/webassembly/hosted-with-azure-active-directory-b2c](../security/webassembly/hosted-with-azure-active-directory-b2c.md)
* [blazor/security/webassembly/hosted-with-identity-server](../security/webassembly/hosted-with-identity-server.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))
* [ASP.NET Core GitHub repository (`dotnet/aspnetcore`) forms test assets](https://github.com/dotnet/aspnetcore/tree/main/src/Components/test/testassets/Components.TestServer/RazorComponents/Pages/Forms)
