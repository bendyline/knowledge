# Source code: samples/core/Miscellaneous/ConfiguringDbContext/WithContextFactory/MyController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;
using WebApp;

namespace WithContextFactory;

#pragma warning disable CS1998 // This async method lacks 'await' operators and will run synchronously.

public class MyController
{
    #region Construct
    private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

    public MyController(IDbContextFactory<ApplicationDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }
    #endregion

    #region DoSomething
    public async Task DoSomething()
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            // ...
        }
    }
    #endregion
}

```
