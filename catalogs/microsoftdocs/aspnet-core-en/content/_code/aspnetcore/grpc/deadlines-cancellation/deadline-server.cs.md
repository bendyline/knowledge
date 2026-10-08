# Source code: aspnetcore/grpc/deadlines-cancellation/deadline-server.cs

Complete source file; linked examples may select a region or line range.

```
public override async Task<HelloReply> SayHello(HelloRequest request,
    ServerCallContext context)
{
    var user = await _databaseContext.GetUserAsync(request.Name,
        context.CancellationToken);

    return new HelloReply { Message = "Hello " + user.DisplayName };
}
```
