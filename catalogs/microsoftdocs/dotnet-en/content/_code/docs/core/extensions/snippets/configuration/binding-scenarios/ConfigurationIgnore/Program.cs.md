# Source code: docs/core/extensions/snippets/configuration/binding-scenarios/ConfigurationIgnore/Program.cs

Complete source file; linked examples may select a region or line range.

```
// <AppOptions>
using Microsoft.Extensions.Configuration;

public sealed class AppOptions
{
    public string Endpoint { get; set; } = "";

    [ConfigurationIgnore]
    public string RuntimeValue { get; set; } = "calculated";
}
// </AppOptions>

public static class Program
{
    public static void Main()
    {
        var configuration = new ConfigurationManager
        {
            [nameof(AppOptions.Endpoint)] = "https://localhost",
            [nameof(AppOptions.RuntimeValue)] = "configured",
        };

        var options = new AppOptions();
        configuration.Bind(options);

        Console.WriteLine($"Endpoint: {options.Endpoint}");
        Console.WriteLine($"RuntimeValue: {options.RuntimeValue}");
    }
}

```
