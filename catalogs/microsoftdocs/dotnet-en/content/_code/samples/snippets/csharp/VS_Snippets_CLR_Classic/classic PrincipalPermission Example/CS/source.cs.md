# Source code: samples/snippets/csharp/VS_Snippets_CLR_Classic/classic PrincipalPermission Example/CS/source.cs

Complete source file; linked examples may select a region or line range.

```
//<Snippet1>
using System;
using System.Threading;
using System.Security.Permissions;
using System.Security.Principal;

class SecurityPrincipalDemo
{

    public static void Main()
    {
        AppDomain.CurrentDomain.SetPrincipalPolicy(PrincipalPolicy.WindowsPrincipal);
        PrincipalPermission principalPerm = new PrincipalPermission(null, "Administrators");
        principalPerm.Demand();
        Console.WriteLine("Demand succeeded.");
    }
}
//</Snippet1>
```
