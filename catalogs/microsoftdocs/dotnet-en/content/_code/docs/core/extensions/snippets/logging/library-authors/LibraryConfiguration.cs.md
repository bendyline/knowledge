# Source code: docs/core/extensions/snippets/logging/library-authors/LibraryConfiguration.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace Logging.LibraryAuthors;

public sealed class LibraryConfiguration
{
    internal static ILoggerFactory LoggerFactory { get; private set; } = NullLoggerFactory.Instance;

    public static void SetLoggerFactory(ILoggerFactory loggerFactory) =>
        LoggerFactory = loggerFactory;
}

```
