### Opt-out of HTTP metrics on certain endpoints and requests

.NET 9 introduces the ability to opt-out of HTTP metrics for specific endpoints and requests. Opting out of recording metrics is beneficial for endpoints frequently called by automated systems, such as health checks. Recording metrics for these requests is generally unnecessary.

HTTP requests to an endpoint can be excluded from metrics by adding metadata. Either:

* Add the [`[DisableHttpMetrics]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.DisableHttpMetricsAttribute) to the Web API controller, SignalR hub or gRPC service.
* Call [Microsoft.AspNetCore.Builder.HttpMetricsEndpointConventionBuilderExtensions.DisableHttpMetrics%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpMetricsEndpointConventionBuilderExtensions.DisableHttpMetrics%252A) when mapping endpoints in app startup:

[language="csharp" source="\~/release-notes/aspnetcore-9/samples/Metrics/Program.cs" id="snippet_1" highlight="5"::: (complete source file; reference: \~/release-notes/aspnetcore-9/samples/Metrics/Program.cs)](../../../../_code/aspnetcore/release-notes/aspnetcore-9/samples/Metrics/Program.cs.md)

The `MetricsDisabled` property has been added to `IHttpMetricsTagsFeature` for:

* Advanced scenarios where a request doesn't map to an endpoint.
* Dynamically disabling metrics collection for specific HTTP requests.

[language="csharp" source="\~/release-notes/aspnetcore-9/samples/Metrics/Program.cs" id="snippet_2"::: (complete source file; reference: \~/release-notes/aspnetcore-9/samples/Metrics/Program.cs)](../../../../_code/aspnetcore/release-notes/aspnetcore-9/samples/Metrics/Program.cs.md)
