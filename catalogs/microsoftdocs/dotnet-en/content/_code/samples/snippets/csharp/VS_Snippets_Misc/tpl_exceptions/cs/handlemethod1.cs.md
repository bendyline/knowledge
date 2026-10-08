# Source code: samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/handlemethod1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet6>

public static partial class Program
{
    public static void HandleMethod()
    {
        var task = Task.Run(
            () => throw new CustomException("This exception is expected!"));

        try
        {
            task.Wait();
        }
        catch (AggregateException ae)
        {
            // Call the Handle method to handle the custom exception,
            // otherwise rethrow the exception.
            ae.Handle(ex =>
            {
                if (ex is CustomException)
                {
                    Console.WriteLine(ex.Message);
                }
                return ex is CustomException;
            });
        }
    }
}
// The example displays the following output:
//        This exception is expected!
// </Snippet6>

```
