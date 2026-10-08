# Source code: docs/core/extensions/snippets/configuration/console-json/SettingsOptions.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace ConsoleJson.Example;

public sealed class SettingsOptions
{
    public const string ConfigurationSectionName = "MyCustomSettingsSection";

    [Required]
    [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$")]
    public required string SiteTitle { get; set; }

    [Required]
    [Range(0, 1_000,
        ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    public required int Scale { get; set; }

    [Required]
    public required int VerbosityLevel { get; set; }
}

```
