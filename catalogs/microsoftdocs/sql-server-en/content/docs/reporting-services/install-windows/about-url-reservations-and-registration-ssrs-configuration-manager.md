---
title: "URL reservations & registration (Report Server Configuration Manager)"
description: "URLs for Reporting Services applications are defined as URL reservations in HTTP.SYS."
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "URL reservations"
  - "URL registration"
  - "Report Server service, URL reservations"
---
# About URL reservations and registration (Report Server Configuration Manager)
  URLs for Reporting Services applications are defined as URL reservations in HTTP.SYS. A URL reservation defines the syntax of a URL endpoint to a Web application. URL reservations are defined for both the Report Server Web service and the web portal when you configure the applications on the report server. URL reservations are created for you automatically when configure URLs through Setup or the  Reporting Services 
 Configuration tool:  
  
-   Setup creates URL reservations using default values. If Setup installs the default configuration, it reserves two URLs; one for the Report Server Web service, and another for the web portal. You can use the  Reporting Services 
 Configuration tool to add more URLs or modify the default URLs that Setup creates.  
  
-   The  Reporting Services 
 Configuration tool creates a URL reservation based on the URL you specify in the **Web Service URL** or **Web Portal URL** pages in the tool.  
  
 Both Setup and the tool also assign permissions on the URL to the Report Server service, check for duplicate instances, and add the URL reservation to HTTP.SYS. Never create or modify a Reporting Services URL reservation directly using HttpCfg.exe or other tool. If you skip a step or set an invalid value, you encounter problems that might be difficult to diagnose or fix.  
  
> **Note:**  
> HTTP.SYS is an operating system component that listens for network requests and routes them to a request queue. In this release of  Reporting Services 
, HTTP.SYS establishes and maintains the request queue for the Report Server Web service and the web portal. Internet Information Services (IIS) is no longer used to host or access  Reporting Services 
 applications. For more information about HTTP.SYS functionality, see [HTTP Server API](https://learn.microsoft.com/windows/win32/http/http-api-start-page).  
  
##  <a name="ReportingServicesURLs"></a> URLs in Reporting Services  
 In a  Reporting Services 
 installation, you can access the following tools, applications, and items through URLs:  
  
-   Report Server Web service  
  
-   Web portal  
  
-   Reports published to a report server  
  
 Other published URL-addressable items, such as shared data sources, shouldn't be accessed through URLs as stand-alone items. The report server doesn't display those items in a meaningful format when viewed in a browser window.  
  
> **Note:**  
> This article does not describe URL access to specific reports that are stored on the report server. For more information about URL access to these items, see [Access report server items by using URL access](../access-report-server-items-using-url-access.md).  
  
##  <a name="URLreservation"></a> URL reservation and registration  
 A URL reservation defines the URLs that can be used to access a  Reporting Services 
 application.  Reporting Services 
 reserves one or more URLs for the Report Server Web service and the  web portal 
 in HTTP.SYS, and then register them when the service starts. By appending parameters to the URL, you can open reports through the Web service. Reservations and registration are provided by HTTP.SYS. For more information, see [Namespace reservations, registration, and routing](https://learn.microsoft.com/windows/win32/http/namespace-reservations-registrations-and-routing).  
  
 *URL reservation* is a process by which a URL endpoint to a Web application is created and stored in HTTP.SYS. HTTP.SYS is the common repository of all URL reservations that are defined on a computer and defines a set of common rules that guarantee unique URL reservations.  
  
 *URL registration* occurs when the service starts. The request queue is created and HTTP.SYS begins routing requests to that queue. A URL endpoint must be registered before requests that are directed to that endpoint are added to the queue. When the Report Server service starts, it registers all URLs that it reserves for all enabled applications. So the Web service must be enabled in order for registration to occur. If you set the **WebServiceAndHTTPAccessEnabled** property to **False** in the Surface Area Configuration for Reporting Services facet of Policy-Based Management, the URL for the Web service doesn't register when the service starts.  
  
 URLs are unregistered if you stop the service or recycle the Web service or the  web portal 
 application domain. If you modify a URL reservation while the service is running, the report server recycles the application domain immediately so that the old URL can be unregistered and the new one put into use.  
  
 A few simple examples illustrate the concept of a URL reservation and how it relates to URL addresses used for  Reporting Services 
 applications. A key point to notice is that the URL reservation has different syntax than the URL you use to access the application:  
  
| URL Reservation in HTTP.SYS | URL | Explanation |
| --- | --- | --- |
| `https://+:80/reportserver` | `https://<computername>/reportserver`<br /><br /> `https://<IPAddress>/reportserver`<br /><br /> `https://localhost/reportserver` | The URL reservation specifies a wildcard (+) on port 80. This puts into the report server queue any incoming request that specifies a host that resolves to the report server computer on port 80. Notice that with this URL reservation, any number of URLs can be used to access the report server.<br /><br /> This URL reservation is the default for a  Reporting Services |
 | report server for most operating systems. |
| `https://123.45.67.0:80/reportserver` | `https://123.45.67.0/reportserver` | This URL reservation specifies an IP address and is much more restrictive than the wildcard URL reservation. Only URLs that include the IP address can be used to connect to the report server. Given this URL reservation, a request to a report server at `https://<computername>/reportserver` or `https://localhost/reportserver` would fail. |
  
##  <a name="DefaultURLs"></a> Default URLs  
 If you install  Reporting Services 
 in the default configuration, Setup reserves URLs for the Report Server Web service and the  web portal 
. You can also accept these default values when you define URL reservations in the  Reporting Services 
 Configuration tool. Default URLs include an instance name if you install  SQL Server Express 
 or if you install  Reporting Services 
 as a named instance.  
  
> **Important:**  
> The instance character is an underscore character (**_**).  
  
 URL reservations include a port number. The following operating systems allow multiple Web applications to share a port:  
  
-    Windows Server 2012
 R2  
  
-    Windows Server 2012
  
  
-    Windows Server 2008 R2 
  
  
-    Windows Server 2008 
  
  
-    Windows 7 
  
  
-    Windows Vista 
  
  
| Instance Type | Application | Default URL | Actual URL reservation in HTTP.SYS |
| --- | --- | --- | --- |
| Default instance | Report Server Web service | `https://<servername>/reportserver` | `https://<servername>:80/reportserver` |
| Default instance | Web portal | `https://<servername>/reports` | `https://<servername>:80/reports` |
| Named instance | Report Server Web service | `https://<servername>/reportserver_<instancename>` | `https://<servername>:80/reportserver_<instancename>` |
| Named instance | Web portal | `https://<servername>/reports_<instancename>` | `https://<servername>:80/reports_<instancename>` |
| SQL Server Express | Report Server Web service | `https://<servername>/reportserver_SQLExpress` | `https://<servername>:80/reportserver_SQLExpress` |
| SQL Server Express | Web portal | `https://<servername>/reports_SQLExpress` | `https://<servername>:80/reports_SQLExpress` |
  
##  <a name="URLPermissionsAccounts"></a> Authentication and service identity for Reporting Services URLs  
  Reporting Services 
 URL reservations display the account of the URL reservation. The virtual service account is used for all URLs that are created for the  Reporting Services 
 applications that run in the same instance.
  
 
 Anonymous access is disabled because the default security is **RSWindowsNegotiate**. For intranet access, report server URLs use network computer names. If you want to configure  Reporting Services 
 for Internet connections, you must use different settings. For more information about authentication, see [Authentication with the report server](../security/authentication-with-the-report-server.md).  
  
##  <a name="URLlocalAdmin"></a> URLs for local administration  
 You can use `https://localhost/reportserver` or `https://localhost/reports` if you specified a strong or weak wildcard for the URL reservation.  
  
 The `https://localhost` URL is interpreted as `https://127.0.0.1`. If you pegged the URL reservation to a computer name or single IP address, you can't use localhost unless you create an extra reservation for 127.0.0.1 on the local computer. Similarly, if localhost or 127.0.0.1 is disabled on your computer, you can't use that URL.  
  
  Windows Vista 
,  Windows Server 2008 
 and later include new security features to minimize the risk of accidentally running programs with elevated privileges. Extra steps are necessary to enable local administration on these operating systems. For more information, see [Configure a Native mode report server for local administration (SSRS)](../report-server/configure-a-native-mode-report-server-for-local-administration-ssrs.md).  
  
## Related content

- [Configure a URL (Report Server Configuration Manager)](configure-a-url-ssrs-configuration-manager.md)
- [URL Reservation Syntax  (Report Server Configuration Manager)](url-reservation-syntax-ssrs-configuration-manager.md)
