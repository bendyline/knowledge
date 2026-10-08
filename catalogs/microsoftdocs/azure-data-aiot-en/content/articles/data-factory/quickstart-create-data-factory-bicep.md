---
title: Create an Azure Data Factory using Bicep
description: Create a sample Azure Data Factory pipeline using Bicep.
tags: azure-resource-manager
author: whhender 
ms.subservice: data-movement
ms.author: whhender 
ms.topic: quickstart
ms.date: 06/06/2025
ms.custom:
  - subject-armqs
  - mode-arm
  - devx-track-bicep
  - sfi-image-nochange
---

# Quickstart: Create an Azure Data Factory using Bicep

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This quickstart describes how to use Bicep to create an Azure data factory. The pipeline you create in this data factory **copies** data from one folder to another folder in an Azure blob storage. For a tutorial on how to **transform** data using Azure Data Factory, see [Tutorial: Transform data using Spark](transform-data-using-spark.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/quickstart-create-data-factory-bicep.md)

> **Note:**
> This article doesn't provide a detailed introduction of the Data Factory service. For an introduction to the Azure Data Factory service, see [Introduction to Azure Data Factory](introduction.md).

## Prerequisites

### Azure subscription

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the Bicep file

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/data-factory-v2-blob-to-blob-copy/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.datafactory/data-factory-v2-blob-to-blob-copy/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/quickstart-create-data-factory-bicep.md)

There are several Azure resources defined in the Bicep file:

- [Microsoft.Storage/storageAccounts](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts): Defines a storage account.
- [Microsoft.DataFactory/factories](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories): Create an Azure Data Factory.
- [Microsoft.DataFactory/factories/linkedServices](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories/linkedservices): Create an Azure Data Factory linked service.
- [Microsoft.DataFactory/factories/datasets](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories/datasets): Create an Azure Data Factory dataset.
- [Microsoft.DataFactory/factories/pipelines](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories/pipelines): Create an Azure Data Factory pipeline.

## Create a file

Open a text editor such as **Notepad**, and create a file named **emp.txt** with the following content:

```emp.txt
John, Doe
Jane, Doe
```

Save the file locally. You'll use it later in the quickstart.

## Deploy the Bicep file

1. Save the Bicep file from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/data-factory-v2-blob-to-blob-copy/) as **main.bicep** to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep
    ```

    ---

    When the deployment finishes, you should see a message indicating the deployment succeeded.

## Review deployed resources

Use the Azure CLI or Azure PowerShell to list the deployed resources in the resource group.

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

You can also use the Azure portal to review the deployed resources.

1. Sign in to the Azure portal.
1. Navigate to your resource group.
1. You'll see your resources listed. Select each resource to see an overview.

## Upload a file

Use the Azure portal to upload the **emp.txt** file.

1. Navigate to your resource group and select the storage account created. Then, select the **Containers** tab on the left panel.

    Containers tab

2. On the **Containers** page, select the blob container created. The name is in the format - blob\<uniqueid\>.

    Blob container

3. Select **Upload**, and then select the **Files** box icon in the right pane. Navigate to and select the **emp.txt** file that you created earlier.

4. Expand the **Advanced** heading.

5. In the **Upload to folder** box, enter *input*.

6. Select the **Upload** button. You should see the **emp.txt** file and the status of the upload in the list.

7. Select the **Close** icon (an **X**) to close the **Upload blob** page.

    Upload file to input folder

Keep the container page open because you can use it to verify the output at the end of this quickstart.

## Start trigger

1. Navigate to the resource group page, and select the data factory you created.

2. Select **Open** on the **Open Azure Data Factory Studio** tile.

    Author & Monitor

3. Select the **Author** tab .

4. Select the pipeline created: **ArmtemplateSampleCopyPipeline**.

    Bicep pipeline

5. Select **Add Trigger** > **Trigger Now**.

    Trigger

6. In the right pane under **Pipeline run**, select **OK**.

## Monitor the pipeline

1. Select the **Monitor** tab. 

2. You see the activity runs associated with the pipeline run. In this quickstart, the pipeline only has one activity of type **Copy**. You should see a run for that activity.

    Successful run

## Verify the output file

The pipeline automatically creates an output folder in the blob container. It then copies the **emp.txt** file from the input folder to the output folder.

1. On the **Containers** page in the Azure portal, select **Refresh** to see the output folder.

2. Select **output** in the folder list.

3. Confirm that the **emp.txt** is copied to the output folder.

    Output

## Clean up resources

When no longer needed, use the Azure CLI or Azure PowerShell to delete the resource group and all of its resources.

# [CLI](#tab/CLI)

```azurecli-interactive
az group delete --name exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```

---

You can also use the Azure portal to delete the resource group.

1. In the Azure portal, navigate to your resource group.
1. Select **Delete resource group**.
1. A tab will appear. Enter the resource group name and select **Delete**.

## Related content

In this quickstart, you created an Azure Data Factory using Bicep and validated the deployment. To learn more about Azure Data Factory and Bicep, continue on to the articles below.

- [Azure Data Factory documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/index.yml)
- Learn more about [Bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/overview.md)
