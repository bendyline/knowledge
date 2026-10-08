# Source code: samples/snippets/csharp/VS_Snippets_CLR/tools.certmgr/cs/storenames1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using System;
using System.Security.Cryptography.X509Certificates;

public class Example
{
   public static void Main()
   {
      foreach (var storeValue in Enum.GetValues(typeof(StoreName))) {
         X509Store store = new X509Store((StoreName) storeValue);
         store.Open(OpenFlags.ReadOnly);
         Console.WriteLine(store.Name);
      }
   }
}
// </Snippet1>

```
