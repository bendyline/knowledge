# Source code: docs/devops/snippets/create-dotnet-github-action/DotNet.GitHubAction/Extensions/ServiceCollectionExtensions.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.DependencyInjection;

namespace DotNet.GitHubAction.Extensions;

static class ServiceCollectionExtensions
{
    internal static IServiceCollection AddGitHubActionServices(
        this IServiceCollection services)
    {
        // Omitted for brevity
        // https://github.com/dotnet/samples/blob/main/github-actions/DotNet.GitHubAction/DotNet.GitHubAction/Extensions/ServiceCollectionExtensions.cs

        return services;
    }
}

```
