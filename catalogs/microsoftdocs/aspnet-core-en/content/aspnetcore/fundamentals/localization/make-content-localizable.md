---
title: Make an ASP.NET Core app's content localizable
author: wadepickett
description: Learn how to make an ASP.NET Core app's content localizable to prepare the app for localizing content into different languages and cultures.
ms.author: wpickett
monikerRange: '>= aspnetcore-5.0'
ms.date: 09/22/2026
uid: fundamentals/localization/make-content-localizable
---
# Make an ASP.NET Core app's content localizable

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


**Applies to: \> aspnetcore-5.0**

By [Hisham Bin Ateya](https://twitter.com/hishambinateya), [Damien Bowden](https://github.com/damienbod), [Bart Calixto](https://twitter.com/bartmax) and [Nadeem Afana](https://afana.me/)

One task for localizing an app is to wrap localizable content with code that facilitates replacing that content for different cultures.

## `IStringLocalizer`

[Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer) and [Microsoft.Extensions.Localization.IStringLocalizer%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer%25601) were architected to improve productivity when developing localized apps. `IStringLocalizer` uses the [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) and [System.Resources.ResourceReader](https://learn.microsoft.com/search/?terms=System.Resources.ResourceReader) to provide culture-specific resources at run time. The interface has an indexer and an `IEnumerable` for returning localized strings. `IStringLocalizer` doesn't require storing the default language strings in a resource file. You can develop an app targeted for localization and not need to create resource files early in development.  

The following code example shows how to wrap the string "About Title" for localization.

[Code example (complete source file; reference: \~/fundamentals/localization/sample/8.x/Localization/Controllers/AboutController.cs)](../../../_code/aspnetcore/fundamentals/localization/sample/8.x/Localization/Controllers/AboutController.cs.md)

In the preceding code, the `IStringLocalizer<T>` implementation comes from [Dependency Injection](../dependency-injection.md). If the localized value of "About Title" isn't found, then the indexer key is returned, that is, the string "About Title".

You can leave the default language literal strings in the app and wrap them in the localizer, so that you can focus on developing the app. You develop an app with your default language and prepare it for the localization step without first creating a default resource file.

Alternatively, you can use the traditional approach and provide a key to retrieve the default language string. For many developers, the new workflow of not having a default language *.resx* file and simply wrapping the string literals can reduce the overhead of localizing an app. Other developers prefer the traditional work flow as it can be easier to work with long string literals and easier to update localized strings.

## `IHtmlLocalizer`

Use the [Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer%25601) implementation for resources that contain HTML. [Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer) HTML-encodes arguments that are formatted in the resource string, but doesn't HTML-encode the resource string itself. In the following highlighted code, only the value of the `name` parameter is HTML-encoded.

[Code example (complete source file; reference: \~/fundamentals/localization/sample/8.x/Localization/Controllers/BookController.cs?highlight=3,5,20\&start=1\&end=24)](../../../_code/aspnetcore/fundamentals/localization/sample/8.x/Localization/Controllers/BookController.cs.md)

***NOTE:*** Generally, only localize text, not HTML.

## `IStringLocalizerFactory`

At the lowest level, [Microsoft.Extensions.Localization.IStringLocalizerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizerFactory) can be retrieved from of [Dependency Injection](../dependency-injection.md):

[Code example (complete source file; reference: \~/fundamentals/localization/sample/8.x/Localization/Controllers/TestController.cs?highlight=6-12\&name=snippet_1)](../../../_code/aspnetcore/fundamentals/localization/sample/8.x/Localization/Controllers/TestController.cs.md)

The preceding code demonstrates each of the two factory create methods.

## Shared resources

You can partition your localized strings by controller or area, or have just one container. In the sample app, a marker class named `SharedResource` is used for shared resources. The marker class is never called:

[Code example (complete source file; reference: \~/fundamentals/localization/sample/8.x/Localization/SharedResource.cs)](../../../_code/aspnetcore/fundamentals/localization/sample/8.x/Localization/SharedResource.cs.md)

In the following sample, the `InfoController` and the `SharedResource` localizers are used:

[Code example (complete source file; reference: \~/fundamentals/localization/sample/8.x/Localization/Controllers/InfoController.cs?name=snippet_1)](../../../_code/aspnetcore/fundamentals/localization/sample/8.x/Localization/Controllers/InfoController.cs.md)

## View localization

The [Microsoft.AspNetCore.Mvc.Localization.IViewLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Localization.IViewLocalizer) service provides localized strings for a [view](../../mvc/views/overview.md). The `ViewLocalizer` class implements this interface and finds the resource location from the view file path. The following code shows how to use the default implementation of `IViewLocalizer`:

[Code example (complete source file; reference: \~/fundamentals/localization/sample/8.x/Localization/Views/Home/About.cshtml)](../../../_code/aspnetcore/fundamentals/localization/sample/8.x/Localization/Views/Home/About.cshtml.md)

The default implementation of `IViewLocalizer` finds the resource file based on the view's file name. There's no option to use a global shared resource file. `ViewLocalizer` implements the localizer using `IHtmlLocalizer`, so Razor doesn't HTML-encode the localized string. You can parameterize resource strings, and `IViewLocalizer` HTML-encodes the parameters but not the resource string. Consider the following Razor markup:

```cshtml
@Localizer["<i>Hello</i> <b>{0}!</b>", UserManager.GetUserName(User)]
```

A French resource file could contain the following values:

| Key | Value |
| --- | --- |
| `<i>Hello</i> <b>{0}!</b>` | `<i>Bonjour</i> <b>{0} !</b>` |

The rendered view would contain the HTML markup from the resource file.

Generally, ***only localize text***, not HTML.

To use a shared resource file in a view, inject `IHtmlLocalizer<T>`:

[Code example (complete source file; reference: \~/fundamentals/localization/sample/8.x/Localization/Views/Test/About.cshtml?highlight=5,12)](../../../_code/aspnetcore/fundamentals/localization/sample/8.x/Localization/Views/Test/About.cshtml.md)

## DataAnnotations localization

DataAnnotations error messages are localized with `IStringLocalizer<T>`. Using the option `ResourcesPath = "Resources"`, the error messages in `RegisterViewModel` can be stored in either of the following paths:

* *Resources/ViewModels.Account.RegisterViewModel.fr.resx*
* *Resources/ViewModels/Account/RegisterViewModel.fr.resx*

[Code example (complete source file; reference: \~/fundamentals/localization/sample/8.x/Localization/ViewModels/Account/RegisterViewModel.cs)](../../../_code/aspnetcore/fundamentals/localization/sample/8.x/Localization/ViewModels/Account/RegisterViewModel.cs.md)

Non-validation attributes are localized.

<a name="one-resource-string-multiple-classes"></a>

### How to use one resource string for multiple classes

The following code shows how to use one resource string for validation attributes with multiple classes:

```csharp
    services.AddMvc()
        .AddDataAnnotationsLocalization(options => {
            options.DataAnnotationLocalizerProvider = (type, factory) =>
                factory.Create(typeof(SharedResource));
        });
```

In the preceding code, `SharedResource` is the class corresponding to the *.resx* file where the validation messages are stored. With this approach, DataAnnotations only uses `SharedResource`, rather than the resource for each class.



**Applies to: \>= aspnetcore-11.0**

## DataAnnotations localization in Minimal APIs and Blazor

Validation error messages and the display names of validated members are localized by [Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation), which is the validation pipeline used by Minimal APIs and Blazor forms.

Localization activates automatically when an [Microsoft.Extensions.Localization.IStringLocalizerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizerFactory) is registered. Call [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A) together with [Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation%252A):

```csharp
builder.Services.AddLocalization();
builder.Services.AddValidation();
```

For the message lookup key conventions, shared resource files, custom message formatting, and the full set of options, see [fundamentals/validation#localize-validation-messages](https://learn.microsoft.com/search/?terms=fundamentals%2Fvalidation%23localize-validation-messages).

The integration doesn't apply to MVC and Razor Pages apps. For those frameworks, see [mvc/models/validation](../../mvc/models/validation.md).



**Applies to: \> aspnetcore-5.0**

## Configure localization services

Localization services are configured in `Program.cs`:

[Code example (complete source file; reference: \~/fundamentals/localization/sample/6.x/Localization/program.cs?name=snippet_LocalizationConfigurationServices)](../../../_code/aspnetcore/fundamentals/localization/sample/6.x/Localization/Program.cs.md)

* [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A) adds the localization services to the services container, including implementations for `IStringLocalizer<T>` and `IStringLocalizerFactory`. The preceding code also sets the resources path to "Resources".

* [Microsoft.Extensions.DependencyInjection.MvcLocalizationMvcBuilderExtensions.AddViewLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcLocalizationMvcBuilderExtensions.AddViewLocalization%252A) adds support for localized view files. In this sample, view localization is based on the view file suffix. For example "fr" in the `Index.fr.cshtml` file.

* [Microsoft.Extensions.DependencyInjection.MvcDataAnnotationsMvcBuilderExtensions.AddDataAnnotationsLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcDataAnnotationsMvcBuilderExtensions.AddDataAnnotationsLocalization%252A) adds support for localized `DataAnnotations` validation messages through `IStringLocalizer` abstractions.

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


## Next steps

Localizing an app also involves the following tasks:

* [Provide localized resources for the languages and cultures the app supports](provide-resources.md)
* [Implement a strategy to select the language/culture for each request](select-language-culture.md)

## Additional resources

* [Url culture provider using middleware as filters in ASP.NET Core](https://andrewlock.net/url-culture-provider-using-middleware-as-mvc-filter-in-asp-net-core-1-1-0/)
* [Applying the RouteDataRequest CultureProvider globally with middleware as filters](https://andrewlock.net/applying-the-routedatarequest-cultureprovider-globally-with-middleware-as-filters/)
* [fundamentals/localization](../localization.md)
* [fundamentals/localization/provide-resources](provide-resources.md)
* [fundamentals/localization/select-language-culture](select-language-culture.md)
* [fundamentals/troubleshoot-aspnet-core-localization](../troubleshoot-aspnet-core-localization.md)
* [Globalizing and localizing .NET applications](https://learn.microsoft.com/dotnet/standard/globalization-localization/index)
* [Localization.StarterWeb project](https://github.com/aspnet/Entropy/tree/master/samples/Localization.StarterWeb) used in the article.
* [Resources in .resx Files](https://learn.microsoft.com/dotnet/framework/resources/working-with-resx-files-programmatically)
* [Localization & Generics](http://hishambinateya.com/localization-and-generics)



**Applies to: \= aspnetcore-5.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT), [Damien Bowden](https://github.com/damienbod), [Bart Calixto](https://twitter.com/bartmax), [Nadeem Afana](https://afana.me/), and [Hisham Bin Ateya](https://twitter.com/hishambinateya)

One task for localizing an app is to wrap localizable content with code that facilitates replacing that content for different cultures.

## `IStringLocalizer`

[Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer) and [Microsoft.Extensions.Localization.IStringLocalizer%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer%25601) were architected to improve productivity when developing localized apps. `IStringLocalizer` uses the [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) and [System.Resources.ResourceReader](https://learn.microsoft.com/search/?terms=System.Resources.ResourceReader) to provide culture-specific resources at run time. The interface has an indexer and an `IEnumerable` for returning localized strings. `IStringLocalizer` doesn't require storing the default language strings in a resource file. You can develop an app targeted for localization and not need to create resource files early in development.  

The following code example shows how to wrap the string "About Title" for localization.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/Controllers/AboutController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

In the preceding code, the `IStringLocalizer<T>` implementation comes from [Dependency Injection](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/includes/~/fundamentals/dependency-injection.md). If the localized value of "About Title" isn't found, then the indexer key is returned, that is, the string "About Title".

You can leave the default language literal strings in the app and wrap them in the localizer, so that you can focus on developing the app. You develop an app with your default language and prepare it for the localization step without first creating a default resource file.

Alternatively, you can use the traditional approach and provide a key to retrieve the default language string. For many developers, the new workflow of not having a default language *.resx* file and simply wrapping the string literals can reduce the overhead of localizing an app. Other developers prefer the traditional work flow as it can be easier to work with long string literals and easier to update localized strings.

## `IHtmlLocalizer`

Use the `IHtmlLocalizer<T>` implementation for resources that contain HTML. `IHtmlLocalizer` HTML-encodes arguments that are formatted in the resource string, but doesn't HTML-encode the resource string itself. In the following highlighted code, only the value of the `name` parameter is HTML-encoded.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/Controllers/BookController.cs?highlight=3,5,20\\&start=1\\&end=24](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

> **Note:**
> Generally, only localize text, not HTML.

## `IStringLocalizerFactory`

At the lowest level, you can get `IStringLocalizerFactory` out of [Dependency Injection](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/includes/~/fundamentals/dependency-injection.md):

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/Controllers/TestController.cs?start=9\\&end=26\\&highlight=7-13](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

The preceding code demonstrates each of the two factory create methods.

## Shared resources

You can partition your localized strings by controller or area, or have just one container. In the sample app, a dummy class named `SharedResource` is used for shared resources.

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/SharedResource.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

Some developers use the `Startup` class to contain global or shared strings. In the following sample, the `InfoController` and the `SharedResource` localizers are used:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/Controllers/InfoController.cs?range=9-26](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

## View localization

The `IViewLocalizer` service provides localized strings for a [view](../../mvc/views/overview.md). The `ViewLocalizer` class implements this interface and finds the resource location from the view file path. The following code shows how to use the default implementation of `IViewLocalizer`:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/Views/Home/About.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

The default implementation of `IViewLocalizer` finds the resource file based on the view's file name. There's no option to use a global shared resource file. `ViewLocalizer` implements the localizer using `IHtmlLocalizer`, so Razor doesn't HTML-encode the localized string. You can parameterize resource strings, and `IViewLocalizer` HTML-encodes the parameters but not the resource string. Consider the following Razor markup:

```cshtml
@Localizer["<i>Hello</i> <b>{0}!</b>", UserManager.GetUserName(User)]
```

A French resource file could contain the following values:

| Key | Value |
| --- | --- |
| `<i>Hello</i> <b>{0}!</b>` | `<i>Bonjour</i> <b>{0} !</b>` |

The rendered view would contain the HTML markup from the resource file.

> **Note:**
> Generally, only localize text, not HTML.

To use a shared resource file in a view, inject `IHtmlLocalizer<T>`:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/Views/Test/About.cshtml?highlight=5,12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

## DataAnnotations localization

DataAnnotations error messages are localized with `IStringLocalizer<T>`. Using the option `ResourcesPath = "Resources"`, the error messages in `RegisterViewModel` can be stored in either of the following paths:

* *Resources/ViewModels.Account.RegisterViewModel.fr.resx*
* *Resources/ViewModels/Account/RegisterViewModel.fr.resx*

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/ViewModels/Account/RegisterViewModel.cs?start=9\\&end=26](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

In ASP.NET Core MVC 1.1.0 or later, non-validation attributes are localized.

<a name="one-resource-string-multiple-classes"></a>

### How to use one resource string for multiple classes

The following code shows how to use one resource string for validation attributes with multiple classes:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc()
        .AddDataAnnotationsLocalization(options => {
            options.DataAnnotationLocalizerProvider = (type, factory) =>
                factory.Create(typeof(SharedResource));
        });
}
```

In the preceding code, `SharedResource` is the class corresponding to the *.resx* file where the validation messages are stored. With this approach, DataAnnotations only uses `SharedResource`, rather than the resource for each class.

## Configure localization services

Localization services are configured in the `Startup.ConfigureServices` method:

[Code reference unavailable in this source snapshot: includes/~/fundamentals/localization/sample/3.x/Localization/Startup.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/localization/make-content-localizable.md)

* `AddLocalization` adds the localization services to the services container, including implementations for `IStringLocalizer<T>` and `IStringLocalizerFactory`. The preceding code also sets the resources path to "Resources".

* `AddViewLocalization` adds support for localized view files. In this sample, view localization is based on the view file suffix. For example "fr" in the `Index.fr.cshtml` file.

* `AddDataAnnotationsLocalization` adds support for localized `DataAnnotations` validation messages through `IStringLocalizer` abstractions.

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


## Next steps

Localizing an app also involves the following tasks:

* [Provide localized resources for the languages and cultures the app supports](provide-resources.md)
* [Implement a strategy to select the language/culture for each request](select-language-culture.md)

## Additional resources

* [fundamentals/localization](../localization.md)
* [fundamentals/localization/provide-resources](provide-resources.md)
* [fundamentals/localization/select-language-culture](select-language-culture.md)
* [fundamentals/troubleshoot-aspnet-core-localization](../troubleshoot-aspnet-core-localization.md)
* [Globalizing and localizing .NET applications](https://learn.microsoft.com/dotnet/standard/globalization-localization/index)
* [Localization.StarterWeb project](https://github.com/aspnet/Entropy/tree/master/samples/Localization.StarterWeb) used in the article.
* [Resources in .resx Files](https://learn.microsoft.com/dotnet/framework/resources/working-with-resx-files-programmatically)
* [Localization & Generics](http://hishambinateya.com/localization-and-generics)
