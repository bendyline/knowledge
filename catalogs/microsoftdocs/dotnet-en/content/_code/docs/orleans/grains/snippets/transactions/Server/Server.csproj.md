# Source code: docs/orleans/grains/snippets/transactions/Server/Server.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.12" />
    <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="10.0.12" />
    <PackageReference Include="Microsoft.Orleans.Server" Version="10.3.1" />
    <PackageReference Include="Microsoft.Orleans.Transactions.AzureStorage" Version="10.3.1" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Abstractions\Abstractions.csproj" />
    <ProjectReference Include="..\Grains\Grains.csproj" />
  </ItemGroup>

</Project>

```
