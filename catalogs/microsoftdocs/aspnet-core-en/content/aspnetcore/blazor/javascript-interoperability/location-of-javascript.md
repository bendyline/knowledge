---
title: JavaScript location in ASP.NET Core Blazor apps
author: guardrex
description: Learn where to place and how to load JavaScript in Blazor apps.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/js-interop/javascript-location
---
# JavaScript location in ASP.NET Core Blazor apps

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


Load JavaScript (JS) code using any of the following approaches:

**Applies to: \>= aspnetcore-6.0**

* [Load a script in `<head>` markup](#load-a-script-in-head-markup) (*Not generally recommended*)
* [Load a script in `<body>` markup](#load-a-script-in-body-markup)
* [Load a script from an external JavaScript file (`.js`) collocated with a component](#load-a-script-from-an-external-javascript-file-js-collocated-with-a-component)
* [Load a script from an external JavaScript file (`.js`)](#load-a-script-from-an-external-javascript-file-js)
* [Inject a script before or after Blazor starts](#inject-a-script-before-or-after-blazor-starts)



**Applies to: < aspnetcore-6.0**

* [Load a script in `<head>` markup](#load-a-script-in-head-markup) (*Not generally recommended*)
* [Load a script in `<body>` markup](#load-a-script-in-body-markup)
* [Load a script from an external JavaScript file (`.js`)](#load-a-script-from-an-external-javascript-file-js)
* [Inject a script after Blazor starts](#inject-a-script-after-blazor-starts)



Inline JavaScript isn't recommended for Blazor apps. We recommend using [JS collocation](#load-a-script-from-an-external-javascript-file-js-collocated-with-a-component) combined with [JS modules](#javascript-isolation-in-javascript-modules).

## Location of `<script>` tags

**Applies to: \>= aspnetcore-8.0**

Only place a `<script>` tag in a component file (`.razor`) if the component is guaranteed to adopt [static server-side rendering (static SSR)](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23client-and-server-rendering-concepts) without [enhanced navigation](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling). Placing a `<script>` tag in a component file doesn't produce a compile-time warning or error, but script loading behavior might not match your expectations in components that adopt an interactive render mode or static SSR with enhanced navigation.



**Applies to: < aspnetcore-8.0**

Don't place a `<script>` tag in a component file (`.razor`) because the `<script>` tag can't be updated dynamically. Placing a `<script>` tag in a component file produces a compile-time error.



**Applies to: \>= aspnetcore-5.0**

> **Note:**
> Documentation examples usually place scripts in a `<script>` tag or load global scripts from external files. These approaches pollute the client with global functions. For production apps, we recommend placing JS into separate [JS modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) that can be imported when needed. For more information, see the [JavaScript isolation in JavaScript modules](#javascript-isolation-in-javascript-modules) section.



**Applies to: < aspnetcore-5.0**

> **Note:**
> Documentation examples place scripts into a `<script>` tag or load global scripts from external files. These approaches pollute the client with global functions. Placing JS into separate [JS modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) that can be imported when needed is **not** supported in Blazor earlier than .NET 5. If the app requires the use of JS modules for JS isolation, we recommend using .NET 5 or later to build the app. For more information, use the **Version** dropdown list to select a .NET 5 or later version of this article and see the *JavaScript isolation in JavaScript modules* section.



## Load a script in `<head>` markup

*The approach in this section isn't generally recommended.*

Place the JavaScript (JS) tags (`<script>...</script>`) in the [`<head>` element markup](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-head-and-body-content):

```html
<head>
    ...

    <script>
      window.jsMethod = (methodParameter) => {
        ...
      };
    </script>
</head>
```

Loading JS from the `<head>` isn't the best approach for the following reasons:

* JS interop may fail if the script depends on Blazor. We recommend loading scripts using one of the other approaches, not via the `<head>` markup.
* The page may become interactive slower due to the time it takes to parse the JS in the script.

**Applies to: \>= aspnetcore-8.0**

In component markup, scripts can be loaded via a [`HeadContent` component](../components/control-head-content.md) with the usual caveat that the approach slows down page load on the client, which we recommend avoiding. When a script is loaded with a `HeadContent` component in a Blazor Server app, Blazor WebAssembly app, or a Blazor Web App using either an interactive render mode (interactive SSR, CSR) or static SSR with enhanced navigation, navigating away from the component's page removes the `<script>` tag from the rendered `<head>` content but doesn't unload the script's JavaScript code, including event handlers that the script registers, exposed variables, and methods that the script provides. Only Blazor Web Apps using static SSR without enhanced navigation unload JavaScript code when the user navigates away from the page. Generally, you're better off adding `<script>` tags to the physical `<head>` content, unless you explicitly desire to keep such script references in the components that use them and don't mind that the code isn't unloaded on navigation events.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

In component markup, scripts can be loaded via a [`HeadContent` component](../components/control-head-content.md) with the usual caveat that the approach slows down page load on the client, which we recommend avoiding. When a script is loaded with a `HeadContent` component, navigating away from the component's page removes the `<script>` tag from the rendered `<head>` content but doesn't unload the script's JavaScript code, including event handlers that the script registers, exposed variables, and methods that the script provides. Generally, you're better off adding `<script>` tags to the physical `<head>` content, unless you explicitly desire to keep such script references in the components that use them and don't mind that the code isn't unloaded on navigation events.



## Load a script in `<body>` markup

Place the JavaScript tags (`<script>...</script>`) inside the [closing `</body>` element](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-head-and-body-content) after the Blazor script reference:

```html
<body>
    ...

    <script src="{BLAZOR SCRIPT}"></script>
    <script>
      window.jsMethod = (methodParameter) => {
        ...
      };
    </script>
</body>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).

**Applies to: \>= aspnetcore-6.0**

## Load a script from an external JavaScript file (`.js`) collocated with a component

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

This section and the following examples are primarily focused on explaining JS file collocation. The first example demonstrates a collocated JS file with an ordinary JS function. The second example demonstrates the use of a module to load a function, which is the recommended approach for most production apps. Calling JS from .NET is fully covered in [blazor/js-interop/call-javascript-from-dotnet](call-javascript-from-dotnet.md), where there are further explanations of the Blazor JS API with additional examples. Component disposal, which is present in the second example, is covered in [blazor/components/component-disposal](../components/component-disposal.md).

The following `JsCollocation1` component loads a script via a [`HeadContent` component](../components/control-head-content.md) and calls a JS function with [Microsoft.JSInterop.IJSRuntime.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime.InvokeAsync%252A). The `{PATH}` placeholder is the path to the component.

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

Use of scripts and modules for collocated JS in a Razor class library (RCL) is only supported for Blazor's JS interop mechanism based on the [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) interface. If you're implementing [JavaScript `[JSImport]`/`[JSExport]` interop](import-export-interop.md), see [blazor/js-interop/import-export-interop#razor-class-library-rcl-collocated-js-is-unsupported](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fimport-export-interop%23razor-class-library-rcl-collocated-js-is-unsupported).

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


For more information on RCLs, see [blazor/components/class-libraries](../components/class-libraries.md).



### Load a script from an external JavaScript file (`.js`)

Place the JavaScript (JS) tags (`<script>...</script>`) with a script source (`src`) path inside the [closing `</body>` element](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-head-and-body-content) after the Blazor script reference:

```html
<body>
    ...

    <script src="{BLAZOR SCRIPT}"></script>
    <script src="{SCRIPT PATH AND FILE NAME (.js)}"></script>
</body>
```

For the placeholders in the preceding example:

* The `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name. For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).
* The `{SCRIPT PATH AND FILE NAME (.js)}` placeholder is the path and script file name under `wwwroot`.

In the following example of the preceding `<script>` tag, the `scripts.js` file is in the `wwwroot/js` folder of the app:

```html
<script src="js/scripts.js"></script>
```

You can also serve scripts directly from the `wwwroot` folder if you prefer not to keep all of your scripts in a separate folder under `wwwroot`:

```html
<script src="scripts.js"></script>
```

When the external JS file is supplied by a [Razor class library](../components/class-libraries.md), specify the JS file using its stable static web asset path: `_content/{PACKAGE ID}/{SCRIPT PATH AND FILE NAME (.js)}`:

* The `{PACKAGE ID}` placeholder is the library's [package ID](https://learn.microsoft.com/nuget/create-packages/creating-a-package-msbuild#set-properties). The package ID defaults to the project's assembly name if `<PackageId>` isn't specified in the project file.
* The `{SCRIPT PATH AND FILE NAME (.js)}` placeholder is the path and file name under `wwwroot`.

```html
<body>
    ...

    <script src="{BLAZOR SCRIPT}"></script>
    <script src="_content/{PACKAGE ID}/{SCRIPT PATH AND FILE NAME (.js)}"></script>
</body>
```

In the following example of the preceding `<script>` tag:

* The Razor class library has an assembly name of `ComponentLibrary`, and a `<PackageId>` isn't specified in the library's project file.
* The `scripts.js` file is in the class library's `wwwroot` folder.

```html
<script src="_content/ComponentLibrary/scripts.js"></script>
```

For more information, see [blazor/components/class-libraries](../components/class-libraries.md).

**Applies to: \>= aspnetcore-6.0**

## Inject a script before or after Blazor starts

To ensure scripts load before or after Blazor starts, use a JavaScript initializer. For more information and examples, see [blazor/fundamentals/startup#javascript-initializers](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers).



**Applies to: < aspnetcore-6.0**

## Inject a script after Blazor starts

To inject a script after Blazor starts, chain to the `Promise` that results from a manual start of Blazor. For more information and an example, see [blazor/fundamentals/startup#inject-a-script-after-blazor-starts](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23inject-a-script-after-blazor-starts).



## JavaScript isolation in JavaScript modules

Blazor enables JavaScript (JS) isolation in standard [JS modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) ([ECMAScript specification](https://tc39.es/ecma262/#sec-modules)).

JS isolation provides the following benefits:

* Imported JS no longer pollutes the global namespace.
* Consumers of a library and components aren't required to import the related JS.

In server-side scenarios, always trap [Microsoft.JSInterop.JSDisconnectedException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSDisconnectedException) in case loss of Blazor's SignalR circuit prevents a JS interop call from disposing a module, which results in an unhandled exception. Blazor WebAssembly apps don't use a SignalR connection during JS interop, so there's no need to trap [Microsoft.JSInterop.JSDisconnectedException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSDisconnectedException) in Blazor WebAssembly apps for module disposal.

For more information, see the following resources:

* [JavaScript isolation in JavaScript modules](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23javascript-isolation-in-javascript-modules)
* [JavaScript interop calls without a circuit](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23javascript-interop-calls-without-a-circuit)
