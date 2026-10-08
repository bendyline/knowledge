---
title: ASP.NET Core Blazor JavaScript interoperability (JS interop) performance best practices
author: guardrex
description: Tips for improving JS interop performance in ASP.NET Core Blazor apps and avoiding common performance problems.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/performance/js-interop
---
# ASP.NET Core Blazor JavaScript interoperability (JS interop) performance best practices

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


Calls between .NET and JavaScript require additional overhead because:

* Calls are asynchronous.
* Parameters and return values are JSON-serialized to provide an easy-to-understand conversion mechanism between .NET and JavaScript types.

Additionally for server-side Blazor apps, these calls are passed across the network.

## Avoid excessively fine-grained calls

Since each call involves some overhead, it can be valuable to reduce the number of calls. Consider the following code, which stores a collection of items in the browser's [`localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage):

```csharp
private async Task StoreAllInLocalStorage(IEnumerable<TodoItem> items)
{
    foreach (var item in items)
    {
        await JS.InvokeVoidAsync("localStorage.setItem", item.Id, 
            JsonSerializer.Serialize(item));
    }
}
```

The preceding example makes a separate JS interop call for each item. Instead, the following approach reduces the JS interop to a single call:

```csharp
private async Task StoreAllInLocalStorage(IEnumerable<TodoItem> items)
{
    await JS.InvokeVoidAsync("storeAllInLocalStorage", items);
}
```

The corresponding JavaScript function stores the whole collection of items on the client:

```javascript
function storeAllInLocalStorage(items) {
  items.forEach(item => {
    localStorage.setItem(item.id, JSON.stringify(item));
  });
}
```

For Blazor WebAssembly apps, rolling individual JS interop calls into a single call usually only improves performance significantly if the component makes a large number of JS interop calls.

## Consider the use of synchronous calls

**Applies to: \>= aspnetcore-5.0**

### Call JavaScript from .NET

*This section only applies to client-side components.*

JS interop calls are asynchronous, regardless of whether the called code is synchronous or asynchronous. Calls are asynchronous to ensure that components are compatible across server-side and client-side render modes. On the server, all JS interop calls must be asynchronous because they're sent over a network connection.

If you know for certain that your component only runs on WebAssembly, you can choose to make synchronous JS interop calls. This has slightly less overhead than making asynchronous calls and can result in fewer render cycles because there's no intermediate state while awaiting results.

To make a synchronous call from .NET to JavaScript in a client-side component, cast [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) to [Microsoft.JSInterop.IJSInProcessRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessRuntime) to make the JS interop call:

```razor
@inject IJSRuntime JS

...

@code {
    protected override void HandleSomeEvent()
    {
        var jsInProcess = (IJSInProcessRuntime)JS;
        var value = jsInProcess.Invoke<string>("javascriptFunctionIdentifier");
    }
}
```

When working with [Microsoft.JSInterop.IJSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSObjectReference) in .NET 5 or later client-side components, you can use [Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference) synchronously instead. [Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference) implements [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable)/[System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and should be disposed for garbage collection to prevent a memory leak, as the following example demonstrates:

```razor
@inject IJSRuntime JS
@implements IDisposable

...

@code {
    ...
    private IJSInProcessObjectReference? module;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var jsInProcess = (IJSInProcessRuntime)JS;
            module = await jsInProcess.Invoke<IJSInProcessObjectReference>("import", 
                "./scripts.js");
            var value = module.Invoke<string>("javascriptFunctionIdentifier");
        }
    }

    ...

    void IDisposable.Dispose()
    {
        if (module is not null)
        {
            await module.Dispose();
        }
    }
}
```

In the preceding example, a [Microsoft.JSInterop.JSDisconnectedException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSDisconnectedException) isn't trapped during module disposal because there's no Blazor-SignalR circuit in a Blazor WebAssembly app to lose. For more information, see [blazor/js-interop/index#javascript-interop-calls-without-a-circuit](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-interop-calls-without-a-circuit).


### Call .NET from JavaScript

*This section only applies to client-side components.*

JS interop calls are asynchronous, regardless of whether the called code is synchronous or asynchronous. Calls are asynchronous to ensure that components are compatible across server-side and client-side render modes. On the server, all JS interop calls must be asynchronous because they're sent over a network connection.

If you know for certain that your component only runs on WebAssembly, you can choose to make synchronous JS interop calls. This has slightly less overhead than making asynchronous calls and can result in fewer render cycles because there's no intermediate state while awaiting results.

To make a synchronous call from JavaScript to .NET in a client-side component, use `DotNet.invokeMethod` instead of `DotNet.invokeMethodAsync`.

Synchronous calls work if:

* The component is only rendered for execution on WebAssembly.
* The called function returns a value synchronously. The function isn't an `async` method and doesn't return a .NET [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or JavaScript [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise).




**Applies to: < aspnetcore-5.0**

*This section only applies to client-side components.*

JS interop calls are asynchronous, regardless of whether the called code is synchronous or asynchronous. Calls are asynchronous to ensure that components are compatible across server-side and client-side render modes. On the server, all JS interop calls must be asynchronous because they're sent over a network connection.

If you know for certain that your component only runs on WebAssembly, you can choose to make synchronous JS interop calls. This has slightly less overhead than making asynchronous calls and can result in fewer render cycles because there's no intermediate state while awaiting results.

To make a synchronous call from .NET to JavaScript in a client-side component, cast [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) to [Microsoft.JSInterop.IJSInProcessRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessRuntime) to make the JS interop call:

```razor
@inject IJSRuntime JS

...

@code {
    protected override void HandleSomeEvent()
    {
        var jsInProcess = (IJSInProcessRuntime)JS;
        var value = jsInProcess.Invoke<string>("javascriptFunctionIdentifier");
    }
}
```

When working with [Microsoft.JSInterop.IJSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSObjectReference) in .NET 5 or later client-side components, you can use [Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference) synchronously instead. [Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference) implements [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable)/[System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and should be disposed for garbage collection to prevent a memory leak, as the following example demonstrates:

```razor
@inject IJSRuntime JS
@implements IDisposable

...

@code {
    ...
    private IJSInProcessObjectReference? module;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var jsInProcess = (IJSInProcessRuntime)JS;
            module = await jsInProcess.Invoke<IJSInProcessObjectReference>("import", 
                "./scripts.js");
            var value = module.Invoke<string>("javascriptFunctionIdentifier");
        }
    }

    ...

    void IDisposable.Dispose()
    {
        if (module is not null)
        {
            await module.Dispose();
        }
    }
}
```

In the preceding example, a [Microsoft.JSInterop.JSDisconnectedException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSDisconnectedException) isn't trapped during module disposal because there's no Blazor-SignalR circuit in a Blazor WebAssembly app to lose. For more information, see [blazor/js-interop/index#javascript-interop-calls-without-a-circuit](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-interop-calls-without-a-circuit).




**Applies to: \>= aspnetcore-5.0 < aspnetcore-7.0**

## Consider the use of unmarshalled calls

*This section only applies to Blazor WebAssembly apps.*

When running on Blazor WebAssembly, it's possible to make unmarshalled calls from .NET to JavaScript. These are synchronous calls that don't perform JSON serialization of arguments or return values. All aspects of memory management and translations between .NET and JavaScript representations are left up to the developer.

> **Warning:**
> While using [Microsoft.JSInterop.IJSUnmarshalledRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSUnmarshalledRuntime) has the least overhead of the JS interop approaches, the JavaScript APIs required to interact with these APIs are currently undocumented and subject to breaking changes in future releases.

```javascript
function jsInteropCall() {
  return BINDING.js_to_mono_obj("Hello world");
}
```

```razor
@inject IJSRuntime JS

@code {
    protected override void OnInitialized()
    {
        var unmarshalledJs = (IJSUnmarshalledRuntime)JS;
        var value = unmarshalledJs.InvokeUnmarshalled<string>("jsInteropCall");
    }
}
```



**Applies to: \>= aspnetcore-7.0**

## Use JavaScript `[JSImport]`/`[JSExport]` interop

JavaScript `[JSImport]`/`[JSExport]` interop for Blazor WebAssembly apps offers improved performance and stability over the JS interop API in framework releases prior to ASP.NET Core in .NET 7.

For more information, see [blazor/js-interop/import-export-interop](../javascript-interoperability/import-export-interop.md).
