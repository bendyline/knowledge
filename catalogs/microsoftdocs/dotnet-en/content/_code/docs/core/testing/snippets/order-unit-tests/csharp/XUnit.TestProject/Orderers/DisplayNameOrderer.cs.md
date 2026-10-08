# Source code: docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/DisplayNameOrderer.cs

Complete source file; linked examples may select a region or line range.

```
using Xunit;
using Xunit.Abstractions;

namespace XUnit.Project.Orderers;

public class DisplayNameOrderer : ITestCollectionOrderer
{
    public IEnumerable<ITestCollection> OrderTestCollections(
        IEnumerable<ITestCollection> testCollections) =>
        testCollections.OrderBy(collection => collection.DisplayName);
}
```
