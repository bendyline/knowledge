# Source code: docs/ai/snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClientExtensions.OptionalOverload.cs

Complete source file; linked examples may select a region or line range.

```
namespace Example.Two;

// <two>
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.RateLimiting;

public static class RateLimitingChatClientExtensions
{
    public static ChatClientBuilder UseRateLimiting(
        this ChatClientBuilder builder,
        RateLimiter? rateLimiter = null) =>
        builder.Use((innerClient, services) =>
            new RateLimitingChatClient(
                innerClient,
                services.GetRequiredService<RateLimiter>())
        );
}
// </two>

```
