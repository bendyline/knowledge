# Source code: docs/csharp/programming-guide/indexers/snippets/Temperatures/Program.cs

Complete source file; linked examples may select a region or line range.

```
var tempRecord = new TempRecord();

// Use the indexer's set accessor
tempRecord[3] = 58.3F;
tempRecord[5] = 60.1F;

// Use the indexer's get accessor
for (int i = 0; i < 10; i++)
{
    Console.WriteLine($"Element #{i} = {tempRecord[i]}");
}

```
