---
title: "Identify the execution state"
description: Learn to use Reporting Services to identify the execution state so that you can interact with the report in several ways.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server-web-service
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "session states [Reporting Services]"
  - "lifetimes [Reporting Services]"
  - "sessions [Reporting Services]"
  - "SessionHeader SOAP header"
---
# Identify the execution state
  Hypertext Transfer Protocol (HTTP) is a connectionless and stateless protocol. Being connectionless and stateless means that it doesn't automatically indicate whether different requests come from the same client or even whether a single browser instance is still actively viewing a page or site. Sessions create a logical connection to maintain state between server and client over HTTP. The user-specific information relevant to a particular session is known as the session state.  
  
 Session management involves correlating an HTTP request with other previous requests generated from the same session. Without session management, these requests appear unrelated to the Report Server Web service because of the connectionless and stateless nature of the HTTP protocol.  
  
  Reporting Services 
 doesn't expose a holistic concept of session state such as that exposed by  ASP.NET 
. However, when executing reports, the report server maintains state between method calls in the form of an **execution**. An execution allows the user to interact with the report in several ways - including loading the report from the report server, setting credentials and parameters for the report, and rendering the report.  
  
 While they're communicating to a report server, clients use the execution to manage report viewing and user navigation to other pages in a report, and to show or hide sections of a report. A unique execution exists for each report the client application is running.  
  
 In general, the lifetime of an execution starts when a user navigates to a browser or client application and selects a report to view. The execution is discarded after a short time-out period after the last request to the execution is received (the default time out is 20 minutes).  
  
 From a Web service perspective, the lifetime starts when the Report Server Web service [ReportExecution2005.ReportExecutionService.LoadReport%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.LoadReport%252A), [ReportExecution2005.ReportExecutionService.LoadReportDefinition%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.LoadReportDefinition%252A), or [ReportExecution2005.ReportExecutionService.Render%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.Render%252A) methods are called. The application can use other methods to manipulate the active execution (for example, setting parameters and setting data sources). The execution is discarded after a short time-out period after the last request to the execution is received (the default time out is 20 minutes).  
  
 An application keeps track of multiple active executions between calls to the Web service [ReportExecution2005.ReportExecutionService.Render%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.Render%252A) and [ReportExecution2005.ReportExecutionService.RenderStream%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.RenderStream%252A) methods by saving the [ReportExecution2005.ExecutionHeader.ExecutionID%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ExecutionHeader.ExecutionID%252A). The Execution ID is returned in the SOAP header from the [ReportExecution2005.ReportExecutionService.LoadReport%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.LoadReport%252A) and [ReportExecution2005.ReportExecutionService.LoadReportDefinition%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.LoadReportDefinition%252A) methods.  
  
 The following diagram shows the processing and rendering path for reports.  
  
Diagram that shows the processing and rendering path for reports.
  
 To support the functions described earlier, the current SOAP Render method is split into multiple methods encompassing execution initialization, processing, and rendering phases.  
  
 To programmatically render a report, you must:  
  
-   Load the report or the report definition using [ReportExecution2005.ReportExecutionService.LoadReport%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.LoadReport%252A) or [ReportExecution2005.ReportExecutionService.LoadReportDefinition%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.LoadReportDefinition%252A).  
  
-   Check to see if the report needs credentials or parameters by checking the values of the [ReportExecution2005.ExecutionInfo.CredentialsRequired%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ExecutionInfo.CredentialsRequired%252A) and [ReportExecution2005.ExecutionInfo.ParametersRequired%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ExecutionInfo.ParametersRequired%252A) properties of the [ReportExecution2005.ExecutionInfo](https://learn.microsoft.com/search/?terms=ReportExecution2005.ExecutionInfo) object returned by [ReportExecution2005.ReportExecutionService.LoadReport%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.LoadReport%252A) or [ReportExecution2005.ReportExecutionService.LoadReportDefinition%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.LoadReportDefinition%252A)  
  
-   If necessary, set the credentials and/or parameters using the [ReportExecution2005.ReportExecutionService.SetExecutionCredentials%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.SetExecutionCredentials%252A) and [ReportExecution2005.ReportExecutionService.SetExecutionParameters%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.SetExecutionParameters%252A) methods.  
  
-   Call the [ReportExecution2005.ReportExecutionService.Render%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.Render%252A) method to render the report.  
  
 While a report is in session, the underlying report stored in the report server database can change. For example, the report definition can change, the report can be deleted or moved, and user permissions can change. If the report is in an active session, then changes to the underlying report (that is, the report stored in the report server database) don't affect it.  
  
 You can also manage a report session using URL access commands.  
  
## Related content

- [Technical reference (SSRS)](../technical-reference-ssrs.md)
- [Use Reporting Services SOAP headers](using-reporting-services-soap-headers.md)
