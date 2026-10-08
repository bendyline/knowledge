# Source code: docs/core/extensions/snippets/configuration/custom-provider/WidgetOptions.cs

Complete source file; linked examples may select a region or line range.

```
namespace CustomProvider.Example;

public class WidgetOptions
{
    public required Guid EndpointId { get; set; }

    public required string DisplayLabel { get; set; } = null!;

    public required string WidgetRoute { get; set; } = null!;
}

```
