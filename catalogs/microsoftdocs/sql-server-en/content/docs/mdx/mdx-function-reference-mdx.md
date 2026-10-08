---
title: "MDX Function Reference (MDX)"
description: "MDX Function Reference (MDX)"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: mdx
---
# MDX Function Reference (MDX)


  Analysis Services provides for the use of functions in Multidimensional Expressions (MDX) syntax. Functions can be used in any valid MDX statement, and are frequently used in queries, custom rollup definitions, and other calculations. This section provides information about the MDX functions.  
  
 You can use the following tables to find functions by their category of return value, or you can select a function by name from the alphabetical list in the table of contents.  
  
## Array Functions  
  
| Function | Description |
| --- | --- |
| [SetToArray (MDX)](settoarray-mdx.md) | Converts one or more sets to an array for use in a user-defined function. |
  
## Hierarchy Functions  
  
| Function | Description |
| --- | --- |
| [Hierarchy (MDX)](hierarchy-mdx.md) | Returns the hierarchy that contains a specified member or level. |
| [Dimension (MDX)](dimension-mdx.md) | Returns the dimension that contains a specified member, level, or hierarchy. |
| [Dimensions (MDX)](dimensions-mdx.md) | Returns a hierarchy specified by a numeric or string expression. |
  
## Level Functions  
  
| Function | Description |
| --- | --- |
| [Level (MDX)](level-mdx.md) | Returns the level of a member. |
| [Levels (MDX)](levels-mdx.md) | Returns the level whose position in a dimension or hierarchy is specified by a numeric expression or whose name is specified by a string expression. |
  
## Logical Functions  
  
| Function | Description |
| --- | --- |
| [IsAncestor (MDX)](isancestor-mdx.md) | Returns whether a specified member is an ancestor of another specified member. |
| [IsEmpty (MDX)](isempty-mdx.md) | Returns whether the evaluated expression is the empty cell value. |
| [IsGeneration (MDX)](isgeneration-mdx.md) | Returns whether a specified member is in a specified generation. |
| [IsLeaf (MDX)](isleaf-mdx.md) | Returns whether a specified member is a leaf member. |
| [IsSibling (MDX)](issibling-mdx.md) | Returns whether a specified member is a sibling of another specified member. |
  
## Member Functions  
  
| Function | Description |
| --- | --- |
| [Ancestor (MDX)](ancestor-mdx.md) | Returns the ancestor of a member at a specified level or distance. |
| [ClosingPeriod (MDX)](closingperiod-mdx.md) | Returns the last sibling among the descendants of a member at a specified level. |
| [Cousin (MDX)](cousin-mdx.md) | Returns the child member with the same relative position under a parent member as the specified child member. |
| [CurrentMember (MDX)](currentmember-mdx.md) | Returns the current member along a specified dimension or hierarchy during iteration. |
| [DataMember (MDX)](datamember-mdx.md) | Returns the system-generated data member that is associated with a nonleaf member of a dimension. |
| [DefaultMember (MDX)](defaultmember-mdx.md) | Returns the default member of a dimension or hierarchy. |
| [FirstChild (MDX)](firstchild-mdx.md) | Returns the first child of a member. |
| [FirstSibling (MDX)](firstsibling-mdx.md) | Returns the first child of the parent of a member. |
| [Item (Member) (MDX)](item-member-mdx.md) | Returns a member from a specified tuple. |
| [Lag (MDX)](lag-mdx.md) | Returns the member that is a specified number of positions before a specified member along the member's dimension. |
| [LastChild (MDX)](lastchild-mdx.md) | Returns the last child of a specified member. |
| [LastSibling (MDX)](lastsibling-mdx.md) | Returns the last child of the parent of a specified member. |
| [Lead (MDX)](lead-mdx.md) | Returns the member that is a specified number of positions following a specified member along the member's dimension. |
| [LinkMember (MDX)](linkmember-mdx.md) | Returns the member equivalent to a specified member in a specified hierarchy. |
| [Members (String) (MDX)](members-string-mdx.md) | Returns a member specified by a string expression. |
| [NextMember (MDX)](nextmember-mdx.md) | Returns the next member in the level that contains a specified member. |
| [OpeningPeriod (MDX)](openingperiod-mdx.md) | Returns the first sibling among the descendants of a specified level, optionally at a specified member. |
| [ParallelPeriod (MDX)](parallelperiod-mdx.md) | Returns a member from a prior period in the same relative position as a specified member. |
| [Parent (MDX)](parent-mdx.md) | Returns the parent of a member. |
| [PrevMember (MDX)](prevmember-mdx.md) | Returns the previous member in the level that contains a specified member. |
| [StrToMember (MDX)](strtomember-mdx.md) | Returns the member specified by an MDX-formatted string. |
| [UnknownMember (MDX)](unknownmember-mdx.md) | Returns the unknown member associated with a level or member. |
| [ValidMeasure (MDX)](validmeasure-mdx.md) | Returns a valid measure in a virtual cube by forcing inapplicable dimensions to their top level. |
  
## Numeric Functions  
  
| Function | Description |
| --- | --- |
| [Aggregate (MDX)](aggregate-mdx.md) | Returns a scalar value calculated by aggregating either measures or an optionally specified numeric expression over the tuples of a specified set. |
| [Avg (MDX)](avg-mdx.md) | Returns the average value of measures or the average value of an optional numeric expression, evaluated over a specified set. |
| [CalculationCurrentPass (MDX)](calculationcurrentpass-mdx.md) | Returns the current calculation pass of a cube for the specified query context. |
| [CalculationPassValue (MDX)](calculationpassvalue-mdx.md) | Returns the value of a MDX expression evaluated over the specified calculation pass of a cube. |
| [CoalesceEmpty (MDX)](coalesceempty-mdx.md) | Coalesces an empty cell value to a number or string and returns the coalesced value. |
| [Correlation (MDX)](correlation-mdx.md) | Returns the correlation coefficient of two series evaluated over a set. |
| [Count (Dimension) (MDX)](count-dimension-mdx.md) | Returns the number of dimensions in a cube. |
| [Count (Hierarchy Levels) (MDX)](count-hierarchy-levels-mdx.md) | Returns the number of levels in a dimension or hierarchy. |
| [Count (Set) (MDX)](count-set-mdx.md) | Returns the number of cells in a set. |
| [Count (Tuple) (MDX)](count-tuple-mdx.md) | Returns the number of dimensions in a tuple. |
| [Covariance (MDX)](covariance-mdx.md) | Returns the population covariance of two series evaluated over a set, using the biased population formula. |
| [CovarianceN (MDX)](covariancen-mdx.md) | Returns the sample covariance of two series evaluated over a set, using the unbiased population formula. |
| [DistinctCount (MDX)](distinctcount-mdx.md) | Returns the number of distinct, nonempty tuples in a set. |
| [IIf (MDX)](iif-mdx.md) | Returns one of two values determined by a logical test. |
| [LinRegIntercept (MDX)](linregintercept-mdx.md) | Calculates the linear regression of a set and returns the value of the intercept in the regression line, y = ax + b. |
| [LinRegPoint (MDX)](linregpoint-mdx.md) | Calculates the linear regression of a set and returns the value of *y* in the regression line, y = ax + b. |
| [LinRegR2 (MDX)](linregr2-mdx.md) | Calculates the linear regression of a set and returns the coefficient of determination, R2. |
| [LinRegSlope (MDX)](linregslope-mdx.md) | Calculates the linear regression of a set, and returns the value of the slope in the regression line, y = ax + b. |
| [LinRegVariance (MDX)](linregvariance-mdx.md) | Calculates the linear regression of a set, and returns the variance associated with the regression line, y = ax + b. |
| [LookupCube (MDX)](lookupcube-mdx.md) | Returns the value of an MDX expression evaluated over another specified cube in the same database. |
| [Max (MDX)](max-mdx.md) | Returns the maximum value of a numeric expression that is evaluated over a set. |
| [Median (MDX)](median-mdx.md) | Returns the median value of a numeric expression that is evaluated over a set. |
| [Min (MDX)](min-mdx.md) | Returns the minimum value of a numeric expression that is evaluated over a set. |
| [Ordinal (MDX)](ordinal-mdx.md) | Returns the zero-based ordinal value associated with a level. |
| [Predict (MDX)](predict-mdx.md) | Returns a value of a numeric expression evaluated over a data mining model. |
| [Rank (MDX)](rank-mdx.md) | Returns the one-based rank of a specified tuple in a specified set. |
| [RollupChildren (MDX)](rollupchildren-mdx.md) | Returns a value generated by rolling up the values of the children of a specified member using the specified unary operator. |
| [Stddev (MDX)](stddev-mdx.md) | Alias for [Stdev (MDX)](stdev-mdx.md). |
| [StddevP (MDX)](stddevp-mdx.md) | Alias for [StdevP (MDX)](stdevp-mdx.md). |
| [Stdev (MDX)](stdev-mdx.md) | Returns the sample standard deviation of a numeric expression evaluated over a set, using the unbiased population formula. |
| [StdevP (MDX)](stdevp-mdx.md) | Returns the population standard deviation of a numeric expression evaluated over a set, using the biased population formula. |
| [StrToValue (MDX)](strtovalue-mdx.md) | Returns the value specified by an MDX-formatted string. |
| [Sum (MDX)](sum-mdx.md) | Returns the sum of a numeric expression evaluated over a set. |
| [Value (MDX)](value-mdx.md) | Returns the value of a measure. |
| [Var (MDX)](var-mdx.md) | Returns the sample variance of a numeric expression evaluated over a set, using the unbiased population formula. |
| [Variance (MDX)](variance-mdx.md) | Alias for [Var (MDX)](var-mdx.md). |
| [VarianceP (MDX)](variancep-mdx.md) | Alias for [VarP (MDX)](varp-mdx.md). |
| [VarP (MDX)](varp-mdx.md) | Returns the population variance of a numeric expression evaluated over a set, using the biased population formula. |
  
## Set Functions  
  
| Function | Description |
| --- | --- |
| [AddCalculatedMembers (MDX)](addcalculatedmembers-mdx.md) | Returns a set generated by adding calculated members to a specified set. |
| [AllMembers (MDX)](allmembers-mdx.md) | Returns a set that contains all members, including calculated members, of the specified dimension, hierarchy, or level. |
| [Ancestors (MDX)](ancestors-mdx.md) | Returns a set of all ancestors of a member at a specified level or distance. |
| [Ascendants (MDX)](ascendants-mdx.md) | Returns the set of the ascendants of a specified member, including the member itself. |
| [Axis (MDX)](axis-mdx.md) | Returns a set defined in an axis. |
| [BottomCount (MDX)](bottomcount-mdx.md) | Sorts a set in ascending order, and returns the specified number of tuples with the lowest values. |
| [BottomPercent (MDX)](bottompercent-mdx.md) | Sorts a set in ascending order, and returns a set of tuples with the lowest values whose cumulative total is equal to or less than a specified percentage. |
| [BottomSum (MDX)](bottomsum-mdx.md) | Sorts a set in ascending order, and returns a set of tuples with the lowest values whose total is equal to or less than a specified value. |
| [Children (MDX)](children-mdx.md) | Returns the children of a specified member. |
| [Crossjoin (MDX)](crossjoin-mdx.md) | Returns the cross product of one or more sets. |
| [CurrentOrdinal (MDX)](currentordinal-mdx.md) | Returns the current iteration number within a set during iteration. |
| [Descendants (MDX)](descendants-mdx.md) | Returns the set of descendants of a member at a specified level or distance, optionally including or excluding descendants in other levels. |
| [Distinct (MDX)](distinct-mdx.md) | Returns a set, removing duplicate tuples from a specified set. |
| [DrilldownLevel (MDX)](drilldownlevel-mdx.md) | Drills down the members of a set to one level below the lowest level represented in the set, or to one level below an optionally specified level of a member represented in the set. |
| [DrilldownLevelBottom (MDX)](drilldownlevelbottom-mdx.md) | Drills down the bottommost members of a set, at a specified level, to one level below. |
| [DrilldownLevelTop (MDX)](drilldownleveltop-mdx.md) | Drills down the topmost members of a set, at a specified level, to one level below. |
| [DrilldownMember (MDX)](drilldownmember-mdx.md) | Drills down the members in a specified set that are present in a second specified set. Alternatively, the function drills down on a set of tuples. |
| [DrilldownMemberBottom (MDX)](drilldownmemberbottom-mdx.md) | Drills down the members in a specified set that are present in a second specified set, limiting the result set to a specified number of members. Alternatively, this function also drills down on a set of tuples. |
| [DrilldownMemberTop (MDX)](drilldownmembertop-mdx.md) | Drills down the members in a specified set that are present in a second specified set, limiting the result set to a specified number of members. Alternatively, this function drills down on a set of tuples. |
| [DrillupLevel (MDX)](drilluplevel-mdx.md) | Drills up the members of a set that are below a specified level. |
| [DrillupMember (MDX)](drillupmember-mdx.md) | Drills up the members in a specified set that are present in a second specified set. |
| [Except (MDX)](except-mdx-function.md) | Finds the difference between two sets, optionally retaining duplicates. |
| [Exists (MDX)](exists-mdx.md) | Returns the set of members of one set that exist with one or more tuples of one or more other sets. |
| [Extract (MDX)](extract-mdx.md) | Returns a set of tuples from extracted dimension elements. |
| [Filter (MDX)](filter-mdx.md) | Returns the set that results from filtering a specified set based on a search condition. |
| [Generate (MDX)](generate-mdx.md) | Applies a set to each member of another set, and then joins the resulting sets by union. Alternatively, this function returns a concatenated string created by evaluating a string expression over a set. |
| [Head (MDX)](head-mdx.md) | Returns the first specified number of elements in a set, while retaining duplicates. |
| [Hierarchize (MDX)](hierarchize-mdx.md) | Orders the members of a set in a hierarchy. |
| [Intersect (MDX)](intersect-mdx.md) | Returns the intersection of two input sets, optionally retaining duplicates. |
| [LastPeriods (MDX)](lastperiods-mdx.md) | Returns a set of members up to and including a specified member. |
| [Members (Set) (MDX)](members-set-mdx.md) | Returns the set of members in a dimension, level, or hierarchy. |
| [Mtd (MDX)](mtd-mdx.md) | Returns a set of sibling members from the same level as a given member, starting with the first sibling and ending with the given member, as constrained by the Year level in the Time dimension. |
| [NameToSet (MDX)](nametoset-mdx.md) | Returns a set that contains the member specified by an MDX-formatted string. |
| [NonEmptyCrossjoin (MDX)](nonemptycrossjoin-mdx.md) | Returns the cross product of one or more sets as a set, excluding empty tuples and tuples without associated fact table data. |
| [Order (MDX)](order-mdx.md) | Arranges members of a specified set, optionally preserving or breaking the hierarchy. |
| [PeriodsToDate (MDX)](periodstodate-mdx.md) | Returns a set of sibling members from the same level as a given member, starting with the first sibling and ending with the given member, as constrained by a specified level in the Time dimension. |
| [Qtd (MDX)](qtd-mdx.md) | Returns a set of sibling members from the same level as a given member, starting with the first sibling and ending with the given member, as constrained by the *Quarter* level in the Time dimension. |
| [Siblings (MDX)](siblings-mdx.md) | Returns the siblings of a specified member, including the member itself. |
| [StripCalculatedMembers (MDX)](stripcalculatedmembers-mdx.md) | Returns a set generated by removing calculated members from a specified set. |
| [StrToSet (MDX)](strtoset-mdx.md) | Returns the set specified by an MDX-formatted string. |
| [Subset (MDX)](subset-mdx.md) | Returns a subset of tuples from a specified set. |
| [Tail (MDX)](tail-mdx.md) | Returns a subset from the end of a set. |
| [ToggleDrillState (MDX)](toggledrillstate-mdx.md) | Toggles the drill state of members. |
| [TopCount (MDX)](topcount-mdx.md) | Sorts a set in descending order and returns the specified number of elements with the highest values. |
| [TopPercent (MDX)](toppercent-mdx.md) | Sorts a set in descending order, and returns a set of tuples with the highest values whose cumulative total is equal to or less than a specified percentage. |
| [TopSum (MDX)](topsum-mdx.md) | Sorts a set and returns the topmost elements whose cumulative total is at least a specified value. |
| [Union  (MDX)](union-mdx.md) | Returns the union of two sets, optionally retaining duplicates. |
| [Unorder (MDX)](unorder-mdx.md) | Removes any enforced ordering from a specified set. |
| [VisualTotals (MDX)](visualtotals-mdx.md) | Returns a set generated by dynamically totaling child members in a specified set, optionally using a pattern for the name of the parent member in the resulting cellset. |
| [Wtd (MDX)](wtd-mdx.md) | Returns a set of sibling members from the same level as a given member, starting with the first sibling and ending with the given member, as constrained by the Week level in the Time dimension. |
| [Ytd (MDX)](ytd-mdx.md) | Returns a set of sibling members from the same level as a given member, starting with the first sibling and ending with the given member, as constrained by the *Year* level in the Time dimension. |
  
## String Functions  
  
| Function | Description |
| --- | --- |
| [CalculationPassValue (MDX)](calculationpassvalue-mdx.md) | Returns the value of an MDX expression evaluated over the specified calculation pass of a cube. |
| [CoalesceEmpty (MDX)](coalesceempty-mdx.md) | Coalesces an empty cell value to a number or string and returns the coalesced value. |
| [Generate (MDX)](generate-mdx.md) | Applies a set to each member of another set, and then joins the resulting sets by union. Alternatively, this function returns a concatenated string created by evaluating a string expression over a set. |
| [IIf (MDX)](iif-mdx.md) | Returns one of two values determined by a logical test. |
| [LookupCube (MDX)](lookupcube-mdx.md) | Returns the value of an MDX expression evaluated over another specified cube in the same database. |
| [MemberToStr (MDX)](membertostr-mdx.md) | Returns an MDX-formatted string that corresponds to a specified member. |
| [Name (MDX)](name-mdx.md) | Returns the name of a dimension, hierarchy, level, or member. |
| [Properties (MDX)](properties-mdx.md) | Returns a string, or a strongly-typed value, that contains a member property value. |
| [SetToStr (MDX)](settostr-mdx.md) | Returns an MDX-formatted string of that corresponds to a specified set. |
| [TupleToStr (MDX)](tupletostr-mdx.md) | Returns an MDX-formatted string that corresponds to specified tuple. |
| [UniqueName (MDX)](uniquename-mdx.md) | Returns the unique name of a specified dimension, hierarchy, level, or member. |
| [UserName (MDX)](username-mdx.md) | Returns the domain name and user name of the current connection. |
  
## Subcube Functions  
  
| Function | Description |
| --- | --- |
| [This (MDX)](this-mdx.md) | Returns the current subcube. |
| [Leaves (MDX)](leaves-mdx.md) | Returns the set of leaf members in the specified dimension, member, or tuple. |
  
## Tuple Functions  
  
| Function | Description |
| --- | --- |
| [Current (MDX)](current-mdx.md) | Returns the current tuple from a set during iteration. |
| [Item (Tuple) (MDX)](item-tuple-mdx.md) | Returns a tuple from a set. |
| [Root (MDX)](root-mdx.md) | Returns a tuple that consists of the **All** members from each attribute hierarchy in a cube, dimension, or tuple. |
| [StrToTuple (MDX)](strtotuple-mdx.md) | Returns the tuple specified by an MDX-formatted string. |
  
## Other Functions  
  
| Function | Description |
| --- | --- |
| [Error (MDX)](error-mdx.md) | Raises an error, optionally providing a specified error message. |
  
## Related content

- [MDX Language Reference (MDX)](mdx-language-reference-mdx.md)
