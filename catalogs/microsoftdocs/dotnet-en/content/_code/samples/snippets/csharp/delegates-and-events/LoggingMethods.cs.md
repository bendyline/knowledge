# Source code: samples/snippets/csharp/delegates-and-events/LoggingMethods.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace DelegatesAndEvents
{
    // <SnippetLogToConsole>
    public static class LoggingMethods
    {
        public static void LogToConsole(string message)
        {
            Console.Error.WriteLine(message);
        }
    }
    // </SnippetLogToConsole>
}

```
