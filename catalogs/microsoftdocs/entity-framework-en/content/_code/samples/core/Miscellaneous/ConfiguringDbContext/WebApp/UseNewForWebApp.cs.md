# Source code: samples/core/Miscellaneous/ConfiguringDbContext/WebApp/UseNewForWebApp.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace WebApp;

public static class UseNewForWebApp
{
    public static void Example()
    {
        #region UseNewForWebApp
        var contextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Test;ConnectRetryCount=0")
            .Options;

        using var context = new ApplicationDbContext(contextOptions);
        #endregion
    }
}

```
