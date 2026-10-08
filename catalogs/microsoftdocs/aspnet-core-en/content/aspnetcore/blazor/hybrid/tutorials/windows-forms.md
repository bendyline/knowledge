---
title: Build a Windows Forms Blazor app
author: guardrex
description: Build a Windows Forms Blazor app step-by-step.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/tutorials/windows-forms
---
# Build a Windows Forms Blazor app

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


This tutorial shows you how to build and run a Windows Forms Blazor app. You learn how to:

> 
> * Create a Windows Forms Blazor app project
> * Run the app on Windows

## Prerequisites

* [Supported platforms (Windows Forms documentation)](https://learn.microsoft.com/dotnet/desktop/winforms/overview/)
* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) with the **.NET desktop development** workload

## Visual Studio workload

If the **.NET desktop development** workload isn't installed, use the Visual Studio installer to install the workload. For more information, see [Modify Visual Studio workloads, components, and language packs](https://learn.microsoft.com/visualstudio/install/modify-visual-studio).

Visual Studio installer .NET desktop development workload selection.

## Create a Windows Forms Blazor project

Launch Visual Studio. In the **Start Window**, select **Create a new project**:

Create a new solution in Visual Studio.

In the **Create a new project** dialog, filter the **Project type** dropdown to **Desktop**. Select the C# project template for **Windows Forms App** and select the **Next** button:

Create a new project in Visual Studio.

In the **Configure your new project** dialog:

* Set the **Project name** to **WinFormsBlazor**.
* Choose a suitable location for the project.
* Select the **Next** button.

Configure the project.

In the **Additional information** dialog, select the framework version with the **Framework** dropdown list. Select the **Create** button:

The Additional Information dialog.

Use [NuGet Package Manager](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-visual-studio) to install the [`Microsoft.AspNetCore.Components.WebView.WindowsForms`](https://nuget.org/packages/Microsoft.AspNetCore.Components.WebView.WindowsForms) NuGet package:

Use Nuget Package Manager in Visual Studio to install the Microsoft.AspNetCore.Components.WebView\.WindowsForms NuGet package.

In **Solution Explorer**, right-click the project's name, **WinFormsBlazor**, and select **Edit Project File** to open the project file (`WinFormsBlazor.csproj`).

At the top of the project file, change the SDK to `Microsoft.NET.Sdk.Razor`:

```xml
<Project Sdk="Microsoft.NET.Sdk.Razor">
```

Save the changes to the project file (`WinFormsBlazor.csproj`).

Add an imports file to the root of the project with an [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directive for [Microsoft.AspNetCore.Components.Web](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web).

`_Imports.razor`:

```razor
@using Microsoft.AspNetCore.Components.Web
```

Save the imports file.

Add a `wwwroot` folder to the project.

Add an `index.html` file to the `wwwroot` folder with the following markup.

`wwwroot/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WinFormsBlazor</title>
    <base href="/" />
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/app.css" rel="stylesheet" />
    <link href="WinFormsBlazor.styles.css" rel="stylesheet" />
</head>

<body>

    <div id="app">Loading...</div>

    <div id="blazor-error-ui" data-nosnippet>
        An unhandled error has occurred.
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>

    <script src="_framework/blazor.webview.js"></script>

</body>

</html>
```

Inside the `wwwroot` folder, create a `css` folder to hold stylesheets.

Add an `app.css` stylesheet to the `wwwroot/css` folder with the following content.

`wwwroot/css/app.css`:

```css
html, body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h1:focus {
    outline: none;
}

a, .btn-link {
    color: #0071c1;
}

.btn-primary {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
}

.valid.modified:not([type=checkbox]) {
    outline: 1px solid #26b050;
}

.invalid {
    outline: 1px solid red;
}

.validation-message {
    color: red;
}

#blazor-error-ui {
    background: lightyellow;
    bottom: 0;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
    display: none;
    left: 0;
    padding: 0.6rem 1.25rem 0.7rem 1.25rem;
    position: fixed;
    width: 100%;
    z-index: 1000;
}

    #blazor-error-ui .dismiss {
        cursor: pointer;
        position: absolute;
        right: 0.75rem;
        top: 0.5rem;
    }
```

Inside the `wwwroot/css` folder, create a `bootstrap` folder. Inside the `bootstrap` folder, place a copy of `bootstrap.min.css`. You can obtain the latest version of `bootstrap.min.css` from the [Bootstrap website](https://getbootstrap.com/). Because all of the content at the site is versioned in the URL, a direct link can't be provided here. Therefore, follow navigation bar links to **Docs** > **Download** to obtain `bootstrap.min.css`.

Add the following `Counter` component to the root of the project, which is the default `Counter` component found in Blazor project templates.

`Counter.razor`:

```razor
<h1>Counter</h1>

<p>Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

Save the `Counter` component (`Counter.razor`).

In **Solution Explorer**, double-click on the `Form1.cs` file to open the designer:

The Form1.cs file in Solution Explorer.

Open the **Toolbox** by either selecting the **Toolbox** button along the left edge of the Visual Studio window or selecting the **View** > **Toolbox** menu command.

Locate the **`BlazorWebView`** control under **`Microsoft.AspNetCore.Components.WebView.WindowsForms`**. Drag the [Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView) from the **Toolbox** into the `Form1` designer. Be careful not to accidentally drag a **`WebView2`** control into the form.

BlazorWebView in the Toolbox.

Visual Studio shows the [Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView) control in the form designer as `WebView2` and automatically names the control `blazorWebView1`:

BlazorWebView in the Form1 designer.

In `Form1`, select the [Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView) (`WebView2`) with a single click.

In the [Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView)'s **Properties**, confirm that the control is named `blazorWebView1`. If the name isn't `blazorWebView1`, the wrong control was dragged from the **Toolbox**. Delete the `WebView2` control in `Form1` and drag the **`BlazorWebView` control** into the form.

The BlazorWebView is automatically named 'blazorWebView1' by Visual Studio.

In the control's properties, change the [Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView)'s **Dock** value to **Fill**:

BlazorWebView properties with Dock set to Fill.

In the `Form1` designer, right-click `Form1` and select **View Code**.

Add namespaces for [Microsoft.AspNetCore.Components.WebView.WindowsForms](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms) and [Microsoft.Extensions.DependencyInjection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection) to the top of the `Form1.cs` file:

```csharp
using Microsoft.AspNetCore.Components.WebView.WindowsForms;
using Microsoft.Extensions.DependencyInjection;
```

Inside the `Form1` constructor, after the `InitializeComponent` method call, add the following code:

```csharp
var services = new ServiceCollection();
services.AddWindowsFormsBlazorWebView();
blazorWebView1.HostPage = "wwwroot\\index.html";
blazorWebView1.Services = services.BuildServiceProvider();
blazorWebView1.RootComponents.Add<Counter>("#app");
```

> **Note:**
> The `InitializeComponent` method is automatically generated at app build time and added to the compilation object for the calling class.

The final, complete C# code of `Form1.cs` with a [file-scoped namespace](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/namespace):

```csharp
using Microsoft.AspNetCore.Components.WebView.WindowsForms;
using Microsoft.Extensions.DependencyInjection;

namespace WinFormsBlazor;

public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();

        var services = new ServiceCollection();
        services.AddWindowsFormsBlazorWebView();
        blazorWebView1.HostPage = "wwwroot\\index.html";
        blazorWebView1.Services = services.BuildServiceProvider();
        blazorWebView1.RootComponents.Add<Counter>("#app");
    }
}
```

## Run the app

Select the start button in the Visual Studio toolbar:

Start button of the Visual Studio toolbar.

The app running on Windows:

The app running on Windows.

## Next steps

In this tutorial, you learned how to:

> 
> * Create a Windows Forms Blazor app project
> * Run the app on Windows

Learn more about Blazor Hybrid apps:

> 
> [blazor/hybrid/index](../index.md)
