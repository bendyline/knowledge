---
title: ASP.NET Core support for Native AOT
author: tdykstra
ms.author: tdykstra
description: Review ASP.NET Core support for Native ahead-of-time (AOT) applications, including publishing and deployment.
content_well_notification: AI-contribution
ms.date: 06/02/2026
uid: fundamentals/native-aot
ai-usage: ai-assisted

# ms.author: midenn (Mitch Denny)
# customer intent: As an ASP.NET developer, I want to explore ASP.NET Core support for Native AOT, so I can publish and deploy my Native AOT app.
---
# ASP.NET Core support for Native AOT

By [Mitch Denny](https://github.com/mitchdenny)

<!-- UPDATE 9.0 Activate after release and INCLUDE is updated

[!INCLUDE[](~/includes/not-latest-version.md)]

-->
**Applies to: \>= aspnetcore-9.0**

Publishing and deploying Native ahead-of-time (AOT) applications in ASP.NET Core offers several benefits:

- **Minimized disk footprint**. When you publish an app by using Native AOT, the process produces a single executable file. The executable contains only the code from the external dependencies required to support the app. The reduced executable size can lead to:
  * Smaller container images, for example in containerized deployment scenarios.
  * Reduced deployment time from smaller images.

- **Reduced startup time**. Native AOT apps can require less startup time, which enables:
  * The app to service requests quicker.
  * Improved deployment, where the container orchestrators manage the transition from one app version to another.

- **Reduced memory demand**. Native AOT apps can require less memory, depending on the work done by the app. Reduced memory consumption can lead to greater deployment density and improved scalability.

The following chart shows the results of a benchmarking test on the various template apps. The benchmark compares performance for an AOT published app (orange bar), a trimmed runtime app (green bar), and an untrimmed runtime app (yellow bar). The test revealed that the Native AOT app demonstrates lower app size, memory usage, and startup time.

Chart showing a comparison of app size, memory use, and startup time metrics. The chart compares a published Native AOT app, a trimmed runtime app, and an untrimmed runtime app.

This article describes support for Native AOT apps in ASP.NET Core, including an overview of publishing and deployment.

For ASP.NET Core Blazor WebAssembly Native AOT guidance, which adds to or supersedes the guidance in this article, see [ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation](../blazor/webassembly-build-tools-and-aot.md).

## Review ASP.NET Core and Native AOT compatibility

Not all features in ASP.NET Core are currently compatible with Native AOT.

The following table summarizes ASP.NET Core feature compatibility with Native AOT.

| Feature | Supported | Partial support | Not supported |
| --- | :---: | :---: | :---: |
| Blazor Server |  |  | ❌ |
| CORS | ✔️ |  |  |
| gRPC | ✔️ |  |  |
| HealthChecks | ✔️ |  |  |
| HttpLogging | ✔️ |  |  |
| JWT Authentication | ✔️ |  |  |
| Localization | ✔️ |  |  |
| Minimal APIs |  | ✔️ |  |
| MVC |  |  | ❌ |
| OData |  |  | ❌ |
| Other Authentication |  |  | ❌ |
| OutputCaching | ✔️ |  |  |
| RateLimiting | ✔️ |  |  |
| RequestDecompression | ✔️ |  |  |
| ResponseCaching | ✔️ |  |  |
| ResponseCompression | ✔️ |  |  |
| Rewrite | ✔️ |  |  |
| Session |  |  | ❌ |
| SignalR |  | ✔️ |  |
| Spa |  |  | ❌ |
| StaticFiles | ✔️ |  |  |
| WebSockets | ✔️ |  |  |

For more information on limitations, see:

* [Limitations of Native AOT deployment](https://learn.microsoft.com/dotnet/core/deploying/native-aot#limitations-of-native-aot-deployment)
* [AOT warnings](https://learn.microsoft.com/dotnet/core/deploying/native-aot/fixing-warnings)
* [Known trimming incompatibilities](https://learn.microsoft.com/dotnet/core/deploying/trimming/incompatibilities)
* [Fix trimming warnings](https://learn.microsoft.com/dotnet/core/deploying/trimming/fixing-warnings)

### Verify app on the Native AOT deployment model

It's important to test an app thoroughly when you move to a Native AOT deployment model. Test the AOT deployed app and confirm the functionality is unchanged from the untrimmed and just-in-time (JIT) compiled app.

When you build the app, review and correct any AOT warnings. An app that issues [AOT warnings](https://learn.microsoft.com/dotnet/core/deploying/trimming/fixing-warnings) during publishing might not work correctly. If no AOT warnings are issued at publish time, you can expect the published AOT app to work the same as the untrimmed and JIT-compiled app.

## Publish a Native AOT app (PublishAot)

Enable Native AOT for your application by using the `PublishAot` MSBuild property. The following example shows how to enable Native AOT in a project file:

```xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
</PropertyGroup>
```

The `PublishAot` property enables Native AOT compilation during the publish process, and enables dynamic code usage analysis during build and editing. A project that uses Native AOT publishing implements JIT compilation when it runs locally.

An AOT app has the following differences from a JIT-compiled app:

* Features that aren't compatible with Native AOT are disabled and throw exceptions at run time.
* A source analyzer is enabled to highlight code that isn't compatible with Native AOT. At publish time, the entire app, including NuGet packages, are analyzed for compatibility again.

Native AOT analysis includes all of the application code and the libraries the app depends on. Review Native AOT warnings and take corrective steps. It's a good idea to publish apps frequently to discover issues early in the development lifecycle.

In .NET 8 and later, the following ASP.NET Core app types support Native AOT:

* **Minimal APIs** - For more information, see [Review the Web API (Native AOT) template](#review-the-web-api-native-aot-template) later in this article.
* **gRPC** - For more information, see [gRPC and Native AOT](../grpc/native-aot.md).
* **Worker services** - For more information, see [Background tasks with hosted services in ASP.NET Core > Native AOT](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fhosted-services%23native-aot).

## Review the Web API (Native AOT) template

The ASP.NET Core **Web API (Native AOT)** template (short name `webapiaot`) creates a project with AOT enabled. The template differs from a standard **Web API** project template in the following ways:

* Uses Minimal APIs only, as MVC isn't yet compatible with Native AOT.
* Uses the [Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder) API to ensure only the essential features are enabled by default, which minimizes the app's deployed size.
* Is configured to listen on HTTP only. HTTPS traffic is commonly handled by an ingress service in cloud-native deployments.
* Doesn't include a launch profile for running under IIS or IIS Express.
* Creates an [.http file](../test/http-files.md) configured with sample HTTP requests that can be sent to the app's endpoints.
* Includes a sample `Todo` API instead of the weather forecast sample.
* Adds the `PublishAot` property to the project file, as [described earlier](#publish-a-native-aot-app-publishaot).
* Enables the [JSON serializer source generators](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/source-generation). The source generator is used to generate serialization code at build time, which is required for Native AOT compilation.

### Code updates for JSON serialization (Program.cs)

The code in the _Program.cs_ file is modified to provide support for JSON serialization source generation.

The following snippet shows the changes to the code:

```diff
using MyFirstAotWebApi;
+using System.Text.Json.Serialization;

-var builder = WebApplication.CreateBuilder();
+var builder = WebApplication.CreateSlimBuilder(args);

+builder.Services.ConfigureHttpJsonOptions(options =>
+{
+  options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
+});

var app = builder.Build();

var sampleTodos = TodoGenerator.GenerateTodos().ToArray();

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos);
todosApi.MapGet("/{id}", (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.Run();

+[JsonSerializable(typeof(Todo[]))]
+internal partial class AppJsonSerializerContext : JsonSerializerContext
+{
+
+}
```

If you don't modify the code, `System.Text.Json` uses reflection to serialize and deserialize JSON. Reflection isn't supported in Native AOT.

For more information, see:

* [Combine source generators](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/source-generation#combine-source-generators)
* [System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain)

### Code changes for launch profile (launchSettings.json)

The **Web API (Native AOT)** template creates a _launchSettings.json_ file. In contrast to a standard launch file, the generated file doesn't include the `iisSettings` section or the `IIS Express` profile.

The following snippet shows the excluded sections (colored red):

```diff
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
-  "iisSettings": {
-     "windowsAuthentication": false,
-     "anonymousAuthentication": true,
-     "iisExpress": {
-       "applicationUrl": "http://localhost:11152",
-       "sslPort": 0
-     }
-   },
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "todos",
      "applicationUrl": "http://localhost:5102",
        "environmentVariables": {
          "ASPNETCORE_ENVIRONMENT": "Development"
        }
      },
-     "IIS Express": {
-       "commandName": "IISExpress",
-       "launchBrowser": true,
-       "launchUrl": "todos",
-      "environmentVariables": {
-       "ASPNETCORE_ENVIRONMENT": "Development"
-      }
-    }
  }
}
```

### CreateSlimBuilder() called for minimal app defaults

The **Web API (Native AOT)** template uses the [Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder) method instead of the [Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder) method.

[language="csharp" source="\~/fundamentals/aot/samples/Program.cs" highlight="4"::: (complete source file; reference: \~/fundamentals/aot/samples/Program.cs)](../../_code/aspnetcore/fundamentals/aot/samples/Program.cs.md)

The `CreateSlimBuilder` method initializes the [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) with the minimum ASP.NET Core features necessary to run an app.

As described earlier, the `CreateSlimBuilder` method doesn't include support for HTTPS or HTTP/3. These protocols typically aren't required for apps that run behind a TLS termination proxy. For example, see [TLS termination and end to end TLS with Application Gateway](https://learn.microsoft.com/azure/application-gateway/ssl-overview). You can enable HTTPS by calling the 
[builder.WebHost.UseKestrelHttpsConfiguration](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.hosting.webhostbuilderkestrelextensions.usekestrelhttpsconfiguration) method, or enable HTTP/3 by calling the [builder.WebHost.UseQuic](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderQuicExtensions.UseQuic%252A).

## Compare CreateSlimBuilder() and CreateBuilder()

The `CreateSlimBuilder` method provides access to a portion of the application features available with the `CreateBuilder` method. As described earlier, the **Web API (Native AOT)** template calls `CreateSlimBuilder` to initialize [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder), so the builder uses the minimum ASP.NET Core features necessary to run the app.

Both methods provide the necessary features for an efficient development experience:

* Configuration for the _appsettings.json_ and _appsettings.{EnvironmentName}.json_ files
* User secrets configuration
* Console logging
* Logging configuration

Including minimal features has benefits for trimming as well as AOT. For more information, see [Trim self-contained deployments and executables](https://learn.microsoft.com/dotnet/core/deploying/trimming/trim-self-contained).

If you prefer to use a builder that omits all features, see the [WebApplication.CreateEmptyBuilder](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.webapplication.createemptybuilder) method.

### Unavailable features in CreateSlimBuilder

The `CreateSlimBuilder` method **doesn't** provide the following features, which are available in `CreateBuilder`:

* [Hosting startup assemblies](host/platform-specific-configuration.md)
* [UseStartup](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStartup%252A) method
* Logging providers:
    * [Windows EventLog](https://learn.microsoft.com/aspnet/core/fundamentals/logging#windows-eventlog)
    * [Debug](https://learn.microsoft.com/aspnet/core/fundamentals/logging#debug)
    * [EventSource](https://learn.microsoft.com/aspnet/core/fundamentals/logging#eventsource)
* Web hosting features:
    * [UseStaticWebAssets](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets%252A) method
    * [IIS integration](../host-and-deploy/iis/index.md)
* Kestrel configuration:
    * [HTTPS endpoints](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23configure-https)
    * [QUIC (HTTP/3)](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fhttp3%23http3-benefits)
* [Regex and alpha constraints used in routing (GitHub /dotnet/aspnetcore/issues #46142)](https://github.com/dotnet/aspnetcore/issues/46142)

For more detailed information, see [Comparing WebApplication.CreateBuilder to CreateSlimBuilder](https://andrewlock.net/exploring-the-dotnet-8-preview-comparing-createbuilder-to-the-new-createslimbuilder-method/)

## Use source generators and avoid reflection

During the publishing process for Native AOT, any unused code is trimmed. As a result, an app can't use unbounded reflection at runtime. You can use [source generators](https://learn.microsoft.com/dotnet/csharp/roslyn-sdk/#source-generators) that produce code that avoids the need for reflection. In some cases, source generators output code optimized for AOT even when a generator isn't required.

- To view the generated source code, add the [EmitCompilerGeneratedFiles](https://learn.microsoft.com/dotnet/core/extensions/configuration-generator) property to the application project (_.csproj_) file:

   ```xml
   <Project Sdk="Microsoft.NET.Sdk.Web">

     <PropertyGroup>
       <!-- Other properties omitted for brevity -->
       <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
     </PropertyGroup>

   </Project>
   ```

- To see the generated code, run the `dotnet build` command. The command compiles the source files and generates the intermediate files needed to run the app in a development environment. The output includes an _obj/Debug/<.NET version>/generated/_ directory that contains all the generated files for the project.

- To prepare the app for deployment, run the `dotnet publish` command. The command compiles the source files and generates all files required to deploy the app. It passes the generated assemblies to a native IL compiler, which produces the native executable. The native executable contains the native machine code.

### Use libraries with Native AOT

Many popular libraries used in ASP.NET Core projects currently have some compatibility issues when they're incorporated into projects that target Native AOT, such as:

* Using reflection to inspect and discover types
* Loading libraries conditionally at runtime
* Generating code on the fly to implement functionality

Libraries that use these dynamic features require updates to work with Native AOT. Various tools are available for applying the necessary updates, such as [Roslyn source generators](https://learn.microsoft.com/dotnet/csharp/roslyn-sdk/#source-generators).

Library authors hoping to support Native AOT are encouraged to review the following articles:

* [Native AOT deployment](https://learn.microsoft.com/dotnet/core/deploying/native-aot)
* [Prepare .NET libraries for trimming](https://learn.microsoft.com/dotnet/core/deploying/trimming/prepare-libraries-for-trimming)


## Work with Minimal APIs and JSON payloads

The Minimal API framework is optimized for receiving and returning JSON payloads by using the [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json).

* The namespace imposes compatibility requirements for JSON and Native AOT.
* It requires the use of the [System.Text.Json source generator](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/source-generation).

All types transmitted as part of the HTTP body or returned from request delegates in Minimal APIs apps must be configured on a [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext) instance. The instance must be registered with ASP.NET Core dependency injection:

[language="csharp" source="\~/fundamentals/aot/samples/Program.cs" highlight="7-10,25-99"::: (complete source file; reference: \~/fundamentals/aot/samples/Program.cs)](../../_code/aspnetcore/fundamentals/aot/samples/Program.cs.md)

* The JSON serializer context is registered with the [DI container](dependency-injection.md). For more information, see [Combine source generators](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/source-generation#combine-source-generators) and the [System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain).

* The custom `JsonSerializerContext` is annotated with the [JsonSerializable](https://learn.microsoft.com/dotnet/api/system.text.json.serialization.jsonserializableattribute) attribute, which enables source generated JSON serializer code for the `ToDo` type.

A parameter on the delegate that isn't bound to the body **doesn't** need to be serializable. For example, a query string parameter can be a rich object type that implements `IParsable<T>`.

[language="csharp" source="\~/fundamentals/aot/samples/Todo.cs" id="snippet_1"::: (complete source file; reference: \~/fundamentals/aot/samples/Todo.cs)](../../_code/aspnetcore/fundamentals/aot/samples/Todo.cs.md)

## Review known issues

To report or review issues with Native AOT support in ASP.NET Core, see [GitHub /dotnet/core/issues #8288)](https://github.com/dotnet/core/issues/8288).

## Related content

* [Publish an ASP.NET Core app with Native AOT](aot/native-aot-tutorial.md)
* [Native AOT deployment](https://learn.microsoft.com/dotnet/core/deploying/native-aot/)
* [Optimize AOT deployments](https://learn.microsoft.com/dotnet/core/deploying/native-aot/optimizing)



**Applies to: \= aspnetcore-8.0**

.NET 8 introduces support for [.NET native ahead-of-time (AOT)](https://learn.microsoft.com/dotnet/core/deploying/native-aot/).

## Why use Native AOT with ASP.NET Core

Publishing and deploying a Native AOT app provides the following benefits:

* **Minimized disk footprint**: When publishing using Native AOT, a single executable is produced containing just the code from external dependencies that is needed to support the program. Reduced executable size can lead to:
  * Smaller container images, for example in containerized deployment scenarios.
  * Reduced deployment time from smaller images.
* **Reduced startup time**: Native AOT applications can show reduced start-up times, which means
  * The app is ready to service requests quicker.
  * Improved deployment where container orchestrators need to manage transition from one version of the app to another.
* **Reduced memory demand**: Native AOT apps can have reduced memory demands, depending on the work done by the app. Reduced memory consumption can lead to greater deployment density and improved scalability.

The template app was run in our benchmarking lab to compare performance of an AOT published app, a trimmed runtime app, and an untrimmed runtime app. The following chart shows the results of the benchmarking:

Chart showing comparison of application size, memory use, and startup time metrics of an AOT published app, a runtime app that is trimmed, and an untrimmed runtime app.

The preceding chart shows that Native AOT has lower app size, memory usage, and startup time.

## ASP.NET Core and Native AOT compatibility

Not all features in ASP.NET Core are currently compatible with Native AOT. The following table summarizes ASP.NET Core feature compatibility with Native AOT.

| Feature | Fully Supported | Partially Supported | Not Supported |
| --- | --- | --- | --- |
| gRPC | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| Minimal APIs |  | <span aria-hidden="true">✔️</span><span class="visually-hidden">Partially supported</span> |  |
| MVC |  |  | <span aria-hidden="true">❌</span><span class="visually-hidden">Not supported</span> |
| Blazor Server |  |  | <span aria-hidden="true">❌</span><span class="visually-hidden">Not supported</span> |
| SignalR |  |  | <span aria-hidden="true">❌</span><span class="visually-hidden">Not supported</span> |
| JWT Authentication | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| Other Authentication |  |  | <span aria-hidden="true">❌</span><span class="visually-hidden">Not supported</span> |
| CORS | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| HealthChecks | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| HttpLogging | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| Localization | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| OutputCaching | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| RateLimiting | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| RequestDecompression | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| ResponseCaching | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| ResponseCompression | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| Rewrite | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| Session |  |  | <span aria-hidden="true">❌</span><span class="visually-hidden">Not supported</span> |
| Spa |  |  | <span aria-hidden="true">❌</span><span class="visually-hidden">Not supported</span> |
| StaticFiles | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |
| WebSockets | <span aria-hidden="true">✔️</span><span class="visually-hidden">Fully supported</span> |  |  |

For more information on limitations, see:

* [Limitations of Native AOT deployment](https://learn.microsoft.com/dotnet/core/deploying/native-aot#limitations-of-native-aot-deployment)
* [Introduction to AOT warnings](https://learn.microsoft.com/dotnet/core/deploying/native-aot/fixing-warnings)
* [Known trimming incompatibilities](https://learn.microsoft.com/dotnet/core/deploying/trimming/incompatibilities)
* [Introduction to trim warnings](https://learn.microsoft.com/dotnet/core/deploying/trimming/fixing-warnings)
* [GitHub issue dotnet/core #8288](https://github.com/dotnet/core/issues/8288)

It's important to test an app thoroughly when moving to a Native AOT deployment model. The AOT deployed app should be tested to verify functionality hasn't changed from the untrimmed and JIT-compiled app. When building the app, review and correct AOT warnings. An app that issues [AOT warnings](https://learn.microsoft.com/dotnet/core/deploying/trimming/fixing-warnings) during publishing may not work correctly. If no AOT warnings are issued at publish time, the published AOT app should work the same as the untrimmed and JIT-compiled app.

## Native AOT publishing

Native AOT is enabled with the `PublishAot` MSBuild property. The following example shows how to enable Native AOT in a project file:

```xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
</PropertyGroup>
```

This setting enables Native AOT compilation during publish and enables dynamic code usage analysis during build and editing. A project that uses Native AOT publishing uses JIT compilation when running locally. An AOT app has the following differences from a JIT-compiled app:

* Features that aren't compatible with Native AOT are disabled and throw exceptions at run time.
* A source analyzer is enabled to highlight code that isn't compatible with Native AOT. At publish time, the entire app, including NuGet packages, are analyzed for compatibility again.

Native AOT analysis includes all of the app's code and the libraries the app depends on. Review Native AOT warnings and take corrective steps. It's a good idea to publish apps frequently to discover issues early in the development lifecycle.

In .NET 8, Native AOT is supported by the following ASP.NET Core app types:

* Minimal APIs - For more information, see the [The Web API (Native AOT) template](#the-web-api-native-aot-template) section later in this article.
* gRPC - For more information, see [gRPC and Native AOT](../grpc/native-aot.md).
* Worker services - For more information, see [AOT in Worker Service templates](host/hosted-services.md).

## The Web API (Native AOT) template

The **ASP.NET Core Web API (Native AOT)** template (short name `webapiaot`) creates a project with AOT enabled. The template differs from the **Web API** project template in the following ways:

* Uses Minimal APIs only, as MVC isn't yet compatible with Native AOT.
* Uses the [Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder) API to ensure only the essential features are enabled by default, minimizing the app's deployed size.
* Is configured to listen on HTTP only, as HTTPS traffic is commonly handled by an ingress service in cloud-native deployments.
* Doesn't include a launch profile for running under IIS or IIS Express.
* Creates an [`.http` file](../test/http-files.md) configured with sample HTTP requests that can be sent to the app's endpoints.
* Includes a sample `Todo` API instead of the weather forecast sample.
* Adds `PublishAot` to the project file, as shown [earlier in this article](#native-aot-publishing).
* Enables the [JSON serializer source generators](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/source-generation). The source generator is used to generate serialization code at build time, which is required for Native AOT compilation.

### Changes to support source generation

The following example shows the code added to the `Program.cs` file to support JSON serialization source generation:

```diff
using MyFirstAotWebApi;
+using System.Text.Json.Serialization;

-var builder = WebApplication.CreateBuilder();
+var builder = WebApplication.CreateSlimBuilder(args);

+builder.Services.ConfigureHttpJsonOptions(options =>
+{
+  options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
+});

var app = builder.Build();

var sampleTodos = TodoGenerator.GenerateTodos().ToArray();

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos);
todosApi.MapGet("/{id}", (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.Run();

+[JsonSerializable(typeof(Todo[]))]
+internal partial class AppJsonSerializerContext : JsonSerializerContext
+{
+
+}
```

Without this added code, `System.Text.Json` uses reflection to serialize and deserialize JSON. Reflection isn't supported in Native AOT.

For more information, see:

* [Combine source generators](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/source-generation?pivots=dotnet-8-0#combine-source-generators)
* [System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain)

### Changes to `launchSettings.json`

The `launchSettings.json` file created by the **Web API (Native AOT)** template has the `iisSettings` section and `IIS Express` profile removed:

```diff
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
-  "iisSettings": {
-     "windowsAuthentication": false,
-     "anonymousAuthentication": true,
-     "iisExpress": {
-       "applicationUrl": "http://localhost:11152",
-       "sslPort": 0
-     }
-   },
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "todos",
      "applicationUrl": "http://localhost:5102",
        "environmentVariables": {
          "ASPNETCORE_ENVIRONMENT": "Development"
        }
      },
-     "IIS Express": {
-       "commandName": "IISExpress",
-       "launchBrowser": true,
-       "launchUrl": "todos",
-      "environmentVariables": {
-       "ASPNETCORE_ENVIRONMENT": "Development"
-      }
-    }
  }
}
```

<a name="csb"></a>

### The `CreateSlimBuilder` method

The template uses the [Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder) method instead of the [Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder) method.

[language="csharp" source="\~/fundamentals/aot/samples/Program.cs" highlight="4"::: (complete source file; reference: \~/fundamentals/aot/samples/Program.cs)](../../_code/aspnetcore/fundamentals/aot/samples/Program.cs.md)

The `CreateSlimBuilder` method initializes the [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) with the minimum ASP.NET Core features necessary to run an app.

As noted earlier, the `CreateSlimBuilder` method doesn't include support for HTTPS or HTTP/3. These protocols typically aren't required for apps that run behind a TLS termination proxy. For example, see [TLS termination and end to end TLS with Application Gateway](https://learn.microsoft.com/azure/application-gateway/ssl-overview). HTTPS can be enabled by calling [builder.WebHost.UseKestrelHttpsConfiguration](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.hosting.webhostbuilderkestrelextensions.usekestrelhttpsconfiguration) HTTP/3 can be enabled by calling [builder.WebHost.UseQuic](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderQuicExtensions.UseQuic%252A).

### `CreateSlimBuilder` vs `CreateBuilder`

The `CreateSlimBuilder` method doesn't support the following features that are supported by the `CreateBuilder` method:

* [Hosting startup assemblies](host/platform-specific-configuration.md)
* [Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStartup%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStartup%252A)
* The following logging providers:
    * [Windows EventLog](https://learn.microsoft.com/aspnet/core/fundamentals/logging#windows-eventlog)
    * [Debug](https://learn.microsoft.com/aspnet/core/fundamentals/logging#debug)
    * [Event Source](https://learn.microsoft.com/aspnet/core/fundamentals/logging#event-source)
* Web hosting features:
    * [Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets%252A)
    * [IIS Integration](../host-and-deploy/iis/index.md)
* Kestrel configuration
    * [HTTPS endpoints in Kestrel](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23https)
    * [Quic (HTTP/3)](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fhttp3%23http3-benefits)
* [Regex and alpha constraints used in routing](https://github.com/dotnet/aspnetcore/issues/46142)

The `CreateSlimBuilder` method includes the following features needed for an efficient development experience:

* JSON file configuration for `appsettings.json` and `appsettings.{EnvironmentName}.json`.
* User secrets configuration.
* Console logging.
* Logging configuration.

For a builder that omits the preceding features, see [The `CreateEmptyBuilder` method](https://learn.microsoft.com/search/?terms=aspnetcore-8%23new-createemptybuilder-method).

Including minimal features has benefits for trimming as well as AOT. For more information, see [Trim self-contained deployments and executables](https://learn.microsoft.com/dotnet/core/deploying/trimming/trim-self-contained).

For more detailed information, see [Comparing `WebApplication.CreateBuilder` to `CreateSlimBuilder`](https://andrewlock.net/exploring-the-dotnet-8-preview-comparing-createbuilder-to-the-new-createslimbuilder-method/)

## Source generators

Because unused code is trimmed during publishing for Native AOT, the app can't use unbounded reflection at runtime. [Source generators](https://learn.microsoft.com/dotnet/csharp/roslyn-sdk/source-generators-overview) are used to produce code that avoids the need for reflection. In some cases, source generators produce code optimized for AOT even when a generator isn't required.

To view the source code that is generated, add the [`EmitCompilerGeneratedFiles`](https://learn.microsoft.com/dotnet/csharp/roslyn-sdk/source-generators-overview) property to an app's `.csproj` file, as shown in the following example:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <!-- Other properties omitted for brevity -->
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
  </PropertyGroup>

</Project>
```

Run the `dotnet build` command to see the generated code. The output includes an `obj/Debug/net8.0/generated/` directory that contains all the generated files for the project.

The `dotnet publish` command also compiles the source files and generates files that are compiled. In addition, `dotnet publish` passes the generated assemblies to a native IL compiler. The IL compiler produces the native executable. The native executable contains the native machine code.

### Use libraries with Native AOT

Many popular libraries used in ASP.NET Core projects currently have some compatibility issues when they're incorporated into projects that target Native AOT, such as:

* Using reflection to inspect and discover types
* Loading libraries conditionally at runtime
* Generating code on the fly to implement functionality

Libraries that use these dynamic features require updates to work with Native AOT. Various tools are available for applying the necessary updates, such as [Roslyn source generators](https://learn.microsoft.com/dotnet/csharp/roslyn-sdk/#source-generators).

Library authors hoping to support Native AOT are encouraged to review the following articles:

* [Native AOT deployment](https://learn.microsoft.com/dotnet/core/deploying/native-aot)
* [Prepare .NET libraries for trimming](https://learn.microsoft.com/dotnet/core/deploying/trimming/prepare-libraries-for-trimming)


## Minimal APIs and JSON payloads

The Minimal API framework is optimized for receiving and returning JSON payloads using [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json). `System.Text.Json`:

* Imposes compatibility requirements for JSON and Native AOT.
* Requires the use of the [`System.Text.Json` source generator](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/source-generation).

All types that are transmitted as part of the HTTP body or returned from request delegates in Minimal APIs apps must be configured on a [System.Text.Json.Serialization.JsonSerializerContext](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonSerializerContext) that is registered via ASP.NET Core's dependency injection:

[language="csharp" source="\~/fundamentals/aot/samples/Program.cs" highlight="7-10,25-99"::: (complete source file; reference: \~/fundamentals/aot/samples/Program.cs)](../../_code/aspnetcore/fundamentals/aot/samples/Program.cs.md)

In the preceding highlighted code:

* The JSON serializer context is registered with the [DI container](dependency-injection.md). For more information, see:
  * [Combine source generators](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/source-generation?pivots=dotnet-8-0#combine-source-generators)
  * [System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain)
* The custom `JsonSerializerContext` is annotated with the [`[JsonSerializable]`](https://learn.microsoft.com/dotnet/api/system.text.json.serialization.jsonserializableattribute) attribute to enable source generated JSON serializer code for the `ToDo` type.

A parameter on the delegate that isn't bound to the body and does ***not*** need to be serializable. For example, a query string parameter that is a rich object type and implements `IParsable<T>`.

[language="csharp" source="\~/fundamentals/aot/samples/Todo.cs" id="snippet_1"::: (complete source file; reference: \~/fundamentals/aot/samples/Todo.cs)](../../_code/aspnetcore/fundamentals/aot/samples/Todo.cs.md)

## Known issues

See [this GitHub issue](https://github.com/dotnet/core/issues/8288) to report or review issues with Native AOT support in ASP.NET Core.

## See also

* [fundamentals/native-aot-tutorial](aot/native-aot-tutorial.md)
* [Native AOT deployment](https://learn.microsoft.com/dotnet/core/deploying/native-aot/)
* [Optimize AOT deployments](https://learn.microsoft.com/dotnet/core/deploying/native-aot/optimizing)
* [Configuration-binding source generator](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-8#configuration-binding-source-generator)
* [Using the configuration binder source generator](https://andrewlock.net/exploring-the-dotnet-8-preview-using-the-new-configuration-binder-source-generator/)
* [The Minimal API AOT compilation template](https://andrewlock.net/exploring-the-dotnet-8-preview-the-minimal-api-aot-template/)
* [Comparing `WebApplication.CreateBuilder` to `CreateSlimBuilder`](https://andrewlock.net/exploring-the-dotnet-8-preview-comparing-createbuilder-to-the-new-createslimbuilder-method/)
* [Exploring the new Minimal API source generator](https://andrewlock.net/exploring-the-dotnet-8-preview-exploring-the-new-minimal-api-source-generator/)
* [Replacing method calls with Interceptors](https://andrewlock.net/exploring-the-dotnet-8-preview-changing-method-calls-with-interceptors/)
* [Behind `[LogProperties]` and the new telemetry logging source generator](https://andrewlock.net/behind-logproperties-and-the-new-telemetry-logging-source-generator/)
