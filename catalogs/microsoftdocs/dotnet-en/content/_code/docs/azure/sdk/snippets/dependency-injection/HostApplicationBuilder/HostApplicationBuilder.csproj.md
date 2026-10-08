# Source code: docs/azure/sdk/snippets/dependency-injection/HostApplicationBuilder/HostApplicationBuilder.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Azure.Identity" />
    <PackageReference Include="Azure.Messaging.ServiceBus" />
    <PackageReference Include="Azure.Security.KeyVault.Secrets" />
    <PackageReference Include="Azure.Storage.Blobs" />
    <PackageReference Include="Microsoft.Extensions.Azure" />
    <PackageReference Include="Microsoft.Extensions.Hosting" />
    <PackageReference Include="OpenAI" />
  </ItemGroup>
</Project>

```
