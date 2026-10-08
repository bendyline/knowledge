# Source code: aspnetcore/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.AppHost/AspireApp1.AppHost.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <Sdk Name="Aspire.AppHost.Sdk" Version="9.0.0" />

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <IsAspireHost>true</IsAspireHost>
    <UserSecretsId>f8d592cd-16b9-4fe6-a662-9bcaeca80677</UserSecretsId>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\AspireApp1.ApiService\AspireApp1.ApiService.csproj" />
    <ProjectReference Include="..\AspireApp1.Web\AspireApp1.Web.csproj" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Aspire.Hosting.AppHost" Version="9.0.0" />
  </ItemGroup>

</Project>

```
