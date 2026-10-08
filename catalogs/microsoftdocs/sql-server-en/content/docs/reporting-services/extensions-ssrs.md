---
title: Extensions for SQL Server Reporting Services (SSRS)
description: Learn about the extensions that are readily available in Reporting Services, and how it uses extensions to modularize the types of input or output it accepts.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: reporting-services
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---

# Extensions for SQL Server Reporting Services (SSRS)

  The report server in  SQL Server 
  Reporting Services 
 uses extensions to modularize the types of input or output it accepts for authentication, data processing, report rendering, and report delivery. This makes it easy for existing  Reporting Services 
 installations to utilize new software standards in the industry, such as a new authentication scheme, or a custom data source type. The report server supports custom authentication extensions, data processing extensions, report processing extensions, rendering extensions, and delivery extensions, and the extensions that are available to the users are configurable in the RSReportServer.config configuration file. For example, you can limit the export formats the report viewer is allowed to use. A report server requires at least one authentication extension, data processing extension, and rendering extension. Delivery and report processing extensions are optional, but necessary if you want to support report distribution or custom controls.  
  
 This topic describes the extensions that are readily available in  Reporting Services 
.  
  
## Security extensions

 Security extensions are used to authenticate and authorize users and groups to a report server. The default security extension is based on Windows Authentication. You can also create a custom security extension to replace default security if your deployment model requires a different authentication approach (for example, if you require forms-based authentication for Internet or extranet deployment). Only one security extension can be used in a single  Reporting Services 
 installation. You can replace the default Windows Authentication security extension, but you cannot use it alongside a custom security extension.  
  
## Data processing extensions

 Data Processing extensions are used to query a data source and return a flattened row set.  Reporting Services 
 uses different extensions to interact with different types of data sources. You can use the extensions that are included in  Reporting Services 
, or you can develop your own extensions. Data processing extensions for  SQL Server 
,  Analysis Services 
, Oracle,  SAP NetWeaver Business Intelligence 
, Hyperion Essbase, Teradata, OLE DB, and ODBC data sources are provided.  Reporting Services 
 can also use any  ADO.NET 
 data provider. Data processing extensions process query requests from the Report Processor component by performing the following tasks:  
  
- Open a connection to a data source.  
  
- Analyze a query and return a list of field names.  
  
- Run a query against the data source and return a rowset.  
  
- Pass parameters to a query, if required.  
  
- Iterate through the rowset and retrieve data.  
  
Some extensions can also perform the following tasks:  
  
- Analyze a query and return a list of parameter names used in the query.  
  
- Analyze a query and return the list of fields used for grouping.  
  
- Analyze a query and return the list of fields used for sorting.  
  
- Provide a user name and password to connect to the data source.  
  
- Pass parameters with multiple values to a query.  
  
- Iterate through rows and retrieve auxiliary metadata.  
  
## Rendering extensions

 Rendering extensions transform data and layout information from the Report Processor into a device-specific format.  Reporting Services 
 includes seven rendering extensions: HTML, Excel, CSV, XML, Image, PDF, and  Microsoft 
 Word.  
  
- **HTML Rendering Extension** When you request a report from a report server through a Web browser, the report server uses the HTML rendering extension to render the report. The HTML rendering extension generates all HTML using UTF-8 encoding. For more information, see [Render to HTML (Report Builder and SSRS)](report-builder/rendering-to-html-report-builder-and-ssrs.md) and [Browser support for Reporting Services](browser-support-for-reporting-services-and-power-view.md).  
  
- **Excel Rendering Extension** The Excel rendering extension renders reports that can be viewed and modified in  Microsoft Excel 
 97 or later. This rendering extension creates files in Binary Interchange File Format (BIFF). BIFF is the native file format for Excel data. Reports that are rendered in  Microsoft Excel 
 support all of the features available for any spreadsheet. For more information, see [Export to Microsoft Excel (Report Builder and SSRS)](report-builder/exporting-to-microsoft-excel-report-builder-and-ssrs.md).  
  
- **CSV Rendering Extension** The Comma-Separated Value (CSV) rendering extension renders reports in comma-delimited plain text files, without any formatting. Users can then open these files with a spreadsheet application, such as  Microsoft Excel 
, or any other program that reads text files. For more information, see [Export to a CSV file (Report Builder and SSRS)](report-builder/exporting-to-a-csv-file-report-builder-and-ssrs.md).  
  
- **XML Rendering Extension** The XML rendering extension renders reports in XML files. These XML files can then be stored or read by other programs. You can also use an XSLT transformation to turn the report into another XML schema for use by another application. The XML generated by the XML rendering extension is UTF-8 encoded. For more information, see [Export to XML (Report Builder and SSRS)](report-builder/exporting-to-xml-report-builder-and-ssrs.md).  
  
- **Image Rendering Extension** The Image rendering extension renders reports to bitmaps or metafiles. The extension can render reports in the following formats: BMP, EMF, GIF, JPEG, PNG, TIFF, and WMF. By default, the image is rendered in TIFF format, which can be displayed with the default image viewer of your operating system (for example, Windows Picture and Fax Viewer). You can send the image to a printer from the viewer. Using the Image rendering extension to render reports ensures that the report looks the same on every client. (When a user views a report in HTML, the appearance of that report can vary depending on the version of the user's browser, the user's browser settings, and the fonts that are available.) The Image rendering extension renders the report on the server, so all users see the same image. Because the report is rendered on the server, all fonts that are used in the report must be installed on the server. For more information, see [Export to an image file (Report Builder and SSRS)](report-builder/exporting-to-an-image-file-report-builder-and-ssrs.md).  
  
- **PDF Rendering Extension** The PDF rendering extension renders reports in PDF files that can be opened and viewed with Adobe Acrobat 6.0 or later. For more information, see [Export to a PDF file (Report Builder and SSRS)](report-builder/exporting-to-a-pdf-file-report-builder-and-ssrs.md).  
  
- **Word Rendering Extension** The  Microsoft 
 Word rendering extension renders a report as a Word document that is compatible with  Microsoft 
 Office Word 2000 or later. For more information, see [Export to Microsoft Word (Report Builder and SSRS)](report-builder/exporting-to-microsoft-word-report-builder-and-ssrs.md).  
  
## Report processing extensions

 Report processing extensions can be added to provide custom report processing for report items that are not included with  Reporting Services 
. By default, a report server can process tables, charts, matrices, lists, text boxes, images, and all other report items. If you want to add special features to a report that require custom processing during report execution (for example, if you want to embed a  Microsoft 
 MapPoint map), you can create a report processing extension to do so.  
  
## Delivery extensions
 The background processing application uses delivery extensions to deliver reports to various locations.  Reporting Services 
 includes an e-mail delivery extension and a file share delivery extension. The e-mail delivery extension sends an e-mail message through Simple Mail Transfer Protocol (SMTP) that includes either the report itself or a URL link to the report. Short notices without the URL link or report can also be sent to pagers, phones, or other devices. The file share delivery extension saves reports to a shared folder on your network. You can specify a location, rendering format, and file name, and overwrite options for the file you create. You can use file share delivery for archiving rendered reports and as part of a strategy for working with very large reports. Delivery extensions work in conjunction with subscriptions. When a user creates a subscription, the user chooses one of the available delivery extensions to determine how the report is delivered.
