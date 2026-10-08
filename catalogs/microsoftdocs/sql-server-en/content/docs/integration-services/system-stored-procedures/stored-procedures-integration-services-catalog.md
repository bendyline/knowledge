---
title: "Stored Procedures (Integration Services Catalog)"
description: "Stored Procedures (Integration Services Catalog)"
ms.date: "12/16/2016"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
helpviewer_keywords:
  - "stored procedures [Integration Services]"
---
# Stored Procedures (Integration Services Catalog)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This section describes the  Transact-SQL  stored procedures that are available for administering  Integration Services 
 projects that have been deployed to an instance of  SQL Server 
.  
  
 Call the  Integration Services 
 stored procedures to add, remove, modify, or execute objects that are stored in the **SSISDB** catalog.  
  
 The default name of the catalog is SSISDB. The objects that are stored in the catalog include projects, packages, parameters, environments, and operational history.  
  
 You can use the database views and stored procedures directly, or write custom code that calls the managed API.  Management Studio
 and the managed API query the views and call the stored procedures that are described in this section to perform many of their tasks.  
  
## In This Section  
 [catalog.add_data_tap](catalog-add-data-tap.md)  
 Adds a data tap on the output of a component in a package data flow.  
  
 [catalog.add_data_tap_by_guid](catalog-add-data-tap-by-guid.md)  
 Adds a data tap to a specific data flow path in a package data flow.  
  
 [catalog.check_schema_version](catalog-check-schema-version.md)  
 Determines whether the SSISDB catalog schema and the  Integration Services 
 binaries (ISServerExec and SQLCLR assembly) are compatible.  
  
 [catalog.clear_object_parameter_value (SSISDB Database)](catalog-clear-object-parameter-value-ssisdb-database.md)  
 Clears the value of a parameter for an existing  Integration Services 
 project or package that is stored on the server.  
  
 [catalog.configure_catalog (SSISDB Database)](catalog-configure-catalog-ssisdb-database.md)  
 Configures the  Integration Services 
 catalog by setting a catalog property to a specified value.  
  
 [catalog.create_environment (SSISDB Database)](catalog-create-environment-ssisdb-database.md)  
 Creates an environment in the  Integration Services 
 catalog.  
  
 [catalog.create_environment_reference (SSISDB Database)](catalog-create-environment-reference-ssisdb-database.md)  
 Creates an environment reference for a project in the  Integration Services 
 catalog.  
  
 [catalog.create_environment_variable (SSISDB Database)](catalog-create-environment-variable-ssisdb-database.md)  
 Create an environment variable in the  Integration Services 
 catalog.  
  
 [catalog.create_execution (SSISDB Database)](catalog-create-execution-ssisdb-database.md)  
 Creates an instance of execution in the  Integration Services 
 catalog.  
  
 [catalog.create_execution_dump](catalog-create-execution-dump.md)  
 Causes a running package to pause and create a dump file.  
  
 [catalog.create_folder (SSISDB Database)](catalog-create-folder-ssisdb-database.md)  
 Creates a folder in the  Integration Services 
 catalog.  
  
 [catalog.delete_environment (SSISDB Database)](catalog-delete-environment-ssisdb-database.md)  
 Deletes an environment from a folder in the  Integration Services 
 catalog.  
  
 [catalog.delete_environment_reference (SSISDB Database)](catalog-delete-environment-reference-ssisdb-database.md)  
 Deletes an environment reference from a project in the  Integration Services 
 catalog.  
  
 [catalog.delete_environment_variable (SSISDB Database)](catalog-delete-environment-variable-ssisdb-database.md)  
 Deletes an environment variable from an environment in the  Integration Services 
 catalog.  
  
 [catalog.delete_folder (SSISDB Database)](catalog-delete-folder-ssisdb-database.md)  
 Deletes a folder from the  Integration Services 
 catalog.  
  
 [catalog.delete_project (SSISDB Database)](catalog-delete-project-ssisdb-database.md)  
 Deletes an existing project from a folder in the  Integration Services 
 catalog.  
  
 [catalog.deny_permission (SSISDB Database)](catalog-deny-permission-ssisdb-database.md)  
 Denies a permission on a securable object in the  Integration Services 
 catalog.  
  
 [catalog.deploy_project (SSISDB Database)](catalog-deploy-project-ssisdb-database.md)  
 Deploys a project to a folder in the  Integration Services 
 catalog or updates an existing project that has been deployed previously.  
  
 [catalog.get_parameter_values (SSISDB Database)](catalog-get-parameter-values-ssisdb-database.md)  
 Resolves and retrieves the default parameter values from a project and corresponding packages in the  Integration Services 
 catalog.  
  
 [catalog.get_project (SSISDB Database)](catalog-get-project-ssisdb-database.md)  
 Retrieves the properties of an existing project in the  Integration Services 
 catalog.  
  
 [catalog.grant_permission (SSISDB Database)](catalog-grant-permission-ssisdb-database.md)  
 Grants a permission on a securable object in the  Integration Services 
 catalog.  
  
 [catalog.move_environment (SSISDB Database)](catalog-move-environment-ssisdb-database.md)  
 Moves an environment from one folder to another within the  Integration Services 
 catalog.  
  
 [catalog.move_project ((SSISDB Database)](catalog-move-project-ssisdb-database.md)  
 Moves a project from one folder to another within the  Integration Services 
 catalog.  
  
 [catalog.remove_data_tap](catalog-remove-data-tap.md)  
 Removes a data tap from a component output that is in an execution.  
  
 [catalog.rename_environment (SSISDB Database)](catalog-rename-environment-ssisdb-database.md)  
 Renames an environment in the  Integration Services 
 catalog.  
  
 [catalog.rename_folder (SSISDB Database)](catalog-rename-folder-ssisdb-database.md)  
 Renames a folder in the  Integration Services 
 catalog.  
  
 [catalog.restore_project (SSISDB Database)](catalog-restore-project-ssisdb-database.md)  
 Restores a project in the  Integration Services 
 catalog to a previous version.  
  
 [catalog.revoke_permission (SSISDB Database)](catalog-revoke-permission-ssisdb-database.md)  
 Revokes a permission on a securable object in the  Integration Services 
 catalog.  
  
 [catalog.set_environment_property (SSISDB Database)](catalog-set-environment-property-ssisdb-database.md)  
 Sets the property of an environment in the  Integration Services 
 catalog.  
  
 [catalog.set_environment_reference_type (SSISDB Database)](catalog-set-environment-reference-type-ssisdb-database.md)  
 Sets the reference type and environment name associated with an existing environment reference for a project in the  Integration Services 
 catalog.  
  
 [catalog.set_environment_variable_property (SSISDB Database)](catalog-set-environment-variable-property-ssisdb-database.md)  
 Sets the property of an environment variable in the  Integration Services 
 catalog.  
  
 [catalog.set_environment_variable_protection (SSISDB Database)](catalog-set-environment-variable-protection-ssisdb-database.md)  
 Sets the sensitivity bit of an environment variable in the  Integration Services 
 catalog.  
  
 [catalog.set_environment_variable_value (SSISDB Database)](catalog-set-environment-variable-value-ssisdb-database.md)  
 Sets the value of an environment variable in the  Integration Services 
 catalog.  
  
 [catalog.set_execution_parameter_value (SSISDB Database)](catalog-set-execution-parameter-value-ssisdb-database.md)  
 Sets the value of a parameter for an instance of execution in the  Integration Services 
 catalog.  
  
 [catalog.set_execution_property_override_value](catalog-set-execution-property-override-value.md)  
 Sets the value of a property for an instance of execution in the  Integration Services 
 catalog.  
  
 [catalog.set_folder_description (SSISDB Database)](catalog-set-folder-description-ssisdb-database.md)  
 Sets the description of a folder in the  Integration Services 
 catalog.  
  
 [catalog.set_object_parameter_value (SSISDB Database)](catalog-set-object-parameter-value-ssisdb-database.md)  
 Sets the value of a parameter in the  Integration Services 
 catalog. Associates the value to an environment variable or assigns a literal value that will be used by default if no other values are assigned.  
  
 [catalog.start_execution (SSISDB Database)](catalog-start-execution-ssisdb-database.md)  
 Starts an instance of execution in the  Integration Services 
 catalog.  
  
 [catalog.startup](catalog-startup.md)  
 Performs maintenance of the state of operations for the SSISDB catalog.  
  
 [catalog.stop_operation (SSISDB Database)](catalog-stop-operation-ssisdb-database.md)  
 Stops a validation or instance of execution in the  Integration Services 
 catalog.  
  
 [catalog.validate_package (SSISDB Database)](catalog-validate-package-ssisdb-database.md)  
 Asynchronously validates a package in the  Integration Services 
 catalog.  
  
 [catalog.validate_project (SSISDB Database)](catalog-validate-project-ssisdb-database.md)  
 Asynchronously validates a project in the  Integration Services 
 catalog.  
  
[catalog.add_execution_worker (SSISDB Database)](catalog-add-execution-worker-ssisdb-database.md)   
Adds a  Integration Services 
 Scale Out Worker to an instance of execution in Scale Out.

[catalog.enable_worker_agent (SSISDB Database)](catalog-enable-worker-agent-ssisdb-database.md)   
Enable a Scale Out Worker for Scale Out Master working with this  Integration Services 
 catalog.

[catalog.disable_worker_agent (SSISDB Database)](catalog-disable-worker-agent-ssisdb-database.md)   
Disable a Scale Out Worker for Scale Out Master working with this  Integration Services 
 catalog.
