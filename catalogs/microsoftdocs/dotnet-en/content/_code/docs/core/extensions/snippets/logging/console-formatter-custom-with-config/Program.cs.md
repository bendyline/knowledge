# Source code: docs/core/extensions/snippets/logging/console-formatter-custom-with-config/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Console.ExampleFormatters.CustomWithConfig;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.AddConsole()
    .AddConsoleFormatter<
        CustomTimePrefixingFormatter, CustomWrappingConsoleFormatterOptions>();

using IHost host = builder.Build();

ILoggerFactory loggerFactory = host.Services.GetRequiredService<ILoggerFactory>();
ILogger<Program> logger = loggerFactory.CreateLogger<Program>();

using (logger.BeginScope("Logging scope"))
{
    logger.LogInformation("Hello World!");
    logger.LogInformation("The .NET developer community happily welcomes you.");
}

```
