---
title: "sys.endpoint_webmethods (Transact-SQL)"
description: sys.endpoint_webmethods contains a row for each SOAP method defined on a SOAP-enabled HTTP endpoint.
author: rwestMSFT
ms.author: randolphwest
ms.date: 02/05/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.endpoint_webmethods_TSQL"
  - "sys.endpoint_webmethods"
  - "endpoint_webmethods_TSQL"
  - "sys.http_soap_methods_TSQL"
  - "endpoint_webmethods"
  - "sys.http_soap_methods"
helpviewer_keywords:
  - "sys.endpoint_webmethods catalog view"
dev_langs:
  - "TSQL"
---
# sys.endpoint_webmethods (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 

Returns a row for each SOAP method defined on a SOAP-enabled HTTP endpoint. The combination of the endpoint_id and namespace columns is unique.

| Column name | Data type | Description |
| --- | --- | --- |
| `endpoint_id` | **int** | ID of the endpoint that the webmethod is defined on. |
| `namespace` | **nvarchar(384)** | Namespace for the webmethod. |
| method_alias | **nvarchar(64)** | Alias for the method.<br /><br /> Note:  Transact-SQL  identifiers allow characters that aren't legal in WSDL method names.<br /><br /> The alias is used to map the name exposed in the WSDL description of the endpoint to the actual underlying  Transact-SQL  executable object that is called when the webmethod is invoked. |
| object_name | **nvarchar(776)** | The object name that the webmethod is redirected to, as specified in the NAME = option. Name parts are separated by a period (.), and delimited using brackets, `[``]`.<br /><br /> The object name must be a three-part name, as specified in the WSDL option. |
| result_schema | **tinyint** | Option that determines which, if any, XSD is sent back with a response.<br /><br /> 0 = None<br /><br /> 1 = Standard<br /><br /> 2 = Default |
| result_schema_desc | **nvarchar(60)** | Description of option that determines which, if any, XSD is sent back with a response.<br /><br /> NONE<br /><br /> STANDARD<br /><br /> DEFAULT |
| result_format | **tinyint** | Option that determines how results are formatted in the response.<br /><br /> 1 = ALL_RESULTS<br /><br /> 2 = ROWSETS_ONLY<br /><br /> 3 = NONE |
| result_format_desc | **nvarchar(60)** | Description of the option that determines how results are formatted in the response.<br /><br /> ALL_RESULTS<br /><br /> ROWSETS_ONLY<br /><br /> NONE |
  
## Permissions

The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).

 SQL Server 2022 (16.x) 
 and later versions require VIEW SERVER SECURITY STATE permission on the server.

## Related content

- [Endpoints Catalog Views (Transact-SQL)](endpoints-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
