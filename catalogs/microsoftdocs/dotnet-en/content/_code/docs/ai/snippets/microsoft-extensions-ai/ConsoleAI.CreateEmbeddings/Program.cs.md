# Source code: docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.CreateEmbeddings/Program.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using Microsoft.Extensions.AI;
using OllamaSharp;

IEmbeddingGenerator<string, Embedding<float>> generator =
    new OllamaApiClient(new Uri("http://localhost:11434/"), "phi3:mini");

foreach (Embedding<float> embedding in
    await generator.GenerateAsync(["What is AI?", "What is .NET?"]))
{
    Console.WriteLine(string.Join(", ", embedding.Vector.ToArray()));
}
// </Snippet1>

// <Snippet2>
ReadOnlyMemory<float> vector = await generator.GenerateVectorAsync("What is AI?");
// </Snippet2>

```
