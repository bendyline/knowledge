# Source code: samples/snippets/csharp/VS_Snippets_CLR/dg_exceptionDesign/cs/example2.cs

Complete source file; linked examples may select a region or line range.

```
//<snippet14>
using System;

public class EmployeeListNotFoundException : Exception
{
    public EmployeeListNotFoundException()
    {
    }

    public EmployeeListNotFoundException(string message)
        : base(message)
    {
    }

    public EmployeeListNotFoundException(string message, Exception inner)
        : base(message, inner)
    {
    }
}
//</snippet14>

public class TestExample
{
    public static void Main()
    {
        Exception ex = new();

        _ = new EmployeeListNotFoundException();
        _ = new EmployeeListNotFoundException("Hi!");
        _ = new EmployeeListNotFoundException("Hi!", ex);
    }
}

```
