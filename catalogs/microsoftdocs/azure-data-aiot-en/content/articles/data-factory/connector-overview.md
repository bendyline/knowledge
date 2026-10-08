---
title: Connector overview 
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn the supported connectors in Azure Data Factory and Azure Synapse Analytics pipelines.
author: simplywilson
ms.subservice: data-movement
ms.custom: synapse
ms.topic: concept-article
ms.date: 09/30/2025
ms.author: tinglee
---

# Azure Data Factory and Azure Synapse Analytics connector overview

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Azure Data Factory and Azure Synapse Analytics pipelines support the following data stores and formats via Copy, Data Flow, Look up, Get Metadata, and Delete activities. Select each data store to learn the supported capabilities and the corresponding configurations in details.

## Supported data stores


> **Note:**
> Connectors marked *Preview* are available to try, but are not recommended for production workloads. Certain features might not be supported or might have constrained capabilities.

| Category | Data store | [Copy activity](copy-activity-overview.md)  (source/sink) | [Mapping Data Flow](concepts-data-flow-overview.md) (source/sink) | [Lookup Activity](control-flow-lookup-activity.md) | [Get Metadata Activity](control-flow-get-metadata-activity.md)/[Validation Activity](control-flow-validation-activity.md) | [Delete Activity](delete-activity.md) | [Managed private endpoint](managed-virtual-network-private-endpoint.md#managed-private-endpoints) |
| :--- | :--- | :--- | :--- | :--- | --- | :--- | :--- |
| **Azure** | [Azure Blob Storage](connector-azure-blob-storage.md) | ✓/✓ | ✓/✓ | ✓ | ✓ | ✓ | ✓Exclude storage account V1 |
| &nbsp; | [Azure Cognitive Search Index](connector-azure-search.md) | −/✓ |  |  |  |  | ✓ |
| &nbsp; | [Azure Cosmos DB for NoSQL](connector-azure-cosmos-db.md) | ✓/✓ | ✓/✓ | ✓ |  |  | ✓ |
| &nbsp; | [Azure Cosmos DB for PostgreSQL](https://learn.microsoft.com/azure/cosmos-db/postgresql/howto-ingest-azure-data-factory) | ✓/✓ | ✓/✓ | ✓ |  |  |  |
| &nbsp; | [Azure Cosmos DB for MongoDB](connector-azure-cosmos-db-mongodb-api.md) | ✓/✓ |  |  |  |  | ✓ |
| &nbsp; | [Azure Data Explorer](connector-azure-data-explorer.md) | ✓/✓ | ✓/✓ | ✓ |  | ✓ |  |
| &nbsp; | [Azure Data Lake Storage Gen1](connector-azure-data-lake-store.md) | ✓/✓ | ✓/✓ | ✓ | ✓ | ✓ |  |
| &nbsp; | [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage.md) | ✓/✓ | ✓/✓ | ✓ | ✓ | ✓ | ✓ |
| &nbsp; | [Azure Database for MariaDB](connector-azure-database-for-mariadb.md) | ✓/− |  | ✓ |  |  | ✓ |
| &nbsp; | [Azure Database for MySQL](connector-azure-database-for-mysql.md) | ✓/✓ | ✓/✓ | ✓ |  |  | ✓ |
| &nbsp; | [Azure Database for PostgreSQL](connector-azure-database-for-postgresql.md) | ✓/✓ | ✓/✓ | ✓ |  |  | ✓ |
| &nbsp; | [Azure Databricks Delta Lake](connector-azure-databricks-delta-lake.md) | ✓/✓ | ✓/✓ Use [delta format](format-delta.md) | ✓ |  |  |  |
| &nbsp; | [Azure Files](connector-azure-file-storage.md) | ✓/✓ |  | ✓ | ✓ | ✓ | ✓Exclude storage account V1 |
| &nbsp; | [Azure SQL Database](connector-azure-sql-database.md) | ✓/✓ | ✓/✓ <br> | ✓ | ✓ |  | ✓ |
| &nbsp; | [Azure SQL Managed Instance](connector-azure-sql-managed-instance.md) | ✓/✓ | ✓/✓ <br> | ✓ | ✓ |  | ✓ |
| &nbsp; | [Azure Synapse Analytics](connector-azure-sql-data-warehouse.md) | ✓/✓ | ✓/✓ | ✓ | ✓ |  | ✓ |
| &nbsp; | [Azure Table Storage](connector-azure-table-storage.md) | ✓/✓ |  | ✓ |  |  | ✓Exclude storage account V1 |
| **Database** | [Amazon RDS for Oracle](connector-amazon-rds-for-oracle.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Amazon RDS for SQL Server](connector-amazon-rds-for-sql-server.md) | ✓/− |  | ✓ | ✓ |  |  |
| &nbsp; | [Amazon Redshift](connector-amazon-redshift.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [DB2](connector-db2.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Drill](connector-drill.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Google BigQuery](connector-google-bigquery.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Greenplum](connector-greenplum.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [HBase](connector-hbase.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Hive](connector-hive.md) | ✓/− | ✓/− | ✓ |  |  |  |
| &nbsp; | [Apache Impala](connector-impala.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Informix](connector-informix.md) | ✓/✓ |  | ✓ |  |  |  |
| &nbsp; | [MariaDB](connector-mariadb.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Microsoft Access](connector-microsoft-access.md) | ✓/✓ |  | ✓ |  |  |  |
| &nbsp; | [MySQL](connector-mysql.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Netezza](connector-netezza.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Oracle](connector-oracle.md) | ✓/✓ |  | ✓ |  |  |  |
| &nbsp; | [Phoenix](connector-phoenix.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [PostgreSQL](connector-postgresql.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Presto](connector-presto.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [SAP Business Warehouse Open Hub](connector-sap-business-warehouse-open-hub.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [SAP Business Warehouse via MDX](connector-sap-business-warehouse.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [SAP HANA](connector-sap-hana.md) | ✓/✓ |  | ✓ |  |  |  |
| &nbsp; | [SAP Table](connector-sap-table.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Snowflake](connector-snowflake.md) | ✓/✓ | ✓/✓ | ✓ |  |  |  |
| &nbsp; | [Spark](connector-spark.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [SQL Server](connector-sql-server.md) | ✓/✓ | ✓/✓ Use [Managed VNET](managed-virtual-network-private-endpoint.md) | ✓ | ✓ |  |  |
| &nbsp; | [Sybase](connector-sybase.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Teradata](connector-teradata.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Vertica](connector-vertica.md) | ✓/− |  | ✓ |  |  |  |
| **NoSQL** | [Cassandra](connector-cassandra.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Couchbase (Preview)](connector-couchbase.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [MongoDB](connector-mongodb.md) | ✓/✓ |  |  |  |  |  |
| &nbsp; | [MongoDB Atlas](connector-mongodb-atlas.md) | ✓/✓ |  |  |  |  |  |
| **File** | [Amazon S3](connector-amazon-simple-storage-service.md) | ✓/− | ✓/✓ | ✓ | ✓ | ✓ |  |
| &nbsp; | [Amazon S3 Compatible Storage](connector-amazon-s3-compatible-storage.md) | ✓/− |  | ✓ | ✓ | ✓ |  |
| &nbsp; | [File System](connector-file-system.md) | ✓/✓ |  | ✓ | ✓ | ✓ |  |
| &nbsp; | [FTP](connector-ftp.md) | ✓/− |  | ✓ | ✓ | ✓ |  |
| &nbsp; | [Google Cloud Storage](connector-google-cloud-storage.md) | ✓/− |  | ✓ | ✓ | ✓ |  |
| &nbsp; | [HDFS](connector-hdfs.md) | ✓/− |  | ✓ |  | ✓ |  |
| &nbsp; | [Oracle Cloud Storage](connector-oracle-cloud-storage.md) | ✓/− |  | ✓ | ✓ | ✓ |  |
| &nbsp; | [SFTP](connector-sftp.md) | ✓/✓ | ✓/✓ | ✓ | ✓ | ✓ |  |
| **Generic protocol** | [Generic HTTP](connector-http.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Generic OData](connector-odata.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Generic ODBC](connector-odbc.md) | ✓/✓ |  | ✓ |  |  |  |
| &nbsp; | [Generic REST](connector-rest.md) | ✓/✓ | ✓/✓ |  |  |  |  |
| **Microsoft Fabric** | [Microsoft Fabric Lakehouse](connector-microsoft-fabric-lakehouse.md) | ✓/✓ | ✓/✓ |  |  |  |  |
| &nbsp; | [Microsoft Fabric Warehouse](connector-microsoft-fabric-warehouse.md) | ✓/✓ | ✓/✓ | ✓ | ✓ |  | ✓ |
| **Services and apps** | [Amazon Marketplace Web Service (Deprecated)](connector-amazon-marketplace-web-service.md) |  |  |  |  |  |
| &nbsp; | [Appfigures (Preview)](connector-appfigures.md) |  | ✓/- |  |  |  |  |
| &nbsp; | [Asana (Preview)](connector-asana.md) |  | ✓/− |  |  |  |  |
| &nbsp; | [Concur (Preview)](connector-concur.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [data.world (Preview)](connector-dataworld.md) |  | ✓/− |  |  |  |  |
| &nbsp; | [Dataverse](connector-dynamics-crm-office-365.md) | ✓/✓ | ✓/✓ | ✓ |  |  |  |
| &nbsp; | [Dynamics 365](connector-dynamics-crm-office-365.md) | ✓/✓ | ✓/✓ | ✓ |  |  |  |
| &nbsp; | [Dynamics AX](connector-dynamics-ax.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Dynamics CRM](connector-dynamics-crm-office-365.md) | ✓/✓ | ✓/✓ | ✓ |  |  |  |
| &nbsp; | [GitHub](connector-github.md) |  | For Common Data Model entity reference |  |  |  |  |
| &nbsp; | [Google AdWords](connector-google-adwords.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Google Sheets (Preview)](connector-google-sheets.md) |  | ✓/− |  |  |  |  |
| &nbsp; | [HubSpot](connector-hubspot.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Jira](connector-jira.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Magento (Preview)](connector-magento.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Marketo (Preview)](connector-marketo.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Microsoft 365](connector-office-365.md) | ✓/− | ✓/− | ✓ |  |  |  |
| &nbsp; | [Oracle Eloqua (Preview)](connector-oracle-eloqua.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Oracle Responsys (Preview)](connector-oracle-responsys.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Oracle Service Cloud (Preview)](connector-oracle-service-cloud.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [PayPal (Preview)](connector-paypal.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Quickbase (Preview)](connector-quickbase.md) |  | ✓/− |  |  |  |  |
| &nbsp; | [QuickBooks (Preview)](connector-quickbooks.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Salesforce](connector-salesforce.md) | ✓/✓ |  | ✓ |  |  |  |
| &nbsp; | [Salesforce Service Cloud](connector-salesforce-service-cloud.md) | ✓/✓ |  | ✓ |  |  |  |
| &nbsp; | [Salesforce Marketing Cloud](connector-salesforce-marketing-cloud.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [SAP Cloud for Customer (C4C)](connector-sap-cloud-for-customer.md) | ✓/✓ |  | ✓ |  |  |  |
| &nbsp; | [SAP ECC](connector-sap-ecc.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [ServiceNow](connector-servicenow.md) | ✓/− |  | ✓ |  |  |  |
|  | [SharePoint Online List](connector-sharepoint-online-list.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Shopify (Preview)](connector-shopify.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Smartsheet (Preview)](connector-smartsheet.md) |  | ✓/− |  |  |  |  |
| &nbsp; | [Square (Preview)](connector-square.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [TeamDesk (Preview)](connector-teamdesk.md) |  | ✓/− |  |  |  |  |
| &nbsp; | [Twilio (Preview)](connector-twilio.md) |  | ✓/− |  |  |  |  |
| &nbsp; | [Web Table (HTML table)](connector-web-table.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Xero](connector-xero.md) | ✓/− |  | ✓ |  |  |  |
| &nbsp; | [Zendesk (Preview)](connector-zendesk.md) |  | ✓/− |  |  |  |  |
| &nbsp; | [Zoho (Preview)](connector-zoho.md) | ✓/− |  | ✓ |  |  |  |


## Integrate with more data stores

Azure Data Factory and Synapse pipelines can reach broader set of data stores than the list mentioned above. If you need to move data to/from a data store that isn't in the service built-in connector list, here are some extensible options:
- For database and data warehouse, usually you can find a corresponding ODBC driver, with which you can use [generic ODBC connector](connector-odbc.md).
- For SaaS applications:
    - If it provides RESTful APIs, you can use [generic REST connector](connector-rest.md).
    - If it has OData feed, you can use [generic OData connector](connector-odata.md).
    - If it provides SOAP APIs, you can use [generic HTTP connector](connector-http.md).
    - If it has ODBC driver, you can use [generic ODBC connector](connector-odbc.md).
- For others, check if you can load data to or expose data as any supported data stores, for example, Azure Blob/File/FTP/SFTP/etc, then let the service pick up from there. You can invoke custom data loading mechanism via [Azure Function](control-flow-azure-function-activity.md), [Custom activity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/transform-data-using-dotnet-custom-activity.md), [Databricks](transform-data-databricks-notebook.md)/[HDInsight](transform-data-using-hadoop-hive.md), [Web activity](control-flow-web-activity.md), etc.

## Supported file formats

The following file formats are supported. Refer to each article for format-based settings.

- [Avro format](format-avro.md)
- [Binary format](format-binary.md)
- [Common Data Model format](format-common-data-model.md)
- [Delimited text format](format-delimited-text.md)
- [Delta format](format-delta.md)
- [Excel format](format-excel.md)
- [Iceberg format](format-iceberg.md)
- [JSON format](format-json.md)
- [ORC format](format-orc.md)
- [Parquet format](format-parquet.md)
- [XML format](format-xml.md)

## Support TLS 1.3

Transport Layer Security (TLS) is a widely adopted security protocol that's designed to secure connections and communications between servers and clients. In Azure App Service, you can use TLS and Secure Sockets Layer (SSL) certificates to help secure incoming requests in your web apps. TLS 1.3 is the latest and most secure version. For more information, see this [article](https://learn.microsoft.com/azure/app-service/overview-tls). The following connectors support TLS 1.3 for Copy activity:
 
- [Amazon RDS for SQL Server (version 2.0)](connector-amazon-rds-for-sql-server.md)
- [Azure Data Explorer](connector-azure-data-explorer.md)
- [Azure Database for PostgreSQL (version 2.0)](connector-azure-database-for-postgresql.md)
- [Azure File Storage](connector-azure-file-storage.md)
- [Azure SQL Database (version 2.0)](connector-azure-sql-database.md)
- [Azure SQL Managed Instance (version 2.0)](connector-azure-sql-managed-instance.md)
- [Azure Synapse Analytics (version 2.0)](connector-azure-sql-data-warehouse.md)
- [Azure Table Storage](connector-azure-table-storage.md)
- [DB2](connector-db2.md)
- [Oracle (version 2.0)](connector-oracle.md)
- [PostgreSQL V2](connector-postgresql.md)
- [Snowflake V2](connector-snowflake.md)
- [SQL Server (version 2.0)](connector-sql-server.md)


## Related content

- [Copy activity](copy-activity-overview.md)
- [Mapping Data Flow](concepts-data-flow-overview.md)
- [Lookup Activity](control-flow-lookup-activity.md)
- [Get Metadata Activity](control-flow-get-metadata-activity.md)
- [Delete Activity](delete-activity.md)
