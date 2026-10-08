# Source code: samples/core/Performance/Other/ExtensionsLoggingContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Performance;

public class ExtensionsLoggingContext : DbContext
{
    #region ExtensionsLogging
    private static ILoggerFactory ContextLoggerFactory
        => LoggerFactory.Create(b => b.AddConsole().AddFilter("", LogLevel.Information));

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;ConnectRetryCount=0")
            .UseLoggerFactory(ContextLoggerFactory);
    }
    #endregion
}

```
