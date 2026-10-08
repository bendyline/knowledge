# Source code: docs/core/extensions/dependency-injection/snippets/console/ExampleScopedService.cs

Complete source file; linked examples may select a region or line range.

```
namespace ConsoleDI.Example;

internal sealed class ExampleScopedService : IExampleScopedService
{
    Guid IReportServiceLifetime.Id { get; } = Guid.NewGuid();
}

```
