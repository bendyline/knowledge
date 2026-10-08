---
title: Orleans configuration guide
description: Explore a guide on how to configure .NET Orleans.
ms.date: 01/21/2026
ms.topic: overview
zone_pivot_groups: orleans-version
---

# Orleans configuration guide

In this configuration guide, you learn the key configuration parameters and how to use them for most typical usage scenarios. You can use Orleans in various configurations fitting different scenarios, such as local single-node deployment for development and testing, server clustering, containerized deployments on Kubernetes or Azure Container Apps, and more.

This guide provides instructions for the key configuration parameters necessary to run Orleans in one of the target scenarios. Other configuration parameters primarily help you fine-tune Orleans for better performance.

**Applies to: orleans-7-0,orleans-8-0,orleans-9-0,orleans-10-0**


Configure silos and clients programmatically via [Microsoft.Extensions.Hosting.GenericHostExtensions.UseOrleans(Microsoft.Extensions.Hosting.IHostBuilder,System.Action{Microsoft.Extensions.Hosting.HostBuilderContext,Orleans.Hosting.ISiloBuilder})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.GenericHostExtensions.UseOrleans(Microsoft.Extensions.Hosting.IHostBuilder%2CSystem.Action%7BMicrosoft.Extensions.Hosting.HostBuilderContext%2COrleans.Hosting.ISiloBuilder%7D)) and [Microsoft.Extensions.Hosting.OrleansClientGenericHostExtensions.UseOrleansClient*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.OrleansClientGenericHostExtensions.UseOrleansClient*), respectively. You do this using several supplemental option classes. Option classes in Orleans follow the [Options pattern in .NET](../../../core/extensions/options.md) and can be loaded from files, environment variables, or any other valid configuration provider.



**Applies to: orleans-3-x**


Configure silos and clients programmatically via [Orleans.Hosting.SiloHostBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.SiloHostBuilder) and [Orleans.ClientBuilder](https://learn.microsoft.com/search/?terms=Orleans.ClientBuilder), respectively. You do this using several supplemental option classes. Option classes in Orleans follow the [Options pattern in .NET](../../../core/extensions/options.md) and can be loaded from files, environment variables, or any other valid configuration provider.



If you want to configure a silo and a client for local development, see the [Local development configuration](local-development-configuration.md) section. The [Server configuration](server-configuration.md) and [Client configuration](client-configuration.md) sections cover configuring silos and clients, respectively.

The section on [Typical configurations](typical-configurations.md) provides a summary of a few common configurations. You can find a list of important core options that you can configure in [List of options classes](list-of-options-classes.md).

> **Important:**
> Make sure you properly configure .NET garbage collection as detailed in [Configure .NET garbage collection](configuring-garbage-collection.md).
