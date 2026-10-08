# Source code: samples/core/Performance/Other/BatchTweakingContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace Performance;

public class BatchTweakingContext : DbContext
{
    #region BatchTweaking
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            @"Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True",
            o => o
                .MinBatchSize(1)
                .MaxBatchSize(100));
    }
    #endregion
}
```
