---
title: "Tutorial: Transform and protect your API in Azure API Management"
description: In this tutorial, you learn how to protect your API in API Management with transformation and throttling (rate-limiting) policies.
ms.service: azure-api-management
ms.topic: tutorial
ms.date: 02/09/2026
ms.custom:
  - mvc
  - devdivchpfy22
  - sfi-image-nochange
#customer intent: As an API developer responsible for an API, I need to use policies to manage access and use of APIs in API Management.
---

# Tutorial: Transform and protect your API

**APPLIES TO: All API Management tiers**



In this tutorial, you learn about configuring [policies](api-management-howto-policies.md) to protect or transform your API. Policies are a collection of statements that are run sequentially on the request or response of an API that modify the API's behavior.

> **Tip:**
> API teams can use this feature in [workspaces](workspaces-overview.md). Workspaces provide isolated administrative access to APIs and their own API runtime environments. 

For example, you might want to set a custom response header. Or, configure a rate limit policy to protect your backend API, so developers don't overuse the API. These examples are a simple introduction to API Management policies. For more policy options, see [API Management policies](api-management-policies.md).

> **Note:**
> By default, API Management configures a global [`forward-request`](forward-request-policy.md) policy. The `forward-request` policy is needed for the gateway to complete a request to a backend service.

In this tutorial, you learn how to:

> 
> - Transform an API to set a custom response header
> - Protect an API by adding a rate limit policy, or *throttling*
> - Test the transformations

Screenshot of API Management policies in the portal.

## Prerequisites

- Learn the [Azure API Management terminology](api-management-terminology.md).
- Understand the [concept of policies in Azure API Management](api-management-howto-policies.md).
- Complete the following quickstart: [Create an Azure API Management instance](get-started-create-service-instance.md). For this tutorial, we recommend that you use one of the classic or v2 tiers, for example, the Developer tier or the Basic v2 tier. The Consumption tier doesn't support all policies used in this tutorial.
- Complete the following tutorial: [Import and publish your first API](import-and-publish.md).

## Go to your API Management instance

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**:

    Screenshot that shows API Management services in the search results.

1. On the **API Management services** page, select your API Management instance:

    Screenshot that shows an API Management instance on the API Management services page.

## Test the original response

To see the original response:

1. In your API Management service instance, select **APIs** > **APIs**.
1. From your API list, select **Swagger Petstore**.
1. At the top of the screen, select **Test**.
1. Select the **GET Finds Pets by status** operation, and optionally select a different value of the *status* **Query parameter**. 
1. Select **Send**.

The original API response should look similar to the following response:

Screenshot of the original API response in the Azure portal.

## Transform an API to add a custom response header

API Management includes several transformation policies that you can use to modify request or response payloads, headers, or status codes. In this example, you set a custom response header in the API response.

### Set the transformation policy

This section shows you how to configure a custom response header using the `set-header` policy. Here you use a form-based policy editor that simplifies the policy configuration.

1. Select **Swagger Petstore** > **Design** > **All operations**.
1. In the **Outbound processing** section, select **+ Add policy**.

   Screenshot of navigating to outbound policy in the portal.

1. In the **Add outbound policy** window, select **Set headers**.

   Screenshot of configuring the Set headers policy in the portal.

1. To configure the Set headers policy:

   1. Under **Name**, enter *Custom*.
   1. Under **Value**, select **+ Add value**. Enter *My custom value*.
   1. Select **Save**.
  
   After configuration, a **set-header** policy element appears in the **Outbound processing** section.

   Screenshot of the Set headers outbound policies in the portal.

## Protect an API by adding rate limit policy

This section shows how to add protection to your backend API by configuring rate limits, so that developers don't overuse the API. This example shows how to configure the `rate-limit-by-key` policy using the code editor. In this example, the limit is set to three calls per 15 seconds. After 15 seconds, a developer can retry calling the API.

> **Note:**
> This policy isn't supported in the Consumption tier.

1. Select **Swagger Petstore** > **Design** > **All operations**.
1. In the **Inbound processing** section, select the code editor (**</>**) icon.

   Screenshot of navigating to inbound policy code editor in the portal.

1. Position the cursor inside the `<inbound>` element on a blank line. Then, select **Show snippets** at the top-right corner of the screen.

    Screenshot of selecting show snippets in inbound policy editor in the portal.

1. In the right window, under **Access restriction policies**, select **Limit call rate per key**. 

    The `<rate-limit-by-key />` element is added at the cursor. 

   Screenshot of inserting limit call rate per key policy in the portal.

1. Modify your `<rate-limit-by-key />` code in the `<inbound>` element to the following code. Then select **Save**.
    ```xml
    <rate-limit-by-key calls="3" renewal-period="15" counter-key="@(context.Subscription.Id)" />
    ```

## Test the transformations

At this point, if you look at the code in the code editor, your policies look like the following code:

   ```xml
   <policies>
        <inbound>
            <rate-limit calls="3" renewal-period="15" counter-key="@(context.Subscription.Id)" />
            <base />
        </inbound>
        <outbound>
            <set-header name="Custom" exists-action="override">
                <value>"My custom value"</value>
              </set-header>
            <base />
        </outbound>
        <on-error>
            <base />
        </on-error>
    </policies>
   ```

The rest of this section tests policy transformations that you set in this article.

### Test the custom response header

1. Select **Swagger Petstore** > **Test**.
1. Select the **GET Finds Pets by status** operation, and optionally select a different value of the *status* **Query parameter**. Select **Send**.

    As you can see, the custom response header is added:

    Screenshot showing custom response header in the portal.


### Test the rate limit

1. Select **Swagger Petstore** > **Test**.
1. Select the **GET Finds Pets by status** operation. Select **Send** several times in a row.

    After sending too many requests in the configured period, you get the **429 Too Many Requests** response.

    Screenshot showing Too Many Requests in the response in the portal.

1. Wait for 15 seconds or more and then select **Send** again. This time you should get a **200 OK** response.

## Get Copilot assistance

You can get AI assistance from Copilot to create and edit your API Management policy definitions. You can use Copilot to create and update policies that match your specific requirements without needing to know the XML syntax. You can also get explanations of existing policies. And Copilot can help you translate policies that you might have configured in other API management solutions.

* [Azure Copilot](https://learn.microsoft.com/azure/copilot/author-api-management-policies?toc=%2Fazure%2Fapi-management%2Ftoc.json\&bc=%2Fazure%2Fapi-management%2Fbreadcrumb%2Ftoc.json) provides policy authoring assistance with natural language prompts in the Azure portal. You can author policies in the API Management policy editor and ask Copilot to explain policy sections.
* [GitHub Copilot for Azure in Visual Studio Code](api-management-debug-policies.md) provides policy authoring assistance in Visual Studio Code, and you can use the [Azure API Management Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-apimanagement&ssr=false#overview) to speed up policy configuration. You can prompt Copilot Chat or Copilot Edits with natural language to create and refine policy definitions in place.

Example prompt:

```copilot-prompt
Generate a policy that adds an Authorization header to the request with a Bearer token.
```
 
Copilot is powered by AI, so surprises and mistakes are possible. For more information, see [Copilot general use FAQs](https://aka.ms/copilot-general-use-faqs). 


## Summary

In this tutorial, you learned how to:

> 
>
> - Transform an API to set a custom response header
> - Protect an API by adding a rate limit policy
> - Test the transformations

## Next step

Advance to the next tutorial:

> 
> [Monitor your API](api-management-howto-use-azure-monitor.md)
