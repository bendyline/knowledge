# Source code: docs/core/extensions/snippets/configuration/worker-scope/AutoIncrementingIdProvider.cs

Complete source file; linked examples may select a region or line range.

```
namespace WorkerScope.Example;

sealed class AutoIncrementingIdProvider : IObjectIdProvider
{
    static int s_id;

    int IObjectIdProvider.GetNextId() => ++ s_id;
}

```
