---
manager: mcleans
author: aahill
ms.author: aahi
ms.service: microsoft-foundry
ms.subservice: foundry-agent-service
ms.topic: include
ms.date: 12/03/2025
---


| [Reference documentation](https://aka.ms/azsdk/azure-ai-projects/python/reference) | [Samples](https://aka.ms/azsdk/azure-ai-projects/python/samples/) | [Library source code](https://aka.ms/azsdk/azure-ai-projects/python/code) | [Package (PyPi)](https://aka.ms/azsdk/azure-ai-projects/python/package) |

## Prerequisites


* [A set up agent environment](../environment-setup.md)
* Assign the **Foundry User**  [RBAC role](../../concepts/rbac-foundry.md) to each team member who needs to create or edit agents using the SDK or Agent Playground

  
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
> Starting in May 2025, the Azure AI Agent Service uses an endpoint for [Foundry projects](../../what-is-foundry.md#types-of-projects) instead of the connection string that was previously used for hub-based projects. If you're using a hub-based project, you won't be able to use the current versions of the SDK and REST API. For more information, see [SDK usage with hub-based projects](../how-to/use-your-own-resources.md#sdk-usage-with-hub-based-projects).



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
