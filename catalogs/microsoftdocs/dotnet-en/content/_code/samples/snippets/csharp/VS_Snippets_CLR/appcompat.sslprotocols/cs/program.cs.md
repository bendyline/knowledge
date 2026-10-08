# Source code: samples/snippets/csharp/VS_Snippets_CLR/appcompat.sslprotocols/cs/program.cs

Complete source file; linked examples may select a region or line range.

```
using System;

class Program
{
   static void Main()
   {
      // <Snippet1>
      const string DisableCachingName = @"TestSwitch.LocalAppContext.DisableCaching";
      const string DontEnableSchUseStrongCryptoName = @"Switch.System.Net.DontEnableSchUseStrongCrypto";
      AppContext.SetSwitch(DisableCachingName, true);
      AppContext.SetSwitch(DontEnableSchUseStrongCryptoName, true);
      // </Snippet1>
   }
}

```
