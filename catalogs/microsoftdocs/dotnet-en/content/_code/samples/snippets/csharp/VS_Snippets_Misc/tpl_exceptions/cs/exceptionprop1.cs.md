# Source code: samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/exceptionprop1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet7>

public static partial class Program
{
    public static void ExceptionPropagation()
    {
        _ = Task.Run(
            () => throw new CustomException("task1 faulted."))
            .ContinueWith(_ =>
            {
                if (_.Exception?.InnerException is { } inner)
                {
                    Console.WriteLine($"{inner.GetType().Name}: {inner.Message}");
                }
            },
            TaskContinuationOptions.OnlyOnFaulted);

        Thread.Sleep(500);
    }
}
// The example displays output like the following:
//        CustomException: task1 faulted.
// </Snippet7>

```
