# Source code: docs/csharp/snippets/methods/byvalue42.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet42>
public class SampleRefType
{
    public int value;
}

public static class ByRefTypeExample
{
    public static void Main()
    {
        var rt = new SampleRefType { value = 44 };
        ModifyObject(rt);
        Console.WriteLine(rt.value);
    }

    static void ModifyObject(SampleRefType obj) => obj.value = 33;
}
//</Snippet42>

```
