---
description: How to add related links to a cmdlet help topic
ms.date: 07/10/2023
title: How to add related links to a cmdlet help topic
---
# How to add related links to a cmdlet help topic

<!-- markdownlint-disable first-line-h1 -->
> **Note:**
> Manual authoring of XML-based help is very difficult. The **PlatyPS** module allows you to write
> help in Markdown and then convert it to XML-based help. This makes it much easier to write and
> maintain help. **PlatyPS** can also create the Updateable Help packages for you. For more
> information, see
> [Create XML-based help using PlatyPS](https://learn.microsoft.com/powershell/utility-modules/platyps/create-help-using-platyps).


This section describes how to add references to other content that's related to a PowerShell cmdlet
Help topic. Because these references appear in a command window, they don't link directly to the
referenced content.

In the cmdlet Help topics that are included in PowerShell, these links reference other cmdlets,
conceptual content (`about_`), and other documents and Help files that aren't related to PowerShell.

The following XML shows how to add a **RelatedLinks** node that contains two references to related
topics.

```xml
<maml:relatedLinks>
  <maml:navigationLink>
    <maml:linkText>Topic-name</maml:linkText>
  </maml:navigationLink>
  <maml:navigationLink>
    <maml:linkText>Topic-name</maml:linkText>
  </maml:navigationLink>
</ maml:relatedLinks >
```
