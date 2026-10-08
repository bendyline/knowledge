### SignalR: UseSignalR and UseConnections methods marked obsolete

The methods `UseConnections` and `UseSignalR` and the classes `ConnectionsRouteBuilder` and `HubRouteBuilder` are marked as obsolete in ASP.NET Core 3.0.

#### Version introduced

3.0

#### Old behavior

SignalR hub routing was configured using `UseSignalR` or `UseConnections`.

#### New behavior

The old way of configuring routing has been obsoleted and replaced with endpoint routing.

#### Reason for change

Middleware is being moved to the new endpoint routing system. The old way of adding middleware is being obsoleted.

#### Recommended action

Replace `UseSignalR` with `UseEndpoints`:

**Old code:**

```csharp
app.UseSignalR(routes =>
{
    routes.MapHub<SomeHub>("/path");
});
```

**New code:**

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<SomeHub>("/path");
});
```

#### Category

ASP.NET Core

#### Affected APIs

- [Microsoft.AspNetCore.Builder.ConnectionsAppBuilderExtensions.UseConnections(Microsoft.AspNetCore.Builder.IApplicationBuilder,System.Action{Microsoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ConnectionsAppBuilderExtensions.UseConnections(Microsoft.AspNetCore.Builder.IApplicationBuilder%2CSystem.Action%7BMicrosoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder%7D))
- [Microsoft.AspNetCore.Builder.SignalRAppBuilderExtensions.UseSignalR(Microsoft.AspNetCore.Builder.IApplicationBuilder,System.Action{Microsoft.AspNetCore.SignalR.HubRouteBuilder})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.SignalRAppBuilderExtensions.UseSignalR(Microsoft.AspNetCore.Builder.IApplicationBuilder%2CSystem.Action%7BMicrosoft.AspNetCore.SignalR.HubRouteBuilder%7D))
- [Microsoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder)
- [Microsoft.AspNetCore.SignalR.HubRouteBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubRouteBuilder)

<!-- 

#### Affected APIs

- `M:Microsoft.AspNetCore.Builder.ConnectionsAppBuilderExtensions.UseConnections(Microsoft.AspNetCore.Builder.IApplicationBuilder,System.Action{Microsoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder})`
- `M:Microsoft.AspNetCore.Builder.SignalRAppBuilderExtensions.UseSignalR(Microsoft.AspNetCore.Builder.IApplicationBuilder,System.Action{Microsoft.AspNetCore.SignalR.HubRouteBuilder})`
- `T:Microsoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder`
- `T:Microsoft.AspNetCore.SignalR.HubRouteBuilder`

-->
