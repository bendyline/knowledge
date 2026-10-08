---
title: Speech SDK logging - Speech service
titleSuffix: Foundry Tools
description: Learn about how to enable logging in the Speech SDK (C++, C#, Python, Objective-C, Java).
author: PatrickFarley
ms.author: pafarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 02/25/2026
zone_pivot_groups: programming-languages-set-two-objective-c
ms.custom: devx-track-csharp, devx-track-extended-java, devx-track-python
#Customer intent: As a developer, I want to learn how to enable logging in the Speech SDK so that I can get additional information and diagnostics from the Speech SDK's core components.
---

# Enable logging in the Speech SDK

Logging to file is an optional feature for the Speech SDK. During development, logging provides additional information and diagnostics from the Speech SDK's core components. Logging is handled by static classes in Speech SDK's native library. All instances in the same process write log entries to the same log file.

## Use the logging API

The recommended way to enable logging is to use the static logger classes available in Speech SDK version 1.43.0 and later. The logging API provides three types of loggers:

- **File logger**: Writes log messages directly to a file. This is the simplest logging solution and is suitable for diagnosing most on-device issues.
- **Memory logger**: Stores log messages in a fixed 2-MB ring buffer in memory. You can dump the buffer contents to a file or stream at any time. This is suitable for diagnosing issues that occur in a short period of time.
- **Event logger**: Sends log messages to an event handler that you provide. This is suitable when you need to integrate Speech SDK logs with your existing logging collection system.

These loggers are process-wide constructs. If you have multiple speech recognizer objects running in parallel, there's one shared log containing interleaved log lines from all recognizers. You can use the File logger, Memory logger, and Event logger simultaneously in the same process.

**Applies to: programming-language-csharp**



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



**Applies to: programming-language-cpp**



With Speech SDK version 1.43.0, the logging mechanism is extended with more types of loggers: `File logger`, `Memory logger` and `Event logger`. 

- `File logger` is the simplest logging solution and suitable for diagnosing most on-device issues when running Speech SDK.

- `Memory logger` is a logging solution that stores log messages in memory. It's suitable for diagnosing issues that occur in a short period of time. For example, if you're running a Speech Recognizer, you might want to dump the memory logger after getting an event indicating recognition was canceled due to some error. The size of the memory buffer is fixed at 2MB and can't be changed. This is a "ring" buffer, that is, new log strings written replace the oldest ones in the buffer.

- `Event logger` is a logging solution that sends log messages to the event handler which is provided by the developer. It's suitable for diagnosing issues when certain new log strings are as soon as available and need for further processing. For example, integrating Speech SDK logs with your existing logging collection system.

The file logger, memory logger, and event logger all have filter mechanism by only logging certain string messages. Also these loggers are process wide constructs. That means that if (for example) you have multiple speech recognizer objects running in parallel, there's one log file containing interleaved logs lines from all recognizers. You can't get a separate file logger for each recognizer. Similarly, there's one
memory buffer containing interleaved logs from all recognizers and you can only register one event handler as callback function to receive interleaved logs from all recognizers. You can't get a separate memory logger for each recognizer and you can't register an event handler for each recognizer. However, `File logger, memory logger and event logger` can coexist in the same process or in the same recognizer.

### Samples

```cpp
using namespace Microsoft::CognitiveServices::Speech;
using namespace Microsoft::CognitiveServices::Speech::Diagnostics::Logging;

void FileLoggerWithoutFilters()
{
    FileLogger::Start("LogfilePathAndName");

    // Other Speech SDK calls

    FileLogger::Stop();
}

void FileLoggerWithFilters()
{
    std::initializer_list<std::string> filters = { "YourFirstString", "YourSecondString" };
    FileLogger::SetFilters(filters);
    FileLogger::Start("LogfilePathAndName");

    // Other Speech SDK calls
    
    FileLogger::Stop();
    FileLogger::SetFilters();
}

void MemoryLoggerWithoutFilters()
{
    MemoryLogger::Start();

    // Other Speech SDK calls

    // At any time (whether logging is stopped) you can dump the traces in memory to a file
    MemoryLogger::Dump("LogfilePathAndName");

    // Or dump to any stream object that is derived from std::ostream. For example, std::cout
    MemoryLogger::Dump(std::cout);

    // Or dump to a vector of strings
    std::vector<std::string> messages = MemoryLogger::Dump();

    MemoryLogger::Stop();
}

void EventLoggerWithoutFilters()
{
    std::mutex mtx;
    std::vector<std::string> messages;

    // Register a callback that will get invoked by Speech SDK on every new log message
    EventLogger::SetCallback([&messages, &mtx](std::string message) {
        // Store the message for later processing. Better not processing it in the event thread
        std::unique_lock<std::mutex> lock(mtx);
        messages.push_back(message);
    });

    // Other Speech SDK calls

    // Stop logging by setting an empty callback
    EventLogger::SetCallback();
}
```



**Applies to: programming-language-java**



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


**Applies to: programming-language-objectivec**



With Speech SDK version 1.43.0, the logging mechanism is extended with more types of loggers: `File logger`, `Memory logger` and `Event logger`. 

- `File logger` is the simplest logging solution and suitable for diagnosing most on-device issues when running Speech SDK.

- `Memory logger` is a logging solution that stores log messages in memory. It's suitable for diagnosing issues that occur in a short period of time. For example, if you're running a Speech Recognizer, you might want to dump the memory logger after getting an event indicating recognition was canceled due to some error. The size of the memory buffer is fixed at 2MB and can't be changed. This is a "ring" buffer, that is, new log strings written replace the oldest ones in the buffer.

- `Event logger` is a logging solution that sends log messages to the event handler which is provided by the developer. It's suitable for diagnosing issues when certain new log strings are as soon as available and need for further processing. For example, integrating Speech SDK logs with your existing logging collection system.

The file logger, memory logger, and event logger all have filter mechanism by only logging certain string messages. Also these loggers are process wide constructs. That means that if (for example) you have multiple speech recognizer objects running in parallel, there's one log file containing interleaved logs lines from all recognizers. You can't get a separate file logger for each recognizer. Similarly, there's one
memory buffer containing interleaved logs from all recognizers and you can only register one event handler as callback function to receive interleaved logs from all recognizers. You can't get a separate memory logger for each recognizer and you can't register an event handler for each recognizer. However, `File logger, memory logger and event logger` can coexist in the same process or in the same recognizer.

### Samples

```Objective-C

- (void)fileLoggerWithoutFilters {
    NSString *logFileName = @"speech_sdk.log";
    NSString *logFile = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject]
                         stringByAppendingPathComponent:logFileName];
    [SPXFileLogger start:logFile];
    
    // Other Speech SDK calls

    [SPXFileLogger stop];
}

- (void)fileLoggerWithFilters {
    NSString *logFileName = @"speech_sdk.log";
    NSString *logFile = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject]
                         stringByAppendingPathComponent:logFileName];
    NSArray *filters = @[@"YourFirstString", @"YourSecondString"];
    [SPXFileLogger setFilters:filters];
    [SPXFileLogger start:logFile];
    
    // Other Speech SDK calls

    [SPXFileLogger stop];
    [SPXFileLogger setFilters:nil];
}

- (void)memoryLoggerWithoutFilters {
    NSString *logFileName = @"speech_sdk.log";
    NSString *logFile = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject]
                         stringByAppendingPathComponent:logFileName];

    [SPXMemoryLogger start];
    
    // Other Speech SDK calls

    // At any time (whether logging is stopped) you can dump the traces in memory to a file
    [SPXMemoryLogger dumpToFile:logFile];

    [SPXMemoryLogger stop];
}

- (void)eventLoggingWithoutFilters {
    __block NSMutableArray *eventMsgs = [NSMutableArray array];

    // Register a callback that will get invoked by Speech SDK on every new log message
    [SPXEventLogger setCallback:^(NSString *message) {
        @synchronized(self) {
            [eventMsgs addObject:message];
        }
    }];
    
    // Other Speech SDK calls

    // Stop event logging 
    [SPXEventLogger setCallback:nil];
}
```



**Applies to: programming-language-python**



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



### JavaScript

For JavaScript, logging is enabled via SDK diagnostics:

```javascript
sdk.Diagnostics.SetLoggingLevel(sdk.LogLevel.Debug);
sdk.Diagnostics.SetLogOutputPath("LogfilePathAndName");
```

## Log file locations by platform

When using `FileLogger.Start()` or `MemoryLogger.Dump()`, you need to provide a file path. The path requirements vary by platform.

For Windows or Linux, the log file can be in any path the user has write permission for. Write permissions to file system locations in other operating systems might be limited or restricted by default.

### Universal Windows Platform (UWP)

UWP applications need to place log files in one of the application data locations (local, roaming, or temporary). A log file can be created in the local application folder:

```csharp
StorageFolder storageFolder = ApplicationData.Current.LocalFolder;
StorageFile logFile = await storageFolder.CreateFileAsync("logfile.txt", CreationCollisionOption.ReplaceExisting);
FileLogger.Start(logFile.Path);
```

Within a Unity UWP application, a log file can be created using the application persistent data path folder as follows:

```csharp
#if ENABLE_WINMD_SUPPORT
    string logFile = Application.persistentDataPath + "/logFile.txt";
    FileLogger.Start(logFile);
#endif
```

For more about file access permissions in UWP applications, see [File access permissions](https://learn.microsoft.com/windows/uwp/files/file-access-permissions).

### Android

You can save a log file to either internal storage, external storage, or the cache directory. Files created in the internal storage or the cache directory are private to the application. It's preferable to create a log file in external storage.

```java
File dir = context.getExternalFilesDir(null);
File logFile = new File(dir, "logfile.txt");
FileLogger.start(logFile.getAbsolutePath());
```

The code saves a log file to the external storage in the root of an application-specific directory. A user can access the file with the file manager (usually in `Android/data/ApplicationName/logfile.txt`). The file is deleted when the application is uninstalled.

You also need to request `WRITE_EXTERNAL_STORAGE` permission in the manifest file:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="...">
  ...
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  ...
</manifest>
```

Within a Unity Android application, the log file can be created using the application persistent data path folder as follows:

```csharp
string logFile = Application.persistentDataPath + "/logFile.txt";
FileLogger.Start(logFile);
```

In addition, you need to set write permission in your Unity Player settings for Android to "External (SDCard)". The log is written to a directory that you can get by using a tool such as AndroidStudio Device File Explorer. The exact directory path can vary between Android devices. The location is typically the `sdcard/Android/data/your-app-packagename/files` directory.

For more information about data and file storage for Android applications, see [Data and file storage overview](https://developer.android.com/guide/topics/data/data-storage.html).

### iOS

Only directories inside the application sandbox are accessible. Files can be created in the documents, library, and temp directories. Files in the documents directory can be made available to a user.

If you're using Objective-C on iOS, use the following code snippet to create a log file in the application document directory:

```objc
NSString *filePath = [
  [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject]
    stringByAppendingPathComponent:@"logfile.txt"];
[SPXFileLogger start:filePath];
```

To access a created file, add the following properties to the `Info.plist` property list of the application:

```xml
<key>UIFileSharingEnabled</key>
<true/>
<key>LSSupportsOpeningDocumentsInPlace</key>
<true/>
```

If you're using Swift on iOS, use the following code snippet to enable logs:

```swift
let documentsDirectoryPathString = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first!
let documentsDirectoryPath = NSURL(string: documentsDirectoryPathString)!
let logFilePath = documentsDirectoryPath.appendingPathComponent("swift.log")
SPXFileLogger.start(logFilePath!.absoluteString)
```

For more information about iOS file systems, see [File System Programming Guide](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html).

## Legacy approach: set property on configuration object

You can also enable logging by setting the `Speech_LogFilename` property on a speech configuration object. This approach is less flexible than using the static logger classes.

Taking the `SpeechConfig` as an example and assuming that you created an instance called `speechConfig`:

```csharp
speechConfig.SetProperty(PropertyId.Speech_LogFilename, "LogfilePathAndName");
```

```java
speechConfig.setProperty(PropertyId.Speech_LogFilename, "LogfilePathAndName");
```

```C++
speechConfig->SetProperty(PropertyId::Speech_LogFilename, "LogfilePathAndName");
```

```Python
speech_config.set_property(speechsdk.PropertyId.Speech_LogFilename, "LogfilePathAndName")
```

```objc
[speechConfig setPropertyTo:@"LogfilePathAndName" byId:SPXSpeechLogFilename];
```

```go
import ("github.com/Microsoft/cognitive-services-speech-sdk-go/common")

speechConfig.SetProperty(common.SpeechLogFilename, "LogfilePathAndName")
```

You can create a recognizer from the configuration object. This enables logging for all recognizers.

> **Note:**
> If you create a `SpeechSynthesizer` from the configuration object, it doesn't enable logging. If logging is enabled though, you also receive diagnostics from the `SpeechSynthesizer`.

For platform-specific file path guidance, see [Log file locations by platform](#log-file-locations-by-platform). The same path requirements apply when using the property approach.

### Logging with multiple recognizers

When using the legacy property approach, a log file output path is specified as a configuration property into a `SpeechRecognizer` or other SDK object. However, SDK logging is a singleton, process-wide facility with no concept of individual instances. You can think of this as the `SpeechRecognizer` constructor (or similar) implicitly calling a static and internal "Configure Global Logging" routine with the property data available in the corresponding `SpeechConfig`.

This means that you can't, as an example, configure six parallel recognizers to output simultaneously to six separate files. Instead, the latest recognizer created will configure the global logging instance to output to the file specified in its configuration properties and all SDK logging is emitted to that file.

This also means that the lifetime of the object that configured logging isn't tied to the duration of logging. Logging won't stop in response to the release of an SDK object and will continue as long as no new logging configuration is provided. Once started, process-wide logging can be stopped by setting the log file path to an empty string when creating a new object.

To reduce potential confusion when configuring logging for multiple instances, it might be useful to abstract control of logging from objects doing real work. An example pair of helper routines:

```cpp
void EnableSpeechSdkLogging(const char* relativePath)
{
	auto configForLogging = SpeechConfig::FromSubscription("unused_key", "unused_region");
	configForLogging->SetProperty(PropertyId::Speech_LogFilename, relativePath);
	auto emptyAudioConfig = AudioConfig::FromStreamInput(AudioInputStream::CreatePushStream());
	auto temporaryRecognizer = SpeechRecognizer::FromConfig(configForLogging, emptyAudioConfig);
}

void DisableSpeechSdkLogging()
{
	EnableSpeechSdkLogging("");
}
```

## Next steps

> 
> [Explore our samples on GitHub](https://aka.ms/csspeech/samples)
