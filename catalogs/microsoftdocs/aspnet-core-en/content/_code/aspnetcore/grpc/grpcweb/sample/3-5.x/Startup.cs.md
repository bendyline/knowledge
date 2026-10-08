# Source code: aspnetcore/grpc/grpcweb/sample/3-5.x/Startup.cs

Complete source file; linked examples may select a region or line range.

```
#region snippet_1
public void ConfigureServices(IServiceCollection services)
{
    services.AddGrpc();
}

public void Configure(IApplicationBuilder app)
{
    app.UseRouting();

    app.UseGrpcWeb(); // Must be added between UseRouting and UseEndpoints

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapGrpcService<GreeterService>().EnableGrpcWeb();
    });
}
#endregion

```
