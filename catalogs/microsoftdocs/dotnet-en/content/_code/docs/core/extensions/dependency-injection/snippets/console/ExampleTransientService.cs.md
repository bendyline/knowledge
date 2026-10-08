# Source code: docs/core/extensions/dependency-injection/snippets/console/ExampleTransientService.cs

Complete source file; linked examples may select a region or line range.

```
namespace ConsoleDI.Example;

internal sealed class ExampleTransientService : IExampleTransientService
{
    Guid IReportServiceLifetime.Id { get; } = Guid.NewGuid();
}

```
