# Source code: samples/snippets/csharp/VS_Snippets_Misc/tpl_childtasks/cs/nested1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using System;
using System.Threading;
using System.Threading.Tasks;

public class Example4
{
    public static void Main()
    {
        Task parent = Task.Factory.StartNew(() =>
        {
            Console.WriteLine("Outer task executing.");

            Task child = Task.Factory.StartNew(() =>
            {
                Console.WriteLine("Nested task starting.");
                Thread.SpinWait(500000);
                Console.WriteLine("Nested task completing.");
            });
        });

        parent.Wait();
        Console.WriteLine("Outer has completed.");
    }
}

// The example produces output like the following:
//        Outer task executing.
//        Nested task starting.
//        Outer has completed.
//        Nested task completing.
// </Snippet1>

```
