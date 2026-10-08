---
title: Create Schedule-Based Workflows
description: Build an automated workflow that runs on a schedule and integrates cloud services using Azure Logic Apps.
ms.suite: integration
ms.reviewers: estfan, azla
ms.topic: tutorial
ms.update-cycle: 180-days
ms.date: 07/21/2026
ms.custom: mvc
#Customer intent: As an automation and integration developer who is new to Azure Logic Apps, I want to learn how to build a workflow that runs on a specified schedule.
---

# Tutorial: Create schedule-based automated workflows by using Azure Logic Apps


Applies to: **Azure Logic Apps (Consumption + Standard)**


Many business tasks must run on a recurring schedule, such as checking thresholds, polling for conditions, or sending periodic notifications. Manually handling these tasks is unreliable and doesn't scale. By using Azure Logic Apps, you can automate recurring tasks by building a workflow that triggers on a schedule and takes action based on the results.

This tutorial shows how to create a logic app workflow that runs every weekday morning, checks the travel time between two locations, and sends an email when the traffic exceeds a limit. This scenario demonstrates how to combine a schedule-based trigger with external data, conditional logic, and notifications. You can adapt this pattern to any recurring monitoring task.

When you finish, your workflow looks like the following high level example:

Screenshot shows example workflow that runs with the Recurrence trigger.

> **Note:**
>
> The example in this tutorial creates a Consumption logic app resource and workflow. You can create the same workflow for a Standard logic app resource, but the underlying architecture and [billing model](logic-apps-pricing.md) differ from the Consumption version.

## Prerequisites

- An Azure account and subscription. [Get free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An email account from an email provider supported by Azure Logic Apps, such as Office 365 Outlook or Outlook.com.

  This tutorial uses Office 365 Outlook with a work or school account. If you use Outlook.com, use your personal Microsoft account instead to sign in. If you use a different email service, the general steps stay the same, but the user experience might differ. For other supported email providers, see [Connectors for Azure Logic Apps](https://learn.microsoft.com/connectors/connector-reference/connector-reference-logicapps-connectors).

  > **Important:**
  >
  > If you want to use the Gmail connector, only G-Suite business accounts can use this connector without restriction in logic app workflows. 
  > If you have a Gmail consumer account, you can use this connector with only specific Google-approved services, or you can 
  > [create a Google client app to use for authentication with your Gmail connector](https://learn.microsoft.com/connectors/gmail/#authentication-and-bring-your-own-application). 
  > For more information, see [Data security and privacy policies for Google connectors in Azure Logic Apps](../connectors/connectors-google-data-security-privacy-policy.md).

- To get the travel time for a route, you need an access key for the Bing Maps API. To get this key, follow the steps for [how to get a Bing Maps key](https://learn.microsoft.com/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key).

- If your workflow needs to communicate through a firewall that limits traffic to specific IP addresses, that firewall needs to allow access for *both* the [inbound](logic-apps-limits-and-config.md#inbound) and [outbound](logic-apps-limits-and-config.md#outbound) IP addresses used by Azure Logic Apps in the Azure region where your logic app resource exists. If your workflow also uses [managed connectors](../connectors/managed.md), such as the Office 365 Outlook connector or SQL connector, or uses [custom connectors](https://learn.microsoft.com/connectors/custom-connectors/), the firewall also needs to allow access for *all* the [managed connector outbound IP addresses](logic-apps-limits-and-config.md#outbound) in your logic app resource's Azure region.

## Create a Consumption logic app resource

1. In the [Azure portal](https://portal.azure.com), sign in with your Azure account.

1. In the Azure portal search box, enter **logic app**, and select **Logic apps**.

   Screenshot shows Azure portal search box with logic app entered and selected option for Logic apps.

1. On the **Logic apps** page toolbar, select **+ Create**.

   The **Create Logic App** page appears and shows the following options:

   
   | Plan | Description |
   | --- | --- |
   | **Consumption** | Creates a logic app resource that supports only one workflow that runs in multitenant Azure Logic Apps and uses the [Consumption model for billing](logic-apps-pricing.md#consumption-pricing). |
   | **Standard** | Creates a logic app resource that supports multiple workflows. You have the following options: <br><br>- **Workflow Service Plan**: Workflows run in single-tenant Azure Logic Apps and use the [Standard model for billing](logic-apps-pricing.md#standard-pricing). <br><br>- **App Service Environment V3**: Workflows run in single-tenant Azure Logic Apps and use an [App Service Environment plan for billing](../app-service/environment/overview.md#pricing). <br><br>- **Hybrid**: Workflows run on-premises and in multiple clouds using [Kubernetes Event-driven Autoscaling (KEDA)](https://learn.microsoft.com/azure/aks/keda-about). For more information, see [Create Standard workflows for hybrid deployment](create-standard-workflows-hybrid-deployment.md). |

1. On the **Create Logic App** page, select **Consumption (Multi-tenant)**.

1. On the **Basics** tab, provide the following information about your logic app resource:

   | Property | Required | Value | Description |
   | --- | --- | --- | --- |
   | **Subscription** | Yes | <*Azure-subscription-name*> | Your Azure subscription name. <br><br>This example uses **Pay-As-You-Go**. |
   | **Resource Group** | Yes | <*Azure-resource-group-name*> | The [Azure resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md#terminology) where you create your logic app and related resources. This name must be unique across regions and can contain only letters, numbers, hyphens (**-**), underscores (**_**), parentheses (**()**), and periods (**.**). <br><br>This example creates a resource group named **LA-TravelTime-RG**. |
   | **Logic App name** | Yes | <*logic-app-resource-name*> | Your logic app resource name, which must be unique across regions and can contain only letters, numbers, hyphens (**-**), underscores (**_**), parentheses (**()**), and periods (**.**). <br><br>This example creates a logic app resource named **LA-TravelTime**. |
   | **Region** | Yes | <*Azure-region*> | The Azure datacenter region for your app. <br><br>This example uses **West US**. |
   | **Enable log analytics** | Yes | **No** | Change this option only when you want to enable diagnostic logging. For this tutorial, keep the default selection. <br><br>**Note**: This option is available only with Consumption logic apps. |

   > **Note:**
   >
   > Availability zones are automatically enabled for new and existing Consumption logic app workflows in 
   > [Azure regions that support availability zones](https://learn.microsoft.com/azure/reliability/availability-zones-region-support). 
   > For more information, see [Reliability in Azure Functions](https://learn.microsoft.com/azure/reliability/reliability-functions#resilience-to-availability-zone-failures) and 
   > [Protect logic apps from region failures with zone redundancy and availability zones](set-up-zone-redundancy-availability-zones.md).

   After you finish, your settings look similar to the following example:

   Screenshot shows Azure portal and creation page for multitenant Consumption logic app and details.

1. When you finish, select **Review + create**. After Azure validates the information about your logic app resource, select **Create**.

1. After Azure deploys your logic app resource, select **Go to resource**. Or, find and select your logic app resource by using the Azure search box.

Next, add the **Schedule** trigger named **Recurrence**, which runs the workflow based on a specified schedule. Every workflow must start with a trigger, which fires when a specific event happens or when new data meets a specific condition.

## Add the Recurrence trigger

1. Under **Development Tools**, select **Logic app designer**. On the designer, [follow these general steps to add the **Schedule** trigger named **Recurrence**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/create-workflow-with-trigger-or-action.md?tabs=consumption#add-trigger).

1. Rename the **Recurrence** trigger with the following title: **Check travel time every weekday morning**.

   Screenshot shows workflow designer and information pane for Recurrence trigger with renamed trigger.

1. In the trigger information box, provide the following information:

   | Parameter | Value | Description |
   | --- | --- | --- |
   | **Interval** | 1 | The number of intervals to wait between checks |
   | **Frequency** | Week | The unit of time to use for the recurrence |
   | **On these days** | Monday, Tuesday, Wednesday, Thursday, Friday | This setting is available only when you set the **Frequency** to **Week**. |
   | **At these hours** | 7, 8, 9 | This setting is available only when you set the **Frequency** to **Week** or **Day**. For this recurrence, select the hours of the day. This example runs at the **7**, **8**, and **9**-hour marks. |
   | **At these minutes** | 0, 15, 30, 45 | This setting is available only when you set the **Frequency** to **Week** or **Day**. For this recurrence, select the minutes of the day. This example starts at the zero-hour mark and runs every 15 minutes. |

   When you finish, the trigger information box appears similar to the following example:

   Screenshot shows week-related properties set to values described in the preceding table.

   This trigger fires every weekday, every 15 minutes, starting at 7:00 AM and ending at 9:45 AM. The **Preview** box shows the recurrence schedule. For more information, see [Schedule tasks and workflows](../connectors/connectors-native-recurrence.md) and [Workflow actions and triggers](logic-apps-workflow-actions-triggers.md#recurrence-trigger).

1. Save your workflow. On the designer toolbar, select **Save**.

Your logic app resource and updated workflow are now live in the Azure portal. However, the workflow only triggers based on the specified schedule and doesn't perform other actions. So, add an action that responds when the trigger fires.

## Get the travel time for a route

Now that you have a trigger, add a **Bing Maps** action that gets the travel time between two places. Azure Logic Apps provides a connector for the Bing Maps API so that you can easily get this information. Before you start this task, make sure that you have a Bing Maps API key as described in this tutorial's prerequisites.

1. In the workflow designer, under the **Recurrence** trigger, [follow these general steps to add a **Bing Maps** action named **Get route**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/create-workflow-with-trigger-or-action.md?tabs=consumption#add-action).

1. If you don't have a Bing Maps connection, you're asked to create a connection. Provide the following connection information, and select **Create**.

   | Parameter | Required | Value | Description |
   | --- | --- | --- | --- |
   | **Connection Name** | Yes | <*Bing-Maps-connection-name*> | Provide a name for your connection. This example uses **BingMapsConnection**. |
   | **API Key** | Yes | <*Bing-Maps-API-key*> | Enter the Bing Maps API key that you previously received. If you don't have a Bing Maps key, learn [how to get a key](https://learn.microsoft.com/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key). |

   The following example shows sample connection information:

   Screenshot shows Bing Maps connection box with the example connection name and Bing Maps API key.

1. Rename the **Get route** action with the following title: **Get route and travel time with traffic**.

1. In the action, open the **Advanced parameters** list, and add the following properties:

   * **Optimize**
   * **Distance unit**
   * **Travel mode**

1. Now enter the values for the following action's properties:

   | Parameter | Value | Description |
   | --- | --- | --- |
   | **Waypoint 1** | <*start-location*> | Your route's origin. This example specifies an example starting address. |
   | **Waypoint 2** | <*end-location*> | Your route's destination. This example specifies an example destination address. |
   | **Travel mode** | Driving | The travel mode for your route. Select **Driving** mode. |
   | **Optimize** | timeWithTraffic | A parameter to optimize your route, such as distance, travel time with current traffic, and so on. Select the parameter value, **timeWithTraffic**. |
   | **Distance unit** | <*your-preference*> | The unit of distance for your route. This example uses **Mile** as the unit. |


   For more information about these parameters and values, see [Calculate a route](https://learn.microsoft.com/bingmaps/rest-services/routes/calculate-a-route).

   The following example shows sample action information:

   Screenshot shows completed action named Get route.

1. On the designer toolbar, select **Save**.

Next, create a variable so that you can convert and store the current travel time as minutes, rather than seconds. That way, you can avoid repeating the conversion and use the value more easily in later steps. 

## Create a variable to store travel time

Sometimes, you want to run operations on data in your workflow and then use the results in later actions. To save these results so you can easily reuse or reference them, create variables that store those results after processing. You can create variables only at the top level in your workflow.

By default, the **Get route** action returns the current travel time with traffic in seconds from the **Travel Duration Traffic** property. By converting and storing this value as minutes instead, you make the value easier to reuse later without converting again.

1. Under the **Get route** action, [follow these general steps to add a **Variables** action named **Initialize variables**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/create-workflow-with-trigger-or-action.md?tabs=consumption#add-action).

1. Rename the **Initialize variables** action with the following title: **Create variable to store travel time**.

1. Provide the following action information:

   | Parameter | Value | Description |
   | --- | --- | --- |
   | **Name** | travelTime | The name for your variable. This example uses *travelTime*. |
   | **Type** | Integer | The data type for your variable |
   | **Value** | <*initial-value*> | An expression that converts the current travel time from seconds to minutes (see the following steps). |

   To create the expression for the **Value** property, follow these steps:

   1. Select inside the **Value** box, which shows the options for the dynamic content list (lightning icon) and expression editor (formula icon), and then select the expression editor.

      Screenshot shows the action named Initialize variables with cursor inside the Value property.

      The expression editor provides functions that you can use to perform operations in your expression. The dynamic content list provides the outputs from previous actions that you can select as inputs to use with subsequent actions in your workflow.

   1. In the expression editor, enter the following expression: **div(,60)**

      Screenshot shows the expression editor with the expression entered for div(,60).

   1. Within the expression, put your cursor between the left parenthesis (**(**) and the comma (**,**), and select **Dynamic content**.

      Screenshot shows where to put cursor in the div(,60) expression and select Dynamic content.

   1. In the dynamic content list, select the output value named **Travel Duration Traffic**.

      If the output doesn't appear, in the dynamic content list, next to the action name, select **See more**.

      Screenshot shows the value selected for output named Travel Duration Traffic.

   1. After the output value resolves inside the expression, select **Add**.

      Screenshot shows selected Add button.

      The following example shows how the **Value** property now appears:

      Screenshot shows the Value property with resolved expression.

1. Save your workflow. On the designer toolbar, select **Save**.

Next, add a condition that checks whether the current travel time is greater than a specific limit.

## Compare the travel time

1. Under the **Create variable to store travel time** action, [follow these general steps to add a **Control** action named **Condition**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/create-workflow-with-trigger-or-action.md?tabs=consumption#add-action).

1. Rename the condition with the following title: **If travel time exceeds limit**

1. Build a condition that checks whether the **travelTime** output value exceeds your specified limit as described and shown here:

   1. In the condition, on the condition's left side, select inside the **Choose a value** box, and then select the option for the dynamic content list (lightning icon).

   1. Under **Variables**, select the output named **travelTime**.

      Screenshot shows left box named Choose a value, opened dynamic content list, and travelTime output selected.

   1. In the middle comparison box, select the **>** operator.

   1. On the condition's right side, in the **Choose a value** box, enter the following value: **15**

      When you finish, the condition looks like the following example:

      Screenshot shows finished condition for comparing the travel time to the specified limit.

1. Save your workflow. On the designer toolbar, select **Save**.

Next, add the action to run when the travel time exceeds your limit.

## Send email when limit exceeded

Now, add an action that sends an email when the travel time exceeds your limit. This email includes the current travel time and the extra time necessary to travel the specified route.

1. In the condition's **True** branch, select the plus sign (**+**), and then select **Add an action**.

1. [Follow these general steps to add an **Office 365 Outlook** action named **Send an email (V2)**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/create-workflow-with-trigger-or-action.md?tabs=consumption#add-action).

   * For Azure work or school accounts, select the **Office 365 Outlook** version.
   * For personal Microsoft accounts, select the **Outlook.com** version.

   This example continues by selecting Office 365 Outlook.

   Screenshot shows Office 365 Outlook action selected named Send an email (V2).

1. If you don't already have a connection, sign in and authenticate access to your email account when prompted.

   Azure Logic Apps creates a connection to your email account.

1. Rename the action with the following title: **Send email with travel time**

1. For the **To** property, enter the recipient's email address. For testing purposes, you can use your email address.

1. For the **Subject** property, specify the email's subject, and include the **travelTime** variable by following these steps:

   1. Enter the text **Current travel time (minutes):** with a trailing space. Keep your cursor in the **Subject** box, and select the option for the dynamic content list (lightning icon).

   1. In the dynamic content list, in the **Variables** section, select the variable named **travelTime**.

      > **Note:**
      >
      > If the dynamic content list doesn't automatically show the **travelTime** variable, next to the **Variables** label, select **See more**. The variable might not appear 
      > because the **Subject** property expects a string value, while **travelTime** is an integer.

1. For the **Body** property, specify the content for the email body by following these steps:

   1. Enter the text **Add extra travel time (minutes):** with a trailing space. Keep your cursor in the **Body** box, and select the option for the expression editor (formula icon).

   1. In the expression editor, enter **sub(,15)** so that you can calculate the number of minutes that exceed your limit:

      Screenshot shows expression editor with the sub(,15) entered.

   1. Within the expression, put your cursor between the left parenthesis (**(**) and the comma (**,**), and select **Dynamic content**.

      Screenshot shows where to put cursor in the sub(,15) expression, and select Dynamic content.

   1. Under **Variables**, select **travelTime**.

      Screenshot shows dynamic content list with travelTime variable selected.

   1. After the variable resolves inside the expression, select **Add**.

      The **Body** property now appears as shown here:

      Screenshot shows the resolved expression in the email action's Body property.

1. Save your workflow. On the designer toolbar, select **Save**.

Your finished workflow looks similar to the following example:

Screenshot shows complete example logic app workflow.

## Run your workflow

To manually start your workflow, on the designer toolbar, select **Run** > **Run**.

* If the current travel time stays under your limit, your workflow does nothing else and waits for the next interval before checking again.

* If the current travel time exceeds your limit, you get an email with the current travel time and the number of minutes above your limit. The following example shows a sample email that your workflow sends:

  Screenshot shows example email that reports current travel time and extra travel time that exceeds your specified limit.

  > **Tip:**
  >
  > If you don't get any emails, check your email's junk folder. Your email junk filter might 
  > redirect these kinds of mails. Otherwise, if you're unsure that your workflow ran correctly, 
  > see [Troubleshoot your workflow](logic-apps-diagnosing-failures.md).

Congratulations, you created and ran a schedule-based recurring workflow!

## Clean up resources

Your workflow keeps running until you disable or delete the logic app resource. When you no longer need this sample, delete the resource group that contains your logic app and related resources.

1. In the Azure portal search box, enter **resource groups**, and select **Resource groups**.

1. From the **Resource groups** list, select the resource group for this tutorial.

1. On the resource group menu, select **Overview**.

1. On the **Overview** page toolbar, select **Delete resource group**.

1. When the confirmation pane appears, enter the resource group name, and select **Delete**.

## Related content

In this tutorial, you created a logic app workflow that checks traffic based on a specified schedule (on weekday mornings). The workflow takes action (sends an email) when the travel time exceeds a specified limit. Now, learn how to build a workflow that sends mailing list requests for approval by integrating Azure services, Microsoft services, and other Software-as-a-Service (SaaS) apps.

> 
> [Manage mailing list requests](tutorial-process-mailing-list-subscriptions-workflow.md)
