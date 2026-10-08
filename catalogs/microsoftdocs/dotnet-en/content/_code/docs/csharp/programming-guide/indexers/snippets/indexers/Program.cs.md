# Source code: docs/csharp/programming-guide/indexers/snippets/indexers/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Indexers;

var readOnlyStringCollection = new ReadOnlySampleCollection<string>("Hello, World");
Console.WriteLine(readOnlyStringCollection[0]);

var stringCollection = new SampleCollection<string>();
stringCollection[0] = "Hello, World";
Console.WriteLine(stringCollection[0]);

```
