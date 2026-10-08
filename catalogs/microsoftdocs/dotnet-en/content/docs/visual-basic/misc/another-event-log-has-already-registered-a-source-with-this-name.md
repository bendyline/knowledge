---
description: "Learn more about: Another event log has already registered a source with this name"
title: "Another event log has already registered a source with this name"
ms.date: 07/20/2015
ms.assetid: e6f5cd95-bb3f-4845-84fb-ae623a9bd44e
---
# Another event log has already registered a source with this name

An attempt was made to write an entry to an event log where the specified source is registered with another event log.

 You must set the [System.Diagnostics.EventLog.Source](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog.Source) property of your [System.Diagnostics.EventLog](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog) component instance before your component writes an entry to a log. When this happens, the system checks that the source you specified is registered with the event log to which the component is writing, and calls [System.Diagnostics.EventLog.CreateEventSource*](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog.CreateEventSource*) if needed.

## To correct this error

1. Remove the association of the source with the first log using the [System.Diagnostics.EventLog.DeleteEventSource*](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog.DeleteEventSource*) or the [System.Diagnostics.EventLog.DeleteEventSource*](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog.DeleteEventSource*) method.

2. Register the source with the new log.

## See also

- [My.Application.Log](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase.Log)
