---
title: Render Razor components outside of ASP.NET Core
author: guardrex
description: Render Razor components outside of the context of an HTTP request.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/render-outside-of-aspnetcore
---
# Render Razor components outside of ASP.NET Core

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


[Razor components](index.md), which are self-contained portions of user interface (UI) with processing logic used in [ASP.NET Core Blazor](../index.md), can be rendered outside of the context of an HTTP request. You can render Razor components as HTML directly to a string or stream independently of the ASP.NET Core hosting environment. This is convenient for scenarios where you want to generate HTML fragments, such as for generating email content, generating static site content, or for building a content templating engine.

In the following example, a Razor component is rendered to an HTML string from a console app:

In a command shell, create a new console app project and change the directory to the `ConsoleApp1` folder:

```dotnetcli
dotnet new console -o ConsoleApp1
cd ConsoleApp1
```

Add a package reference for [Microsoft.AspNetCore.Components.Web](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web):

```dotnetcli
dotnet add package Microsoft.AspNetCore.Components.Web
```

Add a package reference for [Microsoft.Extensions.Logging](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging):

```dotnetcli
dotnet add package Microsoft.Extensions.Logging
```

In the console app's project file (`ConsoleApp1.csproj`), update the console app project to use the Razor SDK:

```diff
- <Project Sdk="Microsoft.NET.Sdk">
+ <Project Sdk="Microsoft.NET.Sdk.Razor">
```

Add the following `RenderMessage` component to the project.

`RenderMessage.razor`:

```razor
<h1>Render Message</h1>

<p>@Message</p>

@code {
    [Parameter]
    public string? Message { get; set; }
}
```

Replace the code in the `Program` file with the following code:

* Set up dependency injection ([Microsoft.Extensions.DependencyInjection.IServiceCollection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceCollection)/[Microsoft.Extensions.DependencyInjection.ServiceCollectionContainerBuilderExtensions.BuildServiceProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionContainerBuilderExtensions.BuildServiceProvider%252A)) and logging ([Microsoft.Extensions.DependencyInjection.LoggingServiceCollectionExtensions.AddLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.LoggingServiceCollectionExtensions.AddLogging%252A)/[Microsoft.Extensions.Logging.ILoggerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerFactory)).
* Create an [Microsoft.AspNetCore.Components.Web.HtmlRenderer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRenderer) and render the `RenderMessage` component by calling [Microsoft.AspNetCore.Components.Web.HtmlRenderer.RenderComponentAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRenderer.RenderComponentAsync%252A).

```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ConsoleApp1;

IServiceCollection services = new ServiceCollection();
services.AddLogging();

IServiceProvider serviceProvider = services.BuildServiceProvider();
ILoggerFactory loggerFactory = serviceProvider.GetRequiredService<ILoggerFactory>();

await using var htmlRenderer = new HtmlRenderer(serviceProvider, loggerFactory);

var html = await htmlRenderer.Dispatcher.InvokeAsync(async () =>
{
    var dictionary = new Dictionary<string, object?>
    {
        { "Message", "Hello from the Render Message component!" }
    };

    var parameters = ParameterView.FromDictionary(dictionary);
    var output = await htmlRenderer.RenderComponentAsync<RenderMessage>(parameters);

    return output.ToHtmlString();
});

Console.WriteLine(html);
```

> **Note:**
> Pass [Microsoft.AspNetCore.Components.ParameterView.Empty](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterView.Empty) to [Microsoft.AspNetCore.Components.Web.HtmlRenderer.RenderComponentAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRenderer.RenderComponentAsync%252A) when rendering the component without passing parameters.

Any calls to [Microsoft.AspNetCore.Components.Web.HtmlRenderer.RenderComponentAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRenderer.RenderComponentAsync%252A) must be made in the context of calling `InvokeAsync` on a component dispatcher. A component dispatcher is available from the [Microsoft.AspNetCore.Components.Web.HtmlRenderer.Dispatcher](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRenderer.Dispatcher) property.

Alternatively, you can write the HTML to a [System.IO.TextWriter](https://learn.microsoft.com/search/?terms=System.IO.TextWriter) by calling `output.WriteHtmlTo(textWriter)`.

The task returned by [Microsoft.AspNetCore.Components.Web.HtmlRenderer.RenderComponentAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRenderer.RenderComponentAsync%252A) completes when the component is fully rendered, including completing any asynchronous lifecycle methods. If you want to observe the rendered HTML earlier, call [Microsoft.AspNetCore.Components.Web.HtmlRenderer.BeginRenderingComponent%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRenderer.BeginRenderingComponent%252A) instead. Then, wait for the component rendering to complete by awaiting [Microsoft.AspNetCore.Components.Web.HtmlRendering.HtmlRootComponent.QuiescenceTask%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRendering.HtmlRootComponent.QuiescenceTask%252A) on the returned [Microsoft.AspNetCore.Components.Web.HtmlRendering.HtmlRootComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.HtmlRendering.HtmlRootComponent) instance.
