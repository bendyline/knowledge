---
title: JavaScript JSImport/JSExport interop with ASP.NET Core Blazor
author: guardrex
description: Learn how to interact with JavaScript in client-side components using JavaScript `[JSImport]`/`[JSExport]` interop.
monikerRange: '>= aspnetcore-7.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/js-interop/import-export-interop
---
# JavaScript `[JSImport]`/`[JSExport]` interop with ASP.NET Core Blazor

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


This article explains how to interact with JavaScript (JS) in client-side components using JavaScript (JS) `[JSImport]`/`[JSExport]` interop API. For additional information and examples, see [client-side/dotnet-interop/index](../../client-side/dotnet-interop/index.md).

For additional guidance, see the [Configuring and hosting .NET WebAssembly applications](https://github.com/dotnet/runtime/blob/main/src/mono/wasm/features.md) guidance in the .NET Runtime (`dotnet/runtime`) GitHub repository.

Blazor provides its own JS interop mechanism based on the [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) interface. Blazor's JS interop is uniformly supported across Blazor render modes and for Blazor Hybrid apps. [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) also enables library authors to build JS interop libraries for sharing across the Blazor ecosystem and remains the recommended approach for JS interop in Blazor. See the following articles:

* [blazor/js-interop/call-javascript-from-dotnet](call-javascript-from-dotnet.md)
* [blazor/js-interop/call-dotnet-from-javascript](call-dotnet-from-javascript.md)

This article describes an alternative JS interop approach specific to client-side components executed on WebAssembly. These approaches are appropriate when you only expect to run on client-side WebAssembly. Library authors can use these approaches to optimize JS interop by checking during code execution if the app is running on WebAssembly in a browser ([System.OperatingSystem.IsBrowser%2A](https://learn.microsoft.com/search/?terms=System.OperatingSystem.IsBrowser%252A)). The approaches described in this article should be used to replace the obsolete unmarshalled JS interop API when migrating to .NET 7 or later.

> **Note:**
> This article focuses on JS interop in client-side components. For guidance on calling .NET in JavaScript apps, see [client-side/dotnet-interop/wasm-browser-app](../../client-side/dotnet-interop/wasm-browser-app.md).

## Obsolete JavaScript interop API

Unmarshalled JS interop using [Microsoft.JSInterop.IJSUnmarshalledRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSUnmarshalledRuntime) API is obsolete in ASP.NET Core in .NET 7 or later. Follow the guidance in this article to replace the obsolete API.

## Prerequisites

[Visual Studio](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2022) with the **ASP.NET and web development** workload.

No further tooling is required if you plan on implementing `[JSImport]`/`[JSExport]` interop in a Blazor WebAssembly app generated from the Blazor WebAssembly project template.

If you plan to use the WebAssembly Browser or WebAssembly Console app project templates, install the [`Microsoft.NET.Runtime.WebAssembly.Templates`](https://www.nuget.org/packages/Microsoft.NET.Runtime.WebAssembly.Templates) NuGet package with the following command:

```dotnetcli
dotnet new install Microsoft.NET.Runtime.WebAssembly.Templates
```

For more information, see [client-side/dotnet-interop/wasm-browser-app#experimental-workload-and-project-templates](https://learn.microsoft.com/search/?terms=client-side%2Fdotnet-interop%2Fwasm-browser-app%23experimental-workload-and-project-templates).

## Namespace

The JS interop API ([System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A)) described in this article is controlled by attributes in the [System.Runtime.InteropServices.JavaScript](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript) namespace.

## Enable unsafe blocks

Enable the [Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks](https://learn.microsoft.com/search/?terms=Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks) property in app's project file, which permits the code generator in the Roslyn compiler to use pointers for JS interop:

```xml
<PropertyGroup>
  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
</PropertyGroup>
```

> **Warning:**
> The JS interop API requires enabling [Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks](https://learn.microsoft.com/search/?terms=Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks). Be careful when implementing your own unsafe code in .NET apps, which can introduce security and stability risks. For more information, see [Unsafe code, pointer types, and function pointers](https://learn.microsoft.com/dotnet/csharp/language-reference/unsafe-code).

## Razor class library (RCL) collocated JS is unsupported

Generally, the JS location support for [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime)-based JS interop ([blazor/js-interop/javascript-location](location-of-javascript.md)) is also present for the `[JSImport]`/`[JSExport]` interop described by this article. The only unsupported JS location feature is for *collocated JS in a Razor class library (RCL)*.

Instead of using collocated JS in an RCL, place the JS file in the RCL's `wwwroot` folder and reference it using the usual path for RCL static assets:

`_content/{PACKAGE ID}/{PATH}/{FILE NAME}.js`

* The `{PACKAGE ID}` placeholder is the RCL's package identifier (or library name for a class library).
* The `{PATH}` placeholder is the path to the file.
* The `{FILE NAME}` placeholder is the file name.

Although collocated JS in an RCL isn't supported by `[JSImport]`/`[JSExport]` interop, you can keep your JS files organized by taking either or both of the following approaches:

* Name the JS file the same as the component where the JS is used. For a component in the RCL named `CallJavaScriptFromLib` (`CallJavaScriptFromLib.razor`), name the file `CallJavaScriptFromLib.js` in the `wwwroot` folder.
* Place component-specific JS files in a `Components` folder inside the RCL's `wwwroot` folder and use "`Components`" in the path to the file: `_content/{PACKAGE ID}/Components/CallJavaScriptFromLib.js`.

## Call JavaScript from .NET

This section explains how to call JS functions from .NET.

In the following `CallJavaScript1` component:

* The `CallJavaScript1` module is imported asynchronously from the [collocated JS file](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fjavascript-location%23load-a-script-from-an-external-javascript-file-js-collocated-with-a-component) with [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A).
* The imported `getMessage` JS function is called by `GetWelcomeMessage`.
* The returned welcome message string is displayed in the UI via the `message` field.

`CallJavaScript1.razor`:

**Applies to: \>= aspnetcore-8.0**

```razor
@page "/call-javascript-1"
@rendermode InteractiveWebAssembly
@using System.Runtime.InteropServices.JavaScript

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call JS Example 1)
</h1>

@(message is not null ? message : string.Empty)

@code {
    private string? message;

    protected override async Task OnInitializedAsync()
    {
        await JSHost.ImportAsync("CallJavaScript1", 
            "../Components/Pages/CallJavaScript1.razor.js");

        message = GetWelcomeMessage();
    }
}
```



**Applies to: < aspnetcore-8.0**

```razor
@page "/call-javascript-1"
@using System.Runtime.InteropServices.JavaScript

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call JS Example 1)
</h1>

@(message is not null ? message : string.Empty)

@code {
    private string? message;

    protected override async Task OnInitializedAsync()
    {
        await JSHost.ImportAsync("CallJavaScript1", 
            "../Pages/CallJavaScript1.razor.js");

        message = GetWelcomeMessage();
    }
}
```



> **Note:**
> Include a conditional check in code with [System.OperatingSystem.IsBrowser%2A](https://learn.microsoft.com/search/?terms=System.OperatingSystem.IsBrowser%252A) to ensure that the JS interop is only called by a component rendered on the client. This is important for libraries/NuGet packages that target server-side components, which can't execute the code provided by this JS interop API.

To import a JS function to call it from C#, use the [`[JSImport]` attribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSImportAttribute) on a C# method signature that matches the JS function's signature. The first parameter to the `[JSImport]` attribute is the name of the JS function to import, and the second parameter is the name of the [JS module](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-isolation-in-javascript-modules).

In the following example, `getMessage` is a JS function that returns a `string` for a module named `CallJavaScript1`. The C# method signature matches: No parameters are passed to the JS function, and the JS function returns a `string`. The JS function is called by `GetWelcomeMessage` in C# code.

`CallJavaScript1.razor.cs`:

**Applies to: \>= aspnetcore-8.0**

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorSample.Components.Pages;

[SupportedOSPlatform("browser")]
public partial class CallJavaScript1
{
    [JSImport("getMessage", "CallJavaScript1")]
    internal static partial string GetWelcomeMessage();
}
```

The app's namespace for the preceding `CallJavaScript1` partial class is `BlazorSample`. The component's namespace is `BlazorSample.Components.Pages`. If using the preceding component in a local test app, update the namespace to match the app. For example, the namespace is `ContosoApp.Components.Pages` if the app's namespace is `ContosoApp`. For more information, see [blazor/components/index#partial-class-support](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23partial-class-support).



**Applies to: < aspnetcore-8.0**

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorSample.Pages;

[SupportedOSPlatform("browser")]
public partial class CallJavaScript1
{
    [JSImport("getMessage", "CallJavaScript1")]
    internal static partial string GetWelcomeMessage();
}
```

The app's namespace for the preceding `CallJavaScript1` partial class is `BlazorSample`. The component's namespace is `BlazorSample.Pages`. If using the preceding component in a local test app, update the namespace to match the app. For example, the namespace is `ContosoApp.Pages` if the app's namespace is `ContosoApp`. For more information, see [blazor/components/index#partial-class-support](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23partial-class-support).



In the imported method signature, you can use .NET types for parameters and return values, which are marshalled automatically by the runtime. Use [System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%601](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%25601) to control how the imported method parameters are marshalled. For example, you might choose to marshal a `long` as [System.Runtime.InteropServices.JavaScript.JSType.Number](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSType.Number) or [System.Runtime.InteropServices.JavaScript.JSType.BigInt](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSType.BigInt). You can pass [System.Action](https://learn.microsoft.com/search/?terms=System.Action)/[System.Func%601](https://learn.microsoft.com/search/?terms=System.Func%25601) callbacks as parameters, which are marshalled as callable JS functions. You can pass both JS and managed object references, and they are marshaled as proxy objects, keeping the object alive across the boundary until the proxy is garbage collected. You can also import and export asynchronous methods with a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) result, which are marshaled as [JS promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise). Most of the marshalled types work in both directions, as parameters and as return values, on both imported and exported methods, which are covered in the [Call .NET from JavaScript](#call-net-from-javascript) section later in this article.

For additional type mapping information and examples, see [client-side/dotnet-interop/index#type-mappings](https://learn.microsoft.com/search/?terms=client-side%2Fdotnet-interop%2Findex%23type-mappings).

The module name in the `[JSImport]` attribute and the call to load the module in the component with [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) must match and be unique in the app. When authoring a library for deployment in a NuGet package, we recommend using the NuGet package namespace as a prefix in module names. In the following example, the module name reflects the `Contoso.InteropServices.JavaScript` package and a folder of user message interop classes (`UserMessages`):

```csharp
[JSImport("getMessage", 
    "Contoso.InteropServices.JavaScript.UserMessages.CallJavaScript1")]
```

Functions accessible on the global namespace can be imported by using the [`globalThis`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/globalThis) prefix in the function name and by using the `[JSImport]` attribute without providing a module name. In the following example, [`console.log`](https://developer.mozilla.org/docs/Web/API/console/log) is prefixed with `globalThis`. The imported function is called by the C# `Log` method, which accepts a C# string message (`message`) and marshalls the C# string to a JS [`String`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) for `console.log`:

```csharp
[JSImport("globalThis.console.log")]
internal static partial void Log([JSMarshalAs<JSType.String>] string message);
```

Export scripts from a standard [JavaScript module](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-isolation-in-javascript-modules) either [collocated with a component](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fjavascript-location%23load-a-script-from-an-external-javascript-file-js-collocated-with-a-component) or placed with other JavaScript static assets in a JS file (for example, `wwwroot/js/{FILE NAME}.js`, where JS static assets are maintained in a folder named `js` in the app's `wwwroot` folder and the `{FILE NAME}` placeholder is the file name).

In the following example, a JS function named `getMessage` is exported from a collocated JS file that returns a welcome message, "Hello from Blazor!" in Portuguese:

`CallJavaScript1.razor.js`:

```javascript
export function getMessage() {
  return 'Olá do Blazor!';
}
```

## Call .NET from JavaScript

This section explains how to call .NET methods from JS.

The following `CallDotNet1` component calls JS that directly interacts with the DOM to render the welcome message string:

* The `CallDotNet` [JS module](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-isolation-in-javascript-modules) is imported asynchronously from the collocated JS file for this component.
* The imported `setMessage` JS function is called by `SetWelcomeMessage`.
* The returned welcome message is displayed by `setMessage` in the UI via the `message` field.

> **Important:**
> In this section's example, JS interop is used to mutate a DOM element *purely for demonstration purposes* after the component is rendered in [`OnAfterRender`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23after-component-render-onafterrenderasync). Typically, you should only mutate the DOM with JS when the object doesn't interact with Blazor. The approach shown in this section is similar to cases where a third-party JS library is used in a Razor component, where the component interacts with the JS library via JS interop, the third-party JS library interacts with part of the DOM, and Blazor isn't involved directly with the DOM updates to that part of the DOM. For more information, see [blazor/js-interop/index#interaction-with-the-document-object-model-dom](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23interaction-with-the-document-object-model-dom).

`CallDotNet1.razor`:

**Applies to: \>= aspnetcore-8.0**

```razor
@page "/call-dotnet-1"
@rendermode InteractiveWebAssembly
@using System.Runtime.InteropServices.JavaScript

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call .NET Example 1)
</h1>

<p>
    <span id="result">.NET method not executed yet</span>
</p>

@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JSHost.ImportAsync("CallDotNet1", 
                "../Components/Pages/CallDotNet1.razor.js");

            SetWelcomeMessage();
        }
    }
}
```



**Applies to: < aspnetcore-8.0**

```razor
@page "/call-dotnet-1"
@using System.Runtime.InteropServices.JavaScript

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call .NET Example 1)
</h1>

<p>
    <span id="result">.NET method not executed yet</span>
</p>

@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JSHost.ImportAsync("CallDotNet1", 
                "../Pages/CallDotNet1.razor.js");

            SetWelcomeMessage();
        }
    }
}
```



To export a .NET method so that it can be called from JS, use the [`[JSExport]` attribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSExportAttribute).

In the following example:

* `SetWelcomeMessage` calls a JS function named `setMessage`. The JS function calls into .NET to receive the welcome message from `GetMessageFromDotnet` and displays the message in the UI.
* `GetMessageFromDotnet` is a .NET method with the `[JSExport]` attribute that returns a welcome message, "Hello from Blazor!" in Portuguese.

`CallDotNet1.razor.cs`:

**Applies to: \>= aspnetcore-8.0**

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorSample.Components.Pages;

[SupportedOSPlatform("browser")]
public partial class CallDotNet1
{
    [JSImport("setMessage", "CallDotNet1")]
    internal static partial void SetWelcomeMessage();

    [JSExport]
    internal static string GetMessageFromDotnet() => "Olá do Blazor!";
}
```

The app's namespace for the preceding `CallDotNet1` partial class is `BlazorSample`. The component's namespace is `BlazorSample.Components.Pages`. If using the preceding component in a local test app, update the app's namespace to match the app. For example, the component namespace is `ContosoApp.Components.Pages` if the app's namespace is `ContosoApp`. For more information, see [blazor/components/index#partial-class-support](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23partial-class-support).

In the following example, a JS function named `setMessage` is imported from a collocated JS file.

The `setMessage` method:

* Calls `globalThis.getDotnetRuntime(0)` to expose the WebAssembly .NET runtime instance for calling exported .NET methods.
* Obtains the app assembly's JS exports. The name of the app's assembly in the following example is `BlazorSample`.
* Calls the `BlazorSample.Components.Pages.CallDotNet1.GetMessageFromDotnet` method from the exports (`exports`). The returned value, which is the welcome message, is assigned to the `CallDotNet1` component's `<span>` text. The app's namespace is `BlazorSample`, and the `CallDotNet1` component's namespace is `BlazorSample.Components.Pages`.

`CallDotNet1.razor.js`:

```javascript
export async function setMessage() {
  const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
  var exports = await getAssemblyExports("BlazorSample.dll");

  document.getElementById("result").innerText = 
    exports.BlazorSample.Components.Pages.CallDotNet1.GetMessageFromDotnet();
}
```



**Applies to: < aspnetcore-8.0**

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorSample.Pages;

[SupportedOSPlatform("browser")]
public partial class CallDotNet1
{
    [JSImport("setMessage", "CallDotNet1")]
    internal static partial void SetWelcomeMessage();

    [JSExport]
    internal static string GetMessageFromDotnet() => "Olá do Blazor!";
}
```

The app's namespace for the preceding `CallDotNet1` partial class is `BlazorSample`. The component's namespace is `BlazorSample.Pages`. If using the preceding component in a local test app, update the app's namespace to match the app. For example, the component namespace is `ContosoApp.Pages` if the app's namespace is `ContosoApp`. For more information, see [blazor/components/index#partial-class-support](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23partial-class-support).

In the following example, a JS function named `setMessage` is imported from a collocated JS file.

The `setMessage` method:

* Calls `globalThis.getDotnetRuntime(0)` to expose the WebAssembly .NET runtime instance for calling exported .NET methods.
* Obtains the app assembly's JS exports. The name of the app's assembly in the following example is `BlazorSample`.
* Calls the `BlazorSample.Pages.CallDotNet1.GetMessageFromDotnet` method from the exports (`exports`). The returned value, which is the welcome message, is assigned to the `CallDotNet1` component's `<span>` text. The app's namespace is `BlazorSample`, and the `CallDotNet1` component's namespace is `BlazorSample.Pages`.

`CallDotNet1.razor.js`:

```javascript
export async function setMessage() {
  const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
  var exports = await getAssemblyExports("BlazorSample.dll");

  document.getElementById("result").innerText = 
    exports.BlazorSample.Pages.CallDotNet1.GetMessageFromDotnet();
}
```



> **Note:**
> Calling `getAssemblyExports` to obtain the exports can occur in a [JavaScript initializer](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-initializers) for availability across the app.

## Multiple module import calls

After a JS module is loaded, the module's JS functions are available to the app's components and classes as long as the app is running in the browser window or tab without the user manually reloading the app. [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) can be called multiple times on the same module without a significant performance penalty when:

* The user visits a component that calls [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) to import a module, navigates away from the component, and then returns to the component where [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) is called again for the same module import.
* The same module is used by different components and loaded by [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) in each of the components.

## Use of a single JavaScript module across components

*Before following the guidance in this section, read the [Call JavaScript from .NET](#call-javascript-from-net) and [Call .NET from JavaScript](#call-net-from-javascript) sections of this article, which provide general guidance on `[JSImport]`/`[JSExport]` interop.*

The example in this section shows how to use JS interop from a shared JS module in a client-side app. The guidance in this section isn't applicable to Razor class libraries (RCLs).

The following components, classes, C# methods, and JS functions are used:

* `Interop` class (`Interop.cs`): Sets up import and export JS interop with the `[JSImport]` and `[JSExport]` attributes for a module named `Interop`.
  * `GetWelcomeMessage`: .NET method that calls the imported `getMessage` JS function.
  * `SetWelcomeMessage`: .NET method that calls the imported `setMessage` JS function.
  * `GetMessageFromDotnet`: An exported C# method that returns a welcome message string when called from JS.
* `wwwroot/js/interop.js` file: Contains the JS functions.
  * `getMessage`: Returns a welcome message when called by C# code in a component.
  * `setMessage`: Calls the `GetMessageFromDotnet` C# method and assigns the returned welcome message to a DOM `<span>` element.
* `Program.cs` calls [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) to load the module from `wwwroot/js/interop.js`.
* `CallJavaScript2` component (`CallJavaScript2.razor`): Calls `GetWelcomeMessage` and displays the returned welcome message in the component's UI.
* `CallDotNet2` component (`CallDotNet2.razor`): Calls `SetWelcomeMessage`.

`Interop.cs`:

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorSample.JavaScriptInterop;

[SupportedOSPlatform("browser")]
public partial class Interop
{
    [JSImport("getMessage", "Interop")]
    internal static partial string GetWelcomeMessage();

    [JSImport("setMessage", "Interop")]
    internal static partial void SetWelcomeMessage();

    [JSExport]
    internal static string GetMessageFromDotnet() => "Olá do Blazor!";
}
```

In the preceding example, the app's namespace is `BlazorSample`, and the full namespace for C# interop classes is `BlazorSample.JavaScriptInterop`.

`wwwroot/js/interop.js`:

```javascript
export function getMessage() {
  return 'Olá do Blazor!';
}

export async function setMessage() {
  const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
  var exports = await getAssemblyExports("BlazorSample.dll");

  document.getElementById("result").innerText =
    exports.BlazorSample.JavaScriptInterop.Interop.GetMessageFromDotnet();
}
```

Make the [System.Runtime.InteropServices.JavaScript](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript) namespace available at the top of the `Program.cs` file:

```csharp
using System.Runtime.InteropServices.JavaScript;
```

Load the module in `Program.cs` before [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost.RunAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost.RunAsync%252A) is called:

```csharp
if (OperatingSystem.IsBrowser())
{
    await JSHost.ImportAsync("Interop", "../js/interop.js");
}
```

`CallJavaScript2.razor`:

**Applies to: \>= aspnetcore-8.0**

```razor
@page "/call-javascript-2"
@rendermode InteractiveWebAssembly
@using BlazorSample.JavaScriptInterop

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call JS Example 2)
</h1>

@(message is not null ? message : string.Empty)

@code {
    private string? message;

    protected override void OnInitialized()
    {
        message = Interop.GetWelcomeMessage();
    }
}
```



**Applies to: < aspnetcore-8.0**

```razor
@page "/call-javascript-2"
@using BlazorSample.JavaScriptInterop

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call JS Example 2)
</h1>

@(message is not null ? message : string.Empty)

@code {
    private string? message;

    protected override void OnInitialized()
    {
        message = Interop.GetWelcomeMessage();
    }
}
```



`CallDotNet2.razor`:

**Applies to: \>= aspnetcore-8.0**

```razor
@page "/call-dotnet-2"
@rendermode InteractiveWebAssembly
@using BlazorSample.JavaScriptInterop

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop  
    (Call .NET Example 2)
</h1>

<p>
    <span id="result">.NET method not executed</span>
</p>

@code {
    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            Interop.SetWelcomeMessage();
        }
    }
}
```



**Applies to: < aspnetcore-8.0**

```razor
@page "/call-dotnet-2"
@using BlazorSample.JavaScriptInterop

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop  
    (Call .NET Example 2)
</h1>

<p>
    <span id="result">.NET method not executed</span>
</p>

@code {
    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            Interop.SetWelcomeMessage();
        }
    }
}
```



> **Important:**
> In this section's example, JS interop is used to mutate a DOM element *purely for demonstration purposes* after the component is rendered in [`OnAfterRender`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23after-component-render-onafterrenderasync). Typically, you should only mutate the DOM with JS when the object doesn't interact with Blazor. The approach shown in this section is similar to cases where a third-party JS library is used in a Razor component, where the component interacts with the JS library via JS interop, the third-party JS library interacts with part of the DOM, and Blazor isn't involved directly with the DOM updates to that part of the DOM. For more information, see [blazor/js-interop/index#interaction-with-the-document-object-model-dom](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23interaction-with-the-document-object-model-dom).

## Additional resources

* [client-side/dotnet-interop/index](../../client-side/dotnet-interop/index.md)
* [client-side/dotnet-interop/wasm-browser-app](../../client-side/dotnet-interop/wasm-browser-app.md)
* API documentation
  * [`[JSImport]` attribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSImportAttribute)
  * [`[JSExport]` attribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSExportAttribute)
* In the `dotnet/runtime` GitHub repository:
  * [Configuring and hosting .NET WebAssembly applications](https://github.com/dotnet/runtime/blob/main/src/mono/wasm/features.md)
  * [.NET WebAssembly runtime](https://github.com/dotnet/runtime/tree/main/src/mono/wasm)
  * [`dotnet.d.ts` file (.NET WebAssembly runtime configuration)](https://github.com/dotnet/runtime/blob/main/src/mono/browser/runtime/dotnet.d.ts)
