# Source code: docs/core/testing/snippets/testcontext/csharp/TestContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class MyTestClassTestContext
{
    public TestContext TestContext { get; set; }

    [AssemblyInitialize]
    public static void AssemblyInitialize(TestContext context)
    {
        // Access TestContext properties and methods here. The properties related to the test run are not available.
    }

    [ClassInitialize]
    public static void ClassInitialize(TestContext context)
    {
        // Access TestContext properties and methods here. The properties related to the test run are not available.
    }

    [TestMethod]
    public void MyTestMethod()
    {
        // Access TestContext properties and methods here
    }
}

```
