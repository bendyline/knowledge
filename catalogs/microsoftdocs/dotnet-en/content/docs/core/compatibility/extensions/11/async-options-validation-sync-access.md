---
title: "Breaking change: Synchronous access to async-validated options throws"
description: "Learn about the breaking change in .NET 11 where synchronous access to options that use async validators throws instead of skipping validation."
ms.date: 09/08/2026
ai-usage: ai-assisted
---

# Synchronous access to async-validated options throws

Starting in .NET 11 RC 1, synchronous access to an options type that uses only asynchronous validators fails fast. Instead of returning an options instance without asynchronous validation, the synchronous creation path throws an [Microsoft.Extensions.Options.OptionsValidationException](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.OptionsValidationException).

## Version introduced

.NET 11 RC 1

## Previous behavior

Previously, in .NET 11 Preview 6 and Preview 7, [Microsoft.Extensions.Options.IAsyncValidateOptions`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IAsyncValidateOptions%601) was independent from [Microsoft.Extensions.Options.IValidateOptions`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IValidateOptions%601). Asynchronous validators ran only through the asynchronous startup-validation path.

When you accessed an async-validated options type through a synchronous creation path, such as [Microsoft.Extensions.Options.IOptions`1.Value](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptions%601.Value), [Microsoft.Extensions.Options.IOptionsMonitor`1.CurrentValue](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%601.CurrentValue), [Microsoft.Extensions.Options.IOptionsMonitor`1.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%601.Get*), `IOptionsSnapshot<TOptions>.Value`, [Microsoft.Extensions.Options.IOptionsSnapshot`1.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsSnapshot%601.Get*), or [Microsoft.Extensions.Options.IOptionsFactory`1.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsFactory%601.Create*), the asynchronous validator didn't run. The synchronous path returned an unvalidated options instance.

Types that implemented `IAsyncValidateOptions<TOptions>` directly only needed to implement `ValidateAsync`.

## New behavior

Starting in .NET 11 RC 1, `IAsyncValidateOptions<TOptions>` derives from `IValidateOptions<TOptions>`, and the interface is no longer contravariant. Asynchronous validators participate in the same validator collection as synchronous validators.

When you access an options type with only asynchronous validators through a synchronous creation path, the inherited `Validate` method returns a failed [Microsoft.Extensions.Options.ValidateOptionsResult](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.ValidateOptionsResult). [Microsoft.Extensions.Options.OptionsFactory`1.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.OptionsFactory%601.Create*) then throws an `OptionsValidationException`. The exception message directs you to call `ValidateOnStart` and complete startup before you synchronously access the options.

Custom types that implement `IAsyncValidateOptions<TOptions>` directly must now also implement the inherited `Validate` method.

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change) and can affect [source compatibility](../../categories.md#source-compatibility). In a narrow scenario where a preview binary directly implements `IAsyncValidateOptions<TOptions>` without recompilation, the change can also affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

Asynchronous options validation was introduced in .NET 11 Preview 6 as a startup-only validation path. Later design work for post-startup validation exposed a correctness gap: Options also have synchronous creation and access paths. A validator that implemented only the async interface couldn't run through those synchronous paths, so invalid options could be returned and cached before asynchronous validation ran.

To close that gap before the API reaches a stable release, `IAsyncValidateOptions<TOptions>` now derives from `IValidateOptions<TOptions>`. The unified contract keeps one validator collection, preserves registration order, and makes unsupported synchronous access fail with an actionable exception. For more information, see [dotnet/runtime#131197](https://github.com/dotnet/runtime/pull/131197) and the [approved API proposal](https://github.com/dotnet/runtime/issues/130719).

## Recommended action

For options that use only asynchronous validators, call `ValidateOnStart` and complete host startup before you access the options synchronously:

```csharp
services.AddOptions<MyOptions>()
    .Configure(o => o.Value = 42)
    .ValidateAsync(o => Task.FromResult(o.Value > 0), "Value must be positive.")
    .ValidateOnStart();

await host.StartAsync();
```

Avoid synchronous access to options with only asynchronous validators before startup completes. This guidance applies to `IOptions<TOptions>.Value`, `IOptionsMonitor<TOptions>.CurrentValue`, `IOptionsMonitor<TOptions>.Get`, `IOptionsSnapshot<TOptions>.Value`, `IOptionsSnapshot<TOptions>.Get`, and `IOptionsFactory<TOptions>.Create`.

Some paths remain synchronous even after you use `ValidateOnStart`. Startup validation doesn't seed `IOptionsSnapshot<TOptions>` values for later scopes, and `IOptionsMonitor<TOptions>` recreates options synchronously after a configuration change. If you need those paths to validate successfully, keep at least one synchronous validator.

If you implement `IAsyncValidateOptions<TOptions>` directly, add the inherited `Validate(string? name, TOptions options)` method and recompile against .NET 11. Return [Microsoft.Extensions.Options.ValidateOptionsResult.Skip](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.ValidateOptionsResult.Skip) when the validator doesn't apply, or return [Microsoft.Extensions.Options.ValidateOptionsResult.Fail*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.ValidateOptionsResult.Fail*) when synchronous validation isn't supported.

If your code relied on the removed `in TOptions` contravariance, update the affected assignments, casts, or registrations.

You can't control this behavior with an AppContext switch or configuration setting.

## Affected APIs

- [Microsoft.Extensions.Options.IAsyncValidateOptions`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IAsyncValidateOptions%601)
- [Microsoft.Extensions.Options.IValidateOptions`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IValidateOptions%601)
- [Microsoft.Extensions.Options.AsyncValidateOptions`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.AsyncValidateOptions%601)
- [Microsoft.Extensions.Options.AsyncValidateOptions`2](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.AsyncValidateOptions%602)
- [Microsoft.Extensions.Options.AsyncValidateOptions`3](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.AsyncValidateOptions%603)
- [Microsoft.Extensions.Options.AsyncValidateOptions`4](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.AsyncValidateOptions%604)
- [Microsoft.Extensions.Options.AsyncValidateOptions`5](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.AsyncValidateOptions%605)
- [Microsoft.Extensions.Options.AsyncValidateOptions`6](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.AsyncValidateOptions%606)
- [Microsoft.Extensions.Options.IOptions`1.Value](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptions%601.Value)
- [Microsoft.Extensions.Options.IOptionsMonitor`1.CurrentValue](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%601.CurrentValue)
- [Microsoft.Extensions.Options.IOptionsMonitor`1.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%601.Get*)
- [Microsoft.Extensions.Options.IOptionsSnapshot`1.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsSnapshot%601.Get*)
- [Microsoft.Extensions.Options.IOptionsFactory`1.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsFactory%601.Create*)
- [Microsoft.Extensions.Options.OptionsFactory`1.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.OptionsFactory%601.Create*)
- `ValidateAsync` extension methods on `OptionsBuilder<TOptions>`.
