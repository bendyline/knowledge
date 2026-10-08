# Source code: aspnetcore/fundamentals/url-rewriting/samples/6.x/SampleApp/SampleApp.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

	<PropertyGroup>
		<TargetFramework>net6.0</TargetFramework>
		<Nullable>enable</Nullable>
		<ImplicitUsings>enable</ImplicitUsings>
	</PropertyGroup>
	<ItemGroup>
		<Content Include="ApacheModRewrite.txt;IISUrlRewrite.xml;" CopyToPublishDirectory="PreserveNewest" CopyToOutputDirectory="PreserveNewest" />
	</ItemGroup>

</Project>

```
