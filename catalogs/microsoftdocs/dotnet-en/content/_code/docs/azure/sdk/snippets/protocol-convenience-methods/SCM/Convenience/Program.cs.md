# Source code: docs/azure/sdk/snippets/protocol-convenience-methods/SCM/Convenience/Program.cs

Complete source file; linked examples may select a region or line range.

```
using OpenAI.Chat;

// Create the client
ChatClient client = new(
    model: "gpt-4o-mini",
    credential: Environment.GetEnvironmentVariable("OPENAI_API_KEY")!);

// Call the convenience method
ChatCompletion completion = client.CompleteChat("What is Microsoft Azure?");

// Display the results
Console.WriteLine($"[{completion.Role}]: {completion}");

```
