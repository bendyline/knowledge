# Source code: docs/azure/sdk/snippets/dependency-injection/WebApplicationBuilder/WebApplicationBuilder.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Azure.Security.KeyVault.Secrets" />
    <PackageReference Include="Azure.Storage.Blobs" />
    <PackageReference Include="Azure.Messaging.ServiceBus" />
    <PackageReference Include="Microsoft.Extensions.Azure" />
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" />
    <PackageReference Include="Swashbuckle.AspNetCore" />
    <PackageReference Include="Azure.Identity" />
    <PackageReference Include="OpenAI" />
  </ItemGroup>

</Project>

```
