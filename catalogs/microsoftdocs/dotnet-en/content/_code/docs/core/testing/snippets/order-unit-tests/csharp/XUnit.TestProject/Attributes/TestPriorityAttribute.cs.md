# Source code: docs/core/testing/snippets/order-unit-tests/csharp/XUnit.TestProject/Attributes/TestPriorityAttribute.cs

Complete source file; linked examples may select a region or line range.

```
namespace XUnit.Project.Attributes;

[AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
public class TestPriorityAttribute : Attribute
{
    public int Priority { get; private set; }

    public TestPriorityAttribute(int priority) => Priority = priority;
}

```
