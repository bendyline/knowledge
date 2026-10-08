---
title: Include file
description: Include file
ai-usage: ai-assisted
author: sdgilley
ms.author: sgilley
ms.reviewer: deeikele
ms.date: 04/09/2025
ms.service: microsoft-foundry
ms.topic: include
ms.custom:
  - include
  - build-2024
  - ignite-2024
  - build-aifnd
  - build-2025
# Used with ../how-to/create-projects
---

Create multiple 
Foundry projects on an existing `Foundry` resource to enable team collaboration and shared resource access including security, deployments, and connected tools. This setup is ideal in restricted Azure subscriptions where developers need self-serve exploration ability within the setup of a preconfigured environment.

Diagram shows how a team could share resource access with multiple projects on a Foundry resource.


Foundry projects as Azure child resources may get assigned their own access controls, but share common settings such as network security, deployments, and Azure tool integration from their parent resource.

While not all Foundry capabilities support organizing work in projects yet, your resource's first "default" project is more powerful. You can identify it by the tag "default" in UX experiences and the resource property "is_default" when using code options.

| Feature | Default project | Other projects |
| --- | --- | --- |
| Model inference | ✅ | ✅ |
| Playgrounds | ✅ | ✅ |
| Agents | ✅ | ✅ |
| Evaluations | ✅ | ✅ |
| Tracing | ✅ | ✅ |
| Datasets | ✅ | ✅ |
| Indexes | ✅ | ✅ |
| Foundry SDK and API | ✅ | ✅ |
| Content understanding | ✅ | ✅ |
| OpenAI SDK and API | ✅ | Responses, Files, Conversations |
| OpenAI Batch, Fine-tuning, Stored completions | ✅ | - |
| Language fine-tuning | ✅ | ✅ |
| Speech fine-tuning | ✅ | - |
| Connections | ✅ | ✅ |

* To add a project to a Foundry resource:
    
    # [Foundry portal](#tab/foundry)
    
    
> **Tip:**
> Because you can [customize the left pane](../what-is-foundry.md#customize-the-left-pane) in the Microsoft Foundry portal, you might see different items than shown in these steps. If you don't see what you're looking for, select **... More** at the bottom of the left pane.
    
    1. 

Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



 
    1. Select either the 
Foundry project or its associated resource.
    1. In the left pane, select **Management center**.
    1. In the resource section, select  **Overview**.
    1. Select **New project** and provide a name.
    
        :::image type="content" source="../media/how-to/projects/second-project.png" alt-text="Screenshot shows how to create a second project on an existing resource.":::
      
    
    # [Python SDK](#tab/python)

    
    Add this code to your script to create a new project on your existing resource:

    :::code language="python" source="~/foundry-samples-main/samples-classic/python/quickstart/create_project.py" id="create_additional":::
    
    
    # [Azure CLI](#tab/azurecli)

    To add a new project to `my-foundry-resource`:
    
    ```azurecli
     az cognitiveservices account project create \
     --name my-foundry-resource \
     --resource-group my-foundry-rg \
     --project-name {new_project_name} \
     --location eastus
    ```

    ---

* If you delete your Foundry resource's default project, the next project created will become the default project.
