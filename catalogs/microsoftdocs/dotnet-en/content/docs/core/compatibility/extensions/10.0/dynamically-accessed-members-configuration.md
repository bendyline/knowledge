---
title: "Breaking change: DynamicallyAccessedMembers annotation removed from trim-unsafe configuration APIs"
description: "Learn about the breaking change in .NET 10 where DynamicallyAccessedMembers annotations were removed from trim-unsafe Microsoft.Extensions.Configuration APIs."
ms.date: 07/22/2025
ai-usage: ai-assisted
ms.custom: https://github.com/dotnet/docs/issues/47433
---

# DynamicallyAccessedMembers annotation removed from trim-unsafe configuration APIs

[Certain APIs](#affected-apis) related to [Microsoft.Extensions.Configuration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration) that were marked as [System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute) were also annotated to preserve at least some of the necessary members when trimming. This made the API partially work when trimming, while still generating trimming warnings. The annotations are now removed completely. Users are encouraged to migrate to the source generator that works reliably with trimming.

## Version introduced

.NET 10

## Previous behavior

Previously, the [affected APIs](#affected-apis) worked with some limited use cases while generating trimming warnings at publish time. These APIs were annotated to preserve at least some of the necessary members when trimming, making the API partially functional in trimmed scenarios.

## New behavior

Starting in .NET 10, the [affected APIs](#affected-apis) now work with even more limited use cases while still generating trimming warnings at publish time.

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

The annotations were removed as part of an effort to remove uses of [System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All) from the product.

## Recommended action

Use the binding configuration source generator, which works reliably with trimming and provides a trim-safe alternative to these APIs.

## Affected APIs

- [Microsoft.Extensions.Configuration.ConfigurationBinder.Get(Microsoft.Extensions.Configuration.IConfiguration,System.Type,System.Action{Microsoft.Extensions.Configuration.BinderOptions})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBinder.Get(Microsoft.Extensions.Configuration.IConfiguration%2CSystem.Type%2CSystem.Action%7BMicrosoft.Extensions.Configuration.BinderOptions%7D))
- [Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue(Microsoft.Extensions.Configuration.IConfiguration,System.Type,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue(Microsoft.Extensions.Configuration.IConfiguration%2CSystem.Type%2CSystem.String))
- [Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue(Microsoft.Extensions.Configuration.IConfiguration,System.Type,System.String,System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue(Microsoft.Extensions.Configuration.IConfiguration%2CSystem.Type%2CSystem.String%2CSystem.Object))
- [Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue``1(Microsoft.Extensions.Configuration.IConfiguration,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue%60%601(Microsoft.Extensions.Configuration.IConfiguration%2CSystem.String))
- [Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue``1(Microsoft.Extensions.Configuration.IConfiguration,System.String,``0)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue%60%601(Microsoft.Extensions.Configuration.IConfiguration%2CSystem.String%2C%60%600))
- [Microsoft.Extensions.Configuration.ConfigurationBinder.Get``1(Microsoft.Extensions.Configuration.IConfiguration)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBinder.Get%60%601(Microsoft.Extensions.Configuration.IConfiguration))
- [Microsoft.Extensions.Configuration.ConfigurationBinder.Get``1(Microsoft.Extensions.Configuration.IConfiguration,System.Action{Microsoft.Extensions.Configuration.BinderOptions})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBinder.Get%60%601(Microsoft.Extensions.Configuration.IConfiguration%2CSystem.Action%7BMicrosoft.Extensions.Configuration.BinderOptions%7D))
- [Microsoft.Extensions.Logging.Configuration.LoggerProviderOptions.RegisterProviderOptions``2(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Configuration.LoggerProviderOptions.RegisterProviderOptions%60%602(Microsoft.Extensions.DependencyInjection.IServiceCollection))
- [Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter``2(Microsoft.Extensions.Logging.ILoggingBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter%60%602(Microsoft.Extensions.Logging.ILoggingBuilder))
- [Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter``2(Microsoft.Extensions.Logging.ILoggingBuilder,System.Action{``1})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter%60%602(Microsoft.Extensions.Logging.ILoggingBuilder%2CSystem.Action%7B%60%601%7D))
- [Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.BindConfiguration``1(Microsoft.Extensions.Options.OptionsBuilder{``0},System.String,System.Action{Microsoft.Extensions.Configuration.BinderOptions})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.BindConfiguration%60%601(Microsoft.Extensions.Options.OptionsBuilder%7B%60%600%7D%2CSystem.String%2CSystem.Action%7BMicrosoft.Extensions.Configuration.BinderOptions%7D))
- [Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.Bind``1(Microsoft.Extensions.Options.OptionsBuilder{``0},Microsoft.Extensions.Configuration.IConfiguration)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.Bind%60%601(Microsoft.Extensions.Options.OptionsBuilder%7B%60%600%7D%2CMicrosoft.Extensions.Configuration.IConfiguration))
- [Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.Bind``1(Microsoft.Extensions.Options.OptionsBuilder{``0},Microsoft.Extensions.Configuration.IConfiguration,System.Action{Microsoft.Extensions.Configuration.BinderOptions})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.Bind%60%601(Microsoft.Extensions.Options.OptionsBuilder%7B%60%600%7D%2CMicrosoft.Extensions.Configuration.IConfiguration%2CSystem.Action%7BMicrosoft.Extensions.Configuration.BinderOptions%7D))
- [Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure*)
- [Microsoft.Extensions.Options.ConfigureFromConfigurationOptions`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.ConfigureFromConfigurationOptions%601)
- [Microsoft.Extensions.Options.NamedConfigureFromConfigurationOptions`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.NamedConfigureFromConfigurationOptions%601)
