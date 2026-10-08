# Source code: docs/azure/sdk/snippets/protocol-convenience-methods/AzureCore/Convenience/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Azure.AI.ContentSafety;
using Azure.Identity;

// Create the client
ContentSafetyClient client = new(
    new Uri("https://contentsafetyai.cognitiveservices.azure.com/"),
    new DefaultAzureCredential());

// Call the convenience method
AnalyzeTextResult result = client.AnalyzeText("What is Microsoft Azure?");

// Display the results
foreach (TextCategoriesAnalysis item in result.CategoriesAnalysis)
{
    Console.WriteLine($"{item.Category}: {item.Severity}");
}

```
