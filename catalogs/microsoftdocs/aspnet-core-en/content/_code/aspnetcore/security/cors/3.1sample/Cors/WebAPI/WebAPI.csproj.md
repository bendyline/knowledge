# Source code: aspnetcore/security/cors/3.1sample/Cors/WebAPI/WebAPI.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="3.1.1" />
    <PackageReference Include="Rick.Docs.Samples.RouteInfo" Version="1.0.*" />
  </ItemGroup>

  <ItemGroup>
    <Content Update="wwwroot\js\MyJS.js">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </Content>
  </ItemGroup>


</Project>

```
