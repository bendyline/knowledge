# Source code: docs/core/extensions/dependency-injection/snippets/console/IExampleTransientService.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.DependencyInjection;

namespace ConsoleDI.Example;

public interface IExampleTransientService : IReportServiceLifetime
{
    ServiceLifetime IReportServiceLifetime.Lifetime => ServiceLifetime.Transient;
}

```
