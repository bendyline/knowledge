---
title: Integrate with Power Platform and Logic Apps
titleSuffix: Azure Digital Twins
description: Learn how to connect Power Platform and Logic Apps to Azure Digital Twins using the connector
author: baanders
ms.author: baanders
ms.date: 03/12/2025
ms.topic: how-to
ms.service: azure-digital-twins

---

# Integrate with Power Platform and Logic Apps using the Azure Digital Twins connector

You can integrate Azure Digital Twins into a [Microsoft Power Platform](https://learn.microsoft.com/power-platform) or [Azure Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-overview.md) flow, using the *Azure Digital Twins Power Platform connector*. 

The connector is a wrapper around the Azure Digital Twins [data plane APIs](concepts-apis-sdks.md#data-plane-overview) for twin, model, and query operations, which allows the underlying service to talk to [Microsoft Power Automate](https://learn.microsoft.com/power-automate/getting-started), [Microsoft Power Apps](https://learn.microsoft.com/power-apps/powerapps-overview), and [Azure Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/logic-apps-overview.md). The connector provides a way for users to connect their accounts and apply a set of prebuilt actions to build their apps and workflows.

For an introduction to the connector, including a quick demo, watch the following IoT show video:

> [!VIDEO https://aka.ms/docs/player?id=d6c200c2-f622-4254-b61f-d5db613bbd11]

You can also complete a basic walkthrough in the blog post [Simplify building automated workflows and apps powered by Azure Digital Twins](https://techcommunity.microsoft.com/t5/internet-of-things-blog/simplify-building-automated-workflows-and-apps-powered-by-azure/ba-p/3763051). For more information about the connector, including a complete list of the connector's actions and their parameters, see the [Azure Digital Twins connector reference documentation](https://learn.microsoft.com/connectors/azuredigitaltwins).

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
Sign in to the [Azure portal](https://portal.azure.com) with your account. 


To work with Azure Digital Twins in this article, you need an Azure Digital Twins instance and the required permissions for using it. If you already have an Azure Digital Twins instance set up, you can use that instance and skip to the next section. Otherwise, follow the instructions in [Set up an instance and authentication](how-to-set-up-instance-portal.md). The instructions contain information to help you verify that you completed each step successfully.

After you set up your instance, make a note of the instance's host name. You can [find the host name in the Azure portal](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values).


Lastly, you need to set up any [Power Platform](https://learn.microsoft.com/power-platform) services where you want to use the connector.

## Set up the connector

For Power Automate and Power Apps, set up the connection first before creating a flow. Perform the following steps to add the connection in Power Automate and Power Apps.
1. Select **Connections** from the left navigation menu. On the Connections page, select **Create a connection**.
1. Search for *Azure Digital Twins*, and select the **Azure Digital Twins (preview)** connector.
1. Where the connector asks for **ADT Instance Name**, enter the [host name of your instance](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values).
1. Enter your authentication details when requested to finish setting up the connection.
1. To verify that the connection is created, look for it on the Connections page.
    Screenshot of Power Automate, showing the Azure Digital Twins connection on the Connections page.

For Logic Apps, you can use the Azure Digital Twins built-in connection when you [create a flow](#create-a-flow) in the next section. For more information on built-in connectors, see [Built-in connectors in Azure Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/connectors/built-in.md).

## Create a flow

You can incorporate Azure Digital Twins into Power Automate flows, Logic Apps flows, or Power Apps applications. Using the Azure Digital Twins connector and over 700 other Power Platform connectors, you can ingest data from other systems into your twins, or respond to system events.

### Power Automate

Perform the following steps to create a sample flow with the connector in Power Automate.
1. In [Power Automate](https://make.powerautomate.com/), select **My flows** from the left navigation menu. Select **+ New flow** and **Instant cloud flow**.
1. Enter a **Flow name** and select **Manually trigger a flow** from the list of triggers. **Create** the flow.
1. Add a step to the flow, and search for *Azure Digital Twins* to find the connection.
    Screenshot of Power Automate, showing the Azure Digital Twins connector in a new flow.
1. You see a list of all the [actions](https://learn.microsoft.com/connectors/azuredigitaltwins) that are available with the connector. Pick one of them to interact with the [Azure Digital Twins APIs](https://learn.microsoft.com/rest/api/azure-digitaltwins/).
1. Continue to edit or add more steps to your workflow, using other connectors to build out your integration scenario.
    Screenshot of Power Automate, showing a Get twin by ID action from the Azure Digital Twins connector in a flow.

### Power Apps

Perform the following steps to create a sample flow with the connector in Power Apps.
1. In [Power Apps](https://make.powerapps.com/), select **+ Create** from the left navigation menu. Select **Blank app** and follow the prompts to create a new blank canvas app.
    Screenshot of Power Apps, showing step to create a new blank app.
1. In the app builder, select **Data** from the left navigation menu. Select **Add data** and search for *Azure Digital Twins* to find the data connection. Select the Azure Digital Twins connection.
    Screenshot of Power Apps, showing the Azure Digital Twins connector as a data source.
1. Now, the [actions](https://learn.microsoft.com/connectors/azuredigitaltwins) from the Azure Digital Twins connector are available as functions to use in your app.
    Screenshot of Power Apps, showing the Azure Digital Twins function options.
1. You can continue to build out your application with access to Azure Digital Twins data. For more information about building Power Apps, see [Overview of creating apps in Power Apps](https://learn.microsoft.com/power-apps/maker/).

### Logic Apps

Perform the following steps to create a sample flow with the connector in Logic Apps.
1. Navigate to your logic app in the [Azure portal](https://portal.azure.com). Select **Development Tools > Logic app designer** from the left navigation menu.
1. Add a trigger to your app.
1. Add an action to the flow. To find the Azure Digital Twins connector, search for *Azure Digital Twins*. Select **See more**.
    Screenshot of Logic Apps, showing the Azure Digital Twins connector.
1. This shows you a list of all the [actions](https://learn.microsoft.com/connectors/azuredigitaltwins) that are available with the connector. Pick one of them to interact with the [Azure Digital Twins APIs](https://learn.microsoft.com/rest/api/azure-digitaltwins/).
1. After selecting an action from the Azure Digital Twins connector, you're asked to enter authentication details to create the connection. Where the connection asks for **ADT Instance Name**, enter the [host name of your instance](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values).
1. You can continue to edit or add more steps to your workflow, using other connectors to build out your integration scenario.

## Limitations and suggestions

Here are some limitations of the connector and suggestions for working with them.

* Some connector actions (such as Add Model) require input in the form of a literal string that starts with *@*. In these cases, escape the *@* character by using *@@* instead. Escaping the *@* character keeps the literal value from being interpreted as a JSON expression.
* Since Azure Digital Twins deals with dynamic schema responses, you should parse the JSON received from the APIs before consuming it in your application. For example, here's a set of calls that parse the data before extracting the `dtId` value: `Set(jsonVal, AzureDigitalTwins.GetTwinById("your_twin_id").result); Set(parsedResp, ParseJSON(jsonVal)); Set( DtId, Text(parsedResp.'$dtId'));`.

## Next steps

For more information about Power Platform connectors, including how to use them in workflows across multiple products, see the [Power Platform and Azure Logic Apps connectors documentation](https://learn.microsoft.com/connectors/connectors).
