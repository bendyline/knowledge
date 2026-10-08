# Source code: docs/csharp/advanced-topics/interop/snippets/dynamic-walkthrough/program.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace DynamicWalkthrough
{
    class Program
    {
        static void Main(string[] args)
        {
            //<Snippet8>
            dynamic rFile = new ReadOnlyFile(@"..\..\..\TextFile1.txt");
            foreach (string line in rFile.Customer)
            {
                Console.WriteLine(line);
            }
            Console.WriteLine("----------------------------");
            foreach (string line in rFile.Customer(StringSearchOption.Contains, true))
            {
                Console.WriteLine(line);
            }
            //</Snippet8>
        }
    }
}

```
