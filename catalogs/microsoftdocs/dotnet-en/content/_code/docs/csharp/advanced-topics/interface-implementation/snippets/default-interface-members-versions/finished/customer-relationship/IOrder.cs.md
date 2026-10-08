# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/default-interface-members-versions/finished/customer-relationship/IOrder.cs

Complete source file; linked examples may select a region or line range.

```
namespace customer_relationship;

public interface IOrder
{
    DateTime Purchased { get; }
    decimal Cost { get; }
}

```
