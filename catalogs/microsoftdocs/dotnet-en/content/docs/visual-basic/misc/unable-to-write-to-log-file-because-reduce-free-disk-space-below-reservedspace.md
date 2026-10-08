---
description: "Learn more about: Unable to write to log file because writing to it would reduce free disk space below ReservedSpace value"
title: "Unable to write to log file because writing to it would reduce free disk space below ReservedSpace value"
ms.date: 07/20/2015
f1_keywords:
  - "vbrApplicationLog_ReservedSpaceEncroached"
ms.assetid: 95832e70-4ecc-47aa-90c1-f35c4d468151
---
# Unable to write to log file because writing to it would reduce free disk space below ReservedSpace value

The [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener) class could not write to the log file because:

- The amount of free disk space (in bytes) is less than the value of the [Microsoft.VisualBasic.Logging.FileLogTraceListener.ReserveDiskSpace](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.ReserveDiskSpace) property

     —and—

- The value of the [Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior) property was [Microsoft.VisualBasic.Logging.DiskSpaceExhaustedOption.ThrowException](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.DiskSpaceExhaustedOption.ThrowException).

## To correct this error

1. Archive the existing logs and remove them from the computer to allow the [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener) object to create new logs.

2. Change the value of the [Microsoft.VisualBasic.Logging.FileLogTraceListener.ReserveDiskSpace](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.ReserveDiskSpace) property to a smaller number to reserve less disk space.

3. Set the [Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior) property to [Microsoft.VisualBasic.Logging.DiskSpaceExhaustedOption.DiscardMessages](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.DiskSpaceExhaustedOption.DiscardMessages) to discard messages without warning if there is not enough free disk space.

## See also

- [Microsoft.VisualBasic.Logging.FileLogTraceListener.ReserveDiskSpace*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.ReserveDiskSpace*)
- [Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.DiskSpaceExhaustedBehavior*)
- [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener)
- [My.Application.Log](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase.Log)
- [My.Application.Info.DirectoryPath](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase.Log)
