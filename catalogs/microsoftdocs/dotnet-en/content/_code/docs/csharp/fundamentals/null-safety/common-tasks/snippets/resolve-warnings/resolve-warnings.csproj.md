# Source code: docs/csharp/fundamentals/null-safety/common-tasks/snippets/resolve-warnings/resolve-warnings.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <!--
      Suppressed so the project builds cleanly while snippets retain the
      warning-generating lines that the article describes:
        CS8600 - AssignmentWarning demonstrates assigning maybe-null to non-nullable.
        CS8602 - DereferenceWarning and MissingAttribute demonstrate dereferencing maybe-null.
        CS8618 - UninitializedMember demonstrates a non-nullable property left unassigned.
    -->
    <NoWarn>$(NoWarn);CS8600;CS8602;CS8618</NoWarn>
  </PropertyGroup>

</Project>

```
