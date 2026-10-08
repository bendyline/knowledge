---
title: "Breaking change: Order of tags in Activity.Tags is reversed"
description: Learn about the .NET 5 breaking change in core .NET libraries where Activity.Tags now stores items in the list according to the order they're added.
ms.date: 11/01/2020
---
# Order of tags in Activity.Tags is reversed

[System.Diagnostics.Activity.Tags](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.Tags) now stores items in the list according to the order they're added. That is, the first item that's added is first in the list. This change was made to match the [OpenTelemetry Attributes specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/common/README.md).

## Change description

In previous .NET versions, [System.Diagnostics.Activity.Tags](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.Tags) stores items in the reverse order from which they're added. That is, the first item added is last in the list. Starting in .NET 5, the order of the items is reversed, and the first item added is always first in the list.

## Version introduced

5.0

## Recommended action

If your app has a dependency on the [System.Diagnostics.Activity.Tags](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.Tags) list order and you're upgrading to .NET 5 or later, you'll need to change this part of your code.

## Affected APIs

- [System.Diagnostics.Activity.Tags](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.Tags)

<!--

#### Category

Core .NET libraries

### Affected APIs

- `P:System.Diagnostics.Activity.Tags`

-->
