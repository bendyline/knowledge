---
title: Provide localized resources for languages and cultures in an ASP.NET Core app
author: wadepickett
description: Learn how to provide localized resources for localizing content of an ASP.NET Core app into different languages and cultures.
ms.author: wpickett
monikerRange: '>= aspnetcore-5.0'
ms.date: 06/20/2025
uid: fundamentals/localization/provide-resources
---
# Provide localized resources for languages and cultures in an ASP.NET Core app

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

By [Rick Anderson](https://twitter.com/RickAndMSFT), [Damien Bowden](https://github.com/damienbod), [Bart Calixto](https://twitter.com/bartmax), [Nadeem Afana](https://afana.me/), and [Hisham Bin Ateya](https://twitter.com/hishambinateya)

One task for localizing an app is to provide localized strings in resource files. This article is about working with resource files.

## `SupportedCultures` and `SupportedUICultures`

ASP.NET Core has two collections of culture values, `SupportedCultures` and `SupportedUICultures`. The [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object for `SupportedCultures` determines the results of culture-dependent functions, such as date, time, number, and currency formatting. `SupportedCultures` also determines the sorting order of text, casing conventions, and string comparisons. See [System.StringComparer.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparer.CurrentCulture) for more info on how the server gets the culture. The `SupportedUICultures` determines which translated strings (from *.resx* files) are looked up by the [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager). The `ResourceManager` simply looks up culture-specific strings that are determined by `CurrentUICulture`. Every thread in .NET has `CurrentCulture` and `CurrentUICulture` objects. ASP.NET Core inspects these values when rendering culture-dependent functions. For example, if the current thread's culture is set to "en-US" (English, United States), `DateTime.Now.ToLongDateString()` displays "Thursday, February 18, 2016", but if `CurrentCulture` is set to "es-ES" (Spanish, Spain) the output will be "jueves, 18 de febrero de 2016".

## Resource files

***NOTE:*** [ResX Viewer and Editor](https://marketplace.visualstudio.com/items?itemName=TimHeuer.resx-editor) provides an alternate mechanism to work with resource files using Visual Studio Code.

A resource file is a useful mechanism for separating localizable strings from code. Translated strings for the non-default language are isolated in *.resx* resource files. For example, you might want to create a Spanish resource file named *Welcome.es.resx* containing translated strings. "es" is the language code for Spanish. To create this resource file in Visual Studio:

1. In **Solution Explorer**, right click on the folder that will contain the resource file, and then select **Add** > **New Item**.

   Nested contextual menu: In Solution Explorer, a contextual menu is open for Resources. A second contextual menu is open for Add showing the New Item command highlighted.

1. In the **Search installed templates** box, enter "resource" and name the file.

   Add New Item dialog

1. Enter the key value (native string) in the **Name** column and the translated string in the **Value** column.

   Welcome.es.resx file (the Welcome resource file for Spanish) with the word Hello in the Name column and the word Hola (Hello in Spanish) in the Value column

   Visual Studio shows the *Welcome.es.resx* file.

   Solution Explorer showing the Welcome Spanish (es) resource file

## Resource file naming

Resources are named for the full type name of their class minus the assembly name. For example, a French resource in a project whose main assembly is `LocalizationWebsite.Web.dll` for the class `LocalizationWebsite.Web.Startup` would be named *Startup.fr.resx*. A resource for the class `LocalizationWebsite.Web.Controllers.HomeController` would be named *Controllers.HomeController.fr.resx*. If your targeted class's namespace isn't the same as the assembly name you will need the full type name. For example, in the sample project a resource for the type `ExtraNamespace.Tools` would be named *ExtraNamespace.Tools.fr.resx*.

In the sample project, the `ConfigureServices` method sets the `ResourcesPath` to "Resources", so the project relative path for the home controller's French resource file is *Resources/Controllers.HomeController.fr.resx*. Alternatively, you can use folders to organize resource files. For the home controller, the path would be *Resources/Controllers/HomeController.fr.resx*. If you don't use the `ResourcesPath` option, the *.resx* file would go in the project base directory. The resource file for `HomeController` would be named *Controllers.HomeController.fr.resx*. The choice of using the dot or path naming convention depends on how you want to organize your resource files.

| Resource name | Dot or path naming |
| --- | --- |
| Resources/Controllers.HomeController.fr.resx | Dot |
| Resources/Controllers/HomeController.fr.resx | Path |

Resource files using `@inject IViewLocalizer` in Razor views follow a similar pattern. The resource file for a view can be named using either dot naming or path naming. Razor view resource files mimic the path of their associated view file. Assuming we set the `ResourcesPath` to "Resources", the French resource file associated with the `Views/Home/About.cshtml` view could be either of the following:

* Resources/Views/Home/About.fr.resx

* Resources/Views.Home.About.fr.resx

If you don't use the `ResourcesPath` option, the *.resx* file for a view would be located in the same folder as the view.

## RootNamespaceAttribute 

The [Microsoft.Extensions.Localization.RootNamespaceAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.RootNamespaceAttribute) attribute provides the root namespace of an assembly when the root namespace of an assembly is different than the assembly name. 

> **Warning:**
> This can occur when a project's name is not a valid .NET identifier. For instance `my-project-name.csproj` will use the root namespace `my_project_name` and the assembly name `my-project-name` leading to this error. 

If the root namespace of an assembly is different than the assembly name:

* Localization does not work by default.
* Localization fails due to the way resources are searched for within the assembly. `RootNamespace` is a build-time value which is not available to the executing process. 

If the `RootNamespace` is different from the `AssemblyName`, include the following in `AssemblyInfo.cs` (with parameter values replaced with the actual values):

```csharp
using System.Reflection;
using Microsoft.Extensions.Localization;

[assembly: ResourceLocation("Resource Folder Name")]
[assembly: RootNamespace("App Root Namespace")]
```

The preceding code enables the successful resolution of resx files.

## Culture fallback behavior

When searching for a resource, localization engages in "culture fallback". Starting from the requested culture, if not found, it reverts to the parent culture of that culture. As an aside, the [System.Globalization.CultureInfo.Parent%2A](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Parent%252A) property represents the parent culture. This usually (but not always) means removing the national signifier from the language-and-culture code. For example, the dialect of Spanish spoken in Mexico is "es-MX". It has the parent "es"&mdash;Spanish non-specific to any country.

Imagine your site receives a request for a "Welcome" resource using culture "fr-CA". The localization system looks for the following resources, in order, and selects the first match:

* *Welcome.fr-CA.resx*
* *Welcome.fr.resx*
* *Welcome.resx* (if the `NeutralResourcesLanguage` is "fr-CA")

As an example, if you remove the ".fr" culture designator and you have the culture set to French, the default resource file is read and strings are localized. The Resource manager designates a default or fallback resource for when nothing meets your requested culture. If you want to just return the key when missing a resource for the requested culture you must not have a default resource file.

## Generate resource files with Visual Studio

If you create a resource file in Visual Studio without a culture in the file name (for example, *Welcome.resx*), Visual Studio will create a C# class with a property for each string. That's usually not what you want with ASP.NET Core. You typically don't have a default *.resx* resource file (a *.resx* file without the culture name). We suggest you create the *.resx* file with a culture name (for example *Welcome.fr.resx*). When you create a *.resx* file with a culture name, Visual Studio won't generate the class file.

### Add other cultures

Each language and culture combination (other than the default language) requires a unique resource file. You create resource files for different cultures and locales by creating new resource files in which the language codes are part of the file name (for example, **en-us**, **fr-ca**, and **en-gb**). These codes are placed between the file name and the *.resx* file extension, as in *Welcome.es-MX.resx* (Spanish/Mexico).

## Next steps

Localizing an app also involves the following tasks:

* [Make the app's content localizable](make-content-localizable.md).
* [Implement a strategy to select the language/culture for each request](select-language-culture.md)

## Additional resources

* [Url culture provider using middleware as filters in ASP.NET Core](https://andrewlock.net/url-culture-provider-using-middleware-as-mvc-filter-in-asp-net-core-1-1-0/)
* [Applying the RouteDataRequest CultureProvider globally with middleware as filters](https://andrewlock.net/applying-the-routedatarequest-cultureprovider-globally-with-middleware-as-filters/)
* [fundamentals/localization](../localization.md)
* [fundamentals/localization/make-content-localizable](make-content-localizable.md)
* [fundamentals/localization/select-language-culture](select-language-culture.md)
* [fundamentals/troubleshoot-aspnet-core-localization](../troubleshoot-aspnet-core-localization.md)
* [Globalizing and localizing .NET applications](https://learn.microsoft.com/dotnet/standard/globalization-localization/index)
* [Localization.StarterWeb project](https://github.com/aspnet/Entropy/tree/master/samples/Localization.StarterWeb) used in the article.
* [Resources in .resx Files](https://learn.microsoft.com/dotnet/framework/resources/working-with-resx-files-programmatically)
* [Localization & Generics](http://hishambinateya.com/localization-and-generics)



**Applies to: \= aspnetcore-5.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT), [Damien Bowden](https://github.com/damienbod), [Bart Calixto](https://twitter.com/bartmax), [Nadeem Afana](https://afana.me/), and [Hisham Bin Ateya](https://twitter.com/hishambinateya)

One task for localizing an app is to provide localized strings in resource files. This article is about working with resource files.

## `SupportedCultures` and `SupportedUICultures`

ASP.NET Core has two collections of culture values, `SupportedCultures` and `SupportedUICultures`. The [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object for `SupportedCultures` determines the results of culture-dependent functions, such as date, time, number, and currency formatting. `SupportedCultures` also determines the sorting order of text, casing conventions, and string comparisons. See [System.StringComparer.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparer.CurrentCulture) for more info on how the server gets the culture. The `SupportedUICultures` determines which translated strings (from *.resx* files) are looked up by the [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager). The `ResourceManager` simply looks up culture-specific strings that are determined by `CurrentUICulture`. Every thread in .NET has `CurrentCulture` and `CurrentUICulture` objects. ASP.NET Core inspects these values when rendering culture-dependent functions. For example, if the current thread's culture is set to "en-US" (English, United States), `DateTime.Now.ToLongDateString()` displays "Thursday, February 18, 2016", but if `CurrentCulture` is set to "es-ES" (Spanish, Spain) the output will be "jueves, 18 de febrero de 2016".

## Resource files

A resource file is a useful mechanism for separating localizable strings from code. Translated strings for the non-default language are isolated in *.resx* resource files. For example, you might want to create a Spanish resource file named *Welcome.es.resx* containing translated strings. "es" is the language code for Spanish. To create this resource file in Visual Studio:

1. In **Solution Explorer**, right click on the folder that will contain the resource file, and then select **Add** > **New Item**.

   Nested contextual menu: In Solution Explorer, a contextual menu is open for Resources. A second contextual menu is open for Add showing the New Item command highlighted.

1. In the **Search installed templates** box, enter "resource" and name the file.

   Add New Item dialog

1. Enter the key value (native string) in the **Name** column and the translated string in the **Value** column.

   Welcome.es.resx file (the Welcome resource file for Spanish) with the word Hello in the Name column and the word Hola (Hello in Spanish) in the Value column

   Visual Studio shows the *Welcome.es.resx* file.

   Solution Explorer showing the Welcome Spanish (es) resource file

## Resource file naming

Resources are named for the full type name of their class minus the assembly name. For example, a French resource in a project whose main assembly is `LocalizationWebsite.Web.dll` for the class `LocalizationWebsite.Web.Startup` would be named *Startup.fr.resx*. A resource for the class `LocalizationWebsite.Web.Controllers.HomeController` would be named *Controllers.HomeController.fr.resx*. If your targeted class's namespace isn't the same as the assembly name you will need the full type name. For example, in the sample project a resource for the type `ExtraNamespace.Tools` would be named *ExtraNamespace.Tools.fr.resx*.

In the sample project, the `ConfigureServices` method sets the `ResourcesPath` to "Resources", so the project relative path for the home controller's French resource file is *Resources/Controllers.HomeController.fr.resx*. Alternatively, you can use folders to organize resource files. For the home controller, the path would be *Resources/Controllers/HomeController.fr.resx*. If you don't use the `ResourcesPath` option, the *.resx* file would go in the project base directory. The resource file for `HomeController` would be named *Controllers.HomeController.fr.resx*. The choice of using the dot or path naming convention depends on how you want to organize your resource files.

| Resource name | Dot or path naming |
| --- | --- |
| Resources/Controllers.HomeController.fr.resx | Dot |
| Resources/Controllers/HomeController.fr.resx | Path |

Resource files using `@inject IViewLocalizer` in Razor views follow a similar pattern. The resource file for a view can be named using either dot naming or path naming. Razor view resource files mimic the path of their associated view file. Assuming we set the `ResourcesPath` to "Resources", the French resource file associated with the `Views/Home/About.cshtml` view could be either of the following:

* Resources/Views/Home/About.fr.resx

* Resources/Views.Home.About.fr.resx

If you don't use the `ResourcesPath` option, the *.resx* file for a view would be located in the same folder as the view.

## RootNamespaceAttribute 

The [Microsoft.Extensions.Localization.RootNamespaceAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.RootNamespaceAttribute) attribute provides the root namespace of an assembly when the root namespace of an assembly is different than the assembly name. 

> **Warning:**
> This can occur when a project's name is not a valid .NET identifier. For instance `my-project-name.csproj` will use the root namespace `my_project_name` and the assembly name `my-project-name` leading to this error. 

If the root namespace of an assembly is different than the assembly name:

* Localization does not work by default.
* Localization fails due to the way resources are searched for within the assembly. `RootNamespace` is a build-time value which is not available to the executing process. 

If the `RootNamespace` is different from the `AssemblyName`, include the following in `AssemblyInfo.cs` (with parameter values replaced with the actual values):

```csharp
using System.Reflection;
using Microsoft.Extensions.Localization;

[assembly: ResourceLocation("Resource Folder Name")]
[assembly: RootNamespace("App Root Namespace")]
```

The preceding code enables the successful resolution of resx files.

## Culture fallback behavior

When searching for a resource, localization engages in "culture fallback". Starting from the requested culture, if not found, it reverts to the parent culture of that culture. As an aside, the [System.Globalization.CultureInfo.Parent%2A](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Parent%252A) property represents the parent culture. This usually (but not always) means removing the national signifier from the language-and-culture code. For example, the dialect of Spanish spoken in Mexico is "es-MX". It has the parent "es"&mdash;Spanish non-specific to any country.

Imagine your site receives a request for a "Welcome" resource using culture "fr-CA". The localization system looks for the following resources, in order, and selects the first match:

* *Welcome.fr-CA.resx*
* *Welcome.fr.resx*
* *Welcome.resx* (if the `NeutralResourcesLanguage` is "fr-CA")

As an example, if you remove the ".fr" culture designator and you have the culture set to French, the default resource file is read and strings are localized. The Resource manager designates a default or fallback resource for when nothing meets your requested culture. If you want to just return the key when missing a resource for the requested culture you must not have a default resource file.

## Generate resource files with Visual Studio

If you create a resource file in Visual Studio without a culture in the file name (for example, *Welcome.resx*), Visual Studio will create a C# class with a property for each string. That's usually not what you want with ASP.NET Core. You typically don't have a default *.resx* resource file (a *.resx* file without the culture name). We suggest you create the *.resx* file with a culture name (for example *Welcome.fr.resx*). When you create a *.resx* file with a culture name, Visual Studio won't generate the class file.

### Add other cultures

Each language and culture combination (other than the default language) requires a unique resource file. You create resource files for different cultures and locales by creating new resource files in which the language codes are part of the file name (for example, **en-us**, **fr-ca**, and **en-gb**). These codes are placed between the file name and the *.resx* file extension, as in *Welcome.es-MX.resx* (Spanish/Mexico).

## Next steps

Localizing an app also involves the following tasks:

* [Make the app's content localizable](make-content-localizable.md).
* [Implement a strategy to select the language/culture for each request](select-language-culture.md)

## Additional resources

* [fundamentals/localization](../localization.md)
* [fundamentals/localization/make-content-localizable](make-content-localizable.md)
* [fundamentals/localization/select-language-culture](select-language-culture.md)
* [fundamentals/troubleshoot-aspnet-core-localization](../troubleshoot-aspnet-core-localization.md)
* [Globalizing and localizing .NET applications](https://learn.microsoft.com/dotnet/standard/globalization-localization/index)
* [Localization.StarterWeb project](https://github.com/aspnet/Entropy/tree/master/samples/Localization.StarterWeb) used in the article.
* [Resources in .resx Files](https://learn.microsoft.com/dotnet/framework/resources/working-with-resx-files-programmatically)
* [Localization & Generics](http://hishambinateya.com/localization-and-generics)
