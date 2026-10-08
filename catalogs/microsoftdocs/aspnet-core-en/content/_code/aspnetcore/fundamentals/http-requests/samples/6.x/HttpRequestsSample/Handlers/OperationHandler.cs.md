# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/Handlers/OperationHandler.cs

Complete source file; linked examples may select a region or line range.

```
using HttpRequestsSample.Models;

namespace HttpRequestsSample.Handlers;

// <snippet_Class>
public class OperationHandler : DelegatingHandler
{
    private readonly IOperationScoped _operationScoped;

    public OperationHandler(IOperationScoped operationScoped) =>
        _operationScoped = operationScoped;

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        request.Headers.Add("X-OPERATION-ID", _operationScoped.OperationId);

        return await base.SendAsync(request, cancellationToken);
    }
}
// </snippet_Class>

```
