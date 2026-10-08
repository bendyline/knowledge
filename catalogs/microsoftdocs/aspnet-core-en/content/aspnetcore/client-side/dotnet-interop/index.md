---
title: JavaScript `[JSImport]`/`[JSExport]` interop in .NET WebAssembly
author: pavelsavara
description: Learn how to run .NET from JavaScript with [JSImport]/[JSExport] interop.
monikerRange: '>= aspnetcore-7.0'
ms.author: wpickett
ms.date: 12/19/2025
uid: client-side/dotnet-interop/index
---
# JavaScript `[JSImport]`/`[JSExport]` interop in .NET WebAssembly

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


By [Aaron Shumaker](https://github.com/SerratedSharp)

This article explains how to interact with JavaScript (JS) in client-side WebAssembly using JS `[JSImport]`/`[JSExport]` interop ([System.Runtime.InteropServices.JavaScript](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript) API).

`[JSImport]`/`[JSExport]` interop is applicable when running a .NET WebAssembly module in a JS host in the following scenarios:

* [client-side/dotnet-interop/wasm-browser-app](wasm-browser-app.md).
* [blazor/js-interop/import-export-interop](../../blazor/javascript-interoperability/import-export-interop.md).
* Other .NET WebAssembly platforms that support `[JSImport]`/`[JSExport]` interop.

## Prerequisites

[.NET SDK (latest version)](https://dotnet.microsoft.com/download/dotnet/)

Any of the following project types:

* A WebAssembly Browser App project created according to [client-side/dotnet-interop/wasm-browser-app](wasm-browser-app.md).
* A Blazor client-side project created according to [blazor/js-interop/import-export-interop](../../blazor/javascript-interoperability/import-export-interop.md).
* A project created for a commercial or open-source platform that supports `[JSImport]`/`[JSExport]` interop ([System.Runtime.InteropServices.JavaScript](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript) API).

**Applies to: \>= aspnetcore-8.0**

## Sample app

[View or download sample code](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps)): Select an 8.0 or later version folder that matches the version of .NET that you're adopting. Within the version folder, access the sample named `WASMBrowserAppImportExportInterop`.



## JS interop using `[JSImport]`/`[JSExport]` attributes

The `[JSImport]` attribute is applied to a .NET method to indicate that a corresponding JS method should be called when the .NET method is called. This allows .NET developers to define "imports" that enable .NET code to call into JS. Additionally, an [System.Action](https://learn.microsoft.com/search/?terms=System.Action) can be passed as a parameter, and JS can invoke the action to support a callback or event subscription pattern.

The `[JSExport]` attribute is applied to a .NET method to expose it to JS code. This allows JS code to initiate calls to the .NET method.

## Importing JS methods

The following example imports a standard built-in JS method (`console.log`) into C#. `[JSImport]` is limited to importing methods of globally-accessible objects. For example, `log` is a method defined on the `console` object, which is defined on the globally-accessible object `globalThis`. The `console.log` method is mapped to a C# proxy method, `ConsoleLog`, which accepts a string for the log message:

```csharp
public partial class GlobalInterop
{
    [JSImport("globalThis.console.log")]
    public static partial void ConsoleLog(string text);
}
```

In `Program.Main`, `ConsoleLog` is called with the message to log:

```csharp
GlobalInterop.ConsoleLog("Hello World!");
```

The output appears in the browser's console.

The following demonstrates importing a method declared in JS.

The following custom JS method (`globalThis.callAlert`) spawns an [alert dialog (`window.alert`)](https://developer.mozilla.org/docs/Web/API/Window/alert) with the message passed in `text`:

```javascript
globalThis.callAlert = function (text) {
  globalThis.window.alert(text);
}
```

The `globalThis.callAlert` method is mapped to a C# proxy method (`CallAlert`), which accepts a string for the message:

```csharp
using System.Runtime.InteropServices.JavaScript;

public partial class GlobalInterop
{
	[JSImport("globalThis.callAlert")]
	public static partial void CallAlert(string text);
}
```

In `Program.Main`, `CallAlert` is called, passing the text for the alert dialog message:

```csharp
GlobalInterop.CallAlert("Hello World");
```

The C# class declaring the `[JSImport]` method doesn't have an implementation. At compile time, a source-generated partial class contains the .NET code that implements the marshalling of the call and types to invoke the corresponding JS method. In Visual Studio, using the **Go To Definition** or **Go To Implementation** options respectively navigates to either the source-generated partial class or the developer-defined partial class.

In the preceding example, the intermediate `globalThis.callAlert` JS declaration is used to wrap existing JS code. This article informally refers to the intermediate JS declaration as a *JS shim*. JS shims fill the gap between the .NET implementation and existing JS capabilities/libraries. In many cases, such as the preceding trivial example, the JS shim isn't necessary, and methods could be imported directly, as demonstrated in the earlier `ConsoleLog` example. As this article demonstrates in the upcoming sections, a JS shim can:

* Encapsulate additional logic.
* Manually map types.
* Reduce the number of objects or calls crossing the interop boundary.
* Manually map static calls to instance methods.

## Loading JavaScript declarations

JS declarations which are intended to be imported with `[JSImport]` are typically loaded in the context of the same page or JS host that loaded .NET WebAssembly. This can be accomplished with:

* A `<script>...</script>` block declaring inline JS.
* A script source (`src`) declaration (`<script src="./some.js"></script>`) that loads an external JS file (`.js`).
* A JS ES6 module (`<script type='module' src="./moduleName.js"></script>`).
* A JS ES6 module loaded using [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) from .NET WebAssembly.

Examples in this article use [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A). When calling [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A), client-side .NET WebAssembly requests the file using the `moduleUrl` parameter, and thus it expects the file to be accessible as a static web asset, much the same way as a `<script>` tag retrieves a file with a `src` URL. For example, the following C# code within a WebAssembly Browser App project maintains the JS file (`.js`) at the path `/wwwroot/scripts/ExampleShim.js`:

```csharp
await JSHost.ImportAsync("ExampleShim", "/scripts/ExampleShim.js");
```

Depending on the platform that's loading WebAssembly, a dot-prefixed URL, such as `./scripts/`, might refer to an incorrect subdirectory, such as `/_framework/scripts/`, because the WebAssembly package is initialized by framework scripts under `/_framework/`. In that case, prefixing the URL with `../scripts/` refers to the correct path. Prefixing with `/scripts/` works if the site is hosted at the root of the domain. A typical approach involves configuring the correct base path for the given environment with an HTML `<base>` tag and using the `/scripts/` prefix to refer to the path relative to the base path. Tilde notation `~/` prefixes aren't supported by [System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A).

> **Important:** 
> If JS is loaded from a JavaScript module, then `[JSImport]` attributes must include the module name as the second parameter. For example, `[JSImport("globalThis.callAlert", "ExampleShim")]` indicates the imported method was declared in a JavaScript module named "`ExampleShim`."

**Applies to: \>= aspnetcore-10.0**

[System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) can take advantage of the following features:

* [Import map for module scripts (Blazor Web Apps)](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstatic-files%23importmap-component)
* [Fingerprinting client-side static assets (standalone Blazor WebAssembly apps)](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstatic-files%23fingerprint-client-side-static-assets-in-standalone-blazor-webassembly-apps)



**Applies to: \>= aspnetcore-9.0**

[System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%2A](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync%252A) can take advantage of an [import map for module scripts](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstatic-files%23importmap-component) in a Blazor Web App.



## Type mappings

Parameters and return types in the .NET method signature are automatically converted to or from appropriate JS types at runtime if a unique mapping is supported. This may result in values converted by value or references wrapped in a proxy type. This process is known as *type marshalling*. Use [System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%601](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%25601) to control how the imported method parameters and return types are marshalled. 

Some types don't have a default type mapping. For example, a `long` can be marshalled as [System.Runtime.InteropServices.JavaScript.JSType.Number](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSType.Number) or [System.Runtime.InteropServices.JavaScript.JSType.BigInt](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSType.BigInt), so the [System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%601](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%25601) is required to avoid a compile-time error. 

The following type mapping scenarios are supported:

* Passing [System.Action](https://learn.microsoft.com/search/?terms=System.Action) or [System.Func%601](https://learn.microsoft.com/search/?terms=System.Func%25601) as parameters, which are marshalled as callable JS methods. This allows .NET code to invoke listeners in response to JS callbacks or events.
* Passing JS references and .NET managed object references in either direction, which as marshaled as proxy objects and kept alive across the interop boundary until the proxy is garbage collected.
* Marshalling asynchronous JS methods or a [JS `Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) with a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) result, and vice versa. 

Most of the marshalled types work in both directions, as parameters and as return values, on both imported and exported methods. 

The following table indicates the supported type mappings.

**Applies to: \>= aspnetcore-11.0**

| .NET | JavaScript | `Nullable` | `Task` <span aria-hidden="true">➔</span><span class="visually-hidden">to</span> `Promise` | `JSMarshalAs` optional | `Array of` |
| --- | --- | :---: | :---: | :---: | :---: |
| `Boolean` | `Boolean` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Byte` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Char` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Int16` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Int32` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Int64` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Int64` | `BigInt` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Single` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Double` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `IntPtr` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `DateTime` | `Date` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `DateTimeOffset` | `Date` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Exception` | `Error` | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `JSObject` | `Object` | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `String` | `String` | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Object` | `Any` | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Span<Byte>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Span<Int32>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Span<Single>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Span<Double>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `ArraySegment<Byte>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `ArraySegment<Int32>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `ArraySegment<Single>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `ArraySegment<Double>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Task` | `Promise` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Action` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Action<T1>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Action<T1, T2>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Action<T1, T2, T3>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Func<TResult>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Func<T1, TResult>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Func<T1, T2, TResult>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Func<T1, T2, T3, TResult>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |



**Applies to: < aspnetcore-11.0**

| .NET | JavaScript | `Nullable` | `Task` <span aria-hidden="true">➔</span><span class="visually-hidden">to</span> `Promise` | `JSMarshalAs` optional | `Array of` |
| --- | --- | :---: | :---: | :---: | :---: |
| `Boolean` | `Boolean` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Byte` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Char` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Int16` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Int32` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Int64` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Int64` | `BigInt` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Single` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Double` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `IntPtr` | `Number` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `DateTime` | `Date` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `DateTimeOffset` | `Date` | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Exception` | `Error` | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `JSObject` | `Object` | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `String` | `String` | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Object` | `Any` | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> |
| `Span<Byte>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Span<Int32>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Span<Double>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `ArraySegment<Byte>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `ArraySegment<Int32>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `ArraySegment<Double>` | `MemoryView` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Task` | `Promise` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span aria-hidden="true">✅</span><span class="visually-hidden">Supported</span> | <span class="visually-hidden">Not supported</span> |
| `Action` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Action<T1>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Action<T1, T2>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Action<T1, T2, T3>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Func<TResult>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Func<T1, TResult>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Func<T1, T2, TResult>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |
| `Func<T1, T2, T3, TResult>` | `Function` | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> | <span class="visually-hidden">Not supported</span> |





The following conditions apply to type mapping and marshalled values:

* The `Array of` column indicates if the .NET type can be marshalled as a JS [`Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array). Example: C# `int[]` (`Int32`) mapped to JS `Array` of `Number`s.
* When passing a JS value to C# with a value of the wrong type, the framework throws an exception in most cases. The framework doesn't perform compile-time type checking in JS.
* `JSObject`, `Exception`, `Task` and `ArraySegment` create `GCHandle` and a proxy. You can trigger disposal in developer code or allow [.NET garbage collection (GC)](https://learn.microsoft.com/dotnet/standard/garbage-collection/) to dispose of the objects later. These types carry significant performance overhead.
* `Array`: Marshaling an array creates a copy of the array in JS or .NET.
* `MemoryView`
  * `MemoryView` is a JS class for the .NET WebAssembly runtime to marshal `Span` and `ArraySegment`.
  * Unlike marshaling an array, marshaling a `Span` or `ArraySegment` doesn't create a copy of the underlying memory.
  * `MemoryView` can only be properly instantiated by the .NET WebAssembly runtime. Therefore, it isn't possible to import a JS method as a .NET method that has a parameter of `Span` or `ArraySegment`.
  * `MemoryView` created for a `Span` is only valid for the duration of the interop call. As `Span` is allocated on the call stack, which doesn't persist after the interop call, it isn't possible to export a .NET method that returns a `Span`.
  * `MemoryView` created for an `ArraySegment` survives after the interop call and is useful for sharing a buffer. Calling `dispose()` on a `MemoryView` created for an `ArraySegment` disposes the proxy and unpins the underlying .NET array. We recommend calling `dispose()` in a `try-finally` block for `MemoryView`.

Some combinations of type mappings that require nested generic types in [`JSMarshalAs`](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%25601) aren't currently supported. For example, attempting to materialize an array from a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) such as `[return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>()]` generates a compile-time error. An appropriate workaround varies depending on the scenario, but this specific scenario is further explored in the [Type mapping limitations](#type-mapping-limitations) section.

## JS primitives

The following example demonstrates `[JSImport]` leveraging type mappings of several primitive JS types and the use of [`JSMarshalAs`](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%25601), where explicit mappings are required at compile time.

`PrimitivesShim.js`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/PrimitivesShim.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

`PrimitivesInterop.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/PrimitivesInterop.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

In `Program.Main`:

```csharp
await PrimitivesUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> Printed from JSImport of console.log()
> 1
> I'm a string from .NET in your browser!
> boolean true
> number 58
> number 67
> number 12
> number 9007199254740990
> bigint 1234567890123456789n
> number 3.140000104904175
> number 3.14
> string A string

## JS `Date` objects

The example in this section demonstrates importing methods which have a [JS `Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) object as its return or parameter. Dates are marshalled across interop by-value, meaning they are copied in much the same way as JS primitives.

A `Date` object is timezone agnostic. A .NET [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) is adjusted relative to its [System.DateTimeKind](https://learn.microsoft.com/search/?terms=System.DateTimeKind) when marshalled to a `Date`, but timezone information isn't preserved. Consider initializing a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) with a [System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc) or [System.DateTimeKind.Local](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Local) consistent with the value it represents.

`DateShim.js`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/DateShim.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

`DateInterop.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/DateInterop.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

In `Program.Main`:

```csharp
await DateUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> Date: Sat Dec 21 1968 07\:51\:00 GMT-0500 (Eastern Standard Time)
> Date: Sun Dec 22 1968 07\:51\:00 GMT-0500 (Eastern Standard Time)

The preceding timezone information (`GMT-0500 (Eastern Standard Time)`) depends on local timezone of your computer/browser.

## JS object references

Whenever a JS method returns an object reference, it's represented in .NET as a [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject). The original JS object continues its lifetime within the JS boundary, while .NET code can access and modify it by reference through the [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject). While the type itself exposes a limited API, the ability to hold a JS object reference and return or pass it across the interop boundary enables support for several interop scenarios.

The [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject) provides methods to access properties, but it doesn't provide direct access to instance methods. As the following `Summarize` method demonstrates, instance methods can be accessed indirectly by implementing a static method that takes the instance as a parameter.

`JSObjectShim.js`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/JSObjectShim.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

`JSObjectInterop.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/JSObjectInterop.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

In `Program.Main`:

```csharp
await JSObjectUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> {name: 'Example JS Object', answer: 41, question: null, Symbol(wasm cs_owned_js_handle): 5, summarize: ƒ}
> {name: 'Example JS Object', answer: 42, question: null, Symbol(wasm cs_owned_js_handle): 5, summarize: ƒ}
> {name: 'Example JS Object', answer: 42, question: 'What is the answer?', Symbol(wasm cs_owned_js_handle): 5, summarize: ƒ}
> Summary: Question: \\

## Asynchronous interop

Many JS APIs are asynchronous and signal completion through either a callback, a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise), or an async method. Ignoring asynchronous capabilities is often not an option, as subsequent code may depend upon the completion of the asynchronous operation and must be awaited.

JS methods using the `async` keyword or returning a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) can be awaited in C# by a method returning a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task). As demonstrated below, the `async` keyword isn't used on the C# method with the `[JSImport]` attribute because it doesn't use the `await` keyword within it. However, consuming code calling the method would typically use the `await` keyword and be marked as `async`, as demonstrated in the `PromisesUsage` example.

JS with a callback, such as a `setTimeout`, can be wrapped in a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) before returning from JS. Wrapping a callback in a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise), as demonstrated in the function assigned to `Wait2Seconds`, is only appropriate when the callback is called exactly once. Otherwise, a C# [System.Action](https://learn.microsoft.com/search/?terms=System.Action) can be passed to listen for a callback that may be called zero or many times, which is demonstrated in the [Subscribing to JS events](#subscribing-to-js-events) section.

`PromisesShim.js`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/PromisesShim.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

Don't use the `async` keyword in the C# method signature. Returning [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task%601](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%25601) is sufficient.

When calling asynchronous JS methods, we often want to wait until the JS method completes execution. If loading a resource or making a request, we likely want the following code to assume the action is completed.

If the JS shim returns a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise), then C# can treat it as an awaitable [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)/[System.Threading.Tasks.Task%601](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%25601).

`PromisesInterop.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/PromisesInterop.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

In `Program.Main`:

```csharp
await PromisesUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> Waited 2.0s.
> Waited .5s for WaitGetString: 'String From Resolve'
> Waited .5s for WaitGetDate: '11/24/1988 12\:00\:00 AM'
> responseText.Length: 582
> Waited 2.0s for AsyncFunction.
> JS Exception Caught: 'Reject: ShouldSucceed == false'

## Type mapping limitations

Some type mappings requiring nested generic types in the [`JSMarshalAs`](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute%25601) definition aren't currently supported. For example, returning a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) for an array such as `[return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>()]` generates a compile-time error. An appropriate workaround varies depending on the scenario, but one option is to represent the array as a [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject) reference. This may be sufficient if accessing individual elements within .NET isn't necessary and the reference can be passed to other JS methods that act on the array. Alternatively, a dedicated method can take the [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject) reference as a parameter and return the materialized array, as demonstrated by the following `UnwrapJSObjectAsIntArray` example. In this case, the JS method has no type checking, and the developer has the responsibility to ensure a [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject) wrapping the appropriate array type is passed.

```javascript
export function waitGetIntArrayAsObject() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5]); // Return an array from the Promise
    }, 500);
  });
}

export function unwrapJSObjectAsIntArray(jsObject) {
  return jsObject;
}
```

```csharp
// Not supported, generates compile-time error.
// [JSImport("waitGetArray", "PromisesShim")]
// [return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>()]
// public static partial Task<int[]> WaitGetIntArray();

// Workaround, take the return the call and pass it to UnwrapJSObjectAsIntArray.
// Return a JSObject reference to a JS number array.
[JSImport("waitGetIntArrayAsObject", "PromisesShim")]
[return: JSMarshalAs<JSType.Promise<JSType.Object>>()]
public static partial Task<JSObject> WaitGetIntArrayAsObject();

// Takes a JSObject reference to a JS number array, and returns the array as a C# 
// int array.
[JSImport("unwrapJSObjectAsIntArray", "PromisesShim")]
[return: JSMarshalAs<JSType.Array<JSType.Number>>()]
public static partial int[] UnwrapJSObjectAsIntArray(JSObject intArray);
//...
```

In `Program.Main`:

```csharp
JSObject arrayAsJSObject = await PromisesInterop.WaitGetIntArrayAsObject();
int[] intArray = PromisesInterop.UnwrapJSObjectAsIntArray(arrayAsJSObject);
```

## Performance considerations

Marshalling of calls and the overhead of tracking objects across the interop boundary is more expensive than native .NET operations but should still demonstrate acceptable performance for a typical web app with moderate demand.

Object proxies, such as [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject), which maintain references across the interop boundary, have additional memory overhead and impact how garbage collection affects these objects. Additionally, available memory might be exhausted without triggering garbage collection in some scenarios because memory pressure from JS and .NET isn't shared. This risk is significant when an excessive number of large objects are referenced across the interop boundary by relatively small JS objects, or vice versa where large .NET objects are referenced by JS proxies. In such cases, we recommend following deterministic disposal patterns with `using` scopes leveraging the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) interface on JS objects.

The following benchmarks, which leverage earlier example code, demonstrate that interop operations are roughly an order of magnitude slower than those that remain within the .NET boundary, but the interop operations remain relatively fast. Additionally, consider that a user's device capabilities impact performance.

`JSObjectBenchmark.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/JSObjectBenchmark.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

In `Program.Main`:

```csharp
JSObjectBenchmark.Run();
```

The preceding example displays the following output in the browser's debug console:

> JS interop elapsed time: .2536 seconds at .000254 ms per operation
> .NET elapsed time: .0210 seconds at .000021 ms per operation
> Begin Object Creation
> JS interop elapsed time: 2.1686 seconds at .002169 ms per operation
> .NET elapsed time: .1089 seconds at .000109 ms per operation

## Subscribing to JS events

.NET code can subscribe to JS events and handle JS events by passing a C# [System.Action](https://learn.microsoft.com/search/?terms=System.Action) to a JS function to act as a handler. The JS shim code handles subscribing to the event.

> **Warning:**
> Interacting with individual properties of the DOM via JS interop, as the guidance in this section demonstrates, is relatively slow and may lead to the creation of many proxies that create high garbage collection pressure. The following pattern isn't generally recommended. Use the following pattern for no more than a few elements. For more information, see the [Performance considerations](#performance-considerations) section.

A nuance of `removeEventListener` is that it requires a reference to the function previously passed to `addEventListener`. When a C# [System.Action](https://learn.microsoft.com/search/?terms=System.Action) is passed across the interop boundary, it's wrapped in a JS proxy object. Therefore, passing the same C# [System.Action](https://learn.microsoft.com/search/?terms=System.Action) to both `addEventListener` and `removeEventListener` results in generating two different JS proxy objects wrapping the [System.Action](https://learn.microsoft.com/search/?terms=System.Action). These references are different, thus `removeEventListener` isn't able to find the event listener to remove. To address this problem, the following examples wrap the C# [System.Action](https://learn.microsoft.com/search/?terms=System.Action) in a JS function and return the reference as a [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject) from the subscribe call to pass later to the unsubscribe call. Because the C# [System.Action](https://learn.microsoft.com/search/?terms=System.Action) is returned and passed as a [System.Runtime.InteropServices.JavaScript.JSObject](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript.JSObject), the same reference is used for both calls, and the event listener can be removed.

`EventsShim.js`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/EventsShim.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

`EventsInterop.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/EventsInterop.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/client-side/dotnet-interop/index.md)

In `Program.Main`:

```csharp
await EventsUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> Subscribed to btn1 & 2.
> In C# event listener: Event click from ID btn1
> In C# event listener: Event click from ID btn2
> Unsubscribed btn2.
> In C# event listener: Event click from ID btn1
> Subscribed to btn1.
> In C# event listener: Event click from ID btn1
> Unsubscribed btn1.

## JS `[JSImport]`/`[JSExport]` interop scenarios

The following articles focus on running a .NET WebAssembly module in a JS host, such as a browser:

* [client-side/dotnet-interop/wasm-browser-app](wasm-browser-app.md)
* [blazor/js-interop/import-export-interop](../../blazor/javascript-interoperability/import-export-interop.md)
