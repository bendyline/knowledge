---
title: Build a Blazor movie database app (Part 1 - Create a Blazor Web App)
author: guardrex
description: This part of the Blazor movie database app tutorial explains how to create a Blazor Web App that adopts static server-side rendering (static SSR), where content is only rendered on the server.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/tutorials/movie-database-app/part-1
zone_pivot_groups: tooling
---
# Build a Blazor movie database app (Part 1 - Create a Blazor Web App)

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


This article is the first part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

This part of the tutorial series covers how to create a Blazor Web App that adopts static server-side rendering (static SSR). Static SSR means that content is rendered on the server and sent to the client for display in response to individual requests.

## Prerequisites

**Applies to: vs**


[Visual Studio (latest release)](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2022) with the **ASP.NET and web development** workload



**Applies to: vsc**


Latest releases of:

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET SDK](https://dotnet.microsoft.com/download/dotnet)

The Visual Studio Code (VS Code) instructions for ASP.NET Core development in this tutorial use the [.NET CLI](https://learn.microsoft.com/dotnet/core/tools/), which is part of the .NET SDK. .NET CLI commands are issued in VS Code's integrated [**Terminal**](https://code.visualstudio.com/docs/editor/integrated-terminal), which defaults to a [PowerShell command shell](https://learn.microsoft.com/powershell/). The **Terminal** is opened by selecting **New Terminal** from the **Terminal** menu in the menu bar.



**Applies to: cli**


[.NET SDK (latest release)](https://dotnet.microsoft.com/download/dotnet)

The [.NET CLI](https://learn.microsoft.com/dotnet/core/tools/) is part of the .NET SDK. To issue commands that affect the project, open the command shell to the project's root folder.



## Create a Blazor Web App

**Applies to: vs**


In Visual Studio:

* Select **Create a new project** from the **Start Window** or select **File** > **New** > **Project** from the menu bar.

* In the **Create a new project** dialog, select **Blazor Web App** from the list of project templates. Select the **Next** button.

* In the **Configure your new project** dialog, name the project `BlazorWebAppMovies` in the **Project name** field, including matching the capitalization. Using this exact project name is important to ensure that the namespaces match for code that you copy from the tutorial into the app that you're building.

* Confirm that the **Location** for the app is suitable. Set the **Place solution and project in the same directory** checkbox to match your preferred solution file location. Select the **Next** button.

* In the **Additional information** dialog, use the following settings:

  * **Framework**: Confirm that the [latest framework](https://dotnet.microsoft.com/download/dotnet) is selected. If Visual Studio's **Framework** dropdown list doesn't include the latest available .NET framework, [update Visual Studio](https://learn.microsoft.com/visualstudio/install/update-visual-studio) and restart the tutorial.
  * **Authentication type**: **None**
  * **Configure for HTTPS**: Selected
  * **Interactive render mode**: **Server**
  * **Interactivity location**: **Per page/component**
  * **Include sample pages**: Selected
  * **Do not use top-level statements**: Not selected
  * **Use the .dev.localhost TLD in the application URL**: Not selected
  * Select **Create**.

The Visual Studio instructions in parts of this tutorial series use EF Core commands to add database migrations and update the database. EF Core commands are issued using [Visual Studio Connected Services](https://learn.microsoft.com/visualstudio/azure/overview-connected-services). More information is provided later in this tutorial series.



**Applies to: vsc**


This tutorial assumes that you have familiarity with VS Code. If you're new to VS Code, see the [VS Code documentation](https://code.visualstudio.com/docs). The videos listed by the [Introductory Videos page](https://code.visualstudio.com/docs/getstarted/introvideos) are designed to give you an overview of VS Code's features.

Confirm that you have the latest [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) and [.NET SDK](https://dotnet.microsoft.com/download/dotnet) installed.

In VS Code:

Create a new project:

* Go to the **Explorer** view and select the **Create .NET Project** button. Alternatively, you can bring up the **Command Palette** using <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>, and then type "`.NET`" to find and select the **.NET: New Project** command.

* Select the **Blazor Web App** project template from the list.

* In the **Project Location** dialog, create or select a folder for the project.

* In the **Command Palette**, name the project `BlazorWebAppMovies`, including matching the capitalization. Using this exact project name is important to ensure that the namespaces match for code that you copy from the tutorial into the app that you're building.

* Select **Create project** to create the app.



**Applies to: cli**


Confirm that you have the latest [.NET SDK](https://dotnet.microsoft.com/download/dotnet) installed.

In a command shell:

* Use the `cd` command to change to the directory to where you want to create the project folder (for example, `cd c:/users/Bernie_Kopell/Documents`).
* Use the [`dotnet new` command](https://learn.microsoft.com/dotnet/core/tools/dotnet-new) with the [`blazor` project template](https://learn.microsoft.com/dotnet/core/tools/dotnet-new-sdk-templates#blazor) to create a new Blazor Web App project. The [`-o|--output` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-new#options) passed to the command creates the project in a new folder at the current shell directory location. Name the project `BlazorWebAppMovies`, including matching the capitalization, so the namespaces match for code that you copy from the tutorial to the app.

  ```dotnetcli
  dotnet new blazor -o BlazorWebAppMovies
  ```



## Run the app

**Applies to: vs**


Press <kbd>F5</kbd> on the keyboard to run the app.

Visual Studio displays the following dialog when a project isn't configured to use SSL:

Trust self-signed certificate dialog

Select **Yes** if you trust the ASP.NET Core SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** to acknowledge the risk and install the certificate.

Visual Studio:

* Compiles and runs the app.
* Launches the default browser at `https://localhost:{PORT}`, which displays the app's UI. The `{PORT}` placeholder is the random port assigned to the app when the app is created. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

Navigate the pages of the app to confirm that the app is working normally.



**Applies to: vsc**


In VS Code, press <kbd>F5</kbd> to run the app.

At the **Select debugger** prompt in the **Command Palette** at the top of the VS Code UI, select **C#**. At the next prompt, select the default launch configuration (`C#: BlazorWebAppMovies [Default Configuration]`).

The default browser is launched at `http://localhost:{PORT}`, which displays the app's UI. The `{PORT}` placeholder is the random port assigned to the app when the app is created. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

Navigate the pages of the app to confirm that the app is working normally.



**Applies to: cli**


In a command shell opened to the project's root folder, execute the [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) command to compile and start the app:

```dotnetcli
dotnet watch
```

The app is compiled and run. The app is launched at `http://localhost:{PORT}`, where the `{PORT}` placeholder is the random port assigned to the app when the app is created. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

Navigate the pages of the app to confirm that the app is working normally.

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the [`-lp|--launch-profile` option](https://learn.microsoft.com/dotnet/core/tools/dotnet-run#options) to [`dotnet watch`](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) or [`dotnet run`](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) or move the preferred profile to the top of the file.




## Stop the app

**Applies to: vs**


Stop the app using either of the following approaches:

* Close the browser window.
* In Visual Studio, either:
  * Use the Stop button in Visual Studio's menu bar:

    Stop button in Visual Studio's menu bar

  * Press <kbd>Shift</kbd>+<kbd>F5</kbd> on the keyboard.



**Applies to: vsc**


Stop the app using the following approach:

1. Close the browser window.
1. In VS Code, either:
   * From the **Run** menu, select **Stop Debugging**.
   * Press <kbd>Shift</kbd>+<kbd>F5</kbd> on the keyboard.



**Applies to: cli**


Stop the app using the following approach:

1. Close the browser window.
2. In the command shell, press <kbd>Ctrl</kbd>+<kbd>C</kbd>.



## Examine the project files

The following sections contain an overview of the project's folders and files.

If you're building the app, you don't need to make changes to the project files in the following sections. As you read the descriptions of the folders and files, examine them in the project.

If you're only reading the articles and not building the app, you can refer to the completed sample app in the [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples). Select the latest version folder in the repository. The sample folder for this tutorial's project is named `BlazorWebAppMovies`. The sample app is the *finished version* of the app after following all of the steps of the tutorial series. Code in the sample doesn't always match steps of the tutorial before the end of the series.

### `Properties` folder

The `Properties` folder holds development environment configuration in the `launchSettings.json` file.

### `wwwroot` folder

The `wwwroot` folder contains static assets, such as image, JavaScript (`.js`), and stylesheet (`.css`) files.

### `Components`, `Components/Pages`, and `Components/Layout` folders

These folders contain *Razor components*, often referred to as "components," and supporting files. A component is a self-contained portion of user interface (UI) with optional processing logic. Components can be nested, reused, and shared among projects.

Components are implemented using a combination of C# and HTML markup in [Razor](../../../mvc/views/razor.md) component files with the `.razor` file extension.

Typically, components that are nested within other components and not directly reachable ("routable") at a URL are placed in the `Components` folder. Components that are routable via a URL are usually placed in the `Components/Pages` folder.

The `Components/Layout` folder contains the following layout components and stylesheets:

* `MainLayout` component (`MainLayout.razor`): The app's main layout component.
* `MainLayout.razor.css`: Stylesheet for the app's main layout.
* `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. This component uses several `NavLink` components to render navigation links to other Razor components.
* `NavMenu.razor.css`: Stylesheet for the app's navigation menu.
* `ReconnectModal` component (`ReconnectModal.razor`): Reflects the server-side connection state in the UI.
* `ReconnectModal.razor.css`: Stylesheet for the `ReconnectModal` component.
* `ReconnectModal.razor.js`: JavaScript file for the `ReconnectModal` component.

### `Components/_Imports.razor` file

The imports file (`_Imports.razor`) includes common *Razor directives* to include in the app's Razor components. Razor directives are reserved keywords prefixed with `@` that appear in Razor markup and change the way component markup or component elements are compiled or function.

### `Components/App.razor` file

The `App` component (`App.razor`) is the root component of the app that includes:

* HTML markup.
* The `Routes` component.
* The Blazor script (`<script>` tag for `blazor.web.js`).

The root component is the first component that the app loads.

### `Components/Routes.razor` file

The `Routes` component (`Routes.razor`) sets up routing for the app.

### `appsettings.json` file

The `appsettings.json` file contains configuration data, such as connection strings.

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


### `Program.cs` file

The `Program.cs` file contains code to create the app and configure the request processing pipeline of the app.

The order of the lines in the Blazor Web App project template changes across releases of .NET, so the order of the lines in the `Program.cs` file might not match the order of the lines covered in this section. 

A [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) creates the app with preconfigured defaults:

```csharp
var builder = WebApplication.CreateBuilder(args);
```

Razor component services are added to the app by calling [Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A), which enables Razor components to render and execute code on the server, and [Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%252A) adds services to support rendering Interactive Server components:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
```

The [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) (held by the `app` variable in the following code) is built:

```csharp
var app = builder.Build();
```

Next, the HTTP request pipeline is configured.

When the app isn't running in the `Development` environment:

* Exception handler middleware ([Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler%252A)) processes errors and displays a custom error page.
* [HTTP Strict Transport Security (HSTS) protocol middleware](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol) ([Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts%252A)) processes [HSTS](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html).

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}
```

**Applies to: \>= aspnetcore-10.0**

By default, an ASP.NET Core app doesn't provide a status code page for HTTP error status codes, such as *404 - Not Found*. When the app sets an HTTP 400-599 error status code without a body, it returns the status code and an empty response body. However, an app generated from the Blazor Web App project template calls [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%252A) to add status code pages middleware to the request pipeline for pages that aren't found, which generates the response body by re-executing the request pipeline using the path to the Not Found error page (`/not-found`): 

```csharp
app.UseStatusCodePagesWithReExecute("/not-found", 
    createScopeForStatusCodePages: true);
```



HTTPS redirection middleware ([Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A)) enforces the HTTPS protocol by redirecting HTTP requests to HTTPS if an HTTPS port is available:

```csharp
app.UseHttpsRedirection();
```

Antiforgery middleware ([Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery%252A)) enforces antiforgery protection for form processing:

```csharp
app.UseAntiforgery();
```

**Applies to: \>= aspnetcore-9.0**

Map Static Assets routing endpoint conventions ([Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A)) maps static files, such as images, scripts, and stylesheets, produced during the build as endpoints:

```csharp
app.MapStaticAssets();
```



**Applies to: < aspnetcore-9.0**

Static file middleware ([Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A)) serves static files, such as images, scripts, and stylesheets from the `wwwroot` folder:

```csharp
app.UseStaticFiles();
```



[Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) maps components defined in the root `App` component to the given .NET assembly and renders routable components, and [Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%252A) configures interactive server-side rendering (interactive SSR) support for the app:

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
```

> **Note:**
> The extension methods [Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%252A) on [Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A) and [Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%252A) on [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) make the app capable of adopting interactive SSR, which isn't relevant until the last part of the tutorial series on interactivity. Over the next several articles, the app's components only adopt static SSR.

The app is run by calling [Microsoft.AspNetCore.Builder.WebApplication.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.Run%252A) on the [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) (`app`):

```csharp
app.Run();
```

## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

[Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.


## Additional resources

When using VS Code or the .NET CLI, this tutorial series adopts insecure HTTP protocol to ease the transition of adopting SSL/HTTPS security for Linux and macOS users. For information on adopting SSL/HTTPS, see [security/enforcing-ssl](../../../security/enforcing-ssl.md).

## Next steps

> 
> [Next: Add and scaffold a model](part-2.md)
