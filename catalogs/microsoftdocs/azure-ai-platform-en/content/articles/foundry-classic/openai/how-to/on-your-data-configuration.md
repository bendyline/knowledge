---
title: "Network and access configuration for Azure OpenAI On Your Data (classic)"
description: "Use this article to learn about configuring Azure OpenAI when using your data for text generation. (classic)"
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.topic: how-to
author: aahill
ms.author: aahi
ms.date: 02/06/2026
recommendations: false
---

# Network and access configuration for Azure OpenAI On Your Data (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




> **Important:**
> Azure OpenAI On Your Data is deprecated and approaching retirement. The service will be retired on October 14, 2026
> 
> Microsoft has stopped onboarding new models to Azure OpenAI On Your Data. This feature only supports the following models:
>
> + GPT‑4o (versions 2024‑05‑13, 2024‑08‑06, and 2024‑11‑20)
> + GPT-4o-mini (version 2024-07-18)
> 
> We recommend that you migrate Azure OpenAI On Your Data workloads to [Foundry Agent Service](../../agents/overview.md) with [Foundry IQ](../../../foundry/agents/concepts/what-is-foundry-iq.md) to retrieve content and generate grounded answers from your data. To get started, see [Connect a Foundry IQ knowledge base](../../../foundry/agents/how-to/foundry-iq-connect.md).


Use this article to learn how to configure networking and access when using Azure OpenAI On Your Data with Microsoft Entra ID role-based access control, virtual networks, and private endpoints.

## Data ingestion architecture 

When you use Azure OpenAI On Your Data to ingest data from Azure blob storage, local files or URLs into Azure AI Search, the following process is used to process the data.

A diagram showing the process of ingesting data.

* Steps 1 and 2 are only used for file upload.
* Downloading URLs to your blob storage is not illustrated in this diagram. After web pages are downloaded from the internet and uploaded to blob storage, steps 3 onward are the same.
* One indexer, one index, and one data source in the Azure AI Search resource is created using prebuilt skills and [integrated vectorization](https://learn.microsoft.com/azure/search/vector-search-integrated-vectorization).
* Azure AI Search handles the extraction, chunking, and vectorization of chunked documents through integrated vectorization. If a scheduling interval is specified, the indexer will run accordingly. 

For the managed identities used in service calls, only system assigned managed identities are supported. User assigned managed identities aren't supported.

## Inference architecture

A diagram showing the process of using the inference API.

When you send API calls to chat with an Azure OpenAI model on your data, the service needs to retrieve the index fields during inference to perform fields mapping. Therefore the service requires the Azure OpenAI identity to have the `Search Service Contributor` role for the search service even during inference.

If an embedding dependency is provided in the inference request, Azure OpenAI will vectorize the rewritten query, and both query and vector are sent to Azure AI Search for vector search.

## Document-level access control

> **Note:** 
> Document-level access control is supported for Azure AI search only.

Azure OpenAI On Your Data lets you restrict the documents that can be used in responses for different users with Azure AI Search [security filters](https://learn.microsoft.com/azure/search/search-security-trimming-for-azure-search-with-aad). When you enable document level access, Azure AI Search will trim the search results based on user Microsoft Entra group membership specified in the filter. You can only enable document-level access on existing Azure AI Search indexes. To enable document-level access:

1. To register your application and create users and groups, follow the steps in the [Azure AI Search documentation](https://learn.microsoft.com/azure/search/search-security-trimming-for-azure-search-with-aad).
1. [Index your documents with their permitted groups](https://learn.microsoft.com/azure/search/search-security-trimming-for-azure-search-with-aad#index-document-with-their-permitted-groups). Be sure that your new [security fields](https://learn.microsoft.com/azure/search/search-security-trimming-for-azure-search#create-security-field) have the schema:
        
    ```json
    {"name": "group_ids", "type": "Collection(Edm.String)", "filterable": true }
    ```

    `group_ids` is the default field name. If you use a different field name like `my_group_ids`, you can map the field in [index field mapping](../concepts/use-your-data.md#index-field-mapping).

1. Make sure each sensitive document in the index has this security field value set to the permitted groups of the document.
1. In the [Microsoft Foundry portal](https://ai.azure.com/portal), add your data source. In the [index field mapping](../concepts/use-your-data.md#index-field-mapping) section, you can map zero or one value to the **permitted groups** field, as long as the schema is compatible. If the **permitted groups** field isn't mapped, document level access is disabled. 

**Foundry portal**

Once the Azure AI Search index is connected, your responses in the studio have document access based on the Microsoft Entra permissions of the logged in user.

**API**

When using the API, pass the `filter` parameter in each API request. For example:

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/on-your-data-configuration.md)

For more information about security, see [Authenticate requests](https://learn.microsoft.com/azure/ai-services/authentication).

```json
{
    "messages": [
        {
            "role": "user",
            "content": "who is my manager?"
        }
    ],
    "data_sources": [
        {
            "type": "azure_search",
            "parameters": {
                "endpoint": "<AZURE_AI_SEARCH_ENDPOINT>",
                "key": "<AZURE_AI_SEARCH_API_KEY>",
                "index_name": "<AZURE_AI_SEARCH_INDEX>",
                "filter": "my_group_ids/any(g:search.in(g, 'group_id1, group_id2'))"
            }
        }
    ]
}
```
* `my_group_ids` is the field name that you selected for **Permitted groups** during [fields mapping](../concepts/use-your-data.md#index-field-mapping).
* `group_id1, group_id2` are groups attributed to the logged in user. The client application can retrieve and cache users' groups using the [Microsoft Graph API](https://learn.microsoft.com/graph/api/user-list-transitivememberof).

## Resource configuration

Use the following sections to configure your resources for optimal secure usage. Even if you plan to only secure part of your resources, you still need to follow all the steps. 

This article describes network settings related to disabling public network for Azure OpenAI resources, Azure AI search resources, and storage accounts. Using selected networks with IP rules is not supported, because the services' IP addresses are dynamic.

## Create resource group

Create a resource group, so you can organize all the relevant resources. The resources in the resource group include but are not limited to:
* One Virtual network
* Three key services: one Azure OpenAI, one Azure AI Search, one Storage Account
* Three Private endpoints, each is linked to one key service
* Three Network interfaces, each is associated with one private endpoint
* One Virtual network gateway, for the access from on-premises client machines
* One Web App with virtual network integrated
* One Private DNS zone, so the Web App finds the IP of your Azure OpenAI

## Create virtual network

The virtual network has three subnets. 

1. The first subnet is used for the virtual network gateway.
1. The second subnet is used for the private endpoints for the three key services.
1. The third subnet is empty, and used for Web App outbound virtual network integration.

A diagram showing the virtual network architecture.

## Configure Azure OpenAI

### Enabled custom subdomain

The [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) is required for Microsoft Entra ID based authentication, and private DNS zone. If the Azure OpenAI resource is created using ARM template, the custom subdomain must be specified explicitly.

### Enable managed identity

To allow your Azure AI Search and Storage Account to recognize your Azure OpenAI in Foundry Models via Microsoft Entra ID authentication, you need to assign a managed identity for your Azure OpenAI in Foundry Models. The easiest way is to toggle on system assigned managed identity on Azure portal.
A screenshot showing the system assigned managed identity option in the Azure portal.

To set the managed identities via the management API, see [the management API reference documentation](https://learn.microsoft.com/rest/api/aiservices/accountmanagement/accounts/update#identity).

```json

"identity": {
  "principalId": "<YOUR-PRINCIPAL-ID>",
  "tenantId": "<YOUR-TENNANT-ID>",
  "type": "SystemAssigned, UserAssigned", 
  "userAssignedIdentities": {
    "/subscriptions/<YOUR-SUBSCIRPTION-ID>/resourceGroups/my-resource-group",
    "principalId": "<YOUR-PRINCIPAL-ID>", 
    "clientId": "<YOUR-CLIENT-ID>"
  }
}
```

### Enable trusted service

To allow your Azure AI Search to call your Azure OpenAI `embedding model, while Azure OpenAI has no public network access, you need to set up Azure OpenAI to bypass Azure AI Search as a trusted service based on managed identity. Azure OpenAI identifies the traffic from your Azure AI Search by verifying the claims in the JSON Web Token (JWT). Azure AI Search must use the system assigned managed identity authentication to call the embedding endpoint. 

Set `networkAcls.bypass` as `AzureServices` from the management API. For more information, see [Virtual networks article](https://learn.microsoft.com/azure/ai-services/cognitive-services-virtual-networks?tabs=portal#grant-access-to-trusted-azure-services-for-azure-openai).

This step can be skipped only if you have a [shared private link](#create-shared-private-link) for your Azure AI Search resource.

### Disable public network access

You can disable public network access of your Azure OpenAI resource in the Azure portal. 

To allow access to your Azure OpenAI from your client machines, like using [Foundry portal](https://ai.azure.com/?cid=learnDocs), you need to create [private endpoint connections](https://learn.microsoft.com/azure/ai-services/cognitive-services-virtual-networks?tabs=portal#use-private-endpoints) that connect to your Azure OpenAI resource.

## Configure Azure AI Search

You can use basic pricing tier and higher for the search resource. It's not necessary, but if you use the S2 pricing tier, [advanced options](#create-shared-private-link) are available.

### Enable managed identity

To allow your other resources to recognize the Azure AI Search using Microsoft Entra ID authentication, you need to assign a managed identity for your Azure AI Search. The easiest way is to toggle on the system assigned managed identity in the Azure portal.

A screenshot showing the managed identity setting for Azure AI Search in the Azure portal.

### Enable role-based access control
As Azure OpenAI uses managed identity to access Azure AI Search, you need to enable role-based access control in your Azure AI Search. To do it on Azure portal, select **Both** or **Role-based access control** in the **Keys** tab in the Azure portal.

A screenshot showing the managed identity option for Azure AI search in the Azure portal.

For more information, see the [Azure AI Search RBAC article](https://learn.microsoft.com/azure/search/search-security-enable-roles).

### Disable public network access

You can disable public network access of your Azure AI Search resource in the Azure portal. 

To allow access to your Azure AI Search resource from your client machines, like using [Foundry portal](https://ai.azure.com/?cid=learnDocs), you need to create [private endpoint connections](https://learn.microsoft.com/azure/search/service-create-private-endpoint) that connect to your Azure AI Search resource.

### Enable trusted service

You can enable trusted service of your search resource from Azure portal.

Go to your search resource's network tab. With the public network access set to **disabled**, select **Allow Azure services on the trusted services list to access this search service.**

A diagram showing the search trusted service.

You can also use the REST API to enable trusted service. This example uses the Azure CLI and the `jq` tool.

```bash
rid=/subscriptions/<YOUR-SUBSCRIPTION-ID>/resourceGroups/<YOUR-RESOURCE-GROUP>/providers/Microsoft.Search/searchServices/<YOUR-RESOURCE-NAME>
apiVersion=2024-03-01-Preview
#store the resource properties in a variable
az rest --uri "https://management.azure.com$rid?api-version=$apiVersion" > search.json

#replace bypass with AzureServices using jq
jq '.properties.networkRuleSet.bypass = "AzureServices"' search.json > search_updated.json

#apply the updated properties to the resource
az rest --uri "https://management.azure.com$rid?api-version=$apiVersion" \
    --method PUT \
    --body @search_updated.json

```

### Create shared private link

> **Tip:**
> If you are using a basic or standard pricing tier, or if it is your first time to set up all of your resources securely, you should skip this advanced topic.

This section is only applicable for S2 pricing tier search resource, because it requires [private endpoint support for indexers with a skill set](https://learn.microsoft.com/azure/search/search-limits-quotas-capacity#shared-private-link-resource-limits).

To create shared private link from your search resource connecting to your Azure OpenAI resource, see the [search documentation](https://learn.microsoft.com/azure/search/search-indexer-howto-access-private). Select **Resource type** as `Microsoft.CognitiveServices/accounts` and **Group ID** as `openai_account`.

With shared the private link, [step 8](#data-ingestion-architecture) of the data ingestion architecture diagram is changed from **bypass trusted service** to **shared private link**.

A diagram showing the process of ingesting data with an S2 search resource.

## Configure Storage Account

### Enable trusted service

To allow access to your Storage Account from Azure OpenAI and Azure AI Search, you need to set up Storage Account to bypass your Azure OpenAI and Azure AI Search as [trusted services based on managed identity](https://learn.microsoft.com/azure/storage/common/storage-network-security?tabs=azure-portal#trusted-access-based-on-a-managed-identity).

In the Azure portal, navigate to your storage account networking tab, choose "Selected networks", and then select **Allow Azure services on the trusted services list to access this storage account** and click Save.

### Disable public network access

You can disable public network access of your Storage Account in the Azure portal. 

To allow access to your Storage Account from your client machines, like using [Foundry portal](https://ai.azure.com/?cid=learnDocs), you need to create [private endpoint connections](https://learn.microsoft.com/azure/storage/common/storage-private-endpoints) that connect to your blob storage.

## Role assignments

So far you have already setup each resource work independently. Next you need to allow the services to authorize each other.

| Role | Assignee | Resource | Description |
| --- | --- | --- | --- |
| `Search Index Data Reader` | Azure OpenAI | Azure AI Search | Inference service queries the data from the index. |
| `Search Service Contributor` | Azure OpenAI | Azure AI Search | Inference service queries the index schema for auto fields mapping. Data ingestion service creates index, data sources, skill set, indexer, and queries the indexer status. |
| `Storage Blob Data Contributor` | Azure OpenAI | Storage Account | Reads from the input container, and writes the preprocessed result to the output container. |
| `Cognitive Services OpenAI Contributor` | Azure AI Search | Azure OpenAI, Microsoft Foundry Project | Allows the Azure AI Search resource access to the Azure OpenAI embedding endpoint. This role must be assigned on both the Azure OpenAI resource and the Microsoft Foundry project. |
| `Storage Blob Data Reader` | Azure AI Search | Storage Account | Reads document blobs and chunk blobs. |
| `Reader` | Foundry Project | Azure Storage Private Endpoints (Blob & File) | Read search indexes created in blob storage within a Foundry Project. |
| `Cognitive Services OpenAI User` | Web app | Azure OpenAI | Inference. |

In the above table, the `Assignee` means the system assigned managed identity of that resource.

The admin needs to have the `Owner` role on these resources to add role assignments.

See the [Azure RBAC documentation](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal) for instructions on setting these roles in the Azure portal. You can use the [available script on GitHub](https://github.com/microsoft/sample-app-aoai-chatGPT/blob/main/scripts/role_assignment.sh) to add the role assignments programmatically.

To enable the developers to use these resources to build applications, the admin needs to add the developers' identity with the following role assignments to the resources.

| Role | Resource | Description |
| --- | --- | --- |
| `Cognitive Services OpenAI Contributor` | Azure OpenAI | Call public ingestion API from [Foundry portal](https://ai.azure.com/?cid=learnDocs). The `Contributor` role is not enough, because if you only have `Contributor` role, you cannot call data plane API via Microsoft Entra ID authentication, and Microsoft Entra ID authentication is required in the secure setup described in this article. |
| `Contributor` | Azure AI Search | List API-Keys to list indexes from [Foundry portal](https://ai.azure.com/?cid=learnDocs). |
| `Contributor` | Storage Account | List Account SAS to upload files from [Foundry portal](https://ai.azure.com/?cid=learnDocs). |
| `Contributor` | The resource group or Azure subscription where the developer need to deploy the web app to | Deploy web app to the developer's Azure subscription. |
| `Role Based Access Control Administrator` | Azure OpenAI | Permission to configure the necessary role assignment on the Azure OpenAI resource. Enables the web app to call Azure OpenAI. |

## Configure gateway and client

To access the Azure OpenAI from your on-premises client machines, one of the approaches is to configure Azure VPN Gateway and Azure VPN Client.

Follow [this guideline](https://learn.microsoft.com/azure/vpn-gateway/tutorial-create-gateway-portal#VNetGateway) to create virtual network gateway for your virtual network.

Follow [this guideline](https://learn.microsoft.com/azure/vpn-gateway/openvpn-azure-ad-tenant#enable-authentication) to add point-to-site configuration, and enable Microsoft Entra ID based authentication. Download the Azure VPN Client profile configuration package, unzip, and import the `AzureVPN/azurevpnconfig.xml` file to your Azure VPN client.

A screenshot showing where to import Azure VPN Client profile.

Configure your local machine `hosts` file to point your resources host names to the private IPs in your virtual network. The `hosts` file is located at `C:\Windows\System32\drivers\etc` for Windows, and at `/etc/hosts` on Linux. Example:

```
10.0.0.5 contoso.openai.azure.com
10.0.0.6 contoso.search.windows.net
10.0.0.7 contoso.blob.core.windows.net
```

## Foundry portal

You should be able to use all [Foundry portal](https://ai.azure.com/?cid=learnDocs) features, including both ingestion and inference, from your on-premises client machines.

## Web app
The web app communicates with your Azure OpenAI resource. Since your Azure OpenAI resource has public network disabled, the web app needs to be set up to use the private endpoint in your virtual network to access your Azure OpenAI resource.

The web app needs to resolve your Azure OpenAI host name to the private IP of the private endpoint for Azure OpenAI. So, you need to configure the private DNS zone for your virtual network first.

1. [Create private DNS zone](https://learn.microsoft.com/azure/dns/private-dns-getstarted-portal#create-a-private-dns-zone) in your resource group. 
1. [Add a DNS record](https://learn.microsoft.com/azure/dns/private-dns-getstarted-portal#create-an-additional-dns-record). The IP is the private IP of the private endpoint for your Azure OpenAI resource, and you can get the IP address from the network interface associated with the private endpoint for your Azure OpenAI.
1. [Link the private DNS zone to your virtual network](https://learn.microsoft.com/azure/dns/private-dns-getstarted-portal#link-the-virtual-network) so the web app integrated in this virtual network can use this private DNS zone.

When deploying the web app from [Foundry portal](https://ai.azure.com/?cid=learnDocs), select the same location with the virtual network, and select a proper SKU, so it can support the [virtual network integration feature](https://learn.microsoft.com/azure/app-service/overview-vnet-integration). 

After the web app is deployed, from the Azure portal networking tab, configure the web app outbound traffic virtual network integration, choose the third subnet that you reserved for web app.

A screenshot showing outbound traffic configuration for the web app.

## Using the API

Make sure your sign-in credential has `Cognitive Services OpenAI Contributor` role on your Azure OpenAI resource, and run `az login` first.

A screenshot showing the cognitive services OpenAI contributor role in the Azure portal.

### Ingestion API

See the [ingestion API reference article](https://learn.microsoft.com/rest/api/azureopenai/ingestion-jobs?context=/azure/ai-foundry/openai/context/context) for details on the request and response objects used by the ingestion API.

### Inference API

See the [inference API reference article](../references/on-your-data.md) for details on the request and response objects used by the inference API.
    
## Use Microsoft Defender for Cloud

You can now integrate [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-cloud-introduction) (preview) with your Azure resources to protect your applications. Microsoft Defender for Cloud protects your applications with [threat protection for AI workloads](https://learn.microsoft.com/azure/defender-for-cloud/ai-threat-protection) , providing teams with evidence-based security alerts enriched with Microsoft threat intelligence signals and enables teams to strengthen their [security posture](https://learn.microsoft.com/azure/defender-for-cloud/ai-security-posture) with integrated security best-practice recommendations.

Use [this form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9EXzLewuFRArQPJzR1tntlURThQR0hYU1MyRVRNODNMV1hBOUEzVlk3NC4u) to apply for access.

A screenshot showing Microsoft Defender for Cloud.
