---
title: "The Regular Expression Object Model"
description: Review the regular expression object model in .NET. Work with the regular expression engine, & objects & collections related to matching, grouping, & capturing.
ms.topic: concept-article
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "searching with regular expressions, backreferences"
  - "Regex class"
  - "Match class"
  - "pattern-matching with regular expressions, backreferences"
  - ".NET regular expressions, classes"
  - "CaptureCollection class"
  - "Group class"
  - "characters [.NET], backreferences"
  - "substrings"
  - ".NET regular expressions, backreferences"
  - "searching with regular expressions, classes"
  - "backreferences"
  - "Capture class"
  - "repeating groups of characters"
  - "MatchCollection class"
  - "parsing text with regular expressions, backreferences"
  - "regular expressions [.NET]"
  - "characters [.NET], regular expressions"
  - "classes [.NET], regular expression"
  - "regular expressions [.NET], classes"
  - "characters [.NET], metacharacters"
  - "metacharacters, regular expression classes"
  - "metacharacters, backreferences"
  - "parsing text with regular expressions, classes"
  - "regular expressions [.NET], backreferences"
  - "strings [.NET], regular expressions"
  - "pattern-matching with regular expressions, classes"
  - "GroupCollection class"
ms.assetid: 49a21470-64ca-4b5a-a889-8e24e3c0af7e
---
# The regular expression object model

This article describes the object model used in working with .NET regular expressions.

## The regular expression engine

 The regular expression engine in .NET is represented by the [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) class. The regular expression engine is responsible for parsing and compiling a regular expression, and for performing operations that match the regular expression pattern with an input string. The engine is the central component in the .NET regular expression object model.

 You can use the regular expression engine in either of two ways:

- By calling the static methods of the [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) class. The method parameters include the input string and the regular expression pattern. The regular expression engine caches regular expressions that are used in static method calls, so repeated calls to static regular expression methods that use the same regular expression offer relatively good performance.

- By instantiating a [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) object, that is, by passing a regular expression to the class constructor. In this case, the [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) object is immutable (read-only) and represents a regular expression engine that is tightly coupled with a single regular expression. Because regular expressions used by [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) instances aren't cached, you shouldn't instantiate a [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) object multiple times with the same regular expression.

 You can call the methods of the [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) class to perform the following operations:

- Determine whether a string matches a regular expression pattern.
- Extract a single match or the first match.
- Extract all matches.
- Replace a matched substring.
- Split a single string into an array of strings.

 These operations are described in the following sections.

### Match a regular expression pattern

 The [System.Text.RegularExpressions.Regex.IsMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.IsMatch*) method returns `true` if the string matches the pattern, or `false` if it does not. The [System.Text.RegularExpressions.Regex.IsMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.IsMatch*) method is often used to validate string input. For example, the following code ensures that a string matches a valid social security number in the United States.

 [Conceptual.RegularExpressions.ObjectModel#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/validate1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/validate1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/validate1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/validate1.vb.md)

 The regular expression pattern `^\d{3}-\d{2}-\d{4}$` is interpreted as shown in the following table.

| Pattern | Description |
| --- | --- |
| `^` | Match the beginning of the input string. |
| `\d{3}` | Match three decimal digits. |
| `-` | Match a hyphen. |
| `\d{2}` | Match two decimal digits. |
| `-` | Match a hyphen. |
| `\d{4}` | Match four decimal digits. |
| `$` | Match the end of the input string. |

### Extract a single match or the first match

 The [System.Text.RegularExpressions.Regex.Match*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Match*) method returns a [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object that contains information about the first substring that matches a regular expression pattern. If the `Match.Success` property returns `true`, indicating that a match was found, you can retrieve information about subsequent matches by calling the [System.Text.RegularExpressions.Match.NextMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.NextMatch*) method. These method calls can continue until the `Match.Success` property returns `false`. For example, the following code uses the [System.Text.RegularExpressions.Regex.Match%28System.String%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Match%2528System.String%252CSystem.String%2529) method to find the first occurrence of a duplicated word in a string. It then calls the [System.Text.RegularExpressions.Match.NextMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.NextMatch*) method to find any additional occurrences. The example examines the `Match.Success` property after each method call to determine whether the current match was successful and whether a call to the [System.Text.RegularExpressions.Match.NextMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.NextMatch*) method should follow.

 [Conceptual.RegularExpressions.ObjectModel#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/match1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/match1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/match1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/match1.vb.md)

 The regular expression pattern `\b(\w+)\W+(\1)\b` is interpreted as shown in the following table.

| Pattern | Description |
| --- | --- |
| `\b` | Begin the match on a word boundary. |
| `(\w+)` | Match one or more word characters. This is the first capturing group. |
| `\W+` | Match one or more non-word characters. |
| `(\1)` | Match the first captured string. This is the second capturing group. |
| `\b` | End the match on a word boundary. |

### Extract all matches

 The [System.Text.RegularExpressions.Regex.Matches*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Matches*) method returns a [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object that contains information about all matches that the regular expression engine found in the input string. For example, the previous example could be rewritten to call the [System.Text.RegularExpressions.Regex.Matches*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Matches*) method instead of the [System.Text.RegularExpressions.Regex.Match*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Match*) and [System.Text.RegularExpressions.Match.NextMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.NextMatch*) methods.

 [Conceptual.RegularExpressions.ObjectModel#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/matches1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/matches1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/matches1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/matches1.vb.md)

### Replace a matched substring

 The [System.Text.RegularExpressions.Regex.Replace*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Replace*) method replaces each substring that matches the regular expression pattern with a specified string or regular expression pattern, and returns the entire input string with replacements. For example, the following code adds a U.S. currency symbol before a decimal number in a string.

 [Conceptual.RegularExpressions.ObjectModel#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/replace1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/replace1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/replace1.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/replace1.vb.md)

 The regular expression pattern `\b\d+\.\d{2}\b` is interpreted as shown in the following table.

| Pattern | Description |
| --- | --- |
| `\b` | Begin the match at a word boundary. |
| `\d+` | Match one or more decimal digits. |
| `\.` | Match a period. |
| `\d{2}` | Match two decimal digits. |
| `\b` | End the match at a word boundary. |

 The replacement pattern `$$$&` is interpreted as shown in the following table.

| Pattern | Replacement string |
| --- | --- |
| `$$` | The dollar sign ($) character. |
| `$&` | The entire matched substring. |

### Split a single string into an array of strings

 The [System.Text.RegularExpressions.Regex.Split*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Split*) method splits the input string at the positions defined by a regular expression match. For example, the following code places the items in a numbered list into a string array.

 [Conceptual.RegularExpressions.ObjectModel#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/split1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/split1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/split1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/split1.vb.md)

 The regular expression pattern `\b\d{1,2}\.\s` is interpreted as shown in the following table.

| Pattern | Description |
| --- | --- |
| `\b` | Begin the match at a word boundary. |
| `\d{1,2}` | Match one or two decimal digits. |
| `\.` | Match a period. |
| `\s` | Match a white-space character. |

## The `MatchCollection` and `Match` objects

 Regex methods return two objects that are part of the regular expression object model: the [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object, and the [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object.

### The `MatchCollection` class

 The [System.Text.RegularExpressions.Regex.Matches*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Matches*) method returns a [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object that contains [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) objects that represent all the matches that the regular expression engine found, in the order in which they occur in the input string. If there are no matches, the method returns a [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object with no members. The [System.Text.RegularExpressions.MatchCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection.Item*) property lets you access individual members of the collection by index, from zero to one less than the value of the [System.Text.RegularExpressions.MatchCollection.Count](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection.Count) property. [System.Text.RegularExpressions.MatchCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection.Item*) is the collection's indexer (in C#) and default property (in Visual Basic).

 By default, the call to the [System.Text.RegularExpressions.Regex.Matches*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Matches*) method uses lazy evaluation to populate the [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object. Access to properties that require a fully populated collection, such as the [System.Text.RegularExpressions.MatchCollection.Count*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection.Count*) and [System.Text.RegularExpressions.MatchCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection.Item*) properties, may involve a performance penalty. As a result, we recommend that you access the collection by using the [System.Collections.IEnumerator](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerator) object that is returned by the [System.Text.RegularExpressions.MatchCollection.GetEnumerator*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection.GetEnumerator*) method. Individual languages provide constructs, such as `For Each` in Visual Basic and `foreach` in C#, that wrap the collection's [System.Collections.IEnumerator](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerator) interface.

 The following example uses the [System.Text.RegularExpressions.Regex.Matches%28System.String%29](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Matches%2528System.String%2529) method to populate a [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object with all the matches found in an input string. The example enumerates the collection, copies the matches to a string array, and records the character positions in an integer array.

 [Conceptual.RegularExpressions.ObjectModel#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/matchcollection1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/matchcollection1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/matchcollection1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/matchcollection1.vb.md)

### The `Match` class

 The [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) class represents the result of a single regular expression match. You can access [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) objects in two ways:

- By retrieving them from the [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object that is returned by the [System.Text.RegularExpressions.Regex.Matches*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Matches*) method. To retrieve individual [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) objects, iterate the collection by using a `foreach` (in C#) or `For Each`...`Next` (in Visual Basic) construct, or use the [System.Text.RegularExpressions.MatchCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection.Item*) property to retrieve a specific [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object either by index or by name. You can also retrieve individual [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) objects from the collection by iterating the collection by index, from zero to one less that the number of objects in the collection. However, this method does not take advantage of lazy evaluation, because it accesses the [System.Text.RegularExpressions.MatchCollection.Count](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection.Count) property.

     The following example retrieves individual [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) objects from a [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object by iterating the collection using the `foreach` or `For Each`...`Next` construct. The regular expression simply matches the string "abc" in the input string.

     [Conceptual.RegularExpressions.ObjectModel#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/match2.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/match2.cs.md)
     [Conceptual.RegularExpressions.ObjectModel#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/match2.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/match2.vb.md)

- By calling the [System.Text.RegularExpressions.Regex.Match*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Match*) method, which returns a [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object that represents the first match in a string or a portion of a string. You can determine whether the match has been found by retrieving the value of the `Match.Success` property. To retrieve [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) objects that represent subsequent matches, call the [System.Text.RegularExpressions.Match.NextMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.NextMatch*) method repeatedly, until the `Success` property of the returned [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object is `false`.

     The following example uses the [System.Text.RegularExpressions.Regex.Match%28System.String%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Match%2528System.String%252CSystem.String%2529) and [System.Text.RegularExpressions.Match.NextMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.NextMatch*) methods to match the string "abc" in the input string.

     [Conceptual.RegularExpressions.ObjectModel#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/match3.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/match3.cs.md)
     [Conceptual.RegularExpressions.ObjectModel#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/match3.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/match3.vb.md)

 Two properties of the [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) class return collection objects:

- The [System.Text.RegularExpressions.Match.Groups](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Groups) property returns a [System.Text.RegularExpressions.GroupCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.GroupCollection) object that contains information about the substrings that match capturing groups in the regular expression pattern.

- The `Match.Captures` property returns a [System.Text.RegularExpressions.CaptureCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.CaptureCollection) object that is of limited use. The collection is not populated for a [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object whose `Success` property is `false`. Otherwise, it contains a single [System.Text.RegularExpressions.Capture](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Capture) object that has the same information as the [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object.

For more information about these objects, see [The `GroupCollection` class](#the-groupcollection-class) and [The `CaptureCollection` class](#the-capturecollection-class) sections later in this article.

Two additional properties of the [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) class provide information about the match. The `Match.Value` property returns the substring in the input string that matches the regular expression pattern. The `Match.Index` property returns the zero-based starting position of the matched string in the input string.

The [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) class also has two pattern-matching methods:

- The [System.Text.RegularExpressions.Match.NextMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.NextMatch*) method finds the match after the match represented by the current [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object, and returns a [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object that represents that match.

- The [System.Text.RegularExpressions.Match.Result*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Result*) method performs a specified replacement operation on the matched string and returns the result.

 The following example uses the [System.Text.RegularExpressions.Match.Result*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Result*) method to prepend a $ symbol and a space before every number that includes two fractional digits.

 [Conceptual.RegularExpressions.ObjectModel#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/result1.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/result1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/result1.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/result1.vb.md)

 The regular expression pattern `\b\d+(,\d{3})*\.\d{2}\b` is defined as shown in the following table.

| Pattern | Description |
| --- | --- |
| `\b` | Begin the match at a word boundary. |
| `\d+` | Match one or more decimal digits. |
| `(,\d{3})*` | Match zero or more occurrences of a comma followed by three decimal digits. |
| `\.` | Match the decimal point character. |
| `\d{2}` | Match two decimal digits. |
| `\b` | End the match at a word boundary. |

 The replacement pattern `$$ $&` indicates that the matched substring should be replaced by a dollar sign ($) symbol (the `$$` pattern), a space, and the value of the match (the `$&` pattern).

## The `GroupCollection` class

 The [System.Text.RegularExpressions.Match.Groups](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Groups) property returns a [System.Text.RegularExpressions.GroupCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.GroupCollection) object that contains [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) objects that represent captured groups in a single match. The first [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) object in the collection (at index 0) represents the entire match. Each object that follows represents the results of a single capturing group.

 You can retrieve individual [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) objects in the collection by using the [System.Text.RegularExpressions.GroupCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.GroupCollection.Item*) property. You can retrieve unnamed groups by their ordinal position in the collection, and retrieve named groups either by name or by ordinal position. Unnamed captures appear first in the collection, and are indexed from left to right in the order in which they appear in the regular expression pattern. Named captures are indexed after unnamed captures, from left to right in the order in which they appear in the regular expression pattern. To determine what numbered groups are available in the collection returned for a particular regular expression matching method, you can call the instance [System.Text.RegularExpressions.Regex.GetGroupNumbers*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.GetGroupNumbers*) method. To determine what named groups are available in the collection, you can call the instance [System.Text.RegularExpressions.Regex.GetGroupNames*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.GetGroupNames*) method. Both methods are particularly useful in general-purpose routines that analyze the matches found by any regular expression.

 The [System.Text.RegularExpressions.GroupCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.GroupCollection.Item*) property is the indexer of the collection in C# and the collection object's default property in Visual Basic. This means that individual [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) objects can be accessed by index (or by name, in the case of named groups) as follows:

 [Conceptual.RegularExpressions.ObjectModel#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/groupsyntax1.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/groupsyntax1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/groupsyntax1.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/groupsyntax1.vb.md)

 The following example defines a regular expression that uses grouping constructs to capture the month, day, and year of a date.

 [Conceptual.RegularExpressions.ObjectModel#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/groupcollection1.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/groupcollection1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/groupcollection1.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/groupcollection1.vb.md)

 The regular expression pattern `\b(\w+)\s(\d{1,2}),\s(\d{4})\b` is defined as shown in the following table.

| Pattern | Description |
| --- | --- |
| `\b` | Begin the match at a word boundary. |
| `(\w+)` | Match one or more word characters. This is the first capturing group. |
| `\s` | Match a white-space character. |
| `(\d{1,2})` | Match one or two decimal digits. This is the second capturing group. |
| `,` | Match a comma. |
| `\s` | Match a white-space character. |
| `(\d{4})` | Match four decimal digits. This is the third capturing group. |
| `\b` | End the match on a word boundary. |

## The captured group

 The [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) class represents the result from a single capturing group. Group objects that represent the capturing groups defined in a regular expression are returned by the [System.Text.RegularExpressions.GroupCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.GroupCollection.Item*) property of the [System.Text.RegularExpressions.GroupCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.GroupCollection) object returned by the [System.Text.RegularExpressions.Match.Groups](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Groups) property. The [System.Text.RegularExpressions.GroupCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.GroupCollection.Item*) property is the indexer (in C#) and the default property (in Visual Basic) of the [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) class. You can also retrieve individual members by iterating the collection using the `foreach` or `For Each` construct. For an example, see the previous section.

 The following example uses nested grouping constructs to capture substrings into groups. The regular expression pattern `(a(b))c` matches the string "abc". It assigns the substring "ab" to the first capturing group, and the substring "b" to the second capturing group.

 [RegularExpressions.Classes#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Classes/cs/Example.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Classes/cs/Example.cs.md)
 [RegularExpressions.Classes#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Classes/vb/Example.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Classes/vb/Example.vb.md)

 The following example uses named grouping constructs to capture substrings from a string that contains data in the format "DATANAME:VALUE", which the regular expression splits at the colon (:).

 [RegularExpressions.Classes#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Classes/cs/Example.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Classes/cs/Example.cs.md)
 [RegularExpressions.Classes#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Classes/vb/Example.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Classes/vb/Example.vb.md)

 The regular expression pattern `^(?<name>\w+):(?<value>\w+)` is defined as shown in the following table.

| Pattern | Description |
| --- | --- |
| `^` | Begin the match at the beginning of the input string. |
| `(?<name>\w+)` | Match one or more word characters. The name of this capturing group is `name`. |
| `:` | Match a colon. |
| `(?<value>\w+)` | Match one or more word characters. The name of this capturing group is `value`. |

 The properties of the [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) class provide information about the captured group: The `Group.Value` property contains the captured substring, the `Group.Index` property indicates the starting position of the captured group in the input text, the `Group.Length` property contains the length of the captured text, and the `Group.Success` property indicates whether a substring matched the pattern defined by the capturing group.

 Applying quantifiers to a group (for more information, see [Quantifiers](quantifiers-in-regular-expressions.md)) modifies the relationship of one capture per capturing group in two ways:

- If the `*` or `*?` quantifier (which specifies zero or more matches) is applied to a group, a capturing group may not have a match in the input string. When there is no captured text, the properties of the [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) object are set as shown in the following table.

  | Group property | Value |
  | --- | --- |
  | `Success` | `false` |
  | `Value` | [System.String.Empty](https://learn.microsoft.com/search/?terms=System.String.Empty) |
  | `Length` | 0 |

     The following example provides an illustration. In the regular expression pattern `aaa(bbb)*ccc`, the first capturing group (the substring "bbb") can be matched zero or more times. Because the input string "aaaccc" matches the pattern, the capturing group does not have a match.

     [Conceptual.RegularExpressions.ObjectModel#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/nocapture1.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/nocapture1.cs.md)
     [Conceptual.RegularExpressions.ObjectModel#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/nocapture1.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/nocapture1.vb.md)

- Quantifiers can match multiple occurrences of a pattern that is defined by a capturing group. In this case, the `Value` and `Length` properties of a [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) object contain information only about the last captured substring. For example, the following regular expression matches a single sentence that ends in a period. It uses two grouping constructs: The first captures individual words along with a white-space character; the second captures individual words. As the output from the example shows, although the regular expression succeeds in capturing an entire sentence, the second capturing group captures only the last word.

     [Conceptual.RegularExpressions.ObjectModel#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/lastcapture1.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/lastcapture1.cs.md)
     [Conceptual.RegularExpressions.ObjectModel#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/lastcapture1.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/lastcapture1.vb.md)

## The `CaptureCollection` class

 The [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) object contains information only about the last capture. However, the entire set of captures made by a capturing group is still available from the [System.Text.RegularExpressions.CaptureCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.CaptureCollection) object that is returned by the [System.Text.RegularExpressions.Group.Captures](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group.Captures) property. Each member of the collection is a [System.Text.RegularExpressions.Capture](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Capture) object that represents a capture made by that capturing group, in the order in which they were captured (and, therefore, in the order in which the captured strings were matched from left to right in the input string). You can retrieve individual [System.Text.RegularExpressions.Capture](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Capture) objects from the collection in either of two ways:

- By iterating through the collection using a construct such as `foreach` (in C#) or `For Each` (in Visual Basic).

- By using the [System.Text.RegularExpressions.CaptureCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.CaptureCollection.Item*) property to retrieve a specific object by index. The [System.Text.RegularExpressions.CaptureCollection.Item*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.CaptureCollection.Item*) property is the [System.Text.RegularExpressions.CaptureCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.CaptureCollection) object's default property (in Visual Basic) or indexer (in C#).

 If a quantifier is not applied to a capturing group, the [System.Text.RegularExpressions.CaptureCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.CaptureCollection) object contains a single [System.Text.RegularExpressions.Capture](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Capture) object that is of little interest, because it provides information about the same match as its [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) object. If a quantifier is applied to a capturing group, the [System.Text.RegularExpressions.CaptureCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.CaptureCollection) object contains all captures made by the capturing group, and the last member of the collection represents the same capture as the [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) object.

 For example, if you use the regular expression pattern `((a(b))c)+` (where the + quantifier specifies one or more matches) to capture matches from the string "abcabcabc", the [System.Text.RegularExpressions.CaptureCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.CaptureCollection) object for each [System.Text.RegularExpressions.Group](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group) object contains three members.

 [Conceptual.RegularExpressions.ObjectModel#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/capturecollection1.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/capturecollection1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/capturecollection1.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/capturecollection1.vb.md)

 The following example uses the regular expression `(Abc)+` to find one or more consecutive runs of the string "Abc" in the string "XYZAbcAbcAbcXYZAbcAb". The example illustrates the use of the [System.Text.RegularExpressions.Group.Captures](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group.Captures) property to return multiple groups of captured substrings.

 [RegularExpressions.Classes#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Classes/cs/Example.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Classes/cs/Example.cs.md)
 [RegularExpressions.Classes#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Classes/vb/Example.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Classes/vb/Example.vb.md)

## The `Capture` class

 The [System.Text.RegularExpressions.Capture](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Capture) class contains the results from a single subexpression capture. The [System.Text.RegularExpressions.Capture.Value](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Capture.Value) property contains the matched text, and the [System.Text.RegularExpressions.Capture.Index](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Capture.Index) property indicates the zero-based position in the input string at which the matched substring begins.

 The following example parses an input string for the temperature of selected cities. A comma (",") is used to separate a city and its temperature, and a semicolon (";") is used to separate each city's data. The entire input string represents a single match. In the regular expression pattern `((\w+(\s\w+)*),(\d+);)+`, which is used to parse the string, the city name is assigned to the second capturing group, and the temperature is assigned to the fourth capturing group.

 [Conceptual.RegularExpressions.ObjectModel#16 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/capture1.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/capture1.cs.md)
 [Conceptual.RegularExpressions.ObjectModel#16 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/capture1.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/vb/capture1.vb.md)

 The regular expression is defined as shown in the following table.

| Pattern | Description |
| --- | --- |
| `\w+` | Match one or more word characters. |
| `(\s\w+)*` | Match zero or more occurrences of a white-space character followed by one or more word characters. This pattern matches multi-word city names. This is the third capturing group. |
| `(\w+(\s\w+)*)` | Match one or more word characters followed by zero or more occurrences of a white-space character and one or more word characters. This is the second capturing group. |
| `,` | Match a comma. |
| `(\d+)` | Match one or more digits. This is the fourth capturing group. |
| `;` | Match a semicolon. |
| `((\w+(\s\w+)*),(\d+);)+` | Match the pattern of a word followed by any additional words followed by a comma, one or more digits, and a semicolon, one or more times. This is the first capturing group. |

## See also

- [System.Text.RegularExpressions](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions)
- [.NET Regular Expressions](regular-expressions.md)
- [Regular Expression Language - Quick Reference](regular-expression-language-quick-reference.md)
