---
title: ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR)
author: guardrex
description: Learn how to use JavaScript in a Blazor Web App with static server-side rendering (static SSR).
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/js-interop/ssr
---
# ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR)

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


This article explains how to load JavaScript (JS) in a Blazor Web App with static server-side rendering (static SSR) and [enhanced navigation](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling).

Some apps depend on JS to perform initialization tasks that are specific to each page. When using Blazor's enhanced navigation feature, which allows the user to avoid reloading the entire page, page-specific JS may not be executed again as expected each time an enhanced page navigation occurs.

**Applies to: \>= aspnetcore-9.0**

To avoid this problem, we don't recommended relying on page-specific `<script>` elements placed outside of the layout file applied to the component. Instead, scripts should register an [`afterWebStarted` JS initializer](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers) to perform initialization logic and use an event listener to listen for page updates caused by enhanced navigation.

## Events

In the following event listener examples, the `{CALLBACK}` placeholder is the callback function.

* Enhanced navigation start (`enhancednavigationstart`) triggers a callback before an enhanced navigation occurs:

  ```javascript
  blazor.addEventListener("enhancednavigationstart", {CALLBACK});
  ```

* Enhanced navigation end (`enhancednavigationend`) triggers a callback after an enhanced navigation occurs:

  ```javascript
  blazor.addEventListener("enhancednavigationend", {CALLBACK});
  ```

* Enhanced navigation page load (`enhancedload`) triggers a callback each time the page updates due to an enhanced navigation, including [streaming updates](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23streaming-rendering):

  ```javascript
  blazor.addEventListener("enhancedload", {CALLBACK});
  ```



**Applies to: < aspnetcore-9.0**

To avoid this problem, we don't recommended relying on page-specific `<script>` elements placed outside of the layout file applied to the component. Instead, scripts should register an [`afterWebStarted` JS initializer](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers) to perform initialization logic and use an event listener to listen for page updates caused by enhanced navigation:

```javascript
blazor.addEventListener("enhancedload", {CALLBACK});
```

In the preceding example, the `{CALLBACK}` placeholder is the callback function.



## Enhanced page load script example

The following example demonstrates one way to configure JS code to run when a statically-rendered page with enhanced navigation is initially loaded or updated.

The following `PageWithScript` component example is a component in the app that requires scripts to run with static SSR and enhanced navigation. The following component example includes a `PageScript` component from a Razor class library (RCL) that's added to the solution later in this article.

`Components/Pages/PageWithScript.razor`:

```razor
@page "/page-with-script"
@using BlazorPageScript

<PageTitle>Enhanced Load Script Example</PageTitle>

<PageScript Src="./Components/Pages/PageWithScript.razor.js" />

Welcome to my page.
```

In the Blazor Web App, add the following [collocated JS file](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fjavascript-location%23load-a-script-from-an-external-javascript-file-js-collocated-with-a-component):

* `onLoad` is called when the script is added to the page.
* `onUpdate` is called when the script still exists on the page after an enhanced update.
* `onDispose` is called when the script is removed from the page after an enhanced update.

`Components/Pages/PageWithScript.razor.js`:

```javascript
export function onLoad() {
  console.log('Loaded');
}

export function onUpdate() {
  console.log('Updated');
}

export function onDispose() {
  console.log('Disposed');
}
```

In a [Razor Class Library (RCL)](../components/class-libraries.md) (the example RCL is named `BlazorPageScript`), add the following module, which is a [JS initializer](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers).

`wwwroot/BlazorPageScript.lib.module.js`:

```javascript
const pageScriptInfoBySrc = new Map();

function registerPageScriptElement(src) {
  if (!src) {
    throw new Error('Must provide a non-empty value for the "src" attribute.');
  }

  let pageScriptInfo = pageScriptInfoBySrc.get(src);

  if (pageScriptInfo) {
    pageScriptInfo.referenceCount++;
  } else {
    pageScriptInfo = { referenceCount: 1, module: null };
    pageScriptInfoBySrc.set(src, pageScriptInfo);
    initializePageScriptModule(src, pageScriptInfo);
  }
}

function unregisterPageScriptElement(src) {
  if (!src) {
    return;
  }

  const pageScriptInfo = pageScriptInfoBySrc.get(src);
  
  if (!pageScriptInfo) {
    return;
  }

  pageScriptInfo.referenceCount--;
}

async function initializePageScriptModule(src, pageScriptInfo) {
  if (src.startsWith("./")) {
    src = new URL(src.substr(2), document.baseURI).toString();
  }

  const module = await import(src);

  if (pageScriptInfo.referenceCount <= 0) {
    return;
  }

  pageScriptInfo.module = module;
  module.onLoad?.();
  module.onUpdate?.();
}

function onEnhancedLoad() {
  for (const [src, { module, referenceCount }] of pageScriptInfoBySrc) {
    if (referenceCount <= 0) {
      module?.onDispose?.();
      pageScriptInfoBySrc.delete(src);
    }
  }

  for (const { module } of pageScriptInfoBySrc.values()) {
    module?.onUpdate?.();
  }
}

export function afterWebStarted(blazor) {
  customElements.define('page-script', class extends HTMLElement {
    static observedAttributes = ['src'];

    attributeChangedCallback(name, oldValue, newValue) {
      if (name !== 'src') {
        return;
      }

      this.src = newValue;
      unregisterPageScriptElement(oldValue);
      registerPageScriptElement(newValue);
    }

    disconnectedCallback() {
      unregisterPageScriptElement(this.src);
    }
  });

  blazor.addEventListener('enhancedload', onEnhancedLoad);
}
```


Do ***not*** add a `<script>` tag to the app's root component, typically the `App` componennt, for `BlazorPageScript.lib.module.js` because the module in this case is a [JS initializer (`afterWebStarted`)](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers). JS initializers are detected and loaded automatically by the Blazor framework.

In the RCL, add the following `PageScript` component.

`PageScript.razor`:

```razor
<page-script src="@Src"></page-script>

@code {
    [Parameter]
    [EditorRequired]
    public string Src { get; set; } = default!;
}
```

The `PageScript` component functions normally on the top-level of a page.

If you place the `PageScript` component in an app's layout (for example, `MainLayout.razor`), which results in a shared `PageScript` among pages that use the layout, then the component only runs `onLoad` after a full page reload and `onUpdate` when any enhanced page update occurs, including enhanced navigation.

To reuse the same module among pages, but have the `onLoad` and `onDispose` callbacks invoked on each page change, append a query string to the end of the script so that it's recognized as a different module. An app could adopt the convention of using the component's name as the query string value. In the following example, the query string is "`counter`" because this `PageScript` component reference is placed in a `Counter` component. This is merely a suggestion, and you can use whatever query string scheme that you prefer.

```razor
<PageScript Src="./Components/Pages/PageWithScript.razor.js?counter" />
```

To monitor changes in specific DOM elements, use the [`MutationObserver`](https://developer.mozilla.org/docs/Web/API/MutationObserver) pattern in JS on the client. For more information, see [blazor/js-interop/index#dom-cleanup-tasks-during-component-disposal](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Findex%23dom-cleanup-tasks-during-component-disposal).

## Implementation without using an RCL

The approach described in this article can be implemented directly in a Blazor Web App without using a Razor class library (RCL) by moving the assets of the RCL into the app. However, the use of an RCL is convenient because the RCL can be packaged into a NuGet package for consumption by Blazor apps across an organization.

If you move the assets into a Blazor Web App, be sure to rename the module (`BlazorPageScript.lib.module.js`) to match the app per the file naming rules for [JS initializers](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstartup%23javascript-initializers). If the file isn't named correctly, Blazor can't detect and load the module, and the `afterWebStarted` event doesn't execute automatically when the app starts.
