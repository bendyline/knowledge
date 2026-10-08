# Source code: docs/azure/sdk/snippets/authentication/brokered/console-app/BrokeredConsole.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ProjectUISubcaption>Linux</ProjectUISubcaption>
  </PropertyGroup>
  <ItemGroup>
      <PackageReference Include="Azure.Identity" />
      <PackageReference Include="Azure.Identity.Broker" />
      <PackageReference Include="Azure.Security.KeyVault.Secrets" />
  </ItemGroup>
</Project>

```
