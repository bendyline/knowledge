# Source code: samples/snippets/csharp/delegates-and-events/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace DelegatesAndEvents
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // <SnippetConnectDelegate>
            Logger.WriteMessage += LoggingMethods.LogToConsole;
            // </SnippetConnectDelegate>
            // <SnippetFileLogger>
            var file = new FileLogger("log.txt");
            // </SnippetFileLogger>

            Logger.LogMessage(Severity.Warning, "Console", "This is a warning message");

            Logger.LogMessage(Severity.Information, "Console", "Information message one");
            Logger.LogLevel = Severity.Information;

            Logger.LogMessage(Severity.Information, "Console", "Information message two");
        }
    }
}

```
