# Source code: docs/orleans/grains/snippets/transactions/Abstractions/Balance.cs

Complete source file; linked examples may select a region or line range.

```
namespace TransactionalExample.Abstractions;

[GenerateSerializer]
public record class Balance
{
    [Id(0)]
    public decimal Value { get; set; } = 1_000;
}

```
