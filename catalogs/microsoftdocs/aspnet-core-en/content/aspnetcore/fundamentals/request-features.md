---
title: Request Features in ASP.NET Core
author: wadepickett
description: Learn about web server implementation details related to HTTP requests and responses that are defined in interfaces for ASP.NET Core.
ms.author: wpickett
ms.date: 10/11/2021
uid: fundamentals/request-features
---
# Request Features in ASP.NET Core

By [Steve Smith](https://ardalis.com/)

The `HttpContext` API that applications and middleware use to process requests has an abstraction layer underneath it called *feature interfaces*. Each feature interface provides a granular subset of the functionality exposed by `HttpContext`. These interfaces can be added, modified, wrapped, replaced, or even removed by the server or middleware as the request is processed without having to re-implement the entire `HttpContext`. They can also be used to mock functionality when testing.

## Feature collections

The [Microsoft.AspNetCore.Http.HttpContext.Features](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Features) property of `HttpContext` provides access to the collection of feature interfaces for the current request. Since the feature collection is mutable even within the context of a request, middleware can be used to modify the collection and add support for additional features. Some advanced features are only available by accessing the associated interface through the feature collection.

## Feature interfaces

ASP.NET Core defines a number of common HTTP feature interfaces in [Microsoft.AspNetCore.Http.Features](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features), which are shared by various servers and middleware to identify the features that they support. Servers and middleware may also provide their own interfaces with additional functionality.

Most feature interfaces provide optional, light-up functionality, and their associated `HttpContext` APIs provide defaults if the feature isn't present. A few interfaces are indicated in the following content as required because they provide core request and response functionality and must be implemented in order to process the request.

The following feature interfaces are from [Microsoft.AspNetCore.Http.Features](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features):

[Microsoft.AspNetCore.Http.Features.IHttpRequestFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpRequestFeature): Defines the structure of an HTTP request, including the protocol, path, query string, headers, and body. This feature is required in order to process requests.

[Microsoft.AspNetCore.Http.Features.IHttpResponseFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpResponseFeature): Defines the structure of an HTTP response, including the status code, headers, and body of the response. This feature is required in order to process requests.

**Applies to: \>= aspnetcore-3.0**

[Microsoft.AspNetCore.Http.Features.IHttpResponseBodyFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpResponseBodyFeature): Defines different ways of writing out the response body, using either a `Stream`, a `PipeWriter`, or a file. This feature is required in order to process requests. This replaces `IHttpResponseFeature.Body` and `IHttpSendFileFeature`.



[Microsoft.AspNetCore.Http.Features.Authentication.IHttpAuthenticationFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.IHttpAuthenticationFeature): Holds the [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal) currently associated with the request.

[Microsoft.AspNetCore.Http.Features.IFormFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IFormFeature): Used to parse and cache incoming HTTP and multipart form submissions.

**Applies to: \>= aspnetcore-2.0**

[Microsoft.AspNetCore.Http.Features.IHttpBodyControlFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpBodyControlFeature): Used to control if synchronous IO operations are allowed for the request or response bodies.



**Applies to: \>= aspnetcore-6.0**

`IHttpActivityFeature`: Used to add `Activity` information for diagnostic listeners.



**Applies to: < aspnetcore-3.0**

[Microsoft.AspNetCore.Http.Features.IHttpBufferingFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpBufferingFeature): Defines methods for disabling buffering of requests and/or responses.



[Microsoft.AspNetCore.Http.Features.IHttpConnectionFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpConnectionFeature): Defines properties for the connection id and local and remote addresses and ports.

**Applies to: \>= aspnetcore-2.0**

[Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature): Controls the maximum allowed request body size for the current request.



**Applies to: \>= aspnetcore-5.0**

`IHttpRequestBodyDetectionFeature`: Indicates if the request can have a body.



[Microsoft.AspNetCore.Http.Features.IHttpRequestIdentifierFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpRequestIdentifierFeature): Adds a property that can be implemented to uniquely identify requests.

[Microsoft.AspNetCore.Http.Features.IHttpRequestLifetimeFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpRequestLifetimeFeature): Defines support for aborting connections or detecting if a request has been terminated prematurely, such as by a client disconnect.

**Applies to: \>= aspnetcore-3.0**

[Microsoft.AspNetCore.Http.Features.IHttpRequestTrailersFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpRequestTrailersFeature): Provides access to the request trailer headers, if any.

[Microsoft.AspNetCore.Http.Features.IHttpResetFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpResetFeature): Used to send reset messages for protocols that support them such as HTTP/2 or HTTP/3.



**Applies to: \>= aspnetcore-2.2**

[Microsoft.AspNetCore.Http.Features.IHttpResponseTrailersFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpResponseTrailersFeature): Enables the application to provide response trailer headers if supported.



**Applies to: < aspnetcore-3.0**

[Microsoft.AspNetCore.Http.Features.IHttpSendFileFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpSendFileFeature): Defines a method for sending files asynchronously.



[Microsoft.AspNetCore.Http.Features.IHttpUpgradeFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpUpgradeFeature): Defines support for [HTTP Upgrades](https://www.rfc-editor.org/rfc/rfc9110#field.upgrade), which allow the client to specify which additional protocols it would like to use if the server wishes to switch protocols.

[Microsoft.AspNetCore.Http.Features.IHttpWebSocketFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpWebSocketFeature): Defines an API for supporting WebSockets.

**Applies to: \>= aspnetcore-3.0**

[Microsoft.AspNetCore.Http.Features.IHttpsCompressionFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IHttpsCompressionFeature): Controls if response compression should be used over HTTPS connections.



[Microsoft.AspNetCore.Http.Features.IItemsFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IItemsFeature): Stores the [Microsoft.AspNetCore.Http.Features.IItemsFeature.Items](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IItemsFeature.Items) collection for per request application state.

[Microsoft.AspNetCore.Http.Features.IQueryFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IQueryFeature): Parses and caches the query string.
   
**Applies to: \>= aspnetcore-3.0**

[Microsoft.AspNetCore.Http.Features.IRequestBodyPipeFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IRequestBodyPipeFeature): Represents the request body as a [System.IO.Pipelines.PipeReader](https://learn.microsoft.com/search/?terms=System.IO.Pipelines.PipeReader).
 


[Microsoft.AspNetCore.Http.Features.IRequestCookiesFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IRequestCookiesFeature): Parses and caches the request `Cookie` header values.

[Microsoft.AspNetCore.Http.Features.IResponseCookiesFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IResponseCookiesFeature): Controls how response cookies are applied to the `Set-Cookie` header.

**Applies to: \>= aspnetcore-2.2**

[Microsoft.AspNetCore.Http.Features.IServerVariablesFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IServerVariablesFeature): This feature provides access to request server variables such as those provided by IIS.


   
[Microsoft.AspNetCore.Http.Features.IServiceProvidersFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IServiceProvidersFeature): Provides access to an [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) with scoped request services.

[Microsoft.AspNetCore.Http.Features.ISessionFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.ISessionFeature): Defines `ISessionFactory` and [Microsoft.AspNetCore.Http.ISession](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ISession) abstractions for supporting user sessions. `ISessionFeature` is implemented by the [Microsoft.AspNetCore.Session.SessionMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Session.SessionMiddleware) (see [fundamentals/app-state](app-state.md)).

[Microsoft.AspNetCore.Http.Features.ITlsConnectionFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.ITlsConnectionFeature): Defines an API for retrieving client certificates.

[Microsoft.AspNetCore.Http.Features.ITlsTokenBindingFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.ITlsTokenBindingFeature): Defines methods for working with TLS token binding parameters.
   
**Applies to: \>= aspnetcore-2.2**
   
[Microsoft.AspNetCore.Http.Features.ITrackingConsentFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.ITrackingConsentFeature): Used to query, grant, and withdraw user consent regarding the storage of user information related to site activity and functionality.
   


## Additional resources

* [fundamentals/servers/index](servers/index.md)
* [fundamentals/middleware/index](middleware/index.md)
