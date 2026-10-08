# Source code: docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/AlphabeticalOrderer.cs

Complete source file; linked examples may select a region or line range.

```
using Xunit.Abstractions;
using Xunit.Sdk;

namespace XUnit.Project.Orderers;

public class AlphabeticalOrderer : ITestCaseOrderer
{
    public IEnumerable<TTestCase> OrderTestCases<TTestCase>(
        IEnumerable<TTestCase> testCases) where TTestCase : ITestCase =>
        testCases.OrderBy(testCase => testCase.TestMethod.Method.Name);
}

```
