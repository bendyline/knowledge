# Source code: samples/snippets/csharp/VS_Snippets_Data/dp l2e arraysandlistsinqueries/cs/l2e_arraysandlistsinqueriescs.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net48</TargetFramework>
    <RootNamespace>L2E_ArraysAndListsInQueriesCS</RootNamespace>
    <AssemblyName>L2E_ArraysAndListsInQueriesCS</AssemblyName>

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
    <Compile Include="AdventureWorksModel.Designer.cs">
      <AutoGen>True</AutoGen>
      <DesignTime>True</DesignTime>
      <DependentUpon>AdventureWorksModel.edmx</DependentUpon>
    </Compile>
    <Compile Include="Program.cs" />
  </ItemGroup>

  <ItemGroup>
    <EntityDeploy Include="AdventureWorksModel.edmx">
      <Generator>EntityModelCodeGenerator</Generator>
      <LastGenOutput>AdventureWorksModel.Designer.cs</LastGenOutput>
    </EntityDeploy>
  </ItemGroup>

  <ItemGroup>
    <None Include="App.Config" />
  </ItemGroup>

</Project>

```
