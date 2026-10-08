# Source code: docs/orleans/grains/snippets/transactions/Abstractions/IAtmGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace TransactionalExample.Abstractions;

public interface IAtmGrain : IGrainWithIntegerKey
{
    [Transaction(TransactionOption.Create)]
    Task Transfer(string fromId, string toId, decimal amountToTransfer);
}

```
