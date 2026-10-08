---
title: ASP.NET Core Blazor synchronization context
author: guardrex
description: Learn about Blazor's synchronization context, how to avoid thread-blocking calls, and how to invoke component methods externally.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/sync-context
---
# ASP.NET Core Blazor synchronization context

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


Blazor uses a synchronization context ([System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext)) to enforce a single logical thread of execution. A component's [lifecycle methods](lifecycle.md) and event callbacks raised by Blazor are executed on the synchronization context.

Blazor's server-side synchronization context attempts to emulate a single-threaded environment so that it closely matches the WebAssembly model in the browser, which is single threaded. This emulation is scoped only to an individual circuit, meaning two different circuits can run in parallel. At any given point in time within a circuit, work is performed on exactly one thread, which yields the impression of a single logical thread. No two operations execute concurrently within the same circuit.

A single logical thread of execution doesn't imply a single asynchronous control flow. A component is re-entrant at any point where it awaits an incomplete [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task). [Lifecycle methods](lifecycle.md) or [component disposal methods](component-disposal.md) may be called before the asynchronous control flow resumes after awaiting a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) to complete. Therefore, a component must ensure that it's in a valid state before awaiting a potentially incomplete [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task). In particular, a component must ensure that it's in a valid state for rendering when [Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync%252A) or [Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync%252A) return. If either of these methods return an incomplete [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), they must ensure that the part of the method that completes synchronously leaves the component in a valid state for rendering.

Another implication of re-entrant components is that a method can't defer a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) until after the method returns by passing it to [Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync%252A). Calling [Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync%252A) may only defer the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) until the next [`await` operator](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/await) is reached.

Components might implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) or [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) to call asynchronous methods using a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) from a [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) that's canceled when the component is disposed. However, this really depends on the scenario. It's up to the component author to determine whether that's the correct behavior. For example, if implementing a `SaveButton` component that persists some local data to a database when a save button is selected, the component author may indeed intend to discard the changes if the user selects the button and quickly navigates to another page, which could dispose the component before the asynchronous save completes.

A disposable component can check for disposal after awaiting any [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that doesn't receive the component's [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken). Incomplete [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)s may also prevent garbage collection of a disposed component.

[Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase) ignores exceptions caused by [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) cancellation (more precisely, it ignores *all* exceptions if the awaited [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)s are canceled), so component methods don't need to handle [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException) and [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException).

[Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase) can't follow the preceding guidelines because it doesn't conceptualize what constitutes a valid state for a derived component and it doesn't itself implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) or [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable). If [Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync%252A) returns an incomplete [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that doesn't use a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) and the component is disposed before the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) completes, [Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase) still calls [Microsoft.AspNetCore.Components.ComponentBase.OnParametersSet%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnParametersSet%252A) and awaits [Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync%252A). If a disposable component doesn't use a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken), [Microsoft.AspNetCore.Components.ComponentBase.OnParametersSet%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnParametersSet%252A) and [Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync%252A) should check if the component is disposed.

## Avoid thread-blocking calls

Generally, don't call the following methods in components. The following methods block the execution thread and thus block the app from resuming work until the underlying [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) is complete:

* [System.Threading.Tasks.Task%601.Result%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%25601.Result%252A)
* [System.Threading.Tasks.Task.Wait%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait%252A)
* [System.Threading.Tasks.Task.WaitAny%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAny%252A)
* [System.Threading.Tasks.Task.WaitAll%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll%252A)
* [System.Threading.Thread.Sleep%2A](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep%252A)
* [System.Runtime.CompilerServices.TaskAwaiter.GetResult%2A](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.TaskAwaiter.GetResult%252A)

> **Note:**
> Blazor documentation examples that use the thread-blocking methods mentioned in this section are only using the methods for demonstration purposes, not as recommended coding guidance. For example, a few component code demonstrations simulate a long-running process by calling [System.Threading.Thread.Sleep%2A](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Sleep%252A).

## Invoke component methods externally to update state

In the event a component must be updated based on an external event, such as a timer or other notification, use the `InvokeAsync` method, which dispatches code execution to Blazor's synchronization context. For example, consider the following *notifier service* that can notify any listening component about updated state. The `Update` method can be called from anywhere in the app.

`TimerService.cs`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/TimerService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/TimerService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/TimerService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/TimerService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/TimerService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/TimerService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



`NotifierService.cs`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/NotifierService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/NotifierService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/NotifierService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/NotifierService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/NotifierService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/NotifierService.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



Register the services:

* For client-side development, register the services as singletons in the client-side `Program` file:

  ```csharp
  builder.Services.AddSingleton<NotifierService>();
  builder.Services.AddSingleton<TimerService>();
  ```

* For server-side development, register the services as scoped in the server `Program` file:

  ```csharp
  builder.Services.AddScoped<NotifierService>();
  builder.Services.AddScoped<TimerService>();
  ```

Use the `NotifierService` to update a component.

**Applies to: \>= aspnetcore-9.0**

`Notifications.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Notifications.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`Notifications.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Notifications.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`ReceiveNotifications.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/synchronization-context/ReceiveNotifications.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`ReceiveNotifications.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/synchronization-context/ReceiveNotifications.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`ReceiveNotifications.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/synchronization-context/ReceiveNotifications.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



**Applies to: < aspnetcore-5.0**

`ReceiveNotifications.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/synchronization-context/ReceiveNotifications.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/synchronization-context.md)



In the preceding example:

**Applies to: \>= aspnetcore-6.0**

* The timer is initiated outside of Blazor's synchronization context with `_ = Task.Run(Timer.Start)`.
* `NotifierService` invokes the component's `OnNotify` method. `InvokeAsync` is used to switch to the correct context and enqueue a rerender. For more information, see [blazor/components/rendering](rendering.md).
* The component implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable). The `OnNotify` delegate is unsubscribed in the `Dispose` method, which is called by the framework when the component is disposed. For more information, see [blazor/components/component-disposal](component-disposal.md).



**Applies to: < aspnetcore-6.0**

* `NotifierService` invokes the component's `OnNotify` method outside of Blazor's synchronization context. `InvokeAsync` is used to switch to the correct context and enqueue a rerender. For more information, see [blazor/components/rendering](rendering.md).
* The component implements [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable). The `OnNotify` delegate is unsubscribed in the `Dispose` method, which is called by the framework when the component is disposed. For more information, see [blazor/components/component-disposal](component-disposal.md).



> **Important:**
> If a Razor component defines an event that's triggered from a background thread, the component might be required to capture and restore the execution context ([System.Threading.ExecutionContext](https://learn.microsoft.com/search/?terms=System.Threading.ExecutionContext)) at the time the handler is registered. For more information, see [Calling `InvokeAsync(StateHasChanged)` causes page to fallback to default culture (`dotnet/aspnetcore` #28521)](https://github.com/dotnet/aspnetcore/issues/28521#issuecomment-1112513408).

**Applies to: \>= aspnetcore-8.0**

To dispatch caught exceptions from the background `TimerService` to the component to treat the exceptions like normal lifecycle event exceptions, see the [Handle caught exceptions outside of a Razor component's lifecycle](#handle-caught-exceptions-outside-of-a-razor-components-lifecycle) section.



**Applies to: \>= aspnetcore-8.0**

## Handle caught exceptions outside of a Razor component's lifecycle

Use [Microsoft.AspNetCore.Components.ComponentBase.DispatchExceptionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.DispatchExceptionAsync%252A) in a Razor component to process exceptions thrown outside of the component's lifecycle call stack. This permits the component's code to treat exceptions as though they're lifecycle method exceptions. Thereafter, Blazor's error handling mechanisms, such as [error boundaries](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries), can process the exceptions.

> **Note:**
> [Microsoft.AspNetCore.Components.ComponentBase.DispatchExceptionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.DispatchExceptionAsync%252A) is used in Razor component files (`.razor`) that inherit from [Microsoft.AspNetCore.Components.ComponentBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase). When creating components that [implement [Microsoft.AspNetCore.Components.IComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.IComponent) directly](xref:blazor/components/index#component-classes), use [Microsoft.AspNetCore.Components.RenderHandle.DispatchExceptionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderHandle.DispatchExceptionAsync%252A).

To handle caught exceptions outside of a Razor component's lifecycle, pass the exception to [Microsoft.AspNetCore.Components.RenderHandle.DispatchExceptionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderHandle.DispatchExceptionAsync%252A) and await the result:

```csharp
try
{
    ...
}
catch (Exception ex)
{
    await DispatchExceptionAsync(ex);
}
```

A common scenario for the preceding approach is when a component starts an asynchronous operation but doesn't await a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), often called the *fire and forget* pattern because the method is *fired* (started) and the result of the method is *forgotten* (thrown away). If the operation fails, you may want the component to treat the failure as a component lifecycle exception for any of the following goals:

* Put the component into a faulted state, for example, to trigger an [error boundary](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries).
* Terminate the circuit if there's no error boundary.
* Trigger the same logging that occurs for lifecycle exceptions.

In the following example, the user selects the **Send report** button to trigger a background method, `ReportSender.SendAsync`, that sends a report. In most cases, a component awaits the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) of an asynchronous call and updates the UI to indicate the operation completed. In the following example, the `SendReport` method doesn't await a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and doesn't report the result to the user. Because the component intentionally discards the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) in `SendReport`, any asynchronous failures occur off of the normal lifecycle call stack, hence aren't seen by Blazor:

```razor
<button @onclick="SendReport">Send report</button>

@code {
    private void SendReport()
    {
        _ = ReportSender.SendAsync();
    }
}
```

To treat failures like lifecycle method exceptions, explicitly dispatch exceptions back to the component with [Microsoft.AspNetCore.Components.ComponentBase.DispatchExceptionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.DispatchExceptionAsync%252A), as the following example demonstrates: 

```razor
<button @onclick="SendReport">Send report</button>

@code {
    private void SendReport()
    {
        _ = SendReportAsync();
    }

    private async Task SendReportAsync()
    {
        try
        {
            await ReportSender.SendAsync();
        }
        catch (Exception ex)
        {
            await DispatchExceptionAsync(ex);
        }
    }
}
```

An alternative approach leverages [System.Threading.Tasks.Task.Run%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run%252A):

```csharp
private void SendReport()
{
    _ = Task.Run(async () =>
    {
        try
        {
            await ReportSender.SendAsync();
        }
        catch (Exception ex)
        {
            await DispatchExceptionAsync(ex);
        }
    });
}
```

For a working demonstration, implement the timer notification example in [Invoke component methods externally to update state](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fsync-context%23invoke-component-methods-externally-to-update-state). In a Blazor app, add the following files from the timer notification example and register the services in the `Program` file as the section explains:

* `TimerService.cs`
* `NotifierService.cs`
* `Notifications.razor`

The example uses a timer outside of a Razor component's lifecycle, where an unhandled exception normally isn't processed by Blazor's error handling mechanisms, such as an [error boundary](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries).

First, change the code in `TimerService.cs` to create an artificial exception outside of the component's lifecycle. In the `while` loop of `TimerService.cs`, throw an exception when the `elapsedCount` reaches a value of two:

```csharp
if (elapsedCount == 2)
{
    throw new Exception("I threw an exception! Somebody help me!");
}
```

Place an [error boundary](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries) in the app's main layout. Replace the `<article>...</article>` markup with the following markup.

In `MainLayout.razor`:

```razor
<article class="content px-4">
    <ErrorBoundary>
        <ChildContent>
            @Body
        </ChildContent>
        <ErrorContent>
            <p class="alert alert-danger" role="alert">
                Oh, dear! Oh, my! - George Takei
            </p>
        </ErrorContent>
    </ErrorBoundary>
</article>
```

In Blazor Web Apps with the error boundary only applied to a static `MainLayout` component, the boundary is only active during the static server-side rendering (static SSR) phase. The boundary doesn't activate just because a component further down the component hierarchy is interactive. To enable interactivity broadly for the `MainLayout` component and the rest of the components further down the component hierarchy, enable interactive rendering for the `HeadOutlet` and `Routes` component instances in the `App` component (`Components/App.razor`). The following example adopts the Interactive Server (`InteractiveServer`) render mode:

```razor
<HeadOutlet @rendermode="InteractiveServer" />

...

<Routes @rendermode="InteractiveServer" />
```

If you run the app at this point, the exception is thrown when the elapsed count reaches a value of two. However, the UI doesn't change. The error boundary doesn't show the error content.

To dispatch exceptions from the timer service back to the `Notifications` component, the following changes are made to the component:

* Start the timer in a [`try-catch` statement](https://learn.microsoft.com/dotnet/csharp/language-reference/statements/exception-handling-statements#the-try-catch-statement). In the `catch` clause of the `try-catch` block, exceptions are dispatched back to the component by passing the [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) to [Microsoft.AspNetCore.Components.ComponentBase.DispatchExceptionAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.DispatchExceptionAsync%252A) and awaiting the result.
* In the `StartTimer` method, start the asynchronous timer service in the [System.Action](https://learn.microsoft.com/search/?terms=System.Action) delegate of [System.Threading.Tasks.Task.Run%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run%252A) and intentionally discard the returned [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task).

The `StartTimer` method of the `Notifications` component (`Notifications.razor`):

```csharp
private void StartTimer()
{
    _ = Task.Run(async () =>
    {
        try
        {
            await Timer.Start();
        }
        catch (Exception ex)
        {
            await DispatchExceptionAsync(ex);
        }
    });
}
```

When the timer service executes and reaches a count of two, the exception is dispatched to the Razor component, which in turn triggers the error boundary to display the error content of the `<ErrorBoundary>` in the `MainLayout` component:

> Oh, dear! Oh, my! - George Takei
