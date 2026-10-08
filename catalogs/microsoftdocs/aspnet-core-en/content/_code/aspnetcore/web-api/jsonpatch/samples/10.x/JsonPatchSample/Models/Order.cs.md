# Source code: aspnetcore/web-api/jsonpatch/samples/10.x/JsonPatchSample/Models/Order.cs

Complete source file; linked examples may select a region or line range.

```
namespace App.Models;

public class Order
{
    public string Id { get; set; }
    public DateTime? OrderDate { get; set; }
    public DateTime? ShipDate { get; set; }
    public decimal TotalAmount { get; set; }

    public Order()
    {
        Id = Guid.NewGuid().ToString();
    }
}

```
