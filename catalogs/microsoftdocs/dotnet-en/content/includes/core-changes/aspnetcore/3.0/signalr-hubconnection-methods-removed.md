### SignalR: HubConnection ResetSendPing and ResetTimeout methods removed

The `ResetSendPing` and `ResetTimeout` methods were removed from the SignalR `HubConnection` API. These methods were originally intended only for internal use but were made public in ASP.NET Core 2.2. These methods won't be available starting in the ASP.NET Core 3.0 Preview 4 release. For discussion, see [dotnet/aspnetcore#8543](https://github.com/dotnet/aspnetcore/issues/8543).

#### Version introduced

3.0

#### Old behavior

APIs were available.

#### New behavior

APIs are removed.

#### Reason for change

These methods were originally intended only for internal use but were made public in ASP.NET Core 2.2.

#### Recommended action

Don't use these methods.

#### Category

ASP.NET Core

#### Affected APIs

- [Microsoft.AspNetCore.SignalR.Client.HubConnection.ResetSendPing](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.ResetSendPing)
- [Microsoft.AspNetCore.SignalR.Client.HubConnection.ResetTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.ResetTimeout)

<!--

#### Affected APIs

- `M:Microsoft.AspNetCore.SignalR.Client.HubConnection.ResetSendPing`
- `M:Microsoft.AspNetCore.SignalR.Client.HubConnection.ResetTimeout`

-->
