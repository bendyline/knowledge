# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.types.viewinfo/cs/source2.cs

Complete source file; linked examples may select a region or line range.

```
// <snippet2>
using System;
using System.IO;
using System.Reflection;

class MyMemberInfo
{
    public static void Main()
    {
        Console.WriteLine ("\nReflection.MemberInfo");
        // Gets the Type and MemberInfo.
        Type myType = Type.GetType("System.IO.File");
        MemberInfo[] myMemberInfoArray = myType.GetMembers();
        // Gets and displays the DeclaringType method.
        Console.WriteLine($"\nThere are {myMemberInfoArray.Length} members in {myType.FullName}.");
        Console.WriteLine($"{myType.FullName}.");
        if (myType.IsPublic)
        {
            Console.WriteLine($"{myType.FullName} is public.");
        }
    }
}
// </snippet2>

```
