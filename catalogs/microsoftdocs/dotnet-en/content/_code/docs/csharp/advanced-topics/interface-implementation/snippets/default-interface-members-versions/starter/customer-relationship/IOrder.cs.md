# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/default-interface-members-versions/starter/customer-relationship/IOrder.cs

Complete source file; linked examples may select a region or line range.

```
namespace customer_relationship;

// <SnippetIOrderVersion1>
public interface IOrder
{
    DateTime Purchased { get; }
    decimal Cost { get; }
}
// </SnippetIOrderVersion1>

```
