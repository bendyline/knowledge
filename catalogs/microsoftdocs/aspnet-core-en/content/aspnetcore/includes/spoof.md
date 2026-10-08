  > **Warning:**
  > API that relies on the [Host header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Host), such as [Microsoft.AspNetCore.Http.HttpRequest.Host%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpRequest.Host%252A) and [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.RequireHost%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.RequireHost%252A), are subject to potential spoofing by clients.
>
> To prevent host and port spoofing, use one of the following approaches:
>
> * Use [Microsoft.AspNetCore.Http.HttpContext.Connection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Connection%252A) ([Microsoft.AspNetCore.Http.ConnectionInfo.LocalPort](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.ConnectionInfo.LocalPort)) where the ports are checked.
> * Employ [Host filtering](../fundamentals/servers/kestrel/host-filtering.md).
