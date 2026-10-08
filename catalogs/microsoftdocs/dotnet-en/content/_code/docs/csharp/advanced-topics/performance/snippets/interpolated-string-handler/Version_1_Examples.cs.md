# Source code: docs/csharp/advanced-topics/performance/snippets/interpolated-string-handler/Version_1_Examples.cs

Complete source file; linked examples may select a region or line range.

```
using interpolated_string_handler.Version1;

internal static class Version_1
{
    public static void Example()
    {
        // Tests for V1:
        Console.WriteLine("=========          Original Logger output: No builder          ==========");

        var logger = new Logger() { EnabledLevel = LogLevel.Warning};
        var time = DateTime.Now;

        logger.LogMessage(LogLevel.Error, $"Error Level. CurrentTime: {time}. This is an error. It will be printed.");
        logger.LogMessage(LogLevel.Trace, $"Trace Level. CurrentTime: {time}. This won't be printed.");
    }
}

```
