---
title: Troubleshoot ASP.NET Core Blazor forms
author: guardrex
description: Learn how to troubleshoot forms in Blazor.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/forms/troubleshoot
---
# Troubleshoot ASP.NET Core Blazor forms

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


This article provides troubleshooting guidance for Blazor forms.

## Large form payloads and the SignalR message size limit

*This section only applies to Blazor Web Apps, Blazor Server apps, and hosted Blazor WebAssembly solutions that implement SignalR.*

**Applies to: \>= aspnetcore-6.0**

If form processing fails because the component's form payload has exceeded the maximum incoming SignalR message size permitted for hub methods, the form can adopt [streaming JS interop](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-dotnet-from-javascript%23stream-from-javascript-to-net) without increasing the message size limit. For more information on the size limit and the error thrown, see [blazor/fundamentals/signalr#maximum-receive-message-size](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23maximum-receive-message-size).

In the following example a text area (`<textarea>`) is used with streaming JS interop to move up to 50,000 bytes of data to the server.

Add a JavaScript (JS) `getText` function to the app:



**Applies to: \>= aspnetcore-6.0**

```javascript
window.getText = (elem) => {
  const textValue = elem.value;
  const utf8Encoder = new TextEncoder();
  const encodedTextValue = utf8Encoder.encode(textValue);
  return encodedTextValue;
};
```

For information on where to place JS in a Blazor app, see [blazor/js-interop/javascript-location](../javascript-interoperability/location-of-javascript.md).

Due to security considerations, zero-length streams aren't permitted for streaming JS Interop. Therefore, the following `StreamFormData` component traps a [Microsoft.JSInterop.JSException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSException) and returns an empty string if the text area is blank when the form is submitted.

`StreamFormData.razor`:



**Applies to: \>= aspnetcore-8.0**

```razor
@page "/stream-form-data"
@inject IJSRuntime JS
@inject ILogger<StreamFormData> Logger

<h1>Stream form data with JS interop</h1>

<EditForm FormName="StreamFormData" Model="this" OnSubmit="Submit">
    <div>
        <label>
            &lt;textarea&gt; value streamed for assignment to
            <code>TextAreaValue (&lt;= 50,000 characters)</code>:
            <textarea @ref="largeTextArea" />
        </label>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</EditForm>

<div>
    Length: @TextAreaValue?.Length
</div>

@code {
    private ElementReference largeTextArea;

    public string? TextAreaValue { get; set; }

    protected override void OnInitialized() =>
        TextAreaValue ??= string.Empty;

    private async Task Submit()
    {
        TextAreaValue = await GetTextAsync();

        Logger.LogInformation("TextAreaValue length: {Length}",
            TextAreaValue.Length);
    }

    public async Task<string> GetTextAsync()
    {
        try
        {
            var streamRef =
                await JS.InvokeAsync<IJSStreamReference>("getText", largeTextArea);
            var stream = await streamRef.OpenReadStreamAsync(maxAllowedSize: 50_000);
            var streamReader = new StreamReader(stream);

            return await streamReader.ReadToEndAsync();
        }
        catch (JSException jsException)
        {
            if (jsException.InnerException is
                    ArgumentOutOfRangeException outOfRangeException &&
                outOfRangeException.ActualValue is not null &&
                outOfRangeException.ActualValue is long actualLength &&
                actualLength == 0)
            {
                return string.Empty;
            }

            throw;
        }
    }
}
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

```razor
@page "/stream-form-data"
@inject IJSRuntime JS
@inject ILogger<StreamFormData> Logger

<h1>Stream form data with JS interop</h1>

<EditForm Model="this" OnSubmit="Submit">
    <div>
        <label>
            &lt;textarea&gt; value streamed for assignment to
            <code>TextAreaValue (&lt;= 50,000 characters)</code>:
            <textarea @ref="largeTextArea" />
        </label>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</EditForm>

<div>
    Length: @TextAreaValue?.Length
</div>

@code {
    private ElementReference largeTextArea;

    public string? TextAreaValue { get; set; }

    protected override void OnInitialized() => 
        TextAreaValue ??= string.Empty;

    private async Task Submit()
    {
        TextAreaValue = await GetTextAsync();

        Logger.LogInformation("TextAreaValue length: {Length}",
            TextAreaValue.Length);
    }

    public async Task<string> GetTextAsync()
    {
        try
        {
            var streamRef =
                await JS.InvokeAsync<IJSStreamReference>("getText", largeTextArea);
            var stream = await streamRef.OpenReadStreamAsync(maxAllowedSize: 50_000);
            var streamReader = new StreamReader(stream);

            return await streamReader.ReadToEndAsync();
        }
        catch (JSException jsException)
        {
            if (jsException.InnerException is
                    ArgumentOutOfRangeException outOfRangeException &&
                outOfRangeException.ActualValue is not null &&
                outOfRangeException.ActualValue is long actualLength &&
                actualLength == 0)
            {
                return string.Empty;
            }

            throw;
        }
    }
}
```



**Applies to: < aspnetcore-6.0**

If form processing fails because the component's form payload has exceeded the maximum incoming SignalR message size permitted for hub methods, the message size limit can be increased. For more information on the size limit and the error thrown, see [blazor/fundamentals/signalr#maximum-receive-message-size](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23maximum-receive-message-size).



## EditForm parameter error

> InvalidOperationException: EditForm requires a Model parameter, or an EditContext parameter, but not both.

Confirm that the [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) assigns a [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model) **or** an [Microsoft.AspNetCore.Components.Forms.EditForm.EditContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.EditContext). Don't use both for the same form.

When assigning to [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model), confirm that the model type is instantiated.

## Connection disconnected

> Error: Connection disconnected with error 'Error: Server returned an error on close: Connection closed with an error.'.

> System.IO.InvalidDataException: The maximum message size of 32768B was exceeded. The message size can be configured in AddHubOptions.

For more information and guidance, see the following resources:

* [Large form payloads and the SignalR message size limit](#large-form-payloads-and-the-signalr-message-size-limit)
* [blazor/fundamentals/signalr#maximum-receive-message-size](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23maximum-receive-message-size)
