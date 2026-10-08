# Source code: aspnetcore/signalr/background-service/samples/6.0/Server/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Server;

#region Program
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddHostedService<Worker>();

var app = builder.Build();

app.MapHub<ClockHub>("/hubs/clock");

app.Run();
#endregion

```
