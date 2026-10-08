# Source code: docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.ProvideOptions/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.AI;
using OllamaSharp;

IChatClient client = new OllamaApiClient(new Uri("http://localhost:11434"));

client = ChatClientBuilderChatClientExtensions.AsBuilder(client)
    .ConfigureOptions(options => options.ModelId ??= "phi3")
    .Build();

// Will request "phi3".
Console.WriteLine(await client.GetResponseAsync("What is AI?"));
// Will request "llama3.1".
Console.WriteLine(await client.GetResponseAsync("What is AI?", new() { ModelId = "llama3.1" }));

```
