# Source code: docs/csharp/fundamentals/tutorials/snippets/inheritance/private.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
public class A
{
    private int _value = 10;

    public class B : A
    {
        public int GetValue()
        {
            return _value;
        }
    }
}

public class C : A
{
    //    public int GetValue()
    //    {
    //        return _value;
    //    }
}

public class AccessExample
{
    public static void Main(string[] args)
    {
        var b = new A.B();
        Console.WriteLine(b.GetValue());
    }
}
// The example displays the following output:
//       10
// </Snippet1>

```
