# Source code: aspnetcore/fundamentals/servers/httpsys/samples_snapshot/3.x/Program.cs

Complete source file; linked examples may select a region or line range.

```
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseHttpSys(options =>
            {
                options.UrlPrefixes.Add("https://10.0.0.4:443");
            });
            webBuilder.UseStartup<Startup>();
        });

```
