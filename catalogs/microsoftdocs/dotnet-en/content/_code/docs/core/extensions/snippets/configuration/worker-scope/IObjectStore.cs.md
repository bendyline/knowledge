# Source code: docs/core/extensions/snippets/configuration/worker-scope/IObjectStore.cs

Complete source file; linked examples may select a region or line range.

```
namespace WorkerScope.Example;

interface IObjectStore
{
    Task<ObjectGraph> GetNextAsync();

    Task<ObjectGraph?> MarkAsync(ObjectGraph graph);
}

```
