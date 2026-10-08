## Prerequisites

* An **Azure subscription**. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* The **Requisite permissions**. Make sure the person establishing the account and project is assigned as the Foundry Account Owner role at the subscription level. Alternatively, having either the **Contributor** or **Cognitive Services Contributor** role at the subscription scope also meets this requirement. For more information, *see* [Role based access control (RBAC)](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/role-based-access-control).

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


*  An [**Language resource with a storage account**](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.CognitiveServicesTextAnalytics). On the **select additional features** page, select the **Custom text classification, Custom named entity recognition, Custom sentiment analysis & Custom Text Analytics for health** box to link a required storage account to this resource:

    Screenshot of the select additional features option in the Foundry.

  > **Note:**
  >  * You need to have an **owner** role assigned on the resource group to create a Language resource.
  >  * If you're connecting a preexisting storage account, you should have an owner role assigned to it.
  >  * Don't move the storage account to a different resource group or subscription once linked with Azure Language resource.


* **A Foundry project created in the Foundry**. For more information, *see* [Create a Foundry project](https://learn.microsoft.com/azure/ai-foundry/how-to/create-projects).

* **A custom NER dataset uploaded to your storage container**. A custom named entity recognition (NER) dataset is the collection of labeled text documents used to train your custom NER model. You can [download our sample dataset](https://go.microsoft.com/fwlink/?linkid=2175226) for this quickstart. The source language is English.
