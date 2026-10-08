**Applies to: \>= aspnetcore-10.0**

*This section applies to server-side apps that prerender Razor components. Prerendering is covered in [blazor/components/prerender](../components/prerender.md).*



**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

*This section applies to server-side apps that prerender Razor components. Prerendering is covered in [blazor/components/prerender](../components/prerender.md).*

> **Note:**
> Internal navigation for [interactive routing](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23static-versus-interactive-routing) in Blazor Web Apps doesn't involve requesting new page content from the server. Therefore, prerendering doesn't occur for internal page requests. If the app adopts interactive routing, perform a full page reload for component examples that demonstrate prerendering behavior. For more information, see [blazor/state-management/prerendered-state-persistence#interactive-routing-and-prerendering](https://learn.microsoft.com/search/?terms=blazor%2Fstate-management%2Fprerendered-state-persistence%23interactive-routing-and-prerendering).



**Applies to: < aspnetcore-8.0**

*This section applies to server-side apps and hosted Blazor WebAssembly apps that prerender Razor components. Prerendering is covered in [blazor/components/integration](../components/integration.md).*



During prerendering, calling into JavaScript (JS) isn't possible. The following example demonstrates how to use JS interop as part of a component's initialization logic in a way that's compatible with prerendering.

The following `scrollElementIntoView` function:

* Scrolls to the passed element with [`scrollIntoView`](https://developer.mozilla.org/docs/Web/API/Element/scrollIntoView).
* Returns the element's `top` property value from the [`getBoundingClientRect`](https://developer.mozilla.org/docs/Web/API/Element/getBoundingClientRect) method.

```javascript
window.scrollElementIntoView = (element) => {
  element.scrollIntoView();
  return element.getBoundingClientRect().top;
}
```

Where [Microsoft.JSInterop.IJSRuntime.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime.InvokeAsync%252A) calls the JS function in component code, the [Microsoft.AspNetCore.Components.ElementReference](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ElementReference) is only used in [Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync%252A) and not in any earlier lifecycle method because there's no HTML DOM element until after the component is rendered.

[`StateHasChanged`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23state-changes-statehaschanged) ([reference source](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A)) is called to enqueue rerendering of the component with the new state obtained from the JS interop call (for more information, see [blazor/components/rendering](../components/rendering.md)). An infinite loop isn't created because [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) is only called when `scrollPosition` is `null`.

`PrerenderedInterop.razor`:

**Applies to: \>= aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/PrerenderedInterop.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/includes/prerendering.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_Server/Pages/prerendering/PrerenderedInterop.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/includes/prerendering.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/Pages/prerendering/PrerenderedInterop.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/includes/prerendering.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_Server/Pages/prerendering/PrerenderedInterop.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/includes/prerendering.md)



**Applies to: < aspnetcore-5.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/3.1/BlazorSample_Server/Pages/prerendering/PrerenderedInterop.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/includes/prerendering.md)



The preceding example pollutes the client with a global function. For a better approach in production apps, see [JavaScript isolation in JavaScript modules](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23javascript-isolation-in-javascript-modules).
