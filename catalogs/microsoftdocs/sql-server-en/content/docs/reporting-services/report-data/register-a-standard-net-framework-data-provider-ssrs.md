---
title: "Register a Standard .NET Framework Data Provider"
description: Register a standard .NET Framework data provider to use a third-party .NET Framework data provider to retrieve data for a Reporting Services report dataset.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-data
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "reports [Reporting Services], data"
  - ".NET Framework data providers for Reporting Services"
  - "data processing extensions [Reporting Services]"
  - "data providers [Reporting Services]"
  - "data retrieval [Reporting Services]"
  - "Reporting Services, data sources"
---
# Register a Standard .NET Framework Data Provider (SSRS)
  To use a third-party  .NET Framework 
 data provider to retrieve data for a  Reporting Services 
 report dataset, you need to deploy and register the  .NET Framework 
 data provider assembly in two locations: on the report authoring client and on the report server. On the report authoring client, you must register the data provider as a data source type and associate it with a query designer. You can then select this data provider as a type of data source when you create a report dataset. The associated query designer opens to help you create queries for this data source type. On the report server, you must register the data provider as a data source type. You can then process published reports that retrieve data from a data source using this data provider.  
  
 Third-party data providers do not necessarily provide all the functionality available with the  Reporting Services 
 data processing extensions. For more information, see [Data Sources Supported by Reporting Services (SSRS)](data-sources-supported-by-reporting-services-ssrs.md). To learn about extending the functionality of a .  .NET Framework 
 data provider, see [Implementing a Data Processing Extension](../extensions/data-processing/implementing-a-data-processing-extension.md).  
  
 You need administrator credentials to install and register data providers.  
  
## Registering a .NET Framework Data Provider on the Report Server  
 In order to process published reports that use this  .NET Framework 
 data provider on the report server, you need to install the assembly on the report server. You must modify two configuration files. Modify rsreportserver.config to register the data provider. Modify rssrvpolicy.config to grant code access security permissions for the assembly.  
  
#### To install a data provider assembly on the report server  
  
1.  Navigate to the default location of the bin directory on the report server on which you want to use the  .NET Framework 
 data provider. The default location of the report server bin directory is *\<drive>*:\Program Files\Microsoft SQL Server\MSRS10_50.MSSQLSERVER\Reporting Services\ReportServer\bin.  
  
2.  Copy your assembly from your staging location to the bin directory of the report server. Alternatively, you can load your assembly in the global assembly cache (GAC). For more information, see [Working with Assemblies and the Global Assembly Cache](https://learn.microsoft.com/dotnet/framework/app-domains/working-with-assemblies-and-the-gac) in the  .NET Framework 
 SDK documentation on MSDN.  
  
#### To register a .NET data provider on the report server  
  
1.  Make a backup of the RSReportServer.config file in the ReportServer parent directory for bin.  
  
2.  Open RSReportServer.config. You can open the configuration file with  Visual Studio 
 or a simple text editor, such as Notepad.  
  
3.  Locate the **Data** element in the RSReportServer.config file. An entry for the  .NET Framework 
 data provider should be made in the following location:  
  
    ```  
    <Extensions>  
       <Data>  
          <Extension Your data provider configuration information goes here />  
       </Data>  
    </Extensions>  
    ```  
  
4.  Add an entry for the  .NET Framework 
 data provider.  
  
    | Attribute | Description |
    | --- | --- |
    | **Name** | Provide a unique name for the data provider, for example, **MyNETDataProvider**. The maximum length for the **Name** attribute is 255 characters. The name must be unique among all entries within the **Extension** element of a configuration file. The value you include here appears in the dropdown list of data source types when you create a new data source. |
    | **Type** | Enter a comma-separated list that includes the fully qualified namespace of the class that implements the [System.Data.IDbConnection](https://learn.microsoft.com/search/?terms=System.Data.IDbConnection) interface, followed by the name of the  .NET Framework |
 data provider assembly (not including the .dll file name extension).|  
  
     For example, the entry might resemble the following for a DLL deployed to the report server bin directory:  
  
    ```  
    <Extension Name="MyNETDataProvider" Type="CompanyName.ExtensionName.DataProviderConnectionClass, DataProviderAssembly" />   
    ```  
  
     If you load your assembly into the global assembly cache (GAC), you must provide the strong name properties. For example:  
  
    ```  
    <Extension Name="MyNETDataProvider" Type="CompanyName.ExtensionName.DataProviderConnectionClass, DataProviderAssembly,Version=1.0.0.0, Culture=neutral, PublicKeyToken=MyPublicToken"/>  
    ```  
  
#### To set the code group policy for a .NET data provider  
  
1.  Make a backup copy of the rssrvpolicy.config file in the ReportServer parent directory for bin.  
  
2.  Open rssrvpolicy.config. You can open the configuration file with  Visual Studio 
 or a simple text editor such as Notepad.  
  
3.  Locate the **CodeGroup** element in the rssrvpolicy.config file.  
  
4.  Add a code group for the data provider assembly that grants **FullTrust** permission. Your code group might resemble the following:  
  
    ```  
    <CodeGroup class="UnionCodeGroup"  
       version="1"  
       PermissionSetName="FullTrust"  
       Name="ThisDataProviderCodeGroup"  
       Description="Code group for the .NET data provider">  
          <IMembershipCondition class="UrlMembershipCondition"  
             version="1"  
             Url=  
    "C:\Program Files\Microsoft SQL Server\MSRS10_50.MSSQLSERVER\Reporting Services\ReportServer\bin\DataProviderAssembly.dll"  
           />  
    </CodeGroup>  
    ```  
  
 URL membership is only one of many membership conditions you might select for the data provider.  
  
### Verifying the Deployment and Registration  
 You can verify whether the data provider was deployed successfully to the report server by opening the web portal and verifying that the data provider is included in the list of available data sources. For more information about the web portal and data sources, see [Create, Modify, and Delete Shared Data Sources (SSRS)](create-modify-and-delete-shared-data-sources-ssrs.md).  
  
## Registering a .NET Framework Data Provider on the Report Designer Client  
 In order to author reports that use this  .NET Framework 
 data provider for a data source, you must install the assembly on your client computer that runs Report Designer. You must modify two configuration files. Modify RSReportDesigner.config to register the data provider as a data source and to use the generic query designer. Modify RSPreviewPolicy.config to grant code access security permissions for the data provider assembly.  
  
#### To install a data provider assembly on the Report Designer client  
  
1.  Navigate to the default location of the PrivateAssemblies directory on the Report Designer client on which you want to use the  .NET Framework 
 data provider. The default location of the PrivateAssemblies directory is *\<drive>*:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\PrivateAssemblies.  
  
2.  Copy your assembly from your staging location to the PrivateAssemblies directory of the Report Designer client. Alternatively, you can load your assembly in the global assembly cache (GAC). For more information, see [Working with Assemblies and the Global Assembly Cache](https://learn.microsoft.com/dotnet/framework/app-domains/working-with-assemblies-and-the-gac) in the  .NET Framework 
 SDK documentation on MSDN.  
  
#### To register a .NET data provider on the Report Designer client  
  
1.  Make a backup copy of the RSReportDesigner.config file in the PrivateAssemblies directory.  
  
2.  Open RSReportDesigner.config with  Visual Studio 
 or a simple text editor such as Notepad.  
  
3.  Locate the **Data** element in the RSReportDesigner.config file. An entry for the data provider should be made in the following location:  
  
    ```  
    <Extensions>  
       <Data>  
          <Extension Your data provider configuration information goes here />  
       </Data>  
    </Extensions>  
    ```  
  
4.  Add an entry for the data provider.  
  
    | Attribute | Description |
    | --- | --- |
    | **Name** | Provide a unique name for the data provider, for example, **MyNETDataProvider**. The maximum length for the **Name** attribute is 255 characters. The name must be unique among all entries within the **Extension** element of a configuration file. The value that you include here appears in the dropdown list of data source types when you create a new data source. |
    | **Type** | Enter a comma-separated list that includes the fully qualified namespace of the class that implements the [System.Data.IDbConnection](https://learn.microsoft.com/search/?terms=System.Data.IDbConnection) interface, followed by the name of the  .NET Framework |
 data provider assembly (not including the .dll file name extension).|  
  
     For example, the entry might resemble the following for a DLL deployed to the  Visual Studio 
 PrivateAssemblies directory:  
  
    ```  
    <Extension Name="MyNETDataProvider" Type="CompanyName.ExtensionName.DataProviderConnectionClass, DataProviderAssembly" />   
    ```  
  
     If you load your assembly into the GAC, you must provide the strong name properties. For example:  
  
    ```  
    <Extension Name="MyNETDataProvider" Type="CompanyName.ExtensionName.DataProviderConnectionClass, DataProviderAssembly, Version=1.0.0.0, Culture=neutral, PublicKeyToken=MyPublicToken"/>  
    ```  
  
5.  Locate the **Designer** element in the RSReportDesigner.config file. An entry for the  .NET Framework 
 data provider should be made in the following location:  
  
    ```  
    <Extensions>  
       <Designer>  
          <Your data provider configuration information goes here>  
       </Designer>  
    </Extensions>  
    ```  
  
6.  Add the following entry to the RSReportDesigner.config file under the **Designer** element. You need to replace only the **Name** attribute with the name that you provided in previous entries.  
  
    ```  
    <Extension Name="MyNETDataProvider" Type="Microsoft.ReportingServices.QueryDesigners.GenericQueryDesigner,Microsoft.ReportingServices.QueryDesigners"/>  
    ```  
  
#### To set the code group policy for a .NET data provider on the Report Designer client  
  
1.  Make a backup copy of the RSPreviewPolicy.config file in the PrivateAssemblies directory.  
  
2.  Open RSPreviewPolicy.config with  Visual Studio 
 or a simple text editor, such as Notepad.  
  
3.  Locate the **CodeGroup** element in the RSPreviewPolicy.config file.  
  
4.  Add a code group for the  .NET Framework 
 data provider assembly that grants **FullTrust** permission. Your code group might resemble the following:  
  
    ```  
    <CodeGroup class="UnionCodeGroup"  
       version="1"  
       PermissionSetName="FullTrust"  
       Name="ThisDataProviderCodeGroup"  
       Description="Code group for the .NET data provider">  
          <IMembershipCondition class="UrlMembershipCondition"  
             version="1"  
             Url=  
    " C:\Program Files\Microsoft Visual Studio 9\Common7\IDE\PrivateAssemblies\DataProviderAssembly.dll"  
           />  
    </CodeGroup>  
    ```  
  
 URL membership is only one of many membership conditions you might select for the data provider.  
  
### Verifying the Deployment and Registration on the Report Designer Client  
 Before you can verify deployment, you must close all instances of  Visual Studio 
 on your local computer. After you have ended all current sessions, you can verify whether your data provider was deployed successfully to Report Designer by creating a new report project in  Visual Studio 
. The data provider should be included in the list of available data source types when you create a new data set for your report.  
  
## Platform Considerations  
 On a 64-bit (x64) platform,  SQL Server Data Tools (SSDT) 
 runs in 32-bit WOW mode. When you author reports on an x64 platform, you need 32-bit data providers installed on the report authoring client in order to preview your reports. If you publish the report on the same system, you need x64 data providers to view the report in the web portal.  
  
  SQL Server Data Tools (SSDT) 
 is not supported for Itanium-based platforms.  
  
 The data processing extensions that are installed with  Reporting Services 
 must be compiled natively for each platform and installed in the correct locations. If you register a custom data provider or a standard  .NET Framework 
 data provider, it needs to be compiled natively for the appropriate platform and installed the appropriate locations. If you are running on a 32-bit platform, the data provider must be compiled for a 32-bit platform. If you are running on a 64-bit platform, the data provider must be compiled for the 64-bit platform. You cannot use a 32-bit data provider wrapped with 64-bit interfaces on a 64 bit platform. Check your third-party software for information about whether the data provider will work on the installed platform. For more information about data providers and platform support, see [Data Sources Supported by Reporting Services (SSRS)](data-sources-supported-by-reporting-services-ssrs.md).  
  
## Related content

- [Configure and administer a report server (SSRS native mode)](../report-server/configure-and-administer-a-report-server-ssrs-native-mode.md)
- [Implement a data processing extension](../extensions/data-processing/implementing-a-data-processing-extension.md)
- [Reporting Services configuration files](../report-server/reporting-services-configuration-files.md)
- [Code access security in Reporting Services](../extensions/secure-development/code-access-security-in-reporting-services.md)
