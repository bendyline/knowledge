# Source code: aspnetcore/grpc/health-checks/Startup.cs

Complete source file; linked examples may select a region or line range.

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddGrpc();
    services
        .AddGrpcHealthChecks()
        .AddCheck("Sample", () => HealthCheckResult.Healthy());
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseRouting();
    
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapGrpcService<GreeterService>();
        endpoints.MapGrpcHealthChecksService();
    });
}
```
