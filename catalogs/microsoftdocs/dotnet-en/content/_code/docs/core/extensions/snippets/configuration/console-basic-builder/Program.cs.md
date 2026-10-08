# Source code: docs/core/extensions/snippets/configuration/console-basic-builder/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Configuration;

var configuration = new ConfigurationBuilder()
    .AddInMemoryCollection(new Dictionary<string, string?>()
    {
        ["SomeKey"] = "SomeValue"
    })
    .Build();

Console.WriteLine(configuration["SomeKey"]);

// Outputs:
//   SomeValue
```
