# Source code: docs/core/extensions/snippets/configuration/console-raw/Settings.cs

Complete source file; linked examples may select a region or line range.

```
public sealed class Settings
{
    public required int KeyOne { get; set; }
    public required bool KeyTwo { get; set; }
    public required NestedSettings KeyThree { get; set; } = null!;
}

```
