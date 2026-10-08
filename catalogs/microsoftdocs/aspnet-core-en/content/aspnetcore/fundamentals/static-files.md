---
title: Serve static files in ASP.NET Core apps
ai-usage: ai-assisted
author: wadepickett
description: Learn how to serve and secure static files and configure Map Static Assets endpoint conventions and static file middleware in ASP.NET Core web apps.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 09/23/2026
ms.reviewer: wpickett
uid: fundamentals/static-files
---
# Serve static files in ASP.NET Core apps

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


Learn how to serve, secure, and optimize static files in ASP.NET Core apps by using Map Static Assets endpoint conventions or static file middleware. Static files, also called static assets, aren't dynamically generated and are served directly to clients, including HTML, CSS, images, and JavaScript.

For Blazor static files guidance, which adds to or supersedes the guidance in this article, see [blazor/fundamentals/static-files](../blazor/fundamentals/static-files.md).

**Applies to: \>= aspnetcore-9.0**

To enable static file handling in ASP.NET Core, call [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A). 

By default, store static files within the project's [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) directory. The default directory is `{CONTENT ROOT}/wwwroot`, where the `{CONTENT ROOT}` placeholder is the app's [content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root). Only files in the `wwwroot` folder are addressable, so you don't need to worry about the rest of your code.

Only files with specific file extensions mapped to supported media types are treated as static web assets.

Static web assets are discovered at build time and optimized using content-based [fingerprinting](https://wikipedia.org/wiki/Fingerprint_(computing)) to prevent the reuse of old files. Assets are also [compressed](https://learn.microsoft.com/aspnet/core/performance/response-compression) to reduce asset delivery time.

At runtime, the discovered static web assets are exposed as endpoints with HTTP headers applied, such as [caching headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control) and content type headers. An asset is served once until the file changes or the browser clears its cache. The [`ETag`](https://developer.mozilla.org/docs/Web/HTTP/Headers/ETag), [`Last-Modified`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Last-Modified), and [`Content-Type`](https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Content-Type) headers are set. The browser is prevented from using stale assets after an app is updated.

Delivery of static assets is based on [endpoint routing](routing.md), so it works with other endpoint-aware features, such as authorization. It's designed to work with all UI frameworks, including Blazor, Razor Pages, and MVC.

Map Static Assets provides the following benefits:

* Build-time compression for all the assets in the app, including JavaScript (JS) and stylesheets but excluding image and font assets that are already compressed. [Gzip](https://tools.ietf.org/html/rfc1952) (`Content-Encoding: gz`) compression is used during development. Gzip and [Brotli](https://tools.ietf.org/html/rfc7932) (`Content-Encoding: br`) compression are both used during publish.
* [Fingerprinting](https://developer.mozilla.org/docs/Glossary/Fingerprinting) for all assets at build time with a [Base64](https://developer.mozilla.org/docs/Glossary/Base64)-encoded string of the [SHA-256](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256) hash of each file's content. This prevents reusing an old version of a file, even if the old file is cached. Fingerprinted assets are cached using the [`immutable` directive](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control#directives), which results in the browser never requesting the asset again until it changes. For browsers that don't support the `immutable` directive, a [`max-age` directive](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control#directives) is added.
  * Even if an asset isn't fingerprinted, content based `ETags` are generated for each static asset using the fingerprint hash of the file as the `ETag` value. This ensures that the browser only downloads a file if its content changes (or the file is being downloaded for the first time).
  * Internally, the framework maps physical assets to their fingerprints, which allows the app to:
    * Find automatically generated assets, such as Razor component scoped CSS for Blazor's [CSS isolation feature](../blazor/components/css-isolation.md) and JS assets described by [JS import maps](https://developer.mozilla.org/docs/Web/HTML/Element/script/type/importmap).
    * Generate link tags in the `<head>` content of the page to preload assets.

Map Static Assets doesn't provide features for minification or other file transformations. Minification is usually handled by custom code or [third-party tooling](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23community-links-to-blazor-resources).

> **Note:**
> [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) doesn't serve [default documents](#serve-default-documents) on its own. To serve default documents, call [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) followed by [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A). For more information, see the [Serve default documents](#serve-default-documents) section.



**Applies to: < aspnetcore-9.0**

To enable static file handling in ASP.NET Core, call [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A). 

By default, store static files within the project's [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) directory. The default directory is `{CONTENT ROOT}/wwwroot`, where the `{CONTENT ROOT}` placeholder is the app's [content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root). Only files in the `wwwroot` folder are addressable, so you don't need to worry about the rest of your code.

At runtime, static web assets are returned by static file middleware when requested with asset modification and content type headers applied. The [`ETag`](https://developer.mozilla.org/docs/Web/HTTP/Headers/ETag), [`Last-Modified`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Last-Modified), and [`Content-Type`](https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Content-Type) headers are set.

Static file middleware enables static file serving and is used by an app when [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) is called in the app's request processing pipeline. Files are served from the path specified in [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%252A) or [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider), which defaults to the web root folder, typically `wwwroot`.



You can also serve static web assets from [referenced projects and packages](https://learn.microsoft.com/search/?terms=razor-pages%2Fui-class%23consume-content-from-a-referenced-rcl). 

## Change the web root directory

To change the web root, use the [Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseWebRoot%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseWebRoot%252A) method. For more information, see [fundamentals/index#web-root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root).

Prevent publishing files in `wwwroot` by using the [`<Content>` project item](https://learn.microsoft.com/visualstudio/msbuild/common-msbuild-project-items#content) in the project file. The following example prevents publishing content in `wwwroot/local` and its subdirectories:

```xml
<ItemGroup>
  <Content Update="wwwroot\local\**\*.*" CopyToPublishDirectory="Never" />
</ItemGroup>
```

**Applies to: \>= aspnetcore-6.0**

The [Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder%252A) method sets the content root to the current directory:

```csharp
var builder = WebApplication.CreateBuilder(args);
```



**Applies to: < aspnetcore-6.0**

The [Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%252A) method sets the content root to the current directory:

```csharp
Host.CreateDefaultBuilder(args)
```



**Applies to: \>= aspnetcore-9.0**

In the request processing pipeline, after the call to [Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A), call [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) to enable serving static files from the app's [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root):

```csharp
app.MapStaticAssets();
```



**Applies to: < aspnetcore-9.0**

In the request processing pipeline, after the call to [Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A), call [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) to enable serving static files from the app's [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root):

```csharp
app.UseStaticFiles();
```



Static files are accessible via a path relative to the [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root). 

To access an image at `wwwroot/images/favicon.png`:

* URL format: `https://{HOST}/images/{FILE NAME}`
  * The `{HOST}` placeholder is the host.
  * The `{FILE NAME}` placeholder is the file name.
* Examples
  * Absolute URL: `https://localhost:5001/images/favicon.png`
  * Root relative URL: `images/favicon.png`

In a Blazor app, `images/favicon.png` loads the icon image (`favicon.png`) from the app's `wwwroot/images` folder:

```razor
<link rel="icon" type="image/png" href="images/favicon.png" />
```

In Razor Pages and MVC apps, the tilde character `~` points to the web root. In the following example, `~/images/favicon.png` loads the icon image (`favicon.png`) from the app's `wwwroot/images` folder:

```cshtml
<link rel="icon" type="image/png" href="~/images/favicon.png" />
```

**Applies to: \>= aspnetcore-9.0**

## Short-circuit the middleware pipeline

To avoid running the entire middleware pipeline after a static asset is matched, which is the behavior of [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A), call [Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit%252A) on [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A). Calling [Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit%252A) immediately executes the endpoint and returns the response, preventing other middleware from executing for static asset requests:

```csharp
app.MapStaticAssets().ShortCircuit();
```

## Control static file caching during development

When running in the `Development` environment, for example during [Visual Studio Hot Reload](https://learn.microsoft.com/visualstudio/debugger/hot-reload) development testing, the framework overrides cache headers to prevent browsers from caching static files. This behavior helps ensure that the latest version of files are used when files change, avoiding issues with stale content. In production, the framework sets the correct cache headers, so browsers can cache static assets as expected.

To disable this behavior, set `EnableStaticAssetsDevelopmentCaching` to `true` in the `Development` environment's app setting file (`appsettings.Development.json`).



## Static files in non-`Development` environments

When running an app locally, the `Development` environment is the only environment that enables static web assets. To enable static files for environments other than `Development` during local development and testing (for example, in the `Staging` environment), call [Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets%252A) on the [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder).

> **Warning:**
> Call [Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets%252A) for the ***exact environment*** to prevent activating the feature in production, as it serves files from separate locations on disk *other than from the project*. The example in this section checks for the `Staging` environment with [Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsStaging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsStaging%252A).

```csharp
if (builder.Environment.IsStaging())
{
    builder.WebHost.UseStaticWebAssets();
}
```

**Applies to: \>= aspnetcore-6.0**

## Serve files outside of the web root directory via `IWebHostEnvironment.WebRootPath`

When you set [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%252A) to a folder other than `wwwroot`, the app exhibits the following default behaviors:

* In the `Development` environment, static assets are served from `wwwroot` if assets with the same name are in both `wwwroot` and a different folder assigned to [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%252A).
* In any environment other than `Development`, duplicate static assets are served from the [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%252A) folder.

Consider a web app created from the empty web template:

* Containing an `Index.html` file in `wwwroot` and `wwwroot-custom`.
* The `Program` file is updated to set `WebRootPath = "wwwroot-custom"`.

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = "wwwroot-custom"
});
```

By default, for requests to `/`:

* In the `Development` environment, `wwwroot/Index.html` is returned.
* In any environment other than `Development`, `wwwroot-custom/Index.html` is returned.

To ensure assets from `wwwroot-custom` are always returned, use ***one*** of the following approaches:

* Delete duplicate-named assets in `wwwroot`.

* Set `ASPNETCORE_ENVIRONMENT` in `Properties/launchSettings.json` to any value other than `Development`.

* Disable static web assets by setting `<StaticWebAssetsEnabled>` to `false` in the app's project file. ***WARNING:*** Disabling static web assets disables [Razor class libraries](../razor-pages/ui-class.md).

* Add the following XML to the project file:

  ```xml
  <ItemGroup>
    <Content Remove="wwwroot\**" />
  </ItemGroup>
  ```

The following code updates [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%252A) to a non-Development value (`Staging`), guaranteeing duplicate content is returned from `wwwroot-custom` rather than `wwwroot`:

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    EnvironmentName = Environments.Staging,
    WebRootPath = "wwwroot-custom"
});
```



**Applies to: \>= aspnetcore-9.0**

## Static file middleware

Static file middleware enables static file serving in specific static files scenarios, usually in addition to Map Static Assets endpoint routing conventions ([Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A)).

Include static file middleware in request processing when you call [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) in the app's request processing pipeline, typically after adding Map Static Assets endpoint conventions ([Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A)).

Use Map Static Assets endpoint conventions in apps that target .NET 9 or later. Use static file middleware in apps that target versions of .NET prior to .NET 9.

Static file middleware serves static files, but it doesn't provide the same level of optimization as Map Static Assets endpoint conventions. The build-time compression and fingerprinting features of Map Static Assets endpoint conventions aren't available when you rely only on static file middleware.

The endpoint conventions are optimized for serving assets that the app knows about at runtime. If the app serves assets from other locations, such as disk or embedded resources, use static file middleware.

The following features covered in this article are supported with static file middleware but not with Map Static Assets endpoint conventions:

* [Serve files outside of the web root directory](#serve-files-outside-of-the-web-root-directory-via-usestaticfiles)
* [Set HTTP response headers](#set-http-response-headers)
* [Serving files from disk or embedded resources, or other locations](#serve-files-from-multiple-locations)
* [Directory browsing](#directory-browsing)
* [Serve default documents](#serve-default-documents) (with [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A), requires a call to [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A))
* [Combine static files, default documents, and directory browsing](#combine-static-files-default-documents-and-directory-browsing)
* [Map file extensions to MIME types](#map-file-extensions-to-mime-types)
* [Serving non-standard content types](#non-standard-content-types)



## Serve files outside of the web root directory via `UseStaticFiles`

Consider the following directory hierarchy with static files residing outside of the app's [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) in a folder named `ExtraStaticFiles`:

* `wwwroot`
  * `css`
  * `images`
  * `js`
* `ExtraStaticFiles`
  * `images`
    * `red-rose.jpg`

A request can access `red-rose.jpg` by configuring a new instance of static file middleware:

Namespaces for the following API:

```csharp
using Microsoft.Extensions.FileProviders;
```

In the request processing pipeline, after the existing call to either [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) (.NET 9 or later) or [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) (.NET 8 or earlier):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles")),
    RequestPath = "/static-files"
});
```

In the preceding code, the `ExtraStaticFiles` directory hierarchy is publicly accessible through the `static-files` URL segment. A request to `https://{HOST}/StaticFiles/images/red-rose.jpg`, where the `{HOST}` placeholder is the host, serves the `red-rose.jpg` file.

The following markup references `ExtraStaticFiles/images/red-rose.jpg`:

```html
<img src="static-files/images/red-rose.jpg" alt="A red rose" />
```

For the preceding example, Razor Pages and MVC views support tilde-slash notation (`src="~/StaticFiles/images/red-rose.jpg"`), but Razor components in Blazor apps don't support this notation.

## Serve files from multiple locations

**Applies to: \>= aspnetcore-6.0**

*The guidance in this section applies to Razor Pages and MVC apps. For guidance that applies to Blazor Web Apps, see [blazor/fundamentals/static-files#serve-files-from-multiple-locations](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstatic-files%23serve-files-from-multiple-locations).*

Consider the following markup that displays a company logo:

```html
<img src="~/logo.png" asp-append-version="true" alt="Company logo">
```

The developer intends to use the [Image Tag Helper](../mvc/views/tag-helpers/built-in/image-tag-helper.md) to append a version and serve the file from a custom location, a folder named `ExtraStaticFiles`.



**Applies to: \>= aspnetcore-9.0**

The following example calls [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) to serve files from `wwwroot` and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) to serve files from `ExtraStaticFiles`:

In the request processing pipeline, after the existing call to either [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) (.NET 9 or later) or [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) (.NET 8 or earlier):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles"))
});
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

The following example calls [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) twice to serve files from both `wwwroot` and `ExtraStaticFiles`.

In the request processing pipeline, after the existing call to [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles"))
});
```



**Applies to: \>= aspnetcore-6.0**

Using the preceding code, the `ExtraStaticFiles/logo.png` file is displayed. However, the [Image Tag Helper](../mvc/views/tag-helpers/built-in/image-tag-helper.md) ([Microsoft.AspNetCore.Mvc.TagHelpers.ImageTagHelper.AppendVersion](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.ImageTagHelper.AppendVersion)) isn't applied because the Tag Helper depends on [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider), which hasn't been updated to include the `ExtraStaticFiles` folder.

The following code updates the [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider) to include the `ExtraStaticFiles` folder by using a [Microsoft.Extensions.FileProviders.CompositeFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.CompositeFileProvider). This enables the Image Tag Helper to apply a version to images in the `ExtraStaticFiles` folder.

Namespace for the following API:

```csharp
using Microsoft.Extensions.FileProviders;
```

In the request processing pipeline before the existing call to [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) (.NET 9 or later) or [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) (.NET 8 or earlier):

```csharp
var webRootProvider = new PhysicalFileProvider(builder.Environment.WebRootPath);
var newPathProvider = new PhysicalFileProvider(
    Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles"));

var compositeProvider = new CompositeFileProvider(webRootProvider, newPathProvider);

app.Environment.WebRootFileProvider = compositeProvider;
```



[Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) and [Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%252A) default to the file provider pointing at `wwwroot`. You can provide additional instances of [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) and [Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%252A) with other file providers to serve files from other locations. For more information, see [UseStaticFiles still needed with UseFileServer for wwwroot (`dotnet/AspNetCore.Docs` #15578)](https://github.com/dotnet/AspNetCore.Docs/issues/15578).

## Set HTTP response headers

Use [Microsoft.AspNetCore.Builder.StaticFileOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileOptions) to set HTTP response headers. In addition to configuring static file middleware to serve static files, the following code sets the [`Cache-Control` header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control) to 604,800 seconds (one week).

Namespaces for the following API:

```csharp
using Microsoft.AspNetCore.Http;
```

In the request processing pipeline, after the existing call to either [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) (.NET 9 or later) or [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) (.NET 8 or earlier):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append(
            "Cache-Control", "public, max-age=604800");
    }
});
```

## Large collection of assets

When you deal with large collections of assets, which is around 1,000 or more assets, use a bundler to reduce the final number of assets your app serves or combine [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) with [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A).

[Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) eagerly loads the precomputed metadata captured during the build process for the resources in order to support compression, caching, and fingerprinting. These features come at the cost of greater memory usage by the app. For assets that are frequently accessed, it's usually worth the costs. For assets that aren't frequently accessed, the trade-off might not be worth the costs.

If you don't use bundling, combine [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) with [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A). The following example demonstrates the approach.

In the project file (`.csproj`), the `StaticWebAssetEndpointExclusionPattern` MSBuild property is used to filter endpoints from the final manifest for [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A). Excluded files are served by [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) and don't benefit from compression, caching, and fingerprinting.

To keep the framework's default exclusion pattern, retain `$(StaticWebAssetEndpointExclusionPattern)` when setting the value of `StaticWebAssetEndpointExclusionPattern`. Add more patterns in a semicolon-separated list.

In the following example, the exclusion pattern adds the static files in the `lib/icons` folder, which represents a hypothetical batch of icons:

```xml
<StaticWebAssetEndpointExclusionPattern>
  $(StaticWebAssetEndpointExclusionPattern);lib/icons/**
</StaticWebAssetEndpointExclusionPattern>
```

After HTTPS redirection middleware (`app.UseHttpsRedirection();`) processing in the `Program` file:

* Call [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) to handle the excluded files (`lib/icons/**`) and any other files not covered by [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A).
* Call [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) after [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) to handle critical application files (CSS, JS, images).

```csharp
app.UseStaticFiles();

app.UseAuthorization();

app.MapStaticAssets();
```

**Applies to: \>= aspnetcore-9.0**

## Static assets manifest

[Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) serves assets from a *static assets manifest* rather than by scanning the [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) at runtime. The manifest is generated at build and publish time and records the static web assets discovered for the app, along with metadata such as content fingerprints, `Content-Type` headers, caching headers, and the precomputed compressed representations ([Gzip](https://tools.ietf.org/html/rfc1952) and [Brotli](https://tools.ietf.org/html/rfc7932)). At runtime, `MapStaticAssets` reads the manifest, registers an endpoint for each asset, and serves the optimized responses.

The build process generates the manifest in the build output directory. Its file name is based on the project's assembly name (for example, `{ASSEMBLY NAME}.staticwebassets.endpoints.json`, where the `{ASSEMBLY NAME}` placeholder is the app's MSBuild `AssemblyName` value). To provide a manifest from a different location, see the [Provide a custom static files manifest](#provide-a-custom-static-files-manifest) section.

Because `MapStaticAssets` only serves assets listed in the manifest, it doesn't serve files that aren't part of the manifest. Files aren't part of the manifest when they're:

* Located outside the build-time web root, such as files served from disk, embedded resources, or a custom [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%252A) set at runtime.
* Excluded from the manifest with the `StaticWebAssetEndpointExclusionPattern` MSBuild property (see the [Large collection of assets](#large-collection-of-assets) section).

To serve files that aren't in the manifest, call [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A), which serves files directly from the web root at runtime. This is also why serving [default documents](#serve-default-documents) with `MapStaticAssets` requires a call to `UseStaticFiles`.

## Integrate build-generated files into static web assets

Build tools, such as TypeScript compilers and JavaScript bundlers, often produce files during the build. To serve these generated files with the fingerprinting, compression, and caching that [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) provides, the files must be discovered as static web assets during the build. Generated files are usually kept outside of the [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) (`wwwroot`) and excluded from source control, so they aren't discovered as static web assets by default. Only files resolved as being under `wwwroot` when static web assets are resolved during the build are added to the [static assets manifest](#static-assets-manifest) and served by `MapStaticAssets`. Files linked into `wwwroot` (for example, with a `<Content>` item and a `Link`) are also included, even when the source file is stored outside of `wwwroot`.

To include build-generated files as static web assets, use either of the following approaches.

### Link generated files into the web root

Add a [`<Content>` item](https://learn.microsoft.com/visualstudio/msbuild/common-msbuild-project-items#content) with a `Link` that places each generated file under `wwwroot`. A file that's linked into `wwwroot` is discovered by the static web assets pipeline and served by `MapStaticAssets` with fingerprinting, compression, and caching, even though the source file is stored outside of `wwwroot`.

In the following example, a build step generates `main.js` in a `generated` folder, and the `<Content>` item links the file into `wwwroot`:

```xml
<ItemGroup>
  <Content Include="generated\main.js" Link="wwwroot\main.js"
    CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```

The generated file must exist when the build process resolves static web assets.

### Use a JavaScript project for complex build pipelines

For a complex JavaScript or TypeScript client build, use a separate JavaScript project that builds the client assets with the [JavaScript project system](https://learn.microsoft.com/visualstudio/javascript/javascript-project-system-msbuild-reference) (the `Microsoft.VisualStudio.JavaScript.Sdk` MSBuild SDK and an `.esproj` project file). Reference the JavaScript project from the ASP.NET Core app so that its output is consumed as static web assets. For an example, see the [`Microsoft.FluentUI.AspNetCore.Components.Assets.esproj` project file (`microsoft/fluentui-blazor` GitHub repository)](https://github.com/microsoft/fluentui-blazor/blob/dev/src/Core.Assets/Microsoft.FluentUI.AspNetCore.Components.Assets.esproj).



## Static file authorization

**Applies to: \>= aspnetcore-9.0**

When an app adopts a [fallback authorization policy](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23default-and-fallback-policies), it requires authorization for requests processed by authorization middleware when no policy is produced from authorization metadata. This requirement includes requests for static assets mapped as endpoints. To allow anonymous access to static assets, apply [Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute) to the endpoint builder:

```csharp
app.MapStaticAssets().Add(endpointBuilder => 
    endpointBuilder.Metadata.Add(new AllowAnonymousAttribute()));
```



**Applies to: < aspnetcore-9.0**

When an app adopts a [fallback authorization policy](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23default-and-fallback-policies), authorization is required for requests processed by authorization middleware when no policy is produced from authorization metadata. The ASP.NET Core templates allow anonymous access to static files by calling [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) before calling [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A). Most apps follow this pattern. When the static file middleware is called before the authorization middleware:

* No authorization checks are performed on the static files.
* Static files served by the static file middleware, such as those in the web root (typically, `wwwroot`), are publicly accessible.



To serve static files based on authorization:

* Confirm that the app sets the [fallback authorization policy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy) to require authenticated users.
* Store the static file outside of the app's web root.
* After calling [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A), call [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A), specifying the path to the static files folder outside of the web root.

**Applies to: \>= aspnetcore-6.0**

Namespaces for the following API:

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.FileProviders;
```

Service registration:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});
```

In the request processing pipeline after the call to [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "SecureStaticFiles")),
    RequestPath = "/static-files"
});
```



**Applies to: < aspnetcore-6.0**

Namespaces for the following API:

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.FileProviders;
```

In `Startup.ConfigureServices`:

```csharp
services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});
```

In `Startup.Configure` after the call to [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(env.ContentRootPath, "SecureStaticFiles")),
    RequestPath = "/static-files"
});
```



In the preceding code, the fallback authorization policy requires authenticated users. Endpoints that specify authorization requirements use the policy produced from their authorization metadata instead of the fallback policy. For complete policy selection rules, see [security/authorization/policies#default-and-fallback-policies](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23default-and-fallback-policies).

[Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser%252A) adds [Microsoft.AspNetCore.Authorization.Infrastructure.DenyAnonymousAuthorizationRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.Infrastructure.DenyAnonymousAuthorizationRequirement) to the current instance, which enforces that the current user is authenticated.

Static assets stored in the app's web root are publicly accessible because the default static file middleware ([Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A)) is called before [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A). Static assets in the `SecureStaticFiles` folder require authentication.

An alternative approach to serve files based on authorization is to:

* Store the files outside of the web root and any directory accessible to static file middleware.
* Serve the files via an action method to which authorization is applied and return a [Microsoft.AspNetCore.Mvc.FileResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FileResult) object.

From a Razor page (`Pages/BannerImage.cshtml.cs`):

```csharp
public class BannerImageModel : PageModel
{
    private readonly IWebHostEnvironment _env;

    public BannerImageModel(IWebHostEnvironment env) => _env = env;

    public PhysicalFileResult OnGet()
    {
        var filePath = Path.Combine(
            _env.ContentRootPath, "SecureStaticFiles", "images", "red-rose.jpg");

        return PhysicalFile(filePath, "image/jpeg");
    }
}
```

From a controller (`Controllers/HomeController.cs`):

```csharp
[Authorize]
public IActionResult BannerImage()
{
    var filePath = Path.Combine(
        _env.ContentRootPath, "SecureStaticFiles", "images", "red-rose.jpg");

    return PhysicalFile(filePath, "image/jpeg");
}
```

The preceding approach requires a page or endpoint per file.

The following route endpoint example returns files for authenticated users.

**Applies to: \>= aspnetcore-6.0**

In the `Program` file:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AuthenticatedUsers", b => b.RequireAuthenticatedUser());
});

...

app.MapGet("/files/{fileName}", IResult (string fileName) => 
{
    var filePath = GetOrCreateFilePath(fileName);

    if (File.Exists(filePath))
    {
        return TypedResults.PhysicalFile(filePath, fileName);
    }

    return TypedResults.NotFound("No file found with the supplied file name");
})
.WithName("GetFileByName")
.RequireAuthorization("AuthenticatedUsers");
```

The following route endpoint example uploads files for authenticated users in the administrator role (`admin`).

In the `Program` file:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminsOnly", b => b.RequireRole("admin"));
});

...

// IFormFile uses memory buffer for uploading. For handling large 
// files, use streaming instead. See the *File uploads* article
// in the ASP.NET Core documentation:
// https://learn.microsoft.com/aspnet/core/mvc/models/file-uploads
app.MapPost("/files", async (IFormFile file, LinkGenerator linker, 
    HttpContext context) =>
{
    // Don't rely on the value in 'file.FileName', as it's only metadata that can 
    // be manipulated by the end-user. Consider the 'Utilities.IsFileValid' method 
    // that takes an 'IFormFile' and validates its signature within the 
    // 'AllowedFileSignatures'.
    
    var fileSaveName = Guid.NewGuid().ToString("N") + 
        Path.GetExtension(file.FileName);
    await SaveFileWithCustomFileName(file, fileSaveName);
    
    context.Response.Headers.Append("Location", linker.GetPathByName(context, 
        "GetFileByName", new { fileName = fileSaveName}));

    return TypedResults.Ok("File Uploaded Successfully!");
})
.RequireAuthorization("AdminsOnly");
```



**Applies to: < aspnetcore-6.0**

In `Startup.ConfigureServices`:

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("AuthenticatedUsers", b => b.RequireAuthenticatedUser());
});
```

In `Startup.Configure`:

```csharp
app.MapGet("/files/{fileName}", IResult (string fileName) => 
{
    var filePath = GetOrCreateFilePath(fileName);

    if (File.Exists(filePath))
    {
        return TypedResults.PhysicalFile(filePath, fileName);
    }

    return TypedResults.NotFound("No file found with the supplied file name");
})
.WithName("GetFileByName")
.RequireAuthorization("AuthenticatedUsers");
```

The following code uploads files for authenticated users in the administrator role (`admin`).

In `Startup.ConfigureServices`:

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("AdminsOnly", b => b.RequireRole("admin"));
});
```

In `Startup.Configure`:

```csharp
// IFormFile uses memory buffer for uploading. For handling large 
// files, use streaming instead. See the *File uploads* article
// in the ASP.NET Core documentation:
// https://learn.microsoft.com/aspnet/core/mvc/models/file-uploads
app.MapPost("/files", async (IFormFile file, LinkGenerator linker, 
    HttpContext context) =>
{
    // Don't rely on the value in 'file.FileName', as it's only metadata that can 
    // be manipulated by the end-user. Consider the 'Utilities.IsFileValid' method 
    // that takes an 'IFormFile' and validates its signature within the 
    // 'AllowedFileSignatures'.
    
    var fileSaveName = Guid.NewGuid().ToString("N") + 
        Path.GetExtension(file.FileName);
    await SaveFileWithCustomFileName(file, fileSaveName);
    
    context.Response.Headers.Append("Location", linker.GetPathByName(context, 
        "GetFileByName", new { fileName = fileSaveName}));

    return TypedResults.Ok("File Uploaded Successfully!");
})
.RequireAuthorization("AdminsOnly");
```



## Directory browsing

Directory browsing allows directory listing within specified directories.

For security reasons, directory browsing is disabled by default. For more information, see [Security considerations for static files](#security-considerations-for-static-files).

Enable directory browsing by using the following APIs:

* [Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser%252A)
* [Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%252A)

In the following example:

* An `images` folder at the root of the app holds images for directory browsing.
* The request path to browse the images is `/DirectoryImages`.
* Calling [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) and setting the [Microsoft.AspNetCore.StaticFiles.Infrastructure.SharedOptionsBase.FileProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.StaticFiles.Infrastructure.SharedOptionsBase.FileProvider%252A) of [Microsoft.AspNetCore.Builder.StaticFileOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileOptions) enables displaying browser links to the individual files.

**Applies to: \>= aspnetcore-6.0**

Namespaces for the following API:

```csharp
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
```

Service registration:

```csharp
builder.Services.AddDirectoryBrowser();
```

In the request processing pipeline, after the existing call to either [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) (.NET 9 or later) or [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) (.NET 8 or earlier):

```csharp
var fileProvider = new PhysicalFileProvider(
    Path.Combine(builder.Environment.WebRootPath, "images"));
var requestPath = "/DirectoryImages";

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = fileProvider,
    RequestPath = requestPath
});

app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
    FileProvider = fileProvider,
    RequestPath = requestPath
});
```



**Applies to: < aspnetcore-6.0**

Namespaces for the following API:

```csharp
using Microsoft.Extensions.FileProviders;
using System.IO;
```

In `Startup.ConfigureServices`:

```csharp
services.AddDirectoryBrowser();
```

In `Startup.Configure` after the existing call to [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(env.WebRootPath, "images")),
    RequestPath = "/DirectoryImages"
});

app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(env.WebRootPath, "images")),
    RequestPath = "/DirectoryImages"
});
```



The preceding code allows directory browsing of the `wwwroot/images` folder using the URL `https://{HOST}/DirectoryImages` with links to each file and folder, where the `{HOST}` placeholder is the host.

**Applies to: \>= aspnetcore-6.0**

[Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser%252A) adds services required by the directory-browsing middleware, including [System.Text.Encodings.Web.HtmlEncoder](https://learn.microsoft.com/search/?terms=System.Text.Encodings.Web.HtmlEncoder). These services might be added by other calls, such as [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%252A), but call [Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser%252A) to ensure the services are added.



## Serve default documents

Setting a default page provides visitors a starting point on a site. To serve a default file from `wwwroot` without requiring the request URL to include the file's name, call the [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) method.

[Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) is a URL rewriter that doesn't serve the file. It rewrites the request URL to the default document (for example, `/` to `/index.html`), and another component serves the file.

**Applies to: \>= aspnetcore-9.0**

Because [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) serves assets discovered at build time through endpoint routing, it doesn't serve default documents on its own. Call [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) to rewrite the request, followed by [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) to serve the rewritten request for the default document:

```csharp
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapStaticAssets();
```

> **Important:**
> Configuring only [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) and [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) (without [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A)) returns a *404 - Not Found* response for a request to `/`. This behavior occurs because minimal hosting adds routing middleware at the start of the request processing pipeline, so endpoint routing matches the request before `UseDefaultFiles` rewrites it to the default document. The problem is especially apparent when you change the [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root) to a custom path with [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath%252A), because files in a custom web root aren't part of the [build-time static assets manifest](#static-assets-manifest) that `MapStaticAssets` serves. Add a call to `UseStaticFiles` after `UseDefaultFiles`, as shown in the preceding example, to serve default documents.



**Applies to: < aspnetcore-9.0**

In the request processing pipeline before the existing call to [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

```csharp
app.UseDefaultFiles();
```



With [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A), requests to a folder in `wwwroot` search for:

* `default.htm`
* `default.html`
* `index.htm`
* `index.html`

The first file found from the list is served as though the request included the file's name. The browser URL continues to reflect the URI requested.

The following code changes the default file name to `default-document.html`:

```csharp
var options = new DefaultFilesOptions();
options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("default-document.html");
app.UseDefaultFiles(options);
```

## Combine static files, default documents, and directory browsing

[Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%252A) combines the functionality of [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A), [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A), and optionally [Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%252A).

In the request processing pipeline, after the existing call to either [Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) (.NET 9 or later) or [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) (.NET 8 or earlier), call [Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%252A) to enable the serving of static files and the default file:

```csharp
app.UseFileServer();
```

Directory browsing isn't enabled for the preceding example.

The following code enables the serving of static files, the default file, and directory browsing.

**Applies to: \>= aspnetcore-6.0**

Service registration:

```csharp
builder.Services.AddDirectoryBrowser();
```

In the request processing pipeline, after the existing call to [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

```csharp
app.UseFileServer(enableDirectoryBrowsing: true);
```



**Applies to: < aspnetcore-6.0**

In `Startup.ConfigureServices`:

```csharp
services.AddDirectoryBrowser();
```

In `Startup.Configure` after the existing call to [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

```csharp
app.UseFileServer(enableDirectoryBrowsing: true);
```



For the host address (`/`), [Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer%252A) returns the default HTML document before the default Razor Page (`Pages/Index.cshtml`) or default MVC view (`Home/Index.cshtml`).

Consider the following directory hierarchy:

* `wwwroot`
  * `css`
  * `images`
  * `js`
* `ExtraStaticFiles`
  * `images`
    * `logo.png`
  * `default.html`

The following code enables the serving of static files, the default file, and directory browsing of `ExtraStaticFiles`.

**Applies to: \>= aspnetcore-6.0**

Namespaces for the following API:

```csharp
using Microsoft.Extensions.FileProviders;
```

Service registration:

```csharp
builder.Services.AddDirectoryBrowser();
```

In the request processing pipeline, after the existing call to [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

```csharp
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles")),
    RequestPath = "/static-files",
    EnableDirectoryBrowsing = true
});
```



**Applies to: < aspnetcore-6.0**

Namespaces for the following API:

```csharp
using Microsoft.Extensions.FileProviders;
using System.IO;
```

In `Startup.ConfigureServices`:

```csharp
services.AddDirectoryBrowser();
```

In `Startup.Configure` after the existing call to [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

```csharp
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(env.ContentRootPath, "ExtraStaticFiles")),
    RequestPath = "/static-files",
    EnableDirectoryBrowsing = true
});
```



[Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser%252A) must be called when the `EnableDirectoryBrowsing` property value is `true`.

Using the preceding file hierarchy and code, URLs resolve as shown in the following table (the `{HOST}` placeholder is the host).

| URI | Response file |
| --- | --- |
| `https://{HOST}/static-files/images/logo.png` | `ExtraStaticFiles/images/logo.png` |
| `https://{HOST}/static-files` | `ExtraStaticFiles/default.html` |

If no default-named file exists in the `ExtraStaticFiles` directory, `https://{HOST}/static-files` returns the directory listing with clickable links, where the `{HOST}` placeholder is the host.

[Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) and [Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%252A) perform a client-side redirect from the target URI without a trailing `/` to the target URI with a trailing `/`. For example, from `https://{HOST}/static-files` (no trailing `/`) to `https://{HOST}/static-files/` (includes a trailing `/`). Relative URLs within the `ExtraStaticFiles` directory are invalid without a trailing slash (`/`) unless the [Microsoft.AspNetCore.StaticFiles.Infrastructure.SharedOptions.RedirectToAppendTrailingSlash](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.StaticFiles.Infrastructure.SharedOptions.RedirectToAppendTrailingSlash) option of [Microsoft.AspNetCore.Builder.DefaultFilesOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesOptions) is used.

## Map file extensions to MIME types

**Applies to: < aspnetcore-8.0**

> **Note:**
> For guidance that applies to Blazor apps, see [blazor/fundamentals/static-files#file-mappings-and-static-file-options](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstatic-files%23file-mappings-and-static-file-options).



Use [Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider.Mappings%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider.Mappings%252A) to add or modify file extension to MIME content type mappings.

> **Note:**
> [Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider) is **not thread-safe** for concurrent writes. Its internal mappings dictionary is a standard `Dictionary<string, string>` without synchronization. The provider's mappings are intended to be configured once at startup. If only read operations (lookups) are performed afterward, the provider can safely be registered as a singleton. Do not add, remove, or modify mappings after the provider is in use by concurrent requests.

In the following example, several file extensions are mapped to known MIME types. The `.rtf` extension is replaced, and `.mp4` is removed:

**Applies to: \>= aspnetcore-6.0**

```csharp
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

...

// Set up custom content types - associating file extension to MIME type
var provider = new FileExtensionContentTypeProvider();
// Add new mappings
provider.Mappings[".myapp"] = "application/x-msdownload";
provider.Mappings[".htm3"] = "text/html";
provider.Mappings[".image"] = "image/png";
// Replace an existing mapping
provider.Mappings[".rtf"] = "application/x-msdownload";
// Remove MP4 videos
provider.Mappings.Remove(".mp4");

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});
```

When you have several static file options to configure, you can alternatively set the provider by using [Microsoft.AspNetCore.Builder.StaticFileOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileOptions):

```csharp
var provider = new FileExtensionContentTypeProvider();

...

builder.Services.Configure<StaticFileOptions>(options =>
{
    options.ContentTypeProvider = provider;
});

app.UseStaticFiles();
```



**Applies to: < aspnetcore-6.0**

In `Startup.Configure`:

```csharp
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using System.IO;

...

// Set up custom content types - associating file extension to MIME type
var provider = new FileExtensionContentTypeProvider();
// Add new mappings
provider.Mappings[".myapp"] = "application/x-msdownload";
provider.Mappings[".htm3"] = "text/html";
provider.Mappings[".image"] = "image/png";
// Replace an existing mapping
provider.Mappings[".rtf"] = "application/x-msdownload";
// Remove MP4 videos
provider.Mappings.Remove(".mp4");

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(env.WebRootPath, "images")),
    RequestPath = "/images",
    ContentTypeProvider = provider
});

app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(env.WebRootPath, "images")),
    RequestPath = "/images"
});
```



For more information, see [MIME content types](https://www.iana.org/assignments/media-types/media-types.xhtml).

## Non-standard content types

The static file middleware recognizes almost 400 known file content types. If the user requests a file with an unknown file type, the static file middleware passes the request to the next middleware in the pipeline. If no middleware handles the request, the server returns a *404 Not Found* response. If directory browsing is enabled, the server displays a link to the file in a directory listing.

The following code enables serving unknown content types and renders the unknown file as an image:

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    DefaultContentType = "image/png"
});
```

With the preceding code, a request for a file with an unknown content type is returned as an image.

> **Warning:**
> Enabling [Microsoft.AspNetCore.Builder.StaticFileOptions.ServeUnknownFileTypes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileOptions.ServeUnknownFileTypes) is a security risk. It's disabled by default, and its use is discouraged. [Map file extensions to MIME types](#map-file-extensions-to-mime-types) provides a safer alternative to serving files with nonstandard extensions.

**Applies to: \>= aspnetcore-9.0**

## Provide a custom static files manifest

If [`staticAssetsManifestPath`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) is `null`, the [Microsoft.Extensions.Hosting.IHostEnvironment.ApplicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.ApplicationName%252A) is used to locate the manifest. Alternatively, specify a full path to the manifest file. If you use a relative path, the framework searches for the file in the [System.AppContext.BaseDirectory%2A](https://learn.microsoft.com/search/?terms=System.AppContext.BaseDirectory%252A).



## Security considerations for static files

> **Warning:**
> [Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%252A) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) can leak secrets. Disabling directory browsing in production is highly recommended. Carefully review which directories are enabled via [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) or [Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%252A). The entire directory and its sub-directories become publicly accessible. Store files suitable for serving to the public in a dedicated directory, such as `<content_root>/wwwroot`. Separate these files from MVC views, Razor Pages, configuration files, etc.

* The URLs for content exposed through [Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser%252A) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A) follow the case sensitivity and character restrictions of the underlying file system. For example, Windows is case insensitive, but macOS and Linux aren't.

* ASP.NET Core apps hosted in IIS use the [ASP.NET Core Module](../host-and-deploy/aspnet-core-module.md) to forward all requests to the app, including static file requests. The IIS static file handler isn't used and doesn't handle requests.

* Complete the following steps in IIS Manager to remove the IIS static file handler at the server or website level:

  1. Navigate to the **Modules** feature.
  1. Select **StaticFileModule** in the list.
  1. Click **Remove** in the **Actions** sidebar.

  > **Warning:**
  > If the IIS static file handler is enabled **and** the ASP.NET Core Module is configured incorrectly, static files are served. This condition occurs, for example, if the `web.config` file isn't deployed.

* Place code files, including `.cs` and `.cshtml`, outside of the app project's [web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root). This configuration creates a logical separation between the app's client-side content and server-based code. This separation prevents server-side code from being leaked.

**Applies to: \>= aspnetcore-9.0**

## MSBuild properties

The following tables show the static files MSBuild properties and metadata descriptions.

| Property | Description |
| --- | --- |
| `EnableDefaultCompressedItems` | Enables default compression include and exclude patterns. |
| `CompressionIncludePatterns` | Semicolon-separated list of file patterns to include for compression. |
| `CompressionExcludePatterns` | Semicolon-separated list of file patterns to exclude from compression. See the example below. |
| `CompressionEnabled` | Completely disables static asset compression when set to `false`. See the example below. |
| `EnableDefaultCompressionFormats` | Enables default compression formats (Gzip and Brotli). |
| `BuildCompressionFormats` | Compression formats to use during build. |
| `PublishCompressionFormats` | Compression formats to use during publish. |
| `DisableBuildCompression` | Disables compression during build. |
| `CompressDiscoveredAssetsDuringBuild` | Compresses discovered assets during build. |
| `BrotliCompressionLevel` | Compression level for the Brotli algorithm. |
| `StaticWebAssetBuildCompressAllAssets` | Compresses all assets during build, not just assets discovered or computed during a build. |
| `StaticWebAssetPublishCompressAllAssets` | Compresses all assets during publish, not just assets discovered or computed during a build. |

The following example excludes JavaScript files from compression:

```xml
<PropertyGroup>
  <CompressionExcludePatterns>$(CompressionExcludePatterns);**\*.js</CompressionExcludePatterns>
</PropertyGroup>
```

To completely disable static asset compression:

```xml
<PropertyGroup>
  <CompressionEnabled>false</CompressionEnabled>
</PropertyGroup>
```

| Property | Description |
| --- | --- |
| `StaticWebAssetBasePath` | Base URL path for all the assets in a library. |
| `StaticWebAssetsFingerprintContent` | Enables content fingerprinting for cache busting. |
| `StaticWebAssetFingerprintingEnabled` | Enables fingerprinting feature for static web assets. |
| `StaticWebAssetsCacheDefineStaticWebAssetsEnabled` | Enables caching for static web asset definitions. |
| `StaticWebAssetEndpointExclusionPattern` | Pattern for excluding endpoints. |

Item group | Description | Metadata
--- | ---
`StaticWebAssetContentTypeMapping` | Maps file patterns to content types and cache headers for endpoints. | `Pattern`, `Cache`, `Priority`
`StaticWebAssetFingerprintPattern` | Defines patterns for applying fingerprints to static web assets for cache busting. | `Pattern`, `Expression`

Metadata descriptions:

* **`Pattern`**: A glob pattern used to match files. For `StaticWebAssetContentTypeMapping`, it matches files to determine their content type (for example, `*.js` for JavaScript files). For `StaticWebAssetFingerprintPattern`, it identifies multi-extension files that require special fingerprinting treatment (for example, `*.lib.module.js`).

* **`Cache`**: Specifies the `Cache-Control` header value for the matched content type. This value controls browser caching behavior (for example, `max-age=3600, must-revalidate` for media files).

* **`Priority`**: Controls precedence when multiple `StaticWebAssetContentTypeMapping` items match the same file. Higher numeric values take precedence over lower ones. `Priority` is required.

* **`Expression`**: Defines how the fingerprint is inserted into the filename. The default is `#[.{FINGERPRINT}]`, which inserts the fingerprint (`{FINGERPRINT}` placeholder) before the extension.

The following example maps the bitmap file pattern (`.bmp`) to the `image/bmp` content type with the `{CACHE HEADER}` placeholder representing the `Cache-Control` header to use for non-fingerprinted endpoints:

```xml
<ItemGroup>
  <StaticWebAssetContentTypeMapping Include="image/bmp" Cache="{CACHE HEADER}"
    Pattern="*.bmp" Priority="1" />
</ItemGroup>
```

## Runtime configuration options

The following table describes the runtime configuration options.

| Configuration key | Description |
| --- | --- |
| `ReloadStaticAssetsAtRuntime` | Enables dev-time hot reloading of static assets: serves modified web root (`wwwroot`) files (recomputes `ETag`, recompresses if required) instead of build-time manifest versions. Defaults to enabled only when serving a build manifest unless explicitly set. |
| `DisableStaticAssetNotFoundRuntimeFallback` | When `true`, suppresses the fallback endpoint that serves newly added files not present in the build manifest. When `false` or absent, a file-exists-checked `{**path}` fallback (GET/HEAD) logs a warning and serves the file with a computed `ETag`. |
| `EnableStaticAssetsDevelopmentCaching` | When `true`, preserves the original `Cache-Control` headers on asset descriptors. When `false` or absent, rewrites `Cache-Control` headers to `no-cache` to avoid aggressive client caching during development. |
| `EnableStaticAssetsDevelopmentIntegrity` | When `true`, keeps integrity properties on asset descriptors. When `false` or absent, removes any integrity property to prevent mismatches when files change during development. |



## Additional resources

* [blazor/fundamentals/static-files](../blazor/fundamentals/static-files.md)
* [fundamentals/middleware/index](middleware/index.md)
