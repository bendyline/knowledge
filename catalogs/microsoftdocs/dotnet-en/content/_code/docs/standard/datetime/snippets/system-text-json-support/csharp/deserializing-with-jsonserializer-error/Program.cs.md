# Source code: docs/standard/datetime/snippets/system-text-json-support/csharp/deserializing-with-jsonserializer-error/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

public class Example
{
    private class Product
    {
        public string? Name { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

    public static void Main(string[] args)
    {
        string json = @"{""Name"":""Banana"",""ExpiryDate"":""26/07/2019""}";
        try
        {
            Product _ = JsonSerializer.Deserialize<Product>(json)!;
        }
        catch (JsonException e)
        {
            Console.WriteLine(e.Message);
        }
    }
}

// The example displays the following output:
// The JSON value could not be converted to System.DateTime. Path: $.ExpiryDate | LineNumber: 0 | BytePositionInLine: 42.

```
