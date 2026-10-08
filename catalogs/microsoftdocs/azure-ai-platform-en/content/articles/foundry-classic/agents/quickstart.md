---
title: "Quickstart - Create a new Foundry Agent Service project (classic)"
description: "Use this guide to start using Foundry Agent Service. (classic)"
author: aahill
ms.author: aahi
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-agent-service
ms.topic: quickstart
ms.date: 12/03/2025
ms.custom:
  - azure-ai-agents
  - build-2025
zone_pivot_groups: agents-quickstart
ai-usage: ai-assisted
---

# Quickstart: Create a new agent (classic)


> **Note:** 
> This document refers to the Microsoft Foundry (classic) portal.
> 
> Agents (classic) are now deprecated and will be retired on March 31, 2027. Use the new agents in the generally available [Microsoft Foundry Agents Service](../../foundry/agents/overview.md). Follow the [migration guide](../../foundry/agents/how-to/migrate.md) to update your workloads.

> **Note:**
> This quickstart is for the previous version of agents. To use the new version of the API, see the [**quickstart for Microsoft Foundry**](../../foundry/quickstarts/get-started-code.md).

Foundry Agent Service allows you to create AI agents tailored to your needs through custom instructions and augmented by advanced tools like code interpreter, and custom functions.

**Applies to: ai-foundry-portal**



## Prerequisites
- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Ensure that the individual creating the account and project has the **Foundry Account Owner** role at the subscription scope, which will grant the necessary permissions for creating the project

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

    * Alternatively, having the **Contributor** or **Owner** role at the subscription level will allow the creation of the project
- Once the project is created, ensure that the individual creating the agent within the project has the **Foundry User** role at the project level

> **Important:**
> The Microsoft Foundry portal only supports basic agent setup at this time. If you want to perform a standard agent setup, see the [Environment setup](environment-setup.md) article to learn about more.

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




**Applies to: programming-language-csharp**



| [Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/ai.agents.persistent-readme) | [Samples](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples-classic/csharp/getting-started-agents) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/ai/Azure.AI.Agents.Persistent) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.Agents.Persistent) |

## Prerequisites


* [A set up agent environment](environment-setup.md)
* Assign the **Foundry User**  [RBAC role](../concepts/rbac-foundry.md) to each team member who needs to create or edit agents using the SDK or Agent Playground

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

    * This role must be assigned at the project scope
    * Minimum required permissions: **agents/*/read**, **agents/*/action**, **agents/*/delete**



## Configure and run an agent

Create a .NET Console project.

```console
dotnet new console
```

Install the .NET package to your project. For example if you're using the .NET CLI, run the following command.

```console
dotnet add package Azure.AI.Agents.Persistent
dotnet add package Azure.Identity
```

Next, to authenticate your API requests and run the program, use the [az login](https://learn.microsoft.com/cli/azure/authenticate-azure-cli-interactively) command to sign into your Azure subscription.

```azurecli
az login
```

Use the following code to create and run an agent. To run this code, you will need to get the endpoint for your project. This string is in the format:

`https://<AIFoundryResourceName>.services.ai.azure.com/api/projects/<ProjectName>`


> **Important:**
> Starting in May 2025, the Azure AI Agent Service uses an endpoint for [Foundry projects](../what-is-foundry.md#types-of-projects) instead of the connection string that was previously used for hub-based projects. If you're using a hub-based project, you won't be able to use the current versions of the SDK and REST API. For more information, see [SDK usage with hub-based projects](how-to/use-your-own-resources.md#sdk-usage-with-hub-based-projects).



You can find your endpoint in the **overview** for your project in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs), under **Libraries** > **Foundry**.

A screenshot showing the endpoint in the Foundry portal.


Set this endpoint in an environment variable named `ProjectEndpoint`.


You also need your model's deployment name. You can find it in **Models + Endpoints** in the left navigation menu. 

A screenshot showing the model deployment screen the Foundry portal.

Save the name of your model deployment name as an environment variable named `ModelDeploymentName`. 


```csharp
using Azure;
using Azure.AI.Agents.Persistent;
using Azure.Identity;
using System.Diagnostics;

var projectEndpoint = System.Environment.GetEnvironmentVariable("ProjectEndpoint");
var modelDeploymentName = System.Environment.GetEnvironmentVariable("ModelDeploymentName");



//Create a PersistentAgentsClient and PersistentAgent.
PersistentAgentsClient client = new(projectEndpoint, new DefaultAzureCredential());

//Give PersistentAgent a tool to execute code using CodeInterpreterToolDefinition.
PersistentAgent agent = client.Administration.CreateAgent(
    model: modelDeploymentName,
    name: "My Test Agent",
    instructions: "You politely help with math questions. Use the code interpreter tool when asked to visualize numbers.",
    tools: [new CodeInterpreterToolDefinition()]
);

//Create a thread to establish a session between Agent and a User.
PersistentAgentThread thread = client.Threads.CreateThread();

//Ask a question of the Agent.
client.Messages.CreateMessage(
    thread.Id,
    MessageRole.User,
    "Hi, Agent! Draw a graph for a line with a slope of 4 and y-intercept of 9.");

//Have Agent begin processing user's question with some additional instructions associated with the ThreadRun.
ThreadRun run = client.Runs.CreateRun(
    thread.Id,
    agent.Id,
    additionalInstructions: "Please address the user as Jane Doe. The user has a premium account.");

//Poll for completion.
do
{
    Thread.Sleep(TimeSpan.FromMilliseconds(500));
    run = client.Runs.GetRun(thread.Id, run.Id);
}
while (run.Status == RunStatus.Queued
    || run.Status == RunStatus.InProgress
    || run.Status == RunStatus.RequiresAction);

//Get the messages in the PersistentAgentThread. Includes Agent (Assistant Role) and User (User Role) messages.
Pageable<PersistentThreadMessage> messages = client.Messages.GetMessages(
    threadId: thread.Id,
    order: ListSortOrder.Ascending);

//Display each message and open the image generated using CodeInterpreterToolDefinition.
foreach (PersistentThreadMessage threadMessage in messages)
{
    foreach (MessageContent content in threadMessage.ContentItems)
    {
        switch (content)
        {
            case MessageTextContent textItem:
                Console.WriteLine($"[{threadMessage.Role}]: {textItem.Text}");
                break;
            case MessageImageFileContent imageFileContent:
                Console.WriteLine($"[{threadMessage.Role}]: Image content file ID = {imageFileContent.FileId}");
                BinaryData imageContent = client.Files.GetFileContent(imageFileContent.FileId);
                string tempFilePath = Path.Combine(AppContext.BaseDirectory, $"{Guid.NewGuid()}.png");
                File.WriteAllBytes(tempFilePath, imageContent.ToArray());
                client.Files.DeleteFile(imageFileContent.FileId);

                ProcessStartInfo psi = new()
                {
                    FileName = tempFilePath,
                    UseShellExecute = true
                };
                Process.Start(psi);
                break;
        }
    }
}

//If you want to delete your agent, uncomment the following lines:
//client.Threads.DeleteThread(threadId: thread.Id);
//client.Administration.DeleteAgent(agentId: agent.Id);
```




**Applies to: programming-language-python-azure**




| [Reference documentation](https://aka.ms/azsdk/azure-ai-projects/python/reference) | [Samples](https://aka.ms/azsdk/azure-ai-projects/python/samples/) | [Library source code](https://aka.ms/azsdk/azure-ai-projects/python/code) | [Package (PyPi)](https://aka.ms/azsdk/azure-ai-projects/python/package) |

## Prerequisites


* [A set up agent environment](environment-setup.md)
* Assign the **Foundry User**  [RBAC role](../concepts/rbac-foundry.md) to each team member who needs to create or edit agents using the SDK or Agent Playground

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

    * This role must be assigned at the project scope
    * Minimum required permissions: **agents/*/read**, **agents/*/action**, **agents/*/delete**





## Configure and run an agent

Run the following commands to install the python packages.

```console
pip install azure-ai-projects
pip install azure-identity
```
Next, to authenticate your API requests and run the program, use the [az login](https://learn.microsoft.com/cli/azure/authenticate-azure-cli-interactively) command to sign into your Azure subscription.

```azurecli
az login
```

Use the following code to create and run an agent. To run this code, you will need to get the endpoint for your project. This string is in the format:

`https://<AIFoundryResourceName>.services.ai.azure.com/api/projects/<ProjectName>`


> **Important:**
> Starting in May 2025, the Azure AI Agent Service uses an endpoint for [Foundry projects](../what-is-foundry.md#types-of-projects) instead of the connection string that was previously used for hub-based projects. If you're using a hub-based project, you won't be able to use the current versions of the SDK and REST API. For more information, see [SDK usage with hub-based projects](how-to/use-your-own-resources.md#sdk-usage-with-hub-based-projects).



You can find your endpoint in the **overview** for your project in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs), under **Libraries** > **Foundry**.

A screenshot showing the endpoint in the Foundry portal.


Set this endpoint as an environment variable named `PROJECT_ENDPOINT`.


You also need your model's deployment name. You can find it in **Models + Endpoints** in the left navigation menu. 

A screenshot showing the model deployment screen the Foundry portal.

Save the name of your model deployment name as an environment variable named `MODEL_DEPLOYMENT_NAME`.

```python
import os
from pathlib import Path
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import CodeInterpreterTool

# Create an AIProjectClient instance
project_client = AIProjectClient(
    endpoint=os.getenv("PROJECT_ENDPOINT"),
    credential=DefaultAzureCredential(),  
    # Use Azure Default Credential for authentication
)

with project_client:

    code_interpreter = CodeInterpreterTool()

    agent = project_client.agents.create_agent(
        model=os.getenv("MODEL_DEPLOYMENT_NAME"),  # Model deployment name
        name="my-agent",  # Name of the agent
        instructions="""You politely help with math questions. 
        Use the Code Interpreter tool when asked to visualize numbers.""",  
        # Instructions for the agent
        tools=code_interpreter.definitions,  # Attach the tool
        tool_resources=code_interpreter.resources,  # Attach tool resources
    )
    print(f"Created agent, ID: {agent.id}")

    # Create a thread for communication
    thread = project_client.agents.threads.create()
    print(f"Created thread, ID: {thread.id}")

    question = """Draw a graph for a line with a slope of 4 
    and y-intercept of 9 and provide the file to me?"""

    # Add a message to the thread
    message = project_client.agents.messages.create(
        thread_id=thread.id,
        role="user",  # Role of the message sender
        content=question,  # Message content
    )
    print(f"Created message, ID: {message['id']}")

    # Create and process an agent run
    run = project_client.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent.id,
        additional_instructions="""Please address the user as Jane Doe.
        The user has a premium account.""",
    )

    print(f"Run finished with status: {run.status}")

    # Check if the run failed
    if run.status == "failed":
        print(f"Run failed: {run.last_error}")

    # Fetch and log all messages
    messages = project_client.agents.messages.list(thread_id=thread.id)
    print(f"Messages: {messages}")

    for message in messages:
        print(f"Role: {message.role}, Content: {message.content}")
        for this_content in message.content:
            print(f"Content Type: {this_content.type}, Content Data: {this_content}")
            if this_content.text.annotations:
                for annotation in this_content.text.annotations:
                    print(f"Annotation Type: {annotation.type}, Text: {annotation.text}")
                    print(f"Start Index: {annotation.start_index}")
                    print(f"End Index: {annotation.end_index}")
                    print(f"File ID: {annotation.file_path.file_id}")
                    # Save every image file in the message
                    file_id = annotation.file_path.file_id
                    file_name = f"{file_id}_image_file.png"
                    project_client.agents.files.save(file_id=file_id, file_name=file_name)
                    print(f"Saved image file to: {Path.cwd() / file_name}")
    #Uncomment these lines to delete the agent when done
    #project_client.agents.delete_agent(agent.id)
    #print("Deleted agent")
```




**Applies to: programming-language-typescript**



| [Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-projects-readme) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/README.md) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-projects) |

## Prerequisites


* [A set up agent environment](environment-setup.md)
* Assign the **Foundry User**  [RBAC role](../concepts/rbac-foundry.md) to each team member who needs to create or edit agents using the SDK or Agent Playground

  
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

[Code reference unavailable in this source snapshot: ~/azure-sdk-for-js-docs/samples/foundry/azure-ai-agents-quickstart-math/tsconfig.json](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/agents/quickstart.md)

Next, create an `index.ts` file and paste in the following code:

[Code reference unavailable in this source snapshot: ~/azure-sdk-for-js-docs/samples/foundry/azure-ai-agents-quickstart-math/index.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/agents/quickstart.md)

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



**Applies to: programming-language-java**



| [Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-agents-persistent-readme) | [Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/ai/azure-ai-agents-persistent/src/samples/java/com/azure/ai/agents/persistent) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/ai/azure-ai-agents-persistent) | [Package (Maven)](https://central.sonatype.com/artifact/com.azure/azure-ai-agents-persistent) |

## Prerequisites


* [A set up agent environment](environment-setup.md)
* Assign the **Foundry User**  [RBAC role](../concepts/rbac-foundry.md) to each team member who needs to create or edit agents using the SDK or Agent Playground

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

    * This role must be assigned at the project scope
    * Minimum required permissions: **agents/*/read**, **agents/*/action**, **agents/*/delete**



## Configure and run an agent

First, create a New Java console project. You'll need the following dependencies to run the code:
    
```xml
<dependencies>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-agents-persistent</artifactId>
        <version>1.0.0-beta.2</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.17.0-beta.1</version>
    </dependency>
</dependencies>
```

Next, to authenticate your API requests and run the program, use the [az login](https://learn.microsoft.com/cli/azure/authenticate-azure-cli-interactively) command to sign into your Azure subscription.

```azurecli
az login
```

Use the following code to create and run an agent. To run this code, you'll need to get the endpoint for your project. This string is in the format:

`https://<AIFoundryResourceName>.services.ai.azure.com/api/projects/<ProjectName>`


> **Important:**
> Starting in May 2025, the Azure AI Agent Service uses an endpoint for [Foundry projects](../what-is-foundry.md#types-of-projects) instead of the connection string that was previously used for hub-based projects. If you're using a hub-based project, you won't be able to use the current versions of the SDK and REST API. For more information, see [SDK usage with hub-based projects](how-to/use-your-own-resources.md#sdk-usage-with-hub-based-projects).



You can find your endpoint in the **overview** for your project in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs), under **Libraries** > **Foundry**.

A screenshot showing the endpoint in the Foundry portal.


Set this endpoint in an environment variable named `PROJECT_ENDPOINT`.


You also need your model's deployment name. You can find it in **Models + Endpoints** in the left navigation menu. 

A screenshot showing the model deployment screen the Foundry portal.

Save the name of your model deployment name as an environment variable named `MODEL_DEPLOYMENT_NAME`. 

## Code example

```java
package com.example.agents;

import com.azure.ai.agents.persistent.MessagesClient;
import com.azure.ai.agents.persistent.PersistentAgentsAdministrationClient;
import com.azure.ai.agents.persistent.PersistentAgentsClient;
import com.azure.ai.agents.persistent.PersistentAgentsClientBuilder;
import com.azure.ai.agents.persistent.RunsClient;
import com.azure.ai.agents.persistent.ThreadsClient;
import com.azure.ai.agents.persistent.models.CodeInterpreterToolDefinition;
import com.azure.ai.agents.persistent.models.CreateAgentOptions;
import com.azure.ai.agents.persistent.models.CreateRunOptions;
import com.azure.ai.agents.persistent.models.MessageImageFileContent;
import com.azure.ai.agents.persistent.models.MessageRole;
import com.azure.ai.agents.persistent.models.MessageTextContent;
import com.azure.ai.agents.persistent.models.PersistentAgent;
import com.azure.ai.agents.persistent.models.PersistentAgentThread;
import com.azure.ai.agents.persistent.models.RunStatus;
import com.azure.ai.agents.persistent.models.ThreadMessage;
import com.azure.ai.agents.persistent.models.ThreadRun;
import com.azure.ai.agents.persistent.models.MessageContent;
import com.azure.core.http.rest.PagedIterable;
import com.azure.identity.DefaultAzureCredentialBuilder;
import java.util.Arrays;

public class AgentSample {

    public static void main(String[] args) {
        // variables for authenticating requests to the agent service 
        String projectEndpoint = System.getenv("PROJECT_ENDPOINT");
        String modelName = System.getenv("MODEL_DEPLOYMENT_NAME");

        // initialize clients to manage various aspects of agent runtime
        PersistentAgentsClientBuilder clientBuilder = new PersistentAgentsClientBuilder()
            .endpoint(projectEndpoint)
            .credential(new DefaultAzureCredentialBuilder().build());
        PersistentAgentsClient agentsClient = clientBuilder.buildClient();
        PersistentAgentsAdministrationClient administrationClient = agentsClient.getPersistentAgentsAdministrationClient();
        ThreadsClient threadsClient = agentsClient.getThreadsClient();
        MessagesClient messagesClient = agentsClient.getMessagesClient();
        RunsClient runsClient = agentsClient.getRunsClient();
        
        
        String agentName = "my-agent"; // the name of the agent
        CreateAgentOptions createAgentOptions = new CreateAgentOptions(modelName)
            .setName(agentName)
            .setInstructions("You are a helpful agent") // system instructions
            .setTools(Arrays.asList(new CodeInterpreterToolDefinition()));
        PersistentAgent agent = administrationClient.createAgent(createAgentOptions);

        PersistentAgentThread thread = threadsClient.createThread();
        ThreadMessage createdMessage = messagesClient.createMessage(
            thread.getId(),
            MessageRole.USER,
            "I need to solve the equation `3x + 11 = 14`. Can you help me?"); // The message to the agent

        try {
            //run the agent
            CreateRunOptions createRunOptions = new CreateRunOptions(thread.getId(), agent.getId())
                .setAdditionalInstructions("");
            ThreadRun threadRun = runsClient.createRun(createRunOptions);
            // wait for the run to complete before printing the message
            waitForRunCompletion(thread.getId(), threadRun, runsClient);
            printRunMessages(messagesClient, thread.getId());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            //cleanup - uncomment these lines if you want to delete the agent
            //threadsClient.deleteThread(thread.getId());
            //administrationClient.deleteAgent(agent.getId());
        }
    }

    // A helper function to print messages from the agent
    public static void printRunMessages(MessagesClient messagesClient, String threadId) {

        PagedIterable<ThreadMessage> runMessages = messagesClient.listMessages(threadId);
        for (ThreadMessage message : runMessages) {
            System.out.print(String.format("%1$s - %2$s : ", message.getCreatedAt(), message.getRole()));
            for (MessageContent contentItem : message.getContent()) {
                if (contentItem instanceof MessageTextContent) {
                    System.out.print((((MessageTextContent) contentItem).getText().getValue()));
                } else if (contentItem instanceof MessageImageFileContent) {
                    String imageFileId = (((MessageImageFileContent) contentItem).getImageFile().getFileId());
                    System.out.print("Image from ID: " + imageFileId);
                }
                System.out.println();
            }
        }
    }

    // a helper function to wait until a run has completed running
    public static void waitForRunCompletion(String threadId, ThreadRun threadRun, RunsClient runsClient)
        throws InterruptedException {

        do {
            Thread.sleep(500);
            threadRun = runsClient.getRun(threadId, threadRun.getId());
        }
        while (
            threadRun.getStatus() == RunStatus.QUEUED
                || threadRun.getStatus() == RunStatus.IN_PROGRESS
                || threadRun.getStatus() == RunStatus.REQUIRES_ACTION);

        if (threadRun.getStatus() == RunStatus.FAILED) {
            System.out.println(threadRun.getLastError().getMessage());
        }
    }
}
```



**Applies to: rest-api**


| [Reference documentation](https://learn.microsoft.com/rest/api/microsoft-foundry/) |

## Prerequisites


* [A set up agent environment](environment-setup.md)
* Assign the **Foundry User**  [RBAC role](../concepts/rbac-foundry.md) to each team member who needs to create or edit agents using the SDK or Agent Playground

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

    * This role must be assigned at the project scope
    * Minimum required permissions: **agents/*/read**, **agents/*/action**, **agents/*/delete**





## Configure and run an agent

To authenticate your API requests, use the [az login](https://learn.microsoft.com/cli/azure/authenticate-azure-cli-interactively) command to sign into your Azure subscription.

```azurecli
az login
```

Next, you'll need to fetch the Entra ID token to provide as authorization to the API calls. Fetch the token using the CLI command:
```azurecli
az account get-access-token --resource 'https://ai.azure.com' | jq -r .accessToken | tr -d '"'
```
Set the access token as an environment variable named `AGENT_TOKEN`.

To successfully make REST API calls to Foundry Agent Service, you will need to use your project's endpoint:

`https://<your_ai_service_name>.services.ai.azure.com/api/projects/<your_project_name>`

For example, your endpoint will look something like:

`https://exampleaiservice.services.ai.azure.com/api/projects/project`

Set this endpoint as an environment variable named `AZURE_AI_FOUNDRY_PROJECT_ENDPOINT`.

> **Note:**
> * For `api-version` parameter, the GA API version is `2025-05-01` and the latest preview API version is `2025-05-15-preview`. You must use the preview API for tools that are in preview. 
> * Consider making your API version an environment variable, such as `$API_VERSION`.

### Create an agent

> **Note:**
> With Azure AI Agents Service the `model` parameter requires model deployment name. If your model deployment name is different than the underlying model name, then you would adjust your code to ` "model": "{your-custom-model-deployment-name}"`.

```console
curl --request POST \
  --url $AZURE_AI_FOUNDRY_PROJECT_ENDPOINT/assistants?api-version=2025-05-01 \
  -H "Authorization: Bearer $AGENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "instructions": "You are a helpful agent.",
    "name": "my-agent",
    "tools": [{"type": "code_interpreter"}],
    "model": "gpt-4o-mini"
  }'
```

### Create a thread

```console
curl --request POST \
  --url $AZURE_AI_FOUNDRY_PROJECT_ENDPOINT/threads?api-version=2025-05-01 \
  -H "Authorization: Bearer $AGENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d ''
```

### Add a user question to the thread

```console
curl --request POST \
  --url $AZURE_AI_FOUNDRY_PROJECT_ENDPOINT/threads/thread_abc123/messages?api-version=2025-05-01 \
  -H "Authorization: Bearer $AGENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
      "role": "user",
      "content": "I need to solve the equation `3x + 11 = 14`. Can you help me?"
    }'
```

### Run the thread

```console
curl --request POST \
  --url $AZURE_AI_FOUNDRY_PROJECT_ENDPOINT/threads/thread_abc123/runs?api-version=2025-05-01 \
  -H "Authorization: Bearer $AGENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "asst_abc123",
  }'
```

### Retrieve the status of the run

```console
curl --request GET \
  --url $AZURE_AI_FOUNDRY_PROJECT_ENDPOINT/threads/thread_abc123/runs/run_abc123?api-version=2025-05-01 \
  -H "Authorization: Bearer $AGENT_TOKEN"
```

### Retrieve the agent response

```console
curl --request GET \
  --url $AZURE_AI_FOUNDRY_PROJECT_ENDPOINT/threads/thread_abc123/messages?api-version=2025-05-01 \
  -H "Authorization: Bearer $AGENT_TOKEN"
```




## Next steps

Learn about the [**tools**](how-to/tools-classic/overview.md) you can use to extend your agents' capabilities, such as accessing the web, provide grounding information, and more.
