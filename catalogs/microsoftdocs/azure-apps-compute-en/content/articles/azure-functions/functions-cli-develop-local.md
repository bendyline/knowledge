---
title: Develop Azure Functions locally using the Azure Functions CLI (preview)
description: Learn how to develop and test Azure Functions projects locally using the Azure Functions CLI (v5), which uses a workload-based architecture for modular stack-specific tooling.
ms.topic: how-to
ms.date: 06/09/2026
ms.custom:
  - build-2026
zone_pivot_groups: programming-languages-set-functions
#customer intent: As an Azure Functions developer, I want to set up and use the Azure Functions CLI (v5) locally so that I can develop and test functions using the workload-based model.
---

# Develop Azure Functions locally by using the Azure Functions CLI (preview)

The Azure Functions CLI is the next major version (v5) of the local development runtime and tooling for Azure Functions. This version of func.exe features a workload-based architecture, so you only download what you need for the stack you develop on.

> **Important:**
> The Azure Functions CLI (v5) is currently in preview. This preview version doesn't yet support Java and PowerShell. To work with currently unsupported languages, continue to use [Azure Functions Core Tools v4](functions-core-tools-reference.md?pivots=func-cli-v4).


There are two command-line tools that ship as `func.exe` for Azure Functions:

|  | [Azure Functions Core Tools](functions-run-local.md) | [Azure Functions CLI](functions-cli-develop-local.md) |
| --- | --- | --- |
| **func.exe version** | v4 | v5 |
| **Support level** | General availability (GA) | Preview |
| **Install footprint** | Full binary that includes all commands and capabilities for all native languages. | Small base install, plus workloads per-language and other features you add as needed. The host ships as its own workload, so you get the latest host version without re-downloading the CLI. |
| **Use when...** | You need full GA support for all development workflows. | You want a lightweight, workload-based experience with new features like quickstart templates and profiles that keep your local environment in sync with your Azure hosting plan configuration. |


For the command reference, see [Azure Functions CLI reference](functions-core-tools-reference.md). 

**Applies to: programming-language-java,programming-language-powershell**

Examples are currently unavailable due to lack of language stack support.


## Install the Azure Functions CLI

The Azure Functions CLI is distributed as a small base install plus workloads that you add for the stacks you develop in. After installation, the `func` binary is on your `PATH`.

> **Note:**
> The installation method might change between preview and general availability.

### [Windows](#tab/windows)

```powershell
iex "& { $(irm https://aka.ms/func-cli/install.ps1) } -Prerelease"
```

### [macOS/Linux](#tab/linux)

```bash
curl -sSL https://aka.ms/func-cli/install.sh | bash -s -- --prerelease
```

---

If you're upgrading from a previous install, add `-Force` (PowerShell) or `--force` (Bash) to the command.

Verify the install:

```command
func --version
```

After you install the base CLI, install the workloads for your stack. The fastest way is [`func setup`](functions-core-tools-reference.md#func-setup), which installs the host, the language worker, the extension bundles (when needed), the stack workload, and the templates workload in one step. 
**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-go**

For example:


**Applies to: programming-language-csharp**


```command
func setup --features dotnet
```



**Applies to: programming-language-javascript,programming-language-typescript**


```command
func setup --features node
```



**Applies to: programming-language-python**


```command
func setup --features python
```



**Applies to: programming-language-go**


```command
func setup --features go
```



You can also install workloads individually by using [`func workload install`](functions-core-tools-reference.md#func-workload-install). Either way, the first time you run `func init`, `func new`, or `func run` without the necessary workloads installed, the CLI prompts you to install them.

## Workloads

The Azure Functions CLI uses a **workload model**. The base `func` install is small and language-agnostic. You install **workloads** on demand to get stack-specific tooling, the Functions host, language workers, extension bundles, and templates.

Workloads fall into these categories:

- **Host**: The Azure Functions host runtime that `func run` uses.
- **Bundles**: Prebuilt extension bundle artifacts so triggers and bindings work out of the box (required for non-.NET stacks).
- **Stack**: Language-specific project tooling (for example, `python`, `node`, `dotnet`).
- **Worker**: The language worker the host uses at run time (for example, `python-worker`, `node-worker`).
- **Templates**: Function templates surfaced by `func new` (for example, `python-templates`, `node-templates`).

For the full list of available workloads and their descriptions, see [Available workloads](functions-core-tools-reference.md#available-workloads) in the CLI reference.

### First-run experience

The first time you run `func init`, `func new`, or `func run`, the CLI checks whether the workloads required for your scenario are installed. If they aren't, the CLI prompts you to install them. Accepting the prompt installs the recommended set for the stack you chose. You can decline the prompt and install workloads manually by using `func workload install`, or run [`func setup`](functions-core-tools-reference.md#func-setup) to provision the standard set non-interactively.

### Workload updates

Run `func workload search` periodically to check for newly available workloads. Continue using [Core Tools (v4)](functions-run-local.md) for unsupported stacks or when you need specific GA features of Core Tools.

**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-go**

## Create a local project

To create a new Functions project, use the [`func init`](functions-core-tools-reference.md#func-init) command.

**Applies to: programming-language-csharp**


```command
func init MyProjFolder --stack dotnet
```


**Applies to: programming-language-javascript**


```command
func init MyProjFolder --stack node --language javascript
```


**Applies to: programming-language-typescript**


```command
func init MyProjFolder --stack node --language typescript
```



**Applies to: programming-language-python**


```command
func init MyProjFolder --stack python
```



**Applies to: programming-language-go**


```command
func init MyProjFolder --stack go
```


**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-go**

The `--stack` option specifies which language stack to use. The installed workload for that stack provides the scaffolding.

## Create a function

To add a function from a template, use the [`func new`](functions-core-tools-reference.md#func-new) command.

```command
func new --template "HTTP trigger" --name MyHttpTrigger
```

## Run functions locally

To start the Functions host and run your project, use [`func run`](functions-core-tools-reference.md#func-run):

```command
func run
```

`func start` is preserved as a backward-compatible alias. The host automatically manages Azurite (local storage emulator) unless you pass `--no-azurite`.

## Scaffold from quickstart templates

To browse and scaffold complete sample apps (HTTP APIs, queue workers, Durable Functions orchestrations), use [`func quickstart`](functions-core-tools-reference.md#func-quickstart):

**Applies to: programming-language-csharp**


```command
func quickstart --stack dotnet --resource http
```



**Applies to: programming-language-javascript,programming-language-typescript**


```command
func quickstart --stack node --resource http
```



**Applies to: programming-language-python**


```command
func quickstart --stack python --resource http
```



**Applies to: programming-language-go**


```command
func quickstart --stack go --resource http
```



## Manage workloads

Use `func workload` to install, update, and remove workloads. For the full list of subcommands and options, see [`func workload`](functions-core-tools-reference.md#func-workload) in the CLI reference.

## Profiles

Profiles encode version constraints for the host, extension bundles, and workers. Apply a profile at runtime by using `func run --profile <name>`. For the full list of subcommands and options, see [`func profile`](functions-core-tools-reference.md#func-profile) in the CLI reference.

## Related content

- [Azure Functions CLI reference](functions-core-tools-reference.md)
- [Develop Azure Functions locally by using Core Tools](functions-run-local.md)
- [Azure Functions Core Tools on GitHub](https://github.com/azure/azure-functions-cli)
