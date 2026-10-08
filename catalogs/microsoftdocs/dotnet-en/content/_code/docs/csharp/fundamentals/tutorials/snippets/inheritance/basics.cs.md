# Source code: docs/csharp/fundamentals/tutorials/snippets/inheritance/basics.cs

Complete source file; linked examples may select a region or line range.

```
namespace Basic;

// <Snippet1>
public class A
{
    public void Method1()
    {
        // Method implementation.
    }
}

public class B : A
{ }

public class Example
{
    public static void Main()
    {
        B b = new ();
        b.Method1();
    }
}
// </Snippet1>

```
