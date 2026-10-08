# Source code: aspnetcore/fundamentals/openapi/samples/10.x/aspnet-openapi-xml-controllers/api/AdditionalFiles.xml

Complete source file; linked examples may select a region or line range.

```
<ItemGroup>
  <PackageReference Include="Some.Package" Version="10.0.0"
                    GeneratePathProperty="true" />
</ItemGroup>

<ItemGroup>
  <AdditionalFiles Include="$(PkgSome_Package)/lib/net10.0/Some.Package.xml" />
</ItemGroup>

```
