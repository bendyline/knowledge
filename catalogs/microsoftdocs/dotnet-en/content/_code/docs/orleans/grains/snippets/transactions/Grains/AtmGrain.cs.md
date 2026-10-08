# Source code: docs/orleans/grains/snippets/transactions/Grains/AtmGrain.cs

Complete source file; linked examples may select a region or line range.

```
namespace TransactionalExample.Grains;

[StatelessWorker]
public class AtmGrain : Grain, IAtmGrain
{
    public Task Transfer(
        string fromId,
        string toId,
        decimal amount) =>
        Task.WhenAll(
            GrainFactory.GetGrain<IAccountGrain>(fromId).Withdraw(amount),
            GrainFactory.GetGrain<IAccountGrain>(toId).Deposit(amount));
}

```
