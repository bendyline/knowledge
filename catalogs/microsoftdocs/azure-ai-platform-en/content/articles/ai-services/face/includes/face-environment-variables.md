---
author: PatrickFarley
ms.service: azure-vision-foundry-tools
ms.topic: include
ms.date: 08/07/2023
ms.author: pafarley
---

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and complete the instructions that follow for your operating system and development environment.

- To set the `FACE_APIKEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `FACE_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/includes/face-environment-variables.md)

#### [Windows](#tab/windows)

```console
setx FACE_APIKEY <your_key>
```

```console
setx FACE_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export FACE_APIKEY=<your_key>
```

```bash
export FACE_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---
