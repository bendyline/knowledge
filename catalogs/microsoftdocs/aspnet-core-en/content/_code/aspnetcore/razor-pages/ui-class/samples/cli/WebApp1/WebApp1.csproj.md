# Source code: aspnetcore/razor-pages/ui-class/samples/cli/WebApp1/WebApp1.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

   <PropertyGroup>
   	<TargetFramework>netcoreapp3.1</TargetFramework>
   </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\RazorUIClassLib\RazorUIClassLib.csproj" />
  </ItemGroup>

  <ItemGroup>
    <Content Update="Areas\MyFeature2\Pages\_ViewStart.cshtml">
      <Pack>$(IncludeRazorContentInPack)</Pack>
    </Content>
  </ItemGroup>

</Project>

```
