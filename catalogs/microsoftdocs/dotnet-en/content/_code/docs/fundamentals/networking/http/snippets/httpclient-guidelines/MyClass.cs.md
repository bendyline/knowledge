# Source code: docs/fundamentals/networking/http/snippets/httpclient-guidelines/MyClass.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Http.Resilience;
using Polly;

class MyClass
{
    static HttpClient? s_httpClient;

    MyClass()
    {
        var retryPipeline = new ResiliencePipelineBuilder<HttpResponseMessage>()
            .AddRetry(new HttpRetryStrategyOptions
            {
                BackoffType = DelayBackoffType.Exponential,
                MaxRetryAttempts = 3
            })
            .Build();

        var socketHandler = new SocketsHttpHandler
        {
            PooledConnectionLifetime = TimeSpan.FromMinutes(15)
        };
        var resilienceHandler = new ResilienceHandler(retryPipeline)
        {
            InnerHandler = socketHandler,
        };

        s_httpClient = new HttpClient(resilienceHandler);
    }
}

```
