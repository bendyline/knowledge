---
title: "Content Safety in Microsoft Foundry portal overview (classic)"
description: "Learn how to use Azure AI Content Safety in Microsoft Foundry portal to detect harmful user-generated and AI-generated content in applications and services. (classic)"
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.custom:
  - ignite-2024
ms.topic: overview
ms.date: 12/30/2025
ms.author: pafarley
author: PatrickFarley
ai-usage: ai-assisted
---

# Content Safety in the Microsoft Foundry portal (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



Azure AI Content Safety is an AI service that detects harmful user-generated and AI-generated content in applications and services. Azure AI Content Safety includes APIs that help you detect and prevent the output of harmful content. The interactive Content Safety **try it out** page in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs) lets you view, explore, and try out sample code for detecting harmful content across different modalities. 

## Features

Use Azure AI Content Safety for the following scenarios: 

### Text content
- **Moderate text content**: Scans and moderates text content. It identifies and categorizes text based on different levels of severity to ensure appropriate responses. 
- **Groundedness detection**: Determines if the AI's responses are based on trusted, user-provided sources. This feature ensures that the answers are "grounded" in the intended material. Groundedness detection helps improve the reliability and factual accuracy of responses. 
- **Protected material detection for text**: Identifies protected text material, such as known song lyrics, articles, or other content. This feature ensures that the AI doesn't output this content without permission. 
- **Protected material detection for code**: Detects code segments in the model's output that match known code from public repositories. This feature helps prevent uncredited or unauthorized reproduction of source code. 
- **Prompt shields**: Provides a unified API to address "Jailbreak" and "Indirect Attacks": 
    - Jailbreak Attacks: Attempts by users to manipulate the AI into bypassing its safety protocols or ethical guidelines. Examples include prompts designed to trick the AI into giving inappropriate responses or performing tasks it was programmed to avoid. 
    - Indirect Attacks: Also known as Cross-Domain Prompt Injection Attacks. Indirect attacks involve embedding malicious prompts within documents that the AI might process. For example, if a document contains hidden instructions, the AI might inadvertently follow them, leading to unintended or unsafe outputs. 

### Image content
- **Moderate image content**: Similar to text moderation, this feature filters and assesses image content to detect inappropriate or harmful visuals. 
- **Moderate multimodal content**: Designed to handle a combination of text and images. It assesses the overall context and any potential risks across multiple types of content. 

### Custom filtering
- **Custom categories**: Allows users to define specific categories for moderating and filtering content. Tailors safety protocols to unique needs. 
- **Safety system message**: Provides a method for setting up a "System Message" to instruct the AI on desired behavior and limitations. It reinforces safety boundaries and helps prevent unwanted outputs. 


## Understand harm categories

### Harm categories

| Category | Description | API term |
| --- | --- | --- |
| Hate and Fairness | Hate and fairness harms refer to any content that attacks or uses discriminatory language with reference to a person or identity group based on certain differentiating attributes of these groups. <br><br>This includes, but isn't limited to:<ul><li>Race, ethnicity, nationality</li><li>Gender identity groups and expression</li><li>Sexual orientation</li><li>Religion</li><li>Personal appearance and body size</li><li>Disability status</li><li>Harassment and bullying</li></ul> | `Hate` |
| Sexual | Sexual describes language related to anatomical organs and genitals, romantic relationships and sexual acts, acts portrayed in erotic or affectionate terms, including those portrayed as an assault or a forced sexual violent act against one's will. <br><br> This includes but isn't limited to:<ul><li>Vulgar content</li><li>Prostitution</li><li>Nudity and Pornography</li><li>Abuse</li><li>Child exploitation, child abuse, child grooming</li></ul> | `Sexual` |
| Violence | Violence describes language related to physical actions intended to hurt, injure, damage, or kill someone or something; describes weapons, guns, and related entities. <br><br>This includes, but isn't limited to:  <ul><li>Weapons</li><li>Bullying and intimidation</li><li>Terrorist and violent extremism</li><li>Stalking</li></ul> | `Violence` |
| Self-Harm | Self-harm describes language related to physical actions intended to purposely hurt, injure, damage one's body or kill oneself. <br><br> This includes, but isn't limited to: <ul><li>Eating Disorders</li><li>Bullying and intimidation</li></ul> | `SelfHarm` |
| **Task Adherence** | Helps ensure AI Agents consistently behave in alignment with user instructions and task objectives. It identifies discrepancies, such as misaligned tool invocations, improper tool input or output relative to user intent, and inconsistencies between responses and customer input. |

### Severity levels 

| Level | Description |
| --- | --- |
| Safe | Content might be related to violence, self-harm, sexual, or hate categories. However, the terms are used in general, journalistic, scientific, medical, and similar professional contexts, which are appropriate for most audiences. |
| Low | Content that expresses prejudiced, judgmental, or opinionated views, includes offensive use of language, stereotyping, use-cases exploring a fictional world (for example, gaming, literature) and depictions at low intensity. |
| Medium | Content that uses offensive, insulting, mocking, intimidating, or demeaning language towards specific identity groups, includes depictions of seeking and executing harmful instructions, fantasies, glorification, promotion of harm at medium intensity. |
| High | Content that displays explicit and severe harmful instructions, actions, damage, or abuse; includes endorsement, glorification, or promotion of severe harmful acts, extreme or illegal forms of harm, radicalization, or nonconsensual power exchange or abuse. |

## Limitations

For supported regions, rate limits, and input requirements for all features, see the [Content Safety service overview](https://learn.microsoft.com/azure/ai-services/content-safety/overview). For supported languages, see the [region availability](https://learn.microsoft.com/azure/ai-services/content-safety/region-availability) page.

## Next step

Get started using Azure AI Content Safety in Foundry portal by following the [How-to guide](https://learn.microsoft.com/azure/ai-services/content-safety/how-to/foundry).
