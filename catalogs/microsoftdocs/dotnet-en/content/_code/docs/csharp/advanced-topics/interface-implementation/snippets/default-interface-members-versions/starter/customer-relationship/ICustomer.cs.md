# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/default-interface-members-versions/starter/customer-relationship/ICustomer.cs

Complete source file; linked examples may select a region or line range.

```
namespace customer_relationship;

// <SnippetICustomerVersion1>
public interface ICustomer
{
    IEnumerable<IOrder> PreviousOrders { get; }

    DateTime DateJoined { get; }
    DateTime? LastOrder { get; }
    string Name { get; }
    IDictionary<DateTime, string> Reminders { get; }
}
// </SnippetICustomerVersion1>

```
