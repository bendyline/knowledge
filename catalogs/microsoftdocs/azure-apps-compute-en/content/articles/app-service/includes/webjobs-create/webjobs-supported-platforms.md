---
author: msangapu-msft
ms.author: msangapu
ms.topic: include
ms.date: 08/04/2025
ms.service: azure-app-service
ms.subservice: web-apps
---

<a name="webjobs-supported-note" ></a>

## Supported platforms and file types

> **Important:**
> WebJobs aren't supported in custom Linux containers based on Alpine Linux, including Linux apps using Java 8 and Java 11 runtime stacks. Starting with Java 17 Linux apps, Azure App Service uses non-Alpine based images, which are compatible with WebJobs.
>

WebJobs are supported on the following App Service hosting options:

- Windows code
- Windows containers
- Linux code
- Linux containers

Supported file/script types include:

- Windows executables and scripts: `.exe`, `.cmd`, `.bat`
- PowerShell scripts: `.ps1`
- Bash scripts: `.sh`
- Scripting languages: Python (`.py`), Node.js (`.js`), PHP (`.php`), F# (`.fsx`), Java (`.jar`, `.war`)
- Any language runtime included in your container app

This versatility enables you to integrate WebJobs into a wide range of application architectures using the tools and languages you're already comfortable with.
