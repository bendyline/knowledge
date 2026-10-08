---
description: "Learn more about: Troubleshooting: Log Listeners (Visual Basic)"
title: "Troubleshooting: Log Listeners"
ms.date: 07/20/2015
helpviewer_keywords:
  - "event logs, troubleshooting"
  - "troubleshooting Visual Basic, event logs"
  - "troubleshooting event logs"
ms.assetid: ac6eb760-3d5d-461e-aedd-40599ee22e49
---
# Troubleshooting: Log Listeners (Visual Basic)

You can use the `My.Application.Log` and `My.Log` objects to log information about events that occur in your application.

 To determine which log listeners receive those messages, see [Walkthrough: Determining Where My.Application.Log Writes Information](walkthrough-determining-where-my-application-log-writes-information.md).

 The `Log` object can use log filtering to limit the amount of information that it logs. If the filters are misconfigured, the logs might contain the wrong information. For more information about filtering, see [Walkthrough: Filtering My.Application.Log Output](walkthrough-filtering-my-application-log-output.md).

 However, if a log is configured incorrectly, you may need more information about its current configuration. You can get to this information through the log's advanced `TraceSource` property.

### To determine the log listeners for the Log object in code

1. Import the [System.Diagnostics](https://learn.microsoft.com/search/?terms=System.Diagnostics) namespace at the beginning of the code file. For more information, see [Imports Statement (.NET Namespace and Type)](../../../language-reference/statements/imports-statement-net-namespace-and-type.md).

     [VbVbalrMyApplicationLog#13 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyApplicationLog/VB/Form1.vb#13)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyApplicationLog/VB/Form1.vb.md)

2. Create a function that returns a string consisting of information for each of the log's listeners.

     [VbVbalrMyApplicationLog#14 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyApplicationLog/VB/Form1.vb#14)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyApplicationLog/VB/Form1.vb.md)

3. Pass the collection of the log's trace listeners to the `GetListeners` function, and display the return value.

     [VbVbalrMyApplicationLog#19 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyApplicationLog/VB/Form1.vb#19)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyApplicationLog/VB/Form1.vb.md)

     For more information, see [Microsoft.VisualBasic.Logging.Log.TraceSource*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.Log.TraceSource*).

## See also

- [Microsoft.VisualBasic.Logging.Log](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.Log)
- [Working with Application Logs](working-with-application-logs.md)
- [Walkthrough: Determining Where My.Application.Log Writes Information](walkthrough-determining-where-my-application-log-writes-information.md)
