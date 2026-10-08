---
title: Localization Extensibility
author: wadepickett
description: Learn how to extend the localization APIs in ASP.NET Core apps.
monikerRange: '>= aspnetcore-2.1'
ms.author: wpickett
ms.date: 08/03/2019
uid: fundamentals/localization-extensibility
---
# Localization Extensibility

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


By [Hisham Bin Ateya](https://github.com/hishamco)

This article:

* Lists the extensibility points on the localization APIs.
* Provides instructions on how to extend ASP.NET Core app localization.

## Extensible Points in Localization APIs

ASP.NET Core localization APIs are built to be extensible. Extensibility allows developers to customize the localization according to their needs. For instance, [OrchardCore](https://github.com/orchardCMS/OrchardCore/) has a `POStringLocalizer`. `POStringLocalizer` describes in detail using [Portable Object localization](portable-object-localization.md) to use `PO` files to store localization resources.

This article lists the two main extensibility points that localization APIs provide: 

* [Microsoft.AspNetCore.Localization.RequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.RequestCultureProvider)
* [Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer)

## Localization Culture Providers

ASP.NET Core localization APIs have four default providers that can determine the current culture of an executing request:

* [Microsoft.AspNetCore.Localization.QueryStringRequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.QueryStringRequestCultureProvider)
* [Microsoft.AspNetCore.Localization.CookieRequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.CookieRequestCultureProvider)
* [Microsoft.AspNetCore.Localization.AcceptLanguageHeaderRequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.AcceptLanguageHeaderRequestCultureProvider)
* [Microsoft.AspNetCore.Localization.CustomRequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.CustomRequestCultureProvider)

The preceding providers are described in detail in the [localization middleware](localization.md) documentation. If the default providers don't meet your needs, build a custom provider using one of the following approaches:

### Use CustomRequestCultureProvider

[Microsoft.AspNetCore.Localization.CustomRequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.CustomRequestCultureProvider) provides a custom [Microsoft.AspNetCore.Localization.RequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.RequestCultureProvider) that uses a simple delegate to determine the current localization culture:

**Applies to: \>= aspnetcore-3.0**

```csharp
options.AddInitialRequestCultureProvider(new CustomRequestCultureProvider(async context =>
{
    var currentCulture = "en";
    var segments = context.Request.Path.Value.Split(new char[] { '/' }, 
        StringSplitOptions.RemoveEmptyEntries);

    if (segments.Length > 1 && segments[0].Length == 2)
    {
        currentCulture = segments[0];
    }

    var requestCulture = new ProviderCultureResult(currentCulture);

    return Task.FromResult(requestCulture);
}));
```



**Applies to: < aspnetcore-3.0**

```csharp
options.RequestCultureProviders.Insert(0, new CustomRequestCultureProvider(async context =>
{
    var currentCulture = "en";
    var segments = context.Request.Path.Value.Split(new char[] { '/' }, 
        StringSplitOptions.RemoveEmptyEntries);

    if (segments.Length > 1 && segments[0].Length == 2)
    {
        currentCulture = segments[0];
    }

    var requestCulture = new ProviderCultureResult(currentCulture);

    return Task.FromResult(requestCulture);
}));
```



### Use a new implementation of RequestCultureProvider

A new implementation of [Microsoft.AspNetCore.Localization.RequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.RequestCultureProvider) can be created that determines the request culture information from a custom source. For example, the custom source can be a configuration file or database.

The following example shows `AppSettingsRequestCultureProvider`, which extends the [Microsoft.AspNetCore.Localization.RequestCultureProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization.RequestCultureProvider) to determine the request culture information from `appsettings.json`:

```csharp
public class AppSettingsRequestCultureProvider : RequestCultureProvider
{
    public string CultureKey { get; set; } = "culture";

    public string UICultureKey { get; set; } = "ui-culture";

    public override Task<ProviderCultureResult> DetermineProviderCultureResult(HttpContext httpContext)
    {
        if (httpContext == null)
        {
            throw new ArgumentNullException();
        }

        var configuration = httpContext.RequestServices.GetService<IConfigurationRoot>();
        var culture = configuration[CultureKey];
        var uiCulture = configuration[UICultureKey];

        if (culture == null && uiCulture == null)
        {
            return Task.FromResult((ProviderCultureResult)null);
        }

        if (culture != null && uiCulture == null)
        {
            uiCulture = culture;
        }

        if (culture == null && uiCulture != null)
        {
            culture = uiCulture;
        }
        
        var providerResultCulture = new ProviderCultureResult(culture, uiCulture);

        return Task.FromResult(providerResultCulture);
    }
}
```

## Localization resources

ASP.NET Core localization provides [Microsoft.Extensions.Localization.ResourceManagerStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.ResourceManagerStringLocalizer). [Microsoft.Extensions.Localization.ResourceManagerStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.ResourceManagerStringLocalizer) is an implementation of [Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer) that uses `resx` to store localization resources.

You aren't limited to using `resx` files. By implementing `IStringLocalizer`, any data source can be used.

The following example projects implement [Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer):

* [EFStringLocalizer](https://github.com/aspnet/Entropy/tree/master/samples/Localization.EntityFramework)
* [JsonStringLocalizer](https://github.com/hishamco/My.Extensions.Localization.Json)
* [SqlLocalizer](https://github.com/damienbod/AspNetCoreLocalization)
