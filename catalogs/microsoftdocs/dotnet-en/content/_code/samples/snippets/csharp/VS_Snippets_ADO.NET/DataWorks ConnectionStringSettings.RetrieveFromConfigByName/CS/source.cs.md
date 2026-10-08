# Source code: samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByName/CS/source.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Configuration;

static class Program
{
    static void Main()
    {
        var s = GetConnectionStringByName("NorthwindSQL");
        Console.WriteLine(s);
        Console.ReadLine();
    }

    // <Snippet1>
    // Retrieves a connection string by name.
    // Returns null if the name is not found.
    static string? GetConnectionStringByName(string name)
    {
        // Look for the name in the connectionStrings section.
        ConnectionStringSettings? settings =
            ConfigurationManager.ConnectionStrings[name];

        // If found, return the connection string (otherwise return null)
        return settings?.ConnectionString;
    }
    // </Snippet1>
}

```
