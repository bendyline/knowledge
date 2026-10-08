# Source code: aspnetcore/fundamentals/servers/snippets/10.x/memory-pool-factory.cs

Complete source file; linked examples may select a region or line range.

```
services.AddSingleton<IMemoryPoolFactory<byte>,
CustomMemoryPoolFactory>();

public class CustomMemoryPoolFactory : IMemoryPoolFactory<byte>
{
    public MemoryPool<byte> Create()
    {
        // Return a custom MemoryPool implementation
        // or the default, as is shown here.
        return MemoryPool<byte>.Shared;
    }
}


```
