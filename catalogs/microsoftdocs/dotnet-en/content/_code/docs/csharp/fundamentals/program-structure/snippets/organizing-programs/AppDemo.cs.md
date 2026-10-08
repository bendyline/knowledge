# Source code: docs/csharp/fundamentals/program-structure/snippets/organizing-programs/AppDemo.cs

Complete source file; linked examples may select a region or line range.

```
// <ProjectStructure>
// MyApp.Core (class library) — shared business logic
namespace MyApp.Core;

public class Order
{
    public required string ProductName { get; init; }
    public int Quantity { get; init; }
    public decimal UnitPrice { get; init; }
    public decimal Total => Quantity * UnitPrice;
}
// </ProjectStructure>
```
