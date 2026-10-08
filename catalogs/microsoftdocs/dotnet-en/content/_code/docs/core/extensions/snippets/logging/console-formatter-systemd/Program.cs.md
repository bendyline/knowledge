# Source code: docs/core/extensions/snippets/logging/console-formatter-systemd/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory =
    LoggerFactory.Create(builder =>
        builder.AddSystemdConsole(options =>
        {
            options.IncludeScopes = true;
            options.TimestampFormat = "HH:mm:ss ";
        }));

ILogger<Program> logger = loggerFactory.CreateLogger<Program>();
using (logger.BeginScope("[scope is enabled]"))
{
    logger.LogInformation("Hello World!");
    logger.LogInformation("Logs contain timestamp and log level.");
    logger.LogInformation("Systemd console logs never provide color options.");
    logger.LogInformation("Systemd console logs always appear in a single line.");
}

```
