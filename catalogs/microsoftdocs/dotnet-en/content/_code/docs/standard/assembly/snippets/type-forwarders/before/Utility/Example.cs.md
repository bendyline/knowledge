# Source code: docs/standard/assembly/snippets/type-forwarders/before/Utility/Example.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace Common.Objects;

public class Example
{
    public string Message { get; init; } = "Hi friends!";

    public Guid Id { get; init; } = Guid.NewGuid();

    public DateOnly Date { get; init; } = DateOnly.FromDateTime(DateTime.Today);

    public sealed override string ToString() =>
        $"[{Id} - {Date}]: {Message}";
}

```
