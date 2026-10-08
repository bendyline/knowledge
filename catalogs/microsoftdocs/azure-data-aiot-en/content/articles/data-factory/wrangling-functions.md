---
title: Data wrangling functions in Azure Data Factory 
description: An overview of available Data Wrangling functions in Azure Data Factory
author: kromerm
ms.author: makromer
ms.subservice: data-flows
ms.topic: reference
ms.date: 05/15/2024
---

# Transformation functions in Power Query for data wrangling

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Data Wrangling in Azure Data Factory allows you to do code-free agile data preparation and wrangling at cloud scale by translating Power Query ```M``` scripts into Data Flow script. ADF integrates with [Power Query Online](https://learn.microsoft.com/powerquery-m/power-query-m-reference) and makes Power Query ```M``` functions available for data wrangling via Spark execution using the data flow Spark infrastructure. 

Currently not all Power Query M functions are supported for data wrangling despite being available during authoring. While building your mash-ups, you'll be prompted with the following error message if a function isn't supported:

`UserQuery : Expression.Error: The transformation logic is not supported as it requires dynamic access to rows of data, which cannot be scaled out.`

Below is a list of supported Power Query M functions.

## Column Management

* Selection: [Table.SelectColumns](https://learn.microsoft.com/powerquery-m/table-selectcolumns)
* Removal: [Table.RemoveColumns](https://learn.microsoft.com/powerquery-m/table-removecolumns)
* Renaming: [Table.RenameColumns](https://learn.microsoft.com/powerquery-m/table-renamecolumns), [Table.PrefixColumns](https://learn.microsoft.com/powerquery-m/table-prefixcolumns), [Table.TransformColumnNames](https://learn.microsoft.com/powerquery-m/table-transformcolumnnames)
* Reordering: [Table.ReorderColumns](https://learn.microsoft.com/powerquery-m/table-reordercolumns)

## Row Filtering

Use  M function [Table.SelectRows](https://learn.microsoft.com/powerquery-m/table-selectrows) to filter on the following conditions:

* Equality and inequality
* Numeric, text, and date comparisons (but not DateTime)
* Numeric information such as [Number.IsEven](https://learn.microsoft.com/powerquery-m/number-iseven)/[Odd](https://learn.microsoft.com/powerquery-m/number-iseven)
* Text containment using [Text.Contains](https://learn.microsoft.com/powerquery-m/text-contains), [Text.StartsWith](https://learn.microsoft.com/powerquery-m/text-startswith), or [Text.EndsWith](https://learn.microsoft.com/powerquery-m/text-endswith)
* Date ranges including all the 'IsIn' [Date functions](https://learn.microsoft.com/powerquery-m/date-functions)) 
* Combinations of these using and, or, or not conditions

## Adding and Transforming Columns

The following M functions add or transform columns: [Table.AddColumn](https://learn.microsoft.com/powerquery-m/table-addcolumn), [Table.TransformColumns](https://learn.microsoft.com/powerquery-m/table-transformcolumns), [Table.ReplaceValue](https://learn.microsoft.com/powerquery-m/table-replacevalue), [Table.DuplicateColumn](https://learn.microsoft.com/powerquery-m/table-duplicatecolumn). Below are the supported transformation functions.

* Numeric arithmetic
* Text concatenation
* Date and Time Arithmetic (Arithmetic operators, [Date.AddDays](https://learn.microsoft.com/powerquery-m/date-adddays), [Date.AddMonths](https://learn.microsoft.com/powerquery-m/date-addmonths), [Date.AddQuarters](https://learn.microsoft.com/powerquery-m/date-addquarters), [Date.AddWeeks](https://learn.microsoft.com/powerquery-m/date-addweeks), [Date.AddYears](https://learn.microsoft.com/powerquery-m/date-addyears))
* Durations can be used for date and time arithmetic, but must be transformed into another type before written to a sink (Arithmetic operators, [#duration](https://learn.microsoft.com/powerquery-m/sharpduration), [Duration.Days](https://learn.microsoft.com/powerquery-m/duration-days), [Duration.Hours](https://learn.microsoft.com/powerquery-m/duration-hours), [Duration.Minutes](https://learn.microsoft.com/powerquery-m/duration-minutes), [Duration.Seconds](https://learn.microsoft.com/powerquery-m/duration-seconds), [Duration.TotalDays](https://learn.microsoft.com/powerquery-m/duration-totaldays), [Duration.TotalHours](https://learn.microsoft.com/powerquery-m/duration-totalhours), [Duration.TotalMinutes](https://learn.microsoft.com/powerquery-m/duration-totalminutes), [Duration.TotalSeconds](https://learn.microsoft.com/powerquery-m/duration-totalseconds))    
* Most standard, scientific, and trigonometric numeric functions (All functions under [Operations](https://learn.microsoft.com/powerquery-m/number-functions#operations), [Rounding](https://learn.microsoft.com/powerquery-m/number-functions#rounding), and [Trigonometry](https://learn.microsoft.com/powerquery-m/number-functions#trigonometry) *except* Number.Factorial, Number.Permutations, and Number.Combinations)
* Replacement ([Replacer.ReplaceText](https://learn.microsoft.com/powerquery-m/replacer-replacetext), [Replacer.ReplaceValue](https://learn.microsoft.com/powerquery-m/replacer-replacevalue), [Text.Replace](https://learn.microsoft.com/powerquery-m/text-replace), [Text.Remove](https://learn.microsoft.com/powerquery-m/text-remove))
* Positional text extraction ([Text.PositionOf](https://learn.microsoft.com/powerquery-m/text-positionof), [Text.Length](https://learn.microsoft.com/powerquery-m/text-length), [Text.Start](https://learn.microsoft.com/powerquery-m/text-start), [Text.End](https://learn.microsoft.com/powerquery-m/text-end), [Text.Middle](https://learn.microsoft.com/powerquery-m/text-middle), [Text.ReplaceRange](https://learn.microsoft.com/powerquery-m/text-replacerange), [Text.RemoveRange](https://learn.microsoft.com/powerquery-m/text-removerange))
* Basic text formatting ([Text.Lower](https://learn.microsoft.com/powerquery-m/text-lower), [Text.Upper](https://learn.microsoft.com/powerquery-m/text-upper),
 [Text.Trim](https://learn.microsoft.com/powerquery-m/text-trim)/[Start](https://learn.microsoft.com/powerquery-m/text-trimstart)/[End](https://learn.microsoft.com/powerquery-m/text-trimend), [Text.PadStart](https://learn.microsoft.com/powerquery-m/text-padstart)/[End](https://learn.microsoft.com/powerquery-m/text-padend), [Text.Reverse](https://learn.microsoft.com/powerquery-m/text-reverse))
* Date/Time Functions ([Date.Day](https://learn.microsoft.com/powerquery-m/date-day), [Date.Month](https://learn.microsoft.com/powerquery-m/date-month), [Date.Year](https://learn.microsoft.com/powerquery-m/date-year) [Time.Hour](https://learn.microsoft.com/powerquery-m/time-hour), [Time.Minute](https://learn.microsoft.com/powerquery-m/time-minute), [Time.Second](https://learn.microsoft.com/powerquery-m/time-second), [Date.DayOfWeek](https://learn.microsoft.com/powerquery-m/date-dayofweek), [Date.DayOfYear](https://learn.microsoft.com/powerquery-m/date-dayofyear), [Date.DaysInMonth](https://learn.microsoft.com/powerquery-m/date-daysinmonth))
* If expressions (but branches must have matching types)
* Row filters as a logical column
* Number, text, logical, date, and datetime constants

## Merging/Joining tables

* Power Query will generate a nested join (Table.NestedJoin; users can also
    manually write
    [Table.AddJoinColumn](https://learn.microsoft.com/powerquery-m/table-addjoincolumn)).
    Users must then expand the nested join column into a non-nested join
    (Table.ExpandTableColumn, not supported in any other context).
* The M function
    [Table.Join](https://learn.microsoft.com/powerquery-m/table-join) can
    be written directly to avoid the need for an additional expansion
    step, but the user must ensure that there are no duplicate column names
    among the joined tables
* Supported Join Kinds:
    Inner,
    LeftOuter,
    RightOuter,
    FullOuter
* Both
    [Value.Equals](https://learn.microsoft.com/powerquery-m/value-equals)
    and
    [Value.NullableEquals](https://learn.microsoft.com/powerquery-m/value-nullableequals)
    are supported as key equality comparers

## Group by

Use [Table.Group](https://learn.microsoft.com/powerquery-m/table-group) to aggregate values.
* Must be used with an aggregation function
* Supported aggregation functions:
    [List.Sum](https://learn.microsoft.com/powerquery-m/list-sum),
    [List.Count](https://learn.microsoft.com/powerquery-m/list-count),
    [List.Average](https://learn.microsoft.com/powerquery-m/list-average),
    [List.Min](https://learn.microsoft.com/powerquery-m/list-min),
    [List.Max](https://learn.microsoft.com/powerquery-m/list-max),
    [List.StandardDeviation](https://learn.microsoft.com/powerquery-m/list-standarddeviation),
    [List.First](https://learn.microsoft.com/powerquery-m/list-first),
    [List.Last](https://learn.microsoft.com/powerquery-m/list-last)

## Sorting

Use [Table.Sort](https://learn.microsoft.com/powerquery-m/table-sort) to sort values.

## Reducing Rows

Keep and Remove Top, Keep Range (corresponding M functions,
    only supporting counts, not conditions:
    [Table.FirstN](https://learn.microsoft.com/powerquery-m/table-firstn),
    [Table.Skip](https://learn.microsoft.com/powerquery-m/table-skip),
    [Table.RemoveFirstN](https://learn.microsoft.com/powerquery-m/table-removefirstn),
    [Table.Range](https://learn.microsoft.com/powerquery-m/table-range),
    [Table.MinN](https://learn.microsoft.com/powerquery-m/table-minn),
    [Table.MaxN](https://learn.microsoft.com/powerquery-m/table-maxn))

## Known unsupported functions

| Function | Status |
| --- | --- |
| Table.PromoteHeaders | Not supported. The same result can be achieved by setting "First row as header" in the dataset. |
| Table.CombineColumns | This is a common scenario that isn't directly supported but can be achieved by adding a new column that concatenates two given columns.  For example, Table.AddColumn(RemoveEmailColumn, "Name", each [FirstName] & " " & [LastName]) |
| Table.TransformColumnTypes | This is supported in most cases. The following scenarios are unsupported: transforming string to currency type, transforming string to time type, transforming string to Percentage type and transforming with locale. |
| Table.NestedJoin | Just doing a join will result in a validation error. The columns must be expanded for it to work. |
| Table.RemoveLastN | Remove bottom rows isn't supported. |
| Table.RowCount | Not supported, but can be achieved by adding a custom column containing the value 1, then aggregating that column with List.Sum. Table.Group is supported. |
| Row level error handling | Row level error handling is currently not supported. For example, to filter out non-numeric values from a column, one approach would be to transform the text column to a number. Every cell, which fails to transform will be in an error state and need to be filtered. This scenario isn't possible in scaled-out M. |
| Table.Transpose | Not supported |

## M script workarounds

### ```SplitColumn```

An alternate for split by length and by position is listed below

* Table.AddColumn(Source, "First characters", each Text.Start([Email], 7), type text)
* Table.AddColumn(#"Inserted first characters", "Text range", each Text.Middle([Email], 4, 9), type text)

This option is accessible from the Extract option in the ribbon

Power Query Add Column

### ```Table.CombineColumns```

* Table.AddColumn(RemoveEmailColumn, "Name", each [FirstName] & " " & [LastName])

### Pivots

* Select Pivot transformation from the PQ editor and select your pivot column

Power Query Pivot Common

* Next, select the value column and the aggregate function

Power Query Pivot Selector

* When you click OK, you'll see the data in the editor updated with the pivoted values
* You'll also see a warning message that the transformation may be unsupported
* To fix this warning, expand the pivoted list manually using the PQ editor
* Select Advanced Editor option from the ribbon
* Expand the list of pivoted values manually
* Replace List.Distinct() with the list of values like this:
```
#"Pivoted column" = Table.Pivot(Table.TransformColumnTypes(#"Changed column type 1", {{"genres", type text}}), {"Drama", "Horror", "Comedy", "Musical", "Documentary"}, "genres", "Rating", List.Average)
in
  #"Pivoted column"
```

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=02987a4c-9444-4f3b-acf7-89a3e91ff5f7]

### Formatting date/time columns

To set the date/time format when using Power Query ADF, please follow these sets to set the format.

Power Query Change Type

1. Select the column in the Power Query UI and choose Change Type > Date/Time
2. You'll see a warning message
3. Open Advanced Editor and change ```TransformColumnTypes``` to ```TransformColumns```. Specify the format and culture based on the input data.

Power Query Editor

```
#"Changed column type 1" = Table.TransformColumns(#"Duplicated column", {{"start - Copy", each DateTime.FromText(_, [Format = "yyyy-MM-dd HH:mm:ss", Culture = "en-us"]), type datetime}})
```

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=d4c91bf6-2c21-4ab7-ab4d-695d039327ec]

## Related content

Learn how to [create a data wrangling Power Query in ADF](wrangling-tutorial.md).
