---
title: Consume ASP.NET Core Razor components from a Razor class library (RCL)
ai-usage: ai-assisted
author: guardrex
description: Discover how components can be included in Blazor apps from an external Razor class library (RCL).
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 07/02/2026
uid: blazor/components/class-libraries
---
# Consume ASP.NET Core Razor components from a Razor class library (RCL)

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


Components can be shared in a [Razor class library (RCL)](../../razor-pages/ui-class.md) across projects. Include components and static assets in an app from:

* Another project in the [solution](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%23visual-studio-solution-file-sln).
* A referenced .NET library.
* A NuGet package.

Just as components are regular .NET types, components provided by an RCL are normal .NET assemblies.

## Create an RCL

# [Visual Studio](#tab/visual-studio)

1. Create a new project.
1. In the **Create a new project** dialog, select **Razor Class Library** from the list of ASP.NET Core project templates. Select **Next**.
1. In the **Configure your new project** dialog, provide a project name in the **Project name** field. Examples in this topic use the project name `ComponentLibrary`. Select **Next**.
1. In the **Additional information** dialog, don't select **Support pages and views**. Select **Create**.
1. Add the RCL to a solution:
   1. Open the solution.
   1. Right-click the solution in **Solution Explorer**. Select **Add** > **Existing Project**.
   1. Navigate to the RCL's project file.
   1. Select the RCL's project file (`.csproj`).
1. Add a reference to the RCL from the app:
   1. Right-click the app project. Select **Add** > **Project Reference**.
   1. Select the RCL project. Select **OK**.

# [Visual Studio Code / .NET CLI](#tab/visual-studio-code+net-cli)

1. Use the **Razor Class Library** project template (`razorclasslib`) with the [`dotnet new`](https://learn.microsoft.com/dotnet/core/tools/dotnet-new) command in a command shell. In the following example, an RCL is created and named `ComponentLibrary` using the `-o|--output` option. The folder that holds `ComponentLibrary` is created automatically when the command is executed:

   ```dotnetcli
   dotnet new razorclasslib -o ComponentLibrary
   ```

1. To add the library to an existing project, use the [`dotnet add reference`](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-reference) command in a command shell. In the following command, the `{PATH TO LIBRARY}` placeholder is the path to the library's project folder:

   ```dotnetcli
   dotnet add reference {PATH TO LIBRARY}
   ```

---

## How an RCL is different from an ASP.NET Core class library

The following characteristics distinguish an RCL from an ASP.NET Core class library:

* An RCL uses the `Microsoft.NET.Sdk.Razor` SDK, while an ordinary class library project uses the `Microsoft.NET.Sdk` SDK. The `Microsoft.NET.Sdk.Razor` SDK builds the library with custom MSBuild tooling specifically designed to compile, build, and package Razor files (`.cshtml`) and Razor component files (`.razor`).

**Applies to: \>= aspnetcore-5.0**

* An RCL's project file (`.csproj`) includes the `SupportedPlatform` property for the `browser` platform. For more information, see the [Client-side browser compatibility analyzer](#client-side-browser-compatibility-analyzer) section.



* An RCL references the [`Microsoft.AspNetCore.Components.Web` NuGet package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.Web) and usually relies on an imports file (`_Imports.razor`) with an `@using` statement for the [Microsoft.AspNetCore.Components.Web](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web) namespace. The package provides web-specific infrastructure, HTML element abstractions, and event handling bindings required to run Blazor apps inside a web browser.

## Consume a Razor component from an RCL

To consume components from an RCL in another project, use either of the following approaches:

* Use the full component type name, which includes the RCL's namespace.
* Individual components can be added by name without the RCL's namespace if Razor's [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directive declares the RCL's namespace. Use the following approaches:
  * Add the `@using` directive to individual components.
  * Include the `@using` directive in the top-level imports file (`_Imports.razor`) to make the library's components available to an entire project. Add the directive to an imports file at any level to apply the namespace to a single component or set of components within a folder. When an imports file is used, individual components don't require an `@using` directive for the RCL's namespace.

In the following examples, `ComponentLibrary` is an RCL containing the `Component1` component. The `Component1` component is an example component automatically added to an RCL created from the RCL project template that isn't created to support pages and views.

`Component1.razor` in the `ComponentLibrary` RCL:

```razor
<div class="my-component">
    This component is defined in the <strong>ComponentLibrary</strong> package.
</div>
```

In the app that consumes the RCL, reference the `Component1` component using its namespace, as the following example shows.

`ConsumeComponent1.razor`:

```razor
@page "/consume-component-1"

<h1>Consume component (full namespace example)</h1>

<ComponentLibrary.Component1 />
```

Alternatively, add a [`@using`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23using) directive and use the component without its namespace. The following `@using` directive can also appear in any imports file (`_Imports.razor`) in or above the current folder.

`ConsumeComponent2.razor`:

```razor
@page "/consume-component-2"
@using ComponentLibrary

<h1>Consume component (<code>@@using</code> example)</h1>

<Component1 />
```

**Applies to: \>= aspnetcore-6.0**

For library components that use [CSS isolation](css-isolation.md), the component styles are automatically made available to the consuming app. There's no need to manually link or import the library's individual component stylesheets or its bundled CSS file in the app that consumes the library. The app uses CSS imports to reference the RCL's bundled styles. The bundled styles aren't published as a static web asset of the app that consumes the library. For a class library named `ClassLib` and a Blazor app with a `BlazorSample.styles.css` stylesheet, the RCL's stylesheet is imported at the top of the app's stylesheet automatically at build time:
  
```css
@import '_content/ClassLib/ClassLib.bundle.scp.css';
```

For the preceding examples, `Component1`'s stylesheet (`Component1.razor.css`) is bundled automatically.

`Component1.razor.css` in the `ComponentLibrary` RCL:

```css
.my-component {
    border: 2px dashed red;
    padding: 1em;
    margin: 1em 0;
    background-image: url('background.png');
}
```

The background image is also included from the RCL project template and resides in the `wwwroot` folder of the RCL.

`wwwroot/background.png` in the `ComponentLibrary` RCL:

Diagonally-striped background image from the RCL project template

To provide additional library component styles from stylesheets in the library's `wwwroot` folder, add stylesheet `<link>` tags to the RCL's consumer, as the next example demonstrates.

> **Important:**
> Generally, library components use [CSS isolation](css-isolation.md) to bundle and provide component styles. Component styles that rely upon CSS isolation are automatically made available to the app that uses the RCL. There's no need to manually link or import the library's individual component stylesheets or its bundled CSS file in the app that consumes the library. The following example is for providing global stylesheets *outside of CSS isolation*, which usually isn't a requirement for typical apps that consume RCLs.

The following background image is used in the next example. If you implement the example shown in this section, right-click the image to save it locally.

`wwwroot/extra-background.png` in the `ComponentLibrary` RCL:

Diagonally-striped background image added to the library by the developer

Add a new stylesheet to the RCL with an `extra-style` class.

`wwwroot/additionalStyles.css` in the `ComponentLibrary` RCL:

```css
.extra-style {
    border: 2px dashed blue;
    padding: 1em;
    margin: 1em 0;
    background-image: url('extra-background.png');
}
```

Add a component to the RCL that uses the `extra-style` class.

`ExtraStyles.razor` in the `ComponentLibrary` RCL:

```razor
<div class="extra-style">
    <p>
        This component is defined in the <strong>ComponentLibrary</strong> package.
    </p>
</div>
```

Add a page to the app that uses the `ExtraStyles` component from the RCL.

`ConsumeComponent3.razor`:

```razor
@page "/consume-component-3"
@using ComponentLibrary

<h1>Consume component (<code>additionalStyles.css</code> example)</h1>

<ExtraStyles />
```

Link to the library's stylesheet in the app's `<head>` markup ([location of `<head>` content](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-head-and-body-content)):



**Applies to: \>= aspnetcore-9.0**

Blazor Web Apps:

```html
<link href="@Assets["_content/ComponentLibrary/additionalStyles.css"]" rel="stylesheet">
```

Standalone Blazor WebAssembly apps:

```html
<link href="_content/ComponentLibrary/additionalStyles.css" rel="stylesheet">
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

```html
<link href="_content/ComponentLibrary/additionalStyles.css" rel="stylesheet">
```



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

For library components that use [CSS isolation](css-isolation.md), the component styles are automatically made available to the consuming app. There's no need to manually link or import the library's individual component stylesheets or its bundled CSS file in the app that consumes the library. The app uses CSS imports to reference the RCL's bundled styles. The bundled styles aren't published as a static web asset of the app that consumes the library. For a class library named `ClassLib` and a Blazor app with a `BlazorSample.styles.css` stylesheet, the RCL's stylesheet is imported at the top of the app's stylesheet automatically at build time:
  
```css
@import '_content/ClassLib/ClassLib.bundle.scp.css';
```

For the preceding examples, `Component1`'s stylesheet (`Component1.razor.css`) is bundled automatically.

`Component1.razor.css` in the `ComponentLibrary` RCL:

```css
.my-component {
    border: 2px dashed red;
    padding: 1em;
    margin: 1em 0;
    background-image: url('background.png');
}
```

The background image is also included from the RCL project template and resides in the `wwwroot` folder of the RCL.

`wwwroot/background.png` in the `ComponentLibrary` RCL:

Diagonally-striped background image from the RCL project template



**Applies to: < aspnetcore-5.0**

The following background image and stylesheet are used by the RCL's `Component1` example component. There's no need to add these static assets to a new RCL created from the RCL project template, as they're added automatically by the project template.

`wwwroot/background.png` in the `ComponentLibrary` RCL:

Diagonally-striped background image added to the library by the RCL project template

`wwwroot/styles.css` in the `ComponentLibrary` RCL:

```css
.my-component {
    border: 2px dashed red;
    padding: 1em;
    margin: 1em 0;
    background-image: url('background.png');
}
```

To provide `Component1`'s `my-component` CSS class, link to the library's stylesheet in the app's `<head>` markup ([location of `<head>` content](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-head-and-body-content)):

```html
<link href="_content/ComponentLibrary/styles.css" rel="stylesheet" />
```



## Make routable components available from the RCL

To make routable components in the RCL available for direct requests, the RCL's assembly must be disclosed to the app's router.

Open the app's `App` component (`App.razor`). Assign an [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly) collection to the [Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies%252A) parameter of the [Microsoft.AspNetCore.Components.Routing.Router](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router) component to include the RCL's assembly. In the following example, the `ComponentLibrary.Component1` component is used to discover the RCL's assembly.

```razor
AdditionalAssemblies="new[] { typeof(ComponentLibrary.Component1).Assembly }"
```

For more information, see [blazor/fundamentals/routing#route-to-components-from-multiple-assemblies](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-to-components-from-multiple-assemblies).

## Create an RCL with static assets in the `wwwroot` folder

An RCL's static assets are available to any app that consumes the library.

Place static assets in the `wwwroot` folder of the RCL and reference the static assets with the following path in the app: `_content/{PACKAGE ID}/{PATH AND FILE NAME}`. The `{PACKAGE ID}` placeholder is the library's [package ID](https://learn.microsoft.com/nuget/create-packages/creating-a-package-msbuild#set-properties). The package ID defaults to the project's assembly name if `<PackageId>` isn't specified in the project file. The `{PATH AND FILE NAME}` placeholder is path and file name under `wwwroot`. This path format is also used in the app for static assets supplied by NuGet packages added to the RCL.

The following example demonstrates the use of RCL static assets with an RCL named `ComponentLibrary` and a Blazor app that consumes the RCL. The app has a project reference for the `ComponentLibrary` RCL.

The following Jeep&reg; image is used in this section's example. If you implement the example shown in this section, right-click the image to save it locally.

`wwwroot/jeep-yj.png` in the `ComponentLibrary` RCL:

Jeep YJ®

Add the following `JeepYJ` component to the RCL.

`JeepYJ.razor` in the `ComponentLibrary` RCL:

```razor
<h3>ComponentLibrary.JeepYJ</h3>

<p>
    <img alt="Jeep YJ&reg;" src="_content/ComponentLibrary/jeep-yj.png" />
</p>
```

Add the following `Jeep` component to the app that consumes the `ComponentLibrary` RCL. The `Jeep` component uses:

* The Jeep YJ&reg; image from the `ComponentLibrary` RCL's `wwwroot` folder.
* The `JeepYJ` component from the RCL.

`Jeep.razor`:

```razor
@page "/jeep"
@using ComponentLibrary

<div style="float:left;margin-right:10px">
    <h3>Direct use</h3>

    <p>
        <img alt="Jeep YJ&reg;" src="_content/ComponentLibrary/jeep-yj.png" />
    </p>
</div>

<JeepYJ />

<p>
    <em>Jeep</em> and <em>Jeep YJ</em> are registered trademarks of 
    <a href="https://www.stellantis.com">FCA US LLC (Stellantis NV)</a>.
</p>
```

Rendered `Jeep` component:

Jeep component

For more information, see [razor-pages/ui-class#create-an-rcl-with-static-assets](https://learn.microsoft.com/search/?terms=razor-pages%2Fui-class%23create-an-rcl-with-static-assets).

**Applies to: \>= aspnetcore-6.0**

## Create an RCL with JavaScript files collocated with components

Collocation of JavaScript (JS) files for Razor components is a convenient way to organize scripts in an app.

Razor components of Blazor apps collocate JS files using the `.razor.js` extension and are publicly addressable using the path to the file in the project:

`{PATH}/{COMPONENT}.razor.js`

* The `{PATH}` placeholder is the path to the component.
* The `{COMPONENT}` placeholder is the component.

When the app is published, the framework automatically moves the script to the web root. Scripts are moved to `bin/Release/{TARGET FRAMEWORK MONIKER}/publish/wwwroot/{PATH}/{COMPONENT}.razor.js`, where the placeholders are:

* `{TARGET FRAMEWORK MONIKER}` is the [Target Framework Moniker (TFM)](https://learn.microsoft.com/dotnet/standard/frameworks).
* `{PATH}` is the path to the component.
* `{COMPONENT}` is the component name.

No change is required to the script's relative URL, as Blazor takes care of placing the JS file in published static assets for you.

This section and the following examples are primarily focused on explaining JS file collocation. The first example demonstrates a collocated JS file with an ordinary JS function. The second example demonstrates the use of a module to load a function, which is the recommended approach for most production apps. Calling JS from .NET is fully covered in [blazor/js-interop/call-javascript-from-dotnet](../javascript-interoperability/call-javascript-from-dotnet.md), where there are further explanations of the Blazor JS API with additional examples. Component disposal, which is present in the second example, is covered in [blazor/components/component-disposal](component-disposal.md).

The following `JsCollocation1` component loads a script via a [`HeadContent` component](control-head-content.md) and calls a JS function with [Microsoft.JSInterop.IJSRuntime.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime.InvokeAsync%252A). The `{PATH}` placeholder is the path to the component.

> **Important:**
> If you use the following code for a demonstration in a test app, change the `{PATH}` placeholder to the path of the component (example: `Components/Pages` in .NET 8 or later or `Pages` in .NET 7 or earlier). In a Blazor Web App (.NET 8 or later), the component requires an interactive render mode applied either globally to the app or to the component definition.

Add the following script after the Blazor script ([location of the Blazor start script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script)):

```html
<script src="{PATH}/JsCollocation1.razor.js"></script>
```

`JsCollocation1` component (`{PATH}/JsCollocation1.razor`):

```razor
@page "/js-collocation-1"
@inject IJSRuntime JS

<PageTitle>JS Collocation 1</PageTitle>

<h1>JS Collocation Example 1</h1>

<button @onclick="ShowPrompt">Call showPrompt1</button>

@if (!string.IsNullOrEmpty(result))
{
    <p>
        Hello @result!
    </p>
}

@code {
    private string? result;

    public async Task ShowPrompt()
    {
        result = await JS.InvokeAsync<string>(
            "showPrompt1", "What's your name?");
        StateHasChanged();
    }
}
```

The collocated JS file is placed next to the `JsCollocation1` component file with the file name `JsCollocation1.razor.js`. In the `JsCollocation1` component, the script is referenced at the path of the collocated file. In the following example, the `showPrompt1` function accepts the user's name from a [`Window prompt()`](https://developer.mozilla.org/docs/Web/API/Window/prompt) and returns it to the `JsCollocation1` component for display.

`{PATH}/JsCollocation1.razor.js`:

```javascript
function showPrompt1(message) {
  return prompt(message, 'Type your name here');
}
```

The preceding approach isn't recommended for general use in production apps because the approach pollutes the client with global functions. A better approach for production apps is to use JS modules. The same general principles apply to loading a JS module from a collocated JS file, as the next example demonstrates.

The following `JsCollocation2` component's `OnAfterRenderAsync` method loads a JS module into `module`, which is an [Microsoft.JSInterop.IJSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSObjectReference) of the component class. `module` is used to call the `showPrompt2` function. The `{PATH}` placeholder is the path to the component.

> **Important:**
> If you use the following code for a demonstration in a test app, change the `{PATH}` placeholder to the path of the component. In a Blazor Web App (.NET 8 or later), the component requires an interactive render mode applied either globally to the app or to the component definition.

`JsCollocation2` component (`{PATH}/JsCollocation2.razor`):

```razor
@page "/js-collocation-2"
@implements IAsyncDisposable
@inject IJSRuntime JS

<PageTitle>JS Collocation 2</PageTitle>

<h1>JS Collocation Example 2</h1>

<button @onclick="ShowPrompt">Call showPrompt2</button>

@if (!string.IsNullOrEmpty(result))
{
    <p>
        Hello @result!
    </p>
}

@code {
    private IJSObjectReference? module;
    private string? result;

    protected async override Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            /*
                Change the {PATH} placeholder in the next line to the path of
                the collocated JS file in the app. Examples:

                ./Components/Pages/JsCollocation2.razor.js (.NET 8 or later)
                ./Pages/JsCollocation2.razor.js (.NET 7 or earlier)
            */
            module = await JS.InvokeAsync<IJSObjectReference>("import",
                "./{PATH}/JsCollocation2.razor.js");
        }
    }

    public async Task ShowPrompt()
    {
        if (module is not null)
        {
            result = await module.InvokeAsync<string>(
                "showPrompt2", "What's your name?");
            StateHasChanged();
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

In the preceding example, [Microsoft.JSInterop.JSDisconnectedException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSDisconnectedException) is trapped during module disposal in case Blazor's SignalR circuit is lost. If the preceding code is used in a Blazor WebAssembly app, there's no SignalR connection to lose, so you can remove the `try`-`catch` block and leave the line that disposes the module (`await module.DisposeAsync();`). For more information, see [blazor/js-interop/index#javascript-interop-calls-without-a-circuit](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-interop-calls-without-a-circuit).

`{PATH}/JsCollocation2.razor.js`:

```javascript
export function showPrompt2(message) {
  return prompt(message, 'Type your name here');
}
```

> **Important:**
> Don't place a `<script>` tag for `JsCollocation2.razor.js` after the [Blazor script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script) because the module is loaded and cached automatically when the [dynamic `import()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/import) is invoked.

Use of scripts and modules for collocated JS in a Razor class library (RCL) is only supported for Blazor's JS interop mechanism based on the [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) interface. If you're implementing [JavaScript `[JSImport]`/`[JSExport]` interop](../javascript-interoperability/import-export-interop.md), see [blazor/js-interop/import-export-interop#razor-class-library-rcl-collocated-js-is-unsupported](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fimport-export-interop%23razor-class-library-rcl-collocated-js-is-unsupported).

For scripts or modules provided by a Razor class library (RCL) using [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime)-based JS interop, the following path is used:

`./_content/{PACKAGE ID}/{PATH}/{COMPONENT}.{EXTENSION}.js`

* The path segment for the current directory (`./`) is required in order to create the correct static asset path to the JS file.
* The `{PACKAGE ID}` placeholder is the RCL's package identifier (or library name for a class library referenced by the app).
* The `{PATH}` placeholder is the path to the component. If a Razor component is located at the root of the RCL, the path segment isn't included.
* The `{COMPONENT}` placeholder is the component name.
* The `{EXTENSION}` placeholder matches the extension of component, either `razor` or `cshtml`.

In the following Blazor app example:

* The RCL's package identifier is `AppJS`.
* A module's scripts are loaded for the `JsCollocation3` component (`JsCollocation3.razor`).
* The `JsCollocation3` component is in the `Components/Pages` folder of the RCL.

```csharp
module = await JS.InvokeAsync<IJSObjectReference>("import", 
    "./_content/AppJS/Components/Pages/JsCollocation3.razor.js");
```




**Applies to: < aspnetcore-8.0**

## Supply components and static assets to multiple hosted Blazor apps

For more information, see [blazor/host-and-deploy/webassembly/multiple-hosted-webassembly](../host-and-deploy/webassembly/multiple-hosted-webassembly.md).



**Applies to: \>= aspnetcore-5.0**

## Client-side browser compatibility analyzer

Client-side apps target the full .NET API surface area, but not all .NET APIs are supported on WebAssembly due to browser sandbox constraints. Unsupported APIs throw [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) when running on WebAssembly. A platform compatibility analyzer warns the developer when the app uses APIs that aren't supported by the app's target platforms. For client-side apps, this means checking that APIs are supported in browsers. Annotating .NET framework APIs for the compatibility analyzer is an on-going process, so not all .NET framework API is currently annotated.

Blazor Web Apps that enable Interactive WebAssembly components, Blazor WebAssembly apps, and RCL projects *automatically* enable browser compatibility checks by adding `browser` as a supported platform with the `SupportedPlatform` MSBuild item. Library developers can manually add the `SupportedPlatform` item to a library's project file to enable the feature:

```xml
<ItemGroup>
  <SupportedPlatform Include="browser" />
</ItemGroup>
```

When authoring a library, indicate that a particular API isn't supported in browsers by specifying `browser` to [System.Runtime.Versioning.UnsupportedOSPlatformAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Versioning.UnsupportedOSPlatformAttribute):

```csharp
using System.Runtime.Versioning;

...

[UnsupportedOSPlatform("browser")]
private static string GetLoggingDirectory()
{
    ...
}
```

For more information, see [Annotating APIs as unsupported on specific platforms (`dotnet/designs` GitHub repository](https://github.com/dotnet/designs/blob/main/accepted/2020/platform-exclusion/platform-exclusion.md#build-configuration-for-platforms).



**Applies to: \>= aspnetcore-5.0**

## JavaScript isolation in JavaScript modules

Blazor enables JavaScript isolation in standard [JavaScript modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules). JavaScript isolation provides the following benefits:

* Imported JavaScript no longer pollutes the global namespace.
* Consumers of the library and components aren't required to manually import the related JavaScript.

For more information, see [blazor/js-interop/call-javascript-from-dotnet#javascript-isolation-in-javascript-modules](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23javascript-isolation-in-javascript-modules).



**Applies to: \>= aspnetcore-6.0**

## Avoid trimming JavaScript-invokable .NET methods

[Runtime relinking](https://learn.microsoft.com/search/?terms=blazor%2Ftooling%2Fwebassembly%23runtime-relinking) trims class instance JavaScript-invokable .NET methods unless they're explicitly preserved. For more information, see [blazor/js-interop/call-dotnet-from-javascript#avoid-trimming-javascript-invokable-net-methods](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-dotnet-from-javascript%23avoid-trimming-javascript-invokable-net-methods).



## Build, pack, and ship to NuGet

Because Razor class libraries that contain Razor components are standard .NET libraries, packing and shipping them to NuGet is no different from packing and shipping any library to NuGet. Packing is performed using the [`dotnet pack`](https://learn.microsoft.com/dotnet/core/tools/dotnet-pack) command in a command shell:

```dotnetcli
dotnet pack
```

Upload the package to NuGet using the [`dotnet nuget push`](https://learn.microsoft.com/dotnet/core/tools/dotnet-nuget-push) command in a command shell.

## Trademarks

*Jeep* and *Jeep YJ* are registered trademarks of [FCA US LLC (Stellantis NV)](https://www.stellantis.com).

## Additional resources

**Applies to: \>= aspnetcore-5.0**

* [razor-pages/ui-class](../../razor-pages/ui-class.md)
* [fundamentals/target-aspnetcore](../../fundamentals/target-aspnetcore.md)
* [Add an XML Intermediate Language (IL) Trimmer configuration file to a library](../host-and-deploy/configure-trimmer.md)
* [CSS isolation support with Razor class libraries](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcss-isolation%23razor-class-library-rcl-support)



**Applies to: < aspnetcore-5.0**

* [razor-pages/ui-class](../../razor-pages/ui-class.md)
* [fundamentals/target-aspnetcore](../../fundamentals/target-aspnetcore.md)
* [Add an XML Intermediate Language (IL) Linker configuration file to a library](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fconfigure-linker%23add-an-xml-linker-configuration-file-to-a-library)
