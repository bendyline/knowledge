# Source code: aspnetcore/performance/caching/memory/samples/3.x/RPcache/Services/MyMemoryCache.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Caching.Memory;

namespace RPcache.Services
{
    // <snippet>
    // using Microsoft.Extensions.Caching.Memory;
    public class MyMemoryCache 
    {
        public MemoryCache Cache { get; private set; }
        public MyMemoryCache()
        {
            Cache = new MemoryCache(new MemoryCacheOptions
            {
                SizeLimit = 1024
            });
        }
    }
    // </snippet>
}

```
