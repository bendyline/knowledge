---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 03/18/2025
ms.author: pafarley
---


With Speech SDK version 1.43.0, the logging mechanism is extended with more types of loggers: `File logger`, `Memory logger` and `Event logger`. 

- `File logger` is the simplest logging solution and suitable for diagnosing most on-device issues when running Speech SDK.

- `Memory logger` is a logging solution that stores log messages in memory. It's suitable for diagnosing issues that occur in a short period of time. For example, if you're running a Speech Recognizer, you might want to dump the memory logger after getting an event indicating recognition was canceled due to some error. The size of the memory buffer is fixed at 2MB and can't be changed. This is a "ring" buffer, that is, new log strings written replace the oldest ones in the buffer.

- `Event logger` is a logging solution that sends log messages to the event handler which is provided by the developer. It's suitable for diagnosing issues when certain new log strings are as soon as available and need for further processing. For example, integrating Speech SDK logs with your existing logging collection system.

The file logger, memory logger, and event logger all have filter mechanism by only logging certain string messages. Also these loggers are process wide constructs. That means that if (for example) you have multiple speech recognizer objects running in parallel, there's one log file containing interleaved logs lines from all recognizers. You can't get a separate file logger for each recognizer. Similarly, there's one
memory buffer containing interleaved logs from all recognizers and you can only register one event handler as callback function to receive interleaved logs from all recognizers. You can't get a separate memory logger for each recognizer and you can't register an event handler for each recognizer. However, `File logger, memory logger and event logger` can coexist in the same process or in the same recognizer.

### Samples

```Python
import azure.cognitiveservices.speech as speechsdk
import azure.cognitiveservices.speech.diagnostics.logging as speechsdk_logging


def file_logger_without_filters():
    speechsdk_logging.FileLogger.start("LogfilePathAndName")
    # Other Speech SDK calls
    speechsdk_logging.FileLogger.stop()


def file_logger_with_filters():
    filters = { "YourFirstString", "YourSecondString" }
    speechsdk_logging.FileLogger.set_filters(filters)
    speechsdk_logging.FileLogger.start("LogfilePathAndName")
    # Other Speech SDK calls
    speechsdk_logging.FileLogger.stop()
    speechsdk_logging.FileLogger.set_filters()


def memory_logger_without_filter():
    speechsdk_logging.MemoryLogger.start()
    #
    # Other Speech SDK calls
    #
    # At any time (whether logging is stopped) you can dump the traces in memory to a file
    speechsdk_logging.MemoryLogger.dump("LogfilePathAndName")
    # Or dump to any object that is derived from IOBase. For example, sys.stdout
    speechsdk_logging.MemoryLogger.dump_to_stream(sys.stdout)
    # Or dump to a list of strings
    messages = speechsdk_logging.MemoryLogger.dump_to_list()
    speechsdk_logging.MemoryLogger.stop()


def event_logger_without_filter():
    messages = []
    lock = threading.Lock()
    # Register a callback that will get invoked by Speech SDK on every new log message
    def on_log(msg):
        with lock:
            # Store the message for later processing. Better not processing it in the event thread
            messages.append(msg)
    speechsdk_logging.EventLogger.set_callback(on_log)
    #
    # Other Speech SDK calls
    #
    # Stop logging by setting an empty callback
    speechsdk_logging.EventLogger.set_callback()
```
