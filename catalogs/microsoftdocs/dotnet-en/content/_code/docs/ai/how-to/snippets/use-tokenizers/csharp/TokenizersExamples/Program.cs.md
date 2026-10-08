# Source code: docs/ai/how-to/snippets/use-tokenizers/csharp/TokenizersExamples/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Threading.Tasks;

// Run examples
Console.WriteLine("=== Tiktoken Examples ===");
TiktokenExample.Run();

Console.WriteLine("\n=== Llama Examples ===");
try
{
    await LlamaExample.RunAsync();
}
catch (Exception ex)
{
    Console.WriteLine($"Note: Llama example requires network access to download model files: {ex.Message}");
}

Console.WriteLine("\n=== BPE Examples ===");
try
{
    await BpeExample.RunAsync();
}
catch (Exception ex)
{
    Console.WriteLine($"Note: BPE example requires network access to download tokenizer files: {ex.Message}");
}

```
