---
title: Use Razor components in JavaScript apps and SPA frameworks
author: guardrex
description: Learn how to create and use Razor components in JavaScript apps and SPA frameworks.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/components/js-spa-frameworks
---
# Use Razor components in JavaScript apps and SPA frameworks

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


This article covers how to render Razor components from JavaScript, use Blazor custom elements, and generate Angular and React components.

> **Note:**
> We recommend using the `blazor.server.js` (Blazor Server) and `blazor.webassembly.js` (Blazor WebAssembly) scripts when integrating Razor components into an existing JavaScript app until better support for the `blazor.web.js` (Blazor Web App) script is added in the future. For more information, see [RegisterCustomElement stopped working in Blazor 8 (`dotnet/aspnetcore` #53920)](https://github.com/dotnet/aspnetcore/issues/53920#issuecomment-2261507850).

<!-- UPDATE 11.0 - The `blazor.web.js` (Blazor Web App) portions of
     this article have been commented out for the time being to 
     facilitate reconstituting the guidance later when support lands. 
     The PU work is tracked by https://github.com/dotnet/aspnetcore/issues/53920. -->

## Angular sample apps

The following sample apps demonstrate rendering a Razor component as a [Blazor custom element](#blazor-custom-elements) in an Angular app:

* [CustomElementsBlazorSample (Blazor Server) (`javiercn/CustomElementsBlazorSample` GitHub repository, branch: `blazor-server`)](https://github.com/javiercn/CustomElementsBlazorSample/tree/blazor-server)
* [CustomElementsBlazorSample (Blazor WebAssembly) (`javiercn/CustomElementsBlazorSample` GitHub repository, branch: `blazor-wasm`)](https://github.com/javiercn/CustomElementsBlazorSample/tree/blazor-wasm)

To migrate either of these .NET 7 samples, see the following resources:

* [migration/70-to-80](../../migration/70-to-80.md)
* [migration/80-to-90](../../migration/80-to-90.md)
* [migration/90-to-100](../../migration/90-to-100.md)

The principal updates to make are:

* Update the [target framework monikers (TFMs)](https://learn.microsoft.com/dotnet/standard/frameworks) to the latest version.
* Update the .NET package references and Angular dependencies to their latest versions.

  > **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


## Render Razor components from JavaScript

Razor components can be dynamically-rendered from JavaScript (JS) for existing JS apps.

The example in this section renders the following Razor component into a page via JS.

`Quote.razor`:

```razor
<div class="m-5 p-5">
    <h2>Quote</h2>
    <p>@Text</p>
</div>

@code {
    [Parameter]
    public string? Text { get; set; }
}
```

In the `Program` file, add the [namespace for the location of the component](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23component-name-class-name-and-namespace).

Call [Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript%252A) on the app's root component collection to register a Razor component as a root component for JS rendering.

[Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript%252A) includes an overload that accepts the name of a JS function that executes initialization logic (`javaScriptInitializer`). The JS function is called once per component registration immediately after the Blazor app starts and before any components are rendered. This function can be used for integration with JS technologies, such as HTML custom elements or a JS-based SPA framework.

One or more initializer functions can be created and called by different component registrations. The typical use case is to reuse the same initializer function for multiple components, which is expected if the initializer function is configuring integration with custom elements or another JS-based SPA framework.

> **Important:**
> Don't confuse the `javaScriptInitializer` parameter of [Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript%252A) with [JavaScript initializers](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers). The name of the parameter and the JS initializers feature is coincidental.

The following example demonstrates the dynamic registration of the preceding `Quote` component with "`quote`" as the identifier.

<!-- HOLD

:::moniker range=">= aspnetcore-8.0"

* In a Blazor Web App, modify the call to <xref:Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%2A> in the server-side `Program` file:

  ```csharp
  builder.Services.AddRazorComponents()
      .AddInteractiveServerComponents(options =>
      {
          options.RootComponents.RegisterForJavaScript<Quote>(identifier: "quote",
            javaScriptInitializer: "initializeComponent");
      });
  ```

:::moniker-end

-->

* In a Blazor Server app, modify the call to [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A) in the `Program` file:

  ```csharp
  builder.Services.AddServerSideBlazor(options =>
  {
      options.RootComponents.RegisterForJavaScript<Quote>(identifier: "quote", 
          javaScriptInitializer: "initializeComponent");
  });
  ```

* In a Blazor WebAssembly app, call [Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript%252A) on [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents) in the client-side `Program` file:

  ```csharp
  builder.RootComponents.RegisterForJavaScript<Quote>(identifier: "quote", 
      javaScriptInitializer: "initializeComponent");
  ```

Attach the initializer function with `name` and `parameters` function parameters to the `window` object. For demonstration purposes, the following `initializeComponent` function logs the name and parameters of the registered component.

`wwwroot/jsComponentInitializers.js`:

```javascript
window.initializeComponent = (name, parameters) => {
  console.log({ name: name, parameters: parameters });
}
```

Render the component from JS into a container element using the registered identifier, passing component parameters as needed. 

In the following example:

* The `Quote` component (`quote` identifier) is rendered into the `quoteContainer` element when the `showQuote` function is called.
* A quote string is passed to the component's `Text` parameter.

`wwwroot/scripts.js`:

```javascript
window.showQuote = async () => {
  let targetElement = document.getElementById('quoteContainer');
  await Blazor.rootComponents.add(targetElement, 'quote', 
  {
    text: "Crow: I have my doubts that this movie is actually 'starring' " +
      "anybody. More like, 'camera is generally pointed at.'"
  });
}

const btn = document.querySelector("#showQuoteBtn");
btn.addEventListener("click", showQuote);
```

After the [Blazor script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script) is loaded, load the preceding scripts into the JS app:

```html
<script src="_framework/{BLAZOR SCRIPT}"></script>
<script src="jsComponentInitializers.js"></script>
<script src="scripts.js"></script>
```

In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script.

In HTML, place the target container element (`quoteContainer`). For the demonstration in this section, a button triggers rendering the `Quote` component by calling the `showQuote` JS function:

```html
<button id="showQuoteBtn">Show Quote</button>

<div id="quoteContainer"></div>
```

On initialization before any components are rendered, the browser's developer tools console logs the `Quote` component's identifier (`name`) and parameters (`parameters`) when `initializeComponent` is called:

```console
Object { name: "quote", parameters: (1) […] }
  name: "quote"
  parameters: Array [ {…} ]
    0: Object { name: "Text", type: "string" }
    length: 1
```

When the **Show Quote** button is selected, the `Quote` component is rendered with the quote stored in `Text` displayed:

Quote rendered in the browser

Quote &copy;1988-1999 Satellite of Love LLC: [*Mystery Science Theater 3000*](https://mst3k.com/) ([Trace Beaulieu (Crow)](https://www.imdb.com/name/nm0064546/))

> **Note:**
> `rootComponents.add` returns an instance of the component. Call `dispose` on the instance to release it:
>
> ```javascript
> const rootComponent = await window.Blazor.rootComponents.add(...);
>
> ...
>
> rootComponent.dispose();
> ```

The preceding example dynamically renders the root component when the `showQuote()` JS function is called. To render a root component into a container element when Blazor starts, use a [JavaScript initializer](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers) to render the component, as the following example demonstrates.

The following example builds on the preceding example, using the `Quote` component, the root component registration in the `Program` file, and the initialization of `jsComponentInitializers.js`. The `showQuote()` function (and the `script.js` file) aren't used.

In HTML, place the target container element, `quoteContainer2` for this example:

```html
<div id="quoteContainer2"></div>
```

Using a [JavaScript initializer](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers), add the root component to the target container element.

`wwwroot/{PACKAGE ID/ASSEMBLY NAME}.lib.module.js`:

<!-- HOLD

:::moniker range=">= aspnetcore-8.0"

For a Blazor Web App:

```javascript
export function afterWebStarted(blazor) {
  let targetElement = document.getElementById('quoteContainer2');
  blazor.rootComponents.add(targetElement, 'quote',
    {
      text: "Crow: I have my doubts that this movie is actually 'starring' " +
          "anybody. More like, 'camera is generally pointed at.'"
    });
}
```

For a Blazor Server or Blazor WebAssembly app:

:::moniker-end

-->

```javascript
export function afterStarted(blazor) {
  let targetElement = document.getElementById('quoteContainer2');
  blazor.rootComponents.add(targetElement, 'quote',
    {
      text: "Crow: I have my doubts that this movie is actually 'starring' " +
          "anybody. More like, 'camera is generally pointed at.'"
    });
}
```

> **Note:**
> For the call to `rootComponents.add`, use the `blazor` parameter (lowercase `b`) provided by the Blazor start event. Although the registration is valid when using the `Blazor` object (uppercase `B`), the preferred approach is to use the parameter.

For an advanced example with additional features, see the example in the `BasicTestApp` of the ASP.NET Core reference source (`dotnet/aspnetcore` GitHub repository):

* [`JavaScriptRootComponents.razor`](https://github.com/dotnet/aspnetcore/blob/main/src/Components/test/testassets/BasicTestApp/JavaScriptRootComponents.razor)
* [`wwwroot/js/jsRootComponentInitializers.js`](https://github.com/dotnet/aspnetcore/blob/main/src/Components/test/testassets/BasicTestApp/wwwroot/js/jsRootComponentInitializers.js)
* [`wwwroot/index.html`](https://github.com/dotnet/aspnetcore/blob/main/src/Components/test/testassets/BasicTestApp/wwwroot/index.html)

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


## Blazor custom elements

**Applies to: \>= aspnetcore-7.0**

Use Blazor custom elements to dynamically render Razor components from different JavaScript technologies, such as [Angular](https://angular.dev/), [React](https://react.dev/), and [Vue](https://vuejs.org/).

Blazor custom elements:

* Use standard HTML interfaces to implement custom HTML elements.
* Eliminate the need to manually manage the state and lifecycle of root Razor components using JavaScript APIs.
* Are useful for gradually introducing Razor components into existing projects written in other technologies.

Custom elements don't support [child content](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23child-content-render-fragments) or [templated components](templated-components.md).

### Element name

Per the [HTML specification](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-core-concepts), custom element tag names must adopt kebab case:

<span aria-hidden="true">❌</span><span class="visually-hidden">Invalid:</span> `mycounter`  
<span aria-hidden="true">❌</span><span class="visually-hidden">Invalid:</span> `MY-COUNTER`  
<span aria-hidden="true">❌</span><span class="visually-hidden">Invalid:</span> `MyCounter`  
<span aria-hidden="true">✔️</span><span class="visually-hidden">Valid:</span> `my-counter`  
<span aria-hidden="true">✔️</span><span class="visually-hidden">Valid:</span> `my-cool-counter`

### Package

Add a package reference for [`Microsoft.AspNetCore.Components.CustomElements`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.CustomElements) to the app's project file.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


### Example component

The following examples are based on the `Counter` component from the Blazor project template.

`Counter.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Counter.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/js-spa-frameworks.md)



<!-- HOLD

:::moniker range=">= aspnetcore-8.0"

### Blazor Web App registration

Take the following steps to register a root component as a custom element in a Blazor Web App.

Add the <xref:Microsoft.AspNetCore.Components.Web?displayProperty=fullName> namespace to the top of the server-side `Program` file:

```csharp
using Microsoft.AspNetCore.Components.Web;
```

Add a namespace for the app's components. In the following example, the app's namespace is `BlazorSample` and the components are located in the `Components/Pages` folder:

```csharp
using BlazorSample.Components.Pages;
```

Modify the call to <xref:Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%2A> to specify the custom element with <xref:Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%2A> on the <xref:Microsoft.AspNetCore.Components.Server.CircuitOptions.RootComponents> circuit option. The following example registers the `Counter` component with the custom HTML element `my-counter`:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents(options =>
    {
        options.RootComponents.RegisterCustomElement<Counter>("my-counter");
    });
```

:::moniker-end

-->

**Applies to: \>= aspnetcore-7.0**

### Blazor Server registration

Take the following steps to register a root component as a custom element in a Blazor Server app.

Add the [Microsoft.AspNetCore.Components.Web](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web) namespace to the top of the `Program` file:

```csharp
using Microsoft.AspNetCore.Components.Web;
```

Add a namespace for the app's components. In the following example, the app's namespace is `BlazorSample` and the components are located in the `Pages` folder:

```csharp
using BlazorSample.Pages;
```

Modify the call to [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A). Specify the custom element with [Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%252A) on the [Microsoft.AspNetCore.Components.Server.CircuitOptions.RootComponents](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.CircuitOptions.RootComponents) circuit option. The following example registers the `Counter` component with the custom HTML element `my-counter`:

```csharp
builder.Services.AddServerSideBlazor(options =>
{
    options.RootComponents.RegisterCustomElement<Counter>("my-counter");
});
```

### Blazor WebAssembly registration

Register a root component as a custom element in a Blazor WebAssembly app. In the following example, the code:

* Adds a namespace for the app's components. In the example, the app's namespace is `BlazorSample`, and the components are located in the `Pages` folder.
* Provides access to the API in the [Microsoft.AspNetCore.Components.Web](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web) namespace.
* Calls [Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%252A) on [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents) to register the `Counter` component with the custom HTML element `my-counter`.

```csharp
using BlazorSample.Pages;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.RegisterCustomElement<Counter>("my-counter");

await builder.Build().RunAsync();
```

### Use the registered custom element

Use the custom element with any web framework. For example, the preceding `my-counter` custom HTML element that renders the app's `Counter` component is used in a React app with the following markup:

```html
<my-counter></my-counter>
```

For a complete example of how to create custom elements with Blazor, see the [`CustomElementsComponent` component](https://github.com/dotnet/aspnetcore/blob/main/src/Components/test/testassets/BasicTestApp/CustomElementsComponent.razor) in the reference source.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


### Pass parameters

Pass parameters to your Razor component either as HTML attributes or as JavaScript properties on the DOM element.

The following `Counter` component uses an `IncrementAmount` parameter to set the increment amount of the **Click me** button.

`Counter.razor`:

```razor
<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    [Parameter]
    public int IncrementAmount { get; set; } = 1;

    private void IncrementCount()
    {
        currentCount += IncrementAmount;
    }
}
```

Render the `Counter` component with the custom element and pass a value to the `IncrementAmount` parameter as an HTML attribute. The attribute name adopts kebab-case syntax (`increment-amount`, not `IncrementAmount`):

```html
<my-counter increment-amount="10"></my-counter>
```

Alternatively, you can set the parameter's value as a JavaScript property on the element object. The property name adopts camel case syntax (`incrementAmount`, not `IncrementAmount`):

```javascript
const elem = document.querySelector("my-counter");
elem.incrementAmount = 10;
```

You can update parameter values at any time using either attribute or property syntax.

Supported parameter types:

* Using JavaScript property syntax, you can pass objects of any JSON-serializable type.
* Using HTML attributes, you are limited to passing objects of string, boolean, or numerical types.



**Applies to: < aspnetcore-7.0**

*Experimental* support is available for building custom elements using the [`Microsoft.AspNetCore.Components.CustomElements` NuGet package](https://www.nuget.org/packages/microsoft.aspnetcore.components.customelements). Custom elements use standard HTML interfaces to implement custom HTML elements.

> **Warning:**
> Experimental features are provided for the purpose of exploring feature viability and may not ship in a stable version.

Register a root component as a custom element:

* In a Blazor Server app, modify the call to [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A) in the `Program` file to call [Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%252A) on [Microsoft.AspNetCore.Components.Server.CircuitOptions.RootComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.CircuitOptions.RootComponents%252A):

  ```csharp
  builder.Services.AddServerSideBlazor(options =>
  {
      options.RootComponents.RegisterCustomElement<Counter>("my-counter");
  });
  ```
  
  > **Note:**
  > The preceding code example requires a namespace for the app's components (for example, `using BlazorSample.Components.Pages;`) in the `Program` file.

* In a Blazor WebAssembly app, call [Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement%252A) on [Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents) in the `Program` file:

  ```csharp
  builder.RootComponents.RegisterCustomElement<Counter>("my-counter");
  ```
  
  > **Note:**
  > The preceding code example requires a namespace for the app's components (for example, `using BlazorSample.Components.Pages;`) in the `Program` file.

Include the following `<script>` tag in the app's HTML ***before*** the Blazor script tag:

```html
<script src="/_content/Microsoft.AspNetCore.Components.CustomElements/BlazorCustomElements.js"></script>
```

Use the custom element with any web framework. For example, the preceding counter custom element is used in a React app with the following markup:

```html
<my-counter increment-amount={incrementAmount}></my-counter>
```

> **Warning:**
> The custom elements feature is currently **experimental, unsupported, and subject to change or be removed at any time**. We welcome your feedback on how well this particular approach meets your requirements.



## Generate Angular and React components

Generate JavaScript (JS) components from Razor components for JavaScript technologies, such as Angular or React. This capability isn't included with .NET, but is enabled by the support for rendering Razor components from JS. The [JS component generation sample on GitHub](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/JSComponentGeneration) demonstrates how to generate Angular and React components from Razor components. See the GitHub sample app's `README.md` file for additional information.

> **Warning:**
> The Angular and React component features are currently **experimental, unsupported, and subject to change or be removed at any time**. We welcome your feedback on how well this particular approach meets your requirements.

## Additional resources

[blazor/host-and-deploy/index](../host-and-deploy/index.md)
