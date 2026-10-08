# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/default-interface-members-versions/starter/customer-relationship/SampleOrder.cs

Complete source file; linked examples may select a region or line range.

```
namespace customer_relationship;

public class SampleOrder : IOrder
{
    public SampleOrder(DateTime purchase, decimal cost) =>
        (Purchased, Cost) = (purchase, cost);

    public DateTime Purchased { get; }

    public decimal Cost { get; }
}

```
