---
description: This article is an introduction to the PowerShell scripting environment and its features.
ms.date: 08/12/2026
ms.topic: overview
no-loc: [Azure, Windows, Exchange]
title: What is PowerShell?
---

# What is PowerShell?

PowerShell is a cross-platform task automation solution made up of a command-line shell, a scripting
language, and a configuration management framework. PowerShell runs on Windows, Linux, and macOS.

## Command-line Shell

PowerShell is a modern command shell that includes the best features of other popular shells. Unlike
most shells that only accept and return text, PowerShell accepts and returns .NET objects. The shell
includes the following features:

- Robust command-line [history][09]
- Tab completion and command prediction (See [about_PSReadLine][18])
- Supports command and parameter [aliases][05]
- [Pipeline][11] for chaining commands
- In-console [help][14] system, similar to Unix `man` pages

## Scripting language

As a scripting language, PowerShell is commonly used for automating the management of systems. It's
also used to build, test, and deploy solutions, often in CI/CD environments. PowerShell is built on
the .NET Common Language Runtime (CLR). All inputs and outputs are .NET objects. No need to parse
text output to extract information from output. The PowerShell scripting language includes the
following features:

- Extensible through [functions][08], [classes][06], [scripts][12], and [modules][10]
- Extensible [formatting system][07] for easy output
- Extensible [type system][13] for creating dynamic types
- Built-in support for common data formats like [CSV][15], [JSON][16], and [XML][17]

## Automation platform

The extensible nature of PowerShell provides an ecosystem of PowerShell modules to deploy and manage
almost any technology you work with. For example:

Microsoft modules

- [Azure][02]
- [Windows][25]
- [Exchange][04]
- [SQL][27]

Third-party modules

- [AWS][30]
- [VMware][31]
- [Oracle Cloud][32]

### Configuration management

PowerShell Desired State Configuration ([DSC][20]) is a management framework in PowerShell that
enables you to manage your enterprise infrastructure with configuration as code. With DSC, you can:

- Create declarative [configurations][19] and custom scripts for repeatable deployments
- Enforce configuration settings and report on configuration drift
- Deploy configuration using [push or pull][21] models

## Monad Manifesto

Jeffrey Snover, the inventor of PowerShell, wrote the Monad Manifesto to explain his vision for
PowerShell and how it would change the way we manage systems. Use the following link to download a
copy of the [Monad Manifesto][33].

This PDF file is a version of the original Monad Manifesto, which articulated the long-term vision and
started the development effort that became PowerShell. PowerShell has delivered on many of the
elements described in this document.

## Next steps

### Getting started

Are you new to PowerShell and don't know where to start? Take a look at these resources.

- [Install PowerShell][22]
- [Discover PowerShell][29]
- [PowerShell 101][23]
- [Microsoft Virtual Academy videos][26]
- [PowerShell Learn modules][28]

### PowerShell in action

Take a look at how PowerShell is being used in different scenarios and on different platforms.

- [PowerShell remoting over SSH][24]
- [Getting started with Azure PowerShell][03]
- [Building a CI/CD pipeline with DSC][01]
- [Managing Microsoft Exchange][04]

<!-- link references -->
[01]: https://learn.microsoft.com/azure/devops/pipelines/release/dsc-cicd
[02]: https://learn.microsoft.com/powershell/azure
[03]: https://learn.microsoft.com/powershell/azure/get-started-azureps
[04]: https://learn.microsoft.com/powershell/exchange/exchange-management-shell
[05]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_aliases
[06]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_classes
[07]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_format.ps1xml
[08]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_functions_advanced
[09]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_history
[10]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_modules
[11]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_pipelines
[12]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_scripts
[13]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_types.ps1xml
[14]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/get-help
[15]: https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/convertfrom-csv
[16]: https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/convertfrom-json
[17]: https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/convertto-xml
[18]: https://learn.microsoft.com/powershell/module/psreadline/about/about_psreadline
[19]: https://learn.microsoft.com/powershell/scripting/dsc/configurations/configurations
[20]: https://learn.microsoft.com/powershell/scripting/dsc/overview/dscforengineers
[21]: https://learn.microsoft.com/powershell/scripting/dsc/pull-server/enactingconfigurations
[22]: https://learn.microsoft.com/powershell/scripting/install/installing-powershell
[23]: https://learn.microsoft.com/powershell/scripting/learn/ps101/00-introduction
[24]: https://learn.microsoft.com/powershell/scripting/learn/remoting/ssh-remoting-in-powershell-core
[25]: https://learn.microsoft.com/powershell/windows/get-started
[26]: https://learn.microsoft.com/shows/browse?terms=powershell
[27]: https://learn.microsoft.com/sql/powershell/sql-server-powershell
[28]: https://learn.microsoft.com/training/browse/?terms=PowerShell
[29]: discover-powershell.md
[30]: https://aws.amazon.com/powershell/
[31]: https://developer.broadcom.com/powercli
[32]: https://docs.oracle.com/iaas/Content/API/SDKDocs/powershell.htm
[33]: https://github.com/MicrosoftDocs/PowerShell-Docs/blob/main/assets/MonadManifesto.pdf
