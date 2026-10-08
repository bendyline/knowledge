# Source code: docs/core/extensions/snippets/logging/library-authors/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Logging.LibraryAuthors;
using Microsoft.Extensions.Logging;

LibraryConfiguration.SetLoggerFactory(
    LoggerFactory.Create(
        builder => builder.AddConsole()));

var service = new NonDiExampleService();

service.ProcessProductSale(new(), 7);

```
