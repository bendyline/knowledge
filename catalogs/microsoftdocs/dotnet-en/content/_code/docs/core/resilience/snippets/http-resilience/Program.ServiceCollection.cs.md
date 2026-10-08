# Source code: docs/core/resilience/snippets/http-resilience/Program.ServiceCollection.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.DependencyInjection;

namespace Http.Resilience.Example;

internal partial class Program
{
    private static void CreateServiceCollection()
    {
        // <services>
        var services = new ServiceCollection();

        var httpClientBuilder = services.AddHttpClient<ExampleClient>(
            configureClient: static client =>
            {
                client.BaseAddress = new("https://jsonplaceholder.typicode.com");
            });
        // </services>
    }
}

```
