---
title: ASP.NET Core Blazor globalization and localization
ai-usage: ai-assisted
author: guardrex
description: Learn how to render globalized and localized content to users in different cultures and languages.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 08/26/2026
uid: blazor/globalization-localization
---
# ASP.NET Core Blazor globalization and localization

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


This article explains how to render globalized and localized content to users in different cultures and languages.

## Globalization and localization

For [globalization](https://learn.microsoft.com/dotnet/core/extensions/globalization), Blazor provides number and date formatting. For [localization](https://learn.microsoft.com/dotnet/core/extensions/localization), Blazor renders content using the [.NET Resources system](https://learn.microsoft.com/dotnet/framework/resources/).

A limited set of ASP.NET Core's localization features are supported:

<span aria-hidden="true">✔️</span><span class="visually-hidden">Supported:</span> [Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer) and [Microsoft.Extensions.Localization.IStringLocalizer%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer%25601) are supported in Blazor apps.

<span aria-hidden="true">❌</span><span class="visually-hidden">Not supported:</span> [Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Localization.IHtmlLocalizer) and [Microsoft.AspNetCore.Mvc.Localization.IViewLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Localization.IViewLocalizer) are ASP.NET Core MVC features and *not supported* in Blazor apps.

**Applies to: < aspnetcore-11.0**

For Blazor apps, localization of validation messages for [forms validation using data annotations](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/\[blazor/forms/validation#data-annotations-validator-component-and-custom-validation]\(https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation\)) is supported if [System.ComponentModel.DataAnnotations.DisplayAttribute.ResourceType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute.ResourceType) and [System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessageResourceType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessageResourceType) are implemented.



**Applies to: \>= aspnetcore-11.0**

For Blazor apps, localized validation messages for [forms validation using data annotations](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/\[blazor/forms/validation#data-annotations-validator-component-and-custom-validation]\(https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation\)) are supported through two paths:

* The static resource path using [System.ComponentModel.DataAnnotations.DisplayAttribute.ResourceType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute.ResourceType) for display names and [System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessageResourceType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute.ErrorMessageResourceType) for localized error messages. This approach is supported in every release.
* [Microsoft.Extensions.Validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation), which resolves validation messages and display names through [Microsoft.Extensions.Localization.IStringLocalizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer). Available for Blazor apps that enable the validation pipeline with `AddValidation()`. For details, see [fundamentals/validation#localize-validation-messages](https://learn.microsoft.com/search/?terms=fundamentals%2Fvalidation%23localize-validation-messages).



This article describes how to use Blazor's globalization and localization features based on:

* The [`Accept-Language` header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language), which is set by the browser based on a user's language preferences in browser settings.
* A culture set by the app not based on the value of the [`Accept-Language` header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language). The setting can be static for all users or dynamic based on app logic. When the setting is based on the user's preference, the setting is usually saved for reload on future visits.

For additional general information, see the following resources:

* [fundamentals/localization](../fundamentals/localization.md)
* [.NET Fundamentals: Globalization](https://learn.microsoft.com/dotnet/core/extensions/globalization)
* [.NET Fundamentals: Localization](https://learn.microsoft.com/dotnet/core/extensions/localization)

Often, the terms *language* and *culture* are used interchangeably when dealing with globalization and localization concepts.

In this article, *language* refers to selections made by a user in their browser's settings. The user's language selections are submitted in browser requests in the [`Accept-Language` header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language). Browser settings usually use the word "language" in the UI.

*Culture* pertains to members of .NET and Blazor API. For example, a user's request can include the [`Accept-Language` header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language) specifying a *language* from the user's perspective, but the app ultimately sets the [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) ("culture") property from the language that the user requested. API usually uses the word "culture" in its member names.

The guidance in this article doesn't cover setting the page's HTML language attribute ([`<html lang="...">`](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang)), which accessibility tools use. You can set the value statically by assigning a language to the `lang` attribute of the `<html>` tag or to `document.documentElement.lang` in JavaScript. You can dynamically set the value of `document.documentElement.lang` with [JS interop](javascript-interoperability/index.md).

> **Note:**
> The code examples in this article adopt [nullable reference types (NRTs) and .NET compiler null-state static analysis](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23nullable-reference-types-nrts-and-net-compiler-null-state-static-analysis), which are supported in ASP.NET Core in .NET 6 or later. When targeting .NET 5 or earlier, remove the null type designation (`?`) from the article's examples.

## Globalization

The [`@bind`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23bind) attribute directive applies formats and parses values for display based on the user's first [preferred language](https://developer.mozilla.org/docs/Web/API/NavigatorLanguage/languages) that the app supports. [`@bind`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23bind) supports the [`@bind:culture`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23bindculture) parameter to provide a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) for parsing and formatting a value.

The current culture can be accessed from the [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) property.

[System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) is used for the following field types (`<input type="{TYPE}" />`, where the `{TYPE}` placeholder is the type):

* `date`
* `number`

The preceding field types:

* Are displayed using their appropriate browser-based formatting rules.
* Can't contain free-form text.
* Provide user interaction characteristics based on the browser's implementation.

Blazor provides built-in support to render values in the current culture. Therefore, specifying a culture with [`@bind:culture`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23bindculture) isn't recommended when using the `date` and `number` field types.

The following field types have specific formatting requirements and aren't supported by all of the major browsers, so they aren't supported by Blazor:

* `datetime-local`
* `month`
* `week`

For current browser support of the preceding types, see [Can I use](https://caniuse.com).

By default, Blazor loads a subset of globalization data that contains the app's culture. To load all globalization data, set `<BlazorWebAssemblyLoadAllGlobalizationData>` to `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```

## .NET globalization and International Components for Unicode (ICU) support (Blazor WebAssembly)

**Applies to: \>= aspnetcore-8.0**

Blazor WebAssembly uses a reduced globalization API and set of built-in International Components for Unicode (ICU) locales. 

In WebAssembly (Wasm) apps, when globalization invariant mode is disabled, an ICU data file is loaded. There are four basic types of these files:

* `icudt.dat`: Full data
* `icudt_EFIGS.dat`: Data for locales: `en-*`, `fr-FR`, `es-ES`, `it-IT`, and `de-DE`.
* `icudt_CJK.dat`: Data for locales: `en-*`, `ja`, `ko`, and `zh-*`.
* `icudt_no_CJK.dat`: Data for all locales from `icudt.dat`, excluding `ja`, `ko`, and `zh-*`.

Specify one file to load with the `<BlazorIcuDataFileName>` MSBuild property in the app's project file (`.csproj`). The following example loads the `icudt_no_CJK.dat` file:

```xml
<PropertyGroup>
  <BlazorIcuDataFileName>icudt_no_CJK.dat</BlazorIcuDataFileName>
</PropertyGroup>
```

`<BlazorIcuDataFileName>` only accepts a single file. The file can be a custom file created by the developer. To create a custom ICU file, see [WASM Globalization Icu: Custom ICU](https://github.com/dotnet/runtime/blob/main/docs/design/features/globalization-icu-wasm.md#custom-icu).

If a file isn't specified with `<BlazorIcuDataFileName>`, the app's culture is checked, and the corresponding ICU file is loaded for its culture. For example, the `en-US` culture results in loading the `icudt_EFIGS.dat` file. For `zh-CN`, the `icudt_CJK.dat` file is used.

For more information, see [.NET globalization and ICU: ICU on WebAssembly](https://learn.microsoft.com/dotnet/core/extensions/globalization-icu#icu-on-webassembly).



**Applies to: < aspnetcore-8.0**

Blazor WebAssembly uses a reduced globalization API and set of built-in International Components for Unicode (ICU) locales. For more information, see [.NET globalization and ICU: ICU on WebAssembly](https://learn.microsoft.com/dotnet/core/extensions/globalization-icu#icu-on-webassembly).

Loading a custom subset of locales in a Blazor WebAssembly app is supported in .NET 8 or later. For more information, access this section for a .NET 8 or later version of this article.



## Invariant globalization

*This section only applies to client-side Blazor scenarios.*

If the app doesn't require localization, configure the app to support the invariant culture, which is generally based on United States English (`en-US`). Using invariant globalization reduces the app's download size and results in faster app startup. Set the `InvariantGlobalization` property to `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <InvariantGlobalization>true</InvariantGlobalization>
</PropertyGroup>
```

Alternatively, configure invariant globalization with the following approaches:

* In `runtimeconfig.json`:

  ```json
  {
    "runtimeOptions": {
      "configProperties": {
        "System.Globalization.Invariant": true
      }
    }
  }
  ```

* With an environment variable:

  * Key: `DOTNET_SYSTEM_GLOBALIZATION_INVARIANT`
  * Value: `true` or `1`

For more information, see [Runtime configuration options for globalization (.NET documentation)](https://learn.microsoft.com/dotnet/core/run-time-config/globalization).

**Applies to: \>= aspnetcore-8.0**

## Timezone information

*This section only applies to client-side Blazor scenarios.*

Adopting [invariant globalization](#invariant-globalization) only results in using non-localized timezone names. To trim timezone code and data, which reduces the app's download size and results in faster app startup, apply the `<InvariantTimezone>` MSBuild property with a value of `true` in the app's project file:

```xml
<PropertyGroup>
  <InvariantTimezone>true</InvariantTimezone>
</PropertyGroup>
```

> **Note:**
> [`<BlazorEnableTimeZoneSupport>`](https://learn.microsoft.com/search/?terms=blazor%2Fperformance%2Fapp-download-size%23disable-unused-features) overrides an earlier `<InvariantTimezone>` setting. We recommend removing the `<BlazorEnableTimeZoneSupport>` setting.



**Applies to: < aspnetcore-8.0**

A data file is included to make timezone information correct. If the app doesn't require this feature, consider disabling it by setting the `<BlazorEnableTimeZoneSupport>` MSBuild property to `false` in the app's project file:

```xml
<PropertyGroup>
  <BlazorEnableTimeZoneSupport>false</BlazorEnableTimeZoneSupport>
</PropertyGroup>
```



**Applies to: \>= aspnetcore-11.0**

<!-- UPDATE 11.0 - API Browser cross-link -->

## Client-side prerendering in a Blazor Web App preserves the server's culture

By default, client-side prerendering on the server (`.Client` project in a Blazor Web App) persists the server's [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) and [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture) into component state and applies them on the client before satellite assemblies load.

Apps that require the client to choose a culture independently of the server can opt out with `WebAssemblyComponentsOptions.UseCultureFromServer` in the Blazor Web App's `Program` file:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents(options =>
    {
        options.UseCultureFromServer = false;
    });
```



## Demonstration component

The following `CultureExample1` component can be used to demonstrate Blazor globalization and localization concepts covered by this article.

`CultureExample1.razor`:

```razor
@page "/culture-example-1"
@using System.Globalization

<h1>Culture Example 1</h1>

<ul>
    <li><b>CurrentCulture</b>: @CultureInfo.CurrentCulture</li>
    <li><b>CurrentUICulture</b>: @CultureInfo.CurrentUICulture</li>
</ul>

<h2>Rendered values</h2>

<ul>
    <li><b>Date</b>: @dt</li>
    <li><b>Number</b>: @number.ToString("N2")</li>
</ul>

<h2><code>&lt;input&gt;</code> elements that don't set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.CurrentCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input @bind="number" /></label></li>
</ul>

<h2><code>&lt;input&gt;</code> elements that set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.InvariantCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input type="date" @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input type="number" @bind="number" /></label></li>
</ul>

@code {
    private DateTime dt = DateTime.Now;
    private double number = 1999.69;
}
```

The number string format (`N2`) in the preceding example (`.ToString("N2")`) is a [standard .NET numeric format specifier](https://learn.microsoft.com/dotnet/standard/base-types/standard-numeric-format-strings#numeric-format-specifier-n). The `N2` format is supported for all numeric types, includes a group separator, and renders up to two decimal places.

Optionally, add a menu item to the navigation in the `NavMenu` component (`NavMenu.razor`) for the `CultureExample1` component.

## Dynamically set the culture from the `Accept-Language` header

*This section applies to server-side and client-side Blazor apps.*

Add the [`Microsoft.Extensions.Localization` package](https://www.nuget.org/packages/Microsoft.Extensions.Localization) to the app.

The [`Accept-Language` header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language) is set by the browser and controlled by the user's language preferences in browser settings. In browser settings, a user sets one or more preferred languages in order of preference. The order of preference is used by the browser to set quality values (`q`, 0-1) for each language in the header. The following example specifies United States English, English, and Costa Rican Spanish with a preference for United States English or English:

**Accept-Language**: en-US,en;q=0.9,es-CR;q=0.8

The app's culture is set by matching the first requested language that matches a supported culture of the app.

**Applies to: \>= aspnetcore-5.0**

In ***client-side development***, set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the client-side app's project file (`.csproj`):

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```



**Applies to: < aspnetcore-5.0**

In ***client-side development***, dynamically setting the culture from the `Accept-Language` header isn't supported.



> **Note:**
> If the app's specification requires limiting the supported cultures to an explicit list, see the [Dynamically set the client-side culture by user preference](#dynamically-set-the-client-side-culture-by-user-preference) section of this article.

Apps are localized using [localization middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Flocalization%23localization-middleware). Add localization services to the app with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A).

Add the following line to the `Program` file where services are registered:

```csharp
builder.Services.AddLocalization();
```

**Applies to: \>= aspnetcore-8.0**

In ***server-side development***, specify the app's supported cultures before any middleware that might check the request culture. Generally, place localization middleware immediately before calling [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A). The following example configures supported cultures for United States English and Costa Rican Spanish:



**Applies to: < aspnetcore-8.0**

In ***server-side development***, specify the app's supported cultures immediately after routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) is added to the processing pipeline. The following example configures supported cultures for United States English and Costa Rican Spanish using the following API:

* [Microsoft.AspNetCore.Builder.RequestLocalizationOptions.AddSupportedCultures%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RequestLocalizationOptions.AddSupportedCultures%252A) adds the set of the supported cultures for *globalization* (date, number, and currency formatting).
* [Microsoft.AspNetCore.Builder.RequestLocalizationOptions.AddSupportedUICultures%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RequestLocalizationOptions.AddSupportedUICultures%252A) adds the set of the supported UI cultures *for localization* (translated UI strings for rendering content).



```csharp
app.UseRequestLocalization(new RequestLocalizationOptions()
    .AddSupportedCultures(new[] { "en-US", "es-CR" })
    .AddSupportedUICultures(new[] { "en-US", "es-CR" }));
```

In the preceding example, the same supported formatting cultures and UI cultures are specified in a narrow case where the app is only used in the United States and Costa Rica. Alternatively, an app can use a broader set of cultures for date, number, and currency formatting but only provide localized content for the United States and Costa Rica, as the following example demonstrates:

```csharp
var uiCultures = new[] { "en-US", "es-CR" };

var formattingCultures = CultureInfo
    .GetCultures(CultureTypes.SpecificCultures)
    .Select(c => c.Name)
    .ToArray();

var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(uiCultures[0])
    .AddSupportedCultures(formattingCultures)
    .AddSupportedUICultures(uiCultures);

app.UseRequestLocalization(localizationOptions);
```

In the preceding example, [`CultureTypes.SpecificCultures`](https://learn.microsoft.com/search/?terms=System.Globalization.CultureTypes) returns only cultures that are specific to a country or region—such as `en-US` or `fr-FR`—which come with full, concrete globalization data (for dates, numbers, calendars, and other cultural UI) that .NET can use for accurate formatting and parsing. Neutral cultures, such as `en` or `fr`, may not have complete globalization data, so they aren't included in this list.

For information on ordering the localization middleware in the middleware pipeline of the `Program` file, see [fundamentals/middleware/index#middleware-order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).

Use the `CultureExample1` component shown in the [Demonstration component](#demonstration-component) section to study how globalization works. Issue a request with United States English (`en-US`). Switch to Costa Rican Spanish (`es-CR`) in the browser's language settings. Request the webpage again.

When the culture is United States English (`en-US`), the rendered component uses month/day date formatting (`6/7`), 12-hour time (`AM`/`PM`), and comma separators in numbers with a dot for the decimal value (`1,999.69`):

* **Date**: 6/7/2021 6:45:22 AM
* **Number**: 1,999.69

When the culture is Costa Rican Spanish (`es-CR`), the rendered component uses day/month date formatting (`7/6`), 24-hour time, and period separators in numbers with a comma for the decimal value (`1.999,69`):

* **Date**: 7/6/2021 6:49:38
* **Number**: 1.999,69

## Statically set the client-side culture

**Applies to: \>= aspnetcore-8.0**

*This section applies to Blazor WebAssembly apps and Blazor Web App components that adopt the Interactive WebAssembly render mode.*



**Applies to: < aspnetcore-8.0**

*This section applies to Blazor WebAssembly apps.*



**Applies to: \>= aspnetcore-5.0**

Set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```



**Applies to: < aspnetcore-5.0**

The Intermediate Language (IL) Linker configuration for client-side rendering strips out internationalization information except for locales explicitly requested. For more information, see [blazor/host-and-deploy/configure-linker#configure-the-linker-for-internationalization](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fconfigure-linker%23configure-the-linker-for-internationalization).



The app's culture can be set in JavaScript when Blazor starts with the `applicationCulture` Blazor start option. The following example configures the app to launch using the United States English (`en-US`) culture.

Prevent Blazor autostart by adding `autostart="false"` to the [Blazor `<script>` tag](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script):

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).

Add the following `<script>` block after the [Blazor `<script>` tag](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script) and before the closing `</body>` tag:

**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```html
<script>
  Blazor.start({
    webAssembly: {
      applicationCulture: 'en-US'
    }
  });
</script>
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Standalone Blazor WebAssembly:



**Applies to: < aspnetcore-11.0**

```html
<script>
  Blazor.start({
    applicationCulture: 'en-US'
  });
</script>
```



The value for `applicationCulture` must conform to the [BCP-47 language tag format](https://www.rfc-editor.org/info/bcp47). For more information on Blazor startup, see [blazor/fundamentals/startup](fundamentals/startup.md).

An alternative to setting the culture Blazor's start option is to set the culture in C# code. Set [System.Globalization.CultureInfo.DefaultThreadCurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentCulture) and [System.Globalization.CultureInfo.DefaultThreadCurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentUICulture) in the `Program` file to the same culture.

Add the [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization) namespace to the `Program` file:

```csharp
using System.Globalization;
```

Add the culture settings before the line that builds and runs the [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder) (`await builder.Build().RunAsync();`):

```csharp
CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");
CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("en-US");
```

**Applies to: < aspnetcore-10.0**

> **Note:**
> In .NET 9 or earlier, standalone Blazor WebAssembly apps load UI globalization resources based on [System.Globalization.CultureInfo.DefaultThreadCurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentCulture). If you want to additionally load globalization data for your localization culture defined by [System.Globalization.CultureInfo.DefaultThreadCurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentUICulture), [upgrade the app to .NET 10 or later](../migration/index.md).



Use the `CultureExample1` component shown in the [Demonstration component](#demonstration-component) section to study how globalization works. Issue a request with United States English (`en-US`). Switch to Costa Rican Spanish (`es-CR`) in the browser's language settings. Request the webpage again. When the requested language is Costa Rican Spanish, the app's culture remains United States English (`en-US`).

## Statically set the server-side culture

**Applies to: \>= aspnetcore-8.0**

*This section applies to Blazor Web App components that adopt the Interactive Server render mode and Blazor Server apps.*



**Applies to: < aspnetcore-8.0**

*This section applies to Blazor Server apps.*



**Applies to: \>= aspnetcore-6.0**

Server-side apps are localized using [localization middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Flocalization%23localization-middleware). Add localization services to the app with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A).

In the `Program` file:

```csharp
builder.Services.AddLocalization();
```



**Applies to: \>= aspnetcore-8.0**

Specify the static culture in the `Program` file before any middleware that might check the request culture. Generally, place localization middleware immediately before [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A). The following example configures United States English:



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

Specify the static culture in the `Program` file immediately after routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) is added to the processing pipeline. The following example configures United States English:



**Applies to: \>= aspnetcore-6.0**

```csharp
app.UseRequestLocalization("en-US");
```

The culture value for [Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%252A) must conform to the [BCP-47 language tag format](https://www.rfc-editor.org/info/bcp47).

For information on ordering the localization middleware in the middleware pipeline of the `Program` file, see [fundamentals/middleware/index#middleware-order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).



**Applies to: < aspnetcore-6.0**

Server-side apps are localized using [localization middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Flocalization%23localization-middleware). Add localization services to the app with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A).

In `Startup.ConfigureServices` (`Startup.cs`):

```csharp
services.AddLocalization();
```

Specify the static culture in `Startup.Configure` (`Startup.cs`) immediately after routing middleware is added to the processing pipeline. The following example configures United States English:

```csharp
app.UseRequestLocalization("en-US");
```

The culture value for [Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%252A) must conform to the [BCP-47 language tag format](https://www.rfc-editor.org/info/bcp47).

For information on ordering the localization middleware in the middleware pipeline of `Startup.Configure`, see [fundamentals/middleware/index#middleware-order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).



Use the `CultureExample1` component shown in the [Demonstration component](#demonstration-component) section to study how globalization works. Issue a request with United States English (`en-US`). Switch to Costa Rican Spanish (`es-CR`) in the browser's language settings. Request the webpage again. When the requested language is Costa Rican Spanish, the app's culture remains United States English (`en-US`).

## Dynamically set the client-side culture by user preference

**Applies to: \>= aspnetcore-8.0**

*This section applies to Blazor WebAssembly apps and Blazor Web App components that adopt the Interactive WebAssembly render mode.*



**Applies to: < aspnetcore-8.0**

*This section applies to Blazor WebAssembly apps.*



Examples of locations where an app might store a user's preference include in [browser local storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) (common for client-side scenarios), in a localization cookie or database (common for server-side scenarios), or in an external service attached to an external database and accessed by a [web API](call-web-api.md). The following example demonstrates how to use browser local storage.

Add the [`Microsoft.Extensions.Localization` package](https://www.nuget.org/packages/Microsoft.Extensions.Localization) to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


**Applies to: \>= aspnetcore-5.0**

Set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the project file:

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```



The app's culture for client-side rendering is set using the Blazor framework's API. A user's culture selection can be persisted in browser local storage.

Provide JS functions after the [Blazor `<script>` tag](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script) to get and set the user's culture selection with browser local storage:

```html
<script>
  window.blazorCulture = {
    get: () => window.localStorage['BlazorCulture'],
    set: (value) => window.localStorage['BlazorCulture'] = value
  };
</script>
```

**Applies to: \>= aspnetcore-5.0**

> **Note:**
> The preceding example pollutes the client with global functions. For a better approach in production apps, see [JavaScript isolation in JavaScript modules](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23javascript-isolation-in-javascript-modules).



Add the namespaces for [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization) and [Microsoft.JSInterop](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop) to the top of the `Program` file:

```csharp
using System.Globalization;
using Microsoft.JSInterop;
```

Remove the following line:

```diff
- await builder.Build().RunAsync();
```

Replace the preceding line with the following code. The code adds Blazor's localization service to the app's service collection with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A) and uses [JS interop](javascript-interoperability/call-javascript-from-dotnet.md) to call into JS and retrieve the user's culture selection from local storage. If local storage doesn't contain a culture for the user, the code sets a default value of United States English (`en-US`).

```csharp
builder.Services.AddLocalization();

var host = builder.Build();

const string defaultCulture = "en-US";

var js = host.Services.GetRequiredService<IJSRuntime>();
var result = await js.InvokeAsync<string>("blazorCulture.get");
var culture = CultureInfo.GetCultureInfo(result ?? defaultCulture);

if (result == null)
{
    await js.InvokeVoidAsync("blazorCulture.set", defaultCulture);
}

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

await host.RunAsync();
```

**Applies to: < aspnetcore-10.0**

> **Note:**
> In .NET 9 or earlier, standalone Blazor WebAssembly apps load UI globalization resources based on [System.Globalization.CultureInfo.DefaultThreadCurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentCulture). If you want to additionally load globalization data for your localization culture defined by [System.Globalization.CultureInfo.DefaultThreadCurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentUICulture), [upgrade the app to .NET 10 or later](../migration/index.md).



The following `CultureSelector` component shows how to perform the following actions:

* Set the user's culture selection into browser local storage via JS interop.
* Reload the component that they requested (`forceLoad: true`), which uses the updated culture.

`CultureSelector.razor`:

**Applies to: \>= aspnetcore-7.0**

```razor
@using System.Globalization
@inject IJSRuntime JS
@inject NavigationManager Navigation

<p>
    <label>
        Select your locale:
        <select @bind="selectedCulture" @bind:after="ApplySelectedCultureAsync">
            @foreach (var culture in supportedCultures)
            {
                <option value="@culture">@culture.DisplayName</option>
            }
        </select>
    </label>
</p>

@code
{
    private CultureInfo[] supportedCultures = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("es-CR"),
    };

    private CultureInfo? selectedCulture;

    protected override void OnInitialized()
    {
        selectedCulture = CultureInfo.CurrentCulture;
    }

    private async Task ApplySelectedCultureAsync()
    {
        if (selectedCulture is not null &&
            CultureInfo.CurrentCulture != selectedCulture)
        {
            await JS.InvokeVoidAsync("blazorCulture.set", selectedCulture.Name);

            Navigation.NavigateTo(Navigation.Uri, forceLoad: true);
        }
    }
}
```



**Applies to: < aspnetcore-7.0**

```razor
@using System.Globalization
@inject IJSRuntime JS
@inject NavigationManager Navigation

<p>
    <label>
        Select your locale:
        <select value="@selectedCulture" @onchange="HandleSelectedCultureChanged">
            @foreach (var culture in supportedCultures)
            {
                <option value="@culture">@culture.DisplayName</option>
            }
        </select>
    </label>
</p>

@code
{
    private CultureInfo[] supportedCultures = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("es-CR"),
    };

    private CultureInfo? selectedCulture;

    protected override void OnInitialized()
    {
        selectedCulture = CultureInfo.CurrentCulture;
    }

    private async Task HandleSelectedCultureChanged(ChangeEventArgs args)
    {
        selectedCulture = CultureInfo.GetCultureInfo((string)args.Value!);

        if (selectedCulture is not null &&
            CultureInfo.CurrentCulture != selectedCulture)
        {
            await JS.InvokeVoidAsync("blazorCulture.set", selectedCulture.Name);

            Navigation.NavigateTo(Navigation.Uri, forceLoad: true);
        }
    }
}
```



> **Note:**
> For more information on [Microsoft.JSInterop.IJSInProcessRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessRuntime), see [blazor/js-interop/call-javascript-from-dotnet#invoke-javascript-functions-without-reading-a-returned-value-invokevoidasync](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23invoke-javascript-functions-without-reading-a-returned-value-invokevoidasync).

In the header markup of the `MainLayout` component (`MainLayout.razor`), add the `CultureSelector` component:

```razor
<CultureSelector />
```

Use the `CultureExample1` component shown in the [Demonstration component](#demonstration-component) section to study how the preceding example works.

## Dynamically set the server-side culture by user preference

**Applies to: \>= aspnetcore-8.0**

*This section applies to Blazor Web Apps adopting the global Interactive Server render mode and Blazor Server apps. For guidance that covers a Blazor Web App adopting per-page/component interactivity, see the [Dynamically set the culture in a Blazor Web App by user preference](#dynamically-set-the-culture-in-a-blazor-web-app-by-user-preference) section.*



**Applies to: < aspnetcore-8.0**

*This section applies to Blazor Server apps.*



Examples of locations where an app might store a user's preference include in [browser local storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) (common for client-side scenarios), in a localization cookie or database (common for server-side scenarios), or in an external service attached to an external database and accessed by a [web API](call-web-api.md). The following example demonstrates how to use a localization cookie.

Add the [`Microsoft.Extensions.Localization` package](https://www.nuget.org/packages/Microsoft.Extensions.Localization) to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Server-side apps are localized using [localization middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Flocalization%23localization-middleware). Add localization services to the app with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A).

In the `Program` file:

```csharp
builder.Services.AddLocalization();
```

Set the app's default and supported cultures with [Microsoft.AspNetCore.Builder.RequestLocalizationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RequestLocalizationOptions).

**Applies to: \>= aspnetcore-8.0**

Before the call to [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) in the request processing pipeline, place the following code:



**Applies to: < aspnetcore-8.0**

After routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) is added to the request processing pipeline, place the following code:



```csharp
var supportedCultures = new[] { "en-US", "es-CR" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);
```

For information on ordering the localization middleware in the middleware pipeline, see [fundamentals/middleware/index#middleware-order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).

The following example shows how to set the current culture in a cookie that can be read by the localization middleware.

**Applies to: \>= aspnetcore-8.0**

The following namespaces are required for the `App` component:

* [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization)
* [Microsoft.AspNetCore.Localization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization)

Add the [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization) and [Microsoft.AspNetCore.Localization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization) namespaces to the top of the `App` component file (`Components/App.razor`):

```razor
@using System.Globalization
@using Microsoft.AspNetCore.Localization
```

Add the following `@code` block to the bottom of the `App` component file:

```razor
@code {
    [CascadingParameter]
    private HttpContext? HttpContext { get; set; }

    protected override void OnInitialized()
    {
        HttpContext?.Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(
                new RequestCulture(
                    CultureInfo.CurrentCulture,
                    CultureInfo.CurrentUICulture)));
    }
}
```



**Applies to: < aspnetcore-8.0**

Modifications to the `Pages/_Host.cshtml` file require the following namespaces:

* [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization)
* [Microsoft.AspNetCore.Localization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization)

Add the following Razor markup to the file:

```cshtml
@using System.Globalization
@using Microsoft.AspNetCore.Localization
@{
    this.HttpContext.Response.Cookies.Append(
        CookieRequestCultureProvider.DefaultCookieName,
        CookieRequestCultureProvider.MakeCookieValue(
            new RequestCulture(
                CultureInfo.CurrentCulture,
                CultureInfo.CurrentUICulture)));
}
```



For information on ordering the localization middleware in the middleware pipeline, see [fundamentals/middleware/index#middleware-order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).

**Applies to: \>= aspnetcore-6.0**

To provide UI to allow a user to select a culture, use a *redirect-based approach* with a localization cookie. The app persists the user's selected culture via a redirect to a Minimal API endpoint. The endpoint sets the user's selected culture into a cookie and redirects the user back to the original URI. The process is similar to what happens in a web app when a user attempts to access a secure resource, where the user is redirected to a sign-in page and then redirected back to the original resource.

At the top of the `Program` file, add the following `using` statement for the required namespace:

```csharp
using Microsoft.AspNetCore.Localization;
```

In the request processing pipeline of the app's `Program` file after the call to [Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%252A):

```csharp
app.MapGet("/Culture/Set", (string? culture, string redirectUri = "/",
    HttpContext context) =>
{
    if (!string.IsNullOrWhiteSpace(culture))
    {
        context.Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(
                new RequestCulture(culture, culture)));
    }

    return Results.LocalRedirect(redirectUri);
});
```

> **Warning:**
> Use the [Microsoft.AspNetCore.Http.Results.LocalRedirect%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.LocalRedirect%252A) result, as shown in the preceding example, to prevent open redirect attacks. For more information, see [security/preventing-open-redirects](../security/preventing-open-redirects.md).



**Applies to: < aspnetcore-6.0**

If the app isn't configured to process controller actions:

* Add MVC services by calling [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%252A) on the service collection in the `Program` file:

  ```csharp
  builder.Services.AddControllers();
  ```

* Add controller endpoint routing in the `Program` file by calling [Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllers%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllers%252A) on the [Microsoft.AspNetCore.Routing.IEndpointRouteBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.IEndpointRouteBuilder) (`app`):

  ```csharp
  app.MapControllers();
  ```

To provide UI to allow a user to select a culture, use a *redirect-based approach* with a localization cookie. The app persists the user's selected culture via a redirect to a controller. The controller sets the user's selected culture into a cookie and redirects the user back to the original URI. The process is similar to what happens in a web app when a user attempts to access a secure resource, where the user is redirected to a sign-in page and then redirected back to the original resource.

`Controllers/CultureController.cs`:

```csharp
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]/[action]")]
public class CultureController : Controller
{
    public IActionResult Set(string culture, string redirectUri)
    {
        if (culture != null)
        {
            HttpContext.Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(
                    new RequestCulture(culture, culture)));
        }

        return LocalRedirect(redirectUri);
    }
}
```

> **Warning:**
> Use the [Microsoft.AspNetCore.Mvc.ControllerBase.LocalRedirect%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.LocalRedirect%252A) action result, as shown in the preceding example, to prevent open redirect attacks. For more information, see [security/preventing-open-redirects](../security/preventing-open-redirects.md).



**Applies to: \>= aspnetcore-8.0**

The following `CultureSelector` component shows how to call the `Set` endpoint with the new culture. The component is placed in the `Components` folder for use throughout the app.

`Components/CultureSelector.razor`:



**Applies to: < aspnetcore-8.0**

The following `CultureSelector` component shows how to call the `Set` endpoint with the new culture. The component is placed in the `Shared` folder for use throughout the app.

`Shared/CultureSelector.razor`:



**Applies to: \>= aspnetcore-7.0**

```razor
@using System.Globalization
@inject IJSRuntime JS
@inject NavigationManager Navigation

<p>
    <label>
        Select your locale:
        <select @bind="selectedCulture" @bind:after="ApplySelectedCultureAsync">
            @foreach (var culture in supportedCultures)
            {
                <option value="@culture">@culture.DisplayName</option>
            }
        </select>
    </label>
</p>

@code
{
    private CultureInfo[] supportedCultures = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("es-CR"),
    };

    private CultureInfo? selectedCulture;

    protected override void OnInitialized()
    {
        selectedCulture = CultureInfo.CurrentCulture;
    }

    private async Task ApplySelectedCultureAsync()
    {
        if (selectedCulture is not null &&
            CultureInfo.CurrentCulture != selectedCulture)
        {
            var uri = new Uri(Navigation.Uri)
                .GetComponents(UriComponents.PathAndQuery, UriFormat.Unescaped);
            var cultureEscaped = Uri.EscapeDataString(selectedCulture.Name);
            var uriEscaped = Uri.EscapeDataString(uri);
    
            Navigation.NavigateTo(
                $"Culture/Set?culture={cultureEscaped}&redirectUri={uriEscaped}",
                forceLoad: true);
        }
    }
}
```



**Applies to: < aspnetcore-7.0**

```razor
@using System.Globalization
@inject IJSRuntime JS
@inject NavigationManager Navigation

<p>
    <label>
        Select your locale:
        <select value="@selectedCulture" @onchange="HandleSelectedCultureChanged">
            @foreach (var culture in supportedCultures)
            {
                <option value="@culture">@culture.DisplayName</option>
            }
        </select>
    </label>
</p>

@code
{
    private CultureInfo[] supportedCultures = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("es-CR"),
    };

    private CultureInfo? selectedCulture;

    protected override void OnInitialized()
    {
        selectedCulture = CultureInfo.CurrentCulture;
    }

    private async Task HandleSelectedCultureChanged(ChangeEventArgs args)
    {
        selectedCulture = CultureInfo.GetCultureInfo((string)args.Value!);

        if (selectedCulture is not null &&
            CultureInfo.CurrentCulture != selectedCulture)
        {
            var uri = new Uri(Navigation.Uri)
                .GetComponents(UriComponents.PathAndQuery, UriFormat.Unescaped);
            var cultureEscaped = Uri.EscapeDataString(selectedCulture.Name);
            var uriEscaped = Uri.EscapeDataString(uri);
    
            Navigation.NavigateTo(
                $"Culture/Set?culture={cultureEscaped}&redirectUri={uriEscaped}",
                forceLoad: true);
        }
    }
}
```



Add the `CultureSelector` component to the `MainLayout` component. 

**Applies to: \>= aspnetcore-8.0**

In the header markup of `Components/Layout/MainLayout.razor`:



**Applies to: < aspnetcore-8.0**

In the header markup of `Shared/MainLayout.razor`:



```razor
<CultureSelector />
```

Use the `CultureExample1` component shown in the [Demonstration component](#demonstration-component) section to study how the preceding example works.

**Applies to: \>= aspnetcore-8.0**

The preceding example assumes that the app adopts ***global*** interactivity by specifying the Interactive Server render mode on the `Routes` component in the `App` component (`Components/App.razor`):

```razor
<Routes @rendermode="InteractiveServer" />
```

If the app adopts ***per-page/component*** interactivity and only server-side components provide culture selection UI, make the following changes:

* Add the Interactive Server render mode to the top of the `CultureExample1` component file (`Components/Pages/CultureExample1.razor`):

  ```razor
  @rendermode InteractiveServer
  ```

* In the app's main layout (`Components/Layout/MainLayout.razor`), apply the Interactive Server render mode to the `CultureSelector` component:

  ```razor
  <CultureSelector @rendermode="InteractiveServer" />
  ```



**Applies to: \>= aspnetcore-8.0**

## Dynamically set the culture in a Blazor Web App by user preference

*This section applies to Blazor Web Apps that adopt per-page/component interactivity.*

Examples of locations where an app might store a user's preference include in [browser local storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) (common for client-side scenarios), in a localization cookie or database (common for server-side scenarios), both local storage and a localization cookie (Blazor Web Apps with server and WebAssembly components), or in an external service attached to an external database and accessed by a [web API](call-web-api.md). The following example demonstrates how to use browser local storage for client-side rendered (CSR) components and a localization cookie for server-side rendered (SSR) components. The guidance in this section also works for components in apps that adopt per-page/component rendering and specify the Interactive Auto render mode (`@rendermode InteractiveAuto`).

### Updates to the `.Client` project

Add the [`Microsoft.Extensions.Localization` package](https://www.nuget.org/packages/Microsoft.Extensions.Localization) to the `.Client` project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the `.Client` project file:

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```

Add the namespaces for [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization) and [Microsoft.JSInterop](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop) to the top of the `.Client` project's `Program` file:

```csharp
using System.Globalization;
using Microsoft.JSInterop;
```

Remove the following line:

```diff
- await builder.Build().RunAsync();
```

Replace the preceding line with the following code. The code adds Blazor's localization service to the app's service collection with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A) and uses [JS interop](javascript-interoperability/call-javascript-from-dotnet.md) to call into JS and retrieve the user's culture selection from local storage. If local storage doesn't contain a culture for the user, the code sets a default value of United States English (`en-US`).

```csharp
builder.Services.AddLocalization();

var host = builder.Build();

const string defaultCulture = "en-US";

var js = host.Services.GetRequiredService<IJSRuntime>();
var result = await js.InvokeAsync<string>("blazorCulture.get");
var culture = CultureInfo.GetCultureInfo(result ?? defaultCulture);

if (result == null)
{
    await js.InvokeVoidAsync("blazorCulture.set", defaultCulture);
}

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

await host.RunAsync();
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

> **Note:**
> In .NET 9 or earlier, standalone Blazor WebAssembly apps load UI globalization resources based on [System.Globalization.CultureInfo.DefaultThreadCurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentCulture). If you want to additionally load globalization data for your localization culture defined by [System.Globalization.CultureInfo.DefaultThreadCurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentUICulture), [upgrade the app to .NET 10 or later](../migration/index.md).



**Applies to: \>= aspnetcore-8.0**

Add the following `CultureSelector` component to the `.Client` project in a `Shared` folder. If a `Shared` folder doesn't exist in the `.Client` project, create one to hold shared components. 

When the user changes the culture, JS interop sets the culture in local browser storage and a Minimal API endpoint updates the localization cookie with the culture. The Minimal API endpoint is added to the app later in the [Server project updates](#server-project-updates) section.

`Shared/CultureSelector.razor`:

```razor
@using System.Globalization
@inject IJSRuntime JS
@inject NavigationManager Navigation

<p>
    <label>
        Select your locale:
        <select @bind="@selectedCulture" @bind:after="ApplySelectedCultureAsync">
            @foreach (var culture in supportedCultures)
            {
                <option value="@culture">@culture.DisplayName</option>
            }
        </select>
    </label>
</p>

@code
{
    private CultureInfo[] supportedCultures = 
        [ 
            new CultureInfo("en-US"), 
            new CultureInfo("es-CR"),
        ];

    private CultureInfo? selectedCulture;

    protected override void OnInitialized()
    {
        selectedCulture = CultureInfo.CurrentCulture;
    }

    private async Task ApplySelectedCultureAsync()
    {
        if (selectedCulture is not null &&
            CultureInfo.CurrentCulture != selectedCulture)
        {
            await JS.InvokeVoidAsync("blazorCulture.set", selectedCulture.Name);

            var uri = new Uri(Navigation.Uri)
                .GetComponents(UriComponents.PathAndQuery, UriFormat.Unescaped);
            var cultureEscaped = Uri.EscapeDataString(selectedCulture.Name);
            var uriEscaped = Uri.EscapeDataString(uri);

            Navigation.NavigateTo(
                $"Culture/Set?culture={cultureEscaped}&redirectUri={uriEscaped}",
                forceLoad: true);
        }
    }
}
```

> **Note:**
> For more information on [Microsoft.JSInterop.IJSInProcessRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessRuntime), see [blazor/js-interop/call-javascript-from-dotnet#invoke-javascript-functions-without-reading-a-returned-value-invokevoidasync](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23invoke-javascript-functions-without-reading-a-returned-value-invokevoidasync).

In the server project's imports file (`_Imports.razor`), add the namespace for the `.Client` project's `Shared` folder (update the namespace to match your app):

```razor
@using BlazorSample.Client.Shared
```

Place the following markup in the header content of the `Components/Layout/MainLayout.razor` file:

```razor
<CultureSelector @rendermode="InteractiveAuto" />
```

In the `.Client` project, place the following `CultureClient` component to study how globalization works for CSR components.

`Pages/CultureClient.razor`:

```razor
@page "/culture-client"
@rendermode InteractiveWebAssembly
@using System.Globalization

<PageTitle>Culture Client</PageTitle>

<h1>Culture Client</h1>

<ul>
    <li><b>CurrentCulture</b>: @CultureInfo.CurrentCulture</li>
    <li><b>CurrentUICulture</b>: @CultureInfo.CurrentUICulture</li>
</ul>

<h2>Rendered values</h2>

<ul>
    <li><b>Date</b>: @dt</li>
    <li><b>Number</b>: @number.ToString("N2")</li>
</ul>

<h2><code>&lt;input&gt;</code> elements that don't set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.CurrentCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input @bind="number" /></label></li>
</ul>

<h2><code>&lt;input&gt;</code> elements that set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.InvariantCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input type="date" @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input type="number" @bind="number" /></label></li>
</ul>

@code {
    private DateTime dt = DateTime.Now;
    private double number = 1999.69;
}
```

In the `.Client` project, place the following `CultureServer` component to study how globalization works for SSR components.

`Pages/CultureServer.razor`:

```razor
@page "/culture-server"
@rendermode InteractiveServer
@using System.Globalization

<PageTitle>Culture Server</PageTitle>

<h1>Culture Server</h1>

<ul>
    <li><b>CurrentCulture</b>: @CultureInfo.CurrentCulture</li>
    <li><b>CurrentUICulture</b>: @CultureInfo.CurrentUICulture</li>
</ul>

<h2>Rendered values</h2>

<ul>
    <li><b>Date</b>: @dt</li>
    <li><b>Number</b>: @number.ToString("N2")</li>
</ul>

<h2><code>&lt;input&gt;</code> elements that don't set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.CurrentCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input @bind="number" /></label></li>
</ul>

<h2><code>&lt;input&gt;</code> elements that set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.InvariantCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input type="date" @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input type="number" @bind="number" /></label></li>
</ul>

@code {
    private DateTime dt = DateTime.Now;
    private double number = 1999.69;
}
```

Use the `CultureExample1` component shown in the [Demonstration component](#demonstration-component) section to study how globalization works for a component that inherits the global Auto render mode. Add the `CultureExample1` component to the `.Client` project's `Pages` folder. At the top of the component, specify the Interactive Auto render mode:

```razor
@rendermode InteractiveAuto
```

Add the `CultureClient`, `CultureServer`, and `CultureExample1` components to the sidebar navigation in `Components/Layout/NavMenu.razor` of the server project:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="culture-server">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Culture (Server)
    </NavLink>
</div>
<div class="nav-item px-3">
    <NavLink class="nav-link" href="culture-client">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Culture (Client)
    </NavLink>
</div>
<div class="nav-item px-3">
    <NavLink class="nav-link" href="culture-example-1">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Culture (Auto)
    </NavLink>
</div>
```

### Server project updates

Add the [`Microsoft.Extensions.Localization` package](https://www.nuget.org/packages/Microsoft.Extensions.Localization) to the server project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Server-side apps are localized using [localization middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Flocalization%23localization-middleware). Add localization services to the app with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A).

In the server project's `Program` file where services are registered:

```csharp
builder.Services.AddLocalization();
```

Set the app's default and supported cultures with [Microsoft.AspNetCore.Builder.RequestLocalizationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RequestLocalizationOptions).

Before the call to [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) in the request processing pipeline, place the following code:

```csharp
var supportedCultures = new[] { "en-US", "es-CR" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);
```

The following example shows how to set the current culture in a cookie that can be read by the localization middleware.

Add the [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization) and [Microsoft.AspNetCore.Localization](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Localization) namespaces to the top of the `App` component (`Components/App.razor`):

```razor
@using System.Globalization
@using Microsoft.AspNetCore.Localization
```

The app's culture for client-side rendering is set using the Blazor framework's API. A user's culture selection can be persisted in browser local storage for CSR components.

After the [Blazor `<script>` tag](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script), provide JS functions to get and set the user's culture selection with browser local storage:

```html
<script>
  window.blazorCulture = {
    get: () => window.localStorage['BlazorCulture'],
    set: (value) => window.localStorage['BlazorCulture'] = value
  };
</script>
```

> **Note:**
> The preceding example pollutes the client with global functions. For a better approach in production apps, see [JavaScript isolation in JavaScript modules](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23javascript-isolation-in-javascript-modules).

Add the following `@code` block to the bottom of the `App` component file:

```razor
@code {
    [CascadingParameter]
    private HttpContext? HttpContext { get; set; }

    protected override void OnInitialized()
    {
        HttpContext?.Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(
                new RequestCulture(
                    CultureInfo.CurrentCulture,
                    CultureInfo.CurrentUICulture)));
    }
}
```

To provide UI to allow a user to select a culture, use a *redirect-based approach* with a localization cookie. The app persists the user's selected culture via a redirect to a Minimal API endpoint. The endpoint sets the user's selected culture into a cookie and redirects the user back to the original URI. The process is similar to what happens in a web app when a user attempts to access a secure resource, where the user is redirected to a sign-in page and then redirected back to the original resource.

At the top of the `Program` file, add the following `using` statement for the required namespace:

```csharp
using Microsoft.AspNetCore.Localization;
```

In the request processing pipeline of the app's `Program` file after the call to [Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization%252A):

```csharp
app.MapGet("/Culture/Set", (string? culture, string redirectUri = "/",
    HttpContext context) =>
{
    if (!string.IsNullOrWhiteSpace(culture))
    {
        context.Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(
                new RequestCulture(culture, culture)));
    }

    return Results.LocalRedirect(redirectUri);
});
```

> **Warning:**
> Use the [Microsoft.AspNetCore.Http.Results.LocalRedirect%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.LocalRedirect%252A) result, as shown in the preceding example, to prevent open redirect attacks. For more information, see [security/preventing-open-redirects](../security/preventing-open-redirects.md).



## Localization

If the app doesn't already support dynamic culture selection, add the [`Microsoft.Extensions.Localization` package](https://www.nuget.org/packages/Microsoft.Extensions.Localization) to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


### Client-side localization

**Applies to: \>= aspnetcore-5.0**

Set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```



In the `Program` file, add namespace the namespace for [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization) to the top of the file:

```csharp
using System.Globalization;
```

Add Blazor's localization service to the app's service collection with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A):

```csharp
builder.Services.AddLocalization();
```

### Server-side localization

Use [localization middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Flocalization%23localization-middleware) to set the app's culture.

If the app doesn't already support dynamic culture selection:

**Applies to: \>= aspnetcore-6.0**

* Add localization services to the app with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A).
* Specify the app's default and supported cultures in the `Program` file. The following example configures supported cultures for United States English and Costa Rican Spanish.

```csharp
builder.Services.AddLocalization();
```



**Applies to: \>= aspnetcore-8.0**

Place localization middleware before any middleware that might check the request culture. Generally, place the middleware immediately before calling [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A):



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

Immediately after routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) is added to the processing pipeline:



**Applies to: \>= aspnetcore-6.0**

```csharp
var supportedCultures = new[] { "en-US", "es-CR" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);
```

For information on ordering the localization middleware in the middleware pipeline, see [fundamentals/middleware/index#middleware-order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).



**Applies to: < aspnetcore-6.0**

* Add localization services to the app with [Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization%252A).
* Specify the app's default and supported cultures in `Startup.Configure` (`Startup.cs`). The following example configures supported cultures for United States English and Costa Rican Spanish.

In `Startup.ConfigureServices` (`Startup.cs`):

```csharp
services.AddLocalization();
```

In `Startup.Configure` immediately after routing middleware ([Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A)) is added to the processing pipeline:

```csharp
var supportedCultures = new[] { "en-US", "es-CR" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);
```

For information on ordering the localization middleware in the middleware pipeline of `Startup.Configure`, see [fundamentals/middleware/index#middleware-order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).



If the app should localize resources based on storing a user's culture setting, use a localization culture cookie. Use of a cookie ensures that the WebSocket connection can correctly propagate the culture. If localization schemes are based on the URL path or query string, the scheme might not be able to work with [WebSockets](../fundamentals/websockets.md), thus fail to persist the culture. Therefore, the recommended approach is to use a localization culture cookie. See the [Dynamically set the server-side culture by user preference](#dynamically-set-the-server-side-culture-by-user-preference) section of this article to see an example Razor expression that persists the user's culture selection.

### Example of localized resources

The example of localized resources in this section works with the prior examples in this article where the app's supported cultures are English (`en`) as a default locale and Spanish (`es`) as a user-selectable or browser-specified alternate locale.

Create a resource file for each locale. In the following example, resources are created for a `Greeting` string in English and Spanish:

* English (`en`): `Hello, World!`
* Spanish (`es`): `¡Hola, Mundo!`

> **Note:**
> The following resource file can be added in Visual Studio by right-clicking the `Pages` folder and selecting **Add** > **New Item** > **Resources File**. Name the file `CultureExample2.resx`. When the editor appears, provide data for a new entry. Set the **Name** to `Greeting` and **Value** to `Hello, World!`. Save the file.
>
> If using Visual Studio Code, we recommend installing [Tim Heuer's ResX Viewer and Editor](https://marketplace.visualstudio.com/items?itemName=TimHeuer.resx-editor). Add an empty `CultureExample2.resx` file to the `Pages` folder. The extension automatically takes over managing the file in the UI. Select the **Add New Resource** button. Follow the instructions to add an entry for `Greeting` (key), `Hello, World!` (value), and `None` (comment). Save the file. If you close and re-open the file, you can see the `Greeting` resource.
>
> [Tim Heuer's ResX Viewer and Editor](https://marketplace.visualstudio.com/items?itemName=TimHeuer.resx-editor) isn't owned or maintained by Microsoft and isn't covered by any Microsoft Support Agreement or license.

The following demonstrates a typical resource file. You can manually place resource files into the app's `Pages` folder if you prefer not to use built-in tooling with an integrated development environment (IDE), such as Visual Studio's built-in resource file editor or Visual Studio Code with an extension for creating and editing resource files.

`Pages/CultureExample2.resx`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
    <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />
    <xsd:element name="root" msdata:IsDataSet="true">
      <xsd:complexType>
        <xsd:choice maxOccurs="unbounded">
          <xsd:element name="metadata">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" />
              </xsd:sequence>
              <xsd:attribute name="name" use="required" type="xsd:string" />
              <xsd:attribute name="type" type="xsd:string" />
              <xsd:attribute name="mimetype" type="xsd:string" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="assembly">
            <xsd:complexType>
              <xsd:attribute name="alias" type="xsd:string" />
              <xsd:attribute name="name" type="xsd:string" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="data">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />
              <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />
              <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="resheader">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" />
            </xsd:complexType>
          </xsd:element>
        </xsd:choice>
      </xsd:complexType>
    </xsd:element>
  </xsd:schema>
  <resheader name="resmimetype">
    <value>text/microsoft-resx</value>
  </resheader>
  <resheader name="version">
    <value>2.0</value>
  </resheader>
  <resheader name="reader">
    <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <resheader name="writer">
    <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <data name="Greeting" xml:space="preserve">
    <value>Hello, World!</value>
  </data>
</root>
```

> **Note:**
> The following resource file can be added in Visual Studio by right-clicking the `Pages` folder and selecting **Add** > **New Item** > **Resources File**. Name the file `CultureExample2.es.resx`. When the editor appears, provide data for a new entry. Set the **Name** to `Greeting` and **Value** to `¡Hola, Mundo!`. Save the file.
>
> If using Visual Studio Code, we recommend installing [Tim Heuer's ResX Viewer and Editor](https://marketplace.visualstudio.com/items?itemName=TimHeuer.resx-editor). Add an empty `CultureExample2.resx` file to the `Pages` folder. The extension automatically takes over managing the file in the UI. Select the **Add New Resource** button. Follow the instructions to add an entry for `Greeting` (key), `¡Hola, Mundo!` (value), and `None` (comment). Save the file. If you close and re-open the file, you can see the `Greeting` resource.

The following demonstrates a typical resource file. You can manually place resource files into the app's `Pages` folder if you prefer not to use built-in tooling with an integrated development environment (IDE), such as Visual Studio's built-in resource file editor or Visual Studio Code with an extension for creating and editing resource files.

`Pages/CultureExample2.es.resx`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
    <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />
    <xsd:element name="root" msdata:IsDataSet="true">
      <xsd:complexType>
        <xsd:choice maxOccurs="unbounded">
          <xsd:element name="metadata">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" />
              </xsd:sequence>
              <xsd:attribute name="name" use="required" type="xsd:string" />
              <xsd:attribute name="type" type="xsd:string" />
              <xsd:attribute name="mimetype" type="xsd:string" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="assembly">
            <xsd:complexType>
              <xsd:attribute name="alias" type="xsd:string" />
              <xsd:attribute name="name" type="xsd:string" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="data">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />
              <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />
              <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="resheader">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" />
            </xsd:complexType>
          </xsd:element>
        </xsd:choice>
      </xsd:complexType>
    </xsd:element>
  </xsd:schema>
  <resheader name="resmimetype">
    <value>text/microsoft-resx</value>
  </resheader>
  <resheader name="version">
    <value>2.0</value>
  </resheader>
  <resheader name="reader">
    <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <resheader name="writer">
    <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <data name="Greeting" xml:space="preserve">
    <value>¡Hola, Mundo!</value>
  </data>
</root>
```

The following component demonstrates the use of the localized `Greeting` string with [Microsoft.Extensions.Localization.IStringLocalizer%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer%25601). The Razor markup `@Loc["Greeting"]` in the following example localizes the string keyed to the `Greeting` value, which is set in the preceding resource files.

Add the namespace for [Microsoft.Extensions.Localization](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization) to the app's imports file (`_Imports.razor`):

```razor
@using Microsoft.Extensions.Localization
```

`CultureExample2.razor`:

```razor
@page "/culture-example-2"
@using System.Globalization
@inject IStringLocalizer<CultureExample2> Loc

<h1>Culture Example 2</h1>

<ul>
    <li><b>CurrentCulture</b>: @CultureInfo.CurrentCulture</li>
    <li><b>CurrentUICulture</b>: @CultureInfo.CurrentUICulture</li>
</ul>

<h2>Greeting</h2>

<p>
    @Loc["Greeting"]
</p>

<p>
    @greeting
</p>

@code {
    private string? greeting;

    protected override void OnInitialized()
    {
        greeting = Loc["Greeting"];
    }
}
```

Optionally, add a menu item for the `CultureExample2` component to the navigation in the `NavMenu` component (`NavMenu.razor`).

**Applies to: \>= aspnetcore-5.0**

## WebAssembly culture provider reference source

To further understand how the Blazor framework processes localization, see the [`WebAssemblyCultureProvider` class](https://github.com/dotnet/aspnetcore/blob/main/src/Components/WebAssembly/WebAssembly/src/Hosting/WebAssemblyCultureProvider.cs) in the ASP.NET Core reference source.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).




## Shared resources

To create localization shared resources, adopt the following approach.

* Confirm that the [`Microsoft.Extensions.Localization` package](https://www.nuget.org/packages/Microsoft.Extensions.Localization) is referenced by the project.

  > **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


* Confirm that the [Microsoft.Extensions.Localization](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization) namespace is available to the project's Razor components via an entry in the project's imports file (`_Imports.razor`):

  ```razor
  @using Microsoft.Extensions.Localization
  ```

* Create a dummy class with an arbitrary class name. In the following example:

  * The app uses the `BlazorSample` namespace, and localization assets use the `BlazorSample.Localization` namespace.
  * The dummy class is named `SharedResource`.
  * The class file is placed in a `Localization` folder at the root of the app.

  > **Note:**
  > Don't use an autogenerated designer file (for example, `SharedResources.Designer.cs`). The dummy class is meant to act as the shared resource class. The presence of a designer file results in a namespace collision.

  `Localization/SharedResource.cs`:

  ```csharp
  namespace BlazorSample.Localization;
  
  public class SharedResource
  {
  }
  ```

* Create the shared resource files with a **Build Action** of `Embedded resource`. In the following example:

  * The files are placed in the `Localization` folder with the dummy `SharedResource` class (`Localization/SharedResource.cs`).
  * Name the resource files to match the name of the dummy class. The following example files include a default localization file and a file for Spanish (`es`) localization.

  * `Localization/SharedResource.resx`
  * `Localization/SharedResource.es.resx`

  > **Warning:**
  > When following the approach in this section, you can't simultaneously set [Microsoft.Extensions.Localization.LocalizationOptions.ResourcesPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.LocalizationOptions.ResourcesPath%252A) and use [Microsoft.Extensions.Localization.IStringLocalizerFactory.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizerFactory.Create%252A) to load resources.

* To reference the dummy class for an injected [Microsoft.Extensions.Localization.IStringLocalizer%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Localization.IStringLocalizer%25601) in a Razor component, either place an [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directive for the localization namespace or include the localization namespace in the dummy class reference. In the following examples:

  * The first example states the `Localization` namespace for the `SharedResource` dummy class with an [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directive.
  * The second example states the `SharedResource` dummy class's namespace explicitly.

  In a Razor component, use ***either*** of the following approaches:

  ```razor
  @using Localization
  @inject IStringLocalizer<SharedResource> Loc
  ```

  ```razor
  @inject IStringLocalizer<Localization.SharedResource> Loc
  ```

For additional guidance, see [fundamentals/localization](../fundamentals/localization.md).

## Location override using "Sensors" pane in developer tools

When using the location override using the **Sensors** pane in Google Chrome or Microsoft Edge developer tools, the fallback language is reset after prerendering. Avoid setting the language using the **Sensors** pane when testing. Set the language using the browser's language settings.

For more information, see [Blazor Localization does not work with InteractiveServer (`dotnet/aspnetcore` #53707)](https://github.com/dotnet/aspnetcore/issues/53707).

## Additional resources

**Applies to: \>= aspnetcore-11.0**

* [blazor/host-and-deploy/app-base-path](host-and-deploy/app-base-path.md)
* [fundamentals/localization](../fundamentals/localization.md)
* [DataAnnotations localization in Minimal APIs and Blazor](https://learn.microsoft.com/search/?terms=fundamentals%2Flocalization%2Fmake-content-localizable%23dataannotations-localization-in-minimal-apis-and-blazor)
* [Minimal APIs: Localizing validation messages](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%23localizing-validation-messages)
* [Globalizing and localizing .NET applications](https://learn.microsoft.com/dotnet/core/extensions/globalization-and-localization)
* [Resources in .resx Files](https://learn.microsoft.com/dotnet/framework/resources/working-with-resx-files-programmatically)
* [Localization & Generics](http://hishambinateya.com/localization-and-generics)
* [Calling `InvokeAsync(StateHasChanged)` causes page to fallback to default culture (`dotnet/aspnetcore` #28521)](https://github.com/dotnet/aspnetcore/issues/28521#issuecomment-1112513408)
* [Blazor Localization does not work with InteractiveServer (`dotnet/aspnetcore` #53707)](https://github.com/dotnet/aspnetcore/issues/53707) ([Location override using "Sensors" pane](#location-override-using-sensors-pane-in-developer-tools))



**Applies to: < aspnetcore-11.0**

* [blazor/host-and-deploy/app-base-path](host-and-deploy/app-base-path.md)
* [fundamentals/localization](../fundamentals/localization.md)
* [Globalizing and localizing .NET applications](https://learn.microsoft.com/dotnet/core/extensions/globalization-and-localization)
* [Resources in .resx Files](https://learn.microsoft.com/dotnet/framework/resources/working-with-resx-files-programmatically)
* [Localization & Generics](http://hishambinateya.com/localization-and-generics)
* [Calling `InvokeAsync(StateHasChanged)` causes page to fallback to default culture (`dotnet/aspnetcore` #28521)](https://github.com/dotnet/aspnetcore/issues/28521#issuecomment-1112513408)
* [Blazor Localization does not work with InteractiveServer (`dotnet/aspnetcore` #53707)](https://github.com/dotnet/aspnetcore/issues/53707) ([Location override using "Sensors" pane](#location-override-using-sensors-pane-in-developer-tools))
