# Source code: aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/ChangeTokenSample.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.2</TargetFramework>
    <AspNetCoreHostingModel>InProcess</AspNetCoreHostingModel>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

  <ItemGroup>
    <Content Include="poem.txt" CopyToPublishDirectory="PreserveNewest" />
  </ItemGroup>

</Project>

```
