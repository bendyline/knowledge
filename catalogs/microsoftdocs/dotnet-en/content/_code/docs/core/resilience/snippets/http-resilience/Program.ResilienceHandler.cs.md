# Source code: docs/core/resilience/snippets/http-resilience/Program.ResilienceHandler.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.DependencyInjection;
using Polly;

internal partial class Program
{
    private static void WithStandardHandler(IHttpClientBuilder httpClientBuilder)
    {
        // <standard>
        httpClientBuilder.AddStandardResilienceHandler();
        // </standard>
    }

    private static void WithConfiguredStandardHandler(IHttpClientBuilder httpClientBuilder)
    {
        // <configure>
        httpClientBuilder.AddStandardResilienceHandler(static options =>
        {
            options.Retry.BackoffType = DelayBackoffType.Linear;
        });
        // </configure>
    }
}

```
