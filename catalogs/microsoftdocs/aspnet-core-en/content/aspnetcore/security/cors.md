---
title: Enable Cross-Origin Requests (CORS) in ASP.NET Core
ai-usage: ai-assisted
author: tdykstra
description: Learn how CORS as a standard for allowing or rejecting cross-origin requests in an ASP.NET Core app.
ms.author: tdykstra
ms.date: 05/12/2026
uid: security/cors
---
# Enable Cross-Origin Requests (CORS) in ASP.NET Core

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


**Applies to: \>= aspnetcore-8.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT) and [Kirk Larkin](https://twitter.com/serpent5)

This article shows how **C**ross-**O**rigin **R**esource **S**haring ([CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS)) is enabled in an ASP.NET Core app.

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the *same-origin policy*. The same-origin policy prevents a malicious site from reading sensitive data from another site. Sometimes, you might want to allow other sites to make cross-origin requests to your app. For more information, see the [Mozilla CORS article](https://developer.mozilla.org/docs/Web/HTTP/CORS).

[Cross Origin Resource Sharing](https://www.w3.org/TR/cors/) (CORS):

* Is a W3C standard that allows a server to relax the same-origin policy.
* Is **not** a security feature, CORS relaxes security. An API is not safer by allowing CORS. For more information, see [How CORS works](#how-cors).
* Allows a server to explicitly allow some cross-origin requests while rejecting others.
* Is safer and more flexible than earlier techniques, such as [JSONP](https://learn.microsoft.com/dotnet/framework/wcf/samples/jsonp).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/8.0sample/Cors/Web2API) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Same origin

Two URLs have the same origin if they have identical schemes, hosts, and ports ([RFC 6454](https://tools.ietf.org/html/rfc6454)).

These two URLs have the same origin:

* `https://example.com/foo.html`
* `https://example.com/bar.html`

These URLs have different origins than the previous two URLs:

* `https://example.net`: Different domain
* `https://contoso.example.com/foo.html`: Different subdomain
* `http://example.com/foo.html`: Different scheme
* `https://example.com:9000/foo.html`: Different port

## Enable CORS

There are three ways to enable CORS:

* In middleware using a [named policy](#np) or [default policy](#dp).
* Using [endpoint routing](#ecors6).
* With the [[EnableCors]](#attr) attribute.

Using the [[EnableCors]](#attr) attribute with a named policy provides the finest control in limiting endpoints that support CORS.

> **Warning:**
> [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) must be called in the correct order. For more information, see [Middleware order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order). For example, `UseCors` must be called before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A) when using `UseResponseCaching`.

Each approach is detailed in the following sections.

<a name="np"></a>

## CORS with named policy and middleware

CORS middleware handles cross-origin requests. The following code applies a CORS policy to all the app's endpoints with the specified origins:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet\&highlight=1,5-13,24)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

The preceding code:

* Sets the policy name to `_myAllowSpecificOrigins`. The policy name is arbitrary.
* Calls the [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) extension method and specifies the  `_myAllowSpecificOrigins` CORS policy. `UseCors` adds the CORS middleware. The call to `UseCors` must be placed after `UseRouting`, but before `UseAuthorization`. For more information, see [Middleware order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).
* Calls [Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors%252A) with a [lambda expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). The lambda takes a [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder) object. [Configuration options](#cors-policy-options), such as `WithOrigins`, are described later in this article.
* Enables the `_myAllowSpecificOrigins` CORS policy for all controller endpoints. See [endpoint routing](#ecors6) to apply a CORS policy to specific endpoints.
* When using [response caching middleware](../performance/caching/middleware.md), call [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A).

With endpoint routing, the CORS middleware **must** be configured to execute between the calls to `UseRouting` and  `UseEndpoints`.

The [Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors%252A) method call adds CORS services to the app's service container:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet\&highlight=5-13)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

For more information, see [CORS policy options](#cpo6) in this document.

The [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder) methods can be chained, as shown in the following code:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet2)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

Note: The specified URL must **not** contain a trailing slash (`/`). If the URL terminates with `/`, the comparison returns `false` and no header is returned.

<a name="uc1"></a>

## UseCors and UseStaticFiles order

Typically, `UseStaticFiles` is called before `UseCors`. Apps that use JavaScript to retrieve static files cross site must call `UseCors` before `UseStaticFiles`.

<a name="dp"></a>

### CORS with default policy and middleware

The following highlighted code enables the default CORS policy:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet3\&highlight=5,21)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

The preceding code applies the default CORS policy to all controller endpoints.

<a name="ecors6"></a>

## Enable Cors with endpoint routing

With endpoint routing, CORS can be enabled on a per-endpoint basis using the [Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors%252A) set of extension methods:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_endp\&highlight=1,5-13,24,32,35,38)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

In the preceding code:

* `app.UseCors` enables the CORS middleware. Because a default policy hasn't been configured, `app.UseCors()` alone doesn't enable CORS.
* The `/echo` and controller endpoints allow cross-origin requests using the specified policy.
* The `/echo2` and Razor Pages endpoints do **not** allow cross-origin requests because no default policy was specified.

The [[DisableCors]](#dc6) attribute does **not**  disable CORS that has been enabled by endpoint routing with `RequireCors`.

See [Test CORS with [EnableCors] attribute and RequireCors method](#tcer) for instructions on testing code similar to the preceding.

<a name="attr"></a>

## Enable CORS with attributes

Enabling CORS with the [\[EnableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.EnableCorsAttribute) attribute and applying a named policy to only those endpoints that require CORS provides the finest control.

The [\[EnableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.EnableCorsAttribute) attribute provides an alternative to applying CORS globally. The `[EnableCors]` attribute enables CORS for selected endpoints, rather than all endpoints:

* `[EnableCors]` specifies the default policy.
* `[EnableCors("{Policy String}")]` specifies a named policy.

The `[EnableCors]` attribute can be applied to:

* Razor Page `PageModel`
* Controller
* Controller action method

Different policies can be applied to controllers, page models, or action methods with the `[EnableCors]` attribute. When the `[EnableCors]` attribute is applied to a controller, page model, or action method, and CORS is enabled in middleware, **both** policies are applied. **We recommend against combining policies. Use the** `[EnableCors]` **attribute or middleware, not both in the same app.**

The following code applies a different policy to each method:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Controllers/WidgetController.cs?name=snippet\&highlight=6,14)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Controllers/WidgetController.cs.md)

The following code creates two CORS policies:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_attr)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

For the finest control of limiting CORS requests:

* Use `[EnableCors("MyPolicy")]` with a named policy.
* Don't define a default policy.
* Don't use [endpoint routing](#ecors6).

The code in the next section meets the preceding list.



<a name="dc6"></a>

### Disable CORS

The [\[DisableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.DisableCorsAttribute) attribute does **not**  disable CORS that has been enabled by [endpoint routing](#ecors6).

The following code defines the CORS policy `"MyPolicy"`:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_dcors)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

The following code disables CORS for the `GetValues2` action:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Controllers/ValuesController.cs?name=snippet\&highlight=1,23)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Controllers/ValuesController.cs.md)

The preceding code:

* Doesn't enable CORS with [endpoint routing](#ecors6).
* Doesn't define a [default CORS policy](#dp).
* Uses [[EnableCors("MyPolicy")]](#attr) to enable the `"MyPolicy"` CORS policy for the controller.
* Disables CORS for the `GetValues2` method.

See [Test CORS](#testc6) for instructions on testing the preceding code.

<a name="cpo6"></a>

## CORS policy options

This section describes the various options that can be set in a CORS policy:

* [Set the allowed origins](#set-the-allowed-origins)
* [Set the allowed HTTP methods](#set-the-allowed-http-methods)
* [Set the allowed request headers](#set-the-allowed-request-headers)
* [Set the exposed response headers](#set-the-exposed-response-headers)
* [Credentials in cross-origin requests](#credentials-in-cross-origin-requests)
* [Set the preflight expiration time](#set-the-preflight-expiration-time)

[Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy%252A) is called in `Program.cs`. For some options, it may be helpful to read the [How CORS works](#how-cors) section first.

## Set the allowed origins

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%252A): Allows CORS requests from all origins with any scheme (`http` or `https`). `AllowAnyOrigin` is insecure because *any website* can make cross-origin requests to the app.

> **Warning:**
> Specifying `AllowAnyOrigin` and `AllowCredentials` is an insecure configuration and can result in cross-site request forgery. The CORS service returns an invalid CORS response when an app is configured with both methods. Bypassing the built-in checks by using `SetIsOriginAllowed(_ => true)` together with `AllowCredentials` is also an insecure configuration.

`AllowAnyOrigin` affects preflight requests and the `Access-Control-Allow-Origin` header. For more information, see the [Preflight requests](#preflight-requests) section.

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetIsOriginAllowedToAllowWildcardSubdomains%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetIsOriginAllowedToAllowWildcardSubdomains%252A): Sets the [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.IsOriginAllowed%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.IsOriginAllowed%252A) property of the policy to be a function that allows origins to match a configured wildcard domain when evaluating if the origin is allowed.

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_aa)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

In the preceding code, `SetIsOriginAllowedToAllowWildcardSubdomains` is called with the wildcard origin `"https://*.example.com"`. This configuration allows CORS requests from any subdomain of `example.com`, such as `https://subdomain.example.com` or `https://api.example.com`. The `*` wildcard character must be included in the origin to enable wildcard subdomain matching.

### Set the allowed HTTP methods

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyMethod%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyMethod%252A):

* Allows any HTTP method:
* Affects preflight requests and the `Access-Control-Allow-Methods` header. For more information, see the [Preflight requests](#preflight-requests) section.

### Set the allowed request headers

To allow specific headers to be sent in a CORS request, called *author request headers*, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%252A) and specify the allowed headers:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_sa)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

To allow all author request headers, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%252A):

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_aah)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

`AllowAnyHeader` affects preflight requests and the [Access-Control-Request-Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Request-Method) header. For more information, see the [Preflight requests](#preflight-requests) section.

A CORS middleware policy match to specific headers specified by `WithHeaders` is only possible when the headers sent in `Access-Control-Request-Headers` exactly match the headers stated in `WithHeaders`.

For instance, consider an app configured as follows:

```csharp
app.UseCors(policy => policy.WithHeaders(HeaderNames.CacheControl));
```

CORS middleware declines a preflight request with the following request header because `Content-Language` ([HeaderNames.ContentLanguage](https://learn.microsoft.com/search/?terms=Microsoft.Net.Http.Headers.HeaderNames.ContentLanguage)) isn't listed in `WithHeaders`:

```
Access-Control-Request-Headers: Cache-Control, Content-Language
```

The app returns a `204 No Content` response but doesn't send the CORS headers back. Therefore, the browser doesn't attempt the cross-origin request.

### Set the exposed response headers

By default, the browser doesn't expose all of the response headers to the app. For more information, see [W3C Cross-Origin Resource Sharing (Terminology): Simple Response Header](https://www.w3.org/TR/cors/#simple-response-header).

The response headers that are available by default are:

* `Cache-Control`
* `Content-Language`
* `Content-Type`
* `Expires`
* `Last-Modified`
* `Pragma`

The CORS specification calls these headers *simple response headers*. To make other headers available to the app, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%252A):

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_erh)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

### Credentials in cross-origin requests

Credentials require special handling in a CORS request. By default, the browser doesn't send credentials with a cross-origin request. Credentials include cookies and HTTP authentication schemes. To send credentials with a cross-origin request, the client must set `XMLHttpRequest.withCredentials` to `true`.

Using `XMLHttpRequest` directly:

```javascript
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://www.example.com/api/test');
xhr.withCredentials = true;
```

Using jQuery:

```javascript
$.ajax({
  type: 'get',
  url: 'https://www.example.com/api/test',
  xhrFields: {
    withCredentials: true
  }
});
```

Using the [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API):

```javascript
fetch('https://www.example.com/api/test', {
    credentials: 'include'
});
```

The server must allow the credentials. To allow cross-origin credentials, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowCredentials%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowCredentials%252A):

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_cco)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

The HTTP response includes an `Access-Control-Allow-Credentials` header, which tells the browser that the server allows credentials for a cross-origin request.

If the browser sends credentials but the response doesn't include a valid `Access-Control-Allow-Credentials` header, the browser doesn't expose the response to the app, and the cross-origin request fails.

Allowing cross-origin credentials is a security risk. A website at another domain can send a signed-in user's credentials to the app on the user's behalf without the user's knowledge. <!-- TODO Review: When using `AllowCredentials`, all CORS enabled domains must be trusted.
I don't like "all CORS enabled domains must be trusted", because it implies that if you're not using  `AllowCredentials`, domains don't need to be trusted. -->

The CORS specification also states that setting origins to `"*"` (all origins) is invalid if the `Access-Control-Allow-Credentials` header is present.

<a name="pref"></a>

## Preflight requests

For some CORS requests, the browser sends an additional [OPTIONS](https://developer.mozilla.org/docs/Web/HTTP/Methods/OPTIONS) request before making the actual request. This request is called a [preflight request](https://developer.mozilla.org/docs/Glossary/Preflight_request). The browser can skip the preflight request if **all** the following conditions are true:

* The request method is GET, HEAD, or POST.
* The app doesn't set request headers other than `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, or `Last-Event-ID`.
* The `Content-Type` header, if set, has one of the following values:
  * `application/x-www-form-urlencoded`
  * `multipart/form-data`
  * `text/plain`

The rule on request headers set for the client request applies to headers that the app sets by calling `setRequestHeader` on the `XMLHttpRequest` object. The CORS specification calls these headers *author request headers*. The rule doesn't apply to headers the browser can set, such as `User-Agent`, `Host`, or `Content-Length`.

> **Note:**
> This article contains URLs created by deploying the [sample code](https://github.com/dotnet/AspNetCore.Docs/tree/live/aspnetcore/security/cors/8.0sample/Cors) to two Azure web sites, `https://cors3.azurewebsites.net` and `https://cors.azurewebsites.net`.

The following is an example response similar to the preflight request made from the **[Put test]** button in the [Test CORS](#testc6) section of this document.

```
General:
Request URL: https://cors3.azurewebsites.net/api/values/5
Request Method: OPTIONS
Status Code: 204 No Content

Response Headers:
Access-Control-Allow-Methods: PUT,DELETE,GET
Access-Control-Allow-Origin: https://cors1.azurewebsites.net
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f8...8;Path=/;HttpOnly;Domain=cors1.azurewebsites.net
Vary: Origin

Request Headers:
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Method: PUT
Connection: keep-alive
Host: cors3.azurewebsites.net
Origin: https://cors1.azurewebsites.net
Referer: https://cors1.azurewebsites.net/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0
```

The preflight request uses the [HTTP OPTIONS](https://developer.mozilla.org/docs/Web/HTTP/Methods/OPTIONS) method. It may include the following headers:

* [Access-Control-Request-Method](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Request-Method): The HTTP method that will be used for the actual request.
* [Access-Control-Request-Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Headers): A list of request headers that the app sets on the actual request. As stated earlier, this doesn't include headers that the browser sets, such as `User-Agent`.

If the preflight request is denied, the app returns a `204 No Content` response but doesn't set the CORS headers. Therefore, the browser doesn't attempt the cross-origin request. For an example of a denied preflight request, see the [Test CORS](#testc6) section of this document.

Using the F12 tools, the console app shows an error similar to one of the following, depending on the browser:

* Firefox: Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at `https://cors1.azurewebsites.net/api/TodoItems1/MyDelete2/5`. (Reason: CORS request did not succeed). [Learn More](https://developer.mozilla.org/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed)
* Chromium based: Access to fetch at 'https://cors1.azurewebsites.net/api/TodoItems1/MyDelete2/5' from origin 'https://cors3.azurewebsites.net' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

To allow specific headers, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%252A):

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_whx)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

To allow all author request headers, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%252A):

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_aah2)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

Browsers aren't consistent in how they set `Access-Control-Request-Headers`. If either:

* Headers are set to anything other than `"*"`
* [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.AllowAnyHeader%252A) is called:
  Include at least `Accept`, `Content-Type`, and `Origin`, plus any custom headers that you want to support.

<a name="apf"></a>

### Automatic preflight request code

When the CORS policy is applied either:

* Globally by calling `app.UseCors` in  `Program.cs`.
* Using the `[EnableCors]` attribute.

ASP.NET Core responds to the preflight OPTIONS request.

The [Test CORS](#testc6) section of this document demonstrates this behavior.

<a name="pro6"></a>

### [HttpOptions] attribute for preflight requests

When CORS is enabled with the appropriate policy, ASP.NET Core generally responds to CORS preflight requests automatically.

The following code uses the [\[HttpOptions\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpOptionsAttribute) attribute to create endpoints for OPTIONS requests:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems2Controller.cs?name=snippet\&highlight=5-17)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems2Controller.cs.md)

See [Test CORS with [EnableCors] attribute and RequireCors method](#tcer) for instructions on testing the preceding code.

### Set the preflight expiration time

The `Access-Control-Max-Age` header specifies how long the response to the preflight request can be cached. To set this header, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetPreflightMaxAge%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetPreflightMaxAge%252A):

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_pfx)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Program.cs.md)

## Enable CORS on an endpoint

<a name="how-cors"></a>

## How CORS works

This section describes what happens in a [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) request at the level of the HTTP messages.

* CORS is **not** a security feature. CORS is a W3C standard that allows a server to relax the same-origin policy.
  * For example, a malicious actor could use [Cross-Site Scripting (XSS)](cross-site-scripting.md) against your site and execute a cross-site request to their CORS enabled site to steal information.
* An API isn't safer by allowing CORS.
  * It's up to the client (browser) to enforce CORS. The server executes the request and returns the response, it's the client that returns an error and blocks the response. For example, any of the following tools will display the server response:
    * [Fiddler](https://www.telerik.com/fiddler)
    * [.NET HttpClient](https://learn.microsoft.com/dotnet/csharp/tutorials/console-webapiclient)
    * A web browser by entering the URL in the address bar.
* It's a way for a server to allow browsers to execute a cross-origin [XHR](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest) or [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) request that otherwise would be forbidden.
  * Browsers without CORS can't do cross-origin requests. Before CORS, [JSONP](https://www.w3schools.com/js/js_json_jsonp.asp) was used to circumvent this restriction. JSONP doesn't use XHR, it uses the `<script>` tag to receive the response. Scripts are allowed to be loaded cross-origin.

The [CORS specification](https://www.w3.org/TR/cors/) introduced several new HTTP headers that enable cross-origin requests. If a browser supports CORS, it sets these headers automatically for cross-origin requests. Custom JavaScript code isn't required to enable CORS.

The following is an example of a cross-origin request from the **Values** test button to `https://cors1.azurewebsites.net/api/values`. The `Origin` header:

* Provides the domain of the site that's making the request.
* Is required and must be different from the host.

**General headers**

```
Request URL: https://cors1.azurewebsites.net/api/values
Request Method: GET
Status Code: 200 OK
```

**Response headers**

```
Content-Encoding: gzip
Content-Type: text/plain; charset=utf-8
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f...;Path=/;HttpOnly;Domain=cors1.azurewebsites.net
Transfer-Encoding: chunked
Vary: Accept-Encoding
X-Powered-By: ASP.NET
```

**Request headers**

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Connection: keep-alive
Host: cors1.azurewebsites.net
Origin: https://cors3.azurewebsites.net
Referer: https://cors3.azurewebsites.net/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 ...
```

In `OPTIONS` requests, the server sets the **Response headers** `Access-Control-Allow-Origin: {allowed origin}` header in the response. For example, in the [sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/8.0sample/Cors/Web2API), the ` Delete [EnableCors]` button `OPTIONS` request contains the following  headers:

**General headers**

```
Request URL: https://cors3.azurewebsites.net/api/TodoItems2/MyDelete2/5
Request Method: OPTIONS
Status Code: 204 No Content
```

**Response headers**

```
Access-Control-Allow-Headers: Content-Type,x-custom-header
Access-Control-Allow-Methods: PUT,DELETE,GET,OPTIONS
Access-Control-Allow-Origin: https://cors1.azurewebsites.net
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f...;Path=/;HttpOnly;Domain=cors3.azurewebsites.net
Vary: Origin
X-Powered-By: ASP.NET
```

**Request headers**

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Headers: content-type
Access-Control-Request-Method: DELETE
Connection: keep-alive
Host: cors3.azurewebsites.net
Origin: https://cors1.azurewebsites.net
Referer: https://cors1.azurewebsites.net/test?number=2
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0
```

In the preceding **Response headers**, the server sets the [Access-Control-Allow-Origin](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header in the response. The `https://cors1.azurewebsites.net` value of this header matches the `Origin` header from the request.

If [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%252A) is called, the `Access-Control-Allow-Origin: *`, the wildcard value, is returned. `AllowAnyOrigin` allows any origin.

If the response doesn't include the `Access-Control-Allow-Origin` header, the cross-origin request fails. Specifically, the browser disallows the request. Even if the server returns a successful response, the browser doesn't make the response available to the client app.

<a name="no-http"></a>

### HTTP redirection to HTTPS causes ERR_INVALID_REDIRECT on the CORS preflight request

Requests to an endpoint using HTTP that are redirected to HTTPS by [Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A) fail with `ERR_INVALID_REDIRECT on the CORS preflight request`.

API projects can reject HTTP requests rather than use `UseHttpsRedirection` to redirect requests to HTTPS.

<a name="options"></a>

## CORS in IIS

When deploying to IIS, CORS has to run before Windows Authentication if the server isn't configured to allow anonymous access. To support this scenario, the [IIS CORS module](https://www.iis.net/downloads/microsoft/iis-cors-module)
needs to be installed and configured for the app.

<a name="testc6"></a>

## Test CORS

The [sample download](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/8.0sample/Cors/Web2API) has code to test CORS. See [how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample). The sample is an API project with Razor Pages added:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/ProgramTest.cs?name=snippet_test)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/ProgramTest.cs.md)

  > **Warning:**
  > `WithOrigins("https://localhost:<port>");` should only be used for testing a sample app similar to the [download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/live/aspnetcore/security/cors/8.0sample/Cors).

> **Note:**
> If you're using `launchSettings.json` in Visual Studio or [configuring C# debug settings in VS Code](https://code.visualstudio.com/docs/csharp/debugger-settings), and using IIS Express to debug locally, ensure that you've configured IIS Express for `"anonymousAuthentication": true`. When `"anonymousAuthentication"` is `false`, the ASP.NET Core web environment host will not see any preflight requests. In particular, if you're using NTLM authentication (`"windowsAuthentication": true`), the first step of the NTLM challenge-response is to send the web browser a 401 challenge, which can make it challenging to verify your preflight route is configured correctly.

The following `ValuesController` provides the endpoints for testing:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Controllers/ValuesController.cs?name=snippet)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Controllers/ValuesController.cs.md)

[MyDisplayRouteInfo](https://github.com/Rick-Anderson/RouteInfo/blob/master/Microsoft.Docs.Samples.RouteInfo/ControllerContextExtensions.cs) is provided by the [Rick.Docs.Samples.RouteInfo](https://www.nuget.org/packages/Rick.Docs.Samples.RouteInfo) NuGet package and displays route information.

Test the preceding sample code by using one of the following approaches:

* Run the sample with `dotnet run` using the default URL of `https://localhost:5001`.
* Run the sample from Visual Studio with the port set to 44398 for a URL of `https://localhost:44398`.

Using a browser with the F12 tools:

* Select the **Values** button and review the headers in the **Network** tab.
* Select the **PUT test** button. See [Display OPTIONS requests](#options) for instructions on displaying the OPTIONS request. The **PUT test** creates two requests, an OPTIONS preflight request and the PUT request.
* Select the **`GetValues2 [DisableCors]`** button to trigger a failed CORS request. As mentioned in the document, the response returns 200 success, but the CORS request is not made. Select the **Console** tab to see the CORS error. Depending on the browser, an error similar to the following is displayed:

     Access to fetch at `'https://cors1.azurewebsites.net/api/values/GetValues2'` from origin `'https://cors3.azurewebsites.net'` has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
     
CORS-enabled endpoints can be tested with a tool, such as [curl](https://curl.haxx.se/) or [Fiddler](https://www.telerik.com/fiddler). When using a tool, the origin of the request specified by the `Origin` header must differ from the host receiving the request. If the request isn't *cross-origin* based on the value of the `Origin` header:

* There's no need for CORS middleware to process the request.
* CORS headers aren't returned in the response.

The following command uses `curl` to issue an OPTIONS request with information:

```bash
curl -X OPTIONS https://cors3.azurewebsites.net/api/TodoItems2/5 -i
```

<!--
curl come with Git. Add to path variable
C:\Program Files\Git\mingw64\bin\

-->

<a name="tcer"></a>

### Test CORS with [EnableCors] attribute and RequireCors method

Consider the following code which uses [endpoint routing](#ecors6) to enable CORS on a per-endpoint basis using `RequireCors`:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/ProgramTest.cs?name=snippet_teste)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/ProgramTest.cs.md)

Notice that only the `/echo` endpoint is using the `RequireCors` to allow cross-origin requests using the specified policy. The controllers below enable CORS using [EnableCors] attribute.

The following `TodoItems1Controller` provides endpoints for testing:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems1Controller.cs?name=snippet2)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems1Controller.cs.md)



The **Delete [EnableCors]** and **GET [EnableCors]** buttons succeed, because the endpoints have `[EnableCors]` and respond to preflight requests. The other endpoints fails. The **GET** button fails, because the [JavaScript](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/8.0sample/Cors/Web2API/wwwroot/js/MyJS.js) sends:

```javascript
 headers: {
      "Content-Type": "x-custom-header"
 },
```

The following `TodoItems2Controller` provides similar endpoints, but includes explicit code to respond to OPTIONS requests:

[Code example (complete source file; reference: \~/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems2Controller.cs?name=snippet2)](../../_code/aspnetcore/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems2Controller.cs.md)

The preceding code can be tested by deploying the sample to Azure. In the **Controller** drop down list, select **Preflight** and then **Set Controller**. All the CORS calls to the `TodoItems2Controller` endpoints succeed.

## Additional resources

* [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/docs/Web/HTTP/CORS)
* [IIS CORS module Configuration Reference](https://learn.microsoft.com/iis/extensions/cors-module/cors-module-configuration-reference)



**Applies to: \= aspnetcore-7.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT) and [Kirk Larkin](https://twitter.com/serpent5)

This article shows how to enable CORS in an ASP.NET Core app.

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the *same-origin policy*. The same-origin policy prevents a malicious site from reading sensitive data from another site. Sometimes, you might want to allow other sites to make cross-origin requests to your app. For more information, see the [Mozilla CORS article](https://developer.mozilla.org/docs/Web/HTTP/CORS).

[Cross Origin Resource Sharing](https://www.w3.org/TR/cors/) (CORS):

* Is a W3C standard that allows a server to relax the same-origin policy.
* Is **not** a security feature, CORS relaxes security. An API is not safer by allowing CORS. For more information, see [How CORS works](#how-cors).
* Allows a server to explicitly allow some cross-origin requests while rejecting others.
* Is safer and more flexible than earlier techniques, such as [JSONP](https://learn.microsoft.com/dotnet/framework/wcf/samples/jsonp).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/8.0sample/Cors/Web2API) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Same origin

Two URLs have the same origin if they have identical schemes, hosts, and ports ([RFC 6454](https://tools.ietf.org/html/rfc6454)).

These two URLs have the same origin:

* `https://example.com/foo.html`
* `https://example.com/bar.html`

These URLs have different origins than the previous two URLs:

* `https://example.net`: Different domain
* `https://www.example.com/foo.html`: Different subdomain
* `http://example.com/foo.html`: Different scheme
* `https://example.com:9000/foo.html`: Different port

## Enable CORS

There are three ways to enable CORS:

* In middleware using a [named policy](#np) or [default policy](#dp).
* Using [endpoint routing](#ecors6).
* With the [[EnableCors]](#attr) attribute.

Using the [[EnableCors]](#attr) attribute with a named policy provides the finest control in limiting endpoints that support CORS.

> **Warning:**
> [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) must be called in the correct order. For more information, see [Middleware order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order). For example, `UseCors` must be called before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A) when using `UseResponseCaching`.

Each approach is detailed in the following sections.

<a name="np"></a>

## CORS with named policy and middleware

CORS middleware handles cross-origin requests. The following code applies a CORS policy to all the app's endpoints with the specified origins:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet\\&highlight=1,5-13,24](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code:

* Sets the policy name to `_myAllowSpecificOrigins`. The policy name is arbitrary.
* Calls the [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) extension method and specifies the  `_myAllowSpecificOrigins` CORS policy. `UseCors` adds the CORS middleware. The call to `UseCors` must be placed after `UseRouting`, but before `UseAuthorization`. For more information, see [Middleware order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).
* Calls [Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors%252A) with a [lambda expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). The lambda takes a [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder) object. [Configuration options](#cors-policy-options), such as `WithOrigins`, are described later in this article.
* Enables the `_myAllowSpecificOrigins` CORS policy for all controller endpoints. See [endpoint routing](#ecors6) to apply a CORS policy to specific endpoints.
* When using [response caching middleware](../performance/caching/middleware.md), call [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A).

With endpoint routing, the CORS middleware **must** be configured to execute between the calls to `UseRouting` and  `UseEndpoints`.



The [Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors%252A) method call adds CORS services to the app's service container:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet\\&highlight=5-13](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

For more information, see [CORS policy options](#cpo6) in this document.

The [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder) methods can be chained, as shown in the following code:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Note: The specified URL must **not** contain a trailing slash (`/`). If the URL terminates with `/`, the comparison returns `false` and no header is returned.

<a name="uc1"></a>

> **Warning:**
>  `UseCors` must be placed after `UseRouting` and before `UseAuthorization`. This is to ensure that CORS headers are included in the response for both authorized and unauthorized calls.

## UseCors and UseStaticFiles order

Typically, `UseStaticFiles` is called before `UseCors`. Apps that use JavaScript to retrieve static files cross site must call `UseCors` before `UseStaticFiles`.

<a name="dp"></a>

### CORS with default policy and middleware

The following highlighted code enables the default CORS policy:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet3\\&highlight=5,21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code applies the default CORS policy to all controller endpoints.

<a name="ecors6"></a>

## Enable Cors with endpoint routing

With endpoint routing, CORS can be enabled on a per-endpoint basis using the [Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors%252A) set of extension methods:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_endp\\&highlight=1,5-13,24,32,35,38](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

In the preceding code:

* `app.UseCors` enables the CORS middleware. Because a default policy hasn't been configured, `app.UseCors()` alone doesn't enable CORS.
* The `/echo` and controller endpoints allow cross-origin requests using the specified policy.
* The `/echo2` and Razor Pages endpoints do **not** allow cross-origin requests because no default policy was specified.

The [[DisableCors]](#dc6) attribute does **not**  disable CORS that has been enabled by endpoint routing with `RequireCors`.

In .NET 7, the `[EnableCors]` attribute must pass a parameter or an [ASP0023](../diagnostics/asp0023.md) warning is generated from an ambiguous match on the route. .NET 8 or later doesn't generate the `ASP0023` warning.

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems2Controller.cs?name=snippet2\\&highlight=35-38,47](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

See [Test CORS with [EnableCors] attribute and RequireCors method](#tcer) for instructions on testing code similar to the preceding.

<a name="attr"></a>

## Enable CORS with attributes

Enabling CORS with the [\[EnableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.EnableCorsAttribute) attribute and applying a named policy to only those endpoints that require CORS provides the finest control.

The [\[EnableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.EnableCorsAttribute) attribute provides an alternative to applying CORS globally. The `[EnableCors]` attribute enables CORS for selected endpoints, rather than all endpoints:

* `[EnableCors]` specifies the default policy.
* `[EnableCors("{Policy String}")]` specifies a named policy.

The `[EnableCors]` attribute can be applied to:

* Razor Page `PageModel`
* Controller
* Controller action method

Different policies can be applied to controllers, page models, or action methods with the `[EnableCors]` attribute. When the `[EnableCors]` attribute is applied to a controller, page model, or action method, and CORS is enabled in middleware, **both** policies are applied. **We recommend against combining policies. Use the** `[EnableCors]` **attribute or middleware, not both in the same app.**

The following code applies a different policy to each method:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Controllers/WidgetController.cs?name=snippet\\&highlight=6,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The following code creates two CORS policies:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_attr](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

For the finest control of limiting CORS requests:

* Use `[EnableCors("MyPolicy")]` with a named policy.
* Don't define a default policy.
* Don't use [endpoint routing](#ecors6).

The code in the next section meets the preceding list.



<a name="dc6"></a>

### Disable CORS

The [\[DisableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.DisableCorsAttribute) attribute does **not**  disable CORS that has been enabled by [endpoint routing](#ecors6).

The following code defines the CORS policy `"MyPolicy"`:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_dcors](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The following code disables CORS for the `GetValues2` action:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Controllers/ValuesController.cs?name=snippet\\&highlight=1,23](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code:

* Doesn't enable CORS with [endpoint routing](#ecors6).
* Doesn't define a [default CORS policy](#dp).
* Uses [[EnableCors("MyPolicy")]](#attr) to enable the `"MyPolicy"` CORS policy for the controller.
* Disables CORS for the `GetValues2` method.

See [Test CORS](#testc6) for instructions on testing the preceding code.

<a name="cpo6"></a>

## CORS policy options

This section describes the various options that can be set in a CORS policy:

* [Set the allowed origins](#set-the-allowed-origins)
* [Set the allowed HTTP methods](#set-the-allowed-http-methods)
* [Set the allowed request headers](#set-the-allowed-request-headers)
* [Set the exposed response headers](#set-the-exposed-response-headers)
* [Credentials in cross-origin requests](#credentials-in-cross-origin-requests)
* [Set the preflight expiration time](#set-the-preflight-expiration-time)

[Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy%252A) is called in `Program.cs`. For some options, it may be helpful to read the [How CORS works](#how-cors) section first.

## Set the allowed origins

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%252A): Allows CORS requests from all origins with any scheme (`http` or `https`). `AllowAnyOrigin` is insecure because *any website* can make cross-origin requests to the app.

> **Note:**
> Specifying `AllowAnyOrigin` and `AllowCredentials` is an insecure configuration and can result in cross-site request forgery. The CORS service returns an invalid CORS response when an app is configured with both methods.

`AllowAnyOrigin` affects preflight requests and the `Access-Control-Allow-Origin` header. For more information, see the [Preflight requests](#preflight-requests) section.

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetIsOriginAllowedToAllowWildcardSubdomains%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetIsOriginAllowedToAllowWildcardSubdomains%252A): Sets the [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.IsOriginAllowed%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.IsOriginAllowed%252A) property of the policy to be a function that allows origins to match a configured wildcard domain when evaluating if the origin is allowed.

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_aa](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

In the preceding code, `SetIsOriginAllowedToAllowWildcardSubdomains` is called with the wildcard origin `"https://*.example.com"`. This configuration allows CORS requests from any subdomain of `example.com`, such as `https://subdomain.example.com` or `https://api.example.com`. The `*` wildcard character must be included in the origin to enable wildcard subdomain matching.

### Set the allowed HTTP methods

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyMethod%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyMethod%252A):

* Allows any HTTP method:
* Affects preflight requests and the `Access-Control-Allow-Methods` header. For more information, see the [Preflight requests](#preflight-requests) section.

### Set the allowed request headers

To allow specific headers to be sent in a CORS request, called [author request headers](https://xhr.spec.whatwg.org/#request), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%252A) and specify the allowed headers:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_sa](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

To allow all [author request headers](https://www.w3.org/TR/cors/#author-request-headers), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_aah](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

`AllowAnyHeader` affects preflight requests and the [Access-Control-Request-Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Request-Method) header. For more information, see the [Preflight requests](#preflight-requests) section.

A CORS middleware policy match to specific headers specified by `WithHeaders` is only possible when the headers sent in `Access-Control-Request-Headers` exactly match the headers stated in `WithHeaders`.

For instance, consider an app configured as follows:

```csharp
app.UseCors(policy => policy.WithHeaders(HeaderNames.CacheControl));
```

CORS middleware declines a preflight request with the following request header because `Content-Language` ([HeaderNames.ContentLanguage](https://learn.microsoft.com/search/?terms=Microsoft.Net.Http.Headers.HeaderNames.ContentLanguage)) isn't listed in `WithHeaders`:

```
Access-Control-Request-Headers: Cache-Control, Content-Language
```

The app returns a *200 OK* response but doesn't send the CORS headers back. Therefore, the browser doesn't attempt the cross-origin request.

### Set the exposed response headers

By default, the browser doesn't expose all of the response headers to the app. For more information, see [W3C Cross-Origin Resource Sharing (Terminology): Simple Response Header](https://www.w3.org/TR/cors/#simple-response-header).

The response headers that are available by default are:

* `Cache-Control`
* `Content-Language`
* `Content-Type`
* `Expires`
* `Last-Modified`
* `Pragma`

The CORS specification calls these headers *simple response headers*. To make other headers available to the app, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_erh](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

### Credentials in cross-origin requests

Credentials require special handling in a CORS request. By default, the browser doesn't send credentials with a cross-origin request. Credentials include cookies and HTTP authentication schemes. To send credentials with a cross-origin request, the client must set `XMLHttpRequest.withCredentials` to `true`.

Using `XMLHttpRequest` directly:

```javascript
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://www.example.com/api/test');
xhr.withCredentials = true;
```

Using jQuery:

```javascript
$.ajax({
  type: 'get',
  url: 'https://www.example.com/api/test',
  xhrFields: {
    withCredentials: true
  }
});
```

Using the [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API):

```javascript
fetch('https://www.example.com/api/test', {
    credentials: 'include'
});
```

The server must allow the credentials. To allow cross-origin credentials, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowCredentials%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowCredentials%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_cco](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The HTTP response includes an `Access-Control-Allow-Credentials` header, which tells the browser that the server allows credentials for a cross-origin request.

If the browser sends credentials but the response doesn't include a valid `Access-Control-Allow-Credentials` header, the browser doesn't expose the response to the app, and the cross-origin request fails.

Allowing cross-origin credentials is a security risk. A website at another domain can send a signed-in user's credentials to the app on the user's behalf without the user's knowledge. <!-- TODO Review: When using `AllowCredentials`, all CORS enabled domains must be trusted.
I don't like "all CORS enabled domains must be trusted", because it implies that if you're not using  `AllowCredentials`, domains don't need to be trusted. -->

The CORS specification also states that setting origins to `"*"` (all origins) is invalid if the `Access-Control-Allow-Credentials` header is present.

<a name="pref"></a>

## Preflight requests

For some CORS requests, the browser sends an additional [OPTIONS](https://developer.mozilla.org/docs/Web/HTTP/Methods/OPTIONS) request before making the actual request. This request is called a [preflight request](https://developer.mozilla.org/docs/Glossary/Preflight_request). The browser can skip the preflight request if **all** the following conditions are true:

* The request method is GET, HEAD, or POST.
* The app doesn't set request headers other than `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, or `Last-Event-ID`.
* The `Content-Type` header, if set, has one of the following values:
  * `application/x-www-form-urlencoded`
  * `multipart/form-data`
  * `text/plain`

The rule on request headers set for the client request applies to headers that the app sets by calling `setRequestHeader` on the `XMLHttpRequest` object. The CORS specification calls these headers [author request headers](https://www.w3.org/TR/cors/#author-request-headers). The rule doesn't apply to headers the browser can set, such as `User-Agent`, `Host`, or `Content-Length`.



The following is an example response similar to the preflight request made from the **[Put test]** button in the [Test CORS](#testc6) section of this document.

```
General:
Request URL: https://cors3.azurewebsites.net/api/values/5
Request Method: OPTIONS
Status Code: 204 No Content

Response Headers:
Access-Control-Allow-Methods: PUT,DELETE,GET
Access-Control-Allow-Origin: https://cors1.azurewebsites.net
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f8...8;Path=/;HttpOnly;Domain=cors1.azurewebsites.net
Vary: Origin

Request Headers:
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Method: PUT
Connection: keep-alive
Host: cors3.azurewebsites.net
Origin: https://cors1.azurewebsites.net
Referer: https://cors1.azurewebsites.net/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0
```

The preflight request uses the [HTTP OPTIONS](https://developer.mozilla.org/docs/Web/HTTP/Methods/OPTIONS) method. It may include the following headers:

* [Access-Control-Request-Method](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Request-Method): The HTTP method that will be used for the actual request.
* [Access-Control-Request-Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Headers): A list of request headers that the app sets on the actual request. As stated earlier, this doesn't include headers that the browser sets, such as `User-Agent`.
* [Access-Control-Allow-Methods](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)

If the preflight request is denied, the app returns a `200 OK` response but doesn't set the CORS headers. Therefore, the browser doesn't attempt the cross-origin request. For an example of a denied preflight request, see the [Test CORS](#testc6) section of this document.

Using the F12 tools, the console app shows an error similar to one of the following, depending on the browser:

* Firefox: Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at `https://cors1.azurewebsites.net/api/TodoItems1/MyDelete2/5`. (Reason: CORS request did not succeed). [Learn More](https://developer.mozilla.org/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed)
* Chromium based: Access to fetch at 'https://cors1.azurewebsites.net/api/TodoItems1/MyDelete2/5' from origin 'https://cors3.azurewebsites.net' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

To allow specific headers, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_whx](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

To allow all [author request headers](https://www.w3.org/TR/cors/#author-request-headers), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_aah2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Browsers aren't consistent in how they set `Access-Control-Request-Headers`. If either:

* Headers are set to anything other than `"*"`
* [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.AllowAnyHeader%252A) is called:
  Include at least `Accept`, `Content-Type`, and `Origin`, plus any custom headers that you want to support.

<a name="apf"></a>

### Automatic preflight request code

When the CORS policy is applied either:

* Globally by calling `app.UseCors` in  `Program.cs`.
* Using the `[EnableCors]` attribute.

ASP.NET Core responds to the preflight OPTIONS request.

The [Test CORS](#testc6) section of this document demonstrates this behavior.

<a name="pro6"></a>

### [HttpOptions] attribute for preflight requests

When CORS is enabled with the appropriate policy, ASP.NET Core generally responds to CORS preflight requests automatically.

The following code uses the [\[HttpOptions\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpOptionsAttribute) attribute to create endpoints for OPTIONS requests:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems2Controller.cs?name=snippet\\&highlight=5-17](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

See [Test CORS with [EnableCors] attribute and RequireCors method](#tcer) for instructions on testing the preceding code.

### Set the preflight expiration time

The `Access-Control-Max-Age` header specifies how long the response to the preflight request can be cached. To set this header, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetPreflightMaxAge%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetPreflightMaxAge%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Program.cs?name=snippet_pfx](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

## Enable CORS on an endpoint

<a name="how-cors"></a>

## How CORS works

This section describes what happens in a [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) request at the level of the HTTP messages.

* CORS is **not** a security feature. CORS is a W3C standard that allows a server to relax the same-origin policy.
  * For example, a malicious actor could use [Cross-Site Scripting (XSS)](cross-site-scripting.md) against your site and execute a cross-site request to their CORS enabled site to steal information.
* An API isn't safer by allowing CORS.
  * It's up to the client (browser) to enforce CORS. The server executes the request and returns the response, it's the client that returns an error and blocks the response. For example, any of the following tools will display the server response:
    * [Fiddler](https://www.telerik.com/fiddler)
    * [.NET HttpClient](https://learn.microsoft.com/dotnet/csharp/tutorials/console-webapiclient)
    * A web browser by entering the URL in the address bar.
* It's a way for a server to allow browsers to execute a cross-origin [XHR](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest) or [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) request that otherwise would be forbidden.
  * Browsers without CORS can't do cross-origin requests. Before CORS, [JSONP](https://www.w3schools.com/js/js_json_jsonp.asp) was used to circumvent this restriction. JSONP doesn't use XHR, it uses the `<script>` tag to receive the response. Scripts are allowed to be loaded cross-origin.

The [CORS specification](https://www.w3.org/TR/cors/) introduced several new HTTP headers that enable cross-origin requests. If a browser supports CORS, it sets these headers automatically for cross-origin requests. Custom JavaScript code isn't required to enable CORS.

Select the **PUT** test button on the deployed sample.
 The `Origin` header:

* Provides the domain of the site that's making the request.
* Is required and must be different from the host.

**General headers**

```
Request URL: https://cors1.azurewebsites.net/api/values
Request Method: GET
Status Code: 200 OK
```

**Response headers**

```
Content-Encoding: gzip
Content-Type: text/plain; charset=utf-8
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f...;Path=/;HttpOnly;Domain=cors1.azurewebsites.net
Transfer-Encoding: chunked
Vary: Accept-Encoding
X-Powered-By: ASP.NET
```

**Request headers**

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Connection: keep-alive
Host: cors1.azurewebsites.net
Origin: https://cors3.azurewebsites.net
Referer: https://cors3.azurewebsites.net/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 ...
```

In `OPTIONS` requests, the server sets the **Response headers** `Access-Control-Allow-Origin: {allowed origin}` header in the response. For example, in the [sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/8.0sample/Cors/Web2API), the ` Delete [EnableCors]` button `OPTIONS` request contains the following  headers:

**General headers**

```
Request URL: https://cors3.azurewebsites.net/api/TodoItems2/MyDelete2/5
Request Method: OPTIONS
Status Code: 204 No Content
```

**Response headers**

```
Access-Control-Allow-Headers: Content-Type,x-custom-header
Access-Control-Allow-Methods: PUT,DELETE,GET,OPTIONS
Access-Control-Allow-Origin: https://cors1.azurewebsites.net
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f...;Path=/;HttpOnly;Domain=cors3.azurewebsites.net
Vary: Origin
X-Powered-By: ASP.NET
```

**Request headers**

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Headers: content-type
Access-Control-Request-Method: DELETE
Connection: keep-alive
Host: cors3.azurewebsites.net
Origin: https://cors1.azurewebsites.net
Referer: https://cors1.azurewebsites.net/test?number=2
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0
```

In the preceding **Response headers**, the server sets the [Access-Control-Allow-Origin](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header in the response. The `https://cors1.azurewebsites.net` value of this header matches the `Origin` header from the request.

If [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%252A) is called, the `Access-Control-Allow-Origin: *`, the wildcard value, is returned. `AllowAnyOrigin` allows any origin.

If the response doesn't include the `Access-Control-Allow-Origin` header, the cross-origin request fails. Specifically, the browser disallows the request. Even if the server returns a successful response, the browser doesn't make the response available to the client app.

<a name="no-http"></a>

### HTTP redirection to HTTPS causes ERR_INVALID_REDIRECT on the CORS preflight request

Requests to an endpoint using HTTP that are redirected to HTTPS by [Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A) fail with `ERR_INVALID_REDIRECT on the CORS preflight request`.

API projects can reject HTTP requests rather than use `UseHttpsRedirection` to redirect requests to HTTPS.

<a name="options"></a>

## CORS in IIS

When deploying to IIS, CORS has to run before Windows Authentication if the server isn't configured to allow anonymous access. To support this scenario, the [IIS CORS module](https://www.iis.net/downloads/microsoft/iis-cors-module)
needs to be installed and configured for the app.

<a name="testc6"></a>

## Test CORS

The [sample download](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/8.0sample/Cors/Web2API) has code to test CORS. See [how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample). The sample is an API project with Razor Pages added:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/ProgramTest.cs?name=snippet_test](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

  > **Warning:**
  > `WithOrigins("https://localhost:<port>");` should only be used for testing a sample app similar to the [download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/live/aspnetcore/security/cors/8.0sample/Cors).

The following `ValuesController` provides the endpoints for testing:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Controllers/ValuesController.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

[MyDisplayRouteInfo](https://github.com/Rick-Anderson/RouteInfo/blob/master/Microsoft.Docs.Samples.RouteInfo/ControllerContextExtensions.cs) is provided by the [Rick.Docs.Samples.RouteInfo](https://www.nuget.org/packages/Rick.Docs.Samples.RouteInfo) NuGet package and displays route information.

Test the preceding sample code by using one of the following approaches:


* Run the sample with `dotnet run` using the default URL of `https://localhost:5001`.
* Run the sample from Visual Studio with the port set to 44398 for a URL of `https://localhost:44398`.

Using a browser with the F12 tools:

* Select the **Values** button and review the headers in the **Network** tab.
* Select the **PUT test** button. See [Display OPTIONS requests](#options) for instructions on displaying the OPTIONS request. The **PUT test** creates two requests, an OPTIONS preflight request and the PUT request.
* Select the **`GetValues2 [DisableCors]`** button to trigger a failed CORS request. As mentioned in the document, the response returns 200 success, but the CORS request is not made. Select the **Console** tab to see the CORS error. Depending on the browser, an error similar to the following is displayed:

     Access to fetch at `'https://cors1.azurewebsites.net/api/values/GetValues2'` from origin `'https://cors3.azurewebsites.net'` has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
     
CORS-enabled endpoints can be tested with a tool, such as [curl](https://curl.haxx.se/) or [Fiddler](https://www.telerik.com/fiddler). When using a tool, the origin of the request specified by the `Origin` header must differ from the host receiving the request. If the request isn't *cross-origin* based on the value of the `Origin` header:

* There's no need for CORS middleware to process the request.
* CORS headers aren't returned in the response.

The following command uses `curl` to issue an OPTIONS request with information:

```bash
curl -X OPTIONS https://cors3.azurewebsites.net/api/TodoItems2/5 -i
```

<!--
curl come with Git. Add to path variable
C:\Program Files\Git\mingw64\bin\

-->

<a name="tcer"></a>

### Test CORS with [EnableCors] attribute and RequireCors method

Consider the following code which uses [endpoint routing](#ecors6) to enable CORS on a per-endpoint basis using `RequireCors`:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/ProgramTest.cs?name=snippet_teste](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Notice that only the `/echo` endpoint is using the `RequireCors` to allow cross-origin requests using the specified policy. The controllers below enable CORS using [EnableCors] attribute.

The following `TodoItems1Controller` provides endpoints for testing:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems1Controller.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)



The **Delete [EnableCors]** and **GET [EnableCors]** buttons succeed, because the endpoints have `[EnableCors]` and respond to preflight requests. The other endpoints fails. The **GET** button fails, because the [JavaScript](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/8.0sample/Cors/Web2API/wwwroot/js/MyJS.js) sends:

```javascript
 headers: {
      "Content-Type": "x-custom-header"
 },
```

The following `TodoItems2Controller` provides similar endpoints, but includes explicit code to respond to OPTIONS requests:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/8.0sample/Cors/Web2API/Controllers/TodoItems2Controller.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code can be tested by deploying the sample to Azure.In the **Controller** drop down list, select **Preflight** and then **Set Controller**. All the CORS calls to the `TodoItems2Controller` endpoints succeed.

## Additional resources

* [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/docs/Web/HTTP/CORS)
* [IIS CORS module Configuration Reference](https://learn.microsoft.com/iis/extensions/cors-module/cors-module-configuration-reference)





**Applies to: \= aspnetcore-6.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT) and [Kirk Larkin](https://twitter.com/serpent5)

This article shows how to enable CORS in an ASP.NET Core app.

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the *same-origin policy*. The same-origin policy prevents a malicious site from reading sensitive data from another site. Sometimes, you might want to allow other sites to make cross-origin requests to your app. For more information, see the [Mozilla CORS article](https://developer.mozilla.org/docs/Web/HTTP/CORS).

[Cross Origin Resource Sharing](https://www.w3.org/TR/cors/) (CORS):

* Is a W3C standard that allows a server to relax the same-origin policy.
* Is **not** a security feature, CORS relaxes security. An API is not safer by allowing CORS. For more information, see [How CORS works](#how-cors).
* Allows a server to explicitly allow some cross-origin requests while rejecting others.
* Is safer and more flexible than earlier techniques, such as [JSONP](https://learn.microsoft.com/dotnet/framework/wcf/samples/jsonp).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/6.0sample/Cors/WebAPI) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Same origin

Two URLs have the same origin if they have identical schemes, hosts, and ports ([RFC 6454](https://tools.ietf.org/html/rfc6454)).

These two URLs have the same origin:

* `https://example.com/foo.html`
* `https://example.com/bar.html`

These URLs have different origins than the previous two URLs:

* `https://example.net`: Different domain
* `https://www.example.com/foo.html`: Different subdomain
* `http://example.com/foo.html`: Different scheme
* `https://example.com:9000/foo.html`: Different port

## Enable CORS

There are three ways to enable CORS:

* In middleware using a [named policy](#np) or [default policy](#dp).
* Using [endpoint routing](#ecors6).
* With the [[EnableCors]](#attr) attribute.

Using the [[EnableCors]](#attr) attribute with a named policy provides the finest control in limiting endpoints that support CORS.

> **Warning:**
> [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) must be called in the correct order. For more information, see [Middleware order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order). For example, `UseCors` must be called before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A) when using `UseResponseCaching`.

Each approach is detailed in the following sections.

<a name="np"></a>

## CORS with named policy and middleware

CORS middleware handles cross-origin requests. The following code applies a CORS policy to all the app's endpoints with the specified origins:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet\\&highlight=1,5-13,24](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code:

* Sets the policy name to `_myAllowSpecificOrigins`. The policy name is arbitrary.
* Calls the [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) extension method and specifies the  `_myAllowSpecificOrigins` CORS policy. `UseCors` adds the CORS middleware. The call to `UseCors` must be placed after `UseRouting`, but before `UseAuthorization`. For more information, see [Middleware order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).
* Calls [Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors%252A) with a [lambda expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). The lambda takes a [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder) object. [Configuration options](#cors-policy-options), such as `WithOrigins`, are described later in this article.
* Enables the `_myAllowSpecificOrigins` CORS policy for all controller endpoints. See [endpoint routing](#ecors6) to apply a CORS policy to specific endpoints.
* When using [response caching middleware](../performance/caching/middleware.md), call [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A).

With endpoint routing, the CORS middleware **must** be configured to execute between the calls to `UseRouting` and  `UseEndpoints`.



The [Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors%252A) method call adds CORS services to the app's service container:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet\\&highlight=5-13](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

For more information, see [CORS policy options](#cpo6) in this document.

The [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder) methods can be chained, as shown in the following code:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Note: The specified URL must **not** contain a trailing slash (`/`). If the URL terminates with `/`, the comparison returns `false` and no header is returned.

<a name="uc1"></a>

> **Warning:**
>  `UseCors` must be placed after `UseRouting` and before `UseAuthorization`. This is to ensure that CORS headers are included in the response for both authorized and unauthorized calls.

## UseCors and UseStaticFiles order

Typically, `UseStaticFiles` is called before `UseCors`. Apps that use JavaScript to retrieve static files cross site must call `UseCors` before `UseStaticFiles`.

<a name="dp"></a>

### CORS with default policy and middleware

The following highlighted code enables the default CORS policy:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet3\\&highlight=5,21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code applies the default CORS policy to all controller endpoints.

<a name="ecors6"></a>

## Enable Cors with endpoint routing

Enabling CORS on a per-endpoint basis using `RequireCors` ***does not support [automatic preflight requests](#apf).*** For more information, see [this GitHub issue](https://github.com/dotnet/aspnetcore/issues/20709) and [Test CORS with endpoint routing and [HttpOptions]](#tcer).

With endpoint routing, CORS can be enabled on a per-endpoint basis using the [Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors%252A) set of extension methods:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_endp\\&highlight=1,5-13,24,32,35,38](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

In the preceding code:

* `app.UseCors` enables the CORS middleware. Because a default policy hasn't been configured, `app.UseCors()` alone doesn't enable CORS.
* The `/echo` and controller endpoints allow cross-origin requests using the specified policy.
* The `/echo2` and Razor Pages endpoints do **not** allow cross-origin requests because no default policy was specified.

The [[DisableCors]](#dc6) attribute does **not**  disable CORS that has been enabled by endpoint routing with `RequireCors`.

See [Test CORS with endpoint routing and [HttpOptions]](#tcer) for instructions on testing code similar to the preceding.

<a name="attr"></a>

## Enable CORS with attributes

Enabling CORS with the [\[EnableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.EnableCorsAttribute) attribute and applying a named policy to only those endpoints that require CORS provides the finest control.

The [\[EnableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.EnableCorsAttribute) attribute provides an alternative to applying CORS globally. The `[EnableCors]` attribute enables CORS for selected endpoints, rather than all endpoints:

* `[EnableCors]` specifies the default policy.
* `[EnableCors("{Policy String}")]` specifies a named policy.

The `[EnableCors]` attribute can be applied to:

* Razor Page `PageModel`
* Controller
* Controller action method

Different policies can be applied to controllers, page models, or action methods with the `[EnableCors]` attribute. When the `[EnableCors]` attribute is applied to a controller, page model, or action method, and CORS is enabled in middleware, **both** policies are applied. **We recommend against combining policies. Use the** `[EnableCors]` **attribute or middleware, not both in the same app.**

The following code applies a different policy to each method:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Controllers/WidgetController.cs?name=snippet\\&highlight=6,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The following code creates two CORS policies:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_attr](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

For the finest control of limiting CORS requests:

* Use `[EnableCors("MyPolicy")]` with a named policy.
* Don't define a default policy.
* Don't use [endpoint routing](#ecors6).

The code in the next section meets the preceding list.



<a name="dc6"></a>

### Disable CORS

The [\[DisableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.DisableCorsAttribute) attribute does **not**  disable CORS that has been enabled by [endpoint routing](#ecors6).

The following code defines the CORS policy `"MyPolicy"`:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_dcors](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The following code disables CORS for the `GetValues2` action:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Controllers/ValuesController.cs?name=snippet\\&highlight=1,23](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code:

* Doesn't enable CORS with [endpoint routing](#ecors6).
* Doesn't define a [default CORS policy](#dp).
* Uses [[EnableCors("MyPolicy")]](#attr) to enable the `"MyPolicy"` CORS policy for the controller.
* Disables CORS for the `GetValues2` method.

See [Test CORS](#testc6) for instructions on testing the preceding code.

<a name="cpo6"></a>

## CORS policy options

This section describes the various options that can be set in a CORS policy:

* [Set the allowed origins](#set-the-allowed-origins)
* [Set the allowed HTTP methods](#set-the-allowed-http-methods)
* [Set the allowed request headers](#set-the-allowed-request-headers)
* [Set the exposed response headers](#set-the-exposed-response-headers)
* [Credentials in cross-origin requests](#credentials-in-cross-origin-requests)
* [Set the preflight expiration time](#set-the-preflight-expiration-time)

[Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy%252A) is called in `Program.cs`. For some options, it may be helpful to read the [How CORS works](#how-cors) section first.

## Set the allowed origins

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%252A): Allows CORS requests from all origins with any scheme (`http` or `https`). `AllowAnyOrigin` is insecure because *any website* can make cross-origin requests to the app.

> **Note:**
> Specifying `AllowAnyOrigin` and `AllowCredentials` is an insecure configuration and can result in cross-site request forgery. The CORS service returns an invalid CORS response when an app is configured with both methods.

`AllowAnyOrigin` affects preflight requests and the `Access-Control-Allow-Origin` header. For more information, see the [Preflight requests](#preflight-requests) section.

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetIsOriginAllowedToAllowWildcardSubdomains%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetIsOriginAllowedToAllowWildcardSubdomains%252A): Sets the [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.IsOriginAllowed%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.IsOriginAllowed%252A) property of the policy to be a function that allows origins to match a configured wildcard domain when evaluating if the origin is allowed.

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_aa](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

In the preceding code, `SetIsOriginAllowedToAllowWildcardSubdomains` is called with the wildcard origin `"https://*.example.com"`. This configuration allows CORS requests from any subdomain of `example.com`, such as `https://subdomain.example.com` or `https://api.example.com`. The `*` wildcard character must be included in the origin to enable wildcard subdomain matching.

### Set the allowed HTTP methods

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyMethod%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyMethod%252A):

* Allows any HTTP method:
* Affects preflight requests and the `Access-Control-Allow-Methods` header. For more information, see the [Preflight requests](#preflight-requests) section.

### Set the allowed request headers

To allow specific headers to be sent in a CORS request, called [author request headers](https://xhr.spec.whatwg.org/#request), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%252A) and specify the allowed headers:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_sa](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

To allow all [author request headers](https://www.w3.org/TR/cors/#author-request-headers), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_aah](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

`AllowAnyHeader` affects preflight requests and the [Access-Control-Request-Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Request-Method) header. For more information, see the [Preflight requests](#preflight-requests) section.

A CORS middleware policy match to specific headers specified by `WithHeaders` is only possible when the headers sent in `Access-Control-Request-Headers` exactly match the headers stated in `WithHeaders`.

For instance, consider an app configured as follows:

```csharp
app.UseCors(policy => policy.WithHeaders(HeaderNames.CacheControl));
```

CORS middleware declines a preflight request with the following request header because `Content-Language` ([HeaderNames.ContentLanguage](https://learn.microsoft.com/search/?terms=Microsoft.Net.Http.Headers.HeaderNames.ContentLanguage)) isn't listed in `WithHeaders`:

```
Access-Control-Request-Headers: Cache-Control, Content-Language
```

The app returns a *200 OK* response but doesn't send the CORS headers back. Therefore, the browser doesn't attempt the cross-origin request.

### Set the exposed response headers

By default, the browser doesn't expose all of the response headers to the app. For more information, see [W3C Cross-Origin Resource Sharing (Terminology): Simple Response Header](https://www.w3.org/TR/cors/#simple-response-header).

The response headers that are available by default are:

* `Cache-Control`
* `Content-Language`
* `Content-Type`
* `Expires`
* `Last-Modified`
* `Pragma`

The CORS specification calls these headers *simple response headers*. To make other headers available to the app, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_erh](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

### Credentials in cross-origin requests

Credentials require special handling in a CORS request. By default, the browser doesn't send credentials with a cross-origin request. Credentials include cookies and HTTP authentication schemes. To send credentials with a cross-origin request, the client must set `XMLHttpRequest.withCredentials` to `true`.

Using `XMLHttpRequest` directly:

```javascript
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://www.example.com/api/test');
xhr.withCredentials = true;
```

Using jQuery:

```javascript
$.ajax({
  type: 'get',
  url: 'https://www.example.com/api/test',
  xhrFields: {
    withCredentials: true
  }
});
```

Using the [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API):

```javascript
fetch('https://www.example.com/api/test', {
    credentials: 'include'
});
```

The server must allow the credentials. To allow cross-origin credentials, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowCredentials%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowCredentials%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_cco](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The HTTP response includes an `Access-Control-Allow-Credentials` header, which tells the browser that the server allows credentials for a cross-origin request.

If the browser sends credentials but the response doesn't include a valid `Access-Control-Allow-Credentials` header, the browser doesn't expose the response to the app, and the cross-origin request fails.

Allowing cross-origin credentials is a security risk. A website at another domain can send a signed-in user's credentials to the app on the user's behalf without the user's knowledge. <!-- TODO Review: When using `AllowCredentials`, all CORS enabled domains must be trusted.
I don't like "all CORS enabled domains must be trusted", because it implies that if you're not using  `AllowCredentials`, domains don't need to be trusted. -->

The CORS specification also states that setting origins to `"*"` (all origins) is invalid if the `Access-Control-Allow-Credentials` header is present.

<a name="pref"></a>

## Preflight requests

For some CORS requests, the browser sends an additional [OPTIONS](https://developer.mozilla.org/docs/Web/HTTP/Methods/OPTIONS) request before making the actual request. This request is called a [preflight request](https://developer.mozilla.org/docs/Glossary/Preflight_request). The browser can skip the preflight request if **all** the following conditions are true:

* The request method is GET, HEAD, or POST.
* The app doesn't set request headers other than `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, or `Last-Event-ID`.
* The `Content-Type` header, if set, has one of the following values:
  * `application/x-www-form-urlencoded`
  * `multipart/form-data`
  * `text/plain`

The rule on request headers set for the client request applies to headers that the app sets by calling `setRequestHeader` on the `XMLHttpRequest` object. The CORS specification calls these headers [author request headers](https://www.w3.org/TR/cors/#author-request-headers). The rule doesn't apply to headers the browser can set, such as `User-Agent`, `Host`, or `Content-Length`.



The following is an example response similar to the preflight request made from the **[Put test]** button in the [Test CORS](#testc6) section of this document.

```
General:
Request URL: https://cors3.azurewebsites.net/api/values/5
Request Method: OPTIONS
Status Code: 204 No Content

Response Headers:
Access-Control-Allow-Methods: PUT,DELETE,GET
Access-Control-Allow-Origin: https://cors1.azurewebsites.net
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f8...8;Path=/;HttpOnly;Domain=cors1.azurewebsites.net
Vary: Origin

Request Headers:
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Method: PUT
Connection: keep-alive
Host: cors3.azurewebsites.net
Origin: https://cors1.azurewebsites.net
Referer: https://cors1.azurewebsites.net/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0
```

The preflight request uses the [HTTP OPTIONS](https://developer.mozilla.org/docs/Web/HTTP/Methods/OPTIONS) method. It may include the following headers:

* [Access-Control-Request-Method](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Request-Method): The HTTP method that will be used for the actual request.
* [Access-Control-Request-Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Headers): A list of request headers that the app sets on the actual request. As stated earlier, this doesn't include headers that the browser sets, such as `User-Agent`.
* [Access-Control-Allow-Methods](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)

If the preflight request is denied, the app returns a `200 OK` response but doesn't set the CORS headers. Therefore, the browser doesn't attempt the cross-origin request. For an example of a denied preflight request, see the [Test CORS](#testc6) section of this document.

Using the F12 tools, the console app shows an error similar to one of the following, depending on the browser:

* Firefox: Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at `https://cors1.azurewebsites.net/api/TodoItems1/MyDelete2/5`. (Reason: CORS request did not succeed). [Learn More](https://developer.mozilla.org/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed)
* Chromium based: Access to fetch at 'https://cors1.azurewebsites.net/api/TodoItems1/MyDelete2/5' from origin 'https://cors3.azurewebsites.net' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

To allow specific headers, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_whx](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

To allow all [author request headers](https://www.w3.org/TR/cors/#author-request-headers), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_aah2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Browsers aren't consistent in how they set `Access-Control-Request-Headers`. If either:

* Headers are set to anything other than `"*"`
* [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.AllowAnyHeader%252A) is called:
  Include at least `Accept`, `Content-Type`, and `Origin`, plus any custom headers that you want to support.

<a name="apf"></a>

### Automatic preflight request code

When the CORS policy is applied either:

* Globally by calling `app.UseCors` in  `Program.cs`.
* Using the `[EnableCors]` attribute.

ASP.NET Core responds to the preflight OPTIONS request.

Enabling CORS on a per-endpoint basis using `RequireCors` currently does **not** support automatic preflight requests.

The [Test CORS](#testc6) section of this document demonstrates this behavior.

<a name="pro6"></a>

### [HttpOptions] attribute for preflight requests

When CORS is enabled with the appropriate policy, ASP.NET Core generally responds to CORS preflight requests automatically. In some scenarios, this may not be the case. For example, using [CORS with endpoint routing](#ecors6).

The following code uses the [\[HttpOptions\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpOptionsAttribute) attribute to create endpoints for OPTIONS requests:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Controllers/TodoItems2Controller.cs?name=snippet\\&highlight=5-17](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

See [Test CORS with endpoint routing and [HttpOptions]](#tcer) for instructions on testing the preceding code.

### Set the preflight expiration time

The `Access-Control-Max-Age` header specifies how long the response to the preflight request can be cached. To set this header, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetPreflightMaxAge%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetPreflightMaxAge%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Program.cs?name=snippet_pfx](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

<a name="how-cors"></a>

## How CORS works

This section describes what happens in a [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) request at the level of the HTTP messages.

* CORS is **not** a security feature. CORS is a W3C standard that allows a server to relax the same-origin policy.
  * For example, a malicious actor could use [Cross-Site Scripting (XSS)](cross-site-scripting.md) against your site and execute a cross-site request to their CORS enabled site to steal information.
* An API isn't safer by allowing CORS.
  * It's up to the client (browser) to enforce CORS. The server executes the request and returns the response, it's the client that returns an error and blocks the response. For example, any of the following tools will display the server response:
    * [Fiddler](https://www.telerik.com/fiddler)
    * [.NET HttpClient](https://learn.microsoft.com/dotnet/csharp/tutorials/console-webapiclient)
    * A web browser by entering the URL in the address bar.
* It's a way for a server to allow browsers to execute a cross-origin [XHR](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest) or [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) request that otherwise would be forbidden.
  * Browsers without CORS can't do cross-origin requests. Before CORS, [JSONP](https://www.w3schools.com/js/js_json_jsonp.asp) was used to circumvent this restriction. JSONP doesn't use XHR, it uses the `<script>` tag to receive the response. Scripts are allowed to be loaded cross-origin.

The [CORS specification](https://www.w3.org/TR/cors/) introduced several new HTTP headers that enable cross-origin requests. If a browser supports CORS, it sets these headers automatically for cross-origin requests. Custom JavaScript code isn't required to enable CORS.

The following is an example of a cross-origin request from the **Values** test button to `https://cors1.azurewebsites.net/api/values`. The `Origin` header:

* Provides the domain of the site that's making the request.
* Is required and must be different from the host.

**General headers**

```
Request URL: https://cors1.azurewebsites.net/api/values
Request Method: GET
Status Code: 200 OK
```

**Response headers**

```
Content-Encoding: gzip
Content-Type: text/plain; charset=utf-8
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f...;Path=/;HttpOnly;Domain=cors1.azurewebsites.net
Transfer-Encoding: chunked
Vary: Accept-Encoding
X-Powered-By: ASP.NET
```

**Request headers**

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Connection: keep-alive
Host: cors1.azurewebsites.net
Origin: https://cors3.azurewebsites.net
Referer: https://cors3.azurewebsites.net/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 ...
```

In `OPTIONS` requests, the server sets the **Response headers** `Access-Control-Allow-Origin: {allowed origin}` header in the response. For example, the deployed [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI), Delete button `OPTIONS` request contains the following  headers:

**General headers**

```
Request URL: https://cors3.azurewebsites.net/api/TodoItems2/MyDelete2/5
Request Method: OPTIONS
Status Code: 204 No Content
```

**Response headers**

```
Access-Control-Allow-Headers: Content-Type,x-custom-header
Access-Control-Allow-Methods: PUT,DELETE,GET,OPTIONS
Access-Control-Allow-Origin: https://cors1.azurewebsites.net
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f...;Path=/;HttpOnly;Domain=cors3.azurewebsites.net
Vary: Origin
X-Powered-By: ASP.NET
```

**Request headers**

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Headers: content-type
Access-Control-Request-Method: DELETE
Connection: keep-alive
Host: cors3.azurewebsites.net
Origin: https://cors1.azurewebsites.net
Referer: https://cors1.azurewebsites.net/test?number=2
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0
```

In the preceding **Response headers**, the server sets the [Access-Control-Allow-Origin](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header in the response. The `https://cors1.azurewebsites.net` value of this header matches the `Origin` header from the request.

If [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%252A) is called, the `Access-Control-Allow-Origin: *`, the wildcard value, is returned. `AllowAnyOrigin` allows any origin.

If the response doesn't include the `Access-Control-Allow-Origin` header, the cross-origin request fails. Specifically, the browser disallows the request. Even if the server returns a successful response, the browser doesn't make the response available to the client app.

<a name="no-http"></a>

### HTTP redirection to HTTPS causes ERR_INVALID_REDIRECT on the CORS preflight request

Requests to an endpoint using HTTP that are redirected to HTTPS by [Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection%252A) fail with `ERR_INVALID_REDIRECT on the CORS preflight request`.

API projects can reject HTTP requests rather than use `UseHttpsRedirection` to redirect requests to HTTPS.

<a name="options"></a>

### Display OPTIONS requests

By default, the Chrome and Edge browsers don't show OPTIONS requests on the network tab of the F12 tools. To display OPTIONS requests in these browsers:

* `chrome://flags/#out-of-blink-cors` or `edge://flags/#out-of-blink-cors`
* disable the flag.
* restart.

Firefox shows OPTIONS requests by default.

## CORS in IIS

When deploying to IIS, CORS has to run before Windows Authentication if the server isn't configured to allow anonymous access. To support this scenario, the [IIS CORS module](https://www.iis.net/downloads/microsoft/iis-cors-module)
needs to be installed and configured for the app.

<a name="testc6"></a>

## Test CORS

The [sample download](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI) has code to test CORS. See [how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample). The sample is an API project with Razor Pages added:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/ProgramTest.cs?name=snippet_test](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

  > **Warning:**
  > `WithOrigins("https://localhost:<port>");` should only be used for testing a sample app similar to the [download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/live/aspnetcore/security/cors/3.1sample/Cors).

The following `ValuesController` provides the endpoints for testing:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Controllers/ValuesController.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

[MyDisplayRouteInfo](https://github.com/Rick-Anderson/RouteInfo/blob/master/Microsoft.Docs.Samples.RouteInfo/ControllerContextExtensions.cs) is provided by the [Rick.Docs.Samples.RouteInfo](https://www.nuget.org/packages/Rick.Docs.Samples.RouteInfo) NuGet package and displays route information.

Test the preceding sample code by using one of the following approaches:


* Run the sample with `dotnet run` using the default URL of `https://localhost:5001`.
* Run the sample from Visual Studio with the port set to 44398 for a URL of `https://localhost:44398`.

Using a browser with the F12 tools:

* Select the **Values** button and review the headers in the **Network** tab.
* Select the **PUT test** button. See [Display OPTIONS requests](#options) for instructions on displaying the OPTIONS request. The **PUT test** creates two requests, an OPTIONS preflight request and the PUT request.
* Select the **`GetValues2 [DisableCors]`** button to trigger a failed CORS request. As mentioned in the document, the response returns 200 success, but the CORS request is not made. Select the **Console** tab to see the CORS error. Depending on the browser, an error similar to the following is displayed:

     Access to fetch at `'https://cors1.azurewebsites.net/api/values/GetValues2'` from origin `'https://cors3.azurewebsites.net'` has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
     
CORS-enabled endpoints can be tested with a tool, such as [curl](https://curl.haxx.se/) or [Fiddler](https://www.telerik.com/fiddler). When using a tool, the origin of the request specified by the `Origin` header must differ from the host receiving the request. If the request isn't *cross-origin* based on the value of the `Origin` header:

* There's no need for CORS middleware to process the request.
* CORS headers aren't returned in the response.

The following command uses `curl` to issue an OPTIONS request with information:

```bash
curl -X OPTIONS https://cors3.azurewebsites.net/api/TodoItems2/5 -i
```

<!--
curl come with Git. Add to path variable
C:\Program Files\Git\mingw64\bin\

-->

<a name="tcer"></a>

### Test CORS with endpoint routing and [HttpOptions]

Enabling CORS on a per-endpoint basis using `RequireCors` currently does **not** support [automatic preflight requests](#apf). Consider the following code which uses [endpoint routing to enable CORS](#ecors6):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/ProgramTest.cs?name=snippet_teste](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The following `TodoItems1Controller` provides endpoints for testing:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Controllers/TodoItems1Controller.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Test the preceding code from the test page (`https://cors1.azurewebsites.net/test?number=1`) of the deployed [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI).

The **Delete [EnableCors]** and **GET [EnableCors]** buttons succeed, because the endpoints have `[EnableCors]` and respond to preflight requests. The other endpoints fails. The **GET** button fails, because the [JavaScript](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI/wwwroot/js/MyJS.js) sends:

```javascript
 headers: {
      "Content-Type": "x-custom-header"
 },
```

The following `TodoItems2Controller` provides similar endpoints, but includes explicit code to respond to OPTIONS requests:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/6.0sample/Cors/WebAPI/Controllers/TodoItems2Controller.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code can be tested by deploying the sample to Azure.In the **Controller** drop down list, select **Preflight** and then **Set Controller**. All the CORS calls to the `TodoItems2Controller` endpoints succeed.

## Additional resources

* [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/docs/Web/HTTP/CORS)
* [IIS CORS module Configuration Reference](https://learn.microsoft.com/iis/extensions/cors-module/cors-module-configuration-reference)



**Applies to: < aspnetcore-6.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT) and [Kirk Larkin](https://twitter.com/serpent5)

This article shows how to enable CORS in an ASP.NET Core app.

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the *same-origin policy*. The same-origin policy prevents a malicious site from reading sensitive data from another site. Sometimes, you might want to allow other sites to make cross-origin requests to your app. For more information, see the [Mozilla CORS article](https://developer.mozilla.org/docs/Web/HTTP/CORS).

[Cross Origin Resource Sharing](https://www.w3.org/TR/cors/) (CORS):

* Is a W3C standard that allows a server to relax the same-origin policy.
* Is **not** a security feature, CORS relaxes security. An API is not safer by allowing CORS. For more information, see [How CORS works](#how-cors).
* Allows a server to explicitly allow some cross-origin requests while rejecting others.
* Is safer and more flexible than earlier techniques, such as [JSONP](https://learn.microsoft.com/dotnet/framework/wcf/samples/jsonp).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Same origin

Two URLs have the same origin if they have identical schemes, hosts, and ports ([RFC 6454](https://tools.ietf.org/html/rfc6454)).

These two URLs have the same origin:

* `https://example.com/foo.html`
* `https://example.com/bar.html`

These URLs have different origins than the previous two URLs:

* `https://example.net`: Different domain
* `https://www.example.com/foo.html`: Different subdomain
* `http://example.com/foo.html`: Different scheme
* `https://example.com:9000/foo.html`: Different port

## Enable CORS

There are three ways to enable CORS:

* In middleware using a [named policy](#np) or [default policy](#dp).
* Using [endpoint routing](#ecors).
* With the [[EnableCors]](#attr) attribute.

Using the [[EnableCors]](#attr) attribute with a named policy provides the finest control in limiting endpoints that support CORS.

> **Warning:**
> [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) must be called in the correct order. For more information, see [Middleware order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order). For example, `UseCors` must be called before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A) when using `UseResponseCaching`.

Each approach is detailed in the following sections.

<a name="np"></a>

## CORS with named policy and middleware

CORS middleware handles cross-origin requests. The following code applies a CORS policy to all the app's endpoints with the specified origins:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Startup.cs?name=snippet\\&highlight=3,9,32](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code:

* Sets the policy name to `_myAllowSpecificOrigins`. The policy name is arbitrary.
* Calls the [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) extension method and specifies the  `_myAllowSpecificOrigins` CORS policy. `UseCors` adds the CORS middleware. The call to `UseCors` must be placed after `UseRouting`, but before `UseAuthorization`. For more information, see [Middleware order](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23middleware-order).
* Calls [Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CorsServiceCollectionExtensions.AddCors%252A) with a [lambda expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). The lambda takes a [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder) object. [Configuration options](#cors-policy-options), such as `WithOrigins`, are described later in this article.
* Enables the `_myAllowSpecificOrigins` CORS policy for all controller endpoints. See [endpoint routing](#ecors) to apply a CORS policy to specific endpoints.
* When using [response caching middleware](../performance/caching/middleware.md), call [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) before [Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching%252A).

With endpoint routing, the CORS middleware **must** be configured to execute between the calls to `UseRouting` and `UseEndpoints`.

See [Test CORS](#testc) for instructions on testing code similar to the preceding code.

The [Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcCorsMvcCoreBuilderExtensions.AddCors%252A) method call adds CORS services to the app's service container:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Startup.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

For more information, see [CORS policy options](#cpo) in this document.

The [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder) methods can be chained, as shown in the following code:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Startup2.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Note: The specified URL must **not** contain a trailing slash (`/`). If the URL terminates with `/`, the comparison returns `false` and no header is returned.

<a name="dp"></a>

### CORS with default policy and middleware

The following highlighted code enables the default CORS policy:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupDefaultPolicy.cs?name=snippet2\\&highlight=7,29](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code applies the default CORS policy to all controller endpoints.

<a name="ecors"></a>

## Enable Cors with endpoint routing

Enabling CORS on a per-endpoint basis using `RequireCors` ***does not support [automatic preflight requests](#apf).*** For more information, see [this GitHub issue](https://github.com/dotnet/aspnetcore/issues/20709) and [Test CORS with endpoint routing and [HttpOptions]](#tcer).

With endpoint routing, CORS can be enabled on a per-endpoint basis using the [Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors%252A) set of extension methods:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupEndPt.cs?name=snippet2\\&highlight=3,7-15,32,40,43](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

In the preceding code:

* `app.UseCors` enables the CORS middleware. Because a default policy hasn't been configured, `app.UseCors()` alone doesn't enable CORS.
* The `/echo` and controller endpoints allow cross-origin requests using the specified policy.
* The `/echo2` and Razor Pages endpoints do **not** allow cross-origin requests because no default policy was specified.

The [[DisableCors]](#dc) attribute does **not**  disable CORS that has been enabled by endpoint routing with `RequireCors`.

See [Test CORS with endpoint routing and [HttpOptions]](#tcer) for instructions on testing code similar to the preceding.

<a name="attr"></a>

## Enable CORS with attributes

Enabling CORS with the [\[EnableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.EnableCorsAttribute) attribute and applying a named policy to only those endpoints that require CORS provides the finest control.

The [\[EnableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.EnableCorsAttribute) attribute provides an alternative to applying CORS globally. The `[EnableCors]` attribute enables CORS for selected endpoints, rather than all endpoints:

* `[EnableCors]` specifies the default policy.
* `[EnableCors("{Policy String}")]` specifies a named policy.

The `[EnableCors]` attribute can be applied to:

* Razor Page `PageModel`
* Controller
* Controller action method

Different policies can be applied to controllers, page models, or action methods with the `[EnableCors]` attribute. When the `[EnableCors]` attribute is applied to a controller, page model, or action method, and CORS is enabled in middleware, **both** policies are applied. **We recommend against combining policies. Use the** `[EnableCors]` **attribute or middleware, not both in the same app.**

The following code applies a different policy to each method:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Controllers/WidgetController.cs?name=snippet\\&highlight=6,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The following code creates two CORS policies:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Startup3.cs?name=snippet\\&highlight=12-28,44](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

For the finest control of limiting CORS requests:

* Use `[EnableCors("MyPolicy")]` with a named policy.
* Don't define a default policy.
* Don't use [endpoint routing](#ecors).

The code in the next section meets the preceding list.

See [Test CORS](#testc) for instructions on testing code similar to the preceding code.

<a name="dc"></a>

### Disable CORS

The [\[DisableCors\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.DisableCorsAttribute) attribute does **not**  disable CORS that has been enabled by [endpoint routing](#ecors).

The following code defines the CORS policy `"MyPolicy"`:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupTestMyPolicy.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The following code disables CORS for the `GetValues2` action:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Controllers/ValuesController.cs?name=snippet\\&highlight=1,23](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code:

* Doesn't enable CORS with [endpoint routing](#ecors).
* Doesn't define a [default CORS policy](#dp).
* Uses [[EnableCors("MyPolicy")]](#attr) to enable the `"MyPolicy"` CORS policy for the controller.
* Disables CORS for the `GetValues2` method.

See [Test CORS](#testc) for instructions on testing the preceding code.

<a name="cpo"></a>

## CORS policy options

This section describes the various options that can be set in a CORS policy:

* [Set the allowed origins](#set-the-allowed-origins)
* [Set the allowed HTTP methods](#set-the-allowed-http-methods)
* [Set the allowed request headers](#set-the-allowed-request-headers)
* [Set the exposed response headers](#set-the-exposed-response-headers)
* [Credentials in cross-origin requests](#credentials-in-cross-origin-requests)
* [Set the preflight expiration time](#set-the-preflight-expiration-time)

[Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions.AddPolicy%252A) is called in `Startup.ConfigureServices`. For some options, it may be helpful to read the [How CORS works](#how-cors) section first.

## Set the allowed origins

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%252A): Allows CORS requests from all origins with any scheme (`http` or `https`). `AllowAnyOrigin` is insecure because *any website* can make cross-origin requests to the app.

> **Note:**
> Specifying `AllowAnyOrigin` and `AllowCredentials` is an insecure configuration and can result in cross-site request forgery. The CORS service returns an invalid CORS response when an app is configured with both methods.

`AllowAnyOrigin` affects preflight requests and the `Access-Control-Allow-Origin` header. For more information, see the [Preflight requests](#preflight-requests) section.

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetIsOriginAllowedToAllowWildcardSubdomains%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetIsOriginAllowedToAllowWildcardSubdomains%252A): Sets the [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.IsOriginAllowed%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.IsOriginAllowed%252A) property of the policy to be a function that allows origins to match a configured wildcard domain when evaluating if the origin is allowed.

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

In the preceding code, `SetIsOriginAllowedToAllowWildcardSubdomains` is called with the wildcard origin `"https://*.example.com"`. This configuration allows CORS requests from any subdomain of `example.com`, such as `https://subdomain.example.com` or `https://api.example.com`. The `*` wildcard character must be included in the origin to enable wildcard subdomain matching.

### Set the allowed HTTP methods

[Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyMethod%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyMethod%252A):

* Allows any HTTP method:
* Affects preflight requests and the `Access-Control-Allow-Methods` header. For more information, see the [Preflight requests](#preflight-requests) section.

### Set the allowed request headers

To allow specific headers to be sent in a CORS request, called [author request headers](https://xhr.spec.whatwg.org/#request), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%252A) and specify the allowed headers:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

To allow all [author request headers](https://www.w3.org/TR/cors/#author-request-headers), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

`AllowAnyHeader` affects preflight requests and the [Access-Control-Request-Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Request-Method) header. For more information, see the [Preflight requests](#preflight-requests) section.

A CORS middleware policy match to specific headers specified by `WithHeaders` is only possible when the headers sent in `Access-Control-Request-Headers` exactly match the headers stated in `WithHeaders`.

For instance, consider an app configured as follows:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

CORS middleware declines a preflight request with the following request header because `Content-Language` ([HeaderNames.ContentLanguage](https://learn.microsoft.com/search/?terms=Microsoft.Net.Http.Headers.HeaderNames.ContentLanguage)) isn't listed in `WithHeaders`:

```
Access-Control-Request-Headers: Cache-Control, Content-Language
```

The app returns a *200 OK* response but doesn't send the CORS headers back. Therefore, the browser doesn't attempt the cross-origin request.

### Set the exposed response headers

By default, the browser doesn't expose all of the response headers to the app. For more information, see [W3C Cross-Origin Resource Sharing (Terminology): Simple Response Header](https://www.w3.org/TR/cors/#simple-response-header).

The response headers that are available by default are:

* `Cache-Control`
* `Content-Language`
* `Content-Type`
* `Expires`
* `Last-Modified`
* `Pragma`

The CORS specification calls these headers *simple response headers*. To make other headers available to the app, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithExposedHeaders%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet5](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

### Credentials in cross-origin requests

Credentials require special handling in a CORS request. By default, the browser doesn't send credentials with a cross-origin request. Credentials include cookies and HTTP authentication schemes. To send credentials with a cross-origin request, the client must set `XMLHttpRequest.withCredentials` to `true`.

Using `XMLHttpRequest` directly:

```javascript
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://www.example.com/api/test');
xhr.withCredentials = true;
```

Using jQuery:

```javascript
$.ajax({
  type: 'get',
  url: 'https://www.example.com/api/test',
  xhrFields: {
    withCredentials: true
  }
});
```

Using the [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API):

```javascript
fetch('https://www.example.com/api/test', {
    credentials: 'include'
});
```

The server must allow the credentials. To allow cross-origin credentials, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowCredentials%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowCredentials%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The HTTP response includes an `Access-Control-Allow-Credentials` header, which tells the browser that the server allows credentials for a cross-origin request.

If the browser sends credentials but the response doesn't include a valid `Access-Control-Allow-Credentials` header, the browser doesn't expose the response to the app, and the cross-origin request fails.

Allowing cross-origin credentials is a security risk. A website at another domain can send a signed-in user's credentials to the app on the user's behalf without the user's knowledge. <!-- TODO Review: When using `AllowCredentials`, all CORS enabled domains must be trusted.
I don't like "all CORS enabled domains must be trusted", because it implies that if you're not using  `AllowCredentials`, domains don't need to be trusted. -->

The CORS specification also states that setting origins to `"*"` (all origins) is invalid if the `Access-Control-Allow-Credentials` header is present.

<a name="pref"></a>

## Preflight requests

For some CORS requests, the browser sends an additional [OPTIONS](https://developer.mozilla.org/docs/Web/HTTP/Methods/OPTIONS) request before making the actual request. This request is called a [preflight request](https://developer.mozilla.org/docs/Glossary/Preflight_request). The browser can skip the preflight request if **all** the following conditions are true:

* The request method is GET, HEAD, or POST.
* The app doesn't set request headers other than `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, or `Last-Event-ID`.
* The `Content-Type` header, if set, has one of the following values:
  * `application/x-www-form-urlencoded`
  * `multipart/form-data`
  * `text/plain`

The rule on request headers set for the client request applies to headers that the app sets by calling `setRequestHeader` on the `XMLHttpRequest` object. The CORS specification calls these headers [author request headers](https://www.w3.org/TR/cors/#author-request-headers). The rule doesn't apply to headers the browser can set, such as `User-Agent`, `Host`, or `Content-Length`.



The following is an example response similar to the preflight request made from the **[Put test]** button in the [Test CORS](#testc) section of this document.

```
General:
Request URL: https://cors3.azurewebsites.net/api/values/5
Request Method: OPTIONS
Status Code: 204 No Content

Response Headers:
Access-Control-Allow-Methods: PUT,DELETE,GET
Access-Control-Allow-Origin: https://cors1.azurewebsites.net
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f8...8;Path=/;HttpOnly;Domain=cors1.azurewebsites.net
Vary: Origin

Request Headers:
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Method: PUT
Connection: keep-alive
Host: cors3.azurewebsites.net
Origin: https://cors1.azurewebsites.net
Referer: https://cors1.azurewebsites.net/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0
```

The preflight request uses the [HTTP OPTIONS](https://developer.mozilla.org/docs/Web/HTTP/Methods/OPTIONS) method. It may include the following headers:

* [Access-Control-Request-Method](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Request-Method): The HTTP method that will be used for the actual request.
* [Access-Control-Request-Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Headers): A list of request headers that the app sets on the actual request. As stated earlier, this doesn't include headers that the browser sets, such as `User-Agent`.
* [Access-Control-Allow-Methods](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)

If the preflight request is denied, the app returns a `200 OK` response but doesn't set the CORS headers. Therefore, the browser doesn't attempt the cross-origin request. For an example of a denied preflight request, see the [Test CORS](#testc) section of this document.

Using the F12 tools, the console app shows an error similar to one of the following, depending on the browser:

* Firefox: Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at `https://cors1.azurewebsites.net/api/TodoItems1/MyDelete2/5`. (Reason: CORS request did not succeed). [Learn More](https://developer.mozilla.org/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed)
* Chromium based: Access to fetch at 'https://cors1.azurewebsites.net/api/TodoItems1/MyDelete2/5' from origin 'https://cors3.azurewebsites.net' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

To allow specific headers, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

To allow all [author request headers](https://www.w3.org/TR/cors/#author-request-headers), call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyHeader%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Browsers aren't consistent in how they set `Access-Control-Request-Headers`. If either:

* Headers are set to anything other than `"*"`
* [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.AllowAnyHeader%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy.AllowAnyHeader%252A) is called:
  Include at least `Accept`, `Content-Type`, and `Origin`, plus any custom headers that you want to support.

<a name="apf"></a>

### Automatic preflight request code

When the CORS policy is applied either:

* Globally by calling `app.UseCors` in `Startup.Configure`.
* Using the `[EnableCors]` attribute.

ASP.NET Core responds to the preflight OPTIONS request.

Enabling CORS on a per-endpoint basis using `RequireCors` currently does **not** support automatic preflight requests.

The [Test CORS](#testc) section of this document demonstrates this behavior.

<a name="pro"></a>

### [HttpOptions] attribute for preflight requests

When CORS is enabled with the appropriate policy, ASP.NET Core generally responds to CORS preflight requests automatically. In some scenarios, this may not be the case. For example, using [CORS with endpoint routing](#ecors).

The following code uses the [\[HttpOptions\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpOptionsAttribute) attribute to create endpoints for OPTIONS requests:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Controllers/TodoItems2Controller.cs?name=snippet\\&highlight=5-17](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

See [Test CORS with endpoint routing and [HttpOptions]](#tcer) for instructions on testing the preceding code.

### Set the preflight expiration time

The `Access-Control-Max-Age` header specifies how long the response to the preflight request can be cached. To set this header, call [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetPreflightMaxAge%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.SetPreflightMaxAge%252A):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupAllowSubdomain.cs?name=snippet7](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)
<a name="how-cors"></a>

## How CORS works

This section describes what happens in a [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) request at the level of the HTTP messages.

* CORS is **not** a security feature. CORS is a W3C standard that allows a server to relax the same-origin policy.
  * For example, a malicious actor could use [Cross-Site Scripting (XSS)](cross-site-scripting.md) against your site and execute a cross-site request to their CORS enabled site to steal information.
* An API isn't safer by allowing CORS.
  * It's up to the client (browser) to enforce CORS. The server executes the request and returns the response, it's the client that returns an error and blocks the response. For example, any of the following tools will display the server response:
    * [Fiddler](https://www.telerik.com/fiddler)
    * [.NET HttpClient](https://learn.microsoft.com/dotnet/csharp/tutorials/console-webapiclient)
    * A web browser by entering the URL in the address bar.
* It's a way for a server to allow browsers to execute a cross-origin [XHR](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest) or [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) request that otherwise would be forbidden.
  * Browsers without CORS can't do cross-origin requests. Before CORS, [JSONP](https://www.w3schools.com/js/js_json_jsonp.asp) was used to circumvent this restriction. JSONP doesn't use XHR, it uses the `<script>` tag to receive the response. Scripts are allowed to be loaded cross-origin.

The [CORS specification](https://www.w3.org/TR/cors/) introduced several new HTTP headers that enable cross-origin requests. If a browser supports CORS, it sets these headers automatically for cross-origin requests. Custom JavaScript code isn't required to enable CORS.

The following is an example of a cross-origin request from the **Values** test button to `https://cors1.azurewebsites.net/api/values`. The `Origin` header:

* Provides the domain of the site that's making the request.
* Is required and must be different from the host.

**General headers**

```
Request URL: https://cors1.azurewebsites.net/api/values
Request Method: GET
Status Code: 200 OK
```

**Response headers**

```
Content-Encoding: gzip
Content-Type: text/plain; charset=utf-8
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f...;Path=/;HttpOnly;Domain=cors1.azurewebsites.net
Transfer-Encoding: chunked
Vary: Accept-Encoding
X-Powered-By: ASP.NET
```

**Request headers**

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Connection: keep-alive
Host: cors1.azurewebsites.net
Origin: https://cors3.azurewebsites.net
Referer: https://cors3.azurewebsites.net/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 ...
```

In `OPTIONS` requests, the server sets the **Response headers** `Access-Control-Allow-Origin: {allowed origin}` header in the response. For example, the deployed [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI), Delete button `OPTIONS` request contains the following  headers:

**General headers**

```
Request URL: https://cors3.azurewebsites.net/api/TodoItems2/MyDelete2/5
Request Method: OPTIONS
Status Code: 204 No Content
```

**Response headers**

```
Access-Control-Allow-Headers: Content-Type,x-custom-header
Access-Control-Allow-Methods: PUT,DELETE,GET,OPTIONS
Access-Control-Allow-Origin: https://cors1.azurewebsites.net
Server: Microsoft-IIS/10.0
Set-Cookie: ARRAffinity=8f...;Path=/;HttpOnly;Domain=cors3.azurewebsites.net
Vary: Origin
X-Powered-By: ASP.NET
```

**Request headers**

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Headers: content-type
Access-Control-Request-Method: DELETE
Connection: keep-alive
Host: cors3.azurewebsites.net
Origin: https://cors1.azurewebsites.net
Referer: https://cors1.azurewebsites.net/test?number=2
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0
```

In the preceding **Response headers**, the server sets the [Access-Control-Allow-Origin](https://developer.mozilla.org/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header in the response. The `https://cors1.azurewebsites.net` value of this header matches the `Origin` header from the request.

If [Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.AllowAnyOrigin%252A) is called, the `Access-Control-Allow-Origin: *`, the wildcard value, is returned. `AllowAnyOrigin` allows any origin.

If the response doesn't include the `Access-Control-Allow-Origin` header, the cross-origin request fails. Specifically, the browser disallows the request. Even if the server returns a successful response, the browser doesn't make the response available to the client app.

<a name="options"></a>

### Display OPTIONS requests

By default, the Chrome and Edge browsers don't show OPTIONS requests on the network tab of the F12 tools. To display OPTIONS requests in these browsers:

* `chrome://flags/#out-of-blink-cors` or `edge://flags/#out-of-blink-cors`
* disable the flag.
* restart.

Firefox shows OPTIONS requests by default.

## CORS in IIS

When deploying to IIS, CORS has to run before Windows Authentication if the server isn't configured to allow anonymous access. To support this scenario, the [IIS CORS module](https://www.iis.net/downloads/microsoft/iis-cors-module)
needs to be installed and configured for the app.

<a name="testc"></a>

## Test CORS

The [sample download](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI) has code to test CORS. See [how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample). The sample is an API project with Razor Pages added:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupTest2.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

  > **Warning:**
  > `WithOrigins("https://localhost:<port>");` should only be used for testing a sample app similar to the [download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/live/aspnetcore/security/cors/3.1sample/Cors).

The following `ValuesController` provides the endpoints for testing:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Controllers/ValuesController.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

[MyDisplayRouteInfo](https://github.com/Rick-Anderson/RouteInfo/blob/master/Microsoft.Docs.Samples.RouteInfo/ControllerContextExtensions.cs) is provided by the [Rick.Docs.Samples.RouteInfo](https://www.nuget.org/packages/Rick.Docs.Samples.RouteInfo) NuGet package and displays route information.

Test the preceding sample code by using one of the following approaches:


* Run the sample with `dotnet run` using the default URL of `https://localhost:5001`.
* Run the sample from Visual Studio with the port set to 44398 for a URL of `https://localhost:44398`.

Using a browser with the F12 tools:

* Select the **Values** button and review the headers in the **Network** tab.
* Select the **PUT test** button. See [Display OPTIONS requests](#options) for instructions on displaying the OPTIONS request. The **PUT test** creates two requests, an OPTIONS preflight request and the PUT request.
* Select the **`GetValues2 [DisableCors]`** button to trigger a failed CORS request. As mentioned in the document, the response returns 200 success, but the CORS request is not made. Select the **Console** tab to see the CORS error. Depending on the browser, an error similar to the following is displayed:

     Access to fetch at `'https://cors1.azurewebsites.net/api/values/GetValues2'` from origin `'https://cors3.azurewebsites.net'` has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
     
CORS-enabled endpoints can be tested with a tool, such as [curl](https://curl.haxx.se/) or [Fiddler](https://www.telerik.com/fiddler). When using a tool, the origin of the request specified by the `Origin` header must differ from the host receiving the request. If the request isn't *cross-origin* based on the value of the `Origin` header:

* There's no need for CORS middleware to process the request.
* CORS headers aren't returned in the response.

The following command uses `curl` to issue an OPTIONS request with information:

```bash
curl -X OPTIONS https://cors3.azurewebsites.net/api/TodoItems2/5 -i
```

<!--
curl come with Git. Add to path variable
C:\Program Files\Git\mingw64\bin\
-->

<a name="tcer"></a>

### Test CORS with endpoint routing and [HttpOptions]

Enabling CORS on a per-endpoint basis using `RequireCors` currently does **not** support [automatic preflight requests](#apf). Consider the following code which uses [endpoint routing to enable CORS](#ecors):

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/StartupEndPointBugTest.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The following `TodoItems1Controller` provides endpoints for testing:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Controllers/TodoItems1Controller.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

Test the preceding code from the test page (`https://cors1.azurewebsites.net/test?number=1`) of the deployed [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI).

The **Delete [EnableCors]** and **GET [EnableCors]** buttons succeed, because the endpoints have `[EnableCors]` and respond to preflight requests. The other endpoints fails. The **GET** button fails, because the [JavaScript](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/cors/3.1sample/Cors/WebAPI/wwwroot/js/MyJS.js) sends:

```javascript
 headers: {
      "Content-Type": "x-custom-header"
 },
```

The following `TodoItems2Controller` provides similar endpoints, but includes explicit code to respond to OPTIONS requests:

[Code reference unavailable in this source snapshot: cors/includes/~/security/cors/3.1sample/Cors/WebAPI/Controllers/TodoItems2Controller.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/cors.md)

The preceding code can be tested by deploying the sample to Azure.In the **Controller** drop down list, select **Preflight** and then **Set Controller**. All the CORS calls to the `TodoItems2Controller` endpoints succeed.

## Additional resources

* [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/docs/Web/HTTP/CORS)
* [IIS CORS module Configuration Reference](https://learn.microsoft.com/iis/extensions/cors-module/cors-module-configuration-reference)
