# Source code: samples/snippets/csharp/VS_Snippets_CLR/AppDomain_Setup/CS/setup.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Security.Policy;

class Test
{
    public static void Main()
    {
        // <Snippet1>
        // Set up the AppDomainSetup
        AppDomainSetup setup = new AppDomainSetup();
        setup.ApplicationBase = "(some directory)";
        setup.ConfigurationFile = "(some file)";

        // Set up the Evidence
        Evidence baseEvidence = AppDomain.CurrentDomain.Evidence;
        Evidence evidence = new Evidence(baseEvidence);
        evidence.AddAssembly("(some assembly)");
        evidence.AddHost("(some host)");

        // Create the AppDomain
        AppDomain newDomain = AppDomain.CreateDomain("newDomain", evidence, setup);
        // </Snippet1>
    }
}

```
