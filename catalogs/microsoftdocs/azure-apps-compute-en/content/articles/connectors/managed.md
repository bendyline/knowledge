---
title: Managed Connectors Overview
description: Learn about Microsoft-managed connectors hosted on Azure in Azure Logic Apps.
services: logic-apps
ms.suite: integration
ms.reviewers: estfan, azla
ms.topic: concept-article
ms.update-cycle: 1095-days
ms.date: 03/09/2026
ms.custom: engagement-fy23
#Customer intent: As an integration developer who works with Azure Logic Apps, I want to learn about shared connectors, which run in multitenant Azure, and how they differ from built-in counterparts that run alongside the runtime in Azure Logic Apps.
---

# Managed connectors in Azure Logic Apps

Managed connectors provide ways for you to access other services and systems where built-in connectors aren't available. You can use these triggers and actions to create workflows that integrate data, apps, cloud-based services, and on-premises systems. Different from built-in connectors, managed connectors are usually tied to a specific service or system such as Office 365, SharePoint, Azure Key Vault, Salesforce, Azure Automation, and so on. Managed by Microsoft and hosted in Azure, managed connectors usually require that you first create a connection from your workflow and authenticate your identity.

For a smaller number of services, systems and protocols, Azure Logic Apps provides a built-in version alongside the managed version. The number and range of built-in connectors vary based on whether you create a Consumption logic app workflow that runs in multitenant Azure Logic Apps or a Standard logic app workflow that runs in single-tenant Azure Logic Apps. In most cases, the built-in version provides better performance, capabilities, pricing, and so on. In a few cases, some built-in connectors are available only in one logic app workflow type, and not the other.

For example, a Standard workflow can use both managed connectors and built-in connectors for Azure Blob, Azure Cosmos DB, Azure Event Hubs, Azure Service Bus, DB2, FTP, MQ, SFTP, and SQL Server, while a Consumption workflow doesn't have the built-in versions. A Consumption workflow can use built-in connectors for Azure API Management, Azure App Services, and Batch, while a Standard workflow doesn't have these built-in connectors. For more information, see:

- [Built-in connectors in Azure Logic Apps](built-in.md)
- [Single-tenant versus multitenant in Azure Logic Apps](../logic-apps/single-tenant-overview-compare.md)

This guide provides a general overview about managed connectors and the way they're classified based on pricing and how they're billed or *metered*. For technical reference information about each managed connector in Azure Logic Apps, see [Connectors reference for Azure Logic Apps](https://learn.microsoft.com/connectors/connector-reference/connector-reference-logicapps-connectors).

## Managed connector categories

For both Consumption and Standard logic app workflows, managed connectors appear in the connector gallery under the **Shared** label, which describes how these connectors are hosted and run in global, multitenant Azure. Based on the specific managed connector, pricing follows different models:

- [Standard priced connectors](#standard-connectors) provide access to services such as Azure Blob Storage, Office 365, SharePoint, Salesforce, Power BI, OneDrive, and many more.
- [Enterprise priced connectors](#enterprise-connectors) provide access to enterprise systems, such as SAP, IBM MQ, and IBM 3270 for an additional cost.

Although managed connectors follow either Standard or Enterprise pricing in both Consumption and Standard workflows, billing or metering for managed connector usage differs based on whether your workflow is Consumption or Standard. For more information, see:

- [Trigger and action operations in the Consumption model](../logic-apps/logic-apps-pricing.md#consumption-operations)
- [Trigger and action operations in the Standard model](../logic-apps/logic-apps-pricing.md#standard-operations)

Some managed connectors also fall into the following informal groups:

* [On-premises connectors](#on-premises-connectors) provide access to on-premises systems such as SQL Server, SharePoint Server, SAP, Oracle DB, file shares, and others.

* [Integration account connectors](#integration-account-connectors) help you transform and validate XML, encode and decode flat files, and process business-to-business (B2B) messages using AS2, EDIFACT, and X12 protocols.

<a name="standard-connectors"></a>

## Standard connectors

This section lists only *some* of the popular managed connectors that follow the Standard pricing model:



[Azure Blob Storage icon][azure-blob-storage-doc]
<br><br>[**Azure Blob Storage**][azure-blob-storage-doc]
<br><br>Connect to your Azure Storage account so that you can create and manage blob content.


[Azure Event Hubs icon][azure-event-hubs-doc]
<br><br>[**Azure Event Hubs**][azure-event-hubs-doc]
<br><br>Consume and publish events through an event hub. For example, get output from your workflow with Event Hubs, and then send that output to a real-time analytics provider.


[Azure Queues icon][azure-queues-doc]
<br><br>[**Azure Queues**][azure-queues-doc]
<br><br>Connect to your Azure Storage account so that you can create and manage queues and messages.


[Azure Service Bus icon][azure-service-bus-doc]
<br><br>[**Azure Service Bus**][azure-service-bus-doc]
<br><br>Manage asynchronous messages, sessions, and topic subscriptions with the most commonly used connector in Logic Apps.




[Azure Table Storage icon][azure-table-storage-doc]
<br><br>[**Azure Table Storage**][azure-table-storage-doc]
<br><br>Connect to your Azure Storage account so that you can create, update, query, and manage tables.


[File System icon][file-system-doc]
<br><br>[**File System**][file-system-doc]
<br><br>Connect to your on-premises file share so that you can create and manage files.


[FTP icon][ftp-doc]
<br><br>[**FTP**][ftp-doc]
<br><br>Connect to FTP servers you can access from the internet so that you can work with your files and folders.


[Office 365 Outlook icon][office-365-outlook-doc]
<br><br>[**Office 365 Outlook**][office-365-outlook-doc]
<br><br>Connect to your work or school email account so that you can create and manage emails, tasks, calendar events and meetings, contacts, requests, and more.




[Salesforce icon][salesforce-doc]
<br><br>[**Salesforce**][salesforce-doc]
<br><br>Connect to your Salesforce account so that you can create and manage items such as records, jobs, objects, and more.


[SharePoint Online icon][sharepoint-online-doc]
<br><br>[**SharePoint Online**][sharepoint-online-doc]
<br><br>Connect to SharePoint Online so that you can manage files, attachments, folders, and more.


[SFTP-SSH icon][sftp-ssh-doc]
<br><br>[**SFTP-SSH**][sftp-ssh-doc]
<br><br>Connect to SFTP servers that you can access from the internet by using SSH so that you can work with your files and folders.


[SQL Server icon][sql-server-doc]
<br><br>[**SQL Server**][sql-server-doc]
<br><br>Connect to your SQL Server on premises or an Azure SQL Database in the cloud so that you can manage records, run stored procedures, or perform queries.



<a name="enterprise-connectors"></a>

## Enterprise connectors

This section lists only *some* of the popular managed connectors that follow the Enterprise pricing model and provide access to enterprise systems for an additional cost:



[IBM 3270 icon][ibm-3270-doc]
<br><br>[**IBM 3270**][ibm-3270-doc]


[IBM MQ icon][ibm-mq-doc]
<br><br>[**MQ**][ibm-mq-doc]


[SAP icon][sap-connector-doc]
<br><br>[**SAP**][sap-connector-doc]





<a name="on-premises-connectors"></a>

## On-premises connectors

Before you can create a connection to an on-premises system, you must first [download, install, and set up an on-premises data gateway][gateway-doc]. This gateway provides a secure communication channel without having to set up the necessary network infrastructure.

For a Consumption workflow, this section lists example [Standard connectors](#standard-connectors) that can access on-premises systems. For the expanded on-premises connectors list, see [Supported data sources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-gateway-connection.md#supported-connections).



[Apache Impala][apache-impala-doc]
<br><br>[**Apache Impala**][apache-impala-doc]


[Biztalk Server icon][biztalk-server-doc]
<br><br>[**Biztalk Server**][biztalk-server-doc]


[File System icon][file-system-doc]
<br><br>[**File System**][file-system-doc]


[IBM DB2 icon][ibm-db2-doc]
<br><br>[**IBM DB2**][ibm-db2-doc]


[IBM Informix icon][ibm-informix-doc]
<br><br>[**IBM Informix**][ibm-informix-doc]


[MySQL icon][mysql-doc]
<br><br>[**MySQL**][mysql-doc]




[Oracle DB icon][oracle-db-doc]
<br><br>[**Oracle DB**][oracle-db-doc]


[PostgreSQL icon][postgre-sql-doc]
<br><br>[**PostgreSQL**][postgre-sql-doc]


[SAP icon][sap-connector-doc]
<br><br>[**SAP**][sap-connector-doc]


[SharePoint Server icon][sharepoint-server-doc]
<br><br>[**SharePoint Server**][sharepoint-server-doc]


[SQL Server icon][sql-server-doc]
<br><br>[**SQL Server**][sql-server-doc]


[Teradata icon][teradata-doc]
<br><br>[**Teradata**][teradata-doc]



<a name="integration-account-connectors"></a>

## Integration account connectors

Integration account operations support business-to-business (B2B) communication scenarios in Azure Logic Apps. After you create an integration account and define your B2B artifacts, such as trading partners, agreements, and others, you can use integration account connectors to encode and decode messages, transform content, and more.

For example, if you use Microsoft BizTalk Server, you can create a connection from your workflow using the [on-premises BizTalk Server connector](https://learn.microsoft.com/connectors/biztalk/). You can then extend or perform BizTalk-like operations in your workflow by using these integration account connectors.

* Consumption workflows

  Before you use any integration account operations in a Consumption workflow, you have to [link your logic app resource to your integration account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-enterprise-integration-create-integration-account.md).

* Standard workflows

  Integration account operations don't require that you link your logic app resource to your integration account. Instead, you create a connection to your integration account when you add the operation to your Standard workflow.

For more information, review the following documentation:

* [Business-to-business (B2B) enterprise integration workflows](../logic-apps/logic-apps-enterprise-integration-overview.md)
* [Create and manage integration accounts for B2B workflows](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-enterprise-integration-create-integration-account.md)



[AS2 Decode v2 icon][as2-doc]
<br><br>[**AS2 Decode (v2)**][as2-doc]


[AS2 Encode (v2) icon][as2-doc]
<br><br>[**AS2 Encode (v2)**][as2-doc]


[AS2 decoding icon][as2-doc]
<br><br>[**AS2 decoding**][as2-doc]


[AS2 encoding icon][as2-doc]
<br><br>[**AS2 encoding**][as2-doc]




[EDIFACT decoding icon][edifact-decode-doc]
<br><br>[**EDIFACT decoding**][edifact-decode-doc]


[EDIFACT encoding icon][edifact-encode-doc]
<br><br>[**EDIFACT encoding**][edifact-encode-doc]


[X12 decoding icon][x12-decode-doc]
<br><br>[**X12 decoding**][x12-decode-doc]


[X12 encoding icon][x12-encode-doc]
<br><br>[**X12 encoding**][x12-encode-doc]



## Related content

- [Create custom APIs you can call from Azure Logic Apps](../logic-apps/logic-apps-create-api-app.md)

<!--Managed connector icons-->
[apache-impala-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/apache-impala.png
[appfigures-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/appfigures.png
[asana-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/asana.png
[azure-automation-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-automation.png
[azure-blob-storage-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-blob-storage.png
[azure-cognitive-services-text-analytics-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-cognitive-services-text-analytics.png
[azure-cosmos-db-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-cosmos-db.png
[azure-data-lake-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-data-lake.png
[azure-devops-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-devops.png
[azure-document-db-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-document-db.png
[azure-event-grid-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-event-grid.png
[azure-event-grid-publish-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-event-grid-publish.png
[azure-event-hubs-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-event-hubs.png
[azure-file-storage-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-file-storage.png
[azure-key-vault-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-key-vault.png
[azure-ml-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-ml.png
[azure-monitor-logs-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-monitor-logs.png
[azure-queues-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-queue-storage.png
[azure-resource-manager-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-resource-manager.png
[azure-service-bus-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-service-bus.png
[azure-sql-data-warehouse-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-sql-data-warehouse.png
[azure-table-storage-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/azure-table-storage.png
[basecamp-3-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/basecamp.png
[bitbucket-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/bitbucket.png
[bitly-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/bitly.png
[biztalk-server-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/biztalk.png
[blogger-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/blogger.png
[campfire-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/campfire.png
[common-data-service-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/common-data-service.png
[dynamics-365-financials-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/dynamics-365-financials.png
[dynamics-365-operations-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/dynamics-365-operations.png
[easy-redmine-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/easyredmine.png
[file-system-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/file-system.png
[ftp-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/ftp.png
[github-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/github.png
[google-calendar-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/google-calendar.png
[google-drive-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/google-drive.png
[google-sheets-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/google-sheet.png
[google-tasks-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/google-tasks.png
[hipchat-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/hipchat.png
[ibm-3270-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/ibm-3270.png
[ibm-db2-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/ibm-db2.png
[ibm-informix-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/ibm-informix.png
[ibm-mq-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/ibm-mq.png
[insightly-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/insightly.png
[instagram-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/instagram.png
[instapaper-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/instapaper.png
[jira-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/jira.png
[mandrill-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/mandrill.png
[mysql-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/mysql.png
[office-365-outlook-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/office-365.png
[onedrive-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/onedrive.png
[onedrive-for-business-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/onedrive-business.png
[oracle-db-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/oracle-db.png
[outlook.com-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/outlook.png
[pagerduty-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/pagerduty.png
[pinterest-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/pinterest.png
[postgre-sql-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/postgre-sql.png
[project-online-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/projecton-line.png
[redmine-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/redmine.png
[salesforce-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/salesforce.png
[sap-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/sap.png
[send-grid-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/sendgrid.png
[sftp-ssh-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/sftp.png
[sharepoint-online-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/sharepoint-online.png
[sharepoint-server-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/sharepoint-server.png
[slack-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/slack.png
[smartsheet-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/smartsheet.png
[smtp-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/smtp.png
[sparkpost-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/sparkpost.png
[sql-server-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/sql.png
[teradata-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/teradata.png
[todoist-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/todoist.png
[twilio-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/twilio.png
[vimeo-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/vimeo.png
[wordpress-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/wordpress.png
[youtube-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/youtube.png

<!--Managed connector doc links-->
[apache-impala-doc]: https://learn.microsoft.com/connectors/impala/ "Connect to your Impala database to read data from tables"
[azure-automation-doc]: https://learn.microsoft.com/connectors/azureautomation/ "Create and manage automation jobs for your cloud and on-premises infrastructure"
[azure-blob-storage-doc]: connectors-create-api-azureblobstorage.md "Manage files in your blob container with Azure blob storage connector"
[azure-cosmos-db-doc]: connectors-create-api-cosmos-db.md "Connect to Azure Cosmos DB so that you can access and manage Azure Cosmos DB documents"
[azure-event-grid-doc]: ../event-grid/monitor-virtual-machine-changes-logic-app.md "Monitor events published by an Event Grid, for example, when Azure resources or third-party resources change"
[azure-event-hubs-doc]: connectors-create-api-azure-event-hubs.md "Connect to Azure Event Hubs so that you can receive and send events between logic app workflows and Event Hubs"
[azure-file-storage-doc]: https://learn.microsoft.com/connectors/azurefile/ "Connect to your Azure Storage account so that you can create, update, get, and delete files"
[azure-key-vault-doc]: https://learn.microsoft.com/connectors/keyvault/ "Connect to your Azure Key Vault so that you can manage your secrets and keys"
[azure-monitor-logs-doc]: https://learn.microsoft.com/connectors/azuremonitorlogs/ "Run queries against Azure Monitor Logs across Log Analytics workspaces and Application Insights components"
[azure-queues-doc]: https://learn.microsoft.com/connectors/azurequeues/ "Connect to your Azure Storage account so that you can create and manage queues and messages"
[azure-service-bus-doc]: connectors-create-api-servicebus.md "Manage messages from Service Bus queues, topics, and topic subscriptions"
[azure-sql-data-warehouse-doc]: https://learn.microsoft.com/connectors/sqldw/ "Connect to Azure Synapse Analytics so that you can view your data"
[azure-table-storage-doc]: https://learn.microsoft.com/connectors/azuretables/ "Connect to your Azure Storage account so that you can create, update, and query tables and more"
[biztalk-server-doc]: https://learn.microsoft.com/connectors/biztalk/ "Connect to your BizTalk Server so that you can run BizTalk-based applications side by side with Azure Logic Apps"
[file-system-doc]: file-system.md "Connect to an on-premises file system"
[ftp-doc]: connectors-create-api-ftp.md "Connect to an FTP / FTPS server for FTP tasks, like uploading, getting, deleting files, and more"
[github-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-github.md "Connect to GitHub and track issues"
[google-calendar-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-googlecalendar.md "Connects to Google Calendar and can manage calendar"
[google-sheets-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-googlesheet.md "Connect to Google Sheets so that you can modify your sheets"
[google-tasks-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-googletasks.md "Connects to Google Tasks so that you can manage your tasks"
[ibm-3270-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-run-3270-apps-ibm-mainframe-create-api-3270.md "Connect to 3270 apps on IBM mainframes"
[ibm-db2-doc]: connectors-create-api-db2.md "Connect to IBM DB2 in the cloud or on-premises. Update a row, get a table, and more"
[ibm-informix-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-informix.md "Connect to Informix in the cloud or on-premises. Read a row, list the tables, and more"
[ibm-mq-doc]: connectors-create-api-mq.md "Connect to IBM MQ on-premises or in Azure to send and receive messages"
[instagram-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-instagram.md "Connect to Instagram. Trigger or act on events"
[mandrill-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-mandrill.md "Connect to Mandrill for communication"
[mysql-doc]: https://learn.microsoft.com/connectors/mysql/ "Connect to your on-premises MySQL database so that you can read and write data"
[office-365-outlook-doc]: connectors-create-api-office365-outlook.md "Connect to your work or school account so that you can send and receive emails, manage your calendar and contacts, and more"
[onedrive-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-onedrive.md "Connect to your personal Microsoft OneDrive so that you can upload, delete, list files, and more"
[onedrive-for-business-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-onedriveforbusiness.md "Connect to your business Microsoft OneDrive so that you can upload, delete, list your files, and more"
[oracle-db-doc]: connectors-create-api-oracledatabase.md "Connect to an Oracle database so that you can add, insert, delete rows, and more"
[outlook.com-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-outlook.md "Connect to your Outlook mailbox so that you can manage your email, calendars, contacts, and more"
[postgre-sql-doc]: https://learn.microsoft.com/connectors/postgresql/ "Connect to your PostgreSQL database so that you can read data from tables"
[salesforce-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-salesforce.md "Connect to your Salesforce account. Manage accounts, leads, opportunities, and more"
[sap-connector-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-using-sap-connector.md "Connect to an on-premises SAP system"
[sendgrid-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-sendgrid.md "Connect to SendGrid. Send email and manage recipient lists"
[sftp-ssh-doc]: connectors-sftp-ssh.md "Connect to your SFTP account by using SSH. Upload, get, delete files, and more"
[sharepoint-server-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-sharepoint.md "Connect to SharePoint on-premises server. Manage documents, list items, and more"
[sharepoint-online-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-sharepoint.md "Connect to SharePoint Online. Manage documents, list items, and more"
[slack-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-slack.md "Connect to Slack and post messages to Slack channels"
[smtp-doc]: connectors-create-api-smtp.md "Connect to an SMTP server and send email with attachments"
[sparkpost-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-sparkpost.md "Connects to SparkPost for communication"
[sql-server-doc]: connectors-create-api-sqlazure.md "Connect to Azure SQL Database or SQL Server. Create, update, get, and delete entries in a SQL database table"
[teradata-doc]: https://learn.microsoft.com/connectors/teradata/ "Connect to your Teradata database to read data from tables"
[twilio-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-twilio.md "Connect to Twilio. Send and get messages, get available numbers, manage incoming phone numbers, and more"
[youtube-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/connectors-create-api-youtube.md "Connect to YouTube. Manage your videos and channels"

<!--Integration account connector icons -->
[as2-v2-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/as2-v2.png
[as2-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/as2.png
[edifact-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/edifact.png
[x12-icon]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/media/apis-list/x12.png

<!-- Integration account connector docs -->
[as2-doc]: ../logic-apps/logic-apps-enterprise-integration-as2.md "Encode and decode messages that use the AS2 protocol"
[edifact-doc]: ../logic-apps/logic-apps-enterprise-integration-edifact.md "Encode and decode messages that use the EDIFACT protocol"
[edifact-decode-doc]: ../logic-apps/logic-apps-enterprise-integration-edifact.md "Decode messages that use the EDIFACT protocol"
[edifact-encode-doc]: ../logic-apps/logic-apps-enterprise-integration-edifact.md "Encode messages that use the EDIFACT protocol"
[x12-doc]: ../logic-apps/logic-apps-enterprise-integration-x12.md "Encode and decode messages that use the X12 protocol"
[x12-decode-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-enterprise-integration-X12-decode.md "Decode messages that use the X12 protocol"
[x12-encode-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-enterprise-integration-X12-encode.md "Encode messages that use the X12 protocol"

<!--Other doc links-->
[gateway-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-gateway-connection.md "Connect to data sources on-premises from logic app workflows with on-premises data gateway"
