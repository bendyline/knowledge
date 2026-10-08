# Source code: docs/standard/exceptions/snippets/how-to-use-finally-blocks/csharp/source2.cs

Complete source file; linked examples may select a region or line range.

```
//<snippet3>
class ArgumentOutOfRangeExample
{
    public static void Main()
    {
        int[] array1 = {0, 0};
        int[] array2 = {0, 0};

        try
        {
            Array.Copy(array1, array2, -1);
        }
        catch (ArgumentOutOfRangeException e)
        {
            Console.WriteLine($"Error: {e}");
            throw;
        }
        finally
        {
            Console.WriteLine("This statement is always executed.");
        }
    }
}
//</snippet3>

```
