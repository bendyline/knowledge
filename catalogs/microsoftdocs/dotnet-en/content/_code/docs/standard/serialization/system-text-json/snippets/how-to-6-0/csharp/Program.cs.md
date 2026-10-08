# Source code: docs/standard/serialization/system-text-json/snippets/how-to-6-0/csharp/Program.cs

Complete source file; linked examples may select a region or line range.

```
namespace SystemTextJsonSamples
{
    public class Program
    {
        static void Main()
        {
            Console.WriteLine("\n============================= Round trip to JsonElementAndNode\n");
            RoundtripJsonElementAndNode.Program.Main();
            Console.WriteLine("\n============================= Serialize and IgnoreCycles\n");
            SerializeIgnoreCycles.Program.Main();
            Console.WriteLine("\n============================= Callbacks / Notifications\n");
            Callbacks.Program.Main();
            Console.WriteLine("\n============================= Set property order\n");
            PropertyOrder.Program.Main();
        }
    }
}

```
