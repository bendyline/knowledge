---
title: Use the .NET Compiler Platform SDK syntax model
description: This overview provides an understanding of the types you use to understand and manipulate syntax nodes.
ms.date: 10/15/2017
ms.custom: mvc
---
# Work with syntax

The *syntax tree* is a fundamental immutable data structure exposed by the compiler APIs. These trees represent the lexical and syntactic structure of source code. They serve two important purposes:

- To allow tools - such as an IDE, add-ins, code analysis tools, and refactorings - to see and process the syntactic structure of source code in a user's project.
- To enable tools - such as refactorings and an IDE - to create, modify, and rearrange source code in a natural manner without having to use direct text edits. By creating and manipulating trees, tools can easily create and rearrange source code.

## Syntax trees

Syntax trees are the primary structure used for compilation, code analysis, binding, refactoring, IDE features, and code generation. No part of the source code is understood without it first being identified and categorized into one of many well-known structural language elements.

> **Note:**
>
> [RoslynQuoter](https://github.com/KirillOsenkov/RoslynQuoter) is an open-source tool that shows the syntax factory API calls used to construct a program's syntax tree. To try it out live, see [http://roslynquoter.azurewebsites.net](https://roslynquoter.azurewebsites.net).

Syntax trees have three key attributes:

- They hold all the source information in full fidelity. Full fidelity means that the syntax tree contains every piece of information found in the source text, every grammatical construct, every lexical token, and everything else in between, including white space, comments, and preprocessor directives. For example, each literal mentioned in the source is represented exactly as it was typed. Syntax trees also capture errors in source code when the program is incomplete or malformed by representing skipped or missing tokens.
- They can produce the exact text that they were parsed from. From any syntax node, it's possible to get the text representation of the subtree rooted at that node. This ability means that syntax trees can be used as a way to construct and edit source text. By creating a tree you have, by implication, created the equivalent text, and by making a new tree out of changes to an existing tree, you have effectively edited the text.
- They are immutable and thread-safe. After a tree is obtained, it's a snapshot of the current state of the code and never changes. This allows multiple users to interact with the same syntax tree at the same time in different threads without locking or duplication. Because the trees are immutable and no modifications can be made directly to a tree, factory methods help create and modify syntax trees by creating additional snapshots of the tree. The trees are efficient in the way they reuse underlying nodes, so a new version can be rebuilt fast and with little extra memory.

A syntax tree is literally a tree data structure, where non-terminal structural elements parent other elements. Each syntax tree is made up of nodes, tokens, and trivia.

## Syntax nodes

Syntax nodes are one of the primary elements of syntax trees. These nodes represent syntactic constructs such as declarations, statements, clauses, and expressions. Each category of syntax nodes is represented by a separate class derived from [Microsoft.CodeAnalysis.SyntaxNode](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode). The set of node classes is not extensible.

All syntax nodes are non-terminal nodes in the syntax tree, which means they always have other nodes and tokens as children. As a child of another node, each node has a parent node that can be accessed through the [Microsoft.CodeAnalysis.SyntaxNode.Parent](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.Parent) property. Because nodes and trees are immutable, the parent of a node never changes. The root of the tree has a null parent.

Each node has a [Microsoft.CodeAnalysis.SyntaxNode.ChildNodes](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.ChildNodes) method, which returns a list of child nodes in sequential order based on their position in the source text. This list does not contain tokens. Each node also has methods to examine Descendants, such as [Microsoft.CodeAnalysis.SyntaxNode.DescendantNodes*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.DescendantNodes*), [Microsoft.CodeAnalysis.SyntaxNode.DescendantTokens*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.DescendantTokens*), or [Microsoft.CodeAnalysis.SyntaxNode.DescendantTrivia*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.DescendantTrivia*) - that represent a list of all the nodes, tokens, or trivia that exist in the subtree rooted by that node.

In addition, each syntax node subclass exposes all the same children through strongly typed properties. For example, a [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax) node class has three additional properties specific to binary operators: [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Left](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Left), [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.OperatorToken](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.OperatorToken), and [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Right](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Right). The type of [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Left](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Left) and [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Right](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Right) is [Microsoft.CodeAnalysis.CSharp.Syntax.ExpressionSyntax](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.ExpressionSyntax), and the type of [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.OperatorToken](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.OperatorToken) is [Microsoft.CodeAnalysis.SyntaxToken](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken).

Some syntax nodes have optional children. For example, an [Microsoft.CodeAnalysis.CSharp.Syntax.IfStatementSyntax](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.IfStatementSyntax) has an optional [Microsoft.CodeAnalysis.CSharp.Syntax.ElseClauseSyntax](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.ElseClauseSyntax). If the child is not present, the property returns null.

## Syntax tokens

Syntax tokens are the terminals of the language grammar, representing the smallest syntactic fragments of the code. They are never parents of other nodes or tokens. Syntax tokens consist of keywords, identifiers, literals, and punctuation.

For efficiency purposes, the [Microsoft.CodeAnalysis.SyntaxToken](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken) type is a CLR value type. Therefore, unlike syntax nodes, there is only one structure for all kinds of tokens with a mix of properties that have meaning depending on the kind of token that is being represented.

For example, an integer literal token represents a numeric value. In addition to the raw source text the token spans, the literal token has a [Microsoft.CodeAnalysis.SyntaxToken.Value](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken.Value) property that tells you the exact decoded integer value. This property is typed as [System.Object](https://learn.microsoft.com/search/?terms=System.Object) because it may be one of many primitive types.

The [Microsoft.CodeAnalysis.SyntaxToken.ValueText](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken.ValueText) property tells you the same information as the [Microsoft.CodeAnalysis.SyntaxToken.Value](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken.Value) property; however this property is always typed as [System.String](https://learn.microsoft.com/search/?terms=System.String). An identifier in C# source text may include Unicode escape characters, yet the syntax of the escape sequence itself is not considered part of the identifier name. So although the raw text spanned by the token does include the escape sequence, the [Microsoft.CodeAnalysis.SyntaxToken.ValueText](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken.ValueText) property does not. Instead, it includes the Unicode characters identified by the escape. For example, if the source text contains an identifier written as `\u03C0`, then
the [Microsoft.CodeAnalysis.SyntaxToken.ValueText](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken.ValueText) property for this
token will return `π`.

## Syntax trivia

Syntax trivia represent the parts of the source text that are largely insignificant for normal understanding of the code, such as white space, comments, and preprocessor directives. Like syntax tokens, trivia are value types. The single [Microsoft.CodeAnalysis.SyntaxTrivia](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxTrivia) type is used to describe all kinds of trivia.

Because trivia are not part of the normal language syntax and can appear anywhere between any two tokens, they are not included in the syntax tree as a child of a node. Yet, because they are important when implementing a feature like refactoring and to maintain full fidelity with the source text, they do exist as part of the syntax tree.

You can access trivia by inspecting a token's [Microsoft.CodeAnalysis.SyntaxToken.LeadingTrivia](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken.LeadingTrivia) or [Microsoft.CodeAnalysis.SyntaxToken.TrailingTrivia](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken.TrailingTrivia) collections. When source text is parsed, sequences of trivia are associated with tokens. In general, a token owns any trivia after it on the same line up to the next token. Any trivia after that line is associated with the following token. The first token in the source file gets all the initial trivia, and the last sequence of trivia in the file is tacked onto the end-of-file token, which otherwise has zero width.

Unlike syntax nodes and tokens, syntax trivia do not have parents. Yet, because they are part of the tree and each is associated with a single token, you may access the token it is associated with using the [Microsoft.CodeAnalysis.SyntaxTrivia.Token](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxTrivia.Token) property.

## Spans

Each node, token, or trivia knows its position within the source text and the number of characters it consists of. A text position is represented as a 32-bit integer, which is a zero-based `char` index. A [Microsoft.CodeAnalysis.Text.TextSpan](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.Text.TextSpan) object is the beginning position and a count of characters, both represented as integers. If [Microsoft.CodeAnalysis.Text.TextSpan](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.Text.TextSpan) has a zero length, it refers to a location between two characters.

Each node has two [Microsoft.CodeAnalysis.Text.TextSpan](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.Text.TextSpan) properties: [Microsoft.CodeAnalysis.SyntaxNode.Span*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.Span*) and [Microsoft.CodeAnalysis.SyntaxNode.FullSpan*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.FullSpan*).

The [Microsoft.CodeAnalysis.SyntaxNode.Span](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.Span) property is the text span from the start of the first token in the node's subtree to the end of the last token. This span does not include any leading or trailing trivia.

The [Microsoft.CodeAnalysis.SyntaxNode.FullSpan](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.FullSpan) property is the text span that includes the node's normal span, plus the span of any leading or trailing trivia.

For example:

``` csharp
      if (x > 3)
      {
||        // this is bad
          |throw new Exception("Not right.");|  // better exception?||
      }
```

The statement node inside the block has a span indicated by the single vertical bars (|). It includes the characters `throw new Exception("Not right.");`. The full span is indicated by the double vertical bars (||). It includes the same characters as the span and the characters associated with the leading and trailing trivia.

## Kinds

Each node, token, or trivia has a [Microsoft.CodeAnalysis.SyntaxNode.RawKind](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.RawKind) property, of type [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32), that identifies the exact syntax element represented. This value can be cast to a language-specific enumeration. Each language, C# or Visual Basic, has a single `SyntaxKind` enumeration  ([Microsoft.CodeAnalysis.CSharp.SyntaxKind](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.SyntaxKind) and [Microsoft.CodeAnalysis.VisualBasic.SyntaxKind](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.VisualBasic.SyntaxKind), respectively) that lists all the possible nodes, tokens, and trivia elements in the grammar. This conversion can be done automatically by accessing the [Microsoft.CodeAnalysis.CSharp.CSharpExtensions.Kind*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.CSharpExtensions.Kind*) or [Microsoft.CodeAnalysis.VisualBasic.VisualBasicExtensions.Kind*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.VisualBasic.VisualBasicExtensions.Kind*) extension methods.

The [Microsoft.CodeAnalysis.SyntaxToken.RawKind](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxToken.RawKind) property allows for easy disambiguation of syntax node types that share the same node class. For tokens and trivia, this property is the only way to distinguish one type of element from another.

For example, a single [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax) class has [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Left](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Left), [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.OperatorToken](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.OperatorToken), and [Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Right](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.Syntax.BinaryExpressionSyntax.Right) as children. The [Microsoft.CodeAnalysis.CSharp.CSharpExtensions.Kind*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.CSharpExtensions.Kind*) method distinguishes whether it's an [Microsoft.CodeAnalysis.CSharp.SyntaxKind.AddExpression](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.SyntaxKind.AddExpression), [Microsoft.CodeAnalysis.CSharp.SyntaxKind.SubtractExpression](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.SyntaxKind.SubtractExpression), or [Microsoft.CodeAnalysis.CSharp.SyntaxKind.MultiplyExpression](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.SyntaxKind.MultiplyExpression) kind of syntax node.

> **Tip:**
> It's recommended to check kinds using [Microsoft.CodeAnalysis.CSharpExtensions.IsKind*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharpExtensions.IsKind*) (for C#) or [Microsoft.CodeAnalysis.VisualBasicExtensions.IsKind*](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.VisualBasicExtensions.IsKind*) (for VB) extension methods.

## Errors

Even when the source text contains syntax errors, a full syntax tree that is round-trippable to the source is exposed. When the parser encounters code that does not conform to the defined syntax of the language, it uses one of two techniques to create a syntax tree:

- If the parser expects a particular kind of token but does not find it, it may insert a missing token into the syntax tree in the location that the token was expected. A missing token represents the actual token that was expected, but it has an empty span, and its [Microsoft.CodeAnalysis.SyntaxNode.IsMissing](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.SyntaxNode.IsMissing) property returns `true`.

- The parser may skip tokens until it finds one where it can continue parsing. In this case, the skipped tokens are attached as a trivia node with the kind [Microsoft.CodeAnalysis.CSharp.SyntaxKind.SkippedTokensTrivia](https://learn.microsoft.com/search/?terms=Microsoft.CodeAnalysis.CSharp.SyntaxKind.SkippedTokensTrivia).
