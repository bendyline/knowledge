# Source code: docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.ConsumeClientMiddleware/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Example.Two;

using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OllamaSharp;

// <SnippetUse>
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

IChatClient client = new OllamaApiClient(
    new Uri("http://localhost:11434/"),
    "phi3:mini");

builder.Services.AddChatClient(services =>
        client
        .AsBuilder()
        .UseDistributedCache()
        .UseRateLimiting()
        .UseOpenTelemetry()
        .Build(services));
// </SnippetUse>

// Elsewhere in the app
using IHost app = builder.Build();
IChatClient chatClient = app.Services.GetRequiredService<IChatClient>();

Console.WriteLine(await chatClient.GetResponseAsync("What is AI?"));

app.Run();

```
