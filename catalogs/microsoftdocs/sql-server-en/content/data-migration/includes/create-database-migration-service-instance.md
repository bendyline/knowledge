---
author: rwestMSFT
ms.author: randolphwest
ms.date: 02/19/2026
ms.service: azure-database-migration-service
ms.topic: include
ms.collection:
  - sql-migration-content
ms.custom:
  - sfi-image-nochange
---

**Step 1:** In the [Azure portal](https://portal.azure.com/#browse/Microsoft.DataMigration%2Fservices), navigate to the **Azure Database Migration Service** page. Create a new instance of Azure Database Migration Service, or reuse an existing instance that you created earlier.

#### Use an existing instance of Database Migration Service

To use an existing instance of Database Migration Service:

- On Azure portal, under **Azure Database Migration Services**, select an existing instance of Database Migration Service that you want to use, ensuring that it's present in right Resource Group and region.

  Screenshot that shows Database Migration Service overview.

#### Create a new instance of Database Migration Service

To create a new instance of Database Migration Service:

1. On Azure portal, under **Azure Database Migration Service**, select **Create**.

   Screenshot that shows Database Migration Service create option.

1. In **Select migration scenario and Database Migration Service**, select the desired input like Source and Target server type, choose **Database Migration Service** and choose **Select**.

   Screenshot that shows Database Migration Service Migration scenarios.

1. On the next screen **Create Data Migration Service**, select your subscription and resource group, then select **Location**, and enter the Database Migration Service name. Select **Review + Create**. This creates the Azure Database Migration Service.

   Screenshot that shows Database Migration Service required input details.

1. If the self-hosted integration runtime (SHIR) is required, on the overview page of your Database Migration Service and under Settings, select **Integration runtime**, and complete the following steps:

   1. Select **Configure integration runtime** and choose the **[Download and install integration runtime](https://aka.ms/sql-migration-shir-download)** link to open the download link in a web browser. Download the integration runtime, and then install it on a computer that meets the prerequisites for connecting to the source SQL Server instance. For more information, see [Self-hosted integration runtime for database migrations](../sql-server/self-hosted-integration-runtime.md).

      Screenshot that shows the Download and install integration runtime link.

      When installation is finished, Microsoft Integration Runtime Configuration Manager automatically opens to begin the registration process.

   1. In the **Authentication key** table, copy one of the authentication keys that are provided in the wizard and paste it in Microsoft Integration Runtime Configuration Manager.

      Screenshot that highlights the authentication key table in the wizard.

      If the authentication key is valid, a green check icon appears in Integration Runtime Configuration Manager. A green check indicates that you can continue to **Register**.

      After you register the self-hosted integration runtime, close Microsoft Integration Runtime Configuration Manager. It might take several minutes to reflect the Node details on Azure portal for Database Migration Service, under **Settings > Integration runtime**.

      Screenshot that highlights SHIR status on Azure portal.

      > **Note:**  
      > For more information about the self-hosted integration runtime, see [Create and configure a self-hosted integration runtime](https://learn.microsoft.com/azure/data-factory/create-self-hosted-integration-runtime).
