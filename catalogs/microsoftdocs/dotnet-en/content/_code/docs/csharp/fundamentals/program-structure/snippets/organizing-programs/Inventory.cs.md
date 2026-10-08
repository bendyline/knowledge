# Source code: docs/csharp/fundamentals/program-structure/snippets/organizing-programs/Inventory.cs

Complete source file; linked examples may select a region or line range.

```
// <AccessModifiers>
namespace MyApp.Inventory;

// Public — other projects can use this type
public class InventoryService
{
    public int GetStockLevel(string productName) =>
        StockDatabase.Lookup(productName);
}

// Internal — only visible within this assembly
internal static class StockDatabase
{
    private static readonly Dictionary<string, int> _stock = new()
    {
        ["Widget"] = 42,
        ["Gadget"] = 17
    };

    internal static int Lookup(string productName) =>
        _stock.GetValueOrDefault(productName);
}
// </AccessModifiers>

```
