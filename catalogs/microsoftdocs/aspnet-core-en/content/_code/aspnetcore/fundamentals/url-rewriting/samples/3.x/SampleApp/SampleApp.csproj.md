# Source code: aspnetcore/fundamentals/url-rewriting/samples/3.x/SampleApp/SampleApp.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

	<ItemGroup>
		<Content Include="ApacheModRewrite.txt;IISUrlRewrite.xml;testCert.pfx" CopyToPublishDirectory="PreserveNewest" CopyToOutputDirectory="PreserveNewest" />
	</ItemGroup>
</Project>

```
