---
title: "Raising Events in the Script Task"
description: "Raising Events in the Script Task"
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "events [Integration Services], scripts"
  - "warnings [Integration Services]"
  - "SSIS events, scripts"
  - "errors [Integration Services], events"
  - "SSIS Script task, events"
  - "Events property"
  - "Script task [Integration Services], events"
dev_langs:
  - "VB"
---
# Raising Events in the Script Task


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Events provide a way to report errors, warnings, and other information, such as task progress or status, to the containing package. The package provides event handlers for managing event notifications. The Script task can raise events by calling methods on the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Events%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Events%252A) property of the **Dts** object. For more information about how  Integration Services 
 packages handle events, see [Integration Services (SSIS) Event Handlers](../../integration-services-ssis-event-handlers.md).  
  
 Events can be logged to any log provider that is enabled in the package. Log providers store information about events in a data store. The Script task can also use the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Log%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Log%252A) method to log information to a log provider without raising an event. For more information about how to use the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Log%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Log%252A) method, see [Logging in the Script Task](logging-in-the-script-task.md).  
  
 To raise an event, the Script task calls one of the methods exposed by the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Events%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Events%252A) property. The following table lists the methods exposed by the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Events%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Events%252A) property.  
  
| Event | Description |
| --- | --- |
| [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireCustomEvent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireCustomEvent%252A) | Raises a user-defined custom event in the package. |
| [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireError%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireError%252A) | Informs the package of an error condition. |
| [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireInformation%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireInformation%252A) | Provides information to the user. |
| [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireProgress%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireProgress%252A) | Informs the package of the progress of the task. |
| [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireQueryCancel%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireQueryCancel%252A) | Returns a value that indicates whether the package needs the task to shut down prematurely. |
| [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireWarning%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireWarning%252A) | Informs the package that the task is in a state that warrants user notification, but is not an error condition. |
  
## Events Example  
 The following example demonstrates how to raise events from within the Script task. The example uses a native Windows API function to determine whether an Internet connection is available. If no connection is available, it raises an error. If a potentially volatile modem connection is in use, the example raises a warning. Otherwise, it returns an informational message that an Internet connection has been detected.  
  
```vb  
Private Declare Function InternetGetConnectedState Lib "wininet" _  
    (ByRef dwFlags As Long, ByVal dwReserved As Long) As Long  
  
Private Enum ConnectedStates  
    LAN = &H2  
    Modem = &H1  
    Proxy = &H4  
    Offline = &H20  
    Configured = &H40  
    RasInstalled = &H10  
End Enum  
  
Public Sub Main()  
  
    Dim dwFlags As Long  
    Dim connectedState As Long  
    Dim fireAgain as Boolean  
  
    connectedState = InternetGetConnectedState(dwFlags, 0)  
  
    If connectedState <> 0 Then  
        If (dwFlags And ConnectedStates.Modem) = ConnectedStates.Modem Then  
            Dts.Events.FireWarning(0, "Script Task Example", _  
                "Volatile Internet connection detected.", String.Empty, 0)  
        Else  
            Dts.Events.FireInformation(0, "Script Task Example", _  
                "Internet connection detected.", String.Empty, 0, fireAgain)  
        End If  
    Else  
        ' If not connected to the Internet, raise an error.  
        Dts.Events.FireError(0, "Script Task Example", _  
            "Internet connection not available.", String.Empty, 0)  
    End If  
  
    Dts.TaskResult = ScriptResults.Success  
  
End Sub  
```  
  
```csharp  
using System;  
using System.Data;  
using Microsoft.SqlServer.Dts.Runtime;  
using System.Windows.Forms;  
using System.Runtime.InteropServices;  
  
public class ScriptMain  
{  
  
[DllImport("wininet")]  
        private extern static long InternetGetConnectedState(ref long dwFlags, long dwReserved);  
  
        private enum ConnectedStates  
        {  
            LAN = 0x2,  
            Modem = 0x1,  
            Proxy = 0x4,  
            Offline = 0x20,  
            Configured = 0x40,  
            RasInstalled = 0x10  
        };  
  
        public void Main()  
        {  
            //  
            long dwFlags = 0;  
            long connectedState;  
            bool fireAgain = true;  
            int state;  
  
            connectedState = InternetGetConnectedState(ref dwFlags, 0);  
            state = (int)ConnectedStates.Modem;  
            if (connectedState != 0)  
            {  
                if ((dwFlags & state) == state)  
                {  
                    Dts.Events.FireWarning(0, "Script Task Example", "Volatile Internet connection detected.", String.Empty, 0);  
                }  
                else  
                {  
                    Dts.Events.FireInformation(0, "Script Task Example", "Internet connection detected.", String.Empty, 0, ref fireAgain);  
                }  
            }  
            else  
            {  
                // If not connected to the Internet, raise an error.  
                Dts.Events.FireError(0, "Script Task Example", "Internet connection not available.", String.Empty, 0);  
            }  
  
            Dts.TaskResult = (int)ScriptResults.Success;  
  
        }  
  
```  
  
## Related content

- [Integration Services (SSIS) Event Handlers](../../integration-services-ssis-event-handlers.md)
