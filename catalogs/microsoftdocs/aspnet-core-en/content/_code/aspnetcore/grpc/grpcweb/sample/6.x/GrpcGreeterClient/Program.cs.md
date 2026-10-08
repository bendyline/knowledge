# Source code: aspnetcore/grpc/grpcweb/sample/6.x/GrpcGreeterClient/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;
using Grpc.Net.Client;
using Grpc.Net.Client.Web;
using GrpcGreeterClient;

// <snippet_Handler>
var channel = GrpcChannel.ForAddress("https://localhost:53305", new GrpcChannelOptions
{
    HttpHandler = new GrpcWebHandler(new HttpClientHandler())
});

var client = new Greeter.GreeterClient(channel);
var response = await client.SayHelloAsync(
                  new HelloRequest { Name = "GreeterClient" });
// </snippet_Handler>

Console.WriteLine("Greeting: " + response.Message);
Console.WriteLine("Press any key to exit...");
Console.ReadKey();

```
