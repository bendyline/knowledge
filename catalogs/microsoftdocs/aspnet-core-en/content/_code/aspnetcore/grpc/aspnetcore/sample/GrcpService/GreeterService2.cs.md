# Source code: aspnetcore/grpc/aspnetcore/sample/GrcpService/GreeterService2.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greet;
using Grpc.Core;

namespace GrpcGreeter
{
    #region snippet
    public class GreeterService : Greeter.GreeterBase
    {
        public override Task<HelloReply> SayHello(
            HelloRequest request, ServerCallContext context)
        {
            var httpContext = context.GetHttpContext();
            var clientCertificate = httpContext.Connection.ClientCertificate;

            return Task.FromResult(new HelloReply
            {
                Message = "Hello " + request.Name + " from " + clientCertificate.Issuer
            });
        }
    }
    #endregion
}

```
