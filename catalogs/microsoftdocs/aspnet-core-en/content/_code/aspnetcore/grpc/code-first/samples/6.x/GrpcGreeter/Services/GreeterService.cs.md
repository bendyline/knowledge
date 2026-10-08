# Source code: aspnetcore/grpc/code-first/samples/6.x/GrpcGreeter/Services/GreeterService.cs

Complete source file; linked examples may select a region or line range.

```
using Shared.Contracts;
using ProtoBuf.Grpc;

public class GreeterService : IGreeterService
{
    public Task<HelloReply> SayHelloAsync(HelloRequest request, CallContext context = default)
    {
        return Task.FromResult(
                new HelloReply
                {
                    Message = $"Hello {request.Name}"
                });
    }
}

```
