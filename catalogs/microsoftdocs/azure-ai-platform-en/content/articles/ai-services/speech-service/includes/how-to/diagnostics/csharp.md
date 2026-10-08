---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 03/18/2025
ms.author: pafarley
ms.custom: devx-track-csharp
---


With Speech SDK version 1.43.0, the logging mechanism is extended with more types of loggers: `File logger`, `Memory logger` and `Event logger`. 

- `File logger` is the simplest logging solution and suitable for diagnosing most on-device issues when running Speech SDK.

- `Memory logger` is a logging solution that stores log messages in memory. It's suitable for diagnosing issues that occur in a short period of time. For example, if you're running a Speech Recognizer, you might want to dump the memory logger after getting an event indicating recognition was canceled due to some error. The size of the memory buffer is fixed at 2MB and can't be changed. This is a "ring" buffer, that is, new log strings written replace the oldest ones in the buffer.

- `Event logger` is a logging solution that sends log messages to the event handler which is provided by the developer. It's suitable for diagnosing issues when certain new log strings are as soon as available and need for further processing. For example, integrating Speech SDK logs with your existing logging collection system.

The file logger, memory logger, and event logger all have filter mechanism by only logging certain string messages. Also these loggers are process wide constructs. That means that if (for example) you have multiple speech recognizer objects running in parallel, there's one log file containing interleaved logs lines from all recognizers. You can't get a separate file logger for each recognizer. Similarly, there's one
memory buffer containing interleaved logs from all recognizers and you can only register one event handler as callback function to receive interleaved logs from all recognizers. You can't get a separate memory logger for each recognizer and you can't register an event handler for each recognizer. However, `File logger, memory logger and event logger` can coexist in the same process or in the same recognizer.

### Samples

```csharp
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Diagnostics.Logging;

class Program 
{
    public static void FileLoggerWithoutFilters()
    {
        FileLogger.Start("LogfilePathAndName");

        // Other Speech SDK calls

        FileLogger.Stop();
    }

    public static void FileLoggerWithFilters()
    {
        string[] filters = { "YourFirstString", "YourSecondString" };
        FileLogger.SetFilters(filters);
        FileLogger.Start("LogfilePathAndName");

        // Other Speech SDK calls
        
        FileLogger.Stop();
        FileLogger.SetFilters();
    }

    public static void MemoryLoggerWithoutFilters()
    {
        MemoryLogger.Start();

        // Other Speech SDK calls

        // At any time (whether logging is stopped) you can dump the traces in memory to a file
        MemoryLogger.Dump("LogfilePathAndName");

        // Or dump to any object that is derived from System.IO.TextWriter. For example, System.Console.Out
        MemoryLogger.Dump(System.Console.Out);

        // Or dump to a vector of strings
        List<string> messages = MemoryLogger.Dump().ToList<string>();

        MemoryLogger.Stop();
    }

    // These variables and method are used by the EvenLogger sample below.
    private static readonly object lockObject = new object();
    private static List<string> eventMessages = new List<string>();
    private static void OnMessageEvent(object sender, string message)
    {
        lock (lockObject)
        {
            // Store the message for later processing. Better not processing it in the event thread
            eventMessages.Add(message);
        }
    }

    public static void EventLoggerWithoutFilters()
    {
        // Subscribe an event that will get invoked by Speech SDK on every new log message
        EventLogger.OnMessage += OnMessageEvent;

        // Other Speech SDK calls

        // Unsubscribe to stop getting events
        EventLogger.OnMessage -= OnMessageEvent;
    }
}
```
