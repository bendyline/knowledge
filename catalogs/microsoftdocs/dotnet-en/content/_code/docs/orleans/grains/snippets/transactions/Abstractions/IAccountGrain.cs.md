# Source code: docs/orleans/grains/snippets/transactions/Abstractions/IAccountGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace TransactionalExample.Abstractions;

public interface IAccountGrain : IGrainWithStringKey
{
    [Transaction(TransactionOption.Join)]
    Task Withdraw(decimal amount);

    [Transaction(TransactionOption.Join)]
    Task Deposit(decimal amount);

    [Transaction(TransactionOption.CreateOrJoin)]
    Task<decimal> GetBalance();
}

```
