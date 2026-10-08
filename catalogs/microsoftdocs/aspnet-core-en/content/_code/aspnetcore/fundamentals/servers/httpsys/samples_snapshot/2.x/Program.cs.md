# Source code: aspnetcore/fundamentals/servers/httpsys/samples_snapshot/2.x/Program.cs

Complete source file; linked examples may select a region or line range.

```
public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .UseStartup<Startup>()
        .UseHttpSys(options =>
        {
            options.UrlPrefixes.Add("https://10.0.0.4:443");
        });

```
