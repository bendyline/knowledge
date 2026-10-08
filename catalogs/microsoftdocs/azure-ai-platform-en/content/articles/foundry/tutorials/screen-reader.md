---
title: "Use a screen reader with Microsoft Foundry"
description: "Learn how to get oriented and navigate Microsoft Foundry with a screen reader."
author: sdgilley
ms.author: sgilley
ms.reviewer: ailsaleen
ms.date: 08/27/2026
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.topic: how-to
ai-usage: ai-assisted
ms.custom:
  - classic-and-new
  - ignite-2023
  - build-2024
  - build-aifnd
  - build-2025
  - doc-kit-assisted
---

# Use a screen reader with Microsoft Foundry

This article is for people who use screen readers such as [Microsoft's Narrator](https://support.microsoft.com/accessibility/windows/narrator/complete-guide-to-narrator), JAWS, NVDA, or Apple's VoiceOver. In this article, you learn the basic structure of Microsoft Foundry and how to navigate efficiently.

## Prerequisites


- A Microsoft Foundry account with access to at least one project.
- Permission to open that project in Foundry portal.
- A supported browser, such as Microsoft Edge, Google Chrome, or Safari, and an active internet connection.
- A screen reader such as Narrator, JAWS, NVDA, or VoiceOver.
- Familiarity with common screen reader landmark and heading navigation commands.

Control labels and page layout can differ slightly between the new and classic experiences and can change over time.


## Get oriented in Foundry portal

Most pages in the new 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
 experience have the following landmark structure:

- Banner has
    - Foundry application title
    - Project selector
    - Search
    - Main section navigation: Home, Discover, Build, Operate, Manage, Docs
    - Settings
    - Profile information
- Left pane has navigation for the section selected in the main navigation. The Home page has no left pane navigation.
- Many pages also have tabs as a third level of navigation.

For efficient navigation, you can use landmarks to move between these sections on the page.

## Switch between portal experiences

You can switch between the classic and new Foundry portal experiences using the **New Foundry** toggle in the top banner.

To switch back to the classic experience:

1. In the top banner, press <kbd>Tab</kbd> until focus reaches the **New Foundry** toggle.
1. Select the toggle to switch to the classic experience.

The page reloads with the classic portal interface. Your screen reader announces the page title for the classic experience.

> **Note:**
> The toggle preserves your current context, such as the project you're working in, when switching between experiences.

## Projects

You enter the portal with a selected project. The **Home**, **Discover**, **Build**, and **Manage** sections display content for your selected project. **Operate** shows information for all your projects, and **Docs** opens product documentation.

To create or switch projects:

1. In 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
, on the top banner, select **Foundry**.
1. Press <kbd>Tab</kbd> until you hear a project name.
1. Use the down-arrow to scroll through the list of recent projects.
1. At the end of the list of recent projects, you find options to **View all projects**, **Create new project**, and **View legacy resources**.
1. If you don't hear a project name, return focus to the top banner and select **Foundry** again to reopen the project list.

After you select a project, your screen reader announces the selected project name in the top banner.

## Navigation

In the new Foundry experience, use landmarks and headings to move between these areas:

- Top banner navigation: **Home**, **Discover**, **Build**, **Operate**, **Manage**, and **Docs**.
- Left pane navigation for the selected top-level area.
- Page tabs, when available, as a third navigation level.

To move quickly to feature areas:

1. Use landmark navigation to move to the left pane.
1. Press the down-arrow to move through navigation items.
1. Select a section such as **Build** to access model and tool workflows.
1. If the left pane isn't available, move focus back to the top banner and reselect the project.

After you select a section, your screen reader announces the page title and the navigation items available in that section.

## Use playgrounds

After you select a project:

1. In the top banner navigation, select **Build**.
1. Move to the left navigation landmark.
1. Select **Model** or **Agent**.
1. Select the model or agent you want to interact with.
1. Use heading navigation to move between configuration and interaction areas.
1. If **Model** or **Agent** isn't announced in the left pane, confirm that you're in a project and still in the **Build** section.

When you send a prompt in a chat-style experience, your screen reader should announce new content when the model response is received.
If you don't hear a response announcement, move to the chat history region by heading navigation and read the most recent message.

## Evaluations

To create an evaluation in the new Foundry experience:

1. Move to the top navigation landmark and select **Build**.
1. Select **Evaluation**.
1. Select **Create** and complete the dialog fields.
1. Return to the evaluations list and open a run to review details.

Your screen reader announces the evaluation run page title and its main status information.

To export results:

1. Open an evaluation run.
1. Navigate to **Raw JSON** and select it.
1. Select **Copy JSON** to copy.
1. Select **Close** to close the dialog.

To compare evaluation runs:

1. Return to the main evaluations list.
1. Select multiple evaluation runs.
1. Select **Compare** to open a comparison view.

## Verify your navigation setup

After you complete the steps in this article, verify the following outcomes:

- You can move between major page landmarks, such as banner, navigation, and main content.
- You can identify your current portal experience (new or classic) and switch experiences if needed.
- You can return to your previous location after switching views or opening dialogs.
- You can locate your selected project and move to key areas such as **Home**, **Discover**, **Build**, **Operate**, **Manage**, and **Docs**.

## Troubleshoot screen reader navigation


- If focus seems trapped in a panel or dialog, use <kbd>Esc</kbd> to close the dialog, then continue with heading or landmark navigation.
- If a control label differs from this article, search for nearby landmarks or headings because labels can vary slightly by experience and updates.
- If the left navigation isn't present, confirm that you selected a project. Some pages don't show full navigation until a project is selected.
- If you lose context after switching between new and classic experiences, reselect your project from the top banner project selector.


## Technical support for customers with disabilities


Microsoft wants to provide the best possible experience for all customers. If you have a disability or have questions related to accessibility, contact the [Microsoft Disability Answer Desk](https://www.microsoft.com/accessibility/disability-answer-desk) for technical assistance. The Disability Answer Desk support team is trained in using many popular assistive technologies. They can offer assistance in English, Spanish, French, and American Sign Language. Go to the Disability Answer Desk site to find the contact details for your region.

If you're a government, commercial, or enterprise customer, contact the [Enterprise Disability Answer Desk](https://support.microsoft.com/accessibility/enterprise-answer-desk).


## Related content

- [What is Microsoft Foundry?](../what-is-foundry.md)
