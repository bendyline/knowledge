---
description: "Learn more about: Unable to write to log file because writing to it would cause it to exceed MaximumSize value"
title: "Unable to write to log file because writing to it would cause it to exceed MaximumSize value"
ms.date: 07/20/2015
f1_keywords:
  - "vbrApplicationLog_FileExceedsMaximumSize"
ms.assetid: 61747a9c-e460-424b-a365-73cdba9dd428
---
# Unable to write to log file because writing to it would cause it to exceed MaximumSize value

The [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener) class could not write to the log file because:

- The log file size (in bytes) is greater than the value of the [Microsoft.VisualBasic.Logging.FileLogTraceListener.MaxFileSize](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.MaxFileSize) property

     —and—

- The value of the [Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior) property was [Microsoft.VisualBasic.Logging.DiskSpaceExhaustedOption.ThrowException](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.DiskSpaceExhaustedOption.ThrowException).

## To correct this error

1. Archive the existing logs and remove them from the computer to allow the [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener) object to create new logs.

2. Change the value of the [Microsoft.VisualBasic.Logging.FileLogTraceListener.MaxFileSize](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.MaxFileSize) property to allow for larger logs.

3. Set the [Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior) property to [Microsoft.VisualBasic.Logging.DiskSpaceExhaustedOption.DiscardMessages](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.DiskSpaceExhaustedOption.DiscardMessages) to discard messages without warning if the log is too large.

## See also

- [Microsoft.VisualBasic.Logging.FileLogTraceListener.MaxFileSize*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.MaxFileSize*)
- [Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior*)
- [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener)
- [My.Application.Log](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase.Log)
- [My.Application.Info.DirectoryPath](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase.Log)
