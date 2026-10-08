# Source code: docs/csharp/programming-guide/classes-and-structs/snippets/properties/TimePeriod.cs

Complete source file; linked examples may select a region or line range.

```
namespace properties;

//<UsingExample>
public class Date
{
    private int _month = 7;  // Backing store

    public int Month
    {
        get => _month;
        set
        {
            if ((value > 0) && (value < 13))
            {
                _month = value;
            }
        }
    }
}
//</UsingExample>

//<FieldExample>
public class DateExample
{
    public int Month
    {
        get;
        set
        {
            if ((value > 0) && (value < 13))
            {
                field = value;
            }
        }
    }
}
//</FieldExample>

```
