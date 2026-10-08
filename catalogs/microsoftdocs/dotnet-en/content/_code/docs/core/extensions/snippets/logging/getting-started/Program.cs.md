# Source code: docs/core/extensions/snippets/logging/getting-started/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
ILogger logger = factory.CreateLogger("Program");
logger.LogInformation("Hello World! Logging is {Description}.", "fun");

```
