---
title: Get started with ASP.NET Core
author: tdykstra
description: A short tutorial using the .NET CLI to create and run a basic Hello World app using ASP.NET Core Blazor.
monikerRange: ">= aspnetcore-3.1"
ms.author: tdykstra
ms.date: 07/23/2025
uid: get-started
---
# Get started with ASP.NET Core

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


**Applies to: \>= aspnetcore-8.0**

This tutorial shows how to create, run, and modify an ASP.NET Core Blazor Web App using the .NET CLI. *Blazor* is a .NET frontend web framework that supports both server-side rendering and client interactivity in a single programming model.

You'll learn how to:

> 
> * Create a Blazor Web App.
> * Run the app.
> * Change the app.
> * Shut the app down.

## Prerequisites

Obtain and install the latest .NET SDK at [Download .NET](https://dotnet.microsoft.com/download/dotnet).

## Create a Blazor Web App

Open a command shell to a suitable location for the sample app and use the following command to create a Blazor Web App. The `-o|--output` option creates a folder for the project and names the project `BlazorSample`:

```dotnetcli
dotnet new blazor -o BlazorSample
```

## Run the app

Change the directory to the `BlazorSample` folder with the following command:

```dotnetcli
cd BlazorSample
```

The `dotnet watch` command runs the app and opens your default browser to the app's landing page:

```dotnetcli
dotnet watch
```

Blazor Web App running in Microsoft Edge with the homepage rendered in the UI.

Using the app's sidebar navigation, visit the Counter page, where you can select the **Click me** button to increment the counter.

Counter page rendered after the 'Click me' button is selected once, showing the counter incremented to a value of one.

## Change the app

Leave the browser open with the Counter page loaded. By using the `dotnet watch` command to run the app, you can make changes to the app's markup and code without having to rebuild the app to reflect the changes in the browser.

The `Counter` Razor component that renders the Counter web page is located at `Components/Pages/Counter.razor` in the project. *Razor* is a syntax for combining HTML markup with C# code designed for developer productivity.

Open the `Counter.razor` file in a text editor and note a few interesting lines that render content and make the component's counter feature work.

`Components/Pages/Counter.razor`:

```razor
@page "/counter"

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

The file starts with a line that indicates the component's relative path (`/counter`):

```razor
@page "/counter"
```

The title of the page is set by `<PageTitle>` tags:

```razor
<PageTitle>Counter</PageTitle>
```

An H1 heading is displayed:

```razor
<h1>Counter</h1>
```

A paragraph element (`<p>`) displays the current count, which is stored in a variable named `currentCount`:

```razor
<p role="status">Current count: @currentCount</p>
```

A button (`<button>`) allows the user to increment the counter, which occurs when a button click executes a C# method named `IncrementCount`:

```razor
<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
```

The `@code` block contains C# code that the component executes:

* The counter variable `currentCount` is established with an initial value of zero.
* The `IncrementCount` method is defined. The code within the method increments the `currentCount` variable by one each time the method is invoked.

```csharp
private int currentCount = 0;

private void IncrementCount()
{
    currentCount++;
}
```

Let's change the increment of the counter in the `IncrementCount` method.

Change the line so that `currentCount` is incremented by a value of ten each time `IncrementCount` is called:

```diff
- currentCount++;
+ currentCount += 10;
```

Save the file.

As soon as you save the file, the running app is updated automatically because you used the `dotnet watch` command. Go back to the app in the browser and select the **Click me** button in the Counter page. Witness how the counter now increments from its existing value of one to a value of eleven. Each time the button is selected the value increments by ten.

Counter page rendered after the 'Click me' button is selected once, showing the counter incremented to a value of eleven.

## Shut the app down

Follow these steps:

* Close the browser window.
* To shut down the app, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the command shell.

*Congratulations!* You've successfully completed this tutorial.

## Next steps

In this tutorial, you learned how to:

> 
> * Create a Blazor Web App.
> * Run the app.
> * Change the app.
> * Shut the app down.



**Applies to: < aspnetcore-8.0**

This tutorial shows how to create and run an ASP.NET Core web app using the .NET CLI.

For Blazor tutorials, see [blazor/tutorials/index](blazor/tutorials/index.md).

You'll learn how to:

> 
> * Create a Razor Pages app.
> * Run the app.
> * Change the app.
> * Shut the app down.

## Prerequisites

Obtain and install the latest .NET SDK at [Download .NET](https://dotnet.microsoft.com/download/dotnet).

## Create Razor Pages app

Open a command shell to a suitable location for the sample app and use the following command to create a Razor Pages app. The `-o|--output` option creates a folder for the project and names the project `RazorPagesSample`:

```dotnetcli
dotnet new webapp -o RazorPagesSample
```

## Run the app

Change the directory to the `RazorPagesSample` folder with the following command:

```dotnetcli
cd RazorPagesSample
```

The `dotnet watch` command runs the app and opens your default browser to the app's landing page:

```dotnetcli
dotnet watch
```

Web app home page

## Change the app

Open the `Pages/Index.cshtml` file in a text editor.

After the line with the "Welcome" greeting, add the following line to display the local system date and time:

```cshtml
<p>The time on the server is @DateTime.Now</p>
```

Save the changes.

As soon as you save the file, the running app is updated automatically because you used the `dotnet watch` command.

Refresh the page in the browser to see the result:

Web app home page showing the change that was made.

## Shut the app down

To shut down the app:

* Close the browser window.
* Press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the command shell.

*Congratulations!* You've successfully completed this tutorial.

## Next steps

In this tutorial, you learned how to:

> 
> * Create a Razor Pages app.
> * Run the app.
> * Change the app.
> * Shut the app down.



To learn more about the fundamentals of ASP.NET Core, see the following:

> 
> [fundamentals/index](fundamentals/index.md)

## Additional tutorials

**Applies to: \>= aspnetcore-6.0**

| App type | Scenario | Tutorials |
| --- | --- | --- |
| Web app | New server and client web development with Blazor | [blazor/tutorials/build-a-blazor-app](blazor/tutorials/build-a-blazor-app.md) and [blazor/tutorials/movie-database-app/index](blazor/tutorials/movie-database-app/index.md) |
| Web API | Server-based data processing with Minimal APIs | [tutorials/min-web-api](tutorials/min-web-api.md) |
| Remote Procedure Call (RPC) app | Contract-first services using Protocol Buffers | [tutorials/grpc/grpc-start](tutorials/grpc/grpc-start.md) |
| Real-time app | Server/client bidirectional communication | [tutorials/signalr](tutorials/signalr.md) |



**Applies to: < aspnetcore-6.0**

| App type | Scenario | Tutorials |
| --- | --- | --- |
| Web app | New server and client web development with Blazor | [blazor/tutorials/build-a-blazor-app](blazor/tutorials/build-a-blazor-app.md) and [blazor/tutorials/movie-database-app/index](blazor/tutorials/movie-database-app/index.md) |
| Web API | Server-based data processing | [tutorials/first-web-api](tutorials/first-web-api.md) |
| Remote Procedure Call (RPC) app | Contract-first services using Protocol Buffers | [tutorials/grpc/grpc-start](tutorials/grpc/grpc-start.md) |
| Real-time app | Server/client bidirectional communication | [tutorials/signalr](tutorials/signalr.md) |



## Additional resources

* [Introduction to .NET](https://learn.microsoft.com/dotnet/core/introduction)
* [Visual Studio](https://visualstudio.microsoft.com/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [.NET Developer Community](https://dotnet.microsoft.com/platform/community)
* [.NET Live TV](https://live.dot.net)
