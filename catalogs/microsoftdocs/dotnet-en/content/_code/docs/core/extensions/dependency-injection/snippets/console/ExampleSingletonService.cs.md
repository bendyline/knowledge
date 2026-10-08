# Source code: docs/core/extensions/dependency-injection/snippets/console/ExampleSingletonService.cs

Complete source file; linked examples may select a region or line range.

```
namespace ConsoleDI.Example;

internal sealed class ExampleSingletonService : IExampleSingletonService
{
    Guid IReportServiceLifetime.Id { get; } = Guid.NewGuid();
}

```
