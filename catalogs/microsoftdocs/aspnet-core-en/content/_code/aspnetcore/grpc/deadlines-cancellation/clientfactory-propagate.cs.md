# Source code: aspnetcore/grpc/deadlines-cancellation/clientfactory-propagate.cs

Complete source file; linked examples may select a region or line range.

```
services
    .AddGrpcClient<User.UserServiceClient>(o =>
    {
        o.Address = new Uri("https://localhost:5001");
    })
    .EnableCallContextPropagation();
```
