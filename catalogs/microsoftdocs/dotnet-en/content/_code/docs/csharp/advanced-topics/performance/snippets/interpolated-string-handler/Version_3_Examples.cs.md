# Source code: docs/csharp/advanced-topics/performance/snippets/interpolated-string-handler/Version_3_Examples.cs

Complete source file; linked examples may select a region or line range.

```
using interpolated_string_handler.Version3;

internal static class Version_3
{
    public static void Example()
    {
        // Remove extra work
        Console.WriteLine("=========          Add Receiver argument: elide building when not printing          ==========");

        var logger = new Logger() { EnabledLevel = LogLevel.Warning };
        var time = DateTime.Now;

        logger.LogMessage(LogLevel.Error, $"Error Level. CurrentTime: {time}. This is an error. It will be printed.");
        logger.LogMessage(LogLevel.Trace, $"Trace Level. CurrentTime: {time}. This won't be printed.");
        logger.LogMessage(LogLevel.Warning, "Warning Level. This warning is a string, not an interpolated string expression.");
    }
}

```
