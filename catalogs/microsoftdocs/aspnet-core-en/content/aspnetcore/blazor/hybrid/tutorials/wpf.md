---
title: Build a Windows Presentation Foundation (WPF) Blazor app
author: guardrex
description: Build a Windows Presentation Foundation (WPF) app step-by-step.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/tutorials/wpf
---
# Build a Windows Presentation Foundation (WPF) Blazor app

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


This tutorial shows you how to build and run a WPF Blazor app. You learn how to:

> 
> * Create a WPF Blazor app project
> * Add a Razor component to the project
> * Run the app on Windows

## Prerequisites

* [Supported platforms (WPF documentation)](https://learn.microsoft.com/dotnet/desktop/wpf/overview/)
* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) with the **.NET desktop development** workload

## Visual Studio workload

If the **.NET desktop development** workload isn't installed, use the Visual Studio installer to install the workload. For more information, see [Modify Visual Studio workloads, components, and language packs](https://learn.microsoft.com/visualstudio/install/modify-visual-studio).

Visual Studio installer workload selection.

## Create a WPF Blazor project

Launch Visual Studio. In the **Start Window**, select **Create a new project**:

Create a new solution in Visual Studio.

In the **Create a new project** dialog, filter the **Project type** dropdown to **Desktop**. Select the C# project template for **WPF Application** and select the **Next** button:

Create a new project in Visual Studio.

In the **Configure your new project** dialog:

* Set the **Project name** to **WpfBlazor**.
* Choose a suitable location for the project.
* Select the **Next** button.

Configure the project.

In the **Additional information** dialog, select the framework version with the **Framework** dropdown list. Select the **Create** button:

The Additional Information dialog for the WPF project.

Use [NuGet Package Manager](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-visual-studio) to install the [`Microsoft.AspNetCore.Components.WebView.Wpf`](https://nuget.org/packages/Microsoft.AspNetCore.Components.WebView.Wpf) NuGet package:

Use Nuget Package Manager in Visual Studio to install the Microsoft.AspNetCore.Components.WebView\.Wpf NuGet package.

In **Solution Explorer**, right-click the project's name, **WpfBlazor**, and select **Edit Project File** to open the project file (`WpfBlazor.csproj`).

At the top of the project file, change the SDK to `Microsoft.NET.Sdk.Razor`:

```xml
<Project Sdk="Microsoft.NET.Sdk.Razor">
```

**Applies to: \>= aspnetcore-10.0**

In the project file's existing `<TargetFramework>` property, add a Windows 10 or later version number:

```xml
<TargetFramework>net10.0-windows10.0.17763.0</TargetFramework>
```

> **Note:**
> The preceding guidance on setting the project's target framework version to target Windows 10 or later is a result of switching to the `WebView2CompositionControl` with the release of .NET 10.



<!--
    The following is a workaround for https://github.com/dotnet/wpf/issues/5697 (fixes https://github.com/dotnet/maui/issues/3526).
    Additional open issue on it: https://github.com/dotnet/maui/issues/5861
-->

In the project file's existing `<PropertyGroup>` add the following markup to set the app's root namespace, which is `WpfBlazor` in this tutorial:

```xml
<RootNamespace>WpfBlazor</RootNamespace>
```

> **Note:**
> The preceding guidance on setting the project's root namespace is a temporary workaround. For more information, see [[Blazor][Wpf] Root namespace related issue (dotnet/maui #5861)](https://github.com/dotnet/maui/issues/5861).

Save the changes to the project file (`WpfBlazor.csproj`).

Add an `_Imports.razor` file to the root of the project with an [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directive for [Microsoft.AspNetCore.Components.Web](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web).

`_Imports.razor`:

```razor
@using Microsoft.AspNetCore.Components.Web
```

Save the `_Imports.razor` file.

Add a `wwwroot` folder to the project.

Add an `index.html` file to the `wwwroot` folder with the following markup.

`wwwroot/index.html`:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WpfBlazor</title>
    <base href="/" />
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/app.css" rel="stylesheet" />
    <link href="WpfBlazor.styles.css" rel="stylesheet" />
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

Inside the `wwwroot` folder, create a `css` folder.

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

Inside the `wwwroot/css` folder, create a `bootstrap` folder. Inside the `bootstrap` folder, place a copy of `bootstrap.min.css`. You can obtain the latest version of `bootstrap.min.css` from the [Bootstrap website](https://getbootstrap.com/). Follow navigation bar links to **Docs** > **Download**. A direct link can't be provided here because all of the content at the site is versioned in the URL.

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

If the `MainWindow` designer isn't open, open it by double-clicking the `MainWindow.xaml` file in **Solution Explorer**. In the `MainWindow` designer, replace the XAML code with the following:

```xaml
<Window x:Class="WpfBlazor.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:blazor="clr-namespace:Microsoft.AspNetCore.Components.WebView.Wpf;assembly=Microsoft.AspNetCore.Components.WebView.Wpf"
        xmlns:local="clr-namespace:WpfBlazor"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid>
        <blazor:BlazorWebView HostPage="wwwroot\index.html" Services="{DynamicResource services}">
            <blazor:BlazorWebView.RootComponents>
                <blazor:RootComponent Selector="#app" ComponentType="{x:Type local:Counter}" />
            </blazor:BlazorWebView.RootComponents>
        </blazor:BlazorWebView>
    </Grid>
</Window>
```

In **Solution Explorer**, right-click `MainWindow.xaml` and select **View Code**:

View MainWindow code.

Add the namespace [Microsoft.Extensions.DependencyInjection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection) to the top of the `MainWindow.xaml.cs` file:

```csharp
using Microsoft.Extensions.DependencyInjection;
```

Inside the `MainWindow` constructor, after the `InitializeComponent` method call, add the following code:

```csharp
var serviceCollection = new ServiceCollection();
serviceCollection.AddWpfBlazorWebView();
Resources.Add("services", serviceCollection.BuildServiceProvider());
```

> **Note:**
> The `InitializeComponent` method is automatically generated at app build time and added to the compilation object for the calling class.

The final, complete C# code of `MainWindow.xaml.cs` with a [file-scoped namespace](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/namespace) and comments removed:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Extensions.DependencyInjection;

namespace WpfBlazor;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        var serviceCollection = new ServiceCollection();
        serviceCollection.AddWpfBlazorWebView();
        Resources.Add("services", serviceCollection.BuildServiceProvider());
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
> * Create a WPF Blazor app project
> * Add a Razor component to the project
> * Run the app on Windows

Learn more about Blazor Hybrid apps:

> 
> [blazor/hybrid/index](../index.md)
