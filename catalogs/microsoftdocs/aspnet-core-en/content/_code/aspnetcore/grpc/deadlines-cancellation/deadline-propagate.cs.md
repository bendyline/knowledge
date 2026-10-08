# Source code: aspnetcore/grpc/deadlines-cancellation/deadline-propagate.cs

Complete source file; linked examples may select a region or line range.

```
public override async Task<UserResponse> GetUser(UserRequest request,
    ServerCallContext context)
{
    var client = new User.UserServiceClient(_channel);
    var response = await client.GetUserAsync(
        new UserRequest { Id = request.Id },
        deadline: context.Deadline);

    return response;
}
```
