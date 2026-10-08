# Source code: aspnetcore/performance/caching/memory/samples/6.x/CachingMemorySample/Snippets/Program.cs

Complete source file; linked examples may select a region or line range.

```
namespace CachingMemorySample.Snippets;

public static class Program
{
    public static void AddSingletonMyMemoryCache(string[] args)
    {
        // <snippet_AddSingletonMyMemoryCache>
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddSingleton<MyMemoryCache>();
        // </snippet_AddSingletonMyMemoryCache>
    }
}

```
