---
title: "Use LINQ to query strings"
description: You can query a string as a sequence of characters in LINQ. This article contains several examples you can use or modify to suit your needs.
ms.topic: how-to
ms.date: 04/22/2024
---
# How to: Use LINQ to query strings

Strings are stored as a sequence of characters. As a sequence of characters, they can be queried using LINQ. In this article, there are several example queries that query strings for different characters or words, filter strings, or mix queries with regular expressions.

## How to query for characters in a string

The following example queries a string to determine the number of numeric digits it contains.

[language="csharp" source="./snippets/HowToStrings/Program.cs" id="CharsInAString"::: (complete source file; reference: ./snippets/HowToStrings/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToStrings/Program.cs.md)

The preceding query shows how you can treat a string as a sequence of characters.

## How to count occurrences of a word in a string

The following example shows how to use a LINQ query to count the occurrences of a specified word in a string. To perform the count, first the [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) method is called to create an array of words. There's a performance cost to the [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) method. If the only operation on the string is to count the words, consider using the [System.Text.RegularExpressions.Regex.Matches*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Matches*) or [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) methods instead.

[language="csharp" source="./snippets/HowToStrings/Program.cs" id="CountWordsInAString"::: (complete source file; reference: ./snippets/HowToStrings/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToStrings/Program.cs.md)

The preceding query shows how you can view strings as a sequence of words, after splitting a string into a sequence of words.

## How to sort or filter text data by any word or field

The following example shows how to sort lines of structured text, such as comma-separated values, by any field in the line. The field can be dynamically specified at run time. Assume that the fields in *scores.csv* represent a student's ID number, followed by a series of four test scores:

[Code reference unavailable in this source snapshot: ./snippets/HowToFilesAndDirectories/scores.csv](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/linq/how-to-query-strings.md)

The following query sorts the lines based on the score of the first exam, stored in the second column:

[language="csharp" source="./snippets/HowToStrings/Program.cs" id="SortStrings"::: (complete source file; reference: ./snippets/HowToStrings/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToStrings/Program.cs.md)

The preceding query shows how you can manipulate strings by splitting them into fields, and querying the individual fields.

## How to query for sentences with specific words

The following example shows how to find sentences in a text file that contain matches for each of a specified set of words. Although the array of search terms is hard-coded, it could also be populated dynamically at run time. The query returns the sentences that contain the words "Historically," "data," and "integrated."

[language="csharp" source="./snippets/HowToStrings/Program.cs" id="FindSentences"::: (complete source file; reference: ./snippets/HowToStrings/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToStrings/Program.cs.md)

The query first splits the text into sentences, and then splits each sentence into an array of strings that hold each word. For each of these arrays, the [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*) method removes all duplicate words, and then the query performs an [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*) operation on the word array and the `wordsToMatch` array. If the count of the intersection is the same as the count of the `wordsToMatch` array, all words were found in the words and the original sentence is returned.

The call to [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) uses punctuation marks as separators in order to remove them from the string. If you didn't do remove punctuation, for example you could have a string "Historically," that wouldn't match "Historically" in the `wordsToMatch` array. You might have to use extra separators, depending on the types of punctuation found in the source text.

## How to combine LINQ queries with regular expressions

The following example shows how to use the [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) class to create a regular expression for more complex matching in text strings. The LINQ query makes it easy to filter on exactly the files that you want to search with the regular expression, and to shape the results.

[language="csharp" source="./snippets/HowToStrings/Program.cs" id="QueryWithRegEx"::: (complete source file; reference: ./snippets/HowToStrings/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToStrings/Program.cs.md)

You can also query the [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) object returned by a `RegEx` search. Only the value of each match is produced in the results. However, it's also possible to use LINQ to perform all kinds of filtering, sorting, and grouping on that collection. Because [System.Text.RegularExpressions.MatchCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.MatchCollection) is a nongeneric [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) collection, you have to explicitly state the type of the range variable in the query.
