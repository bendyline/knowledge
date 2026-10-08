# Source code: docs/core/extensions/snippets/async-state/csharp/IAsyncContextExample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.Extensions.AsyncState;
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddAsyncState();

var provider = services.BuildServiceProvider();
// <snippet>
var context = provider.GetRequiredService<IAsyncContext<UserContext>>();

// Set a value in the async context
var userContext = new UserContext { UserId = "12345", UserName = "Alice" };
context.Set(userContext);

// Retrieve the value
if (context.TryGet(out var retrievedContext))
{
    Console.WriteLine($"User: {retrievedContext.UserName}");
}
// </snippet>

// <UserContext>
public record class UserContext
{
    public required string UserId { get; set; }
    public required string UserName { get; set; }
}
// </UserContext>

```
