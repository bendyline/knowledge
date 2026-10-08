# Source code: docs/azure/sdk/snippets/unit-testing/ResourceManager/ArmClient.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel;
using System.Collections.Concurrent;

#nullable disable

namespace UnitTestingSampleApp.ResourceManager;

public partial class ArmClient
{
    private readonly ConcurrentDictionary<Type, object> _clientCache = new();

    [EditorBrowsable(EditorBrowsableState.Never)]
    public virtual T GetCachedClient<T>(Func<ArmClient, T> clientFactory)
        where T : class
    {
        return (T)_clientCache.GetOrAdd(typeof(T), type => clientFactory(this));
    }
}

```
