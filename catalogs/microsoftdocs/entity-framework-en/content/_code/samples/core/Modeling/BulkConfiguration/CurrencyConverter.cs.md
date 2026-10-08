# Source code: samples/core/Modeling/BulkConfiguration/CurrencyConverter.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EFModeling.BulkConfiguration;

#region CurrencyConverter
public class CurrencyConverter : ValueConverter<Currency, decimal>
{
    public CurrencyConverter()
        : base(
            v => v.Amount,
            v => new Currency(v))
    {
    }
}
#endregion
```
