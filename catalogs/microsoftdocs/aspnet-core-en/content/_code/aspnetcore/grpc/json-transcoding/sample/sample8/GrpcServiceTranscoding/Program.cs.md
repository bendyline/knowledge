# Source code: aspnetcore/grpc/json-transcoding/sample/sample8/GrpcServiceTranscoding/Program.cs

Complete source file; linked examples may select a region or line range.

```
using GrpcServiceTranscoding.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc().AddJsonTranscoding();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();

```
