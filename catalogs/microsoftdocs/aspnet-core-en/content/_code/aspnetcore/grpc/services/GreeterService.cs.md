# Source code: aspnetcore/grpc/services/GreeterService.cs

Complete source file; linked examples may select a region or line range.

```
using Grpc.Core;

namespace GrcpServices;

// <snippet_GreeterService>
public class GreeterService : GreeterBase
{
    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply { Message = $"Hello {request.Name}" });
    }
}
// </snippet_GreeterService>

```
