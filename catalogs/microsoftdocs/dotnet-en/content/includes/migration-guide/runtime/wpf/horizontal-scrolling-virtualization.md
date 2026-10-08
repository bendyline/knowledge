### Horizontal scrolling and virtualization

#### Details

This change applies to an [System.Windows.Controls.ItemsControl](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ItemsControl) that does its own virtualization in the direction orthogonal to the main scrolling direction (the chief example is [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid) with EnableColumnVirtualization=&quot;True&quot;).  The outcome of certain horizontal scrolling operations has been changed to produce results that are more intuitive and more analogous to the results of comparable vertical operations.

The operations include &quot;Scroll Here&quot; and &quot;Right Edge&quot;, to use the names from the menu obtained by right-clicking a horizontal scrollbar.  Both of these compute a candidate offset and call [System.Windows.Controls.Primitives.IScrollInfo.SetHorizontalOffset(System.Double)](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo.SetHorizontalOffset(System.Double)).

After scrolling to the new offset, the notion of &quot;here&quot; or &quot;right edge&quot; may have changed because newly de-virtualized content has changed the value of [System.Windows.Controls.Primitives.IScrollInfo.ExtentWidth](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo.ExtentWidth).

Prior to .NET Framework 4.6.2, the scroll operation simply uses the candidate offset, even though it may not be &quot;here&quot; or at the &quot;right edge&quot; any more.  This results in effects like &quot;bouncing&quot; the scroll thumb, best illustrated by example. Suppose a [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid) has ExtentWidth=1000 and Width=200.  A scroll to &quot;Right Edge&quot; uses candidate offset 1000 - 200 = 800.  While scrolling to that offset, new columns are de- virtualized; let's suppose they are very wide, so that the [System.Windows.Controls.Primitives.IScrollInfo.ExtentWidth](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo.ExtentWidth) changes to 2000.  The scroll ends with HorizontalOffset=800, and the thumb &quot;bounces&quot; back to near the middle of the scrollbar - precisely at 800/2000 = 40%.

The change is to recompute a new candidate offset when this situation occurs, and try again. (This is how vertical scrolling works already.)

The change produces a more predictable and intuitive experience for the end user, but it could also affect any app that depends on the exact value of [System.Windows.Controls.Primitives.IScrollInfo.HorizontalOffset](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo.HorizontalOffset) after a horizontal scroll, whether invoked by the end user or by an explicit call to [System.Windows.Controls.Primitives.IScrollInfo.SetHorizontalOffset(System.Double)](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo.SetHorizontalOffset(System.Double)).

#### Suggestion

An app that uses a predicted value for [System.Windows.Controls.Primitives.IScrollInfo.HorizontalOffset](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo.HorizontalOffset) should be changed to fetch the actual value (and the value of [System.Windows.Controls.Primitives.IScrollInfo.ExtentWidth](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo.ExtentWidth)) after any horizontal scroll that could change [System.Windows.Controls.Primitives.IScrollInfo.ExtentWidth](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo.ExtentWidth) due to de-virtualization.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.2 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Controls.Primitives.IScrollInfo](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.IScrollInfo)

<!--

#### Affected APIs

- `T:System.Windows.Controls.Primitives.IScrollInfo`

-->
