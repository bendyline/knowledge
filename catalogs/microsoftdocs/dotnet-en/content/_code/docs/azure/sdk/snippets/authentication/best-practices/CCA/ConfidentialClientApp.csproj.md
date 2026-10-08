# Source code: docs/azure/sdk/snippets/authentication/best-practices/CCA/ConfidentialClientApp.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <ProjectUISubcaption>ASP.NET Core</ProjectUISubcaption>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Azure.Identity" />
	  <PackageReference Include="Azure.Security.KeyVault.Secrets" />
	  <PackageReference Include="Azure.Storage.Blobs" />
	  <PackageReference Include="Microsoft.Extensions.Azure" />
  </ItemGroup>

</Project>

```
