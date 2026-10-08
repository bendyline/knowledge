---
title: ASP.NET Core Blazor file uploads
author: guardrex
description: Learn how to upload files in Blazor with the InputFile component.
monikerRange: '>= aspnetcore-5.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/file-uploads
---
# ASP.NET Core Blazor file uploads

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


This article explains how to upload files in Blazor with the [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component.

## File uploads

> **Warning:**
> Always follow security best practices when permitting users to upload files. For more information, see [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations).

Use the [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component to read browser file data into .NET code. The [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component renders an HTML `<input>` element of type `file` for single file uploads. Add the `multiple` attribute to permit the user to upload multiple files at once.

File selection isn't cumulative when using an [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component or its underlying [HTML `<input type="file">`](https://developer.mozilla.org/docs/Web/HTML/Element/input/file), so you can't add files to an existing file selection. The component always replaces the user's initial file selection, so file references from prior selections aren't available.

The following [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component executes the `LoadFiles` method when the [Microsoft.AspNetCore.Components.Forms.InputFile.OnChange](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile.OnChange) ([`change`](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)) event occurs. An [Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs) provides access to the selected file list and details about each file:

```razor
<InputFile OnChange="LoadFiles" multiple />

@code {
    private void LoadFiles(InputFileChangeEventArgs e)
    {
        ...
    }
}
```

Rendered HTML:

```html
<input multiple="" type="file" _bl_2="">
```

> **Note:**
> In the preceding example, the `<input>` element's `_bl_2` attribute is used for Blazor's internal processing.

To read data from a user-selected file with a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) that represents the file's bytes, call [Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A) on the file and read from the returned stream. For more information, see the [File streams](#file-streams) section.

[Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A) enforces a maximum size in bytes of its [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream). Reading one file or multiple files larger than 500 KB results in an exception. This limit prevents developers from accidentally reading large files into memory. The `maxAllowedSize` parameter of [Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A) can be used to specify a larger size if required.

Outside of processing a small file, avoid reading the incoming file stream directly into memory all at once. For example, don't copy all of the file's bytes into a [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream) or read the entire stream into a byte array all at once. These approaches can result in degraded app performance and potential [Denial of Service (DoS)](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23denial-of-service-dos-attacks) risk, especially for server-side components. Instead, consider adopting either of the following approaches:

* Copy the stream directly to a file on disk without reading it into memory. Note that Blazor apps executing code on the server aren't able to access the client's file system directly. 
* Upload files from the client directly to an external service. For more information, see the [Upload files to an external service](#upload-files-to-an-external-service) section.

In the following examples, `browserFile` implements [Microsoft.AspNetCore.Components.Forms.IBrowserFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile) to represent an uploaded file. Working implementations for [Microsoft.AspNetCore.Components.Forms.IBrowserFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile) are shown in the file upload components later in this article.

When calling [Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A), we recommend passing a maximum allowed file size in the `maxAllowedSize` parameter at the limit of the file sizes that you expect to receive. The default value is 500 KB. This article's examples use a maximum allowed file size variable or constant named `maxFileSize` but usually don't show setting a specific value.

<span aria-hidden="true">✔️</span><span class="visually-hidden">Supported:</span> The following approach is **recommended** because the file's [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) is provided directly to the consumer, a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) that creates the file at the provided path:

```csharp
await using FileStream fs = new(path, FileMode.Create);
await browserFile.OpenReadStream(maxFileSize).CopyToAsync(fs);
```

<span aria-hidden="true">✔️</span><span class="visually-hidden">Supported:</span> The following approach is **recommended** for [Microsoft Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-overview) because the file's [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) is provided directly to [Azure.Storage.Blobs.BlobContainerClient.UploadBlobAsync%2A](https://learn.microsoft.com/search/?terms=Azure.Storage.Blobs.BlobContainerClient.UploadBlobAsync%252A):

```csharp
await blobContainerClient.UploadBlobAsync(
    trustedFileName, browserFile.OpenReadStream(maxFileSize));
```

<span aria-hidden="true">✔️</span><span class="visually-hidden">Only recommended for small files:</span> The following approach is only **recommended for small files** because the file's [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) content is read into a [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream) in memory (`memoryStream`), which incurs a performance penalty and [DoS](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23denial-of-service-dos-attacks) risk. For an example that demonstrates this technique to save a thumbnail image with an [Microsoft.AspNetCore.Components.Forms.IBrowserFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile) to a database using [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core/), see the [Save small files directly to a database with EF Core](#save-small-files-directly-to-a-database-with-ef-core) section later in this article.

```csharp
using var memoryStream = new MemoryStream();
await browserFile.OpenReadStream(maxFileSize).CopyToAsync(memoryStream);
var smallFileByteArray = memoryStream.ToArray();
```

<span aria-hidden="true">❌</span><span class="visually-hidden">Not recommended:</span> The following approach is **NOT recommended** because the file's [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) content is read into a [System.String](https://learn.microsoft.com/search/?terms=System.String) in memory (`reader`):

```csharp
var reader = 
    await new StreamReader(browserFile.OpenReadStream(maxFileSize)).ReadToEndAsync();
```

<span aria-hidden="true">❌</span><span class="visually-hidden">Not recommended:</span> The following approach is **NOT recommended** for [Microsoft Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-overview) because the file's [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) content is copied into a [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream) in memory (`memoryStream`) before calling [Azure.Storage.Blobs.BlobContainerClient.UploadBlobAsync%2A](https://learn.microsoft.com/search/?terms=Azure.Storage.Blobs.BlobContainerClient.UploadBlobAsync%252A):

```csharp
var memoryStream = new MemoryStream();
await browserFile.OpenReadStream(maxFileSize).CopyToAsync(memoryStream);
await blobContainerClient.UploadBlobAsync(
    trustedFileName, memoryStream));
```

A component that receives an image file can call the [Microsoft.AspNetCore.Components.Forms.BrowserFileExtensions.RequestImageFileAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.BrowserFileExtensions.RequestImageFileAsync%252A) convenience method on the file to resize the image data within the browser's JavaScript runtime before the image is streamed into the app. Use cases for calling [Microsoft.AspNetCore.Components.Forms.BrowserFileExtensions.RequestImageFileAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.BrowserFileExtensions.RequestImageFileAsync%252A) are most appropriate for Blazor WebAssembly apps.

## File size read and upload limits

**Applies to: \>= aspnetcore-9.0**

For Chromium-based browsers (for example, Google Chrome and Microsoft Edge) using the HTTP/2 protocol, HTTPS, and [CORS](../security/cors.md), client-side Blazor supports using the [Streams API](https://developer.mozilla.org/docs/Web/API/Streams_API) to permit uploading large files with [request streaming](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23client-side-request-streaming).

Without a Chromium browser, HTTP/2 protocol, or HTTPS, client-side Blazor reads the file's bytes into a single JavaScript array buffer when marshaling the data from JavaScript to C#, which is limited to 2 GB or to the device's available memory. Large file uploads may fail for client-side uploads using the [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component.



**Applies to: < aspnetcore-9.0**

Client-side Blazor reads the file's bytes into a single JavaScript array buffer when marshaling the data from JavaScript to C#, which is limited to 2 GB or to the device's available memory. Large file uploads may fail for client-side uploads using the [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component. We recommend adopting [request streaming](call-web-api.md) with .NET 9 or later.



## Security considerations

### Avoid `IBrowserFile.Size` for file size limits

Avoid using [Microsoft.AspNetCore.Components.Forms.IBrowserFile.Size](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.Size) to impose a limit on the file size. Instead of using the unsafe client-supplied file size, explicitly specify the maximum file size. The following example uses the maximum file size assigned to `maxFileSize`:

```diff
- var fileContent = new StreamContent(file.OpenReadStream(file.Size));
+ var fileContent = new StreamContent(file.OpenReadStream(maxFileSize));
```

### File name security

Never use a client-supplied file name for saving a file to physical storage. Create a safe file name for the file using [System.IO.Path.GetRandomFileName](https://learn.microsoft.com/search/?terms=System.IO.Path.GetRandomFileName) or [System.IO.Path.GetTempFileName](https://learn.microsoft.com/search/?terms=System.IO.Path.GetTempFileName) to create a full path (including the file name) for temporary storage.

Razor automatically HTML encodes property values for display. The following code is safe to use:

```cshtml
@foreach (var file in Model.DatabaseFiles) {
    <tr>
        <td>
            @file.UntrustedName
        </td>
    </tr>
}
```

Outside of Razor, always use [System.Net.WebUtility.HtmlEncode%2A](https://learn.microsoft.com/search/?terms=System.Net.WebUtility.HtmlEncode%252A) to safely encode file names from a user's request.

Many implementations must include a check that the file exists; otherwise, the file is overwritten by a file of the same name. Supply additional logic to meet your app's specifications.

## Examples

The following examples demonstrate multiple file upload in a component. [Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs.GetMultipleFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs.GetMultipleFiles%252A) allows reading multiple files. Specify the maximum number of files to prevent a malicious user from uploading a larger number of files than the app expects. [Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs.File](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs.File) allows reading the first and only file if the file upload doesn't support multiple files.

[Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs) is in the [Microsoft.AspNetCore.Components.Forms](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms) namespace, which is typically one of the namespaces in the app's imports file (`_Imports.razor`). When the namespace is present in the imports file, it provides API member access to the app's components.

Namespaces in the imports file aren't applied to C# files (`.cs`). C# files require an explicit [`using`](https://learn.microsoft.com/dotnet/csharp/language-reference/language-specification/namespaces#using-directives) directive at the top of the class file:

```razor
using Microsoft.AspNetCore.Components.Forms;
```

For testing file upload components, you can create test files of any size with [PowerShell](https://learn.microsoft.com/powershell/):

```powershell
$out = new-object byte[] {SIZE}; (new-object Random).NextBytes($out); [IO.File]::WriteAllBytes('{PATH}', $out)
```

In the preceding command:

* The `{SIZE}` placeholder is the size of the file in bytes (for example, `2097152` for a 2 MB file).
* The `{PATH}` placeholder is the path and file with file extension (for example, `D:/test_files/testfile2MB.txt`).

### Server-side file upload example

**To use the following code, create a `Development/unsafe_uploads` folder at the root of the app running in the `Development` environment.**

Because the example uses the app's [environment](fundamentals/environments.md) as part of the path where files are saved, additional folders are required if other environments are used in testing and production. For example, create a `Staging/unsafe_uploads` folder for the `Staging` environment. Create a `Production/unsafe_uploads` folder for the `Production` environment.

> **Warning:**
> The example saves files without scanning their contents, and the guidance in this article doesn't take into account additional security best practices for uploaded files. On staging and production systems, disable execute permission on the upload folder and scan files with an anti-virus/anti-malware scanner API immediately after upload. For more information, see [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations).

`FileUpload1.razor`:

**Applies to: \>= aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/FileUpload1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_Server/Pages/file-uploads/FileUpload1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/Pages/file-uploads/FileUpload1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_Server/Pages/file-uploads/FileUpload1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



### Client-side file upload example

The following example processes file bytes and doesn't send files to a destination outside of the app. For an example of a Razor component that sends a file to a server or service, see the following sections:

* [Upload files to a server with client-side rendering (CSR)](#upload-files-to-a-server-with-client-side-rendering-csr)
* [Upload files to an external service](#upload-files-to-an-external-service)

The component assumes that the Interactive WebAssembly render mode (`InteractiveWebAssembly`) is inherited from a parent component or applied globally to the app.

**Applies to: \>= aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_WebAssembly/Pages/FileUpload1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/file-uploads/FileUpload1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/file-uploads/FileUpload1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/file-uploads/FileUpload1.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



[Microsoft.AspNetCore.Components.Forms.IBrowserFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile) returns metadata [exposed by the browser](https://developer.mozilla.org/docs/Web/API/File#Instance_properties) as properties. Use this metadata for preliminary validation.

* [Microsoft.AspNetCore.Components.Forms.IBrowserFile.Name](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.Name)
* [Microsoft.AspNetCore.Components.Forms.IBrowserFile.Size](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.Size)
* [Microsoft.AspNetCore.Components.Forms.IBrowserFile.LastModified](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.LastModified)
* [Microsoft.AspNetCore.Components.Forms.IBrowserFile.ContentType](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.ContentType)

***Never trust the values of the preceding properties, especially the [Microsoft.AspNetCore.Components.Forms.IBrowserFile.Name](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.Name) property for display in the UI.*** Treat all user-supplied data as a significant security risk to the app, server, and network. For more information, see [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations).

## Upload files to a server with server-side rendering

*This section applies to Interactive Server components in Blazor Web Apps or Blazor Server apps.*

The following example demonstrates uploading files from a server-side app to a backend web API controller in a separate app, possibly on a separate server.

In the server-side app's `Program` file, add [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) and related services that allow the app to create [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) instances:

```csharp
builder.Services.AddHttpClient();
```

For more information, see [fundamentals/http-requests](../fundamentals/http-requests.md).

For the examples in this section:

* The web API runs at the URL: `https://localhost:5001`
* The server-side app runs at the URL: `https://localhost:5003`

For testing, the preceding URLs are configured in the projects' `Properties/launchSettings.json` files.

The following `UploadResult` class maintains the result of an uploaded file. When a file fails to upload on the server, an error code is returned in `ErrorCode` for display to the user. A safe file name is generated on the server for each file and returned to the client in `StoredFileName` for display. Files are keyed between the client and server using the unsafe/untrusted file name in `FileName`.

`UploadResult.cs`:

```csharp
public class UploadResult
{
    public bool Uploaded { get; set; }
    public string? FileName { get; set; }
    public string? StoredFileName { get; set; }
    public int ErrorCode { get; set; }
}
```

A security best practice for production apps is to avoid sending error messages to clients that might reveal sensitive information about an app, server, or network. Providing detailed error messages can aid a malicious user in devising attacks on an app, server, or network. The example code in this section only sends back an error code number (`int`) for display by the component client-side if a server-side error occurs. If a user requires assistance with a file upload, they provide the error code to support personnel for support ticket resolution without ever knowing the exact cause of the error.

<!-- UPDATE 11.0 HOLD moniker range="< aspnetcore-11.0" 
                 https://github.com/dotnet/aspnetcore/issues/47301
                 No doc issue yet, but tracked by ...
                 https://github.com/dotnet/AspNetCore.Docs/issues/34437 -->

The following `LazyBrowserFileStream` class defines a custom stream type that lazily calls [Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A) just before the first bytes of the stream are requested. The stream isn't transmitted from the browser to the server until reading the stream begins in .NET.

`LazyBrowserFileStream.cs`:

<!-- UPDATE 11.0 HOLD moniker-end -->

<!-- UPDATE 11.0 HOLD for next line: < aspnetcore-11.0 -->

**Applies to: \>= aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/LazyBrowserFileStream.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_Server/LazyBrowserFileStream.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/LazyBrowserFileStream.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_Server/LazyBrowserFileStream.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



The following `FileUpload2` component:

* Permits users to upload files from the client.
* Displays the untrusted/unsafe file name provided by the client in the UI. The untrusted/unsafe file name is automatically HTML-encoded by Razor for safe display in the UI.

> **Warning:**
> **Don't trust file names supplied by clients** for:
>
> * Saving the file to a file system or service.
> * Display in UIs that don't encode file names automatically or via developer code.
>
> For more information on security considerations when uploading files to a server, see [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations).

`FileUpload2.razor`:

**Applies to: \>= aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/FileUpload2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_Server/Pages/file-uploads/FileUpload2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/Pages/file-uploads/FileUpload2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_Server/Pages/file-uploads/FileUpload2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



<!-- UPDATE 11.0 HOLD for the next line: < aspnetcore-11.0 -->

**Applies to: \>= aspnetcore-8.0**

If the component limits file uploads to a single file at a time or if the component only adopts client-side rendering (CSR, `InteractiveWebAssembly`), the component can avoid the use of the `LazyBrowserFileStream` and use a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream). The following demonstrates the changes for the `FileUpload2` component:

```diff
- var stream = new LazyBrowserFileStream(file, maxFileSize);
- var fileContent = new StreamContent(stream);
+ var fileContent = new StreamContent(file.OpenReadStream(maxFileSize));
```

Remove the `LazyBrowserFileStream` class (`LazyBrowserFileStream.cs`), as it isn't used.



**Applies to: < aspnetcore-8.0**

If the component limits file uploads to a single file at a time, the component can avoid the use of the `LazyBrowserFileStream` and use a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream). The following demonstrates the changes for the `FileUpload2` component:

```diff
- var stream = new LazyBrowserFileStream(file, maxFileSize);
- var fileContent = new StreamContent(stream);
+ var fileContent = new StreamContent(file.OpenReadStream(maxFileSize));
```

Remove the `LazyBrowserFileStream` class (`LazyBrowserFileStream.cs`), as it isn't used.



The following controller in the web API project saves uploaded files from the client.

> **Important:**
> The controller in this section is intended for use in a separate web API project from the Blazor app. The web API should [mitigate Cross-Site Request Forgery (XSRF/CSRF) attacks](../security/anti-request-forgery.md) if file upload users are authenticated.

**Applies to: \= aspnetcore-6.0**

> **Note:**
> Binding form values with the [`[FromForm]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) isn't natively supported for [Minimal APIs](../fundamentals/minimal-apis.md) in ASP.NET Core in .NET 6. Therefore, the following `Filesave` controller example can't be converted to use Minimal APIs. Support for binding from form values with Minimal APIs is available in ASP.NET Core in .NET 7 or later.



**To use the following code, create a `Development/unsafe_uploads` folder at the root of the web API project for the app running in the `Development` environment.**

Because the example uses the app's [environment](fundamentals/environments.md) as part of the path where files are saved, additional folders are required if other environments are used in testing and production. For example, create a `Staging/unsafe_uploads` folder for the `Staging` environment. Create a `Production/unsafe_uploads` folder for the `Production` environment.

> **Warning:**
> The example saves files without scanning their contents, and the guidance in this article doesn't take into account additional security best practices for uploaded files. On staging and production systems, disable execute permission on the upload folder and scan files with an anti-virus/anti-malware scanner API immediately after upload. For more information, see [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations).

`Controllers/FilesaveController.cs`:

```csharp
using System.Net;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class FilesaveController(
    IHostEnvironment env, ILogger<FilesaveController> logger) 
    : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<IList<UploadResult>>> PostFile(
        [FromForm] IEnumerable<IFormFile> files)
    {
        var maxAllowedFiles = 3;
        long maxFileSize = 1024 * 15;
        var filesProcessed = 0;
        var resourcePath = new Uri($"{Request.Scheme}://{Request.Host}/");
        List<UploadResult> uploadResults = [];

        foreach (var file in files)
        {
            var uploadResult = new UploadResult();
            string trustedFileNameForFileStorage;
            var untrustedFileName = file.FileName;
            uploadResult.FileName = untrustedFileName;
            var trustedFileNameForDisplay =
                WebUtility.HtmlEncode(untrustedFileName);

            if (filesProcessed < maxAllowedFiles)
            {
                if (file.Length == 0)
                {
                    logger.LogInformation("{FileName} length is 0 (Err: 1)",
                        trustedFileNameForDisplay);
                    uploadResult.ErrorCode = 1;
                }
                else if (file.Length > maxFileSize)
                {
                    logger.LogInformation("{FileName} of {Length} bytes is " +
                        "larger than the limit of {Limit} bytes (Err: 2)",
                        trustedFileNameForDisplay, file.Length, maxFileSize);
                    uploadResult.ErrorCode = 2;
                }
                else
                {
                    try
                    {
                        trustedFileNameForFileStorage = Path.GetRandomFileName();
                        var path = Path.Combine(env.ContentRootPath,
                            env.EnvironmentName, "unsafe_uploads",
                            trustedFileNameForFileStorage);

                        await using FileStream fs = new(path, FileMode.Create);
                        await file.CopyToAsync(fs);

                        logger.LogInformation("{FileName} saved at {Path}",
                            trustedFileNameForDisplay, path);
                        uploadResult.Uploaded = true;
                        uploadResult.StoredFileName = trustedFileNameForFileStorage;
                    }
                    catch (IOException ex)
                    {
                        logger.LogError("{FileName} error on upload (Err: 3): {Message}",
                            trustedFileNameForDisplay, ex.Message);
                        uploadResult.ErrorCode = 3;
                    }
                }

                filesProcessed++;
            }
            else
            {
                logger.LogInformation("{FileName} not uploaded because the " +
                    "request exceeded the allowed {Count} of files (Err: 4)",
                    trustedFileNameForDisplay, maxAllowedFiles);
                uploadResult.ErrorCode = 4;
            }

            uploadResults.Add(uploadResult);
        }

        return new CreatedResult(resourcePath, uploadResults);
    }
}
```

In the preceding code, [System.IO.Path.GetRandomFileName%2A](https://learn.microsoft.com/search/?terms=System.IO.Path.GetRandomFileName%252A) is called to generate a secure file name. Never trust the file name provided by the browser, as a cyberattacker may choose an existing file name that overwrites an existing file or send a path that attempts to write outside of the app.

The server app must register controller services and map controller endpoints. For more information, see [mvc/controllers/routing](../mvc/controllers/routing.md).

## Upload files to a server with client-side rendering (CSR)

*This section applies to client-side rendered (CSR) components in Blazor Web Apps or Blazor WebAssembly apps.*

The following example demonstrates uploading files to a backend web API controller in a separate app, possibly on a separate server, from a component in a Blazor Web App that adopts CSR or a component in a Blazor WebAssembly app.

**Applies to: \>= aspnetcore-9.0**

The example adopts [request streaming](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23client-side-request-streaming) for a Chromium-based browser (for example, Google Chrome or Microsoft Edge) with HTTP/2 protocol and HTTPS. If request streaming can't be used, Blazor gracefully degrades to [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) without request streaming. For more information, see the [File size read and upload limits](#file-size-read-and-upload-limits) section.



The following `UploadResult` class maintains the result of an uploaded file. When a file fails to upload on the server, an error code is returned in `ErrorCode` for display to the user. A safe file name is generated on the server for each file and returned to the client in `StoredFileName` for display. Files are keyed between the client and server using the unsafe/untrusted file name in `FileName`.

`UploadResult.cs`:

```csharp
public class UploadResult
{
    public bool Uploaded { get; set; }
    public string? FileName { get; set; }
    public string? StoredFileName { get; set; }
    public int ErrorCode { get; set; }
}
```

> **Note:**
> The preceding `UploadResult` class can be shared between client- and server-based projects. When client and server projects share the class, add an import to each project's imports file (`_Imports.razor`) for the shared project. For example:
>
> ```razor
> @using BlazorSample.Shared
> ```

The following `FileUpload2` component:

* Permits users to upload files from the client.
* Displays the untrusted/unsafe file name provided by the client in the UI. The untrusted/unsafe file name is automatically HTML-encoded by Razor for safe display in the UI.

A security best practice for production apps is to avoid sending error messages to clients that might reveal sensitive information about an app, server, or network. Providing detailed error messages can aid a malicious user in devising attacks on an app, server, or network. The example code in this section only sends back an error code number (`int`) for display by the component client-side if a server-side error occurs. If a user requires assistance with a file upload, they provide the error code to support personnel for support ticket resolution without ever knowing the exact cause of the error.

> **Warning:**
> **Don't trust file names supplied by clients** for:
>
> * Saving the file to a file system or service.
> * Display in UIs that don't encode file names automatically or via developer code.
>
> For more information on security considerations when uploading files to a server, see [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations).

**Applies to: \>= aspnetcore-8.0**

In the Blazor Web App server project, add [System.Net.Http.IHttpClientFactory](https://learn.microsoft.com/search/?terms=System.Net.Http.IHttpClientFactory) and related services in the project's `Program` file:

```csharp
builder.Services.AddHttpClient();
```

The [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) services must be added to the server project because the client-side component is prerendered on the server. If you [disable prerendering for the following component](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fprerender%23disable-prerendering), you aren't required to provide the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) services in the server project and don't need to add the preceding line to the server project.

For more information on adding [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) services to an ASP.NET Core app, see [fundamentals/http-requests](../fundamentals/http-requests.md).

The client project (`.Client`) of a Blazor Web App must also register an [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) for HTTP POST requests to a backend web API controller. Confirm or add the following to the client project's `Program` file:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
```

The preceding example sets the base address with `builder.HostEnvironment.BaseAddress` ([Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress%252A)), which gets the base address for the app and is typically derived from the `<base>` tag's `href` value in the host page. If you're calling an external web API, set the URI to the web API's base address.

A standalone Blazor WebAssembly app that uploads files to a separate server web API either uses a [named `HttpClient`](https://learn.microsoft.com/search/?terms=blazor%2Fcall-web-api%23named-httpclient-with-ihttpclientfactory) or sets the default [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) service registration to point to the web API's endpoint. In the following example where the web API is hosted locally at port 5001, the base address is `https://localhost:5001`:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient { BaseAddress = new Uri("https://localhost:5001") });
```



**Applies to: \>= aspnetcore-9.0**

In a Blazor Web App, add the [Microsoft.AspNetCore.Components.WebAssembly.Http](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http) namespace to the component's directives:

```razor
@using Microsoft.AspNetCore.Components.WebAssembly.Http
```



`FileUpload2.razor`:

**Applies to: \>= aspnetcore-9.0**

```razor
@page "/file-upload-2"
@using System.Linq
@using System.Net.Http.Headers
@using System.Net
@inject HttpClient Http
@inject ILogger<FileUpload2> Logger

<PageTitle>File Upload 2</PageTitle>

<h1>File Upload Example 2</h1>

<p>
    <label>
        Upload up to @maxAllowedFiles files:
        <InputFile OnChange="OnInputFileChange" multiple />
    </label>
</p>

@if (files.Count > 0)
{
    <div class="card">
        <div class="card-body">
            <ul>
                @foreach (var file in files)
                {
                    <li>
                        File: @file.Name
                        <br>
                        @if (FileUpload(uploadResults, file.Name, Logger,
                       out var result))
                        {
                            <span>
                                Stored File Name: @result.StoredFileName
                            </span>
                        }
                        else
                        {
                            <span>
                                There was an error uploading the file
                                (Error: @result.ErrorCode).
                            </span>
                        }
                    </li>
                }
            </ul>
        </div>
    </div>
}

@code {
    private List<File> files = new();
    private List<UploadResult> uploadResults = new();
    private int maxAllowedFiles = 3;
    private bool shouldRender;

    protected override bool ShouldRender() => shouldRender;

    private async Task OnInputFileChange(InputFileChangeEventArgs e)
    {
        shouldRender = false;
        long maxFileSize = 1024 * 15;
        var upload = false;

        using var content = new MultipartFormDataContent();

        foreach (var file in e.GetMultipleFiles(maxAllowedFiles))
        {
            if (uploadResults.SingleOrDefault(
                f => f.FileName == file.Name) is null)
            {
                try
                {
                    files.Add(new() { Name = file.Name });

                    var fileContent = new StreamContent(file.OpenReadStream(maxFileSize));

                    fileContent.Headers.ContentType =
                        new MediaTypeHeaderValue(file.ContentType);

                    content.Add(
                        content: fileContent,
                        name: "\"files\"",
                        fileName: file.Name);

                    upload = true;
                }
                catch (Exception ex)
                {
                    Logger.LogInformation(
                        "{FileName} not uploaded (Err: 6): {Message}",
                        file.Name, ex.Message);

                    uploadResults.Add(
                        new()
                        {
                            FileName = file.Name,
                            ErrorCode = 6,
                            Uploaded = false
                        });
                }
            }
        }

        if (upload)
        {
            using var request = new HttpRequestMessage(HttpMethod.Post, "/Filesave");
            request.SetBrowserRequestStreamingEnabled(true);
            request.Content = content;

            using var response = await Http.SendAsync(request);

            var newUploadResults = await response.Content
                .ReadFromJsonAsync<IList<UploadResult>>();

            if (newUploadResults is not null)
            {
                uploadResults = uploadResults.Concat(newUploadResults).ToList();
            }
        }

        shouldRender = true;
    }

    private static bool FileUpload(IList<UploadResult> uploadResults,
        string? fileName, ILogger<FileUpload2> logger, out UploadResult result)
    {
        result = uploadResults.SingleOrDefault(f => f.FileName == fileName) ?? new();

        if (!result.Uploaded)
        {
            logger.LogInformation("{FileName} not uploaded (Err: 5)", fileName);
            result.ErrorCode = 5;
        }

        return result.Uploaded;
    }

    private class File
    {
        public string? Name { get; set; }
    }
}
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_WebAssembly/Pages/FileUpload2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_WebAssembly/Pages/file-uploads/FileUpload2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_WebAssembly/Pages/file-uploads/FileUpload2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_WebAssembly/Pages/file-uploads/FileUpload2.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



The following controller in the server-side project saves uploaded files from the client.

**Applies to: < aspnetcore-6.0**

> **Note:**
> Binding form values with the [`[FromForm]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromFormAttribute) isn't natively supported for [Minimal APIs](../fundamentals/minimal-apis.md) in ASP.NET Core in .NET 6. Therefore, the following `Filesave` controller example can't be converted to use Minimal APIs. Support for binding from form values with Minimal APIs is available in ASP.NET Core in .NET 7 or later.



**To use the following code, create a `Development/unsafe_uploads` folder at the root of the server-side project for the app running in the `Development` environment.**

Because the example uses the app's [environment](fundamentals/environments.md) as part of the path where files are saved, additional folders are required if other environments are used in testing and production. For example, create a `Staging/unsafe_uploads` folder for the `Staging` environment. Create a `Production/unsafe_uploads` folder for the `Production` environment.

> **Warning:**
> The example saves files without scanning their contents, and the guidance in this article doesn't take into account additional security best practices for uploaded files. On staging and production systems, disable execute permission on the upload folder and scan files with an anti-virus/anti-malware scanner API immediately after upload. For more information, see [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations).

In the following example for a hosted Blazor WebAssembly app or where a shared project is used to supply the `UploadResult` class, add the shared project's namespace:

```csharp
using BlazorSample.Shared;
```

We recommend using a namespace for the following controller (for example: `namespace BlazorSample.Controllers`).

`Controllers/FilesaveController.cs`:

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]")]
public class FilesaveController(
    IHostEnvironment env, ILogger<FilesaveController> logger) 
    : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<IList<UploadResult>>> PostFile(
        [FromForm] IEnumerable<IFormFile> files)
    {
        var maxAllowedFiles = 3;
        long maxFileSize = 1024 * 15;
        var filesProcessed = 0;
        var resourcePath = new Uri($"{Request.Scheme}://{Request.Host}/");
        List<UploadResult> uploadResults = [];

        foreach (var file in files)
        {
            var uploadResult = new UploadResult();
            string trustedFileNameForFileStorage;
            var untrustedFileName = file.FileName;
            uploadResult.FileName = untrustedFileName;
            var trustedFileNameForDisplay =
                WebUtility.HtmlEncode(untrustedFileName);

            if (filesProcessed < maxAllowedFiles)
            {
                if (file.Length == 0)
                {
                    logger.LogInformation("{FileName} length is 0 (Err: 1)",
                        trustedFileNameForDisplay);
                    uploadResult.ErrorCode = 1;
                }
                else if (file.Length > maxFileSize)
                {
                    logger.LogInformation("{FileName} of {Length} bytes is " +
                        "larger than the limit of {Limit} bytes (Err: 2)",
                        trustedFileNameForDisplay, file.Length, maxFileSize);
                    uploadResult.ErrorCode = 2;
                }
                else
                {
                    try
                    {
                        trustedFileNameForFileStorage = Path.GetRandomFileName();
                        var path = Path.Combine(env.ContentRootPath,
                            env.EnvironmentName, "unsafe_uploads",
                            trustedFileNameForFileStorage);

                        await using FileStream fs = new(path, FileMode.Create);
                        await file.CopyToAsync(fs);

                        logger.LogInformation("{FileName} saved at {Path}",
                            trustedFileNameForDisplay, path);
                        uploadResult.Uploaded = true;
                        uploadResult.StoredFileName = trustedFileNameForFileStorage;
                    }
                    catch (IOException ex)
                    {
                        logger.LogError("{FileName} error on upload (Err: 3): {Message}",
                            trustedFileNameForDisplay, ex.Message);
                        uploadResult.ErrorCode = 3;
                    }
                }

                filesProcessed++;
            }
            else
            {
                logger.LogInformation("{FileName} not uploaded because the " +
                    "request exceeded the allowed {Count} of files (Err: 4)",
                    trustedFileNameForDisplay, maxAllowedFiles);
                uploadResult.ErrorCode = 4;
            }

            uploadResults.Add(uploadResult);
        }

        return new CreatedResult(resourcePath, uploadResults);
    }
}
```

In the preceding code, [System.IO.Path.GetRandomFileName%2A](https://learn.microsoft.com/search/?terms=System.IO.Path.GetRandomFileName%252A) is called to generate a secure file name. Never trust the file name provided by the browser, as a cyberattacker may choose an existing file name that overwrites an existing file or send a path that attempts to write outside of the app.

The server app must register controller services and map controller endpoints. For more information, see [mvc/controllers/routing](../mvc/controllers/routing.md). We recommend adding controller services with [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews%252A) in order to automatically [mitigate Cross-Site Request Forgery (XSRF/CSRF) attacks](../security/anti-request-forgery.md) for authenticated users. If you merely use [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers%252A), antiforgery isn't enabled automatically. For more information, see [mvc/controllers/routing](../mvc/controllers/routing.md).

**Applies to: \>= aspnetcore-9.0**

Cross-Origin Requests (CORS) configuration on the server is required for [request streaming](https://developer.chrome.com/docs/capabilities/web-apis/fetch-streaming-requests) when the server is hosted at a different origin, and a preflight request is always made by the client. In the service configuration of the server's `Program` file (the server project of a Blazor Web App or the backend server web API of a Blazor WebAssembly app), the following default CORS policy is suitable for testing with the examples in this article. The client makes the local request from port 5003. Change the port number to match the client app port that you're using:



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

Configure Cross-Origin Requests (CORS) on the server. In the service configuration of the server's `Program` file (the server project of a Blazor Web App or the backend server web API of a Blazor WebAssembly app), the following default CORS policy is suitable for testing with the examples in this article. The client makes the local request from port 5003. Change the port number to match the client app port that you're using:



**Applies to: < aspnetcore-8.0**

Configure Cross-Origin Requests (CORS) on the server. In the service configuration of the backend server web API's `Program` file, the following default CORS policy is suitable for testing with the examples in this article. The client makes the local request from port 5003. Change the port number to match the client app port that you're using:



```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://localhost:5003")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
```

After calling [Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A) in the `Program` file, call [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) to add CORS middleware:

```csharp
app.UseCors();
```

For more information, see [security/cors](../security/cors.md).

**Applies to: \>= aspnetcore-9.0**

Configure the server's maximum request body size and multipart body length limits if the limits constrain the upload size.

For the Kestrel server, set [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize) (default: 30,000,000 bytes) and [Microsoft.AspNetCore.Http.Features.FormOptions.MultipartBodyLengthLimit](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.FormOptions.MultipartBodyLengthLimit) (default: 134,217,728 bytes). Set the `maxFileSize` variable in the component and the controller to the same value.

In the following `Program` file Kestrel configuration (the server project of a Blazor Web App or the backend server web API of a Blazor WebAssembly app), the `{LIMIT}` placeholder is the limit in bytes:

```csharp
using Microsoft.AspNetCore.Http.Features;

...

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = {LIMIT};
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = {LIMIT};
});
```



## Cancel a file upload

A file upload component can detect when a user has cancelled an upload by using a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) when calling into the [Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A) or [System.IO.StreamReader.ReadAsync%2A](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadAsync%252A).

Create a [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) for the `InputFile` component. At the start of the `OnInputFileChange` method, check if a previous upload is in progress.

If a file upload is in progress:

* Call [System.Threading.CancellationTokenSource.Cancel%2A](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel%252A) on the previous upload.
* Create a new [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) for the next upload and pass the [System.Threading.CancellationTokenSource.Token](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Token) to [Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A) or [System.IO.StreamReader.ReadAsync%2A](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadAsync%252A).

## Upload files server-side with progress

The following example demonstrates how to upload files in a server-side app with upload progress displayed to the user.

To use the following example in a test app:

* **Create a folder to save uploaded files for the `Development` environment: `Development/unsafe_uploads`.**
* Configure the maximum file size (`maxFileSize`, 15 KB in the following example) and maximum number of allowed files (`maxAllowedFiles`, 3 in the following example).
* Set the buffer to a different value (10 KB in the following example), if desired, for increased granularity in progress reporting. We don't recommended using a buffer larger than 30 KB due to performance and security concerns.

> **Warning:**
> The example saves files without scanning their contents, and the guidance in this article doesn't take into account additional security best practices for uploaded files. On staging and production systems, disable execute permission on the upload folder and scan files with an anti-virus/anti-malware scanner API immediately after upload. For more information, see [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations).

`FileUpload3.razor`:

**Applies to: \>= aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/FileUpload3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_Server/Pages/file-uploads/FileUpload3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/6.0/BlazorSample_Server/Pages/file-uploads/FileUpload3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/5.0/BlazorSample_Server/Pages/file-uploads/FileUpload3.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/file-uploads.md)



For more information, see the following API resources:

* [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream): Provides a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) for a file, supporting both synchronous and asynchronous read and write operations.
* [System.IO.FileStream.ReadAsync%2A](https://learn.microsoft.com/search/?terms=System.IO.FileStream.ReadAsync%252A): The preceding `FileUpload3` component reads the stream asynchronously with [System.IO.FileStream.ReadAsync%2A](https://learn.microsoft.com/search/?terms=System.IO.FileStream.ReadAsync%252A). Reading a stream synchronously with [System.IO.FileStream.Read%2A](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Read%252A) isn't supported in Razor components.

## File streams

With server interactivity, file data is streamed over the SignalR connection into .NET code on the server as the file is read.

**Applies to: \= aspnetcore-5.0**

[Microsoft.AspNetCore.Components.Forms.RemoteBrowserFileStreamOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.RemoteBrowserFileStreamOptions) allows configuring file upload characteristics.



For a WebAssembly-rendered component, file data is streamed directly into the .NET code within the browser.

**Applies to: \>= aspnetcore-6.0**

## Upload image preview

For an image preview of uploading images, start by adding an `InputFile` component with a component reference and an `OnChange` handler:

```razor
<InputFile @ref="inputFile" OnChange="ShowPreview" />
```

Add an image element with an [element reference](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23capture-references-to-elements), which serves as the placeholder for the image preview:

```razor
<img @ref="previewImageElem" />
```

Add the associated references:

```razor
@code {
    private InputFile? inputFile;
    private ElementReference previewImageElem;
}
```

In JavaScript, add a function called with an HTML [`input`](https://developer.mozilla.org/docs/Web/HTML/Element/input/) and [`img`](https://developer.mozilla.org/docs/Web/HTML/Element/img) element that performs the following:

* Extracts the selected file.
* Creates an object URL with [`createObjectURL`](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL).
* Sets an event listener to revoke the object URL with [`revokeObjectURL`](https://developer.mozilla.org/docs/Web/API/URL/revokeObjectURL) after the image is loaded, so memory isn't leaked.
* Sets the `img` element's source to display the image.

```javascript
window.previewImage = (inputElem, imgElem) => {
  const url = URL.createObjectURL(inputElem.files[0]);
  imgElem.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
  imgElem.src = url;
}
```

Finally, use an injected [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) to add the `OnChange` handler that calls the JavaScript function:

```razor
@inject IJSRuntime JS

...

@code {
    ...

    private async Task ShowPreview() => await JS.InvokeVoidAsync(
        "previewImage", inputFile!.Element, previewImageElem);
}
```

The preceding example is for uploading a single image. The approach can be expanded to support `multiple` images.

The following `FileUpload4` component shows the complete example.

`FileUpload4.razor`:



**Applies to: \>= aspnetcore-8.0**

```razor
@page "/file-upload-4"
@inject IJSRuntime JS

<h1>File Upload Example</h1>

<InputFile @ref="inputFile" OnChange="ShowPreview" />

<img style="max-width:200px;max-height:200px" @ref="previewImageElem" />

@code {
    private InputFile? inputFile;
    private ElementReference previewImageElem;

    private async Task ShowPreview() => await JS.InvokeVoidAsync(
        "previewImage", inputFile!.Element, previewImageElem);
}
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

```razor
@page "/file-upload-4"
@inject IJSRuntime JS

<h1>File Upload Example</h1>

<InputFile @ref="inputFile" OnChange="ShowPreview" />

<img style="max-width:200px;max-height:200px" @ref="previewImageElem" />

@code {
    private InputFile? inputFile;
    private ElementReference previewImageElem;

    private async Task ShowPreview() => await JS.InvokeVoidAsync(
        "previewImage", inputFile!.Element, previewImageElem);
}
```



## Save small files directly to a database with EF Core

Many ASP.NET Core apps use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core/) to manage database operations. Saving thumbnails and avatars directly to the database is a common requirement. This section demonstrates a general approach that can be further enhanced for production apps.

The following pattern:

* Is based on the [Blazor movie database tutorial app](tutorials/movie-database-app/index.md).
* Can be enhanced with additional code for file size and content type [validation feedback](forms/validation.md).
* Incurs a performance penalty and [DoS](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23denial-of-service-dos-attacks) risk. Carefully weigh the risk when reading any file into memory and consider alternative approaches, especially for larger files. Alternative approaches include saving files directly to disk or a third-party service for antivirus/antimalware checks, further processing, and serving to clients.

For the following example to work in a Blazor Web App (.NET 8 or later), the component must adopt an [interactive render mode](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23static-and-interactive-rendering-concepts) (for example, `@rendermode InteractiveServer`) to call `HandleSelectedThumbnail` on an `InputFile` component file change (`OnChange` parameter/event). Blazor Server app components are always interactive and don't require a render mode.

In the following example, a small thumbnail (<= 100 KB) in an [Microsoft.AspNetCore.Components.Forms.IBrowserFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile) is saved to a database with EF Core. If a file isn't selected by the user for the `InputFile` component, a default thumbnail is saved to the database.

The default thumbnail (`default-thumbnail.jpg`) is at the project root with a **Copy to Output Directory** setting of **Copy if newer**:

Default generic thumbnail image

The `Movie` model (`Movie.cs`) has a property (`Thumbnail`) to hold the thumbnail image data:

```csharp
[Column(TypeName = "varbinary(MAX)")]
public byte[]? Thumbnail { get; set; }
```

Image data is stored as bytes in the database as [`varbinary(MAX)`](https://learn.microsoft.com/sql/t-sql/data-types/binary-and-varbinary-transact-sql). The app base-64 encodes the bytes for display because base-64 encoded data is roughly a third larger than the raw bytes of the image, thus base-64 image data requires additional database storage and reduces the performance of database read/write operations.

Components that display the thumbnail pass image data to the `img` tag's `src` attribute as JPEG, base-64 encoded data:

```razor
<img src="data:image/jpeg;base64,@Convert.ToBase64String(movie.Thumbnail)" 
    alt="User thumbnail" />
```

In the following `Create` component, an image upload is processed. You can enhance the example further with custom validation for file type and size using the approaches in [blazor/forms/validation](forms/validation.md). To see the full `Create` component without the thumbnail upload code in the following example, see the `BlazorWebAppMovies` sample app in the [Blazor samples GitHub repository](https://github.com/dotnet/blazor-samples).

`Components/Pages/MoviePages/Create.razor`:

```razor
@page "/movies/create"
@rendermode InteractiveServer
@using Microsoft.EntityFrameworkCore
@using BlazorWebAppMovies.Models
@inject IDbContextFactory<BlazorWebAppMovies.Data.BlazorWebAppMoviesContext> DbFactory
@inject NavigationManager NavigationManager

...

<div class="row">
    <div class="col-md-4">
        <EditForm method="post" Model="Movie" OnValidSubmit="AddMovie" 
            FormName="create" Enhance>
            <DataAnnotationsValidator />
            <ValidationSummary class="text-danger" role="alert"/>

            ...

            <div class="mb-3">
                <label for="thumbnail" class="form-label">Thumbnail:</label>
                <InputFile id="thumbnail" OnChange="HandleSelectedThumbnail" 
                    class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </EditForm>
    </div>
</div>

...

@code {
    private const long maxFileSize = 102400;
    private IBrowserFile? browserFile;

    [SupplyParameterFromForm]
    private Movie Movie { get; set; } = new();

    private void HandleSelectedThumbnail(InputFileChangeEventArgs e)
    {
        browserFile = e.File;
    }

    private async Task AddMovie()
    {
        using var context = DbFactory.CreateDbContext();

        if (browserFile?.Size > 0 && browserFile?.Size <= maxFileSize)
        {
            using var memoryStream = new MemoryStream();
            await browserFile.OpenReadStream(maxFileSize).CopyToAsync(memoryStream);

            Movie.Thumbnail = memoryStream.ToArray();
        }
        else
        {
            Movie.Thumbnail = File.ReadAllBytes(
                $"{AppDomain.CurrentDomain.BaseDirectory}default_thumbnail.jpg");
        }

        context.Movie.Add(Movie);
        await context.SaveChangesAsync();
        NavigationManager.NavigateTo("/movies");
    }
}
```

The same approach would be adopted in the `Edit` component with an interactive render mode if users were allowed to edit a movie's thumbnail image. 

## Upload files to an external service

Instead of an app handling file upload bytes and the app's server receiving uploaded files, clients can directly upload files to an external service. The app can safely process the files from the external service on demand. This approach hardens the app and its server against malicious attacks and potential performance problems.

Consider an approach that uses [Azure Files](https://azure.microsoft.com/services/storage/files/), [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs/), or a third-party service with the following potential benefits:

* Upload files from the client directly to an external service with a JavaScript client library or REST API. For example, Azure offers the following client libraries and APIs:
  * [Azure Storage File Share client library](https://learn.microsoft.com/javascript/api/overview/azure/storage-file-share-readme)
  * [Azure Files REST API](https://learn.microsoft.com/rest/api/storageservices/file-service-rest-api)
  * [Azure Storage Blob client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/storage-blob-readme)
  * [Blob service REST API](https://learn.microsoft.com/rest/api/storageservices/blob-service-rest-api)
* Authorize user uploads with a user-delegated shared access signature (SAS) token generated by the app (server-side) for each client file upload. For example, Azure offers the following SAS features:
  * [Azure Storage File Share client library for JavaScript: with SAS Token](https://learn.microsoft.com/javascript/api/overview/azure/storage-file-share-readme#with-sas-token)
  * [Azure Storage Blob client library for JavaScript: with SAS Token](https://learn.microsoft.com/javascript/api/overview/azure/storage-blob-readme#with-sas-token)
* Provide automatic redundancy and file share backup.
* Limit uploads with quotas. Note that Azure Blob Storage's quotas are set at the account level, not the container level. However, Azure Files quotas are at the file share level and might provide better control over upload limits. For more information, see the Azure documents linked earlier in this list.
* Secure files with server-side encryption (SSE).

For more information on Azure Blob Storage and Azure Files, see the [Azure Storage documentation](https://learn.microsoft.com/azure/storage/).

## Server-side SignalR message size limit

File uploads may fail even before they start, when Blazor retrieves data about the files that exceeds the maximum SignalR message size.

SignalR defines a message size limit that applies to every message Blazor receives, and the [Microsoft.AspNetCore.Components.Forms.InputFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputFile) component streams files to the server in messages that respect the configured limit. However, the first message, which indicates the set of files to upload, is sent as a unique single message. The size of the first message may exceed the SignalR message size limit. The issue isn't related to the size of the files, it's related to the number of files.

The logged error is similar to the following:

> Error: Connection disconnected with error 'Error: Server returned an error on close: Connection closed with an error.'. e.log @ blazor.server.js\:1

When uploading files, reaching the message size limit on the first message is rare. If the limit is reached, the app can configure [Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize) with a larger value.

For more information on SignalR configuration and how to set [Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize), see [blazor/fundamentals/signalr#server-side-circuit-handler-options](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23server-side-circuit-handler-options).

## Maximum parallel invocations per client hub setting

Blazor relies on [Microsoft.AspNetCore.SignalR.HubOptions.MaximumParallelInvocationsPerClient%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.MaximumParallelInvocationsPerClient%252A) set to 1, which is the default value.

Increasing the value leads to a high probability that `CopyTo` operations throw `System.InvalidOperationException: 'Reading is not allowed after reader was completed.'`. For more information, see [MaximumParallelInvocationsPerClient > 1 breaks file upload in Blazor Server mode (`dotnet/aspnetcore` #53951)](https://github.com/dotnet/aspnetcore/issues/53951).

## Troubleshoot

The line that calls [Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A) throws a [System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException):

> System.TimeoutException: Did not receive any data in the allotted time.

Possible causes:

* Using the [Autofac Inversion of Control (IoC) container](https://autofac.org/) instead of the built-in ASP.NET Core dependency injection container in .NET 8 or earlier. To resolve the issue, set [Microsoft.AspNetCore.SignalR.HubOptions.DisableImplicitFromServicesParameters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.DisableImplicitFromServicesParameters%252A) to `true` in the [server-side circuit handler hub options](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23server-side-circuit-handler-options). For more information, see [FileUpload: Did not receive any data in the allotted time (`dotnet/aspnetcore` #38842)](https://github.com/dotnet/aspnetcore/issues/38842#issuecomment-1342540950).

* Not reading the stream to completion. This isn't a framework issue. Trap the exception and investigate it further in your local environment/network.

<!-- UPDATE 11.0 - Version the following out at 11.0 when the
                   the `LazyBrowserFileStream` class is dropped
                   because the underlying problem is fixed. -->

* Using server-side rendering and calling [Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream%252A) on multiple files before reading them to completion. To resolve the issue, use the `LazyBrowserFileStream` class and approach described in the [Upload files to a server with server-side rendering](#upload-files-to-a-server-with-server-side-rendering) section of this article.

## Additional resources

**Applies to: \>= aspnetcore-6.0**

* [blazor/file-downloads](file-downloads.md)
* [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations)
* [blazor/forms/index](forms/index.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))



**Applies to: < aspnetcore-6.0**

* [mvc/models/file-uploads#security-considerations](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Ffile-uploads%23security-considerations)
* [blazor/forms/index](forms/index.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))
