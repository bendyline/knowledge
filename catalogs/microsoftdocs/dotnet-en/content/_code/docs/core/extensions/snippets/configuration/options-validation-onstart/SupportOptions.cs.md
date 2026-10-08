# Source code: docs/core/extensions/snippets/configuration/options-validation-onstart/SupportOptions.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

public sealed class SupportOptions
{
    [Url]
    public string? Url { get; set; }

    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required, DataType(DataType.PhoneNumber)]
    public required string PhoneNumber { get; set; }
}

```
