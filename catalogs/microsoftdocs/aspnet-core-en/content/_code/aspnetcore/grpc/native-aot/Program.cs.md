# Source code: aspnetcore/grpc/native-aot/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateSlimBuilder(args);
builder.Services.AddGrpc();

var app = builder.Build();
app.MapGrpcService<GreeterService>();
app.Run();
```
