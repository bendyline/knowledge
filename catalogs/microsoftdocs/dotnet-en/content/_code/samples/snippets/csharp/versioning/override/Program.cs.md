# Source code: samples/snippets/csharp/versioning/override/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;

class Program
{
#region sample
    public class MyBaseClass
    {
        public virtual string MethodOne()
        {
            return "Method One";
        }
    }

    public class MyDerivedClass : MyBaseClass
    {
        public override string MethodOne()
        {
            return "Derived Method One";
        }
    }

    public static void Main()
    {
        MyBaseClass b = new MyBaseClass();
        MyDerivedClass d = new MyDerivedClass();

        Console.WriteLine($"Base Method One: {b.MethodOne()}");
        Console.WriteLine($"Derived Method One: {d.MethodOne()}");
    }
#endregion
}

```
