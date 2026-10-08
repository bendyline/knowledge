---
title: Call a web API from an ASP.NET Core Blazor app
author: guardrex
description: Learn how to call a web API from Blazor apps.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 08/14/2026
uid: blazor/call-web-api
---
# Call a web API from ASP.NET Core Blazor

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


This article describes how to call a web API from a Blazor app.

## Server-side scenarios for calling external web APIs

Server-based components call external web APIs using [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances, typically created using [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory). For guidance that applies to server-side apps, see [fundamentals/http-requests](../fundamentals/http-requests.md).

A server-side app doesn't include an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) service. Provide an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) to the app using the [`HttpClient` factory infrastructure](../fundamentals/http-requests.md).

In the `Program` file:

```csharp
builder.Services.AddHttpClient();
```

The following Razor component makes a request to a web API for GitHub branches similar to the *Basic Usage* example in the [fundamentals/http-requests](../fundamentals/http-requests.md) article.

`CallWebAPI.razor`:

```razor
@page "/call-web-api"
@using System.Text.Json
@using System.Text.Json.Serialization
@inject IHttpClientFactory ClientFactory

<h1>Call web API from a server-side Razor component</h1>

@if (getBranchesError || branches is null)
{
    <p>Unable to get branches from GitHub. Please try again later.</p>
}
else
{
    <ul>
        @foreach (var branch in branches)
        {
            <li>@branch.Name</li>
        }
    </ul>
}

@code {
    private IEnumerable<GitHubBranch>? branches = [];
    private bool getBranchesError;
    private bool shouldRender;

    protected override bool ShouldRender() => shouldRender;

    protected override async Task OnInitializedAsync()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get,
            "https://api.github.com/repos/dotnet/AspNetCore.Docs/branches");
        request.Headers.Add("Accept", "application/vnd.github.v3+json");
        request.Headers.Add("User-Agent", "HttpClientFactory-Sample");

        var client = ClientFactory.CreateClient();

        using var response = await client.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            using var responseStream = await response.Content.ReadAsStreamAsync();
            branches = await JsonSerializer.DeserializeAsync
                <IEnumerable<GitHubBranch>>(responseStream);
        }
        else
        {
            getBranchesError = true;
        }

        shouldRender = true;
    }

    public class GitHubBranch
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }
    }
}
```

In the preceding example for C# 12 or later, an empty array (`[]`) is created for the `branches` variable. For earlier versions of C# compiled with an SDK earlier than .NET 8, create an empty array (`Array.Empty<GitHubBranch>()`).

For an additional working example, see the server-side file upload example that uploads files to a web API controller in the [blazor/file-uploads#upload-files-to-a-server-with-server-side-rendering](https://learn.microsoft.com/search/?terms=blazor%2Ffile-uploads%23upload-files-to-a-server-with-server-side-rendering) article.

**Applies to: \>= aspnetcore-8.0**

## Service abstractions for web API calls

*This section applies to Blazor Web Apps that maintain a web API in the server project or transform web API calls to an external web API.*

When using the interactive WebAssembly and Auto render modes, components are prerendered by default. Auto components are also initially rendered interactively from the server before the Blazor bundle downloads to the client and the client-side runtime activates. This means that components using these render modes should be designed so that they run successfully from both the client and the server. If the component must call a server project-based API or transform a request to an external web API (one that's outside of the Blazor Web App) when running on the client, the recommended approach is to abstract that API call behind a service interface and implement client and server versions of the service:

* The client version calls the web API with a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient).
* The server version can typically access the server-side resources directly. Injecting an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) on the server that makes calls back to the server isn't recommended, as the network request is typically unnecessary. Alternatively, the API might be external to the server project, but a service abstraction for the server is required to transform the request in some way, for example to add an access token to a proxied request.

When using the WebAssembly render mode, you also have the option of disabling prerendering, so the components only render from the client. For more information, see [blazor/components/prerender#disable-prerendering](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fprerender%23disable-prerendering).

Examples ([sample apps](#sample-apps)):

* Movie list web API in the `BlazorWebAppCallWebApi` sample app.
* Streaming rendering weather data web API in the `BlazorWebAppCallWebApi_Weather` sample app.
* Weather data returned to the client in either the `BlazorWebAppOidc` (non-BFF pattern) or `BlazorWebAppOidcBff` (BFF pattern) sample apps. These apps demonstrate secure (web) API calls. For more information, see [blazor/security/blazor-web-app-oidc](security/blazor-web-app-with-oidc.md).

## Blazor Web App external web APIs

*This section applies to Blazor Web Apps that call a web API maintained by a separate (external) project, possibly hosted on a different server.*

Blazor Web Apps normally prerender client-side WebAssembly components, and Auto components render on the server during static or interactive server-side rendering (SSR). [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) services aren't registered by default in a Blazor Web App's main project. If the app is run with only the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) services registered in the `.Client` project, as described in the [Add the `HttpClient` service](#add-the-httpclient-service) section, executing the app results in a runtime error:

> InvalidOperationException: Cannot provide a value for property 'Http' on type '...{COMPONENT}'. There is no registered service of type 'System.Net.Http.HttpClient'.

Use ***either*** of the following approaches:

* Add the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) services to the server project to make the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) available during SSR. Use the following service registration in the server project's `Program` file:

  ```csharp
  builder.Services.AddHttpClient();
  ```

  [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) services are provided by the shared framework, so a package reference in the app's project file isn't required.

  Example: Todo list web API in the `BlazorWebAppCallWebApi` [sample app](#sample-apps)

* If prerendering isn't required for a WebAssembly component that calls the web API, disable prerendering by following the guidance in [blazor/components/prerender#disable-prerendering](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fprerender%23disable-prerendering). If you adopt this approach, you don't need to add [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) services to the main project of the Blazor Web App because the component isn't prerendered on the server.

For more information, see the [Client-side services fail to resolve during prerendering](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fprerender%23client-side-services-fail-to-resolve-during-prerendering) section of the *Prerendering* article.

## Client-side scenarios for calling external web APIs

Client-based components call external web APIs using [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances, typically created with a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) registered in the `Program` file:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient
    { 
        BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) 
    });
```

The following Razor component makes a request to a web API for GitHub branches similar to the *Basic Usage* example in the [fundamentals/http-requests](../fundamentals/http-requests.md) article.

`CallWebAPI.razor`:

```razor
@page "/call-web-api"
@using System.Text.Json
@using System.Text.Json.Serialization
@inject HttpClient Client

<h1>Call web API from a Blazor WebAssembly Razor component</h1>

@if (getBranchesError || branches is null)
{
    <p>Unable to get branches from GitHub. Please try again later.</p>
}
else
{
    <ul>
        @foreach (var branch in branches)
        {
            <li>@branch.Name</li>
        }
    </ul>
}

@code {
    private IEnumerable<GitHubBranch>? branches = [];
    private bool getBranchesError;
    private bool shouldRender;

    protected override bool ShouldRender() => shouldRender;

    protected override async Task OnInitializedAsync()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get,
            "https://api.github.com/repos/dotnet/AspNetCore.Docs/branches");
        request.Headers.Add("Accept", "application/vnd.github.v3+json");
        request.Headers.Add("User-Agent", "HttpClientFactory-Sample");

        using var response = await Client.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            using var responseStream = await response.Content.ReadAsStreamAsync();
            branches = await JsonSerializer.DeserializeAsync
                <IEnumerable<GitHubBranch>>(responseStream);
        }
        else
        {
            getBranchesError = true;
        }

        shouldRender = true;
    }

    public class GitHubBranch
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }
    }
}
```

In the preceding example for C# 12 or later, an empty array (`[]`) is created for the `branches` variable. For earlier versions of C# compiled with an SDK earlier than .NET 8, create an empty array (`Array.Empty<GitHubBranch>()`).

<!-- A version of the following content is also in the 
     Security > WebAssembly > Overview article under 
     the heading: "Web API requests" -->

To protect .NET/C# code and data, use [ASP.NET Core Data Protection](../security/data-protection/introduction.md) features with a server-side ASP.NET Core backend web API. The client-side Blazor WebAssembly app calls the server-side web API for secure app features and data processing.

Blazor WebAssembly apps are often prevented from making direct calls across origins to web APIs due to [Cross-Origin Request Sharing (CORS) security](#cross-origin-resource-sharing-cors). A typical exception looks like the following:

> Access to fetch at '{URL}' from origin 'https\://localhost:{PORT}' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Even if you call [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestMode%252A) with a [Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestMode) field of `NoCors` (1) seeking to circumvent the preceding exception, the request often fails due to CORS restrictions on the web API's origin, such as a restriction that only allows calls from specific origins or a restriction that prevents JavaScript [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch) requests from a browser. The only way for such calls to succeed is for the web API that you're calling to allow your origin to call its origin with the correct CORS configuration. Most external web APIs don't allow you to configure their CORS policies. To deal with this restriction, adopt either of the following strategies:

* Maintain your own server-side ASP.NET Core backend web API. The client-side Blazor WebAssembly app calls your server-side web API, and your web API makes the request from its server-based C# code (not a browser) to the external web API with the correct CORS headers, returning the result to your client-side Blazor WebAssembly app.

* Use a proxy service to proxy the request from the client-side Blazor WebAssembly app to the external web API. The proxy service uses a server-side app to make the request on the client's behalf and returns the result after the call succeeds. In the following example based on [CloudFlare's CORS PROXY](https://corsproxy.io/), the `{REQUEST URI}` placeholder is the request URI:

  ```razor
  @using System.Net
  @inject IHttpClientFactory ClientFactory

  ...

  @code {
      public async Task CallApi()
      {
          var client = ClientFactory.CreateClient();

          var urlEncodedRequestUri = WebUtility.UrlEncode("{REQUEST URI}");

          using var request = new HttpRequestMessage(HttpMethod.Get, 
              $"https://corsproxy.io/?{urlEncodedRequestUri}");

          using var response = await client.SendAsync(request);

          ...
      }
  }
  ```

## Add the `HttpClient` service

*The guidance in this section applies to client-side scenarios.*

Client-side components call web APIs using a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) service, which is focused on making requests back to the server of origin. Additional [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) service configurations for other web APIs can be created in developer code. Requests are composed using Blazor JSON helpers or with [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage). Requests can include [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) option configuration.

The configuration examples in this section are only useful when a single web API is called for a single [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instance in the app. When the app must call multiple web APIs, each with its own base address and configuration, you can adopt the following approaches, which are covered in the next two sections of this article:

* [Named `HttpClient` with `IHttpClientFactory`](#named-httpclient-with-ihttpclientfactory): Each web API is provided a unique name. When app code or a Razor component calls a web API, it uses a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instance to make the call.
* [Typed `HttpClient`](#typed-httpclient): Each web API is typed. When app code or a Razor component calls a web API, it uses a typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instance to make the call.

In the `Program` file, add an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) service if it isn't already present from a Blazor project template used to create the app:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
```

The preceding example sets the base address with `builder.HostEnvironment.BaseAddress` ([Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%252A)), which gets the base address for the app and is typically derived from the `<base>` tag's `href` value in the host page.

The most common use cases for using the client's own base address are:

* The client project (`.Client`) of a Blazor Web App (.NET 8 or later) makes web API calls from WebAssembly components or code that runs on the client in WebAssembly to APIs in the server app.
* The client project (**Client**) of a hosted Blazor WebAssembly app makes web API calls to the server project (**Server**). Note that the Hosted Blazor WebAssembly project template is no longer available in .NET 8 or later. However, hosted Blazor WebAssembly apps remain supported for .NET 8.

If you're calling an external web API (not in the same URL space as the client app), set the URI to the web API's base address. The following example sets the base address of the web API to `https://localhost:5001`, where a separate web API app is running and ready to respond to requests from the client app:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient { BaseAddress = new Uri("https://localhost:5001") });
```

## Named `HttpClient` with `IHttpClientFactory`

*The guidance in this section applies to using a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) in a Blazor WebAssembly app, the `.Client` project of a Blazor Web App, and for prerendered client-side components of a Blazor Web App. For general guidance on HTTP client patterns in ASP.NET Core apps (for example, when you use an HTTP client only in the server project of a Blazor Web App or in a Blazor Server app), see [fundamentals/http-requests#review-consumption-patterns](https://learn.microsoft.com/search/?terms=fundamentals%2Fhttp-requests%23review-consumption-patterns).*

[System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) services and the configuration of a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) are supported for classes and Razor components in a Blazor WebAssembly app, the `.Client` project of a Blazor Web App, and for prerendered client-side components in a Blazor Web App.

> **Note:**
> An alternative to using a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) from an [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) is to use a typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient). For more information, see the [Typed `HttpClient`](#typed-httpclient) section.

Add the [`Microsoft.Extensions.Http`](https://www.nuget.org/packages/Microsoft.Extensions.Http) NuGet package to the project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


In the `Program` file of the project, register HTTP client services, giving a name to the client. In the following example, the name is `WebAPI`:

```csharp
builder.Services.AddHttpClient("WebAPI", client => 
    client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress));
```



**Applies to: \>= aspnetcore-8.0**

If the named client is to be used by prerendered client-side components of a Blazor Web App, the preceding service registration should appear in both the server project and the `.Client` project. On the server, `builder.HostEnvironment.BaseAddress` is replaced by the web API's base address, which is described further below.



The preceding client-side example sets the base address with `builder.HostEnvironment.BaseAddress` ([Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%252A)), which gets the base address for the client-side app and is typically derived from the `<base>` tag's `href` value in the host page.

**Applies to: \>= aspnetcore-8.0**

The most common use cases for using the client's own base address are:

* The client project (`.Client`) of a Blazor Web App that makes web API calls from WebAssembly/Auto components or code that runs on the client in WebAssembly to APIs in the server app at the same host address.
* The client project (**Client**) of a hosted Blazor WebAssembly app that makes web API calls to the server project (**Server**).



**Applies to: < aspnetcore-8.0**

The most common use case for using the client's own base address is in the client project (**Client**) of a hosted Blazor WebAssembly app that makes web API calls to the server project (**Server**).



If you're calling an external web API (not in the same URL space as the client app) or you're configuring the services in a server-side app (for example to deal with prerendering of client-side components on the server), set the URI to the web API's base address. The following example sets the base address of the web API to `https://localhost:5001`, where a separate web API app is running and ready to respond to requests from the client app:

```csharp
builder.Services.AddHttpClient("WebAPI", client => 
    client.BaseAddress = new Uri("https://localhost:5001"));
```

In the following component code:

* An instance of [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) creates a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient).
* The named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is used to issue a GET request for JSON weather forecast data from the web API at `/forecast`.

```razor
@inject IHttpClientFactory ClientFactory

...

@code {
    private Forecast[]? forecasts;

    protected override async Task OnInitializedAsync()
    {
        var client = ClientFactory.CreateClient("WebAPI");

        forecasts = await client.GetFromJsonAsync<Forecast[]>("forecast") ?? [];
    }
}
```

**Applies to: \>= aspnetcore-8.0**

The `BlazorWebAppCallWebApi` [sample app](#sample-apps) demonstrates calling a web API with a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) in its `CallTodoWebApiCsrNamedClient` component. For an additional working demonstration in a client app based on calling Microsoft Graph with a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient), see [blazor/security/webassembly/graph-api](security/webassembly/graph-api.md).



**Applies to: < aspnetcore-8.0**

For a working demonstration in a client app based on calling Microsoft Graph with a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient), see [blazor/security/webassembly/graph-api](security/webassembly/graph-api.md).



## Typed `HttpClient`

*The guidance in this section applies to using a typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) in a Blazor WebAssembly app, the `.Client` project of a Blazor Web App, and for prerendered client-side components of a Blazor Web App. For general guidance on HTTP client patterns in ASP.NET Core apps (for example, when you use an HTTP client only in the server project of a Blazor Web App or in a Blazor Server app), see [fundamentals/http-requests#review-consumption-patterns](https://learn.microsoft.com/search/?terms=fundamentals%2Fhttp-requests%23review-consumption-patterns).*

Typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) uses one or more of the app's [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances, default or named, to return data from one or more web API endpoints. Typed clients are supported for classes and Razor components in a Blazor WebAssembly app, the `.Client` project of a Blazor Web App, and for prerendered client-side components in a Blazor Web App.

> **Note:**
> An alternative to using a typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is to use a named [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) from an [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory). For more information, see the [Named `HttpClient` with `IHttpClientFactory`](#named-httpclient-with-ihttpclientfactory) section.

Add the [`Microsoft.Extensions.Http`](https://www.nuget.org/packages/Microsoft.Extensions.Http) NuGet package to the project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


The following example issues a GET request for JSON weather forecast data from the web API at `/forecast`.

`ForecastHttpClient.cs`:

```csharp
using System.Net.Http.Json;

namespace BlazorSample.Client;

public class ForecastHttpClient(HttpClient http)
{
    public async Task<Forecast[]> GetForecastAsync() => 
        await http.GetFromJsonAsync<Forecast[]>("forecast") ?? [];
}
```

In the `Program` file of the project:

```csharp
builder.Services.AddHttpClient<ForecastHttpClient>(client => 
    client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress));
```

**Applies to: \>= aspnetcore-8.0**

If the typed client is to be used by prerendered client-side components of a Blazor Web App, the preceding service registration should appear in both the server project and the `.Client` project. On the server, `builder.HostEnvironment.BaseAddress` is replaced by the web API's base address, which is described further below.



The preceding example sets the base address with `builder.HostEnvironment.BaseAddress` ([Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%252A)), which gets the base address for the client-side app and is typically derived from the `<base>` tag's `href` value in the host page.

**Applies to: \>= aspnetcore-8.0**

The most common use cases for using the client's own base address are:

* The client project (`.Client`) of a Blazor Web App that makes web API calls from WebAssembly/Auto components or code that runs on the client in WebAssembly to APIs in the server app at the same host address.
* The client project (**Client**) of a hosted Blazor WebAssembly app that makes web API calls to the server project (**Server**).



**Applies to: < aspnetcore-8.0**

The most common use case for using the client's own base address is in the client project (**Client**) of a hosted Blazor WebAssembly app that makes web API calls to the server project (**Server**).



If you're calling an external web API (not in the same URL space as the client app) or you're configuring the services in a server-side app (for example to deal with prerendering of client-side components on the server), set the URI to the web API's base address. The following example sets the base address of the web API to `https://localhost:5001`, where a separate web API app is running and ready to respond to requests from the client app:

```csharp
builder.Services.AddHttpClient<ForecastHttpClient>(client => 
    client.BaseAddress = new Uri("https://localhost:5001"));
```

Components inject the typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) to call the web API.

In the following component code:

* An instance of the preceding `ForecastHttpClient` is injected, which creates a typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient).
* The typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is used to issue a GET request for JSON weather forecast data from the web API.

```razor
@inject ForecastHttpClient Http

...

@code {
    private Forecast[]? forecasts;

    protected override async Task OnInitializedAsync()
    {
        forecasts = await Http.GetForecastAsync();
    }
}
```

**Applies to: \>= aspnetcore-8.0**

The `BlazorWebAppCallWebApi` [sample app](#sample-apps) demonstrates calling a web API with a typed [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) in its `CallTodoWebApiCsrTypedClient` component. Note that the component adopts and client-side rendering (CSR) (`InteractiveWebAssembly` render mode) ***with prerendering***, so the typed client service registration appears in the `Program` file of both the server project and the `.Client` project.



**Applies to: \>= aspnetcore-8.0**

## Accessing services outside of the `HttpClient`'s scope

[System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) creates [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) instances in a separate dependency injection (DI) scope from the app. If you inject a scoped service into a derived [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) type, the handler doesn't have access to the service from the Blazor circuit.

For an example of how to access a service in outgoing request middleware using either an application scope handler or a circuit activity handler, see [blazor/security/additional-scenarios#access-authenticationstateprovider-in-outgoing-request-middleware](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23access-authenticationstateprovider-in-outgoing-request-middleware).

For more information on [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) instances, see [fundamentals/http-requests#outgoing-request-middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Fhttp-requests%23outgoing-request-middleware).



## Disposal of `HttpRequestMessage`, `HttpResponseMessage`, and `HttpClient`

An [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage) without a body doesn't require explicit disposal. However, you can dispose of it with either of the following patterns:

* `using` declaration (C# 8 or later):

  ```csharp
  using var request = new HttpRequestMessage(...);
  ```
  
* [`using` block (all C# releases)](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using):

  ```csharp
  using (var request = new HttpRequestMessage(...))
  {
      ...
  }
  ```

We recommend disposing of every [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage) with every use for the following reasons:

* To gain a performance improvement by avoiding finalizers.
* It hardens the code for the future in case a request body is ever added to an [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage) that didn't initially have one.
* To potentially avoid functional issues if a delegating handler expects a call to [System.IDisposable.Dispose%2A](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose%252A)/[System.IAsyncDisposable.DisposeAsync%2A](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync%252A).
* It's simpler to apply a general rule everywhere than trying to remember specific cases.

***Always*** dispose of [System.Net.Http.HttpResponseMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage) instances.

***Never*** dispose of [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances created by calling [System.Net.Http.IHttpClientFactory.CreateClient%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory.CreateClient%252A) because they're managed by the framework.

Example:

```csharp
using var request = new HttpRequestMessage(HttpMethod.Get, "/weather-forecast");
var client = clientFactory.CreateClient("ExternalApi");
using var response = await client.SendAsync(request);
```

## Prerendered data

When prerendering, components render twice: first statically, then interactively. State doesn't automatically flow from the prerendered component to the interactive one. If a component performs asynchronous initialization operations and renders different content for different states during initialization, such as a "Loading..." progress indicator, you may see a flicker when the component renders twice.

You can address this by flowing prerendered state using the Persistent Component State API, which the `BlazorWebAppCallWebApi` and `BlazorWebAppCallWebApi_Weather` [sample apps](#sample-apps) demonstrate. When the component renders interactively, it can render the same way using the same state. For more information, see the following resources:

* [blazor/state-management/prerendered-state-persistence](state-management/prerendered-state-persistence.md)
* [blazor/fundamentals/navigation#enhanced-navigation-and-form-handling](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling)

**Applies to: < aspnetcore-10.0**

> **Note:**
> The Persistent Component State API only supports enhanced navigation in .NET 10 or later. For apps that target .NET 8 or .NET 9, you can disable enhanced navigation on links to the page with the `data-enhance-nav` attribute set to `false`. For more information, see [blazor/fundamentals/navigation#enhanced-navigation-and-form-handling](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling).



## JSON helpers

The [`System.Net.Http.Json` package](https://www.nuget.org/packages/System.Net.Http.Json) provides extension methods for [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) and [System.Net.Http.HttpContent](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpContent) that perform automatic serialization and deserialization using [`System.Text.Json`](https://www.nuget.org/packages/System.Text.Json). The `System.Net.Http.Json` package is provided by the .NET shared framework and doesn't require adding a package reference to the app.

[System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is available as a preconfigured service for making requests back to the origin server. [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) and JSON helpers ([System.Net.Http.Json.HttpClientJsonExtensions](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions)) are also used to call third-party web API endpoints. [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) is implemented using the browser's [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) and is subject to its limitations, including enforcement of the same-origin policy, which is discussed later in this article in the *Cross-Origin Resource Sharing (CORS)* section.

The client's base address is set to the originating server's address. Inject an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instance into a component using the [`@inject`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23inject) directive:

```razor
@using System.Net.Http
@inject HttpClient Http
```

Use the [System.Net.Http.Json](https://learn.microsoft.com/search/?terms=System.Net.Http.Json) namespace for access to [System.Net.Http.Json.HttpClientJsonExtensions](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions), including [System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%252A), [System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync%252A), and [System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync%252A):

```razor
@using System.Net.Http.Json
```

The following sections cover JSON helpers:

* [GET](#get-from-json-getfromjsonasync)
* [POST](#post-as-json-postasjsonasync)
* [PUT](#put-as-json-putasjsonasync)
* [PATCH](#patch-as-json-patchasjsonasync)

[System.Net.Http](https://learn.microsoft.com/search/?terms=System.Net.Http) includes additional methods for sending HTTP requests and receiving HTTP responses, for example to send a DELETE request. For more information, see the [DELETE and additional extension methods](#delete-deleteasync-and-additional-extension-methods) section.

## GET from JSON (`GetFromJsonAsync`)

[System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%252A) sends an HTTP GET request and parses the JSON response body to create an object.

In the following component code, the `todoItems` are displayed by the component. [System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%252A) is called when the component is finished initializing ([`OnInitializedAsync`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23component-initialization-oninitializedasync)).

```csharp
todoItems = await Http.GetFromJsonAsync<TodoItem[]>("todoitems");
```

## POST as JSON (`PostAsJsonAsync`)

[System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync%252A) sends a POST request to the specified URI containing the value serialized as JSON in the request body.

In the following component code, `newItemName` is provided by a bound element of the component. The `AddItem` method is triggered by selecting a `<button>` element.

```csharp
await Http.PostAsJsonAsync("todoitems", addItem);
```

[System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync%252A) returns an [System.Net.Http.HttpResponseMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage). To deserialize the JSON content from the response message, use the [System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync%252A) extension method. The following example reads JSON weather data as an array:

```csharp
var content = await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ?? 
    Array.Empty<WeatherForecast>();
```

## PUT as JSON (`PutAsJsonAsync`)

[System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync%252A) sends an HTTP PUT request with JSON-encoded content.

In the following component code, `editItem` values for `Name` and `IsCompleted` are provided by bound elements of the component. The item's `Id` is set when the item is selected in another part of the UI (not shown) and `EditItem` is called. The `SaveItem` method is triggered by selecting the `<button>` element. The following example doesn't show loading `todoItems` for brevity. See the [GET from JSON (`GetFromJsonAsync`)](#get-from-json-getfromjsonasync) section for an example of loading items.

```csharp
await Http.PutAsJsonAsync($"todoitems/{editItem.Id}", editItem);
```

[System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync%252A) returns an [System.Net.Http.HttpResponseMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage). To deserialize the JSON content from the response message, use the [System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync%252A) extension method. The following example reads JSON weather data as an array:

```csharp
var content = await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ?? 
    Array.Empty<WeatherForecast>();
```

**Applies to: \>= aspnetcore-7.0**

## PATCH as JSON (`PatchAsJsonAsync`)

[System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync%252A) sends an HTTP PATCH request with JSON-encoded content.

> **Note:**
> For more information, see [web-api/jsonpatch](../web-api/jsonpatch.md).

In the following example, [System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync%252A) receives a JSON PATCH document as a plain text string with escaped quotes:

```csharp
await Http.PatchAsJsonAsync(
    $"todoitems/{id}", 
    "[{\"operationType\":2,\"path\":\"/IsComplete\",\"op\":\"replace\",\"value\":true}]");
```

As of C# 11 (.NET 7), you can compose a JSON string as a [raw string literal](https://learn.microsoft.com/dotnet/csharp/language-reference/tokens/raw-string). Specify JSON syntax with the [System.Diagnostics.CodeAnalysis.StringSyntaxAttribute.Json%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.StringSyntaxAttribute.Json%252A) field to the [`[StringSyntax]` attribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.StringSyntaxAttribute) for code analysis tooling:

```razor
@using System.Diagnostics.CodeAnalysis

...

@code {
    [StringSyntax(StringSyntaxAttribute.Json)]
    private const string patchOperation =
        """[{"operationType":2,"path":"/IsComplete","op":"replace","value":true}]""";

    ...

    await Http.PatchAsJsonAsync($"todoitems/{id}", patchOperation);
}
```

[System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync%252A) returns an [System.Net.Http.HttpResponseMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage). To deserialize the JSON content from the response message, use the [System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync%252A) extension method. The following example reads JSON todo item data as an array. An empty array is created if no item data is returned by the method, so `content` isn't null after the statement executes:

```csharp
using var response = await Http.PatchAsJsonAsync(...);
var content = await response.Content.ReadFromJsonAsync<TodoItem[]>() ??
    Array.Empty<TodoItem>();
```

Laid out with indentation, spacing, and unescaped quotes, the unencoded PATCH document appears as the following JSON:

```json
[
  {
    "operationType": 2,
    "path": "/IsComplete",
    "op": "replace",
    "value": true
  }
]
```

To simplify the creation of PATCH documents in the app issuing PATCH requests, an app can use .NET JSON PATCH support, as the following guidance demonstrates.



**Applies to: \>= aspnetcore-10.0**

Install the [`Microsoft.AspNetCore.JsonPatch.SystemTextJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.JsonPatch.SystemTextJson) NuGet package and use the API features of the package to compose a [Microsoft.AspNetCore.JsonPatch.JsonPatchDocument](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.JsonPatchDocument) for a PATCH request.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Add `@using` directives for the [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json), [System.Text.Json.Serialization](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization), and `Microsoft.AspNetCore.JsonPatch.SystemTextJson` <!-- <xref:Microsoft.AspNetCore.JsonPatch.SystemTextJson?displayProperty=fullName> --> namespaces to the top of the Razor component:

```razor
@using System.Text.Json
@using System.Text.Json.Serialization
@using Microsoft.AspNetCore.JsonPatch.SystemTextJson
```

Compose the `JsonPatchDocument` for a `TodoItem` with `IsComplete` set to `true` using the `JsonPatchDocument.Replace` method:

```csharp
var patchDocument = new JsonPatchDocument<TodoItem>()
    .Replace(p => p.IsComplete, true);
```



**Applies to: \>= aspnetcore-7.0 < aspnetcore-10.0**

Install the [`Microsoft.AspNetCore.JsonPatch`](https://www.nuget.org/packages/Microsoft.AspNetCore.JsonPatch) NuGet package and use the API features of the package to compose a [Microsoft.AspNetCore.JsonPatch.JsonPatchDocument](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.JsonPatchDocument) for a PATCH request.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Add `@using` directives for the [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json), [System.Text.Json.Serialization](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization), and [Microsoft.AspNetCore.JsonPatch](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch) namespaces to the top of the Razor component:

```razor
@using System.Text.Json
@using System.Text.Json.Serialization
@using Microsoft.AspNetCore.JsonPatch
```

Compose the [Microsoft.AspNetCore.JsonPatch.JsonPatchDocument](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.JsonPatchDocument) for a `TodoItem` with `IsComplete` set to `true` using the [Microsoft.AspNetCore.JsonPatch.JsonPatchDocument.Replace%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.JsonPatchDocument.Replace%252A) method:

```csharp
var patchDocument = new JsonPatchDocument<TodoItem>()
    .Replace(p => p.IsComplete, true);
```



**Applies to: \>= aspnetcore-7.0**

Pass the document's operations (`patchDocument.Operations`) to the [System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync%252A) call:

```csharp
private async Task UpdateItem(long id)
{
    await Http.PatchAsJsonAsync(
        $"todoitems/{id}", 
        patchDocument.Operations, 
        new JsonSerializerOptions()
        {
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
        });
}
```

[System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition) is set to [System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault) to ignore a property only if it equals the default value for its type.

Add [System.Text.Json.JsonSerializerOptions.WriteIndented](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.WriteIndented) set to `true` if you want to present the JSON payload in a pleasant format for display. Writing indented JSON has no bearing on processing PATCH requests and isn't typically performed in production apps for web API requests.

Follow the guidance in the [web-api/jsonpatch](../web-api/jsonpatch.md) article to add a PATCH controller action to the web API. Alternatively, PATCH request processing can be implemented as a [Minimal API](../fundamentals/minimal-apis.md) with the following steps.



**Applies to: \>= aspnetcore-10.0**

Add a package reference for the [`Microsoft.AspNetCore.JsonPatch.SystemTextJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.JsonPatch.SystemTextJson) NuGet package to the web API app.

In the `Program` file add an `@using` directive for the [Microsoft.AspNetCore.JsonPatch.SystemTextJson](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch.SystemTextJson) namespace:

```csharp
using Microsoft.AspNetCore.JsonPatch.SystemTextJson;
```



**Applies to: \>= aspnetcore-7.0 < aspnetcore-10.0**

Add a package reference for the [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson) NuGet package to the web API app.

> **Note:**
> There's no need to add a package reference for the [`Microsoft.AspNetCore.JsonPatch` package](https://www.nuget.org/packages/Microsoft.AspNetCore.JsonPatch) to the app because the reference to the `Microsoft.AspNetCore.Mvc.NewtonsoftJson` package automatically transitively adds a package reference for `Microsoft.AspNetCore.JsonPatch`.

In the `Program` file add an `@using` directive for the [Microsoft.AspNetCore.JsonPatch](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch) namespace:

```csharp
using Microsoft.AspNetCore.JsonPatch;
```



**Applies to: \>= aspnetcore-7.0**

Provide the endpoint to the request processing pipeline of the web API:

```csharp
app.MapPatch("/todoitems/{id}", async (long id, TodoContext db) =>
{
    if (await db.TodoItems.FindAsync(id) is TodoItem todo)
    {
        var patchDocument = 
            new JsonPatchDocument<TodoItem>().Replace(p => p.IsComplete, true);
        patchDocument.ApplyTo(todo);
        await db.SaveChangesAsync();

        return TypedResults.Ok(todo);
    }

    return TypedResults.NotFound();
});
```

> **Warning:**
> As with the other examples in the [web-api/jsonpatch](../web-api/jsonpatch.md) article, the preceding PATCH API doesn't protect the web API from over-posting attacks. For more information, see [tutorials/first-web-api#prevent-over-posting](https://learn.microsoft.com/search/?terms=tutorials%2Ffirst-web-api%23prevent-over-posting).

For a fully working PATCH experience, see the `BlazorWebAppCallWebApi` [sample app](#sample-apps).



## DELETE (`DeleteAsync`) and additional extension methods

[System.Net.Http](https://learn.microsoft.com/search/?terms=System.Net.Http) includes additional extension methods for sending HTTP requests and receiving HTTP responses. [System.Net.Http.HttpClient.DeleteAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.DeleteAsync%252A) is used to send an HTTP DELETE request to a web API.

In the following component code, the `<button>` element calls the `DeleteItem` method. The bound `<input>` element supplies the `id` of the item to delete.

```csharp
await Http.DeleteAsync($"todoitems/{id}");
```

**Applies to: \>= aspnetcore-9.0**

## Client-side request streaming

For Chromium-based browsers (for example, Google Chrome and Microsoft Edge) using the HTTP/2 protocol, and HTTPS, client-side Blazor uses [Streams API](https://developer.mozilla.org/docs/Web/API/Streams_API) to permit [request streaming](https://developer.chrome.com/docs/capabilities/web-apis/fetch-streaming-requests).

To enable request streaming, set [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestStreamingEnabled%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestStreamingEnabled%252A) to `true` on the [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage).

In the following file upload example:

* `content` is the file's [System.Net.Http.HttpContent](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpContent).
* `/Filesave` is the web API endpoint.
* `Http` is the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient).

```csharp
using var request = new HttpRequestMessage(HttpMethod.Post, "/Filesave");
request.SetBrowserRequestStreamingEnabled(true);
request.Content = content;

using var response = await Http.SendAsync(request);
```

Streaming requests:

* Require HTTPS protocol and don't work on HTTP/1.x.
* Include a body but not a `Content-Length` header. [CORS](../security/cors.md) with a preflight request is required for cross-origin streaming requests.

For more information on file uploads with an [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component, see [blazor/file-uploads#file-size-read-and-upload-limits](https://learn.microsoft.com/search/?terms=blazor%2Ffile-uploads%23file-size-read-and-upload-limits) and the example at [Upload files to a server with client-side rendering (CSR)](https://learn.microsoft.com/search/?terms=blazor%2Ffile-uploads%23upload-files-to-a-server-with-client-side-rendering-csr).



## Cookie-based request credentials

*The guidance in this section applies to client-side scenarios that rely upon an authentication cookie.*

For cookie-based authentication, which is considered more secure than bearer token authentication, cookie credentials can be sent with each web API request by calling [Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler%252A) with a [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler) on a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient). The handler configures [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials%252A) with [Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestCredentials.Include](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestCredentials.Include), which advises the browser to send credentials with each request, such as cookies or HTTP authentication headers, including for cross-origin requests.

`CookieHandler.cs`:

```csharp
public class CookieHandler : DelegatingHandler
{
    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
        request.Headers.Add("X-Requested-With", [ "XMLHttpRequest" ]);

        return base.SendAsync(request, cancellationToken);
    }
}
```

> **Note:**
> For guidance on how to access an `AuthenticationStateProvider` from a `DelegatingHandler`, see [blazor/security/additional-scenarios#access-authenticationstateprovider-in-outgoing-request-middleware](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23access-authenticationstateprovider-in-outgoing-request-middleware).

The `CookieHandler` is registered in the `Program` file:

```csharp
builder.Services.AddTransient<CookieHandler>();
```

The message handler is added to any preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) that requires cookie authentication:

```csharp
builder.Services.AddHttpClient(...)
    .AddHttpMessageHandler<CookieHandler>();
```

**Applies to: \>= aspnetcore-8.0**

For a demonstration, see [blazor/security/webassembly/standalone-with-identity/index](security/webassembly/standalone-with-identity/index.md).



When composing an [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage), set the browser request credentials and header directly:

```csharp
using var request = new HttpRequestMessage() { ... };

request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
request.Headers.Add("X-Requested-With", [ "XMLHttpRequest" ]);
```

## Use a token handler for web API calls

Blazor Web Apps with OIDC authentication can use a token handler approach to make outgoing requests to secure external web API calls. This approach is used by the `BlazorWebAppOidc` and `BlazorWebAppOidcServer` sample apps described in the *Sample apps* section of this article.

For more information, see the following resources:

* [blazor/security/additional-scenarios#use-a-token-handler-for-web-api-calls](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23use-a-token-handler-for-web-api-calls)
* *Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC)*
  * [Without YARP and Aspire (Interactive Auto)](security/blazor-web-app-with-oidc.md)
  * [Without YARP and Aspire (Interactive Server)](security/blazor-web-app-with-oidc.md)

## Microsoft identity platform for web API calls

Blazor Web Apps that use use [Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/) with [Microsoft Identity Web packages](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) for [Microsoft Entra ID](https://www.microsoft.com/security/business/microsoft-entra) can make streamlined web API calls with API provided by the [`Microsoft.Identity.Web.DownstreamApi` NuGet package](https://www.nuget.org/packages/Microsoft.Identity.Web.DownstreamApi).

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


In the app settings file (`appsettings.json`), provide a base URL and scopes. In the following example, the `{BASE ADDRESS}` placeholder is the base URL of the web API. A single scope is specified with an App ID URI (`{APP ID URI}` placeholder) and scope name (`{SCOPE NAME}` placeholder):

```json
"DownstreamApi": {
  "BaseUrl": "{BASE ADDRESS}",
  "Scopes": [ "{APP ID URI}/{SCOPE NAME}" ]
}
```

Example:

```json
"DownstreamApi": {
  "BaseUrl": "https://localhost:7277",
  "Scopes": [ "api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get" ]
}
```

In the app's `Program` file, call:

* [Microsoft.Identity.Web.MicrosoftIdentityWebApiAuthenticationBuilder.EnableTokenAcquisitionToCallDownstreamApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.MicrosoftIdentityWebApiAuthenticationBuilder.EnableTokenAcquisitionToCallDownstreamApi%252A): Enables token acquisition to call web APIs.
* [Microsoft.Identity.Web.DownstreamApiExtensions.AddDownstreamApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.DownstreamApiExtensions.AddDownstreamApi%252A): Microsoft Identity Web packages provide API to create a named downstream web service for making web API calls. [Microsoft.Identity.Abstractions.IDownstreamApi](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Abstractions.IDownstreamApi) is injected into a server-side class, which is used to call [Microsoft.Identity.Abstractions.IDownstreamApi.CallApiForUserAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Abstractions.IDownstreamApi.CallApiForUserAsync%252A) to obtain weather data from an external web API (`MinimalApiJwt` project).
* [Microsoft.Identity.Web.TokenCacheProviders.Distributed.DistributedTokenCacheAdapterExtension.AddDistributedTokenCaches%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.DistributedTokenCacheAdapterExtension.AddDistributedTokenCaches%252A): Adds the .NET distributed token caches to the service collection.
* [Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache%252A): Adds a default implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) that stores cache items in memory.
* Configure the distributed token cache options ([Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions)):
  * In development for debugging purposes, you can disable the L1 cache by setting [Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.DisableL1Cache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.DisableL1Cache%252A) to `true`. ***Be sure to reset it back to `false` for production.***
  * Set the maximum size of your L1 cache with [`L1CacheOptions.SizeLimit`](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.SizeLimit%252A) to prevent the cache from overrunning the server's memory. The default value is 500 MB.
  * In development for debugging purposes, you can disable token encryption at rest by setting [Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt%252A) to `false`, which is the default value. ***Be sure to reset it back to `true` for production.***
  * Set token eviction from the cache with [Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions.SlidingExpiration%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions.SlidingExpiration%252A). The default value is 1 hour.
  * For more information, including guidance on the callback for L2 cache failures ([Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.OnL2CacheFailure%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.OnL2CacheFailure%252A)) and asynchronous L2 cache writes ([Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.EnableAsyncL2Write%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.EnableAsyncL2Write%252A)), see [Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions) and [Token cache serialization: Distributed token caches](https://learn.microsoft.com/entra/msal/dotnet/how-to/token-cache-serialization#distributed-token-caches).

You can choose to encrypt the cache and should always do so in production.

```csharp
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"))
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddDownstreamApi("DownstreamApi", 
        builder.Configuration.GetSection("DownstreamApi"))
    .AddDistributedTokenCaches();

// Requires the 'Microsoft.Extensions.Caching.Memory' NuGet package
builder.Services.AddDistributedMemoryCache();

builder.Services.Configure<MsalDistributedTokenCacheAdapterOptions>(
    options => 
    {
        // The following lines that are commented out reflect
        // default values. We recommend overriding the default
        // value of Encrypt to encrypt tokens at rest.

        //options.DisableL1Cache = false;
        //options.L1CacheOptions.SizeLimit = 500 * 1024 * 1024;
        options.Encrypt = true;
        //options.SlidingExpiration = TimeSpan.FromHours(1);
    });
```

In-memory distributed token caches are created when calling [Microsoft.Identity.Web.TokenCacheProviders.Distributed.DistributedTokenCacheAdapterExtension.AddDistributedTokenCaches%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.DistributedTokenCacheAdapterExtension.AddDistributedTokenCaches%252A) to ensure that there's a base implementation available for distributed token caching.

Production web apps and web APIs should use a production distributed token cache (for example: [Redis](https://redis.io/), [Microsoft SQL Server](https://www.microsoft.com/sql-server), [Microsoft Azure Cosmos DB](https://azure.microsoft.com/products/cosmos-db)).

> **Note:**
> For local development and testing on a single machine, you can use in-memory token caches instead of distributed token caches:
>
> ```csharp
> builder.Services.AddInMemoryTokenCaches();
> ```
>
> Later in the development and testing period, adopt a production distributed token cache provider.

[Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache%252A) adds a default implementation of [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) that stores cache items in memory, which is used by Microsoft Identity Web for token caching.

[Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache%252A) requires a package reference to the [`Microsoft.Extensions.Caching.Memory` NuGet package](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Memory).

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


To configure a production distributed cache provider, see [performance/caching/distributed](../performance/caching/distributed.md). 

> **Warning:**
> Always replace the in-memory distributed token caches with a real token cache provider when deploying the app to a production environment. If you fail to adopt a production distributed token cache provider, the app may suffer significantly degraded performance.

For more information, see [Token cache serialization: Distributed caches](https://learn.microsoft.com/entra/msal/dotnet/how-to/token-cache-serialization?tabs=msal#distributed-caches). However, the code examples shown don't apply to ASP.NET Core apps, which configure distributed caches via [Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache%252A), not [Microsoft.Identity.Web.TokenCacheExtensions.AddDistributedTokenCache%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheExtensions.AddDistributedTokenCache%252A).

<!-- DOC AUTHOR NOTE: The next part on using a shared DP key ring is also
                      covered in the *BWA + Entra* security article. Mirror 
                      changes when updating this portion of content. -->

Use a shared Data Protection key ring in production so that instances of the app across servers in a web farm can decrypt tokens when [Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt%252A) is set to `true`.

> **Note:**
> For early development and local testing on a single machine, you can set [Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt%252A) to `false` and configure a shared Data Protection key ring later:
>
> ```csharp
> options.Encrypt = false;
> ```
>
> Later in the development and testing period, enable token encryption and adopt a shared Data Protection key ring.

The following example shows how to use [Azure Blob Storage and Azure Key Vault (`PersistKeysToAzureBlobStorage`/`ProtectKeysWithAzureKeyVault`)](https://learn.microsoft.com/search/?terms=security%2Fdata-protection%2Fconfiguration%2Foverview%23protect-keys-with-azure-key-vault-protectkeyswithazurekeyvault) for the shared key ring. The service configurations are base case scenarios for demonstration purposes. Before deploying production apps, familiarize yourself with the Azure services and adopt best practices using the Azure services' dedicated documentation sets, which are linked at the end of this section.

Add the following packages to the server project of the Blazor Web App:

* [`Azure.Extensions.AspNetCore.DataProtection.Blobs`](https://www.nuget.org/packages/Azure.Extensions.AspNetCore.DataProtection.Blobs)
* [`Azure.Extensions.AspNetCore.DataProtection.Keys`](https://www.nuget.org/packages/Azure.Extensions.AspNetCore.DataProtection.Keys)

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


> **Note:**
> Before proceeding with the following steps, confirm that the app is registered with Microsoft Entra.

Configure Azure Blob Storage to maintain data protection keys. Follow the guidance in [security/data-protection/implementation/key-storage-providers#azure-storage](https://learn.microsoft.com/search/?terms=security%2Fdata-protection%2Fimplementation%2Fkey-storage-providers%23azure-storage).

Configure Azure Key Vault to encrypt the data protection keys at rest. Follow the guidance in [security/data-protection/configuration/overview#protect-keys-with-azure-key-vault-protectkeyswithazurekeyvault](https://learn.microsoft.com/search/?terms=security%2Fdata-protection%2Fconfiguration%2Foverview%23protect-keys-with-azure-key-vault-protectkeyswithazurekeyvault).

Use the following code in the `Program` file where services are registered:

```csharp
TokenCredential? credential;

if (builder.Environment.IsProduction())
{
    credential = new ManagedIdentityCredential("{MANAGED IDENTITY CLIENT ID}");
}
else
{
    // Local development and testing only
    DefaultAzureCredentialOptions options = new()
    {
        // Specify the tenant ID to use the dev credentials when running the app locally
        // in Visual Studio.
        VisualStudioTenantId = "{TENANT ID}",
        SharedTokenCacheTenantId = "{TENANT ID}"
    };

    credential = new DefaultAzureCredential(options);
}

builder.Services.AddDataProtection()
    .SetApplicationName("{APPLICATION NAME}")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI}"), credential)
    .ProtectKeysWithAzureKeyVault(new Uri("{KEY IDENTIFIER}"), credential);
```

`{MANAGED IDENTITY CLIENT ID}`: The Azure Managed Identity Client ID (GUID).

`{TENANT ID}`: Tenant ID.

`{APPLICATION NAME}`: [Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName%252A) sets the unique name of this app within the data protection system. The value should match across deployments of the app.

`{BLOB URI}`: Full URI to the key file. The URI is generated by Azure Storage when you create the key file. Do not use a SAS.

`{KEY IDENTIFIER}`: Azure Key Vault key identifier used for key encryption. An access policy allows the application to access the key vault with `Get`, `Unwrap Key`, and `Wrap Key` permissions. The key identifier is obtained from the key in the Entra or Azure portal after it's created. If you enable autorotation of the key vault key, make sure that you use a versionless key identifier in the app's key vault configuration, where no key GUID is placed at the end of the identifier (example: `https://contoso.vault.azure.net/keys/data-protection`).

> **Note:**
> In non-`Production` environments, the preceding example uses [Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) to simplify authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. When moving to production, an alternative is a better choice, such as the [Azure.Identity.ManagedIdentityCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.ManagedIdentityCredential) shown in the preceding example. For more information, see [Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity](https://learn.microsoft.com/dotnet/azure/sdk/authentication/system-assigned-managed-identity).

Inject [Microsoft.Identity.Abstractions.IDownstreamApi](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Abstractions.IDownstreamApi) and call [Microsoft.Identity.Abstractions.IDownstreamApi.CallApiForUserAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Abstractions.IDownstreamApi.CallApiForUserAsync%252A) when calling on behalf of a user:

```csharp
internal sealed class ServerWeatherForecaster(IDownstreamApi downstreamApi) : IWeatherForecaster
{
    public async Task<IEnumerable<WeatherForecast>> GetWeatherForecastAsync()
    {
        var response = await downstreamApi.CallApiForUserAsync("DownstreamApi",
            options =>
            {
                options.RelativePath = "/weather-forecast";
            });

        return await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ??
            throw new IOException("No weather forecast!");
    }
}
```

This approach is used by the `BlazorWebAppEntra` and `BlazorWebAppEntraBff` sample apps described in the *Sample apps* section of this article.

For more information, see the following resources:

* [security/data-protection/implementation/key-storage-providers#azure-storage](https://learn.microsoft.com/search/?terms=security%2Fdata-protection%2Fimplementation%2Fkey-storage-providers%23azure-storage)
* [security/data-protection/configuration/overview#protect-keys-with-azure-key-vault-protectkeyswithazurekeyvault](https://learn.microsoft.com/search/?terms=security%2Fdata-protection%2Fconfiguration%2Foverview%23protect-keys-with-azure-key-vault-protectkeyswithazurekeyvault)
* [Use the Azure SDK for .NET in ASP.NET Core apps](https://learn.microsoft.com/dotnet/azure/sdk/aspnetcore-guidance?tabs=api)
* [Web API documentation | Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/index-web-api)
* [A web API that calls web APIs: Call an API: Option 2: Call a downstream web API with the helper class](https://learn.microsoft.com/entra/identity-platform/scenario-web-api-call-api-call-api?tabs=aspnetcore#option-2-call-a-downstream-web-api-with-the-helper-class)
* [Microsoft.Identity.Abstractions.IDownstreamApi](https://learn.microsoft.com/search/?terms=Microsoft.Identity.Abstractions.IDownstreamApi)
* *Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID*
  * [With YARP and Aspire (Interactive Auto)](security/blazor-web-app-with-entra.md)
  * [Without YARP and Aspire (Interactive Auto)](security/blazor-web-app-with-entra.md)
* [Host ASP.NET Core in a web farm: Data Protection](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fweb-farm%23data-protection)
* [Azure Key Vault documentation](https://learn.microsoft.com/azure/key-vault/general/)
* [Azure Storage documentation](https://learn.microsoft.com/azure/storage/)
* [Provide access to Key Vault keys, certificates, and secrets with Azure role-based access control](https://learn.microsoft.com/azure/key-vault/general/rbac-guide?tabs=azure-cli)

## `HttpClient` and `HttpRequestMessage` with Fetch API request options

*The guidance in this section applies to client-side scenarios that rely upon bearer token authentication.*

[`HttpClient`](../fundamentals/http-requests.md) ([API documentation](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient)) and [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage) can be used to customize requests. For example, you can specify the HTTP method and request headers. The following component makes a `POST` request to a web API endpoint and shows the response body.

`TodoRequest.razor`:

```razor
@page "/todo-request"
@using System.Net.Http.Headers
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@inject HttpClient Http
@inject IAccessTokenProvider TokenProvider

<h1>ToDo Request</h1>

<h1>ToDo Request Example</h1>

<button @onclick="PostRequest">Submit POST request</button>

<p>Response body returned by the server:</p>

<p>@responseBody</p>

@code {
    private string? responseBody;

    private async Task PostRequest()
    {
        using var request = new HttpRequestMessage()
        {
            Method = new HttpMethod("POST"),
            RequestUri = new Uri("https://localhost:10000/todoitems"),
            Content =
                JsonContent.Create(new TodoItem
                {
                    Name = "My New Todo Item",
                    IsComplete = false
                })
        };

        var tokenResult = await TokenProvider.RequestAccessToken();

        if (tokenResult.TryGetToken(out var token))
        {
            request.Headers.Authorization =
                new AuthenticationHeaderValue("Bearer", token.Value);

            request.Content.Headers.TryAddWithoutValidation(
                "x-custom-header", "value");

            using var response = await Http.SendAsync(request);
            var responseStatusCode = response.StatusCode;

            responseBody = await response.Content.ReadAsStringAsync();
        }
    }

    public class TodoItem
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
```

Blazor's client-side implementation of [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) uses [Fetch API](https://developer.mozilla.org/docs/Web/API/fetch) and configures the underlying [request-specific Fetch API options](https://developer.mozilla.org/docs/Web/API/fetch#Parameters) via [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage) extension methods and [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions). Set additional options using the generic [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestOption%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestOption%252A) extension method. Blazor and the underlying Fetch API don't directly add or modify request headers. For more information on how user agents, such as browsers, interact with headers, consult external user agent documentation sets and other web resources.

**Applies to: \>= aspnetcore-10.0**

Response streaming is enabled by default.

Calling [System.Net.Http.HttpContent.ReadAsStreamAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpContent.ReadAsStreamAsync%252A) for an [System.Net.Http.HttpResponseMessage.Content%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.Content%252A) (`response.Content.ReadAsStreamAsync()`) returns a [`BrowserHttpReadStream` (reference source)](https://github.com/dotnet/runtime/blob/main/src/libraries/System.Net.Http/src/System/Net/Http/BrowserHttpHandler/BrowserHttpHandler.cs), not a [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream). `BrowserHttpReadStream` doesn't support synchronous operations, such as `Stream.Read(Span<Byte>)`. If your code uses synchronous operations, you can opt-out of response streaming or copy the [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) into a [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream) yourself.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


To opt-out of response streaming globally, use either of the following approaches:

* Add the `<WasmEnableStreamingResponse>` property to the project file with a value of `false`:
  
  ```xml
  <WasmEnableStreamingResponse>false</WasmEnableStreamingResponse>
  ```

* Set the `DOTNET_WASM_ENABLE_STREAMING_RESPONSE` environment variable to `false` or `0`.

To opt-out of response streaming for an individual request, set [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled%252A) to `false` on the [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage) (`request` in the following example):

```csharp
request.SetBrowserResponseStreamingEnabled(false);
```



**Applies to: < aspnetcore-10.0**

The HTTP response is typically buffered to enable support for synchronous reads on the response content. To enable support for response streaming, set [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled%252A)  to `true` on the [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage):

```csharp
request.SetBrowserResponseStreamingEnabled(true);
```

By default, [`HttpCompletionOption.ResponseContentRead`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpCompletionOption) is set, which results in the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) completing after reading the entire response, including the content. In order to be able to use the [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled%252A) option on large files, set [`HttpCompletionOption.ResponseHeadersRead`](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpCompletionOption) to avoid caching the file's content in memory:

```diff
- using var response = await Http.SendAsync(request);
+ using var response = await Http.SendAsync(request, 
+     HttpCompletionOption.ResponseHeadersRead);
```



To include credentials in a cross-origin request, use the [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials%252A) extension method:

```csharp
request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
```

For more information on Fetch API options, see [MDN web docs: WindowOrWorkerGlobalScope.fetch(): Parameters](https://developer.mozilla.org/docs/Web/API/fetch#Parameters).

## Handle errors

Handle web API response errors in developer code when they occur. For example, [System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%252A) expects a JSON response from the web API with a `Content-Type` of `application/json`. If the response isn't in JSON format, content validation throws a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException).

In the following example, the URI endpoint for the weather forecast data request is misspelled. The URI should be to `WeatherForecast` but appears in the call as `WeatherForcast`, which is missing the letter `e` in `Forecast`.

The [System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync%252A) call expects JSON to be returned, but the web API returns HTML for an unhandled exception with a `Content-Type` of `text/html`. The unhandled exception occurs because the path to `/WeatherForcast` isn't found and middleware can't serve a page or view for the request.

In [Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync%252A) on the client, [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) is thrown when the response content is validated as non-JSON. The exception is caught in the `catch` block, where custom logic could log the error or present a friendly error message to the user.

`ReturnHTMLOnException.razor`:

```razor
@page "/return-html-on-exception"
@using {PROJECT NAME}.Shared
@inject HttpClient Http

<h1>Fetch data but receive HTML on unhandled exception</h1>

@if (forecasts == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <h2>Temperatures by Date</h2>

    <ul>
        @foreach (var forecast in forecasts)
        {
            <li>
                @forecast.Date.ToShortDateString():
                @forecast.TemperatureC &#8451;
                @forecast.TemperatureF &#8457;
            </li>
        }
    </ul>
}

<p>
    @exceptionMessage
</p>

@code {
    private WeatherForecast[]? forecasts;
    private string? exceptionMessage;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            // The URI endpoint "WeatherForecast" is misspelled on purpose on the 
            // next line. See the preceding text for more information.
            forecasts = await Http.GetFromJsonAsync<WeatherForecast[]>("WeatherForcast");
        }
        catch (NotSupportedException exception)
        {
            exceptionMessage = exception.Message;
        }
    }
}
```

> **Note:**
> The preceding example is for demonstration purposes. A web API can be configured to return JSON even when an endpoint doesn't exist or an unhandled exception occurs on the server.

For more information, see [blazor/fundamentals/handle-errors](fundamentals/handle-errors.md).

## Cross-Origin Resource Sharing (CORS)

Browser security often restricts a webpage from making requests to a different origin than the one that served the webpage. This restriction is called the *same-origin policy*. The same-origin policy restricts (but doesn't prevent) a malicious site from reading sensitive data from another site. To make requests from the browser to an endpoint with a different origin, the *endpoint* must enable [Cross-Origin Resource Sharing (CORS)](https://www.w3.org/TR/cors/).

For more information on server-side CORS, see [security/cors](../security/cors.md). The article's examples don't pertain directly to Razor component scenarios, but the article is useful for learning general CORS concepts.

For information on client-side CORS requests, see [blazor/security/webassembly/additional-scenarios#cross-origin-resource-sharing-cors](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23cross-origin-resource-sharing-cors).

**Applies to: \>= aspnetcore-8.0**

## Antiforgery support

To add antiforgery support to an HTTP request, inject the `AntiforgeryStateProvider` and add a `RequestToken` to the headers collection as a `RequestVerificationToken`:

```razor
@inject AntiforgeryStateProvider Antiforgery
```

```csharp
private async Task OnSubmit()
{
    var antiforgery = Antiforgery.GetAntiforgeryToken();
    using var request = new HttpRequestMessage(HttpMethod.Post, "action");
    request.Headers.Add("RequestVerificationToken", antiforgery.RequestToken);
    using var response = await client.SendAsync(request);
    ...
}
```

For more information, see [blazor/security/index#antiforgery-support](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23antiforgery-support).



## Blazor framework component examples for testing web API access

Various network tools are publicly available for testing web API backend apps directly, such as [Firefox Browser Developer](https://www.mozilla.org/firefox/developer/). Blazor framework's reference source includes [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) test assets that are useful for testing:

[`HttpClientTest` assets in the `dotnet/aspnetcore` GitHub repository](https://github.com/dotnet/aspnetcore/tree/main/src/Components/test/testassets/BasicTestApp/HttpClientTest)

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


**Applies to: \>= aspnetcore-8.0**

## Sample apps

For working examples, see the following sample apps in the [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples/) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps)).

### `BlazorWebAppCallWebApi`

Call an external (not in the Blazor Web App) todo list web API from a Blazor Web App:

* `Backend`: A web API app for maintaining a todo list, based on [Minimal APIs](../fundamentals/minimal-apis.md). The web API app is a separate app from the Blazor Web App, possibly hosted on a different server.
* `BlazorApp`/`BlazorApp.Client`: A Blazor Web App that calls the web API app with an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) for todo list operations, such as creating, reading, updating, and deleting (CRUD) items from the todo list.

For client-side rendering (CSR), which includes Interactive WebAssembly components and Auto components that have adopted CSR, calls are made with a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) registered in the `Program` file of the client project (`BlazorApp.Client`):

```csharp
builder.Services.AddScoped(sp =>
    new HttpClient
    {
        BaseAddress = new Uri(builder.Configuration["FrontendUrl"] ?? 
            "https://localhost:5002")
    });
```

For server-side rendering (SSR), which includes prerendered and interactive Server components, prerendered WebAssembly components, and Auto components that are prerendered or have adopted SSR, calls are made with an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) registered in the `Program` file of the server project (`BlazorApp`):

```csharp
builder.Services.AddHttpClient();
```

Call an internal (inside the Blazor Web App) movie list API, where the API resides in the server project of the Blazor Web App:

* `BlazorApp`: A Blazor Web App that maintains a movie list:
  * When operations are performed on the movie list within the app on the server, ordinary API calls are used.
  * When API calls are made by a web-based client, a web API is used for movie list operations, based on [Minimal APIs](../fundamentals/minimal-apis.md).
* `BlazorApp.Client`: The client project of the Blazor Web App, which contains Interactive WebAssembly and Auto components for user management of the movie list.

For CSR, which includes Interactive WebAssembly components and Auto components that have adopted CSR, calls to the API are made via a client-based service (`ClientMovieService`) that uses a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) registered in the `Program` file of the client project (`BlazorApp.Client`). Because these calls are made over a public or private web, the movie list API is a *web API*.

The following example obtains a list of movies from the `/movies` endpoint:

```csharp
public class ClientMovieService(HttpClient http) : IMovieService
{
    public async Task<Movie[]> GetMoviesAsync(bool watchedMovies) => 
        await http.GetFromJsonAsync<Movie[]>("movies") ?? [];
}
```

For SSR, which includes prerendered and interactive Server components, prerendered WebAssembly components, and Auto components that are prerendered or have adopted SSR, calls are made directly via a server-based service (`ServerMovieService`). The API doesn't rely on a network, so it's a standard API for movie list CRUD operations.

The following example obtains a list of movies:

```csharp
public class ServerMovieService(MovieContext db) : IMovieService
{
    public async Task<Movie[]> GetMoviesAsync(bool watchedMovies) => 
        watchedMovies ? 
        await db.Movies.Where(t => t.IsWatched).ToArrayAsync() : 
        await db.Movies.ToArrayAsync();
}
```

For more information on how to secure movie data in this scenario, see the weather data example described by [Secure data in Blazor Web Apps with Interactive Auto rendering](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23secure-data-in-blazor-web-apps-with-interactive-auto-rendering).

### `BlazorWebAppCallWebApi_Weather`

A weather data sample app that uses streaming rendering for weather data.

### `BlazorWebAssemblyCallWebApi`

Calls a todo list web API from a Blazor WebAssembly app:

* `Backend`: A web API app for maintaining a todo list, based on [Minimal APIs](../fundamentals/minimal-apis.md).
* `BlazorTodo`: A Blazor WebAssembly app that calls the web API with a preconfigured [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) for todo list CRUD operations.

### `BlazorWebAssemblyStandaloneWithIdentity`

A standalone Blazor WebAssembly app secured with ASP.NET Core Identity:

* `Backend`: A backend web API app that maintains a user identity store for ASP.NET Core Identity.
* `BlazorWasmAuth`: A standalone Blazor WebAssembly frontend app with user authentication.

The solution demonstrates calling a secure web API for the following:

* Obtaining an authenticated user's roles.
* Data processing for all authenticated users.
* Data processing for authorized users (the user must be in the `Manager` role) via an [authorization policy](../security/authorization/policies.md).

### `BlazorWebAppOidcBffAuto`

A Blazor Web App with global Interactive Auto rendering that uses OIDC authentication with Microsoft Entra without using Entra-specific packages. The sample demonstrates how to [use a token handler for web API calls](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23use-a-token-handler-for-web-api-calls) to call an external secure web API.

### `BlazorWebAppOidcBffServer`

A Blazor Web App with global Interactive Server rendering that uses OIDC authentication with Microsoft Entra without using Entra-specific packages. The sample demonstrates how to [pass an access token](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23use-a-token-handler-for-web-api-calls) to call an external secure web API.

### `BlazorWebAppOidcBffYarpAspire`

A Blazor Web App with global Interactive Auto rendering that uses:

* OIDC authentication (Microsoft Entra without using Entra-specific packages)
* [YARP](https://dotnet.github.io/yarp/)
* [Aspire](https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview)

The solution includes a demonstration of obtaining weather data securely via an external web API when a component that adopts Interactive Auto rendering is rendered on the client.



**Applies to: \>= aspnetcore-9.0**

### `BlazorWebAppEntraBff`

A Blazor Web App with global Auto interactivity that uses [Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/) with [Microsoft Identity Web packages](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) for [Microsoft Entra ID](https://www.microsoft.com/security/business/microsoft-entra). The solution includes a demonstration of obtaining weather data securely via an external web API when a component that adopts Interactive Auto rendering is rendered on the client.

### `BlazorWebAppEntraBffYarpAspire`

A Blazor Web App with global Auto interactivity that uses:

* [Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/) with [Microsoft Identity Web packages](https://learn.microsoft.com/entra/msal/dotnet/microsoft-identity-web/) for [Microsoft Entra ID](https://www.microsoft.com/security/business/microsoft-entra).
* [YARP](https://dotnet.github.io/yarp/).
* [Aspire](https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview).

The solution includes a demonstration of obtaining weather data securely via an external web API when a component that adopts Interactive Auto rendering is rendered on the client.



## Additional resources

### General

**Applies to: \>= aspnetcore-8.0**

* [Cross-Origin Resource Sharing (CORS) at W3C](https://www.w3.org/TR/cors/)
* [security/cors](../security/cors.md): Although the content applies to ASP.NET Core apps, not Razor components, the article covers general CORS concepts.
* [Secure data in Blazor Web Apps with Interactive Auto rendering](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23secure-data-in-blazor-web-apps-with-interactive-auto-rendering)



**Applies to: < aspnetcore-8.0**

* [Cross-Origin Resource Sharing (CORS) at W3C](https://www.w3.org/TR/cors/)
* [security/cors](../security/cors.md): Although the content applies to ASP.NET Core apps, not Razor components, the article covers general CORS concepts.



### Mitigation of overposting attacks

Web APIs can be vulnerable to an *overposting* attack, also known as a *mass assignment* attack. An overposting attack occurs when a malicious user issues an HTML form POST to the server that processes data for properties that aren't part of the rendered form and that the developer doesn't wish to allow users to modify. The term "overposting" literally means that the malicious user has *over*-POSTed with the form.

For guidance on mitigating overposting attacks, see [tutorials/first-web-api#prevent-over-posting](https://learn.microsoft.com/search/?terms=tutorials%2Ffirst-web-api%23prevent-over-posting).

### Server-side

* [blazor/security/additional-scenarios](security/additional-scenarios.md): Includes coverage on using [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) to make secure web API requests.
* [fundamentals/http-requests](../fundamentals/http-requests.md)
* [security/enforcing-ssl](../security/enforcing-ssl.md)
* [Kestrel HTTPS endpoint configuration](../fundamentals/servers/kestrel/endpoints.md)

### Client-side

* [blazor/security/webassembly/additional-scenarios](security/webassembly/additional-scenarios.md): Includes coverage on using [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) to make secure web API requests.
* [blazor/security/webassembly/graph-api](security/webassembly/graph-api.md)
* [Fetch API](https://developer.mozilla.org/docs/Web/API/fetch)
