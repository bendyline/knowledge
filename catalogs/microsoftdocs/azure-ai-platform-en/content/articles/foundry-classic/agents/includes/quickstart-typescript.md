---
manager: mcleans
author: aahill
ms.author: aahi
ms.service: microsoft-foundry
ms.subservice: foundry-agent-service
ms.topic: include
ms.date: 09/12/2025
ms.custom: devx-track-ts, classic-and-new

---

| [Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-projects-readme) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/README.md) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-projects) |

## Prerequisites


* [A set up agent environment](../environment-setup.md)
* Assign the **Foundry User**  [RBAC role](../../concepts/rbac-foundry.md) to each team member who needs to create or edit agents using the SDK or Agent Playground

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

    * This role must be assigned at the project scope
    * Minimum required permissions: **agents/*/read**, **agents/*/action**, **agents/*/delete**


* [Node.js LTS](https://nodejs.org/)

## Configure and run an agent

Key objects in this code include: 

* [AgentsClient](https://learn.microsoft.com/javascript/api/@azure/ai-agents/agentsclient)

First, initialize a new TypeScript project by running:

```console
npm init -y
npm pkg set type="module"
```

Run the following commands to install the npm packages required.

```console
npm install @azure/ai-agents @azure/identity
npm install @types/node typescript --save-dev
```

Next, to authenticate your API requests and run the program, use the [az login](https://learn.microsoft.com/cli/azure/authenticate-azure-cli-interactively) command to sign into your Azure subscription.

```azurecli
az login
```

Use the following code to answer the math question `I need to solve the equation '3x + 11 = 14'. Can you help me?`. To run this code, you'll need to get the endpoint for your project. This string is in the format:

`https://<AIFoundryResourceName>.services.ai.azure.com/api/projects/<ProjectName>`


You can find your endpoint in the **overview** for your project in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs), under **Libraries** > **Foundry**.

A screenshot showing the endpoint in the Foundry portal.


Set this endpoint as an environment variable named `PROJECT_ENDPOINT` in a `.env` file.


You also need your model's deployment name. You can find it in **Models + Endpoints** in the left navigation menu. 

A screenshot showing the model deployment screen the Foundry portal.

Save the name of your model deployment name as an environment variable named `MODEL_DEPLOYMENT_NAME`. 

> **Important:** 
> * This quickstart code uses environment variables for sensitive configuration. Never commit your `.env` file to version control by making sure `.env` is listed in your `.gitignore` file.
> * _Remember: If you accidentally commit sensitive information, consider those credentials compromised and rotate them immediately._

Create a tsconfig.json file with the following content:

[Code reference unavailable in this source snapshot: ~/azure-sdk-for-js-docs/samples/foundry/azure-ai-agents-quickstart-math/tsconfig.json](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/agents/includes/quickstart-typescript.md)

Next, create an `index.ts` file and paste in the following code:

[Code reference unavailable in this source snapshot: ~/azure-sdk-for-js-docs/samples/foundry/azure-ai-agents-quickstart-math/index.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/agents/includes/quickstart-typescript.md)

Run the code using `npx tsx -r dotenv/config index.ts`. This code answers the question `I need to solve the equation '3x + 11 = 14'. Can you help me?`. Responses aren't deterministic, your output will look similar to the below output:

```console
Created agent, agent ID : asst_X4yDNWrdWKb8LN0SQ6xlzhWk
Created thread, thread ID : thread_TxqZcHL2BqkNWl9dFzBYMIU6
Threads for agent asst_X4yDNWrdWKb8LN0SQ6xlzhWk:
...
Created message, message ID : msg_R0zDsXdc2UbfsNXvS1zeS6hk
Creating run...
Received response with status: queued
Received response with status: in_progress
Received response with status: completed
Run finished with status: completed

========================================================
=================== CONVERSATION RESULTS ===================
========================================================

❓ USER QUESTION: I need to solve the equation `3x + 11 = 14`. Can you help me?

🤖 ASSISTANT'S ANSWER:
--------------------------------------------------
Certainly! Let's solve the equation step by step:

We have:
3x + 11 = 14

### Step 1: Eliminate the constant (+11) on the left-hand side.
Subtract 11 from both sides:
3x + 11 - 11 = 14 - 11
This simplifies to:
3x = 3

We have:
3x + 11 = 14

### Step 1: Eliminate the constant (+11) on the left-hand side.
Subtract 11 from both sides:
3x + 11 - 11 = 14 - 11
This simplifies to:
3x = 3

### Step 2: Solve for x.
Divide both sides by 3:
3x / 3 = 3 / 3
This simplifies to:
x = 1

### Final Answer:
x = 1
--------------------------------------------------

========================================================
====================== END OF RESULTS ======================
========================================================
```

 Full [sample source code](https://github.com/Azure-Samples/azure-sdk-for-js-docs/blob/main/samples/foundry/azure-ai-agents-quickstart-math) available.
