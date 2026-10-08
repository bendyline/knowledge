# Source code: aspnetcore/fundamentals/url-rewriting/samples/2.x/SampleApp/SampleApp.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.2</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <Content Include="ApacheModRewrite.txt;IISUrlRewrite.xml;testCert.pfx" CopyToPublishDirectory="PreserveNewest" CopyToOutputDirectory="PreserveNewest" />
  </ItemGroup>
  
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

</Project>

```
