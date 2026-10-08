---
title: "Querying based on runtime state (Visual Basic)"
description: Describes various techniques your code can use to query dynamically depending on runtime state, by varying either LINQ method calls or the expression trees passed into those methods.
ms.date: 02/14/2021
ms.assetid: 16278787-7532-4b65-98b2-7a412406c4ee
---
# Querying based on runtime state (Visual Basic)

Consider code that defines an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) or an [IQueryable(Of T)](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/visual-basic/programming-guide/concepts/expression-trees/\[System.Linq.IQueryable%601]\(https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601\)) against a data source:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Initialize"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

Every time you run this code, the same exact query will be executed. This is frequently not very useful, as you may want your code to execute different queries depending on conditions at run time. This article describes how you can execute a different query based on runtime state.

## IQueryable / IQueryable(Of T) and expression trees

Fundamentally, an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) has two components:

* [System.Linq.IQueryable.Expression](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable.Expression)&mdash;a language- and datasource-agnostic representation of the current query's components, in the form of an expression tree.
* [System.Linq.IQueryable.Provider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable.Provider)&mdash;an instance of a LINQ provider, which knows how to materialize the current query into a value or set of values.

In the context of dynamic querying, the provider will usually remain the same; the expression tree of the query will differ from query to query.

Expression trees are immutable; if you want a different expression tree&mdash;and thus a different query&mdash;you'll need to translate the existing expression tree to a new one, and thus to a new [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable).

The following sections describe specific techniques for querying differently in response to runtime state:

- Use runtime state from within the expression tree
- Call additional LINQ methods
- Vary the expression tree passed into the LINQ methods
- Construct an [Expression(Of TDelegate)](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601) expression tree using the factory methods at [System.Linq.Expressions.Expression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression)
- Add method call nodes to an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable)'s expression tree
- Construct strings, and use the [Dynamic LINQ library](https://dynamic-linq.net/)

## Use runtime state from within the expression tree

Assuming the LINQ provider supports it, the simplest way to query dynamically is to reference the runtime state directly in the query via a closed-over variable, such as `length` in the following code example:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Runtime_state_from_within_expression_tree"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

The internal expression tree&mdash;and thus the query&mdash;haven't been modified; the query returns different values only because the value of `length` has been changed.

## Call additional LINQ methods

Generally, the [built-in LINQ methods](https://github.com/dotnet/runtime/blob/main/src/libraries/System.Linq.Queryable/src/System/Linq/Queryable.cs) at [System.Linq.Queryable](https://learn.microsoft.com/search/?terms=System.Linq.Queryable) perform two steps:

* Wrap the current expression tree in a [System.Linq.Expressions.MethodCallExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.MethodCallExpression) representing the method call.
* Pass the wrapped expression tree back to the provider, either to return a value via the provider's [System.Linq.IQueryProvider.Execute*](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider.Execute*) method; or to return a translated query object via the [System.Linq.IQueryProvider.CreateQuery*](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider.CreateQuery*) method.

You can replace the original query with the result of an [IQueryable(Of T)](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601)-returning method, to get a new query. You can do this conditionally based on runtime state, as in the following example:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Added_method_calls"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

## Vary the expression tree passed into the LINQ methods

You can pass in different expressions to the LINQ methods, depending on runtime state:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Varying_expressions"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

You might also want to compose the various subexpressions using a third-party library such as [LinqKit](http://www.albahari.com/nutshell/linqkit.aspx)'s [PredicateBuilder](http://www.albahari.com/nutshell/predicatebuilder.aspx):

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Compose_expression"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

## Construct expression trees and queries using factory methods

In all the examples up to this point, we've known the element type at compile time&mdash;`String`&mdash;and thus the type of the query&mdash;`IQueryable(Of String)`. You may need to add components to a query of any element type, or to add different components depending on the element type. You can create expression trees from the ground up, using the factory methods at [System.Linq.Expressions.Expression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression), and thus tailor the expression at run time to a specific element type.

### Constructing an [Expression(Of TDelegate)](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601)

When you construct an expression to pass into one of the LINQ methods, you're actually constructing an instance of [Expression(Of TDelegate)](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601), where `TDelegate` is some delegate type such as `Func(Of String, Boolean)`, `Action`, or a custom delegate type.

[Expression(Of TDelegate)](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601) inherits from [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression), which represents a complete lambda expression like the following:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Compiler_generated"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

A [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression) has two components:

* A parameter list&mdash;`(x As String)`&mdash;represented by the [System.Linq.Expressions.LambdaExpression.Parameters](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression.Parameters) property.
* A body&mdash;`x.StartsWith("a")`&mdash;represented by the [System.Linq.Expressions.LambdaExpression.Body](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression.Body) property.

The basic steps in constructing an [Expression(Of TDelegate)](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601) are as follows:

* Define [System.Linq.Expressions.ParameterExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.ParameterExpression) objects for each of the parameters (if any) in the lambda expression, using the [System.Linq.Expressions.Expression.Parameter*](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression.Parameter*) factory method.

    [language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Factory_method_parameter"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

* Construct the body of your [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression), using the [System.Linq.Expressions.ParameterExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.ParameterExpression)(s) you've defined, and the factory methods at [System.Linq.Expressions.Expression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression). For instance, an expression representing `x.StartsWith("a")` could be constructed like this:

    [language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Factory_method_body"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

* Wrap the parameters and body in a compile-time-typed [Expression(Of TDelegate)](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601), using the appropriate [System.Linq.Expressions.Expression.Lambda*](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression.Lambda*) factory method overload:

    [language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Factory_method_lambda"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

The following sections describe a scenario in which you might want to construct an [Expression(Of TDelegate)](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601) to pass into a LINQ method, and provide a complete example of how to do so using the factory methods.

### Scenario

Let's say you have multiple entity types:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Entities.vb"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Entities.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Entities.vb.md)

For any of these entity types, you want to filter and return only those entities that have a given text inside one of their `string` fields. For `Person`, you'd want to search the `FirstName` and `LastName` properties:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="PersonsQry"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

But for `Car`, you'd want to search only the `Model` property:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="CarsQry"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

While you could write one custom function for `IQueryable(Of Person)` and another for `IQueryable(Of Car)`, the following function adds this filtering to any existing query, irrespective of the specific element type.

### Example

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Factory_methods_expression_of_tdelegate"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

Because the `TextFilter` function takes and returns an [IQueryable(Of T)](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) (and not just an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable)), you can add further compile-time-typed query elements after the text filter.

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Factory_methods_expression_of_tdelegate_usage"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

## Add method call nodes to the [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable)'s expression tree

If you have an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) instead of an [IQueryable(Of T)](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601), you can't directly call the generic LINQ methods. One alternative is to build the inner expression tree as above, and use reflection to invoke the appropriate LINQ method while passing in the expression tree.

You could also duplicate the LINQ method's functionality, by wrapping the entire tree in a [System.Linq.Expressions.MethodCallExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.MethodCallExpression) that represents a call to the LINQ method:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Factory_methods_lambdaexpression"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

In this case you don't have a compile-time `T` generic placeholder, so you'll use the [System.Linq.Expressions.Expression.Lambda*](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression.Lambda*) overload that doesn't require compile-time type information, and which produces a [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression) instead of an [Expression(Of TDelegate)](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601).

## The Dynamic LINQ library

Constructing expression trees using factory methods is relatively complex; it is easier to compose strings. The [Dynamic LINQ library](https://dynamic-linq.net/) exposes a set of extension methods on [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) corresponding to the standard LINQ methods at [System.Linq.Queryable](https://learn.microsoft.com/search/?terms=System.Linq.Queryable), and which accept strings in a [special syntax](https://dynamic-linq.net/expression-language) instead of expression trees. The library generates the appropriate expression tree from the string, and can return the resultant translated [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable).

For instance, the previous example (including the expression tree construction) could be rewritten as follows:

[language="vb" source="../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb" id="Dynamic_linq"::: (complete source file; reference: ../../../../../samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb)](../../../../../_code/samples/snippets/visualbasic/programming-guide/dynamic-linq-expression-trees/Program.vb.md)

## See also

- [Expression Trees (Visual Basic)](index.md)
- [How to: Execute Expression Trees (Visual Basic)](how-to-execute-expression-trees.md)
