# Source code: aspnetcore/grpc/diagnostics/sample/net-client-loggerfactory-create.cs

Complete source file; linked examples may select a region or line range.

```
var loggerFactory = LoggerFactory.Create(logging =>
{
    logging.AddConsole();
    logging.SetMinimumLevel(LogLevel.Debug);
});

var channel = GrpcChannel.ForAddress("https://localhost:5001",
    new GrpcChannelOptions { LoggerFactory = loggerFactory });

var client = Greeter.GreeterClient(channel);
```
