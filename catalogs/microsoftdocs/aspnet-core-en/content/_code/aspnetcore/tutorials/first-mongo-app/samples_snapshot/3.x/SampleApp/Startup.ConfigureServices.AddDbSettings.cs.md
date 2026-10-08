# Source code: aspnetcore/tutorials/first-mongo-app/samples_snapshot/3.x/SampleApp/Startup.ConfigureServices.AddDbSettings.cs

Complete source file; linked examples may select a region or line range.

```
public void ConfigureServices(IServiceCollection services)
{
    // requires using Microsoft.Extensions.Options
    services.Configure<BookstoreDatabaseSettings>(
        Configuration.GetSection(nameof(BookstoreDatabaseSettings)));

    services.AddSingleton<IBookstoreDatabaseSettings>(sp =>
        sp.GetRequiredService<IOptions<BookstoreDatabaseSettings>>().Value);

    services.AddControllers();
}

```
