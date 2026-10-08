---
title: "How to Build LINQ Queries based on run-time state"
description: Learn to query dynamically depending on run-time state, by varying either LINQ method calls or the expression trees passed into those methods.
ms.topic: how-to
ms.date: 04/22/2024
---
# Query based on run-time state

In most LINQ queries, the general shape of the query is set in code. You might filter items using a `where` clause, sort the output collection using `orderby`, group items, or perform some computation. Your code might provide parameters for the filter, or the sort key, or other expressions that are part of the query. However, the overall shape of the query can't change. In this article, you learn techniques to use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) interface and types that implement it to modify the shape of a query at run time.

You use these techniques to build queries at run time, where some user input or run-time state changes the query methods you want to use as part of the query. You want to edit the query by adding, removing, or modifying query clauses.

> **Note:**
> Make sure you add `using System.Linq.Expressions;` and `using static System.Linq.Expressions.Expression;` at the top of your *.cs* file.

Consider code that defines an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) or an [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) against a data source:

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Initialize"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

Every time you run the preceding code, the same exact query is executed. Let's learn how to modify the query extend it or modify it. Fundamentally, an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) has two components:

- [System.Linq.IQueryable.Expression](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable.Expression)&mdash;a language-agnostic and datasource-agnostic representation of the current query's components, in the form of an expression tree.
- [System.Linq.IQueryable.Provider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable.Provider)&mdash;an instance of a LINQ provider, which knows how to materialize the current query into a value or set of values.

In the context of dynamic querying, the provider usually remains the same; the expression tree of the query differs from query to query.

Expression trees are immutable; if you want a different expression tree&mdash;and thus a different query&mdash;you need to translate the existing expression tree to a new one. The following sections describe specific techniques for querying differently in response to run-time state:

- Use run-time state from within the expression tree
- Call more LINQ methods
- Vary the expression tree passed into the LINQ methods
- Construct an [System.Linq.Expressions.Expression`1](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601) expression tree using the factory methods at [System.Linq.Expressions.Expression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression)
- Add method call nodes to an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable)'s expression tree
- Construct strings, and use the [Dynamic LINQ library](https://dynamic-linq.net/)

Each of techniques enables more capabilities, but at a cost of increased complexity.

## Use run-time state from within the expression tree

The simplest way to query dynamically is to reference the run-time state directly in the query via a closed-over variable, such as `length` in the following code example:

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Runtime_state_from_within_expression_tree"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

The internal expression tree&mdash;and thus the query&mdash;isn't modified; the query returns different values only because the value of `length` changed.

## Call more LINQ methods

Generally, the [built-in LINQ methods](https://github.com/dotnet/runtime/blob/main/src/libraries/System.Linq.Queryable/src/System/Linq/Queryable.cs) at [System.Linq.Queryable](https://learn.microsoft.com/search/?terms=System.Linq.Queryable) perform two steps:

- Wrap the current expression tree in a [System.Linq.Expressions.MethodCallExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.MethodCallExpression) representing the method call.
- Pass the wrapped expression tree back to the provider, either to return a value via the provider's [System.Linq.IQueryProvider.Execute*](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider.Execute*) method; or to return a translated query object via the [System.Linq.IQueryProvider.CreateQuery*](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider.CreateQuery*) method.

You can replace the original query with the result of an [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601)-returning method, to get a new query. You can use run-time state, as in the following example:

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Added_method_calls"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

## Vary the expression tree passed into the LINQ methods

You can pass in different expressions to the LINQ methods, depending on run-time state:

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Varying_expressions"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

You might also want to compose the various subexpressions using another library such as [LinqKit](http://www.albahari.com/nutshell/linqkit.aspx)'s [PredicateBuilder](http://www.albahari.com/nutshell/predicatebuilder.aspx):

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Compose_expressions"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

## Construct expression trees and queries using factory methods

In all the examples up to this point, you know the element type at compile time&mdash;`string`&mdash;and thus the type of the query&mdash;`IQueryable<string>`. You might add components to a query of any element type, or to add different components, depending on the element type. You can create expression trees from the ground up, using the factory methods at [System.Linq.Expressions.Expression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression), and thus tailor the expression at run time to a specific element type.

## Constructing an Expression\<TDelegate>

When you construct an expression to pass into one of the LINQ methods, you're actually constructing an instance of [System.Linq.Expressions.Expression`1](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601), where `TDelegate` is some delegate type such as `Func<string, bool>`, `Action`, or a custom delegate type.

[System.Linq.Expressions.Expression`1](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601) inherits from [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression), which represents a complete lambda expression like the following example:

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Compiler_generated_expression_tree"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

A [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression) has two components:

1. A parameter list&mdash;`(string x)`&mdash;represented by the [System.Linq.Expressions.LambdaExpression.Parameters](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression.Parameters) property.
1. A body&mdash;`x.StartsWith("a")`&mdash;represented by the [System.Linq.Expressions.LambdaExpression.Body](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression.Body) property.

The basic steps in constructing an [System.Linq.Expressions.Expression`1](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601) are as follows:

1. Define [System.Linq.Expressions.ParameterExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.ParameterExpression) objects for each of the parameters (if any) in the lambda expression, using the [System.Linq.Expressions.Expression.Parameter*](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression.Parameter*) factory method.
   [language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Factory_method_expression_tree_parameter"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)
1. Construct the body of your [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression), using the [System.Linq.Expressions.ParameterExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.ParameterExpression) defined, and the factory methods at [System.Linq.Expressions.Expression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression). For instance, an expression representing `x.StartsWith("a")` could be constructed like this:
   [language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Factory_method_expression_tree_body"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)
1. Wrap the parameters and body in a compile-time-typed [Expression\<TDelegate>](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601), using the appropriate [System.Linq.Expressions.Expression.Lambda*](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression.Lambda*) factory method overload:
   [language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Factory_method_expression_tree_lambda"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

The following sections describe a scenario in which you might want to construct an [System.Linq.Expressions.Expression`1](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601) to pass into a LINQ method. It provides a complete example of how to do so using the factory methods.

## Construct a full query at run time

You want to write queries that work with multiple entity types:

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Entities"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

For any of these entity types, you want to filter and return only those entities that have a given text inside one of their `string` fields. For `Person`, you'd want to search the `FirstName` and `LastName` properties:

```csharp
string term = /* ... */;
var personsQry = new List<Person>()
    .AsQueryable()
    .Where(x => x.FirstName.Contains(term) || x.LastName.Contains(term));
```

But for `Car`, you'd want to search only the `Model` property:

```csharp
string term = /* ... */;
var carsQry = new List<Car>()
    .AsQueryable()
    .Where(x => x.Model.Contains(term));
```

While you could write one custom function for `IQueryable<Person>` and another for `IQueryable<Car>`, the following function adds this filtering to any existing query, irrespective of the specific element type.

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Factory_methods_expression_of_tdelegate"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

Because the `TextFilter` function takes and returns an [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) (and not just an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable)), you can add further compile-time-typed query elements after the text filter.

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Factory_methods_expression_of_tdelegate_usage"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

### Add method call nodes to the IQueryable\<TDelegate>'s expression tree

If you have an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) instead of an [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601), you can't directly call the generic LINQ methods. One alternative is to build the inner expression tree as shown in the previous example, and use reflection to invoke the appropriate LINQ method while passing in the expression tree.

You could also duplicate the LINQ method's functionality, by wrapping the entire tree in a [System.Linq.Expressions.MethodCallExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.MethodCallExpression) that represents a call to the LINQ method:

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Factory_methods_lambdaexpression"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)

In this case, you don't have a compile-time `T` generic placeholder, so you use the [System.Linq.Expressions.Expression.Lambda*](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression.Lambda*) overload that doesn't require compile-time type information, and which produces a [System.Linq.Expressions.LambdaExpression](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.LambdaExpression) instead of an [System.Linq.Expressions.Expression`1](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601).

### The Dynamic LINQ library

Constructing expression trees using factory methods is relatively complex; it's easier to compose strings. The [Dynamic LINQ library](https://dynamic-linq.net/) exposes a set of extension methods on [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) corresponding to the standard LINQ methods at [System.Linq.Queryable](https://learn.microsoft.com/search/?terms=System.Linq.Queryable), and which accept strings in a [special syntax](https://dynamic-linq.net/expression-language) instead of expression trees. The library generates the appropriate expression tree from the string, and can return the resultant translated [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable).

For instance, the previous example could be rewritten as follows:

[language="csharp" source="./snippets/HowToBuildDynamicQueries/Program.cs" id="Dynamic_linq"::: (complete source file; reference: ./snippets/HowToBuildDynamicQueries/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToBuildDynamicQueries/Program.cs.md)
