# Source code: docs/csharp/fundamentals/program-structure/snippets/organizing-programs/Program.cs

Complete source file; linked examples may select a region or line range.

```
using MyApp.Services;
using MyApp.Payments;
using MyApp.Inventory;

var service = new OrderService();
var order = service.CreateOrder("Widget", 3, 9.99m);
Console.WriteLine(service.FormatSummary(order));

var processor = new CreditCardProcessor();
processor.ProcessPayment(order.Total);

var inventory = new InventoryService();
Console.WriteLine($"Stock level for Widget: {inventory.GetStockLevel("Widget")}");

```
