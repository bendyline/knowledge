# Source code: aspnetcore/grpc/code-first/samples/5.x/GrpcGreeter/Services/GreeterService.cs

Complete source file; linked examples may select a region or line range.

```
using ProtoBuf.Grpc;
using Shared.Contracts;
using System.Threading.Tasks;

namespace GrpcGreeter
{
    #region snippet
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
    #endregion
}

```
