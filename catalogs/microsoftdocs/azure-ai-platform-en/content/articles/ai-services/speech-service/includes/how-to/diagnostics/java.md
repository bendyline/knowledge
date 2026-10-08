---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 03/18/2025
ms.author: pafarley
ms.custom: devx-track-java
---


With Speech SDK version 1.43.0, the logging mechanism is extended with more types of loggers: `File logger`, `Memory logger` and `Event logger`. 

- `File logger` is the simplest logging solution and suitable for diagnosing most on-device issues when running Speech SDK.

- `Memory logger` is a logging solution that stores log messages in memory. It's suitable for diagnosing issues that occur in a short period of time. For example, if you're running a Speech Recognizer, you might want to dump the memory logger after getting an event indicating recognition was canceled due to some error. The size of the memory buffer is fixed at 2MB and can't be changed. This is a "ring" buffer, that is, new log strings written replace the oldest ones in the buffer.

- `Event logger` is a logging solution that sends log messages to the event handler which is provided by the developer. It's suitable for diagnosing issues when certain new log strings are as soon as available and need for further processing. For example, integrating Speech SDK logs with your existing logging collection system.

The file logger, memory logger, and event logger all have filter mechanism by only logging certain string messages. Also these loggers are process wide constructs. That means that if (for example) you have multiple speech recognizer objects running in parallel, there's one log file containing interleaved logs lines from all recognizers. You can't get a separate file logger for each recognizer. Similarly, there's one
memory buffer containing interleaved logs from all recognizers and you can only register one event handler as callback function to receive interleaved logs from all recognizers. You can't get a separate memory logger for each recognizer and you can't register an event handler for each recognizer. However, `File logger, memory logger and event logger` can coexist in the same process or in the same recognizer.

### Samples

```java
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.diagnostics.logging.EventLogger;
import com.microsoft.cognitiveservices.speech.diagnostics.logging.FileLogger;
import com.microsoft.cognitiveservices.speech.diagnostics.logging.MemoryLogger;

public class SpeechLoggingSamples {
    public static void fileLoggerWithoutFilters()
    {
        FileLogger.start("LogfilePathAndName");

        // Other Speech SDK calls

        FileLogger.stop();
    }

    public static void FileLoggerWithFilters()
    {
        String[] filters = { "YourFirstString", "YourSecondString" };
        FileLogger.setFilters(filters);
        FileLogger.start("LogfilePathAndName");

        // Other Speech SDK calls
        
        FileLogger.stop();
        FileLogger.setFilters();
    }

    public static void memoryLoggerWithoutFilters()
    {
        MemoryLogger.start();

        // Other Speech SDK calls

        // At any time (whether logging is stopped) you can dump the traces in memory to a file
        MemoryLogger.dump("LogfilePathAndName");

        // Or dump to any object that is derived from java.io.Writer. For example, System.out
        MemoryLogger.dump(System.out);

        // Or dump to a list of strings
        List<String> messages = MemoryLogger.dump();

        MemoryLogger.stop();
    }

    public static void eventLoggerWithoutFilters()
    {
        final Object lockObject = new Object();
        List<String> messages = new ArrayList<>();

        // Register a callback that will get invoked by Speech SDK on every new log message
        EventLogger.setCallback((message) -> {
            // Store the message for later processing. Better not processing it in the event thread
            synchronized (lockObject) {
                messages.add(message);
            }
        });

        // Other Speech SDK calls

        // Stop logging by setting an empty callback
        EventLogger.setCallback();
    }
}
```
