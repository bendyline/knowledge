# Source code: aspnetcore/fundamentals/http-requests/samples/3.x/HttpRequestsSample/Handlers/OperationResponseHandler.cs

Complete source file; linked examples may select a region or line range.

```
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using HttpRequestsSample.Models;

namespace HttpRequestsSample.Handlers
{
    public class OperationResponseHandler : DelegatingHandler
    {
        private readonly IOperationScoped _operationService;

        public OperationResponseHandler(IOperationScoped operationScoped)
        {
            _operationService = operationScoped;
        }

        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            // For sample purposes, return the OperationId as the body.
            return Task.FromResult(new HttpResponseMessage
            {
                Content = new StringContent(_operationService.OperationId)
            });
        }
    }
}

```
