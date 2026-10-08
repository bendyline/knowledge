---
title: JavaScript `[JSImport]`/`[JSExport]` interop with a WebAssembly Browser App project
ai-usage: ai-assisted
author: pavelsavara
description: Learn how to run .NET from JavaScript with [JSImport]/[JSExport] interop in a WebAssembly Browser App project.
monikerRange: '>= aspnetcore-7.0'
ms.author: wpickett
ms.date: 09/16/2026
uid: client-side/dotnet-interop/wasm-browser-app
---
# JavaScript `[JSImport]`/`[JSExport]` interop with a WebAssembly Browser App project

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


This article explains how to setup a WebAssembly Browser App project to run .NET from JavaScript (JS) using JS `[JSImport]`/`[JSExport]` interop. For additional information and examples, see [client-side/dotnet-interop/index](index.md).

For additional guidance, see the [Configuring and hosting .NET WebAssembly applications](https://github.com/dotnet/runtime/blob/main/src/mono/wasm/features.md) guidance in the .NET Runtime (`dotnet/runtime`) GitHub repository.

Existing JS apps can use the expanded client-side WebAssembly support to reuse .NET libraries from JS or to build novel .NET-based apps and frameworks.

> **Note:**
> This article focuses on running .NET from JS apps without any dependency on [Blazor](../../blazor/index.md). For guidance on using `[JSImport]`/`[JSExport]` interop in Blazor WebAssembly apps, see [blazor/js-interop/import-export-interop](../../blazor/javascript-interoperability/import-export-interop.md).

These approaches are appropriate when you only expect the Blazor app to run on WebAssembly (WASM). Libraries can make a runtime check to determine if the app is running on WASM by calling [System.OperatingSystem.IsBrowser%2A](https://learn.microsoft.com/search/?terms=System.OperatingSystem.IsBrowser%252A).

## Prerequisites

[.NET SDK (latest version)](https://dotnet.microsoft.com/download/dotnet/)

Install the `wasm-tools` workload in an administrative command shell, which brings in the related MSBuild targets:

```dotnetcli
dotnet workload install wasm-tools
```

The tools can also be installed via Visual Studio's installer under the **ASP.NET and web development** workload in the Visual Studio installer. Select the **.NET WebAssembly build tools** option from the list of optional components.

Optionally, install the `wasm-experimental` workload, which adds the following experimental project templates:

* *WebAssembly Browser App* for getting started with .NET on WebAssembly in a browser app.
* *WebAssembly Console App* for getting started in a Node.js-based console app.

After installing the workload, these new templates can be selected when creating a new project. This workload isn't required if you plan to integrate JS `[JSImport]`/`[JSExport]` interop into an existing JS app.

```dotnetcli
dotnet workload install wasm-experimental
```

The templates can also be installed from the [`Microsoft.NET.Runtime.WebAssembly.Templates`](https://www.nuget.org/packages/Microsoft.NET.Runtime.WebAssembly.Templates) NuGet package with the following command:

```dotnetcli
dotnet new install Microsoft.NET.Runtime.WebAssembly.Templates
```

For more information, see the [Experimental workload and project templates](#experimental-workload-and-project-templates) section.

## Namespace

The JS interop API described in this article is controlled by attributes in the [System.Runtime.InteropServices.JavaScript](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript) namespace.

## Project configuration

To configure a project (`.csproj`) to enable JS interop:

**Applies to: \>= aspnetcore-8.0**

* Set the [target framework moniker](https://learn.microsoft.com/dotnet/standard/frameworks) (`{TARGET FRAMEWORK}` placeholder):

  ```xml
  <TargetFramework>{TARGET FRAMEWORK}</TargetFramework>
  ```

  .NET 7 (`net7.0`) or later is supported.

* Enable the [Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks](https://learn.microsoft.com/search/?terms=Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks) property, which permits the code generator in the Roslyn compiler to use pointers for JS interop:

  ```xml
  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  ```

  > **Warning:**
  > The JS interop API requires enabling [Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks](https://learn.microsoft.com/search/?terms=Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks). Be careful when implementing your own unsafe code in .NET apps, which can introduce security and stability risks. For more information, see [Unsafe code, pointer types, and function pointers](https://learn.microsoft.com/dotnet/csharp/language-reference/unsafe-code).

The following is an example project file (`.csproj`) after configuration. The `{TARGET FRAMEWORK}` placeholder is the target framework:

```xml
<Project Sdk="Microsoft.NET.Sdk.WebAssembly">

  <PropertyGroup>
    <TargetFramework>{TARGET FRAMEWORK}</TargetFramework>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  </PropertyGroup>

</Project>
```



**Applies to: \>= aspnetcore-10.0**

> **Note:**
> In .NET 10 and later, the `WasmEnableHotReload` MSBuild property controls whether [Hot Reload](../../test/hot-reload.md) infrastructure is included in the build output. The property is set to `true` by default for the `Debug` configuration. Set the property to `false` to produce bundler-compatible build output, for example for use with webpack or Vite, without Hot Reload dependencies when building the app with `dotnet build`:
>
> ```xml
> <PropertyGroup>
>   <WasmEnableHotReload>false</WasmEnableHotReload>
> </PropertyGroup>
> ```



**Applies to: < aspnetcore-8.0**

* Set the [target framework moniker](https://learn.microsoft.com/dotnet/standard/frameworks):

  ```xml
  <TargetFramework>net7.0</TargetFramework>
  ```

  .NET 7 (`net7.0`) or later is supported.

* Specify `browser-wasm` for the runtime identifier:

  ```xml
  <RuntimeIdentifier>browser-wasm</RuntimeIdentifier>
  ```

* Specify an executable output type:

  ```xml
  <OutputType>Exe</OutputType>
  ```

* Enable the [Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks](https://learn.microsoft.com/search/?terms=Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks) property, which permits the code generator in the Roslyn compiler to use pointers for JS interop:

  ```xml
  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  ```

  > **Warning:**
  > The JS interop API requires enabling [Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks](https://learn.microsoft.com/search/?terms=Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks). Be careful when implementing your own unsafe code in .NET apps, which can introduce security and stability risks. For more information, see [Unsafe code, pointer types, and function pointers](https://learn.microsoft.com/dotnet/csharp/language-reference/unsafe-code).

* Specify `WasmMainJSPath` to point to a file on disk. This file is published with the app, but use of the file isn't required if you're integrating .NET into an existing JS app.

  In the following example, the JS file on disk is `main.js`, but any JS filename is permissable:

  ```xml
  <WasmMainJSPath>main.js</WasmMainJSPath>
  ```

Example project file (`.csproj`) after configuration:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <RuntimeIdentifier>browser-wasm</RuntimeIdentifier>
    <OutputType>Exe</OutputType>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
    <WasmMainJSPath>main.js</WasmMainJSPath>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
```



## JavaScript interop on WASM

APIs in the following example are imported from `dotnet.js`. These APIs enable you to set up named modules that can be imported into your C# code and call into methods exposed by your .NET code, including `Program.Main`.

> **Important:**
> "Import" and "export" throughout this article are defined from the perspective of .NET:
>
> * An app imports JS methods so that they can be called from .NET.
> * The app exports .NET methods so that they can be called from JS.

In the following example:

* The `dotnet.js` file is used to create and start the .NET WebAssembly runtime. `dotnet.js` is generated as part of the app's build output.

  > **Important:**
  > To integrate with an existing app, copy the contents of the publish output folder&dagger; to the existing app's deployment assets so that it can be served along with the rest of the app. For production deployments, publish the app with the `dotnet publish -c Release` command in a command shell and deploy the output folder's contents with the app.
  >
  > &dagger;The publish output folder is the target location of your publish profile. The default for a **Release** profile in .NET 8 or later is `bin/Release/{TARGET FRAMEWORK}/publish`, where the `{TARGET FRAMEWORK}` placeholder is the target framework (for example, `net8.0`).

* `dotnet.create()` sets up the .NET WebAssembly runtime.

**Applies to: \>= aspnetcore-9.0**

* `setModuleImports` associates a name with a module of JS functions for import into .NET. The JS module contains a `dom.setInnerText` function, which accepts and element selector and time to display the current stopwatch time in the UI. The name of the module can be any string (it doesn't need to be a file name), but it must match the name used with the `JSImportAttribute` (explained later in this article). The `dom.setInnerText` function is imported into C# and called by the C# method `SetInnerText`. The `SetInnerText` method is shown later in this section.

* `exports.StopwatchSample.Reset()` calls into .NET (`StopwatchSample.Reset`) from JS. The `Reset` C# method restarts the stopwatch if it's running or resets it if it isn't running. The `Reset` method is shown later in this section.

* `exports.StopwatchSample.Toggle()` calls into .NET (`StopwatchSample.Toggle`) from JS. The `Toggle` C# method starts or stops the stopwatch depending on if it's currently running or not. The `Toggle` method is shown later in this section.

* `runMain()` runs `Program.Main`.



**Applies to: < aspnetcore-9.0**

* `setModuleImports` associates a name with a module of JS functions for import into .NET. The JS module contains a `window.location.href` function, which returns the current page address (URL). The name of the module can be any string (it doesn't need to be a file name), but it must match the name used with the `JSImportAttribute` (explained later in this article). The `window.location.href` function is imported into C# and called by the C# method `GetHRef`. The `GetHRef` method is shown later in this section.

* `exports.MyClass.Greeting()` calls into .NET (`MyClass.Greeting`) from JS. The `Greeting` C# method returns a string that includes the result of calling the `window.location.href` function. The `Greeting` method is shown later in this section.

* `dotnet.run()` runs `Program.Main`.



JS module:

**Applies to: \>= aspnetcore-9.0**

```javascript
import { dotnet } from './_framework/dotnet.js'

const { setModuleImports, getAssemblyExports, getConfig, runMain } = await dotnet
  .withApplicationArguments("start")
  .create();

setModuleImports('main.js', {
  dom: {
    setInnerText: (selector, time) => 
      document.querySelector(selector).innerText = time
  }
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

document.getElementById('reset').addEventListener('click', e => {
  exports.StopwatchSample.Reset();
  e.preventDefault();
});

const pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', e => {
  const isRunning = exports.StopwatchSample.Toggle();
  pauseButton.innerText = isRunning ? 'Pause' : 'Start';
  e.preventDefault();
});

await runMain();
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

```javascript
import { dotnet } from './_framework/dotnet.js'

const { setModuleImports, getAssemblyExports, getConfig } = await dotnet
  .withDiagnosticTracing(false)
  .withApplicationArgumentsFromQuery()
  .create();

setModuleImports('main.js', {
  window: {
    location: {
      href: () => globalThis.window.location.href
    }
  }
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);
const text = exports.MyClass.Greeting();
console.log(text);

document.getElementById('out').innerHTML = text;
await dotnet.run();
```



**Applies to: < aspnetcore-8.0**

```javascript
import { dotnet } from './dotnet.js'

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const { setModuleImports, getAssemblyExports, getConfig } = 
  await dotnet.create();

setModuleImports("main.js", {
  window: {
    location: {
      href: () => globalThis.window.location.href
    }
  }
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);
const text = exports.MyClass.Greeting();
console.log(text);

document.getElementById("out").innerHTML = text;
await dotnet.run();
```



To import a JS function so it can be called from C#, use the new [System.Runtime.InteropServices.JavaScript.JSImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSImportAttribute) on a matching method signature. The first parameter to the [System.Runtime.InteropServices.JavaScript.JSImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSImportAttribute) is the name of the JS function to import and the second parameter is the name of the module.

**Applies to: \>= aspnetcore-9.0**

In the following example, the `dom.setInnerText` function is called from the `main.js` module when `SetInnerText` method is called:

```csharp
[JSImport("dom.setInnerText", "main.js")]
internal static partial void SetInnerText(string selector, string content);
```



**Applies to: < aspnetcore-9.0**

In the following example, the `window.location.href` function is called from the `main.js` module when `GetHRef` method is called:

```csharp
[JSImport("window.location.href", "main.js")]
internal static partial string GetHRef();
```



In the imported method signature, you can use .NET types for parameters and return values, which are marshalled automatically by the runtime. Use [System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%601](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%25601) to control how the imported method parameters are marshalled. For example, you might choose to marshal a `long` as [System.Runtime.InteropServices.JavaScript.JSType.Number](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSType.Number) or [System.Runtime.InteropServices.JavaScript.JSType.BigInt](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSType.BigInt). You can pass [System.Action](https://learn.microsoft.com/search/?terms=System.Action)/[System.Func%601](https://learn.microsoft.com/search/?terms=System.Func%25601) callbacks as parameters, which are marshalled as callable JS functions. You can pass both JS and managed object references, and they are marshaled as proxy objects, keeping the object alive across the boundary until the proxy is garbage collected. You can also import and export asynchronous methods with a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) result, which are marshaled as [JS promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise). Most of the marshalled types work in both directions, as parameters and as return values, on both imported and exported methods.

For additional type mapping information and examples, see [client-side/dotnet-interop/index#type-mappings](https://learn.microsoft.com/search/?terms=client-side%2Fdotnet-interop%2Findex%23type-mappings).

Functions accessible on the global namespace can be imported by using the [`globalThis`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/globalThis) prefix in the function name and by using the `[JSImport]` attribute without providing a module name. In the following example, [`console.log`](https://developer.mozilla.org/docs/Web/API/console/log) is prefixed with `globalThis`. The imported function is called by the C# `Log` method, which accepts a C# string message (`message`) and marshalls the C# string to a JS [`String`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) for `console.log`:

```csharp
[JSImport("globalThis.console.log")]
internal static partial void Log([JSMarshalAs<JSType.String>] string message);
```

To export a .NET method so it can be called from JS, use the [System.Runtime.InteropServices.JavaScript.JSExportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSExportAttribute).

**Applies to: \>= aspnetcore-9.0**

In the following example, each method is exported to JS and can be called from JS functions:

* The `Toggle` method starts or stops the stopwatch depending on its running state.
* The `Reset` method restarts the stopwatch if it's running or resets it if it isn't running.
* The `IsRunning` method indicates if the stopwatch is running.

```csharp
[JSExport]
internal static bool Toggle()
{
    if (stopwatch.IsRunning)
    {
        stopwatch.Stop();
        return false;
    }
    else
    {
        stopwatch.Start();
        return true;
    }
}

[JSExport]
internal static void Reset()
{
    if (stopwatch.IsRunning)
        stopwatch.Restart();
    else
        stopwatch.Reset();

    Render();
}

[JSExport]
internal static bool IsRunning() => stopwatch.IsRunning;
```



**Applies to: < aspnetcore-9.0**

In the following example, the `Greeting` method returns a string that includes the result of calling the `GetHRef` method. As shown earlier, the `GetHref` C# method calls into JS for the `window.location.href` function from the `main.js` module. `window.location.href` returns the current page address (URL):

```csharp
[JSExport]
internal static string Greeting()
{
    var text = $"Hello, World! Greetings from {GetHRef()}";
    Console.WriteLine(text);
    return text;
}
```



## Experimental workload and project templates

To demonstrate the JS interop functionality and obtain JS interop project templates, install the `wasm-experimental` workload:

```dotnetcli
dotnet workload install wasm-experimental
```

The `wasm-experimental` workload contains two project templates: `wasmbrowser` and `wasmconsole`. These templates are experimental at this time, which means the developer workflow for the templates is evolving. However, the .NET and JS APIs used in the templates are supported in .NET 8 and provide a foundation for using .NET on WASM from JS.

The templates can also be installed from the [`Microsoft.NET.Runtime.WebAssembly.Templates`](https://www.nuget.org/packages/Microsoft.NET.Runtime.WebAssembly.Templates) NuGet package with the following command:

```dotnetcli
dotnet new install Microsoft.NET.Runtime.WebAssembly.Templates
```

### Browser app

You can create a browser app with the `wasmbrowser` template from the command line, which creates a web app that demonstrates using .NET and JS together in a browser:

```dotnetcli
dotnet new wasmbrowser
```

Alternatively in Visual Studio, you can create the app using the **WebAssembly Browser App** project template.

Build the app from Visual Studio or by using the .NET CLI:

```dotnetcli
dotnet build
```

Build and run the app from Visual Studio or by using the .NET CLI:

```dotnetcli
dotnet run
```

Alternatively, install and use the [`dotnet serve` command](https://github.com/natemcmaster/dotnet-serve):

```dotnetcli
dotnet serve -d:bin/$(Configuration)/{TARGET FRAMEWORK}/publish
```

In the preceding example, the `{TARGET FRAMEWORK}` placeholder is the [target framework moniker](https://learn.microsoft.com/dotnet/standard/frameworks).

### Node.js console app

You can create a console app with the `wasmconsole` template, which creates an app that runs under WASM as a [Node.js](https://nodejs.org/) or [V8](https://developers.google.com/apps-script/guides/v8-runtime) console app:

```dotnetcli
dotnet new wasmconsole
```

Alternatively in Visual Studio, you can create the app using the **WebAssembly Console App** project template.

Build the app from Visual Studio or by using the .NET CLI:

```dotnetcli
dotnet build
```

Build and run the app from Visual Studio or by using the .NET CLI:

```dotnetcli
dotnet run
```

Alternatively, start any static file server from the publish output directory that contains the `main.mjs` file:

```
node bin/$(Configuration)/{TARGET FRAMEWORK}/{PATH}/main.mjs
```

In the preceding example, the `{TARGET FRAMEWORK}` placeholder is the [target framework moniker](https://learn.microsoft.com/dotnet/standard/frameworks), and the `{PATH}` placeholder is the path to the `main.mjs` file.

## Additional resources

* [client-side/dotnet-interop/index](index.md)
* [blazor/js-interop/import-export-interop](../../blazor/javascript-interoperability/import-export-interop.md)
* API documentation
  * [`[JSImport]` attribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSImportAttribute)
  * [`[JSExport]` attribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSExportAttribute)
* In the `dotnet/runtime` GitHub repository:
  * [Configuring and hosting .NET WebAssembly applications](https://github.com/dotnet/runtime/blob/main/src/mono/wasm/features.md)
  * [.NET WebAssembly runtime](https://github.com/dotnet/runtime/tree/main/src/mono/wasm)
  * [`dotnet.d.ts` file (.NET WebAssembly runtime configuration)](https://github.com/dotnet/runtime/blob/main/src/mono/browser/runtime/dotnet.d.ts)
* [Use .NET from any JavaScript app in .NET 7](https://devblogs.microsoft.com/dotnet/use-net-7-from-any-javascript-app-in-net-7/)
