# Source code: samples/snippets/csharp/VS_Snippets_Data/dp l2e maptodbfunction/cs/CustomStoreFunction.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net48</TargetFramework>
    <RootNamespace>MapCLRFunctionToStoreFunction</RootNamespace>
    <AssemblyName>MapCLRFunctionToStoreFunction</AssemblyName>

    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
    <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
  </PropertyGroup>

  <ItemGroup>
    <Reference Include="System.Data.Entity" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NETFramework.ReferenceAssemblies" Version="1.0.3">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>   
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
  </ItemGroup>

  <ItemGroup>
    <Compile Include="Program.cs" />
    <Compile Include="School.Designer.cs">
      <AutoGen>True</AutoGen>
      <DesignTime>True</DesignTime>
      <DependentUpon>School.edmx</DependentUpon>
    </Compile>
  </ItemGroup>

  <ItemGroup>
    <None Include="App.Config" />
    <EntityDeploy Include="School.edmx">
      <Generator>EntityModelCodeGenerator</Generator>
      <LastGenOutput>School.Designer.cs</LastGenOutput>
    </EntityDeploy>
  </ItemGroup>

</Project>

```
