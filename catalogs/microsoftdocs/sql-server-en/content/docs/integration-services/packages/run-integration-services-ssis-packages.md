---
title: "Run Integration Services (SSIS) Packages"
description: "Run Integration Services (SSIS) Packages"
ms.date: 06/04/2018
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
f1_keywords:
  - "sql13.ssis.ssms.ispackageexecute.f1"
  - "sql13.ssis.ssms.executepackage.f1"
helpviewer_keywords:
  - "Integration Services packages, running"
  - "SSIS packages, running"
  - "packages [Integration Services], running"
  - "SQL Server Integration Services packages, running"
  - "executing packages [Integration Services]"
  - "running packages [Integration Services]"
  - "Integration Services, (See also Integration Services packages)"
---
# Run Integration Services (SSIS) Packages


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  To run an  Integration Services 
 package, you can use one of several tools depending on where those packages are stored. The tools are listed in the table below.  

> **Note:**
> This article describes how to run SSIS packages in general, and how to run packages on premises. You can also run SSIS packages on the following platforms:
> - **The Microsoft Azure cloud**. For more info, see [Lift and shift SQL Server Integration Services workloads to the cloud](../lift-shift/ssis-azure-lift-shift-ssis-packages-overview.md) and [Run an SSIS package in Azure](../lift-shift/ssis-azure-run-packages.md).
> - **Linux**. For more info, see [Extract, transform, and load data on Linux with SSIS](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-migrate-ssis.md).
  
 To store a package on the  Integration Services 
 server, you use the project deployment model to deploy the project to the server. For information, see [Deploy Integration Services (SSIS) Projects and Packages](deploy-integration-services-ssis-projects-and-packages.md).  
  
 To store a package in the SSIS Package store, the msdb database, or in the file system, you use the package deployment model. For more information, see [Legacy Package Deployment (SSIS)](legacy-package-deployment-ssis.md).  
  
| Tool | Packages that are stored on the Integration Services server | Packages that are stored in the SSIS Package Store or in the msdb database | Packages that are stored in the file system, outside of the location that is part of the SSIS Package Store |
| --- | --- | --- | --- |
| **SQL Server Data Tools** | No | No<br /><br /> However, you can add an existing package to a project from the  SSIS |
 | Package Store, which includes the msdb database. Adding an existing package to the project in this manner makes a local copy of the package in the file system. | Yes |
| **SQL Server Management Studio, when you are connected to an instance of the Database Engine that hosts the Integration Services server**<br /><br /> For more information, see [Execute Package Dialog Box](#execute_package_dialog) | Yes | No<br /><br /> However, you can import a package to the server from these locations. | No<br /><br /> However, you can import a package to the server from the file system. |
| **SQL Server Management Studio, when you are connected to an instance of the Database Engine that hosts the Integration Services server that is enabled as Scale Out Master**<br /><br /> For more information, see [Run packages in Scale Out](../scale-out/run-packages-in-integration-services-ssis-scale-out.md) | Yes | No | No |
| **SQL Server Management Studio, when it is connected to the Integration Services service that manages the SSIS Package Store** | No | Yes | No<br /><br /> However, you can import a package to the  SSIS |
 | Package Store from the file system. |
| **dtexec**<br /><br /> For more information, see [dtexec Utility](dtexec-utility.md). | Yes | Yes | Yes |
| **dtexecui**<br /><br /> For more information, see [Execute Package Utility (DtExecUI) UI Reference](execute-package-utility-dtexecui-ui-reference.md) | No | Yes | Yes |
| **SQL Server Agent**<br /><br /> You use a  SQL Server |
 | Agent job To schedule a package.<br /><br /> For more information, see [SQL Server Agent Jobs for Packages](sql-server-agent-jobs-for-packages.md). | Yes | Yes | Yes |
| **Built-in stored procedure**<br /><br /> For more information, see [catalog.start_execution (SSISDB Database)](../system-stored-procedures/catalog-start-execution-ssisdb-database.md) | Yes | No | No |
| **Managed API, by using types and members in the** [Microsoft.SqlServer.Management.IntegrationServices](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.IntegrationServices) namespace | Yes | No | No |
| **Managed API, by using types and members in the** [Microsoft.SqlServer.Dts.Runtime](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime) namespace | Not currently | Yes | Yes |

## Execution and Logging  
  Integration Services 
 packages can be enabled for logging and you can capture run-time information in log files. For more information, see [Integration Services (SSIS) Logging](../performance/integration-services-ssis-logging.md).  
  
 You can monitor  Integration Services 
 packages that are deployed to and run on the  Integration Services 
 server by using operation reports. The reports are available in  SQL Server Management Studio 
. For more information, see [Reports for the Integration Services Server](../performance/monitor-running-packages-and-other-operations.md#reports).  
  
## Run a Package in SQL Server Data Tools
  You typically run packages in  SQL Server Data Tools (SSDT) 
 during the development, debugging, and testing of packages. When you run a package from  SSIS 
 Designer, the package always runs immediately.  
  
 While a package is running,  SSIS 
 Designer displays the progress of package execution on the **Progress** tab. You can view the start and finish time of the package and its tasks and containers, in addition to information about any tasks or containers in the package that failed. After the package finishes running, the run-time information remains available on the **Execution Results** tab. For more information, see the section, "Progress Reporting," in the topic, [Debugging Control Flow](../troubleshooting/debugging-control-flow.md).  
  
 **Design-time deployment**. When you run a package in  SQL Server Data Tools 
, the package is built and then deployed to a folder. Before you run the package, you can specify the folder to which the package is deployed. If you do not specify a folder, the **bin** folder is used by default. This type of deployment is called design-time deployment.  
  
### To run a package in SQL Server Data Tools  
  
1.  In Solution Explorer, if your solution contains multiple projects, right-click the  Integration Services 
 project that contains the package, and then click **Set as StartUp Object** to set the startup project.  
  
2.  In Solution Explorer, if your project contains multiple packages, right-click a package, and then click **Set as StartUp Object** to set the startup package.  
  
3.  To run a package, use one of the following procedures:  
  
    -   Open the package that you want to run and then click **Start Debugging** on the menu bar, or press F5. After the package finishes running, press Shift+F5 to return to design mode.  
  
    -   In Solution Explorer, right-click the package, and then click **Execute Package**.  
  
### To specify a different folder for design-time deployment  
  
1.  In Solution Explorer, right-click the  Integration Services 
 project folder that contains the package you want to run, and then click **Properties**.  
  
2.  In the **\<project name> Property Pages** dialog box, click **Build**.  
  
3.  Update the value in the OutputPath property to specify the folder you want to use for design-time deployment, and click **OK**.  


## Run a Package on the SSIS Server Using SQL Server Management Studio
  After you deploy your project to the  Integration Services 
 server, you can run the package on the server.  
  
 You can use operations reports to view information about packages that have run, or are currently running, on the server. For more information, see [Reports for the Integration Services Server](../performance/monitor-running-packages-and-other-operations.md#reports).  
  
### To run a package on the server using SQL Server Management Studio  
  
1.  Open  SQL Server Management Studio 
 and connect to the instance of  SQL Server 
 that contains the  Integration Services 
 catalog.  
  
2.  In Object Explorer, expand the **Integration Services Catalogs** node, expand the **SSISDB** node, and navigate to the package contained in the project you deployed.  
  
3.  Right-click the package name and select **Execute**.  
  
4.  Configure the package execution by using the settings on the **Parameters**, **Connection Managers**, and **Advanced** tabs in the **Execute Package** dialog box.  
  
5.  Click **OK** to run the package.  
  
     -or-  
  
     Use stored procedures to run the package. Click **Script** to generate the Transact-SQL statement that creates an instance of the execution and starts an instance of the execution. The statement includes a call to the catalog.create_execution, catalog.set_execution_parameter_value, and catalog.start_execution stored procedures. For more information about these stored procedures, see [catalog.create_execution (SSISDB Database)](../system-stored-procedures/catalog-create-execution-ssisdb-database.md), [catalog.set_execution_parameter_value (SSISDB Database)](../system-stored-procedures/catalog-set-execution-parameter-value-ssisdb-database.md), and [catalog.start_execution (SSISDB Database)](../system-stored-procedures/catalog-start-execution-ssisdb-database.md).  

## <a name="execute_package_dialog"></a> Execute Package Dialog Box
  Use the **Execute Package** dialog box to run a package that is stored on the  Integration Services 
 server.  
  
 An  Integration Services 
 package may contain parameters that values stored in environment variables. Before executing such a package, you must specify which environment will be used to provide the environment variable values. A project may contain multiple environments, but only one environment can be used for binding environment variable values at the time of execution. If no environment variables are used in the package, an environment is not required.  
  
 What do you want to do?  
  
-   [Open the Execute Package dialog box](#open_dialog)  
  
-   [Set the Options on the General page](#general)  
  
-   [Set the Options on the Parameters tab](#parameters)  
  
-   [Set the Options on the Connection Managers tab](#connection)  
  
-   [Set the Options on the Advanced tab](#advanced)  
  
-   [Scripting the Options in the Execute Package Dialog Box](#script)  
  
###  <a name="open_dialog"></a> Open the Execute Package dialog box  
  
1.  In  SQL Server Management Studio 
, connect to the  Integration Services 
 server.  
  
     You're connecting to the instance of the  SQL Server Database Engine 
 that hosts the SSISDB database.  
  
2.  In Object Explorer, expand the tree to display the **Integration Services Catalogs** node.  
  
3.  Expand the **SSISDB** node.  
  
4.  Expand the folder that contains the package you want to run.  
  
5.  Right-click the package, and then click **Execute**.  
  
###  <a name="general"></a> Set the Options on the General page  
 Select **Environment** to specify the environment that is applied with the package is run.  
  
###  <a name="parameters"></a> Set the Options on the Parameters tab  
 Use the **Parameters** tab to modify the parameter values that are used when the package runs.  
  
###  <a name="connection"></a> Set the Options on the Connection Managers tab  
 Use the Connection Managers tab to set the properties of the package connection manager(s).  
  
###  <a name="advanced"></a> Set the Options on the Advanced tab  
 Use the Advanced tab to manage properties and other package settings.  
  
 **Add**, **Edit**, **Remove**  
 Click to add, edit, or remove a property.  
  
 **Logging level**  
 Select the logging level for the package execution. For more information, see [catalog.set_execution_parameter_value (SSISDB Database)](../system-stored-procedures/catalog-set-execution-parameter-value-ssisdb-database.md).  
  
 **Dump on errors**  
 Specify whether a dump file is created when errors occur during the package execution. For more information, see [Generating Dump Files for Package Execution](../troubleshooting/generating-dump-files-for-package-execution.md).  
  
 **32-bit runtime**  
 Specify that the package will execute on a 32-bit system.  
  
###  <a name="script"></a> Scripting the Options in the Execute Package Dialog Box  
 While you are in the **Execute Package** dialog box, you can also use the **Script** button on the toolbar to write  Transact-SQL  code for you. The generated script calls the stored procedures [catalog.start_execution (SSISDB Database)](../system-stored-procedures/catalog-start-execution-ssisdb-database.md) with the same options that you have selected in the **Execute Package** dialog box. The script appears in a new script window in  Management Studio
.  

## Related content

- [dtexec Utility](dtexec-utility.md)
- [Start the SQL Server Import and Export Wizard](../import-export-data/start-the-sql-server-import-and-export-wizard.md)
