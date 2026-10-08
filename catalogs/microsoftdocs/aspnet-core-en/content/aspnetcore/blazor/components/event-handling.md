---
title: ASP.NET Core Blazor event handling
author: guardrex
description: Learn about Blazor's event handling features, including event argument types, event callbacks, and managing default browser events.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 07/02/2026
uid: blazor/components/event-handling
---
# ASP.NET Core Blazor event handling

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


This article explains Blazor's event handling features, including event argument types, event callbacks, and managing default browser events.

The [`Microsoft.AspNetCore.Components.Web` NuGet package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.Web) ([Microsoft.AspNetCore.Components.Web](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web) namespace) contains types for supplying information about browser events to the Blazor framework. Blazor apps target the package implicitly, while [Razor class libraries](class-libraries.md) include an explicit package reference in the library's project file (`.csproj`).

## Delegate event handlers

Specify delegate event handlers in Razor component markup with [`@on{DOM EVENT}="{DELEGATE}"`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23onevent) Razor syntax:

* The `{DOM EVENT}` placeholder is a [DOM event](https://developer.mozilla.org/docs/Web/Events) (for example, `click`).
* The `{DELEGATE}` placeholder is the C# delegate event handler.

For supported events, see [Microsoft.AspNetCore.Components.Web.EventHandlers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.EventHandlers).

For event handling:

**Applies to: \>= aspnetcore-8.0**

* Delegate event handlers in Blazor Web Apps are only called in components that adopt an interactive render mode. The examples throughout this article assume that the app adopts an interactive render mode globally in the app's root component, typically the `App` component. For more information, see [blazor/components/render-modes#apply-a-render-mode-to-the-entire-app](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frender-modes%23apply-a-render-mode-to-the-entire-app).
* Asynchronous delegate event handlers that return a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) (`async Task`) are supported by Blazor and adopted by Blazor Web App and Blazor WebAssembly documentation examples.
* Delegate event handlers automatically trigger a UI render, so there's no need to manually call [`StateHasChanged`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23state-changes-statehaschanged).
* Exceptions are logged.



**Applies to: < aspnetcore-8.0**

* Asynchronous delegate event handlers that return a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) (`async Task`) are supported by Blazor and adopted by Blazor Server and Blazor WebAssembly documentation examples.
* Delegate event handlers automatically trigger a UI render, so there's no need to manually call [`StateHasChanged`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23state-changes-statehaschanged).
* Exceptions are logged.



> **Important:**
> The Blazor framework doesn't track `void`-returning asynchronous methods (`async`). As a result, the entire process fails when an exception isn't caught if `void` is returned. Always return a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)/[System.Threading.Tasks.ValueTask](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask) from asynchronous methods.

The following code:

* Calls the `UpdateHeading` method when the button is selected in the UI.
* Calls the `CheckChanged` method when the checkbox is changed in the UI.

**Applies to: \>= aspnetcore-9.0**

`EventHandler1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`EventHandler1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`EventHandlerExample1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`EventHandlerExample1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`EventHandlerExample1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

`EventHandlerExample1.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



In the following example, `UpdateHeading`:

* Is called asynchronously when the button is selected.
* Waits two seconds before updating the heading.

**Applies to: \>= aspnetcore-9.0**

`EventHandler2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`EventHandler2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`EventHandlerExample2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`EventHandlerExample2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`EventHandlerExample2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

`EventHandlerExample2.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



## Built-in event arguments

For events that support an event argument type, specifying an event parameter in the event method definition is only necessary if the event type is used in the method. In the following example, [Microsoft.AspNetCore.Components.Web.MouseEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.MouseEventArgs) is used in the `ReportPointerLocation` method to set message text that reports the mouse coordinates when the user selects a button in the UI.

**Applies to: \>= aspnetcore-9.0**

`EventHandler3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`EventHandler3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`EventHandlerExample3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`EventHandlerExample3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`EventHandlerExample3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

`EventHandlerExample3.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



Supported [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs) are shown in the following table.

| Event | Class | DOM notes |
| --- | --- | --- |
| Clipboard | [Microsoft.AspNetCore.Components.Web.ClipboardEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.ClipboardEventArgs) |  |
| Drag | [Microsoft.AspNetCore.Components.Web.DragEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.DragEventArgs) | [Microsoft.AspNetCore.Components.Web.DataTransfer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.DataTransfer) and [Microsoft.AspNetCore.Components.Web.DataTransferItem](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.DataTransferItem) hold dragged item data.<br><br>Implement drag and drop in Blazor apps using [JS interop](../javascript-interoperability/call-javascript-from-dotnet.md) with [HTML Drag and Drop API](https://developer.mozilla.org/docs/Web/API/HTML_Drag_and_Drop_API). |
| Error | [Microsoft.AspNetCore.Components.Web.ErrorEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.ErrorEventArgs) |  |
| Event | [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs) | [Microsoft.AspNetCore.Components.Web.EventHandlers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.EventHandlers) holds attributes to configure the mappings between event names and event argument types. |
| Focus | [Microsoft.AspNetCore.Components.Web.FocusEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.FocusEventArgs) | Doesn't include support for `relatedTarget`. |
| Input | [Microsoft.AspNetCore.Components.ChangeEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ChangeEventArgs) |  |
| Keyboard | [Microsoft.AspNetCore.Components.Web.KeyboardEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.KeyboardEventArgs) |  |
| Mouse | [Microsoft.AspNetCore.Components.Web.MouseEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.MouseEventArgs) |  |
| Mouse pointer | [Microsoft.AspNetCore.Components.Web.PointerEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.PointerEventArgs) |  |
| Mouse wheel | [Microsoft.AspNetCore.Components.Web.WheelEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.WheelEventArgs) |  |
| Progress | [Microsoft.AspNetCore.Components.Web.ProgressEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.ProgressEventArgs) |  |
| Touch | [Microsoft.AspNetCore.Components.Web.TouchEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.TouchEventArgs) | [Microsoft.AspNetCore.Components.Web.TouchPoint](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.TouchPoint) represents a single contact point on a touch-sensitive device. |

For more information, see the following resources:

* [`EventArgs` classes in the ASP.NET Core reference source (dotnet/aspnetcore `main` branch)](https://github.com/dotnet/aspnetcore/tree/main/src/Components/Web/src/Web)

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


* [Microsoft.AspNetCore.Components.Web.EventHandlers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.EventHandlers) holds attributes to configure the mappings between event names and event argument types.

**Applies to: \>= aspnetcore-6.0**

## Custom event arguments

Blazor supports custom event arguments, which enable you to pass arbitrary data to .NET event handlers with custom events.

### General configuration

Custom events with custom event arguments are generally enabled with the following steps.

In JavaScript, define a function for building the custom event argument object from the source event:

```javascript
function eventArgsCreator(event) { 
  return {
    customProperty1: 'any value for property 1',
    customProperty2: event.srcElement.id
  };
}
```

The `event` parameter is a [DOM Event](https://developer.mozilla.org/docs/Web/API/Event).

Register the custom event with the preceding handler in a [JavaScript initializer](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers). Provide the appropriate browser event name to `browserEventName`, which for the example shown in this section is `click` for a button selection in the UI.

`wwwroot/{PACKAGE ID/ASSEMBLY NAME}.lib.module.js` (the `{PACKAGE ID/ASSEMBLY NAME}` placeholder is the package ID or assembly name of the app):



**Applies to: \>= aspnetcore-8.0**

For a Blazor Web App:

```javascript
export function afterWebStarted(blazor) {
  blazor.registerCustomEventType('customevent', {
    browserEventName: 'click',
    createEventArgs: eventArgsCreator
  });
}
```

For a Blazor Server or Blazor WebAssembly app:



**Applies to: \>= aspnetcore-6.0**

```javascript
export function afterStarted(blazor) {
  blazor.registerCustomEventType('customevent', {
    browserEventName: 'click',
    createEventArgs: eventArgsCreator
  });
}
```

The call to `registerCustomEventType` is performed in a script only once per event.

For the call to `registerCustomEventType`, use the `blazor` parameter (lowercase `b`) provided by the Blazor start event. Although the registration is valid when using the `Blazor` object (uppercase `B`), the preferred approach is to use the parameter.

The custom event name, `customevent` in the preceding example, must not match a reserved Blazor event name. The reserved names can be found in the [Blazor framework reference source (see the calls to the `registerBuiltInEventType` function)](https://github.com/dotnet/aspnetcore/blob/main/src/Components/Web.JS/src/Rendering/Events/EventTypes.ts).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


Define a class for the event arguments:

```csharp
namespace BlazorSample.CustomEvents;

public class CustomEventArgs : EventArgs
{
    public string? CustomProperty1 {get; set;}
    public string? CustomProperty2 {get; set;}
}
```

Wire up the custom event with the event arguments by adding an [`[EventHandler]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventHandlerAttribute) annotation for the custom event:

* In order for the compiler to find the `[EventHandler]` class, it must be placed into a C# class file (`.cs`), making it a normal top-level class.
* Mark the class `public`.
* The class doesn't require members.
* The class *must* be called "`EventHandlers`" in order to be found by the Razor compiler.
* Place the class under a namespace specific to your app.
* Import the namespace into the Razor component (`.razor`) where the event is used.

```csharp
using Microsoft.AspNetCore.Components;

namespace BlazorSample.CustomEvents;

[EventHandler("oncustomevent", typeof(CustomEventArgs),
    enableStopPropagation: true, enablePreventDefault: true)]
public static class EventHandlers
{
}
```

Register the event handler on one or more HTML elements. Access the data that was passed in from JavaScript in the delegate handler method:

```razor
@using BlazorSample.CustomEvents

<button id="buttonId" @oncustomevent="HandleCustomEvent">Handle</button>

@if (!string.IsNullOrEmpty(propVal1) && !string.IsNullOrEmpty(propVal2))
{
    <ul>
        <li>propVal1: @propVal1</li>
        <li>propVal2: @propVal2</li>
    </ul>
}

@code
{
    private string? propVal1;
    private string? propVal2;

    private void HandleCustomEvent(CustomEventArgs eventArgs)
    {
        propVal1 = eventArgs.CustomProperty1;
        propVal2 = eventArgs.CustomProperty2;
    }
}
```

If the `@oncustomevent` attribute isn't recognized by [IntelliSense](https://learn.microsoft.com/visualstudio/ide/using-intellisense), make sure that the component or the imports file (`_Imports.razor`) contains an `@using` statement for the namespace containing the `EventHandler` class.

Whenever the custom event is fired on the DOM, the event handler is called with the data passed from the JavaScript.

If you're attempting to fire a custom event, [`bubbles`](https://developer.mozilla.org/docs/Web/API/Event/bubbles) must be enabled by setting its value to `true`. Otherwise, the event doesn't reach the Blazor handler for processing into the C# custom [`[EventHandler]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventHandlerAttribute) class. For more information, see [MDN Web Docs: Event bubbling](https://developer.mozilla.org/docs/Web/Guide/Events/Creating_and_triggering_events#event_bubbling).

### Custom clipboard paste event example

The following example receives a custom clipboard paste event that includes the time of the paste and the user's pasted text.

Declare a custom name (`oncustompaste`) for the event and a .NET class (`CustomPasteEventArgs`) to hold the event arguments for this event:

`CustomEvents.cs`:

```csharp
using Microsoft.AspNetCore.Components;

namespace BlazorSample.CustomEvents;

[EventHandler("oncustompaste", typeof(CustomPasteEventArgs), 
    enableStopPropagation: true, enablePreventDefault: true)]
public static class EventHandlers
{
}

public class CustomPasteEventArgs : EventArgs
{
    public DateTime EventTimestamp { get; set; }
    public string? PastedData { get; set; }
}
```

Add JavaScript code to supply data for the [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs) subclass with the preceding handler in a [JavaScript initializer](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers). The following example only handles pasting text, but you could use arbitrary JavaScript APIs to deal with users pasting other types of data, such as images.

`wwwroot/{PACKAGE ID/ASSEMBLY NAME}.lib.module.js`:



**Applies to: \>= aspnetcore-8.0**

For a Blazor Web App:

```javascript
export function afterWebStarted(blazor) {
  blazor.registerCustomEventType('custompaste', {
    browserEventName: 'paste',
    createEventArgs: event => {
      return {
        eventTimestamp: new Date(),
        pastedData: event.clipboardData.getData('text')
      };
    }
  });
}
```

For a Blazor Server or Blazor WebAssembly app:



**Applies to: \>= aspnetcore-6.0**

```javascript
export function afterStarted(blazor) {
  blazor.registerCustomEventType('custompaste', {
    browserEventName: 'paste',
    createEventArgs: event => {
      return {
        eventTimestamp: new Date(),
        pastedData: event.clipboardData.getData('text')
      };
    }
  });
}
```

In the preceding example, the `{PACKAGE ID/ASSEMBLY NAME}` placeholder of the file name represents the package ID or assembly name of the app.

> **Note:**
> For the call to `registerCustomEventType`, use the `blazor` parameter (lowercase `b`) provided by the Blazor start event. Although the registration is valid when using the `Blazor` object (uppercase `B`), the preferred approach is to use the parameter.

The preceding code tells the browser that when a native [`paste`](https://developer.mozilla.org/docs/Web/API/Element/paste_event) event occurs:

* Raise a `custompaste` event.
* Supply the event arguments data using the custom logic stated:
  * For the `eventTimestamp`, create a new date.
  * For the `pastedData`, get the clipboard data as text. For more information, see [MDN Web Docs: ClipboardEvent.clipboardData](https://developer.mozilla.org/docs/Web/API/ClipboardEvent/clipboardData).

Event name conventions differ between .NET and JavaScript:

* In .NET, event names are prefixed with "`on`".
* In JavaScript, event names don't have a prefix.

In a Razor component, attach the custom handler to an element.

`CustomPasteArguments.razor`:

```razor
@page "/custom-paste-arguments"
@using BlazorSample.CustomEvents

<label>
    Try pasting into the following text box:
    <input @oncustompaste="HandleCustomPaste" />
</label>

<p>
    @message
</p>

@code {
    private string? message;

    private void HandleCustomPaste(CustomPasteEventArgs eventArgs)
    {
        message = $"At {eventArgs.EventTimestamp.ToShortTimeString()}, " +
            $"you pasted: {eventArgs.PastedData}";
    }
}
```



## Lambda expressions

[Lambda expressions](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions) are supported as the delegate event handler.

**Applies to: \>= aspnetcore-9.0**

`EventHandler4.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`EventHandler4.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`EventHandlerExample4.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`EventHandlerExample4.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`EventHandlerExample4.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

`EventHandlerExample4.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample4.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



It's often convenient to close over additional values using C# method parameters, such as when iterating over a set of elements. The following example creates three buttons, each of which calls `UpdateHeading` and passes the following data:

* An event argument ([Microsoft.AspNetCore.Components.Web.MouseEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.MouseEventArgs)) in `e`.
* The button number in `buttonNumber`.

**Applies to: \>= aspnetcore-9.0**

`EventHandler5.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`EventHandler5.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`EventHandlerExample5.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`EventHandlerExample5.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`EventHandlerExample5.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

`EventHandlerExample5.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample5.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



Creating a large number of event delegates in a loop may cause poor rendering performance. For more information, see [blazor/performance/rendering#avoid-recreating-delegates-for-many-repeated-elements-or-components](https://learn.microsoft.com/search/?terms=blazor%2Fperformance%2Frendering%23avoid-recreating-delegates-for-many-repeated-elements-or-components).

Avoid using a loop variable directly in a lambda expression, such as `i` in the preceding `for` loop example. Otherwise, the same variable is used by all lambda expressions, which results in use of the same value in all lambdas. Capture the variable's value in a local variable. In the preceding example:

* The loop variable `i` is assigned to `buttonNumber`.
* `buttonNumber` is used in the lambda expression.

Alternatively, use a `foreach` loop with [System.Linq.Enumerable.Range%2A](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Range%252A), which doesn't suffer from the preceding problem:

```razor
@foreach (var buttonNumber in Enumerable.Range(1, 3))
{
    <p>
        <button @onclick="@(e => UpdateHeading(e, buttonNumber))">
            Button #@buttonNumber
        </button>
    </p>
}
```

## EventCallback

A common scenario with nested components is executing a method in a parent component when a child component event occurs. An `onclick` event occurring in the child component is a common use case. To expose events across components, use an [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback). A parent component can assign a callback method to a child component's [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback).

The following `Child` component demonstrates how a button's `onclick` handler is set up to receive an [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback) delegate from the sample's `ParentComponent`. The [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback) is typed with [Microsoft.AspNetCore.Components.Web.MouseEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.MouseEventArgs), which is appropriate for an `onclick` event from a peripheral device.

`Child.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Child.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Child.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Shared/event-handling/Child.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Shared/event-handling/Child.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Shared/event-handling/Child.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Shared/event-handling/Child.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



The parent component sets the child's [Microsoft.AspNetCore.Components.EventCallback%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback%25601) (`OnClickCallback`) to its `ShowMessage` method.

**Applies to: \>= aspnetcore-9.0**

`ParentChild.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ParentChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`ParentChild.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/ParentChild.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`Parent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/Parent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`Parent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/Parent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`Parent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/event-handling/Parent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

`Parent.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/event-handling/Parent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



When the button is selected in the `ChildComponent`:

* The `Parent` component's `ShowMessage` method is called. `message` is updated and displayed in the `Parent` component.
* A call to [`StateHasChanged`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23state-changes-statehaschanged) isn't required in the callback's method (`ShowMessage`). [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) is called automatically to rerender the `Parent` component, just as child events trigger component rerendering in event handlers that execute within the child. For more information, see [blazor/components/rendering#statehaschanged](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23statehaschanged).

Use [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback) and [Microsoft.AspNetCore.Components.EventCallback%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback%25601) for event handling and binding component parameters.

Prefer the strongly typed [Microsoft.AspNetCore.Components.EventCallback%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback%25601) over [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback). [Microsoft.AspNetCore.Components.EventCallback%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback%25601) provides enhanced error feedback when an inappropriate type is used, guiding users of the component towards correct implementation. Similar to other UI event handlers, specifying the event parameter is optional. Use [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback) when there's no value passed to the callback.

[Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback) and [Microsoft.AspNetCore.Components.EventCallback%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback%25601) permit asynchronous delegates. [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback) is weakly typed and allows passing any type argument in `InvokeAsync(Object)`. [Microsoft.AspNetCore.Components.EventCallback%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback%25601) is strongly typed and requires passing a `T` argument in `InvokeAsync(T)` that's assignable to `TValue`.

Invoke an [Microsoft.AspNetCore.Components.EventCallback](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback) or [Microsoft.AspNetCore.Components.EventCallback%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback%25601) with [Microsoft.AspNetCore.Components.EventCallback.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.EventCallback.InvokeAsync%252A) and await the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task):

```csharp
await OnClickCallback.InvokeAsync({ARGUMENT});
```

In the preceding example, the `{ARGUMENT}` placeholder is an optional argument.

The following parent-child example demonstrates the technique.

`Child2.razor`:

```razor
<h3>Child2 Component</h3>

<button @onclick="TriggerEvent">Click Me</button>

@code {
    [Parameter]
    public EventCallback<string> OnClickCallback { get; set; }

    private async Task TriggerEvent()
    {
        await OnClickCallback.InvokeAsync("Blaze It!");
    }
}
```

`ParentChild2.razor`:

```razor
@page "/parent-child-2"

<PageTitle>Parent Child 2</PageTitle>

<h1>Parent Child 2 Example</h1>

<div>
    <Child2 OnClickCallback="(value) => { message1 = value; }" />
    @message1
</div>

<div>
    <Child2 OnClickCallback=
        "async (value) => { await Task.Delay(2000); message2 = value; }" /> 
    @message2
</div>

@code {
    private string message1 = string.Empty;
    private string message2 = string.Empty;
}
```

The second occurrence of the `Child2` component demonstrates an asynchronous callback, and the new `message2` value is assigned and rendered with a delay of two seconds.

## Prevent default actions

Use the [`@on{DOM EVENT}:preventDefault`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23oneventpreventdefault) directive attribute to prevent the default action for an event, where the `{DOM EVENT}` placeholder is a [DOM event](https://developer.mozilla.org/docs/Web/Events).

When a key is selected on an input device and the element focus is on a text box, a browser normally displays the key's character in the text box. In the following example, the default behavior is prevented by specifying the `@onkeydown:preventDefault` directive attribute. When the focus is on the `<input>` element, the counter increments with the key sequence <kbd>Shift</kbd>+<kbd>+</kbd>. The `+` character isn't assigned to the `<input>` element's value. For more information on `keydown`, see [`MDN Web Docs: Document: keydown` event](https://developer.mozilla.org/docs/Web/API/Document/keydown_event).

**Applies to: \>= aspnetcore-9.0**

`EventHandler6.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler6.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`EventHandler6.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler6.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`EventHandlerExample6.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample6.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`EventHandlerExample6.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample6.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`EventHandlerExample6.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample6.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

`EventHandlerExample6.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample6.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



Specifying the `@on{DOM EVENT}:preventDefault` attribute without a value is equivalent to `@on{DOM EVENT}:preventDefault="true"`.

An expression is also a permitted value of the attribute. In the following example, `shouldPreventDefault` is a `bool` field set to either `true` or `false`:

```razor
<input @onkeydown:preventDefault="shouldPreventDefault" />

...

@code {
    private bool shouldPreventDefault = true;
}
```

## Stop event propagation

Use the [`@on{DOM EVENT}:stopPropagation`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23oneventstoppropagation) directive attribute to stop event propagation within the Blazor scope. `{DOM EVENT}` is a placeholder for a [DOM event](https://developer.mozilla.org/docs/Web/Events).

The `stopPropagation` directive attribute's effect is limited to the Blazor scope and doesn't extend to the HTML DOM. Events must propagate to the HTML DOM root before Blazor can act upon them. For a mechanism to prevent HTML DOM event propagation, consider the following approach:

* Obtain the event's path by calling [`Event.composedPath()`](https://developer.mozilla.org/docs/Web/API/Event/composedPath).
* Filter events based on the composed [event targets (`EventTarget`)](https://developer.mozilla.org/docs/Web/API/EventTarget). 

In the following example, selecting the checkbox prevents click events from the second child `<div>` from propagating to the parent `<div>`. Since propagated click events normally fire the `OnSelectParentDiv` method, selecting the second child `<div>` results in the parent `<div>` message appearing unless the checkbox is selected.

**Applies to: \>= aspnetcore-9.0**

`EventHandler7.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler7.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`EventHandler7.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler7.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`EventHandlerExample7.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample7.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`EventHandlerExample7.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample7.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`EventHandlerExample7.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample7.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: < aspnetcore-5.0**

`EventHandlerExample7.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample7.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0**

## Focus an element

Call [Microsoft.AspNetCore.Components.ElementReferenceExtensions.FocusAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ElementReferenceExtensions.FocusAsync%252A) on an [element reference](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23capture-references-to-elements) to focus an element in code. In the following example, select the button to focus the `<input>` element.



**Applies to: \>= aspnetcore-9.0**

`EventHandler8.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler8.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`EventHandler8.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler8.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`EventHandlerExample8.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample8.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`EventHandlerExample8.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/event-handling/EventHandlerExample8.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/event-handling.md)
