# Source code: docs/csharp/programming-guide/indexers/snippets/indexers/indexer-1.cs

Complete source file; linked examples may select a region or line range.

```
namespace Indexers;

public class SampleCollection<T>
{
   // Declare an array to store the data elements.
   private T[] arr = new T[100];

   // Define the indexer to allow client code to use [] notation.
   public T this[int i]
   {
      get => arr[i];
      set => arr[i] = value;
   }
}


```
