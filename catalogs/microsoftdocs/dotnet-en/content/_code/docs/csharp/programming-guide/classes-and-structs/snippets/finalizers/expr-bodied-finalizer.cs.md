# Source code: docs/csharp/programming-guide/classes-and-structs/snippets/finalizers/expr-bodied-finalizer.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
public class Destroyer
{
   public override string ToString() => GetType().Name;

   ~Destroyer() => Console.WriteLine($"The {ToString()} finalizer is executing.");
}
// </Snippet1>

class Program
{
   static void Main()
   {
        var destroyer = new Destroyer();
        destroyer = null;
        GC.GetTotalMemory(forceFullCollection: true);
        Console.WriteLine("Exiting...");
    }
}

```
