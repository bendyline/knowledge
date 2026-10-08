---
title: Order unit tests
description: Learn how to order unit tests with .NET Core.
ms.date: 09/14/2026
ai-usage: ai-assisted
zone_pivot_groups: unit-testing-framework-set-one
---

# Order unit tests

Occasionally, you may want to have unit tests run in a specific order. Ideally, the order in which unit tests run should _not_ matter, and it is [best practice](unit-testing-best-practices.md) to avoid ordering unit tests. Regardless, there may be a need to do so. In that case, this article demonstrates how to order test runs.

> **Note:**
> Test ordering and test parallelization are separate concerns. Specifying an execution order determines the sequence in which tests start, but if parallelization is enabled, multiple tests can still run concurrently. To guarantee that tests run one at a time in the specified order, you must also disable parallelization.

If you prefer to browse the source code, see the [order .NET Core unit tests](https://learn.microsoft.com/samples/dotnet/samples/order-unit-tests-cs) sample repository.

> **Tip:**
> In addition to the ordering capabilities outlined in this article, consider [creating custom playlists with Visual Studio](https://learn.microsoft.com/visualstudio/test/run-unit-tests-with-test-explorer#create-custom-playlists) as an alternative.

**Applies to: mstest**


## Order alphabetically

> **Note:**
> MSTest runs tests sequentially within a class by default. If you configure parallelism using the `<Parallelize>` setting in a `.runsettings` file, tests across classes can run concurrently, and ordering affects only the sequence within each class. For all ways to enable or disable MSTest parallelization, see [Configure parallelization](unit-testing-mstest-writing-tests-controlling-execution.md#configure-parallelization).

MSTest discovers tests in the same order in which they are defined in the test class.

When running through Test Explorer (in Visual Studio, or in Visual Studio Code), the tests are ordered in alphabetical order based on their test name.

When running outside of Test Explorer, tests are executed in the order in which they are defined in the test class.

> **Note:**
> A test named `Test14` will run before `Test2` even though the number  `2` is less than `14`. This is because test name ordering uses the text name of the test.

[language="csharp" source="snippets/order-unit-tests/csharp/MSTest.Project/ByAlphabeticalOrder.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/MSTest.Project/ByAlphabeticalOrder.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/MSTest.Project/ByAlphabeticalOrder.cs.md)

Starting with MSTest 3.6, a new runsettings option lets you run tests by test names both in Test Explorers and on the command line. To enable this feature, add the `OrderTestsByNameInClass` setting to your runsettings file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>

  <MSTest>
    <OrderTestsByNameInClass>true</OrderTestsByNameInClass>
  </MSTest>

</RunSettings>
```

## Order randomly

In MSTest 4.3 and later, run tests in a random order to surface hidden ordering dependencies between tests. To enable random order, set the `RandomizeTestOrder` setting to **true** in your runsettings file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>

  <MSTest>
    <RandomizeTestOrder>true</RandomizeTestOrder>
  </MSTest>

</RunSettings>
```

To make the random order reproducible, set the `RandomTestOrderSeed` setting to an integer seed. MSTest then replays the same order on every run. When you leave the seed unset, MSTest generates a new seed for each run. Don't combine `RandomizeTestOrder` with `OrderTestsByNameInClass`, because MSTest applies only one ordering mode at a time. For more information, see [Configure MSTest](unit-testing-mstest-configure.md).


**Applies to: xunit**


The xUnit test framework allows for more granularity and control of test run order. You implement the `ITestCaseOrderer` and `ITestCollectionOrderer` interfaces to control the order of test cases for a class, or test collections.

> **Note:**
> xUnit runs test classes in parallel by default. Tests within a single class always run sequentially, so `ITestCaseOrderer` controls the sequence within that class. To disable parallelism across all classes, apply `[assembly: CollectionBehavior(DisableTestParallelization = true)]` at the assembly level, for example in `AssemblyInfo.cs` or in any source file in your test project.

## Order by test case alphabetically

To order test cases by their method name, you implement the `ITestCaseOrderer` and provide an ordering mechanism.

[language="csharp" source="snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/AlphabeticalOrderer.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/AlphabeticalOrderer.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/AlphabeticalOrderer.cs.md)

Then in a test class you set the test case order with the `TestCaseOrdererAttribute`.

[language="csharp" source="snippets/order-unit-tests/csharp/XUnit.TestProject/ByAlphabeticalOrder.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/XUnit.TestProject/ByAlphabeticalOrder.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/ByAlphabeticalOrder.cs.md)

## Order by collection alphabetically

To order test collections by their display name, you implement the `ITestCollectionOrderer` and provide an ordering mechanism.

[language="csharp" source="snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/DisplayNameOrderer.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/DisplayNameOrderer.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/DisplayNameOrderer.cs.md)

Since test collections potentially run in parallel, you must explicitly disable test parallelization of the collections with the `CollectionBehaviorAttribute`. Then specify the implementation to the `TestCollectionOrdererAttribute`.

[language="csharp" source="snippets/order-unit-tests/csharp/XUnit.TestProject/ByDisplayName.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/XUnit.TestProject/ByDisplayName.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/ByDisplayName.cs.md)

## Order by custom attribute

To order xUnit tests with custom attributes, you first need an attribute to rely on. Define a `TestPriorityAttribute` as follows:

[language="csharp" source="snippets/order-unit-tests/csharp/XUnit.TestProject/Attributes/TestPriorityAttribute.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/XUnit.TestProject/Attributes/TestPriorityAttribute.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/Attributes/TestPriorityAttribute.cs.md)

Next, consider the following `PriorityOrderer` implementation of the `ITestCaseOrderer` interface.

[language="csharp" source="snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/PriorityOrderer.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/PriorityOrderer.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/Orderers/PriorityOrderer.cs.md)

Then in a test class you set the test case order with the `TestCaseOrdererAttribute` to the `PriorityOrderer`.

[language="csharp" source="snippets/order-unit-tests/csharp/XUnit.TestProject/ByPriorityOrder.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/XUnit.TestProject/ByPriorityOrder.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/ByPriorityOrder.cs.md)


**Applies to: nunit**


## Order by priority

> **Note:**
> NUnit runs tests sequentially within a single thread by default. Unless you've applied `[Parallelizable]` attributes, the `[Order]` attribute alone is sufficient to guarantee serial execution in the specified sequence.

To order tests explicitly, NUnit provides an [`OrderAttribute`](https://docs.nunit.org/articles/nunit/writing-tests/attributes/order). Tests with this attribute are started before tests without. The order value is used to determine the order to run the unit tests.

[language="csharp" source="snippets/order-unit-tests/csharp/NUnit.TestProject/ByOrder.cs"::: (complete source file; reference: snippets/order-unit-tests/csharp/NUnit.TestProject/ByOrder.cs)](../../../_code/docs/core/testing/snippets/order-unit-tests/csharp/NUnit.TestProject/ByOrder.cs.md)



## Next steps

> 
> [Unit test code coverage](unit-testing-code-coverage.md)
