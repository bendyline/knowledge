# Source code: docs/csharp/linq/snippets/linq-index/Index.cs

Complete source file; linked examples may select a region or line range.

```
namespace LinqSamples;

public static class IndexClass
{
    public static void Intro()
    {
        // <intro>
        // Specify the data source.
        int[] scores = [97, 92, 81, 60];

        // Define the query expression.
        IEnumerable<int> scoreQuery =
            from score in scores
            where score > 80
            select score;

        // Execute the query.
        foreach (var i in scoreQuery)
        {
            Console.Write(i + " ");
        }

        // Output: 97 92 81
        // </intro>
    }
}

```
