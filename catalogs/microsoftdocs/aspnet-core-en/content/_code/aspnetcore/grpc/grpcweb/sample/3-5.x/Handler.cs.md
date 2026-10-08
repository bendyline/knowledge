# Source code: aspnetcore/grpc/grpcweb/sample/3-5.x/Handler.cs

Complete source file; linked examples may select a region or line range.

```
#region snippet_1
var channel = GrpcChannel.ForAddress("https://localhost:5001", new GrpcChannelOptions
    {
        HttpHandler = new GrpcWebHandler(new HttpClientHandler())
    });

var client = new Greeter.GreeterClient(channel);
var response = await client.SayHelloAsync(new HelloRequest { Name = ".NET" });
#endregion

```
