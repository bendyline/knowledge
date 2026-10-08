# Source code: samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/lambda1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using System;
using System.Threading;
using System.Threading.Tasks;

public class Lambda
{
   public static void Main()
   {
      Thread.CurrentThread.Name = "Main";

      // Create a task and supply a user delegate by using a lambda expression.
      Task taskA = new Task( () => Console.WriteLine("Hello from taskA."));
      // Start the task.
      taskA.Start();

      // Output a message from the calling thread.
      Console.WriteLine($"Hello from thread '{Thread.CurrentThread.Name}'.");
      taskA.Wait();
   }
}
// The example displays output as follows:
//       Hello from thread 'Main'.
//       Hello from taskA.
// or
//       Hello from taskA.
//       Hello from thread 'Main'.
// </Snippet1>

```
