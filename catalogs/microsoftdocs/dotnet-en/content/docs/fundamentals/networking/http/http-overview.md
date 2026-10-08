---
title: HTTP support in .NET
description: Learn about the comprehensive support for HTTP that .NET provides.
ms.date: 05/19/2023
helpviewer_keywords:
  - "protocols, HTTP"
  - "sending data, HTTP"
  - "HttpWebResponse class, sending and receiving data"
  - "HTTP"
  - "receiving data, HTTP"
  - "application protocols, HTTP"
  - "Internet, HTTP"
  - "network resources, HTTP"
  - "HTTP, about HTTP"
  - "HttpWebRequest class, sending and receiving data"
---

# HTTP support in .NET

Hypertext Transfer Protocol (or HTTP) is a protocol for requesting resources from a web server. The [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) class exposes the ability to send HTTP requests and receive HTTP responses from a resource identified by a URI. Many types of resources are available on the web, and HTTP defines a set of request methods for accessing these resources.

## HTTP request methods

The request methods are differentiated via several factors, first by their _verb_ but also by the following characteristics:

- A request method is **_idempotent_** if it can be successfully processed multiple times without changing the result. For more information, see [RFC 9110: 9.2.2. Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods).
- A request method is **_cacheable_** when its corresponding response can be stored for reuse. For more information, see [RFC 9110: Section 9.2.3. Methods and Caching](https://www.rfc-editor.org/rfc/rfc9110.html#name-methods-and-caching).
- A request method is considered a **_safe method_** if it doesn't modify the state of a resource. All _safe methods_ are also _idempotent_, but not all _idempotent_ methods are considered _safe_. For more information, see [RFC 9110: Section 9.2.1. Safe Methods](https://www.rfc-editor.org/rfc/rfc9110.html#name-safe-methods).

| HTTP method | Is idempotent | Is cacheable | Is safe |
| --- | --- | --- | --- |
| `GET` | ✔️ Yes | ✔️ Yes | ✔️ Yes |
| `POST` | ❌ No | ⚠️ <sup>†</sup>Rarely | ❌ No |
| `PUT` | ✔️ Yes | ❌ No | ❌ No |
| `PATCH` | ❌ No | ❌ No | ❌ No |
| `DELETE` | ✔️ Yes | ❌ No | ❌ No |
| `HEAD` | ✔️ Yes | ✔️ Yes | ✔️ Yes |
| `OPTIONS` | ✔️ Yes | ❌ No | ✔️ Yes |
| `TRACE` | ✔️ Yes | ❌ No | ✔️ Yes |
| `CONNECT` | ❌ No | ❌ No | ❌ No |

> <sup>†</sup>The `POST` method is only cacheable when the appropriate `Cache-Control` or `Expires` response headers are present. This is very uncommon in practice.

## HTTP status codes

.NET provides comprehensive support for the HTTP protocol, which accounts for most internet traffic, with the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient). For more information, see [Make HTTP requests with the HttpClient class](httpclient.md). Applications receive HTTP protocol errors by catching an [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException). HTTP status codes are either reported in [System.Net.Http.HttpResponseMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage) with the [System.Net.Http.HttpResponseMessage.StatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.StatusCode) or in [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) with the [System.Net.Http.HttpRequestException.StatusCode](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException.StatusCode) in case the called method doesn't return a response message. For more information about error handling, see [HTTP error handling](httpclient.md#use-http-error-handling), and for more information about status codes, see [RFC 9110, HTTP Semantics: Status Codes](https://www.rfc-editor.org/rfc/rfc9110#name-status-codes).

### Informational status codes

The informational status codes reflect an interim response. Most of the interim responses, for example [System.Net.HttpStatusCode.Continue](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Continue), are handled internally with [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) and are never surfaced to the user.

| HTTP status code | `HttpStatusCode` |
| --- | --- |
| `100` | [System.Net.HttpStatusCode.Continue](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Continue) |
| `101` | [System.Net.HttpStatusCode.SwitchingProtocols](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.SwitchingProtocols) |
| `102` | [System.Net.HttpStatusCode.Processing](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Processing) |
| `103` | [System.Net.HttpStatusCode.EarlyHints](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.EarlyHints) |

### Successful status codes

The successful status codes indicate that the client's request was successfully received, understood, and accepted.

| HTTP status code | `HttpStatusCode` |
| --- | --- |
| `200` | [System.Net.HttpStatusCode.OK](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.OK) |
| `201` | [System.Net.HttpStatusCode.Created](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Created) |
| `202` | [System.Net.HttpStatusCode.Accepted](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Accepted) |
| `203` | [System.Net.HttpStatusCode.NonAuthoritativeInformation](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.NonAuthoritativeInformation) |
| `204` | [System.Net.HttpStatusCode.NoContent](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.NoContent) |
| `205` | [System.Net.HttpStatusCode.ResetContent](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.ResetContent) |
| `206` | [System.Net.HttpStatusCode.PartialContent](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.PartialContent) |
| `207` | [System.Net.HttpStatusCode.MultiStatus](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.MultiStatus) |
| `208` | [System.Net.HttpStatusCode.AlreadyReported](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.AlreadyReported) |
| `226` | [System.Net.HttpStatusCode.IMUsed](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.IMUsed) |

### Redirection status codes

Redirection status codes require the user agent to take action to fulfill the request. Automatic redirection is turned on by default, it can be changed with [System.Net.Http.HttpClientHandler.AllowAutoRedirect](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.AllowAutoRedirect) or [System.Net.Http.SocketsHttpHandler.AllowAutoRedirect](https://learn.microsoft.com/search/?terms=System.Net.Http.SocketsHttpHandler.AllowAutoRedirect).

| HTTP status code | `HttpStatusCode` |
| --- | --- |
| `300` | [System.Net.HttpStatusCode.MultipleChoices](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.MultipleChoices) or [System.Net.HttpStatusCode.Ambiguous](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Ambiguous) |
| `301` | [System.Net.HttpStatusCode.MovedPermanently](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.MovedPermanently) or [System.Net.HttpStatusCode.Moved](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Moved) |
| `302` | [System.Net.HttpStatusCode.Found](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Found) or [System.Net.HttpStatusCode.Redirect](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Redirect) |
| `303` | [System.Net.HttpStatusCode.SeeOther](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.SeeOther) or [System.Net.HttpStatusCode.RedirectMethod](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.RedirectMethod) |
| `304` | [System.Net.HttpStatusCode.NotModified](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.NotModified) |
| `305` | [System.Net.HttpStatusCode.UseProxy](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.UseProxy) |
| `306` | [System.Net.HttpStatusCode.Unused](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Unused) |
| `307` | [System.Net.HttpStatusCode.TemporaryRedirect](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.TemporaryRedirect) or [System.Net.HttpStatusCode.RedirectKeepVerb](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.RedirectKeepVerb) |
| `308` | [System.Net.HttpStatusCode.PermanentRedirect](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.PermanentRedirect) |

### Client error status codes

The client error status codes indicate that the client's request was invalid.

| HTTP status code | `HttpStatusCode` |
| --- | --- |
| `400` | [System.Net.HttpStatusCode.BadRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.BadRequest) |
| `401` | [System.Net.HttpStatusCode.Unauthorized](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Unauthorized) |
| `402` | [System.Net.HttpStatusCode.PaymentRequired](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.PaymentRequired) |
| `403` | [System.Net.HttpStatusCode.Forbidden](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Forbidden) |
| `404` | [System.Net.HttpStatusCode.NotFound](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.NotFound) |
| `405` | [System.Net.HttpStatusCode.MethodNotAllowed](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.MethodNotAllowed) |
| `406` | [System.Net.HttpStatusCode.NotAcceptable](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.NotAcceptable) |
| `407` | [System.Net.HttpStatusCode.ProxyAuthenticationRequired](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.ProxyAuthenticationRequired) |
| `408` | [System.Net.HttpStatusCode.RequestTimeout](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.RequestTimeout) |
| `409` | [System.Net.HttpStatusCode.Conflict](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Conflict) |
| `410` | [System.Net.HttpStatusCode.Gone](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Gone) |
| `411` | [System.Net.HttpStatusCode.LengthRequired](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.LengthRequired) |
| `412` | [System.Net.HttpStatusCode.PreconditionFailed](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.PreconditionFailed) |
| `413` | [System.Net.HttpStatusCode.RequestEntityTooLarge](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.RequestEntityTooLarge) |
| `414` | [System.Net.HttpStatusCode.RequestUriTooLong](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.RequestUriTooLong) |
| `415` | [System.Net.HttpStatusCode.UnsupportedMediaType](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.UnsupportedMediaType) |
| `416` | [System.Net.HttpStatusCode.RequestedRangeNotSatisfiable](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.RequestedRangeNotSatisfiable) |
| `417` | [System.Net.HttpStatusCode.ExpectationFailed](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.ExpectationFailed) |
| `418` | [I'm a teapot](https://developer.mozilla.org/docs/Web/HTTP/Status/418) 🫖 |
| `421` | [System.Net.HttpStatusCode.MisdirectedRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.MisdirectedRequest) |
| `422` | [System.Net.HttpStatusCode.UnprocessableEntity](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.UnprocessableEntity) |
| `423` | [System.Net.HttpStatusCode.Locked](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.Locked) |
| `424` | [System.Net.HttpStatusCode.FailedDependency](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.FailedDependency) |
| `426` | [System.Net.HttpStatusCode.UpgradeRequired](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.UpgradeRequired) |
| `428` | [System.Net.HttpStatusCode.PreconditionRequired](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.PreconditionRequired) |
| `429` | [System.Net.HttpStatusCode.TooManyRequests](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.TooManyRequests) |
| `431` | [System.Net.HttpStatusCode.RequestHeaderFieldsTooLarge](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.RequestHeaderFieldsTooLarge) |
| `451` | [System.Net.HttpStatusCode.UnavailableForLegalReasons](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.UnavailableForLegalReasons) |

### Server error status codes

The server error status codes indicate that the server encountered an unexpected condition that prevented it from fulfilling the request.

| HTTP status code | `HttpStatusCode` |
| --- | --- |
| `500` | [System.Net.HttpStatusCode.InternalServerError](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.InternalServerError) |
| `501` | [System.Net.HttpStatusCode.NotImplemented](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.NotImplemented) |
| `502` | [System.Net.HttpStatusCode.BadGateway](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.BadGateway) |
| `503` | [System.Net.HttpStatusCode.ServiceUnavailable](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.ServiceUnavailable) |
| `504` | [System.Net.HttpStatusCode.GatewayTimeout](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.GatewayTimeout) |
| `505` | [System.Net.HttpStatusCode.HttpVersionNotSupported](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.HttpVersionNotSupported) |
| `506` | [System.Net.HttpStatusCode.VariantAlsoNegotiates](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.VariantAlsoNegotiates) |
| `507` | [System.Net.HttpStatusCode.InsufficientStorage](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.InsufficientStorage) |
| `508` | [System.Net.HttpStatusCode.LoopDetected](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.LoopDetected) |
| `510` | [System.Net.HttpStatusCode.NotExtended](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.NotExtended) |
| `511` | [System.Net.HttpStatusCode.NetworkAuthenticationRequired](https://learn.microsoft.com/search/?terms=System.Net.HttpStatusCode.NetworkAuthenticationRequired) |

## See also

- [Make HTTP requests with the HttpClient class](httpclient.md)
- [HTTP client factory with .NET](../../../core/extensions/httpclient-factory.md)
- [Guidelines for using HttpClient](httpclient-guidelines.md)
- [.NET Networking improvements](https://devblogs.microsoft.com/dotnet/dotnet-6-networking-improvements)
