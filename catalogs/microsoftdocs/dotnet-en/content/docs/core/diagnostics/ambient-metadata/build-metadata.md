---
title: Ambient metadata about build
description: Learn how to use ambient build metadata to capture and access CI/CD build information about your application at runtime in .NET.
ms.date: 01/16/2026
ai-usage: ai-assisted
---

# Ambient metadata about build

The [`Microsoft.Extensions.AmbientMetadata.Build`](https://www.nuget.org/packages/Microsoft.Extensions.AmbientMetadata.Build) NuGet package provides functionality to capture build-related information and access it at runtime. During the build process, source generation captures details from CI/CD pipelines (such as build IDs, commit information, and branch names) and embeds them into the compiled application, making them available for traceability, troubleshooting, and deployment tracking.

## Why use build metadata

Build metadata provides context about the specific build that produced your running application, which can be used in various scenarios, such as:

- **Traceability**: Link runtime behavior directly to specific builds and source code commits.
- **Troubleshooting**: Identify which commit or build introduced issues in production.
- **Deployment tracking**: Know exactly what code version is running in each environment.
- **Audit and compliance**: Maintain detailed records of what code was deployed and when.
- **Telemetry enrichment**: Add build context to logs, metrics, and traces.

## How build metadata works

The build metadata component uses a source generator that captures build information during compilation. When you build your application, the generator reads MSBuild properties and generates code that embeds this information into your compiled assembly.

### Automatic capture in CI/CD

When building in supported CI/CD environments (Azure DevOps or GitHub Actions), environment variables are automatically captured through a transitive MSBuild props file. This file maps CI/CD environment variables to MSBuild properties that the source generator can read:

**Azure DevOps environment variables:**

- `BUILD_BUILDID` → `BuildMetadataAzureBuildId`
- `BUILD_BUILDNUMBER` → `BuildMetadataAzureBuildNumber`
- `BUILD_SOURCEBRANCHNAME` → `BuildMetadataAzureSourceBranchName`
- `BUILD_SOURCEVERSION` → `BuildMetadataAzureSourceVersion`
- `TF_BUILD` → `BuildMetadataIsAzureDevOps` (detection flag)

**GitHub Actions environment variables:**

- `GITHUB_RUN_ID` → `BuildMetadataGitHubRunId`
- `GITHUB_RUN_NUMBER` → `BuildMetadataGitHubRunNumber`
- `GITHUB_REF_NAME` → `BuildMetadataGitHubRefName`
- `GITHUB_SHA` → `BuildMetadataGitHubSha`

The source generator detects which CI/CD platform is active and uses the appropriate set of properties to populate the [Microsoft.Extensions.AmbientMetadata.BuildMetadata](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AmbientMetadata.BuildMetadata) class, which you can then inject as `IOptions<BuildMetadata>` and use at runtime.

### Manual configuration with MSBuild properties

If you're building outside of a supported CI/CD environment or want to override the automatic values, you can set MSBuild properties directly in your project file or pass them as command-line arguments.

## Install the package

To get started, install the [📦 Microsoft.Extensions.AmbientMetadata.Build](https://www.nuget.org/packages/Microsoft.Extensions.AmbientMetadata.Build) NuGet package:

### [.NET CLI](#tab/dotnet-cli)

```dotnetcli
dotnet add package Microsoft.Extensions.AmbientMetadata.Build
```

Or, if you're using .NET 10+ SDK:

```dotnetcli
dotnet package add Microsoft.Extensions.AmbientMetadata.Build
```

### [PackageReference](#tab/package-reference)

```xml
<PackageReference Include="Microsoft.Extensions.AmbientMetadata.Build"
                  Version="*" /> <!-- Adjust version -->
```

---

## Configure build metadata

The source generator included in the `Microsoft.Extensions.AmbientMetadata.Build` package generates the `UseBuildMetadata()` extension method that simplifies configuration. During the build process, it captures build information from MSBuild properties and generates code to make this data available at runtime.

### 1. Use UseBuildMetadata() method

The simplest way to configure build metadata is to use the source-generated `UseBuildMetadata()` extension method:

[language="csharp" source="snippets/buildmetadata-usebuildmetadata/Program.cs" range="4-9" highlight="3"::: (complete source file; reference: snippets/buildmetadata-usebuildmetadata/Program.cs)](../../../../_code/docs/core/diagnostics/ambient-metadata/snippets/buildmetadata-usebuildmetadata/Program.cs.md)

The `UseBuildMetadata()` method:

- Adds the build metadata configuration source (with values captured during the build process)
- Registers the [Microsoft.Extensions.AmbientMetadata.BuildMetadata](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AmbientMetadata.BuildMetadata) type in dependency injection
- Uses the default configuration section `ambientmetadata:build`

### 2. Use AddBuildMetadata() methods

You can also configure build metadata using the `AddBuildMetadata()` extension methods. These methods do absolutely the same thing as `UseBuildMetadata()` above, but provide more flexibility if, for instance, you configure Host Configuration and Dependency Injection in different places of your source code.

[language="csharp" source="snippets/buildmetadata-access/Program.cs" range="7-22" highlight="5-6"::: (complete source file; reference: snippets/buildmetadata-access/Program.cs)](../../../../_code/docs/core/diagnostics/ambient-metadata/snippets/buildmetadata-access/Program.cs.md)

### 3. Configure with MSBuild properties

You can set build metadata by defining MSBuild properties in your project file. This is useful when building outside of a CI/CD environment or when you want to provide custom values.

[language="xml" source="snippets/buildmetadata-msbuild-azure/buildmetadata-msbuild-azure.csproj" range="3-12" highlight="6-10"::: (complete source file; reference: snippets/buildmetadata-msbuild-azure/buildmetadata-msbuild-azure.csproj)](../../../../_code/docs/core/diagnostics/ambient-metadata/snippets/buildmetadata-msbuild-azure/buildmetadata-msbuild-azure.csproj.md)

> **Note:**
> The source generator uses `BuildMetadataIsAzureDevOps` to determine which set of properties to read (Azure DevOps or GitHub Actions). If you're manually setting properties, ensure you set this flag appropriately or use the GitHub properties if the flag is not set.

## Access build metadata

Once configured, you can inject and use the [Microsoft.Extensions.AmbientMetadata.BuildMetadata](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AmbientMetadata.BuildMetadata) type:

[language="csharp" source="snippets/buildmetadata-access/Program.cs" highlight="16"::: (complete source file; reference: snippets/buildmetadata-access/Program.cs)](../../../../_code/docs/core/diagnostics/ambient-metadata/snippets/buildmetadata-access/Program.cs.md)

## Complete example

Here's a complete example showing how to set up and use build metadata:

**appsettings.json:**

[language="json" source="snippets/buildmetadata/appsettings.json"::: (complete source file; reference: snippets/buildmetadata/appsettings.json)](../../../../_code/docs/core/diagnostics/ambient-metadata/snippets/buildmetadata/appsettings.json.md)

**Program.cs:**

[language="csharp" source="snippets/buildmetadata/Program.cs"::: (complete source file; reference: snippets/buildmetadata/Program.cs)](../../../../_code/docs/core/diagnostics/ambient-metadata/snippets/buildmetadata/Program.cs.md)

> **Note:**
> This example uses `appsettings.json` to configure build metadata properties *manually*. This is for demonstration purposes; in a real CI/CD scenario, these values would be captured automatically from respective environment variables, and you don't need to have them in `appsettings.json`.

### Output

The output includes build metadata in the log messages:

```
info: ApplicationService[0]
      Application started - Build: 1.0.0-ci.20260116.1, Branch: main, Commit: a1b2c3d
```

## Next steps

- Learn about [application metadata](application-metadata.md) for capturing application-level information
