# Source code: docs/csharp/programming-guide/indexers/snippets/indexers/indexer-2.cs

Complete source file; linked examples may select a region or line range.

```
namespace Indexers;

public class ReadOnlySampleCollection<T>(params IEnumerable<T> items)
{
   // Declare an array to store the data elements.
   private T[] arr = [.. items];

   public T this[int i] => arr[i];

}


```
