---
title: ASP.NET Core Razor component disposal
author: guardrex
description: Learn about ASP.NET Core Razor component component disposal with IDisposable and IAsyncDisposable.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/component-disposal
---
# ASP.NET Core Razor component disposal

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


This article explains the ASP.NET Core Razor component disposal process with [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable).

If a component implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) or [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable), the framework calls for resource disposal when the component is removed from the UI. Don't rely on the exact timing of when these methods are executed. For example, [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) can be triggered before or after an asynchronous [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) awaited in [`OnInitalizedAsync`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23component-initialization-oninitializedasync) or [`OnParametersSetAsync`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23after-parameters-are-set-onparameterssetasync) is called or completes. Also, object disposal code shouldn't assume that objects created during initialization or other lifecycle methods exist.

Components shouldn't need to implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) simultaneously. If both are implemented, the framework only executes the asynchronous overload.

Developer code must ensure that [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) implementations don't take a long time to complete.

For more information, see the introductory remarks of [blazor/components/sync-context](synchronization-context.md).

## Disposal of JavaScript interop object references

Examples throughout the [JavaScript (JS) interop articles](../javascript-interoperability/index.md) demonstrate typical object disposal patterns:

* When calling JS from .NET, as described in [blazor/js-interop/call-javascript-from-dotnet](../javascript-interoperability/call-javascript-from-dotnet.md), dispose any created [Microsoft.JSInterop.IJSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSObjectReference)/[Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference)/[Microsoft.JSInterop.Implementation.JSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.Implementation.JSObjectReference) either from .NET or from JS to avoid leaking JS memory.

* When calling .NET from JS, as described in [blazor/js-interop/call-dotnet-from-javascript](../javascript-interoperability/call-dotnet-from-javascript.md), dispose any created [Microsoft.JSInterop.DotNetObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.DotNetObjectReference) either from .NET or from JS to avoid leaking .NET memory.

JS interop object references are implemented as a map keyed by an identifier on the side of the JS interop call that creates the reference. When object disposal is initiated from either the .NET or JS side, Blazor removes the entry from the map, and the object can be garbage collected as long as no other strong reference to the object is present.

At a minimum, always dispose objects created on the .NET side to avoid leaking .NET managed memory.

## DOM cleanup tasks during component disposal

For more information, see [blazor/js-interop/index#dom-cleanup-tasks-during-component-disposal](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23dom-cleanup-tasks-during-component-disposal).

For guidance on [Microsoft.JSInterop.JSDisconnectedException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSDisconnectedException) when a circuit is disconnected, see [blazor/js-interop/index#javascript-interop-calls-without-a-circuit](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-interop-calls-without-a-circuit). For general JavaScript interop error handling guidance, see the *JavaScript interop* section in [blazor/fundamentals/handle-errors#javascript-interop](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23javascript-interop).

## Synchronous `IDisposable`

For synchronous disposal tasks, use [System.IDisposable.Dispose%2A](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose%252A).

The following component:

* Implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) with the [`@implements`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23implements) Razor directive.
* Disposes of `obj`, which is a type that implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable).
* A null check is performed because `obj` is created in a lifecycle method (not shown).

```razor
@implements IDisposable

...

@code {
    ...

    public void Dispose()
    {
        obj?.Dispose();
    }
}
```

If a single object requires disposal, a lambda can be used to dispose of the object when [System.IDisposable.Dispose%2A](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose%252A) is called. The following example appears in the [blazor/components/rendering#receiving-a-call-from-something-external-to-the-blazor-rendering-and-event-handling-system](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23receiving-a-call-from-something-external-to-the-blazor-rendering-and-event-handling-system) article and demonstrates the use of a lambda expression for the disposal of a [System.Timers.Timer](https://learn.microsoft.com/search/?terms=System.Timers.Timer).

**Applies to: \>= aspnetcore-9.0**

`TimerDisposal1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/TimerDisposal1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`TimerDisposal1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/TimerDisposal1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`CounterWithTimerDisposal1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/lifecycle/CounterWithTimerDisposal1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`CounterWithTimerDisposal1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/lifecycle/CounterWithTimerDisposal1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`CounterWithTimerDisposal1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/lifecycle/CounterWithTimerDisposal1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: < aspnetcore-5.0**

`CounterWithTimerDisposal1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/lifecycle/CounterWithTimerDisposal1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



> **Note:**
> In the preceding example, the call to [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) is wrapped by a call to [Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync%252A) because the callback is invoked outside of Blazor's synchronization context. For more information, see [blazor/components/rendering#receiving-a-call-from-something-external-to-the-blazor-rendering-and-event-handling-system](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23receiving-a-call-from-something-external-to-the-blazor-rendering-and-event-handling-system).

If the object is created in a lifecycle method, such as [`OnInitialized{Async}`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23component-initialization-oninitializedasync), check for `null` before calling `Dispose`.

**Applies to: \>= aspnetcore-9.0**

`TimerDisposal2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/TimerDisposal2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`TimerDisposal2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/TimerDisposal2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`CounterWithTimerDisposal2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/lifecycle/CounterWithTimerDisposal2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`CounterWithTimerDisposal2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/lifecycle/CounterWithTimerDisposal2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`CounterWithTimerDisposal2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/lifecycle/CounterWithTimerDisposal2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



**Applies to: < aspnetcore-5.0**

`CounterWithTimerDisposal2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/lifecycle/CounterWithTimerDisposal2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/component-disposal.md)



For more information, see:

* [Cleaning up unmanaged resources (.NET documentation)](https://learn.microsoft.com/dotnet/standard/garbage-collection/unmanaged)
* [Null-conditional operators ?. and ?\[\]](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/member-access-operators#null-conditional-operators--and-)

## Asynchronous `IAsyncDisposable`

For asynchronous disposal tasks, use [System.IAsyncDisposable.DisposeAsync%2A](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync%252A).

The following component:

* Implements [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) with the [`@implements`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23implements) Razor directive.
* Disposes of `obj`, which is an unmanaged type that implements [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable).
* A null check is performed because `obj` is created in a lifecycle method (not shown).

```razor
@implements IAsyncDisposable

...

@code {
    ...

    public async ValueTask DisposeAsync()
    {
        if (obj is not null)
        {
            await obj.DisposeAsync();
        }
    }
}
```

For more information, see:

* [blazor/components/sync-context](synchronization-context.md)
* [Cleaning up unmanaged resources (.NET documentation)](https://learn.microsoft.com/dotnet/standard/garbage-collection/unmanaged)
* [Null-conditional operators ?. and ?\[\]](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/member-access-operators#null-conditional-operators--and-)

## Assignment of `null` to disposed objects

Usually, there's no need to assign `null` to disposed objects after calling [System.IDisposable.Dispose%2A](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose%252A)/[System.IAsyncDisposable.DisposeAsync%2A](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync%252A). Rare cases for assigning `null` include the following:

* If the object's type is poorly implemented and doesn't tolerate repeat calls to [System.IDisposable.Dispose%2A](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose%252A)/[System.IAsyncDisposable.DisposeAsync%2A](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync%252A), assign `null` after disposal to gracefully skip further calls to [System.IDisposable.Dispose%2A](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose%252A)/[System.IAsyncDisposable.DisposeAsync%2A](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync%252A).
* If a long-lived process continues to hold a reference to a disposed object, assigning `null` allows the [garbage collector](https://learn.microsoft.com/dotnet/standard/garbage-collection/fundamentals) to free the object in spite of the long-lived process holding a reference to it.

These are unusual scenarios. For objects that are implemented correctly and behave normally, there's no point in assigning `null` to disposed objects. In the rare cases where an object must be assigned `null`, we recommend documenting the reason and seeking a solution that prevents the need to assign `null`.

## `StateHasChanged`

> **Note:**
> Calling [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) in `Dispose` and `DisposeAsync` isn't supported. [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) might be invoked as part of tearing down the renderer, so requesting UI updates at that point isn't supported.

## Event handlers

Always unsubscribe event handlers from .NET events. The following [Blazor form](../forms/index.md) examples show how to unsubscribe an event handler in the `Dispose` method.

Private field and lambda approach:

```razor
@implements IDisposable

<EditForm ... EditContext="editContext" ...>
    ...
    <button type="submit" disabled="@formInvalid">Submit</button>
</EditForm>

@code {
    ...

    private EventHandler<FieldChangedEventArgs>? fieldChanged;

    protected override void OnInitialized()
    {
        editContext = new(model);

        fieldChanged = (_, __) =>
        {
            ...
        };

        editContext.OnFieldChanged += fieldChanged;
    }

    public void Dispose()
    {
        editContext.OnFieldChanged -= fieldChanged;
    }
}
```

Private method approach:

```razor
@implements IDisposable

<EditForm ... EditContext="editContext" ...>
    ...
    <button type="submit" disabled="@formInvalid">Submit</button>
</EditForm>

@code {
    ...

    protected override void OnInitialized()
    {
        editContext = new(model);
        editContext.OnFieldChanged += HandleFieldChanged;
    }

    private void HandleFieldChanged(object sender, FieldChangedEventArgs e)
    {
        ...
    }

    public void Dispose()
    {
        editContext.OnFieldChanged -= HandleFieldChanged;
    }
}
```

For more information on the [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component and forms, see [blazor/forms/index](../forms/index.md) and the other forms articles in the *Forms* node.

## Anonymous functions, methods, and expressions

When [anonymous functions](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/anonymous-functions), methods, or expressions, are used, it isn't necessary to implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and unsubscribe delegates. However, failing to unsubscribe a delegate is a problem **when the object exposing the event outlives the lifetime of the component registering the delegate**. When this occurs, a memory leak results because the registered delegate keeps the original object alive. Therefore, only use the following approaches when you know that the event delegate disposes quickly. When in doubt about the lifetime of objects that require disposal, subscribe a delegate method and properly dispose the delegate as the earlier examples show.

Anonymous lambda method approach (explicit disposal not required):

```csharp
private void HandleFieldChanged(object sender, FieldChangedEventArgs e)
{
    formInvalid = !editContext.Validate();
    StateHasChanged();
}

protected override void OnInitialized()
{
    editContext = new(starship);
    editContext.OnFieldChanged += (s, e) => HandleFieldChanged((editContext)s, e);
}
```

Anonymous lambda expression approach (explicit disposal not required):

```csharp
private ValidationMessageStore? messageStore;

[CascadingParameter]
private EditContext? CurrentEditContext { get; set; }

protected override void OnInitialized()
{
    ...

    messageStore = new(CurrentEditContext);

    CurrentEditContext.OnValidationRequested += (s, e) => messageStore.Clear();
    CurrentEditContext.OnFieldChanged += (s, e) => 
        messageStore.Clear(e.FieldIdentifier);
}
```

The full example of the preceding code with anonymous lambda expressions appears in the [blazor/forms/validation-advanced#validator-components](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation-advanced%23validator-components) article.

For more information, see [Cleaning up unmanaged resources](https://learn.microsoft.com/dotnet/standard/garbage-collection/unmanaged) and the topics that follow it on implementing the `Dispose` and `DisposeAsync` methods.

## Disposal during JS interop

Trap [Microsoft.JSInterop.JSDisconnectedException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSDisconnectedException) in potential cases where loss of Blazor's SignalR circuit prevents JS interop calls and results an unhandled exception.

For more information, see the following resources:

* [JavaScript isolation in JavaScript modules](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23javascript-isolation-in-javascript-modules)
* [JavaScript interop calls without a circuit](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-interop-calls-without-a-circuit)
