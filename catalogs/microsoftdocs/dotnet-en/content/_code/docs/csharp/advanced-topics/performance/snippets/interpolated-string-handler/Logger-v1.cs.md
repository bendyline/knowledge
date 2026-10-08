# Source code: docs/csharp/advanced-topics/performance/snippets/interpolated-string-handler/Logger-v1.cs

Complete source file; linked examples may select a region or line range.

```
namespace interpolated_string_handler.Version1
{
    // <InitialLogger>
    public enum LogLevel
    {
        Off,
        Critical,
        Error,
        Warning,
        Information,
        Trace
    }

    public class Logger
    {
        public LogLevel EnabledLevel { get; init; } = LogLevel.Error;

        public void LogMessage(LogLevel level, string msg)
        {
            if (EnabledLevel < level) return;
            Console.WriteLine(msg);
        }
    }
    // </InitialLogger>
}

```
