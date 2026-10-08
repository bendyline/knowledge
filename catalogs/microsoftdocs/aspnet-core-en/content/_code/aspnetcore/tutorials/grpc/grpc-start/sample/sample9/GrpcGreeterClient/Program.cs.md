# Source code: aspnetcore/tutorials/grpc/grpc-start/sample/sample9/GrpcGreeterClient/Program.cs

Complete source file; linked examples may select a region or line range.

```
#region snippet2
using Grpc.Net.Client;
using GrpcGreeterClient;

#region snippet
// The port number must match the port of the gRPC server.
using var channel = GrpcChannel.ForAddress("https://localhost:7042");
var client = new Greeter.GreeterClient(channel);
var reply = await client.SayHelloAsync(
    new HelloRequest { Name = "GreeterClient" });
Console.WriteLine("Greeting: " + reply.Message);
Console.WriteLine("Press any key to exit...");
Console.ReadKey();
#endregion
#endregion
```
