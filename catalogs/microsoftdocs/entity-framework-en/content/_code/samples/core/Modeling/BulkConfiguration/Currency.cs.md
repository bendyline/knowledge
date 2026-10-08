# Source code: samples/core/Modeling/BulkConfiguration/Currency.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFModeling.BulkConfiguration;

#region Currency
public readonly struct Currency
{
    public Currency(decimal amount)
        => Amount = amount;

    public decimal Amount { get; }

    public override string ToString()
        => $"${Amount}";
}
#endregion
```
