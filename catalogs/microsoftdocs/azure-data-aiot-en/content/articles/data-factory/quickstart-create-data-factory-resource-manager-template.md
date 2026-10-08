---
title: Create an Azure Data Factory using an Azure Resource Manager template (ARM template)
description: Create a sample Azure Data Factory pipeline using an Azure Resource Manager template (ARM template).
tags: azure-resource-manager
author: whhender
ms.author: whhender
ms.reviewer: susabat, jingwang
ms.topic: quickstart
ms.custom: subject-armqs, mode-arm, devx-track-arm-template
ms.date: 03/31/2025
---

# Quickstart: Create an Azure Data Factory using ARM template

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This quickstart describes how to use an Azure Resource Manager template (ARM template) to create an Azure data factory. The pipeline you create in this data factory **copies** data from one folder to another folder in an Azure blob storage. For a tutorial on how to **transform** data using Azure Data Factory, see [Tutorial: Transform data using Spark](transform-data-using-spark.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/quickstart-create-data-factory-resource-manager-template.md)

> **Note:**
> This article doesn't provide a detailed introduction of the Data Factory service. For an introduction to the Azure Data Factory service, see [Introduction to Azure Data Factory](introduction.md).

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

### Azure subscription

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

### Create a file

Open a text editor such as **Notepad**, and create a file named **emp.txt** with the following content:

```emp.txt
John, Doe
Jane, Doe
```

Save the file in the **C:\ADFv2QuickStartPSH** folder. (If the folder doesn't already exist, create it.)

## Review template

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Datafactory&pageNumber=1&sort=Popular).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.datafactory/data-factory-v2-blob-to-blob-copy/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/quickstart-create-data-factory-resource-manager-template.md)

There are Azure resources defined in the template:

- [Microsoft.Storage/storageAccounts](https://learn.microsoft.com/azure/templates/Microsoft.Storage/storageAccounts): Defines a storage account.
- [Microsoft.DataFactory/factories](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories): Create an Azure Data Factory.
- [Microsoft.DataFactory/factories/linkedServices](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories/linkedservices): Create an Azure Data Factory linked service.
- [Microsoft.DataFactory/factories/datasets](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories/datasets): Create an Azure Data Factory dataset.
- [Microsoft.DataFactory/factories/pipelines](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories/pipelines): Create an Azure Data Factory pipeline.

More Azure Data Factory template samples can be found in the [quickstart template gallery](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Datafactory&pageNumber=1&sort=Popular).

## Deploy the template

1. Select the following image to sign in to Azure and open a template. The template creates an Azure Data Factory account, a storage account, and a blob container.

    Button to deploy the Resource Manager template to Azure.

2. Select or enter the following values.

    Deploy ADF ARM template

    Unless it's specified, use the default values to create the Azure Data Factory resources:

    - **Subscription**: Select an Azure subscription.
    - **Resource group**: Select **Create new**, enter a unique name for the resource group, and then select **OK**.
    - **Region**: Select a location.  For example, *East US*.
    - **Data Factory Name**: Use  default value.
    - **Location**: Use default value.
    - **Storage Account Name**: Use default value.
    - **Blob Container**: Use default value.

## Review deployed resources

1. Select **Go to resource group**.

    Resource Group

2.  Verify your Azure Data Factory is created.
    1. Your Azure Data Factory name is in the format - datafactory\<uniqueid\>.

    Sample Data Factory

2. Verify your storage account is created.
    1. The storage account name is in the format - storage\<uniqueid\>.

    Storage Account

3. Select the storage account created and then select **Containers**.
    1. On the **Containers** page, select the blob container you created.
        1. The blob container name is in the format - blob\<uniqueid\>.

    Blob container

### Upload a file

1. On the **Containers** page, select **Upload**.

2. In the right pane, select the **Files** box, and then browse to and select the **emp.txt** file that you created earlier.

3. Expand the **Advanced** heading.

4. In the **Upload to folder** box, enter *input*.

5. Select the **Upload** button. You should see the **emp.txt** file and the status of the upload in the list.

6. Select the **Close** icon (an **X**) to close the **Upload blob** page.

    Upload file to input folder

Keep the container page open, because you can use it to verify the output at the end of this quickstart.

### Start Trigger

1. Navigate to the **Data factories** page, and select the data factory you created.

2. Select **Open** on the **Open Azure Data Factory Studio** tile.

    Author & Monitor

2. Select the **Author** tab .

3. Select the pipeline created - ArmtemplateSampleCopyPipeline.

    ARM template pipeline

4. Select **Add Trigger** > **Trigger Now**.

    Trigger

5. In the right pane under **Pipeline run**, select **OK**.

### Monitor the pipeline

1. Select the **Monitor** tab .

2. You see the activity runs associated with the pipeline run. In this quickstart, the pipeline has only one activity of type: Copy. As such, you see a run for that activity.

    Successful run

### Verify the output file

The pipeline automatically creates an output folder in the blob container. Then, it copies the emp.txt file from the input folder to the output folder.

1. In the Azure portal, on the **Containers** page, select **Refresh** to see the output folder.

2. Select **output** in the folder list.

3. Confirm that the **emp.txt** is copied to the output folder.

    Output

## Clean up resources

You can clean up the resources that you created in the Quickstart in two ways. You can [delete the Azure resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/delete-resource-group.md), which includes all the resources in the resource group. If you want to keep the other resources intact, delete only the data factory you created in this tutorial.

Deleting a resource group deletes all resources including data factories in it. Run the following command to delete the entire resource group:

```azurepowershell-interactive
Remove-AzResourceGroup -ResourceGroupName $resourcegroupname
```

If you want to delete just the data factory, and not the entire resource group, run the following command:

```azurepowershell-interactive
Remove-AzDataFactoryV2 -Name $dataFactoryName -ResourceGroupName $resourceGroupName
```

## Related content

In this quickstart, you created an Azure Data Factory using an ARM template and validated the deployment. To learn more about Azure Data Factory and Azure Resource Manager, continue on to the articles below.

- [Azure Data Factory documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/index.yml)
- Learn more about [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md)
- Get other [Azure Data Factory ARM templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Datafactory&pageNumber=1&sort=Popular)
