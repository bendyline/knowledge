---
title: gRPC-Web in ASP.NET Core gRPC apps
author: jamesnk
description: Learn how to configure gRPC services on ASP.NET Core to be callable from browser apps using gRPC-Web.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 07/10/2025
uid: grpc/grpcweb
---
# gRPC-Web in ASP.NET Core gRPC apps

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


By [James Newton-King](https://twitter.com/jamesnk)

**Applies to: \>= aspnetcore-8.0**

Learn how to configure an existing ASP.NET Core gRPC service to be callable from browser apps, using the [gRPC-Web](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md) protocol. gRPC-Web allows browser JavaScript and Blazor apps to call gRPC services. It's not possible to call an HTTP/2 gRPC service from a browser-based app. gRPC services hosted in ASP.NET Core can be configured to support gRPC-Web alongside HTTP/2 gRPC.

For instructions on adding a gRPC service to an existing ASP.NET Core app, see [Add gRPC services to an ASP.NET Core app](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23add-grpc-services-to-an-aspnet-core-app).

For instructions on creating a gRPC project, see [tutorials/grpc/grpc-start](../tutorials/grpc/grpc-start.md).

## ASP.NET Core gRPC-Web versus Envoy

There are two choices for how to add gRPC-Web to an ASP.NET Core app:

* Support gRPC-Web alongside gRPC HTTP/2 in ASP.NET Core. This option uses middleware provided by the [`Grpc.AspNetCore.Web`](https://www.nuget.org/packages/Grpc.AspNetCore.Web) package.
* Use the [Envoy proxy's](https://www.envoyproxy.io/) gRPC-Web support to translate gRPC-Web to gRPC HTTP/2. The translated call is then forwarded onto the ASP.NET Core app.

There are pros and cons to each approach. If an app's environment is already using Envoy as a proxy, it might make sense to also use Envoy to provide gRPC-Web support. For a basic solution for gRPC-Web that only requires ASP.NET Core, `Grpc.AspNetCore.Web` is a good choice.

## Configure gRPC-Web in ASP.NET Core

gRPC services hosted in ASP.NET Core can be configured to support gRPC-Web alongside HTTP/2 gRPC. gRPC-Web doesn't require any changes to services. The only modification is in setting the middleware in `Program.cs`.

To enable gRPC-Web with an ASP.NET Core gRPC service:

* Add a reference to the [`Grpc.AspNetCore.Web`](https://www.nuget.org/packages/Grpc.AspNetCore.Web) package.
* Configure the app to use gRPC-Web by adding `UseGrpcWeb` and `EnableGrpcWeb` to `Program.cs`:

[language="csharp" source="\~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs" id="snippet_WebEnable" highlight="9,11"::: (complete source file; reference: \~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs)](../../_code/aspnetcore/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs.md)

The preceding code:

* Adds the gRPC-Web middleware, `UseGrpcWeb`, after routing and before endpoints.
* Specifies that the `endpoints.MapGrpcService<GreeterService>()` method supports gRPC-Web with `EnableGrpcWeb`. 

Alternatively, the gRPC-Web middleware can be configured so that all services support gRPC-Web by default and `EnableGrpcWeb` isn't required. Specify `new GrpcWebOptions { DefaultEnabled = true }` when the middleware is added.

[language="csharp" source="\~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs" id="snippet_WebEnableAllServices" highlight="9"::: (complete source file; reference: \~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs)](../../_code/aspnetcore/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs.md)

> **Note:**
> There is a known issue that causes gRPC-Web to fail when [hosted by HTTP.sys](../fundamentals/servers/httpsys.md) in .NET Core 3.x.
>
> A workaround to get gRPC-Web working on HTTP.sys is available in [Grpc-web experimental and UseHttpSys()? (grpc/grpc-dotnet #853)](https://github.com/grpc/grpc-dotnet/issues/853#issuecomment-610078202).

### gRPC-Web and CORS

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction applies to making gRPC-Web calls with browser apps. For example, a browser app served by `https://www.contoso.com` is blocked from calling gRPC-Web services hosted on `https://services.contoso.com`. Cross-Origin Resource Sharing (CORS) can be used to relax this restriction.

To allow a browser app to make cross-origin gRPC-Web calls, set up [CORS in ASP.NET Core](../security/cors.md). Use the built-in CORS support, and expose gRPC-specific headers with [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%252A).

[language="csharp" source="\~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs" id="snippet_WebEnableCORS" highlight="7-13,18,21"::: (complete source file; reference: \~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs)](../../_code/aspnetcore/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs.md)

The preceding code:

* Calls `AddCors` to add CORS services and configure a CORS policy that exposes gRPC-specific headers.
* Calls `UseCors` to add the CORS middleware after routing configuration and before endpoints configuration.
* Specifies that the `endpoints.MapGrpcService<GreeterService>()` method supports CORS with `RequireCors`.

### gRPC-Web and streaming

Traditional gRPC over HTTP/2 supports client, server and bidirectional streaming. gRPC-Web offers limited support for streaming:

* gRPC-Web browser clients don't support calling client streaming and bidirectional streaming methods.
* gRPC-Web .NET clients don't support calling client streaming and bidirectional streaming methods over HTTP/1.1.
* ASP.NET Core gRPC services hosted on Azure App Service and IIS don't support bidirectional streaming.

When using gRPC-Web, we only recommend the use of unary methods and server streaming methods.

### HTTP protocol

The ASP.NET Core gRPC service template, included in the .NET SDK, creates an app that's only configured for HTTP/2. This is a good default when an app only supports traditional gRPC over HTTP/2. gRPC-Web, however, works with both HTTP/1.1 and HTTP/2. Some platforms, such as UWP or Unity, can't use HTTP/2. To support all client apps, configure the server to enable HTTP/1.1 and HTTP/2.

Update the default protocol in `appsettings.json`:

```json
{
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http1AndHttp2"
    }
  }
}
```

Alternatively, [configure Kestrel endpoints in startup code](../fundamentals/servers/kestrel/endpoints.md).

Enabling HTTP/1.1 and HTTP/2 on the same port requires TLS for protocol negotiation. For more information, see [ASP.NET Core gRPC protocol negotiation](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23protocol-negotiation).

## Call gRPC-Web from the browser

Browser apps can use gRPC-Web to call gRPC services. There are some requirements and limitations when calling gRPC services with gRPC-Web from the browser:

* The server must contain configuration to support gRPC-Web.
* Client streaming and bidirectional streaming calls aren't supported. Server streaming is supported.
* Calling gRPC services on a different domain requires [CORS](../security/cors.md) configuration on the server.

### JavaScript gRPC-Web client

A JavaScript gRPC-Web client exists. For instructions on how to use gRPC-Web from JavaScript, see [write JavaScript client code with gRPC-Web](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld#write-client-code).

### Configure gRPC-Web with the .NET gRPC client

The .NET gRPC client can be configured to make gRPC-Web calls. This is useful for [Blazor WebAssembly](https://learn.microsoft.com/search/?terms=blazor%2Findex%23blazor-webassembly) apps, which are hosted in the browser and have the same HTTP limitations of JavaScript code. Calling gRPC-Web with a .NET client is the same as [HTTP/2 gRPC](client.md). The only modification is how the channel is created.

To use gRPC-Web:

* Add a reference to the [`Grpc.Net.Client.Web`](https://www.nuget.org/packages/Grpc.Net.Client.Web) package.
* Ensure the reference to [`Grpc.Net.Client`](https://www.nuget.org/packages/Grpc.Net.Client) package is version 2.29.0 or later.
* Configure the channel to use the `GrpcWebHandler`:

[language="csharp" source="\~/grpc/grpcweb/sample/8.x/GrpcGreeterClient/Program.cs" id="snippet_Handler"::: (complete source file; reference: \~/grpc/grpcweb/sample/8.x/GrpcGreeterClient/Program.cs)](../../_code/aspnetcore/grpc/grpcweb/sample/8.x/GrpcGreeterClient/Program.cs.md)

The preceding code:

* Configures a channel to use gRPC-Web.
* Creates a client and makes a call using the channel.

`GrpcWebHandler` has the following configuration options:

* `InnerHandler`: The underlying [System.Net.Http.HttpMessageHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMessageHandler) that makes the gRPC HTTP request, for example, `HttpClientHandler`.
* `GrpcWebMode`: An enumeration type that specifies whether the gRPC HTTP request `Content-Type` is `application/grpc-web` or `application/grpc-web-text`.
  * `GrpcWebMode.GrpcWeb` configures sending content without encoding. Default value.
  * `GrpcWebMode.GrpcWebText` configures base64-encoded content. Required for server streaming calls in browsers.

`GrpcChannelOptions.HttpVersion` and `GrpcChannelOptions.HttpVersionPolicy` can be used to configure the HTTP protocol version.

> **Important:**
> Generated gRPC clients have synchronous and asynchronous methods for calling unary methods. For example, `SayHello` is synchronous, and `SayHelloAsync` is asynchronous. Asynchronous methods are always required in Blazor WebAssembly. Calling a synchronous method in a Blazor WebAssembly app causes the app to become unresponsive.

### Use gRPC client factory with gRPC-Web

Create a .NET client compatible with gRPC-Web using the [gRPC client factory](clientfactory.md):

* Add package references to the project file for the following packages:
  * [`Grpc.Net.Client.Web`](https://www.nuget.org/packages/Grpc.Net.Client.Web)
  * [`Grpc.Net.ClientFactory`](https://www.nuget.org/packages/Grpc.Net.ClientFactory)
* Register a gRPC client with dependency injection (DI) using the generic `AddGrpcClient` extension method. In a Blazor WebAssembly app, services are registered with DI in `Program.cs`.
* Configure `GrpcWebHandler` using the [Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler%252A) extension method.

```csharp
builder.Services
    .AddGrpcClient<Greet.GreeterClient>(options =>
    {
        options.Address = new Uri("https://localhost:5001");
    })
    .ConfigurePrimaryHttpMessageHandler(
        () => new GrpcWebHandler(new HttpClientHandler()));
```

For more information, see [grpc/clientfactory](clientfactory.md).

## Additional resources

* [gRPC for Web Clients GitHub project](https://github.com/grpc/grpc-web)
* [security/cors](../security/cors.md)
* [grpc/json-transcoding](json-transcoding.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

Learn how to configure an existing ASP.NET Core gRPC service to be callable from browser apps, using the [gRPC-Web](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md) protocol. gRPC-Web allows browser JavaScript and Blazor apps to call gRPC services. It's not possible to call an HTTP/2 gRPC service from a browser-based app. gRPC services hosted in ASP.NET Core can be configured to support gRPC-Web alongside HTTP/2 gRPC.

For instructions on adding a gRPC service to an existing ASP.NET Core app, see [Add gRPC services to an ASP.NET Core app](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23add-grpc-services-to-an-aspnet-core-app).

For instructions on creating a gRPC project, see [tutorials/grpc/grpc-start](../tutorials/grpc/grpc-start.md).

## ASP.NET Core gRPC-Web versus Envoy

There are two choices for how to add gRPC-Web to an ASP.NET Core app:

* Support gRPC-Web alongside gRPC HTTP/2 in ASP.NET Core. This option uses middleware provided by the [`Grpc.AspNetCore.Web`](https://www.nuget.org/packages/Grpc.AspNetCore.Web) package.
* Use the [Envoy proxy's](https://www.envoyproxy.io/) gRPC-Web support to translate gRPC-Web to gRPC HTTP/2. The translated call is then forwarded onto the ASP.NET Core app.

There are pros and cons to each approach. If an app's environment is already using Envoy as a proxy, it might make sense to also use Envoy to provide gRPC-Web support. For a basic solution for gRPC-Web that only requires ASP.NET Core, `Grpc.AspNetCore.Web` is a good choice.

## Configure gRPC-Web in ASP.NET Core

gRPC services hosted in ASP.NET Core can be configured to support gRPC-Web alongside HTTP/2 gRPC. gRPC-Web doesn't require any changes to services. The only modification is in setting the middelware in `Program.cs`.

To enable gRPC-Web with an ASP.NET Core gRPC service:

* Add a reference to the [`Grpc.AspNetCore.Web`](https://www.nuget.org/packages/Grpc.AspNetCore.Web) package.
* Configure the app to use gRPC-Web by adding `UseGrpcWeb` and `EnableGrpcWeb` to `Program.cs`:

[language="csharp" source="\~/grpc/grpcweb/sample/7.x/GrpcGreeter/Program.cs" id="snippet_WebEnable" highlight="9,11"::: (complete source file; reference: \~/grpc/grpcweb/sample/7.x/GrpcGreeter/Program.cs)](../../_code/aspnetcore/grpc/grpcweb/sample/7.x/GrpcGreeter/Program.cs.md)

The preceding code:

* Adds the gRPC-Web middleware, `UseGrpcWeb`, after routing and before endpoints.
* Specifies that the `endpoints.MapGrpcService<GreeterService>()` method supports gRPC-Web with `EnableGrpcWeb`. 

Alternatively, the gRPC-Web middleware can be configured so that all services support gRPC-Web by default and `EnableGrpcWeb` isn't required. Specify `new GrpcWebOptions { DefaultEnabled = true }` when the middleware is added.

[language="csharp" source="\~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs" id="snippet_WebEnableAllServices" highlight="9"::: (complete source file; reference: \~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs)](../../_code/aspnetcore/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs.md)

> **Note:**
> There is a known issue that causes gRPC-Web to fail when [hosted by HTTP.sys](../fundamentals/servers/httpsys.md) in .NET Core 3.x.
>
> A workaround to get gRPC-Web working on HTTP.sys is available in [Grpc-web experimental and UseHttpSys()? (grpc/grpc-dotnet #853)](https://github.com/grpc/grpc-dotnet/issues/853#issuecomment-610078202).

### gRPC-Web and CORS

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction applies to making gRPC-Web calls with browser apps. For example, a browser app served by `https://www.contoso.com` is blocked from calling gRPC-Web services hosted on `https://services.contoso.com`. Cross-Origin Resource Sharing (CORS) can be used to relax this restriction.

To allow a browser app to make cross-origin gRPC-Web calls, set up [CORS in ASP.NET Core](../security/cors.md). Use the built-in CORS support, and expose gRPC-specific headers with [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%252A).

[language="csharp" source="\~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs" id="snippet_WebEnableCORS" highlight="7-13,18,21"::: (complete source file; reference: \~/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs)](../../_code/aspnetcore/grpc/grpcweb/sample/8.x/GrpcGreeter/Program.cs.md)

The preceding code:

* Calls `AddCors` to add CORS services and configure a CORS policy that exposes gRPC-specific headers.
* Calls `UseCors` to add the CORS middleware after routing configuration and before endpoints configuration.
* Specifies that the `endpoints.MapGrpcService<GreeterService>()` method supports CORS with `RequireCors`.

### gRPC-Web and streaming

Traditional gRPC over HTTP/2 supports client, server and bidirectional streaming. gRPC-Web offers limited support for streaming:

* gRPC-Web browser clients don't support calling client streaming and bidirectional streaming methods.
* gRPC-Web .NET clients don't support calling client streaming and bidirectional streaming methods over HTTP/1.1.
* ASP.NET Core gRPC services hosted on Azure App Service and IIS don't support bidirectional streaming.

When using gRPC-Web, we only recommend the use of unary methods and server streaming methods.

### HTTP protocol

The ASP.NET Core gRPC service template, included in the .NET SDK, creates an app that's only configured for HTTP/2. This is a good default when an app only supports traditional gRPC over HTTP/2. gRPC-Web, however, works with both HTTP/1.1 and HTTP/2. Some platforms, such as UWP or Unity, can't use HTTP/2. To support all client apps, configure the server to enable HTTP/1.1 and HTTP/2.

Update the default protocol in `appsettings.json`:

```json
{
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http1AndHttp2"
    }
  }
}
```

Alternatively, [configure Kestrel endpoints in startup code](../fundamentals/servers/kestrel/endpoints.md).

Enabling HTTP/1.1 and HTTP/2 on the same port requires TLS for protocol negotiation. For more information, see [ASP.NET Core gRPC protocol negotiation](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23protocol-negotiation).

## Call gRPC-Web from the browser

Browser apps can use gRPC-Web to call gRPC services. There are some requirements and limitations when calling gRPC services with gRPC-Web from the browser:

* The server must contain configuration to support gRPC-Web.
* Client streaming and bidirectional streaming calls aren't supported. Server streaming is supported.
* Calling gRPC services on a different domain requires [CORS](../security/cors.md) configuration on the server.

### JavaScript gRPC-Web client

A JavaScript gRPC-Web client exists. For instructions on how to use gRPC-Web from JavaScript, see [write JavaScript client code with gRPC-Web](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld#write-client-code).

### Configure gRPC-Web with the .NET gRPC client

The .NET gRPC client can be configured to make gRPC-Web calls. This is useful for [Blazor WebAssembly](https://learn.microsoft.com/search/?terms=blazor%2Findex%23blazor-webassembly) apps, which are hosted in the browser and have the same HTTP limitations of JavaScript code. Calling gRPC-Web with a .NET client is the same as [HTTP/2 gRPC](client.md). The only modification is how the channel is created.

To use gRPC-Web:

* Add a reference to the [`Grpc.Net.Client.Web`](https://www.nuget.org/packages/Grpc.Net.Client.Web) package.
* Ensure the reference to [`Grpc.Net.Client`](https://www.nuget.org/packages/Grpc.Net.Client) package is version 2.29.0 or later.
* Configure the channel to use the `GrpcWebHandler`:

[language="csharp" source="\~/grpc/grpcweb/sample/8.x/GrpcGreeterClient/Program.cs" id="snippet_Handler"::: (complete source file; reference: \~/grpc/grpcweb/sample/8.x/GrpcGreeterClient/Program.cs)](../../_code/aspnetcore/grpc/grpcweb/sample/8.x/GrpcGreeterClient/Program.cs.md)

The preceding code:

* Configures a channel to use gRPC-Web.
* Creates a client and makes a call using the channel.

`GrpcWebHandler` has the following configuration options:

* `InnerHandler`: The underlying [System.Net.Http.HttpMessageHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMessageHandler) that makes the gRPC HTTP request, for example, `HttpClientHandler`.
* `GrpcWebMode`: An enumeration type that specifies whether the gRPC HTTP request `Content-Type` is `application/grpc-web` or `application/grpc-web-text`.
    * `GrpcWebMode.GrpcWeb` configures sending content without encoding. Default value.
    * `GrpcWebMode.GrpcWebText` configures base64-encoded content. Required for server streaming calls in browsers.
* `HttpVersion`: HTTP protocol `Version` used to set [System.Net.Http.HttpRequestMessage.Version](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) on the underlying gRPC HTTP request. gRPC-Web doesn't require a specific version and doesn't override the default unless specified.

> **Important:**
> Generated gRPC clients have synchronous and asynchronous methods for calling unary methods. For example, `SayHello` is synchronous, and `SayHelloAsync` is asynchronous. Asynchronous methods are always required in Blazor WebAssembly. Calling a synchronous method in a Blazor WebAssembly app causes the app to become unresponsive.

### Use gRPC client factory with gRPC-Web

Create a .NET client compatible with gRPC-Web using the [gRPC client factory](clientfactory.md):

* Add package references to the project file for the following packages:
  * [`Grpc.Net.Client.Web`](https://www.nuget.org/packages/Grpc.Net.Client.Web)
  * [`Grpc.Net.ClientFactory`](https://www.nuget.org/packages/Grpc.Net.ClientFactory)
* Register a gRPC client with dependency injection (DI) using the generic `AddGrpcClient` extension method. In a Blazor WebAssembly app, services are registered with DI in `Program.cs`.
* Configure `GrpcWebHandler` using the [Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler%252A) extension method.

```csharp
builder.Services
    .AddGrpcClient<Greet.GreeterClient>(options =>
    {
        options.Address = new Uri("https://localhost:5001");
    })
    .ConfigurePrimaryHttpMessageHandler(
        () => new GrpcWebHandler(new HttpClientHandler()));
```

For more information, see [grpc/clientfactory](clientfactory.md).

## Additional resources

* [gRPC for Web Clients GitHub project](https://github.com/grpc/grpc-web)
* [security/cors](../security/cors.md)
* [grpc/json-transcoding](json-transcoding.md)




**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

Learn how to configure an existing ASP.NET Core gRPC service to be callable from browser apps, using the [gRPC-Web](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md) protocol. gRPC-Web allows browser JavaScript and Blazor apps to call gRPC services. It's not possible to call an HTTP/2 gRPC service from a browser-based app. gRPC services hosted in ASP.NET Core can be configured to support gRPC-Web alongside HTTP/2 gRPC.

For instructions on adding a gRPC service to an existing ASP.NET Core app, see [Add gRPC services to an ASP.NET Core app](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23add-grpc-services-to-an-aspnet-core-app).

For instructions on creating a gRPC project, see [tutorials/grpc/grpc-start](../tutorials/grpc/grpc-start.md).

## ASP.NET Core gRPC-Web versus Envoy

There are two choices for how to add gRPC-Web to an ASP.NET Core app:

* Support gRPC-Web alongside gRPC HTTP/2 in ASP.NET Core. This option uses middleware provided by the [`Grpc.AspNetCore.Web`](https://www.nuget.org/packages/Grpc.AspNetCore.Web) package.
* Use the [Envoy proxy's](https://www.envoyproxy.io/) gRPC-Web support to translate gRPC-Web to gRPC HTTP/2. The translated call is then forwarded onto the ASP.NET Core app.

There are pros and cons to each approach. If an app's environment is already using Envoy as a proxy, it might make sense to also use Envoy to provide gRPC-Web support. For a basic solution for gRPC-Web that only requires ASP.NET Core, `Grpc.AspNetCore.Web` is a good choice.

## Configure gRPC-Web in ASP.NET Core

gRPC services hosted in ASP.NET Core can be configured to support gRPC-Web alongside HTTP/2 gRPC. gRPC-Web doesn't require any changes to services. The only modification is startup configuration.

To enable gRPC-Web with an ASP.NET Core gRPC service:

* Add a reference to the [`Grpc.AspNetCore.Web`](https://www.nuget.org/packages/Grpc.AspNetCore.Web) package.
* Configure the app to use gRPC-Web by adding `UseGrpcWeb` and `EnableGrpcWeb` to `Startup.cs`:

[Code reference unavailable in this source snapshot: grpcweb/includes/~/grpc/grpcweb/sample/3-5.x/Startup.cs?name=snippet_1\\&highlight=10,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/grpcweb.md)

The preceding code:

* Adds the gRPC-Web middleware, `UseGrpcWeb`, after routing and before endpoints.
* Specifies that the `endpoints.MapGrpcService<GreeterService>()` method supports gRPC-Web with `EnableGrpcWeb`. 

Alternatively, the gRPC-Web middleware can be configured so that all services support gRPC-Web by default and `EnableGrpcWeb` isn't required. Specify `new GrpcWebOptions { DefaultEnabled = true }` when the middleware is added.

[Code reference unavailable in this source snapshot: grpcweb/includes/~/grpc/grpcweb/sample/3-5.x/AllServicesSupportExample_Startup.cs?name=snippet_1\\&highlight=12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/grpcweb.md)

> **Note:**
> There is a known issue that causes gRPC-Web to fail when [hosted by HTTP.sys](../fundamentals/servers/httpsys.md) in .NET Core 3.x.
>
> A workaround to get gRPC-Web working on HTTP.sys is available in [Grpc-web experimental and UseHttpSys()? (grpc/grpc-dotnet #853)](https://github.com/grpc/grpc-dotnet/issues/853#issuecomment-610078202).

### gRPC-Web and CORS

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction applies to making gRPC-Web calls with browser apps. For example, a browser app served by `https://www.contoso.com` is blocked from calling gRPC-Web services hosted on `https://services.contoso.com`. Cross-Origin Resource Sharing (CORS) can be used to relax this restriction.

To allow a browser app to make cross-origin gRPC-Web calls, set up [CORS in ASP.NET Core](../security/cors.md). Use the built-in CORS support, and expose gRPC-specific headers with [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%252A).

[Code reference unavailable in this source snapshot: grpcweb/includes/~/grpc/grpcweb/sample/3-5.x/CORS_Startup.cs?name=snippet_1\\&highlight=5-11,19,24](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/grpcweb.md)

The preceding code:

* Calls `AddCors` to add CORS services and configure a CORS policy that exposes gRPC-specific headers.
* Calls `UseCors` to add the CORS middleware after routing configuration and before endpoints configuration.
* Specifies that the `endpoints.MapGrpcService<GreeterService>()` method supports CORS with `RequireCors`.

### gRPC-Web and streaming

Traditional gRPC over HTTP/2 supports client, server and bidirectional streaming. gRPC-Web offers limited support for streaming:

* gRPC-Web browser clients don't support calling client streaming and bidirectional streaming methods.
* gRPC-Web .NET clients don't support calling client streaming and bidirectional streaming methods over HTTP/1.1.
* ASP.NET Core gRPC services hosted on Azure App Service and IIS don't support bidirectional streaming.

When using gRPC-Web, we only recommend the use of unary methods and server streaming methods.

### HTTP protocol

The ASP.NET Core gRPC service template, included in the .NET SDK, creates an app that's only configured for HTTP/2. This is a good default when an app only supports traditional gRPC over HTTP/2. gRPC-Web, however, works with both HTTP/1.1 and HTTP/2. Some platforms, such as UWP or Unity, can't use HTTP/2. To support all client apps, configure the server to enable HTTP/1.1 and HTTP/2.

Update the default protocol in `appsettings.json`:

```json
{
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http1AndHttp2"
    }
  }
}
```

Alternatively, [configure Kestrel endpoints in startup code](../fundamentals/servers/kestrel/endpoints.md).

Enabling HTTP/1.1 and HTTP/2 on the same port requires TLS for protocol negotiation. For more information, see [ASP.NET Core gRPC protocol negotiation](https://learn.microsoft.com/search/?terms=grpc%2Faspnetcore%23protocol-negotiation).

## Call gRPC-Web from the browser

Browser apps can use gRPC-Web to call gRPC services. There are some requirements and limitations when calling gRPC services with gRPC-Web from the browser:

* The server must contain configuration to support gRPC-Web.
* Client streaming and bidirectional streaming calls aren't supported. Server streaming is supported.
* Calling gRPC services on a different domain requires [CORS](../security/cors.md) configuration on the server.

### JavaScript gRPC-Web client

A JavaScript gRPC-Web client exists. For instructions on how to use gRPC-Web from JavaScript, see [write JavaScript client code with gRPC-Web](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld#write-client-code).

### Configure gRPC-Web with the .NET gRPC client

The .NET gRPC client can be configured to make gRPC-Web calls. This is useful for [Blazor WebAssembly](https://learn.microsoft.com/search/?terms=blazor%2Findex%23blazor-webassembly) apps, which are hosted in the browser and have the same HTTP limitations of JavaScript code. Calling gRPC-Web with a .NET client is the same as [HTTP/2 gRPC](client.md). The only modification is how the channel is created.

To use gRPC-Web:

* Add a reference to the [`Grpc.Net.Client.Web`](https://www.nuget.org/packages/Grpc.Net.Client.Web) package.
* Ensure the reference to [`Grpc.Net.Client`](https://www.nuget.org/packages/Grpc.Net.Client) package is version 2.29.0 or later.
* Configure the channel to use the `GrpcWebHandler`:

[Code reference unavailable in this source snapshot: grpcweb/includes/~/grpc/grpcweb/sample/3-5.x/Handler.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/grpcweb.md)

The preceding code:

* Configures a channel to use gRPC-Web.
* Creates a client and makes a call using the channel.

`GrpcWebHandler` has the following configuration options:

* `InnerHandler`: The underlying [System.Net.Http.HttpMessageHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMessageHandler) that makes the gRPC HTTP request, for example, `HttpClientHandler`.
* `GrpcWebMode`: An enumeration type that specifies whether the gRPC HTTP request `Content-Type` is `application/grpc-web` or `application/grpc-web-text`.
    * `GrpcWebMode.GrpcWeb` configures sending content without encoding. Default value.
    * `GrpcWebMode.GrpcWebText` configures base64-encoded content. Required for server streaming calls in browsers.
* `HttpVersion`: HTTP protocol `Version` used to set [System.Net.Http.HttpRequestMessage.Version](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) on the underlying gRPC HTTP request. gRPC-Web doesn't require a specific version and doesn't override the default unless specified.

> **Important:**
> Generated gRPC clients have synchronous and asynchronous methods for calling unary methods. For example, `SayHello` is synchronous, and `SayHelloAsync` is asynchronous. Asynchronous methods are always required in Blazor WebAssembly. Calling a synchronous method in a Blazor WebAssembly app causes the app to become unresponsive.

### Use gRPC client factory with gRPC-Web

Create a .NET client compatible with gRPC-Web using the [gRPC client factory](clientfactory.md):

* Add package references to the project file for the following packages:
  * [`Grpc.Net.Client.Web`](https://www.nuget.org/packages/Grpc.Net.Client.Web)
  * [`Grpc.Net.ClientFactory`](https://www.nuget.org/packages/Grpc.Net.ClientFactory)
* Register a gRPC client with dependency injection (DI) using the generic `AddGrpcClient` extension method. In a Blazor WebAssembly app, services are registered with DI in `Program.cs`.
* Configure `GrpcWebHandler` using the [Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler%252A) extension method.

```csharp
builder.Services
    .AddGrpcClient<Greet.GreeterClient>(options =>
    {
        options.Address = new Uri("https://localhost:5001");
    })
    .ConfigurePrimaryHttpMessageHandler(
        () => new GrpcWebHandler(new HttpClientHandler()));
```

For more information, see [grpc/clientfactory](clientfactory.md).

## Additional resources

* [gRPC for Web Clients GitHub project](https://github.com/grpc/grpc-web)
* [security/cors](../security/cors.md)
* [grpc/json-transcoding](json-transcoding.md)
