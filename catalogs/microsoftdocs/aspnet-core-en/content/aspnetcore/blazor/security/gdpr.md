---
title: EU General Data Protection Regulation (GDPR) support in ASP.NET Core Blazor
author: guardrex
description: Learn how to implement EU General Data Protection Regulation (GDPR) support in Blazor apps.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/security/gdpr
zone_pivot_groups: blazor-app-models
---
# EU General Data Protection Regulation (GDPR) support in ASP.NET Core Blazor

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


This article explains how to implement support for [EU General Data Protection Regulation (GDPR)](https://ec.europa.eu/info/law/law-topic/data-protection/reform/what-does-general-data-protection-regulation-gdpr-govern_en) requirements.

**Applies to: server**


In the `Program` file:

* Add [Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) configuration to require user consent for non-essential cookies and set the same-site policy to none. For more information, see [security/samesite](../../security/samesite.md).
* Add the default implementation for the [Microsoft.AspNetCore.Http.IHttpContextAccessor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IHttpContextAccessor) service by calling [Microsoft.Extensions.DependencyInjection.HttpServiceCollectionExtensions.AddHttpContextAccessor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpServiceCollectionExtensions.AddHttpContextAccessor%252A).

```csharp
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = context => true;

    options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.AddHttpContextAccessor();
```

**Applies to: \>= aspnetcore-8.0**

In the `Program` file before the call to [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A), add cookie policy middleware by calling [Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A):



**Applies to: < aspnetcore-8.0**

In the `Program` file before the call to [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A), add cookie policy middleware by calling [Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A):



```csharp
app.UseCookiePolicy();
```

Add the following `CookieConsent` component to handle cookie policy consent.

The component uses a [collocated JavaScript file](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fjavascript-location%23load-a-script-from-an-external-javascript-file-js-collocated-with-a-component), named `CookieConsent.razor.js`, to load a module. Confirm or adjust the path to the collocated file in the `OnAfterRenderAsync` method. The following component assumes that the component and its companion JavaScript file are in the `Components` folder of the app.

`CookieConsent.razor`:

```razor
@using Microsoft.AspNetCore.Http.Features
@using Microsoft.AspNetCore.Http
@implements IAsyncDisposable
@inject IHttpContextAccessor Http
@inject IJSRuntime JS

@if (showBanner)
{
    <div id="cookieConsent" class="alert alert-info alert-dismissible fade show" 
        role="alert">
        Use this space to summarize your privacy and cookie use policy.
        <a href="/privacy">Privacy Policy</a>
        <button type="button" @onclick="AcceptPolicy" class="accept-policy close" 
            data-bs-dismiss="alert" aria-label="Close" 
            data-cookie-string="@cookieString">
            Accept
        </button>
    </div>
}
@code {
    private IJSObjectReference? module;
    private ITrackingConsentFeature? consentFeature;
    private bool showBanner;
    private string? cookieString;

    protected override void OnInitialized()
    {
        consentFeature = Http.HttpContext?.Features.Get<ITrackingConsentFeature>();
        showBanner = !consentFeature?.CanTrack ?? false;
        cookieString = consentFeature?.CreateConsentCookie();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>("import",
                "./Components/CookieConsent.razor.js");
        }
    }

    private async Task AcceptPolicy()
    {
        if (module is not null)
        {
            await module.InvokeVoidAsync("acceptPolicy", cookieString);
            showBanner = false;
        }
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (module is not null)
        {
            try
            {
                await module.DisposeAsync();
            }
            catch (JSDisconnectedException)
            {
            }
        }
    }
}
```

Add the following [collocated JavaScript file](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fjavascript-location%23load-a-script-from-an-external-javascript-file-js-collocated-with-a-component) to maintain the `acceptPolicy` function in a JavaScript module.

`CookieConsent.razor.js`:

```javascript
export function acceptPolicy(cookieString) {
  document.cookie = cookieString;
}
```

Within `<main>` Razor markup of the `MainLayout` component (`MainLayout.razor`), add the `CookieConsent` component:

```razor
<CookieConsent />
```

## Customize the cookie consent value

Specify the cookie consent value by assigning a custom string to [Microsoft.AspNetCore.Builder.CookiePolicyOptions.ConsentCookieValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions.ConsentCookieValue%252A). The following example changes the default value of "`yes`" to "`true`":

```csharp
options.ConsentCookieValue = "true";
```



**Applies to: webassembly**


In Blazor WebAssembly apps, [local storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) is a convenient approach for maintaining a user's acceptance of a site's cookie policy. The following approach demonstrates the approach.

If the app doesn't already have a `Shared` folder for shared components, add a `Shared` folder to the app.

Add the namespace for shared components to the imports file (`_Imports.razor`). In the following example, the app's namespace is `BlazorSample`, and the shared folder's namespace is `BlazorSample.Shared`:

```razor
@using BlazorSample.Shared
```

Add the following `CookieConsent` component to handle cookie policy consent.

`Shared/CookieConsent.razor`:

```razor
@implements IAsyncDisposable
@inject IJSRuntime JS

@if (showBanner)
{
    <div id="cookieConsent" class="alert alert-info alert-dismissible fade show"
        role="alert">
        Use this space to summarize your privacy and cookie use policy.
        <a href="/privacy">Privacy Policy</a>
        <button type="button" @onclick="AcceptPolicy" class="accept-policy close"
            data-bs-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">Accept</span>
        </button>
    </div>
}
@code {
    private IJSObjectReference? module;
    private bool showBanner = false;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>("import",
                "./Shared/CookieConsent.razor.js");
            showBanner = !await module.InvokeAsync<bool>("getCookiePolicyAccepted");
            StateHasChanged();
        }
    }

    private async Task AcceptPolicy()
    {
        if (module is not null)
        {
            await module.InvokeVoidAsync("setCookiePolicyAccepted");
            showBanner = false;
        }
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (module is not null)
        {
            try
            {
                await module.DisposeAsync();
            }
            catch (JSDisconnectedException)
            {
            }
        }
    }
}
```

Add the following [collocated JavaScript file](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fjavascript-location%23load-a-script-from-an-external-javascript-file-js-collocated-with-a-component) to maintain the `setCookiePolicyAccepted` and `getCookiePolicyAccepted` functions in a JavaScript module.

`Shared/CookieConsent.razor.js`:

```javascript
export function getCookiePolicyAccepted() {
  const cookiePolicy = localStorage.getItem('CookiePolicyAccepted');
  return cookiePolicy === 'yes' ? true : false;
}

export function setCookiePolicyAccepted() {
  localStorage.setItem('CookiePolicyAccepted', 'yes');
}
```

In the preceding example, you can change the name of the local storage item and value from "`CookiePolicyAccepted`" and "`yes`" to any preferred values. If you change one or both values, update both functions.

Within `<main>` Razor markup of the `MainLayout` component (`Layout/MainLayout.razor`), add the `CookieConsent` component:

```razor
<CookieConsent />
```



## Additional resources

* [Microsoft Trust Center: Safeguard individual privacy with cloud services from Microsoft: GDPR](https://www.microsoft.com/trust-center/privacy/gdpr-overview)
* [European Commission: Data protection explained](https://ec.europa.eu/info/law/law-topic/data-protection/reform/what-does-general-data-protection-regulation-gdpr-govern_en)
