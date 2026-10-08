# Source code: aspnetcore/performance/caching/memory/samples/6.x/CachingMemorySample/Snippets/MyMemoryCache.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Caching.Memory;

namespace CachingMemorySample.Snippets;

// <snippet_Class>
public class MyMemoryCache
{
    public MemoryCache Cache { get; } = new MemoryCache(
        new MemoryCacheOptions
        {
            SizeLimit = 1024
        });
}
// </snippet_Class>

```
