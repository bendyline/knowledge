---
title: Data Discovery & Classification
titleSuffix: Azure SQL Database & Azure SQL Managed Instance & Azure Synapse Analytics
description: Data Discovery & Classification for Azure SQL Database, Azure SQL Managed Instance, and Azure Synapse Analytics
author: VanMSFT
ms.author: vanto
ms.reviewer: matripathy, shdasgupta, wiassaf, mathoma
ms.date: 08/26/2026
ms.service: azure-sql
ms.subservice: security
ms.topic: concept-article
ms.custom:
  - sqldbrb=1
  - sfi-image-nochange
tags: azure-synapse
monikerRange: "=azuresql || =azuresql-db || =azuresql-mi"
---
# Data Discovery & Classification



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)  [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)    [Azure Synapse Analytics](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

Data Discovery & Classification is built into Azure SQL Database, Azure SQL Managed Instance, and Azure Synapse Analytics. It provides basic capabilities for discovering, classifying, labeling, and reporting the sensitive data in your databases.

Your most sensitive data might include business, financial, healthcare, or personal information. It can serve as infrastructure for:

- Helping to meet standards for data privacy and requirements for regulatory compliance.
- Various security scenarios, such as monitoring (auditing) access to sensitive data.
- Controlling access to and hardening the security of databases that contain highly sensitive data.

For information about SQL Server on-premises, see [SQL Data Discovery & Classification](https://learn.microsoft.com/sql/relational-databases/security/sql-data-discovery-and-classification).

> **Note:**
> Label-based access protection that uses Microsoft Purview Information Protection policies (preview) is retired and no longer available. For more information, see [Microsoft Purview Information Protection policies for Azure SQL Database](#enabling-access-control-for-sensitive-data-using-microsoft-purview-information-protection-policies-public-preview).

<a id="what-is-dc"></a>

## What is Data Discovery & Classification?

Data Discovery & Classification currently supports the following capabilities:

- **Discovery and recommendations:** The classification engine scans your database and identifies columns that contain potentially sensitive data. It then provides you with an easy way to review and apply recommended classification via the Azure portal.

- **Labeling:** You can apply sensitivity-classification labels persistently to columns by using new metadata attributes that have been added to the SQL Server database engine. This metadata can then be used for sensitivity-based auditing scenarios.

- **Query result-set sensitivity:** The sensitivity of a query result set is calculated in real time for auditing purposes.

- **Visibility:** You can view the database-classification state in a detailed dashboard in the Azure portal. Also, you can download a report in Excel format to use for compliance and auditing purposes and other needs.

<a id="discover-classify-columns"></a>

## Discover, classify, and label sensitive columns

This section describes the steps for:

- Discovering, classifying, and labeling columns that contain sensitive data in your database.
- Viewing the current classification state of your database and exporting reports.

The classification includes two metadata attributes:

- **Labels**: The main classification attributes, used to define the sensitivity level of the data stored in the column.  
- **Information types**: Attributes that provide more granular information about the type of data stored in the column.

### Information Protection policy

Azure SQL offers both SQL Information Protection policy and Microsoft Information Protection policy in data classification, and you can choose either of these two policies based on your requirement.

Screenshot of Information Protection policy types.

### SQL Information Protection policy

Data Discovery & Classification comes with a built-in set of sensitivity labels and information types with discovery logic which is native to the SQL logical server. You can continue using the protection labels available in the default policy file, or you can customize this taxonomy. You can define a set and ranking of classification constructs specifically for your environment.

### Define and customize your classification taxonomy

You define and customize of your classification taxonomy in one central place for your entire Azure organization. That location is in [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/security-center/security-center-introduction), as part of your security policy. Only someone with administrative rights on the organization's root management group can do this task.

As part of policy management, you can define custom labels, rank them, and associate them with a selected set of information types. You can also add your own custom information types and configure them with string patterns. The patterns are added to the discovery logic for identifying this type of data in your databases.

For more information, see [Customize the SQL information protection policy in Microsoft Defender for Cloud (Preview)](https://learn.microsoft.com/azure/security-center/security-center-info-protection-policy).

After the organization-wide policy has been defined, you can continue classifying individual databases by using your customized policy.

### Classify database in SQL Information Protection policy mode

> **Note:**
> The below example uses Azure SQL Database, but you should select the appropriate product that you want to configure Data Discovery & Classification.

1. Go to the [Azure portal](https://portal.azure.com).

1. Go to **Data Discovery & Classification** under the **Security** heading in your Azure SQL Database pane. The Overview tab includes a summary of the current classification state of the database. The summary includes a detailed list of all classified columns, which you can also filter to show only specific schema parts, information types, and labels. If you haven't classified any columns yet, [skip to step 4](#step-4).

    Screenshot of the Overview tab with Data Discovery & Classification highlighted.

1. To download a report in Excel format, select **Export** in the top menu of the pane.

1. <a id="step-4"></a>To begin classifying your data, select the **Classification** tab on the **Data Discovery & Classification** page.

   The classification engine scans your database for columns containing potentially sensitive data and provides a list of recommended column classifications.

1. View and apply classification recommendations:

   - To view the list of recommended column classifications, select the recommendations panel at the bottom of the pane.

   - To accept a recommendation for a specific column, select the check box in the left column of the relevant row. To mark all recommendations as accepted, select the leftmost check box in the recommendations table header.

   - To apply the selected recommendations, select **Accept selected recommendations**.

   Screenshot of recommendations for classification.

   > **Note:**
   > The recommendation engine, which does automatic data discovery and provides sensitive column recommendations, is disabled when Microsoft Purview Information Protection policy mode is used.

1. You can also classify columns manually, as an alternative or in addition to the recommendation-based classification:

   1. Select **Add classification** in the top menu of the pane.

   1. In the context window that opens, select the schema, table, and column that you want to classify, and the information type and sensitivity label.

   1. Select **Add classification** at the bottom of the context window.

   Screenshot that shows how to manually add classification.

1. To complete your classification and persistently label (tag) the database columns with the new classification metadata, select **Save** in the **Classification** page.

### Microsoft Purview Information Protection policy

> **Note:**
> Microsoft Information Protection (MIP) has been rebranded as Microsoft Purview Information Protection. Both "MIP" and "Microsoft Purview Information Protection" are used interchangeably in this document, but refer to the same concept.

Microsoft Purview Information Protection labels provide a simple and uniform way for users to classify sensitive data uniformly across different Microsoft applications. MIP sensitivity labels are created and managed in the [Microsoft Purview compliance portal](https://compliance.microsoft.com/). To learn how to create and publish MIP sensitive labels in Microsoft Purview compliance portal, see [Create and publish sensitivity labels](https://learn.microsoft.com/microsoft-365/compliance/create-sensitivity-labels).

#### Prerequisites to switch to Microsoft Purview Information Protection policy

- Setting/changing information protection policy in Azure SQL Database sets the respective information protection policy for all databases under the tenant. The user or persona must have tenant wide **Security Admin** permission to change the information protection policy from SQL Information Protection policy to MIP policy, or vice versa.
- The user or persona having tenant wide **Security Admin** permission can apply policy at the tenant root management group level. For more information, see [Grant tenant-wide permissions to yourself](https://learn.microsoft.com/azure/defender-for-cloud/tenant-wide-permissions-management#grant-tenant-wide-permissions-to-yourself).

  Screenshot of Azure portal request for tenant level Security Admin permissions.

- Your tenant has an active Microsoft 365 subscription and you have labels published for the current user. For more information, see [Create and configure sensitivity labels and their policies](https://learn.microsoft.com/microsoft-365/compliance/create-sensitivity-labels).

### Classify database in Microsoft Purview Information Protection policy mode

1. Go to the [Azure portal](https://portal.azure.com).
1. Navigate to your database in Azure SQL Database
1. Go to **Data Discovery & Classification** under the **Security** heading in your database pane.
1. To select **Microsoft Information Protection policy**, select the **Overview** tab, and select **Configure**.
1. Select **Microsoft Information Protection policy** in the **Information Protection policy** options, and select **Save**.

   Screenshot of selecting Microsoft Information Protection policy for Azure SQL Database.

1. If you go to the **Classification** tab, or select **Add classification**, you see Microsoft 365 sensitivity labels appear in the **Sensitivity label** dropdown list.

   Screenshot of the Sensitivity label dropdown list.

   Screenshot of Sensitivity label in the Classification tab.

- Information type is `[n/a]` while you are in MIP policy mode and automatic data discovery & recommendations remain disabled.
- A warning icon might appear against an already classified column if the column was classified by using a different Information Protection policy than the currently active policy. For example, if the column was classified by using a label with SQL Information Protection policy earlier and you're now in Microsoft Information Protection policy mode, you see a warning icon against that specific column. The warning icon is informational and doesn't indicate a problem.

   Screenshot of warnings for classified columns because of different Information Protection policies.

<a id="enabling-access-control-for-sensitive-data-using-microsoft-purview-information-protection-policies-public-preview"></a>

### Microsoft Purview Information Protection policies for Azure SQL Database

> **Important:**
> Microsoft Purview Information Protection policies for Azure SQL Database are retired. You can no longer configure or enforce access control on sensitive columns through Microsoft Purview Information Protection (MIP) access policies, and existing access policies configured through this capability are no longer enforced.

Previously, Azure SQL Database supported enforcing access control on columns labeled with Microsoft Purview Information Protection sensitivity labels by using Purview access policies.

Microsoft Purview protection policies that control access through sensitivity labels are still available in Microsoft Fabric. For more information, see [Protection policies in Microsoft Fabric](https://learn.microsoft.com/fabric/governance/protection-policies-overview).

<a id="audit-sensitive-data"></a>

## Audit access to sensitive data

An important aspect of the classification is the ability to monitor access to sensitive data. [Azure SQL Auditing](auditing-overview.md) includes a field in the audit log called `data_sensitivity_information`. This field logs the sensitivity classifications (labels) of the data that a query returns. Here's an example:

Screenshot of the results set of a sample Audit log query.

These T-SQL activities are auditable with sensitivity information:

- `ALTER TABLE ... DROP COLUMN`
- `BULK INSERT`
- `SELECT`
- `DELETE`
- `INSERT`
- `MERGE`
- `UPDATE`
- `UPDATETEXT`
- `WRITETEXT`
- `DROP TABLE`
- `BACKUP`
- `DBCC CloneDatabase`
- `SELECT INTO`
- `INSERT INTO EXEC`
- `TRUNCATE TABLE`
- `DBCC SHOW_STATISTICS`
- `sys.dm_db_stats_histogram`

Use [sys.fn_get_audit_file](https://learn.microsoft.com/sql/relational-databases/system-functions/sys-fn-get-audit-file-transact-sql) to return information from an audit file stored in an Azure Storage account.

## Permissions

These built-in roles can read the data classification of a database:

- Owner
- Reader
- Contributor
- SQL Security Manager
- User Access Administrator

These are the required actions to read the data classification of a database are:

- Microsoft.Sql/servers/databases/currentSensitivityLabels/*
- Microsoft.Sql/servers/databases/recommendedSensitivityLabels/*
- Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels/*

These built-in roles can modify the data classification of a database:

- Owner
- Contributor
- SQL Security Manager

This is the required action to modify the data classification of a database are:

- Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels/*

Learn more about role-based permissions in [Azure RBAC](https://learn.microsoft.com/azure/role-based-access-control/overview).

> **Note:**
> The Azure SQL built-in roles in this section apply to a dedicated SQL pool (formerly SQL DW) but aren't available for dedicated SQL pools and other SQL resources within Azure Synapse workspaces. For SQL resources in Azure Synapse workspaces, use the available actions for data classification to create custom Azure roles as needed for labeling. For more information on the `Microsoft.Synapse/workspaces/sqlPools` provider operations, see [Microsoft.Synapse](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftsynapse).

## Manage classifications

You can use T-SQL, a REST API, or PowerShell to manage classifications.

### Use T-SQL

You can use T-SQL to add or remove column classifications, and to retrieve all classifications for the entire database.

> **Note:**
> When you use T-SQL to manage labels, there's no validation that labels that you add to a column exist in the organization's information-protection policy (the set of labels that appear in the portal recommendations). So, it's up to you to validate this.

For information about using T-SQL for classifications, see the following references:

- To add or update the classification of one or more columns: [ADD SENSITIVITY CLASSIFICATION](https://learn.microsoft.com/sql/t-sql/statements/add-sensitivity-classification-transact-sql)
- To remove the classification from one or more columns: [DROP SENSITIVITY CLASSIFICATION](https://learn.microsoft.com/sql/t-sql/statements/drop-sensitivity-classification-transact-sql)
- To view all classifications on the database: [sys.sensitivity_classifications](https://learn.microsoft.com/sql/relational-databases/system-catalog-views/sys-sensitivity-classifications-transact-sql)

### Use PowerShell cmdlets

Manage classifications and recommendations for Azure SQL Database and Azure SQL Managed Instance using PowerShell.

#### PowerShell cmdlets for Azure SQL Database

- [Get-AzSqlDatabaseSensitivityClassification](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabasesensitivityclassification)
- [Set-AzSqlDatabaseSensitivityClassification](https://learn.microsoft.com/powershell/module/az.sql/set-azsqldatabasesensitivityclassification)
- [Remove-AzSqlDatabaseSensitivityClassification](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqldatabasesensitivityclassification)
- [Get-AzSqlDatabaseSensitivityRecommendation](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabasesensitivityrecommendation)
- [Enable-AzSqlDatabaseSensitivityRecommendation](https://learn.microsoft.com/powershell/module/az.sql/enable-azsqldatabasesensitivityrecommendation)
- [Disable-AzSqlDatabaseSensitivityRecommendation](https://learn.microsoft.com/powershell/module/az.sql/disable-azsqldatabasesensitivityrecommendation)

#### PowerShell cmdlets for Azure SQL Managed Instance

- [Get-AzSqlInstanceDatabaseSensitivityClassification](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlinstancedatabasesensitivityclassification)
- [Set-AzSqlInstanceDatabaseSensitivityClassification](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlinstancedatabasesensitivityclassification)
- [Remove-AzSqlInstanceDatabaseSensitivityClassification](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqlinstancedatabasesensitivityclassification)
- [Get-AzSqlInstanceDatabaseSensitivityRecommendation](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlinstancedatabasesensitivityrecommendation)
- [Enable-AzSqlInstanceDatabaseSensitivityRecommendation](https://learn.microsoft.com/powershell/module/az.sql/enable-azsqlinstancedatabasesensitivityrecommendation)
- [Disable-AzSqlInstanceDatabaseSensitivityRecommendation](https://learn.microsoft.com/powershell/module/az.sql/disable-azsqlinstancedatabasesensitivityrecommendation)

### Use the REST API

You can use the REST API to programmatically manage classifications and recommendations. The published REST API supports the following operations:

- [Create Or Update](https://learn.microsoft.com/rest/api/sql/sensitivity-labels/create-or-update): Creates or updates the sensitivity label of the specified column.
- [Delete](https://learn.microsoft.com/rest/api/sql/sensitivity-labels/delete): Deletes the sensitivity label of the specified column.
- [Disable Recommendation](https://learn.microsoft.com/rest/api/sql/sensitivity-labels/disable-recommendation): Disables sensitivity recommendations on the specified column.
- [Enable Recommendation](https://learn.microsoft.com/rest/api/sql/sensitivity-labels/enable-recommendation): Enables sensitivity recommendations on the specified column. (Recommendations are enabled by default on all columns.)
- [Get](https://learn.microsoft.com/rest/api/sql/sensitivity-labels/get): Gets the sensitivity label of the specified column.
- [List Current By Database](https://learn.microsoft.com/rest/api/sql/sensitivity-labels/list-current-by-database): Gets the current sensitivity labels of the specified database.
- [List Recommended By Database](https://learn.microsoft.com/rest/api/sql/sensitivity-labels/list-recommended-by-database): Gets the recommended sensitivity labels of the specified database.

## Retrieve classifications metadata using SQL drivers

You can use the following SQL drivers to retrieve classification metadata:

- [Microsoft.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/sql/data-classification)
- [ODBC Driver](https://learn.microsoft.com/sql/connect/odbc/data-classification)
- [OLE DB Driver](https://learn.microsoft.com/sql/connect/oledb/features/using-data-classification)
- [JDBC Driver](https://learn.microsoft.com/sql/connect/jdbc/data-discovery-classification-sample)
- [Microsoft Drivers for PHP for SQL Server](https://learn.microsoft.com/sql/connect/php/release-notes-php-sql-driver)

## FAQ - Advanced classification capabilities

**Question**: Will [Microsoft Purview](https://learn.microsoft.com/azure/purview/overview) replace SQL Data Discovery & Classification or will SQL Data Discovery & Classification be retired soon?
**Answer**: We continue to support SQL Data Discovery & Classification and encourage you to adopt [Microsoft Purview](https://learn.microsoft.com/azure/purview/overview) which has richer capabilities to drive advanced classification capabilities and data governance. If we decide to retire any service, feature, API or SKU, you'll receive advance notice including a migration or transition path. For more information, see the [Microsoft Lifecycle policies](https://learn.microsoft.com/lifecycle/index).

## Related content

- Consider configuring [Azure SQL Auditing](auditing-overview.md) for monitoring and auditing access to your classified sensitive data.
- For a presentation that includes data Discovery & Classification, see [Discovering, classifying, labeling & protecting SQL data | Data Exposed](https://www.youtube.com/watch?v=itVi9bkJUNc).
- To register and scan an Azure SQL database so Microsoft Purview can apply sensitivity labels, see [Discover and govern Azure SQL Database in Microsoft Purview](https://learn.microsoft.com/purview/register-scan-azure-sql-database).
