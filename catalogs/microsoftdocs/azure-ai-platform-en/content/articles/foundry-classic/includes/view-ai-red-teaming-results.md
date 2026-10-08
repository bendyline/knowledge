---
title: Include file
description: Include file
author: lgayhardt
ms.service: microsoft-foundry
ms.topic: include
ms.date: 10/20/2025
ms.author: lagayhar
ms.custom: include file
---

## Viewing AI red teaming results in Microsoft Foundry project (preview)

After your automated scan finishes, the results also get logged to your Foundry project, which you specified in the creation of your AI red teaming agent.

### View report of each scan

In your Foundry project or hub-based project, navigate to the **Evaluation** page. Select **AI red teaming** to view the report with detailed drill-down results of each scan.

Screenshot of AI Red Teaming tab in Foundry project page.

When you select into the scan, you can view the report by risk categories, which shows the overall number of successful attacks and a breakdown of successful attacks per risk categories:

Screenshot of AI Red Teaming report view by risk category in Foundry.

Or by attack complexity classification:

Screenshot of AI Red Teaming report view by attack complexity category in Foundry.

Drilling down further into the data tab provides a row-level view of each attack-response pair. This information offers deeper insights into system issues and behaviors. For each attack-response pair, you can see more information, such as whether or not the attack was successful, what attack strategy was used, and its attack complexity. A human in the loop reviewer can provide human feedback by selecting the thumbs up or thumbs down icon.

Screenshot of AI Red Teaming data page in Foundry.

To view each conversation, select **View more** to see the full conversation for more detailed analysis of the AI system's response.

Screenshot of AI Red Teaming data page with a conversation history opened in Foundry.
