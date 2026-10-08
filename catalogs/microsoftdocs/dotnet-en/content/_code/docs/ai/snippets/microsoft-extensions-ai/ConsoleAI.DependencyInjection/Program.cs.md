# Source code: docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.DependencyInjection/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OllamaSharp;

// App setup.
var builder = Host.CreateApplicationBuilder();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddChatClient(new OllamaApiClient(new Uri("http://localhost:11434"), "llama3.1"))
    .UseDistributedCache();
var host = builder.Build();

// Elsewhere in the app.
var chatClient = host.Services.GetRequiredService<IChatClient>();
Console.WriteLine(await chatClient.GetResponseAsync("What is AI?"));

```
