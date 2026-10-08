---
manager: mcleans
author: aahill
ms.author: aahi
ms.service: microsoft-foundry
ms.subservice: foundry-agent-service
ms.topic: include
ms.date: 07/11/2025
---

## Prerequisites
- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Ensure that the individual creating the account and project has the **Foundry Account Owner** role at the subscription scope, which will grant the necessary permissions for creating the project

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

    * Alternatively, having the **Contributor** or **Owner** role at the subscription level will allow the creation of the project
- Once the project is created, ensure that the individual creating the agent within the project has the **Foundry User** role at the project level

> **Important:**
> The Microsoft Foundry portal only supports basic agent setup at this time. If you want to perform a standard agent setup, see the [Environment setup](../environment-setup.md) article to learn about more.

## Create a Foundry account and project in Foundry portal

To create an account and project in Foundry, follow these steps:

1. Go to Foundry. If you are in a project, select Foundry at the top left of the page to go to the Home page.

1. Use the Agent getting started creation flow for the fastest experience. Click **Create an agent**.

    A screenshot of the Foundry portal.

1. Enter a name for the project. If you want to customize the default values, select **Advanced options**.

    A screenshot of the advanced options for creating a project.

1. Select **Create**.

1. Wait for your resources to be provisioned.
    1. An account and project (child resource of your account) will be created.
    1. The gpt-4o model will automatically be deployed
    1. A default agent will be created

1. Once complete, you will land directly in the agent playground and you can start creating agents. You can give your agent instructions on what to do and how to do it. For example: *"You are a helpful agent that can answer questions about geography."* Then you can start chatting with your agent.

    Screenshot of the agent playground.

    > **Note:**
    > If you are getting permission error when trying to configure or create agents ensure you have the **Foundry User** on the project.
