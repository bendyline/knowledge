# Source code: samples/core/Miscellaneous/ConfiguringDbContext/WithContextFactory/FactoryServicesExample.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApp;

namespace WithContextFactory;

public class FactoryServicesExample
{
    #region ConfigureServices
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContextFactory<ApplicationDbContext>(
            options => options.UseSqlServer(
                @"Server=(localdb)\mssqllocaldb;Database=Test;ConnectRetryCount=0"));
    }
    #endregion
}

```
