# Source code: samples/snippets/csharp/VS_Snippets_CLR/ADCreateDomain/CS/source2.cs

Complete source file; linked examples may select a region or line range.

```
//<snippet2>
using System;
using System.Reflection;

class AppDomain1
{
    public static void Main()
    {
        Console.WriteLine("Creating new AppDomain.");
        AppDomain domain = AppDomain.CreateDomain("MyDomain");

        Console.WriteLine("Host domain: " + AppDomain.CurrentDomain.FriendlyName);
        Console.WriteLine("child domain: " + domain.FriendlyName);
    }
}
//</snippet2>

```
