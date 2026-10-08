---
ms.service: azure
author: ecfan
ms.author: estfan
ms.topic: include
ms.date: 07/18/2024
# Generic text about tool options for API testing and sending HTTP requests.
---

* Install or use a tool that can send HTTP requests to test your solution, for example:

  
  - [Visual Studio Code](https://code.visualstudio.com/download) with an [extension from Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode)
  - [PowerShell Invoke-RestMethod](https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/invoke-restmethod)
  - [Microsoft Edge - Network Console tool](https://learn.microsoft.com/microsoft-edge/devtools-guide-chromium/network-console/network-console-tool)
  - [Bruno](https://www.usebruno.com/)
  - [curl](https://curl.se/)

     > **Caution:**  
   > For scenarios where you have sensitive data, such as credentials, secrets, access tokens, API keys, and other
   > similar information, make sure to use a tool that protects your data with the necessary security features.
   > The tool should work offline or locally, and not require sign in to an online account or sync data to the cloud.
   > When you use a tool with these characteristics, you reduce the risk of exposing sensitive data to the public.
