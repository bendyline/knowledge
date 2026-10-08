---
description: "Learn more about: Unable to obtain a stream for the log"
title: "Unable to obtain a stream for the log"
ms.date: 07/20/2015
f1_keywords:
  - "vbrApplicationLog_ExhaustedPossibleStreamNames"
ms.assetid: 33994f52-8efb-4790-a459-033e5c1db632
---
# Unable to obtain a stream for the log

Unable to obtain a stream for the log. Potential file names based on \<name> are already in use.

 The [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener) class could not create a new log file because all potential log file names based on \<name> are already in use.

 Having too many log files may indicate an architectural problem with the application. See the documentation for the [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener) class for more information.

## To correct this error

1. Set the [Microsoft.VisualBasic.Logging.FileLogTraceListener.LogFileCreationSchedule](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.LogFileCreationSchedule) property to [Microsoft.VisualBasic.Logging.LogFileCreationScheduleOption.Daily](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.LogFileCreationScheduleOption.Daily) or [Microsoft.VisualBasic.Logging.LogFileCreationScheduleOption.Weekly](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.LogFileCreationScheduleOption.Weekly) to include a date-stamp in the log file name.

2. Archive the existing logs and remove them from the computer to allow the [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener) object to create new logs.

## See also

- [Microsoft.VisualBasic.Logging.FileLogTraceListener](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener)
- [Microsoft.VisualBasic.Logging.FileLogTraceListener.LogFileCreationSchedule*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.FileLogTraceListener.LogFileCreationSchedule*)
- [My.Application.Log](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase.Log)
- [My.Application.Info.DirectoryPath](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase.Log)
