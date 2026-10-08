# Source code: docs/csharp/fundamentals/program-structure/snippets/organizing-programs/OrderService.cs

Complete source file; linked examples may select a region or line range.

```
// <NamespaceMirroring>
// File: Services/OrderService.cs
// Namespace mirrors the folder path
using MyApp.Core;

namespace MyApp.Services;

public class OrderService
{
    public Order CreateOrder(string product, int quantity, decimal price) =>
        new() { ProductName = product, Quantity = quantity, UnitPrice = price };

    public string FormatSummary(Order order) =>
        $"{order.Quantity}x {order.ProductName} = {order.Total:C}";
}
// </NamespaceMirroring>

```
