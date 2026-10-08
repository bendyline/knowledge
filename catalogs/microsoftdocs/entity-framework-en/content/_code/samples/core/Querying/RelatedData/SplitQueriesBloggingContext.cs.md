# Source code: samples/core/Querying/RelatedData/SplitQueriesBloggingContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFQuerying.RelatedData;

public class SplitQueriesBloggingContext : BloggingContext
{
    #region QuerySplittingBehaviorSplitQuery
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseSqlServer(
                @"Server=(localdb)\mssqllocaldb;Database=EFQuerying;Trusted_Connection=True;ConnectRetryCount=0",
                o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
    }
    #endregion
}

```
