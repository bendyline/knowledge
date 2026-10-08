---
title: ASP.NET Core Blazor Hybrid static files
author: guardrex
description: Learn how to consume static asset files in Blazor Hybrid apps.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/static-files
---
# ASP.NET Core Blazor Hybrid static files

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


This article describes how to consume static asset files in Blazor Hybrid apps.

In a Blazor Hybrid app, static files are *app resources*, accessed by Razor components using the following approaches:

* [.NET MAUI](#net-maui): [.NET MAUI file system helpers](https://learn.microsoft.com/dotnet/maui/platform-integration/storage/file-system-helpers)
* [WPF](#wpf) and [Windows Forms](#windows-forms): [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager)

When static assets are only used in the Razor components, static assets can be consumed from the web root (`wwwroot` folder) in a similar way to Blazor WebAssembly and Blazor Server apps. For more information, see the [Static assets limited to Razor components](#static-assets-limited-to-razor-components) section.

## .NET MAUI

In .NET MAUI apps, [*raw assets*](https://learn.microsoft.com/dotnet/maui/fundamentals/single-project#raw-assets) using the `MauiAsset` build action and [.NET MAUI file system helpers](https://learn.microsoft.com/dotnet/maui/platform-integration/storage/file-system-helpers) are used for static assets.

> **Note:**
> Interfaces, classes, and supporting types to work with storage on devices across all supported platforms for features such as choosing a file, saving preferences, and using secure storage are in the [Microsoft.Maui.Storage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Storage) namespace. The namespace is available throughout a MAUI Blazor Hybrid app, so there's no need to specify a `using` statement in a class file or an `@using` Razor directive in a Razor component for the namespace.

Place raw assets into the `Resources/Raw` folder of the app. The example in this section uses a static text file.

`Resources/Raw/Data.txt`:

```text
This is text from a static text file resource.
```

The following Razor component:

* Calls [Microsoft.Maui.Storage.FileSystem.OpenAppPackageFileAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Storage.FileSystem.OpenAppPackageFileAsync%252A) to obtain a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) for the resource.
* Reads the [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) with a [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader).
* Calls [System.IO.StreamReader.ReadToEndAsync%2A](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadToEndAsync%252A) to read the file.

`Pages/StaticAssetExample.razor`:

```razor
@page "/static-asset-example"
@using System.IO
@using Microsoft.Extensions.Logging
@inject ILogger<StaticAssetExample> Logger

<h1>Static Asset Example</h1>

<p>@dataResourceText</p>

@code {
    public string dataResourceText = "Loading resource ...";

    protected override async Task OnInitializedAsync()
    {
        try
        {
            using var stream = 
                await FileSystem.OpenAppPackageFileAsync("Data.txt");
            using var reader = new StreamReader(stream);

            dataResourceText = await reader.ReadToEndAsync();
        }
        catch (FileNotFoundException ex)
        {
            dataResourceText = "Data file not found.";
            Logger.LogError(ex, "'Resource/Raw/Data.txt' not found.");
        }
    }
}
```

For more information, see the following resources:

* [Target multiple platforms from .NET MAUI single project (.NET MAUI documentation)](https://learn.microsoft.com/dotnet/maui/fundamentals/single-project)
* [Improve consistency with resizetizer (dotnet/maui #4367)](https://github.com/dotnet/maui/pull/4367)

## WPF

Place the asset into a folder of the app, typically at the project's root, such as a `Resources` folder. The example in this section uses a static text file.

`Resources/Data.txt`:

```text
This is text from a static text file resource.
```

If a `Properties` folder doesn't exist in the app, create a `Properties` folder in the root of the app.

If the `Properties` folder doesn't contain a resources file (`Resources.resx`), create the file in **Solution Explorer** with the **Add** > **New Item** contextual menu command.

Double-click the `Resource.resx` file.

Select **Strings** > **Files** from the dropdown list.

Select **Add Resource** > **Add Existing File**. If prompted by Visual Studio to confirm editing the file, select **Yes**. Navigate to the `Resources` folder, select the `Data.txt` file, and select **Open**.

In the following example component, [System.Resources.ResourceManager.GetString%2A](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager.GetString%252A) obtains the string resource's text for display.

> **Warning:**
> Never use [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) methods with untrusted data.

`StaticAssetExample.razor`:

```razor
@page "/static-asset-example"
@using System.Resources

<h1>Static Asset Example</h1>

<p>@dataResourceText</p>

@code {
    public string dataResourceText = "Loading resource ...";

    protected override void OnInitialized()
    {
        var resources = 
            new ResourceManager(typeof(WpfBlazor.Properties.Resources));

        dataResourceText = resources.GetString("Data") ?? "'Data' not found.";
    }
}
```

## Windows Forms

Place the asset into a folder of the app, typically at the project's root, such as a `Resources` folder. The example in this section uses a static text file.

`Resources/Data.txt`:

```text
This is text from a static text file resource.
```

Examine the files associated with `Form1` in **Solution Explorer**. If `Form1` doesn't have a resource file (`.resx`), add a `Form1.resx` file with the **Add** > **New Item** contextual menu command.

Double-click the `Form1.resx` file.

Select **Strings** > **Files** from the dropdown list.

Select **Add Resource** > **Add Existing File**. If prompted by Visual Studio to confirm editing the file, select **Yes**. Navigate to the `Resources` folder, select the `Data.txt` file, and select **Open**.

In the following example component:

* The app's assembly name is `WinFormsBlazor`. The [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager)'s base name is set to the assembly name of `Form1` ( `WinFormsBlazor.Form1`).
* [System.Resources.ResourceManager.GetString%2A](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager.GetString%252A) obtains the string resource's text for display.

> **Warning:**
> Never use [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) methods with untrusted data.

`StaticAssetExample.razor`:

```razor
@page "/static-asset-example"
@using System.Resources

<h1>Static Asset Example</h1>

<p>@dataResourceText</p>

@code {
    public string dataResourceText = "Loading resource ...";

    protected override async Task OnInitializedAsync()
    {   
        var resources = 
            new ResourceManager("WinFormsBlazor.Form1", this.GetType().Assembly);

        dataResourceText = resources.GetString("Data") ?? "'Data' not found.";
    }
}
```

## Static assets limited to Razor components

A `BlazorWebView` control has a configured host file (HostPage), typically `wwwroot/index.html`. The HostPage path is relative to the project. All static web assets (scripts, CSS files, images, and other files) that are referenced from a `BlazorWebView` are relative to its configured HostPage.

Static web assets from a [Razor class library (RCL)](../../razor-pages/ui-class.md) use special paths: `_content/{PACKAGE ID}/{PATH AND FILE NAME}`. The `{PACKAGE ID}` placeholder is the library's [package ID](https://learn.microsoft.com/nuget/create-packages/creating-a-package-msbuild#set-properties). The package ID defaults to the project's assembly name if `<PackageId>` isn't specified in the project file. The `{PATH AND FILE NAME}` placeholder is path and file name under `wwwroot`. These paths are logically subpaths of the app's `wwwroot` folder, although they're actually coming from other packages or projects. Component-specific CSS style bundles are also built at the root of the `wwwroot` folder.

The web root of the HostPage determines which subset of static assets are available:

* `wwwroot/index.html` (*recommended*): All assets in the app's `wwwroot` folder are available (for example: `wwwroot/image.png` is available from `/image.png`), including subfolders (for example: `wwwroot/subfolder/image.png` is available from `/subfolder/image.png`). RCL static assets in the RCL's `wwwroot` folder are available (for example: `wwwroot/image.png` is available from the path `_content/{PACKAGE ID}/image.png`), including subfolders (for example: `wwwroot/subfolder/image.png` is available from the path `_content/{PACKAGE ID}/subfolder/image.png`).
* `wwwroot/{PATH}/index.html`: All assets in the app's `wwwroot/{PATH}` folder are available using app web root relative paths. RCL static assets in `wwwroot/{PATH}` aren't because they would be in a non-existent theoretical location, such as `../../_content/{PACKAGE ID}/{PATH}`, which isn't a supported relative path.
* `wwwroot/_content/{PACKAGE ID}/index.html`: All assets in the RCL's `wwwroot/{PATH}` folder are available using RCL web root relative paths. The app's static assets in `wwwroot/{PATH}` are aren't because they would be in a non-existent theoretical location, such as `../../{PATH}`, which isn't a supported relative path.

For most apps, we recommend placing the HostPage at the root of the `wwwroot` folder of the app, which provides the greatest flexibility for supplying static assets from the app, RCLs, and via subfolders of the app and RCLs.

The following examples demonstrate referencing static assets from the app's web root (`wwwroot` folder) with a HostPage rooted in the `wwwroot` folder.

`wwwroot/data.txt`:

```text
This is text from a static text file resource.
```

`wwwroot/scripts.js`:

```javascript
export function showPrompt(message) {
  return prompt(message, 'Type anything here');
}
```

The following Jeep&reg; image is also used in this section's example. You can right-click the following image to save it locally for use in a local test app.

`wwwroot/jeep-yj.png`:

Jeep YJ®

In a Razor component:

* The static text file contents can be read using the following techniques:
  * .NET MAUI: [.NET MAUI file system helpers](https://learn.microsoft.com/dotnet/maui/platform-integration/storage/file-system-helpers) ([Microsoft.Maui.Storage.FileSystem.OpenAppPackageFileAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Storage.FileSystem.OpenAppPackageFileAsync%252A))
  * WPF and Windows Forms: [System.IO.StreamReader.ReadToEndAsync%2A](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadToEndAsync%252A)
* JavaScript files are available at logical subpaths of `wwwroot` using `./` paths.
* The image can be the source attribute (`src`) of an image tag (`<img>`).

`StaticAssetExample2.razor`:

```razor
@page "/static-asset-example-2"
@using Microsoft.Extensions.Logging
@implements IAsyncDisposable
@inject IJSRuntime JS
@inject ILogger<StaticAssetExample2> Logger

<h1>Static Asset Example 2</h1>

<h2>Read a file</h2>

<p>@dataResourceText</p>

<h2>Call JavaScript</h2>

<p>
    <button @onclick="TriggerPrompt">Trigger browser window prompt</button>
</p>

<p>@result</p>

<h2>Show an image</h2>

<p><img alt="1991 Jeep YJ" src="/jeep-yj.png" /></p>

<p>
    <em>Jeep</em> and <em>Jeep YJ</em> are registered trademarks of 
    <a href="https://www.stellantis.com">FCA US LLC (Stellantis NV)</a>.
</p>

@code {
    private string dataResourceText = "Loading resource ...";
    private IJSObjectReference? module;
    private string result;

    protected override async Task OnInitializedAsync()
    {   
        try
        {
            dataResourceText = await ReadData();
        }
        catch (FileNotFoundException ex)
        {
            dataResourceText = "Data file not found.";
            Logger.LogError(ex, "'wwwroot/data.txt' not found.");
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>("import",
                "./scripts.js");
        }
    }

    private async Task TriggerPrompt()
    {
        result = await Prompt("Provide some text");
    }

    public async ValueTask<string> Prompt(string message) =>
        module is not null ?
            await module.InvokeAsync<string>("showPrompt", message) : null;

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

In .NET MAUI apps, add the following `ReadData` method to the `@code` block of the preceding component:

```csharp
private async Task<string> ReadData()
{
    using var stream = await FileSystem.OpenAppPackageFileAsync("wwwroot/data.txt");
    using var reader = new StreamReader(stream);

    return await reader.ReadToEndAsync();
}
```

In WPF and Windows Forms apps, add the following `ReadData` method to the `@code` block of the preceding component:

```csharp
private async Task<string> ReadData()
{
    using var reader = new StreamReader("wwwroot/data.txt");

    return await reader.ReadToEndAsync();
}
```

[Collocated JavaScript files](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fjavascript-location%23load-a-script-from-an-external-javascript-file-js-collocated-with-a-component) are also accessible at logical subpaths of `wwwroot`. Instead of using the script described earlier for the `showPrompt` function in `wwwroot/scripts.js`, the following collocated JavaScript file for the `StaticAssetExample2` component also makes the function available.

`Pages/StaticAssetExample2.razor.js`:

```javascript
export function showPrompt(message) {
  return prompt(message, 'Type anything here');
}
```

Modify the module object reference in the `StaticAssetExample2` component to use the collocated JavaScript file path (`./Pages/StaticAssetExample2.razor.js`):

```csharp
module = await JS.InvokeAsync<IJSObjectReference>("import", 
    "./Pages/StaticAssetExample2.razor.js");
```

## Trademarks

*Jeep* and *Jeep YJ* are registered trademarks of [FCA US LLC (Stellantis NV)](https://www.stellantis.com).

## Additional resources

* [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager)
* [Create resource files for .NET apps (.NET Fundamentals documentation)](https://learn.microsoft.com/dotnet/core/extensions/create-resource-files)
* [How to: Use resources in localizable apps (WPF documentation)](https://learn.microsoft.com/dotnet/desktop/wpf/advanced/how-to-use-resources-in-localizable-applications)
