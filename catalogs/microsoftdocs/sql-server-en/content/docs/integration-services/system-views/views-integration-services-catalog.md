---
title: "Views (Integration Services Catalog)"
description: "Views (Integration Services Catalog)"
ms.date: "12/16/2016"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
helpviewer_keywords:
  - "views [Integration Services]"
---
# Views (Integration Services Catalog)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory

  This section describes the  Transact-SQL  views that are available for administering  Integration Services 
 projects that have been deployed to an instance of  SQL Server 
.  
  
 Query the  Integration Services 
 views to inspect objects, settings, and operational data that are stored in the **SSISDB** catalog.  
  
 The default name of the catalog is SSISDB. The objects that are stored in the catalog include projects, packages, parameters, environments, and operational history.  
  
 You can use the database views and stored procedures directly, or write custom code that calls the managed API.  Management Studio
 and the managed API query the views and call the stored procedures that are described in this section to perform many of their tasks.  
  
## In This Section  
 [catalog.catalog_properties (SSISDB Database)](catalog-catalog-properties-ssisdb-database.md)  
 Displays the properties of the  Integration Services 
 catalog.  
  
 [catalog.effective_object_permissions (SSISDB Database)](catalog-effective-object-permissions-ssisdb-database.md)  
 Displays the effective permissions for the current principal for all objects in the  Integration Services 
 catalog.  
  
 [catalog.environment_variables (SSISDB Database)](catalog-environment-variables-ssisdb-database.md)  
 Displays the environment variable details for all environments in the  Integration Services 
 catalog.  
  
 [catalog.environments (SSISDB Database)](catalog-environments-ssisdb-database.md)  
 Displays the environment details for all environments in the  Integration Services 
 catalog. Environments contain variables that can be referenced by  Integration Services 
 projects.  
  
 [catalog.execution_parameter_values (SSISDB Database)](catalog-execution-parameter-values-ssisdb-database.md)  
 Displays the actual parameter values that are used by  Integration Services 
 packages during an instance of execution.  
  
 [catalog.executions (SSISDB Database)](catalog-executions-ssisdb-database.md)  
 Displays the instances of package execution in the  Integration Services 
 catalog. Packages that are executed with the Execute Package task run in the same instance of execution as the parent package.  
  
 [catalog.explicit_object_permissions (SSISDB Database)](catalog-explicit-object-permissions-ssisdb-database.md)  
 Displays only the permissions that have been explicitly assigned to the user.  
  
 [catalog.extended_operation_info (SSISDB Database)](catalog-extended-operation-info-ssisdb-database.md)  
 Displays extended information for all operations in the  Integration Services 
 catalog.  
  
 [catalog.folders (SSISDB Database)](catalog-folders-ssisdb-database.md)  
 Displays the folders in the  Integration Services 
 catalog.  
  
 [catalog.object_parameters (SSISDB Database)](catalog-object-parameters-ssisdb-database.md)  
 Displays the parameters for all packages and projects in the  Integration Services 
 catalog.  
  
 [catalog.object_versions (SSISDB Database)](catalog-object-versions-ssisdb-database.md)  
 Displays the versions of objects in the  Integration Services 
 catalog. In this release, only versions of projects are supported in this view.  
  
 [catalog.operation_messages (SSISDB Database)](catalog-operation-messages-ssisdb-database.md)  
 Displays messages that are logged during operations in the  Integration Services 
 catalog.  
  
 [catalog.operations (SSISDB Database)](catalog-operations-ssisdb-database.md)  
 Displays the details of all operations in the  Integration Services 
 catalog.  
  
 [catalog.packages (SSISDB Database)](catalog-packages-ssisdb-database.md)  
 Displays the details for all packages that appear in the  Integration Services 
 catalog.  
  
 [catalog.environment_references (SSISDB Database)](catalog-environment-references-ssisdb-database.md)  
 Displays the environment references for all projects in the  Integration Services 
 catalog.  
  
 [catalog.projects (SSISDB Database)](catalog-projects-ssisdb-database.md)  
 Displays the details for all projects that appear in the  Integration Services 
 catalog.  
  
 [catalog.validations (SSISDB Database)](catalog-validations-ssisdb-database.md)  
 Displays the details of all project and package validations in the  Integration Services 
 catalog.  
  
[catalog.master_properties (SSISDB Database)](catalog-master-properties-ssisdb-database.md)  
Displays the properties of the  Integration Services 
 Scale Out Master.

[catalog.worker_agents (SSISDB Database)](catalog-worker-agents-ssisdb-database.md)  
Displays the information of  Integration Services 
 Scale Out Worker.
