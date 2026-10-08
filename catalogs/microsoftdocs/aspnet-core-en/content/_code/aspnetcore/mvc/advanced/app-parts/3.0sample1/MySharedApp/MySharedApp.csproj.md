# Source code: aspnetcore/mvc/advanced/app-parts/3.0sample1/MySharedApp/MySharedApp.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.0</TargetFramework>
	  <GenerateEmbeddedFilesManifest>true</GenerateEmbeddedFilesManifest>
  </PropertyGroup>

  <ItemGroup>
    <Content Include="Views\MyShared\Index.cshtml">
      <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
    </Content>
  </ItemGroup>


  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>


  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.FileProviders.Embedded" Version="3.1.6" />
  </ItemGroup>

	<ItemGroup>
		<EmbeddedResource Include="Views\MyShared\Index.cshtml" />
	</ItemGroup>
</Project>

```
