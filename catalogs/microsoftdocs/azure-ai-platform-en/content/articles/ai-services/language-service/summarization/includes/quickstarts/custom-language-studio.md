---
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.custom:
  - build-2024
ms.topic: include
ms.date: 06/30/2026
ms.author: lajanuar
---
## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)

## Create a new Azure Language in Foundry Tools resource and Azure storage account

Before you can use custom Summarization, you'll need to create an Azure Language in Foundry Tools resource, which will give you the credentials that you need to create a project and start training a model. You'll also need an Azure storage account, where you can upload your dataset used to build your model.

> **Important:**
> To get started quickly, we recommend creating a new Language resource using the steps provided in this article. Using the steps in this article lets you create Azure Language resource and storage account at the same time, which is easier than doing it later.
>
<!--- > If you have a pre-existing resource that you'd like to use, you need to connect it to storage account. See [guidance to using a pre-existing resource](../../../includes/custom/use-pre-existing-resource.md) for information. --->

### Create a new resource from the Azure portal

1. Go to the [Azure portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics) to create a new Azure Language in Foundry Tools resource. 

1. In the window that appears, select this service from the custom features. Select **Continue to create your resource** at the bottom of the screen. 

    A screenshot showing custom text classification & custom named entity recognition in the Azure portal.

1. Create a Language resource with following details.

    | Name | Description |
    | --- | --- |
    | Subscription | Your Azure subscription. |
    | Resource group | A resource group that will contain your resource. You can use an existing one, or create a new one. |
    | Region | The region for your Language resource. For example, "West US 2". |
    | Name | A name for your resource. |
    | Pricing tier | The pricing tier for your Language resource. You can use the Free (F0) tier to try the service. |

    > **Note:**
    > If you get a message saying "*your login account is not an owner of the selected storage account's resource group*", your account needs to have an owner role assigned on the resource group before you can create a Language resource. Contact your Azure subscription owner for assistance.

1. In this service's section, select an existing storage account or select **New storage account**. These values are to help you get started, and not necessarily the [storage account values](https://learn.microsoft.com/azure/storage/common/storage-account-overview) you’ll want to use in production environments. To avoid latency during building your project connect to storage accounts in the same region as your Language resource.

    | Storage account value | Recommended value |
    | --- | --- |
    | Storage account name | Any name |
    | Storage account type | Standard LRS |

1. Make sure the **Responsible AI Notice** is checked. Select **Review + create** at the bottom of the page, then select **Create**.


## Download sample data

If you need sample data, we've provided some for [text summarization](https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/language-service/Custom%20summarization/abstractive-document-samples) and [conversation summarization](https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/language-service/Custom%20summarization/abstractive-conversation-samples) scenarios for the purpose of this quickstart.

## Upload sample data to blob container

1. Locate the files to upload to your storage account

1. In the [Azure portal](https://portal.azure.com), navigate to the storage account you created, and select it.

1. In your storage account, select **Containers** from the left menu, located below **Data storage**. On the screen that appears, select **+ Container**. Give the container the name **example-data** and leave the default **Public access level**.

    A screenshot showing the main page for a storage account.

1. After your container is created, select it. Then select **Upload** button to select the `.txt` and `.json` files you downloaded earlier.

    A screenshot showing the button for uploading files to the storage account.


## Train your model

After you create a project, you go ahead and start training your model.

To start training your model from within [Microsoft Foundry](https://ai.azure.com/):

1. Select **Training jobs** from the left side menu.

2. Select **Start a training job** from the top menu.

3. Select **Train a new model** and type in the model name in the text box. You can also **overwrite an existing model** by selecting this option and choosing the model you want to overwrite from the dropdown menu. Overwriting a trained model is irreversible, but it won't affect your deployed models until you deploy the new model.

    Create a new training job

4. By default, the system will split your labeled data between the training and testing sets, according to specified percentages. If you have documents in your testing set, you can manually split the training and testing data.

4. Select the **Train** button.

5. If you select the Training Job ID from the list, a side pane will appear where you can check the **Training progress**, **Job status**, and other details for this job.

    > **Note:**
    > * Only successfully completed training jobs will generate models.
    > * Training can take some time between a couple of minutes and several hours based on the size of your labeled data.
    > * You can only have one training job running at a time. You can't start other training job within the same project until the running job is completed.


## Deploy your model

Generally after training a model you would review its [evaluation details](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/summarization/custom/how-to/test-evaluate.md) and make improvements if necessary. In this quickstart, you will just deploy your model, and make it available for you to try in Microsoft Foundry.

To deploy your model from within Microsoft Foundry:

1. Select **Deploying a model** from the left side menu.

2. Select **Add deployment** to start a new deployment job.

    A screenshot showing the deployment button

3. Select **Create new deployment** to create a new deployment and assign a trained model from the dropdown below. You can also Overwrite an existing deployment by selecting this option and select the trained model you want to assign to it from the dropdown below.

    > **Note:**
    > Overwriting an existing deployment doesn't require changes to your [prediction API](https://aka.ms/ct-runtime-swagger) call but the results you get will be based on the newly assigned model.

    A screenshot showing the deployment screen

4. Select **Deploy** to start the deployment job.

5. After deployment is successful, an expiration date will appear next to it. [Deployment expiration](../../../concepts/model-lifecycle.md) is when your deployed model will be unavailable to be used for prediction, which typically happens twelve months after a training configuration expires.


## Test your model

 For this quickstart, you will use Microsoft Foundry to submit the custom summarization task and visualize the results. In the sample dataset you downloaded earlier, you can find some test documents that you can use in this step.

To test your deployed models from within [Microsoft Foundry](https://ai.azure.com/):

1. Select **Testing deployments** from the left side menu.

2. Select the deployment you want to test. You can only test models that are assigned to deployments.

3. For multilingual projects, from the language dropdown, select the language of the text you're testing.

3. Select the deployment you want to query/test from the dropdown.

4. You can enter the text you want to submit to the request or upload a `.txt` file to use.

5. Select **Run the test** from the top menu.

6. In the **Result** tab, you can see the extracted entities from your text and their types. You can also view the JSON response under the **JSON** tab.


A screenshot showing the model test results.

## Clean up resources

When you don't need your project anymore, you can delete your project using [Microsoft Foundry](https://ai.azure.com/). Select the feature you're using in the top, and then select the project you want to delete. Select **Delete** from the top menu to delete the project.
