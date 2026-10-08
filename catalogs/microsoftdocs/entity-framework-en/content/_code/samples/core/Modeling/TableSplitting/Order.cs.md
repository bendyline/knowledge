# Source code: samples/core/Modeling/TableSplitting/Order.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFModeling.TableSplitting;

#region Order
public class Order
{
    public int Id { get; set; }
    public OrderStatus? Status { get; set; }
    public DetailedOrder DetailedOrder { get; set; }
}
#endregion
```
