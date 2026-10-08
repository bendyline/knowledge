# Source code: docs/csharp/advanced-topics/performance/snippets/interpolated-string-handler/Version_2_Examples.cs

Complete source file; linked examples may select a region or line range.

```
using interpolated_string_handler.Version2;

internal static class Version_2
{
    public static void Example()
    {
        // Tests for V1:
        // Example that's not printed, but does lots of work to construct string.
        Console.WriteLine("=========          Original Logger output: Builder that replicates original behavior          ==========");

        // <UseInterpolatedHandler>
        var logger = new Logger() { EnabledLevel = LogLevel.Warning };
        var time = DateTime.Now;

        logger.LogMessage(LogLevel.Error, $"Error Level. CurrentTime: {time}. This is an error. It will be printed.");
        logger.LogMessage(LogLevel.Trace, $"Trace Level. CurrentTime: {time}. This won't be printed.");
        logger.LogMessage(LogLevel.Warning, "Warning Level. This warning is a string, not an interpolated string expression.");
        // </UseInterpolatedHandler>
    }
}

```
