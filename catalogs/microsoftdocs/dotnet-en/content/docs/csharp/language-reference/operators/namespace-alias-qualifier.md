---
title: "Namespace alias operator - the `::` is used to access a member of an aliased namespace."
description: "The C# namespace alias qualifier `::` is used to access a member of an aliased namespace. The `::` operator is often used with the `global` alias, an alias for the global namespace"
ms.date: 01/20/2026
f1_keywords: 
  - "::_CSharpKeyword"
  - "global_CSharpKeyword"
  - global
helpviewer_keywords: 
  - ":: operator [C#]"
  - "namespace alias qualifier [C#]"
  - "namespace [C#]"
  - "global keyword [C#]"
---
# :: operator - the namespace alias operator

Use the namespace alias qualifier `::` to access a member of an aliased namespace. You can use the `::` qualifier only between two identifiers. The left-hand identifier can be one of a namespace alias, an extern alias, or the `global` alias.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


For example:

- A namespace alias created with a [using alias directive](../keywords/using-directive.md):

  ```csharp
  using forwinforms = System.Drawing;
  using forwpf = System.Windows;
  
  public class Converters
  {
      public static forwpf::Point Convert(forwinforms::Point point) => new forwpf::Point(point.X, point.Y);
  }
  ```

- An [extern alias](../keywords/extern-alias.md).
- The `global` alias, which is the global namespace alias. The global namespace is the namespace that contains namespaces and types that aren't declared inside a named namespace. When used with the `::` qualifier, the `global` alias always references the global namespace, even if there's the user-defined `global` namespace alias.

  The following example uses the `global` alias to access the .NET [System](https://learn.microsoft.com/search/?terms=System) namespace, which is a member of the global namespace. Without the `global` alias, the user-defined `System` namespace, which is a member of the `MyCompany.MyProduct` namespace, would be accessed:

  ```csharp
  namespace MyCompany.MyProduct.System
  {
      class Program
      {
          static void Main() => global::System.Console.WriteLine("Using global alias");
      }

      class Console
      {
          string Suggestion => "Consider renaming this class";
      }
  }
  ```

  > **Note:**
  > The `global` keyword is the global namespace alias only when it's the left-hand identifier of the `::` qualifier.

You can also use the [`.` token](member-access-operators.md#member-access-expression-) to access a member of an aliased namespace. However, the `.` token is also used to access a type member. The `::` qualifier ensures that its left-hand identifier always references a namespace alias, even if there exists a type or namespace with the same name.

## C# language specification

For more information, see the [Namespace alias qualifiers](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/namespaces.md#149-qualified-alias-member) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [C# operators and expressions](index.md)
