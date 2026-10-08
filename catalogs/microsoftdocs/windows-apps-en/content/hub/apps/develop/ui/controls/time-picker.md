---
description: The time picker gives you a standardized way to let users pick a time value using touch, mouse, or keyboard input.
title: Time picker
ms.assetid: 5124ecda-09e6-449e-9d4a-d969dca46aa3
label: Time picker
template: detail.hbs
ms.date: 02/26/2025
ms.topic: how-to
keywords: windows 10, uwp
pm-contact: kisai
design-contact: ksulliv
dev-contact: joyate
doc-status: Published
ms.localizationpriority: medium
---
# Time picker

The time picker gives you a standardized way to let users pick a time value using touch, mouse, or keyboard input.

Example of time picker

## Is this the right control?

Use a time picker to let a user pick a single time value.

For more info about choosing the right control, see the [Date and time controls](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/date-and-time.md) article.

## Examples

The entry point displays the chosen time, and when the user selects the entry point, a picker surface expands vertically from the middle for the user to make a selection. The time picker overlays other UI; it doesn't push other UI out of the way.

Example of the time picker expanding

## Create a time picker

> 
>
> - **Important APIs:** [TimePicker class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.UI.Xaml.Controls.TimePicker), [SelectedTime property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.selectedtime)

> 
> [Open the WinUI 3 Gallery app and see the TimePicker in action](winui3gallery://item/TimePicker)

> <table>
<tbody><tr>
<td>WinUI 3 Gallery icon</td>
<td>The <strong>WinUI 3 Gallery</strong> app includes interactive examples of WinUI controls and features. Get the app from the <a href="https://apps.microsoft.com/detail/9P3JFPWWDZRC">Microsoft Store</a> or browse the source code on <a href="https://github.com/microsoft/WinUI-Gallery">GitHub</a>.</td>
</tr>
</tbody>

This example shows how to create a simple time picker with a header.

```xaml
<TimePicker x:Name="arrivalTimePicker" Header="Arrival time"/>
```

```csharp
TimePicker arrivalTimePicker = new TimePicker();
arrivalTimePicker.Header = "Arrival time";
```

The resulting time picker looks like this:

Example of time picker

### Formatting the time picker

By default, the time picker shows a 12-hour clock with an AM/PM selector. You can set the [ClockIdentifier](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.clockidentifier) property to "24HourClock" to show a 24-hour clock instead.

```xaml
<TimePicker Header="24HourClock" SelectedTime="18:21" ClockIdentifier="24HourClock"/>
```

A time picker 24 hour clock.

You can set the [MinuteIncrement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.minuteincrement) property to indicate the time increments shown in the minute picker. For example, 15 specifies that the `TimePicker` minute control displays only the choices 00, 15, 30, 45.

```xaml
<TimePicker MinuteIncrement="15"/>
```

A time picker showing 15 minute increments.

### Time values

The time picker control has both [Time](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.time)/[TimeChanged](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.timechanged) and [SelectedTime](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.selectedtime)/[SelectedTimeChanged](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.selectedtimechanged) APIs. The difference between these is that `Time` is not nullable, while `SelectedTime` is nullable.

The value of `SelectedTime` is used to populate the time picker and is `null` by default. If `SelectedTime` is `null`, the `Time` property is set to a [TimeSpan](https://learn.microsoft.com/dotnet/api/system.timespan?view=dotnet-uwp-10.0\&preserve-view=true) of 0; otherwise, the `Time` value is synchronized with the `SelectedTime` value. When `SelectedTime` is `null`, the picker is 'unset' and shows the field names instead of a time.

A time picker with no time selected.

#### Initializing a time value

In code, you can initialize the time properties to a value of type `TimeSpan`:

```csharp
TimePicker timePicker = new TimePicker
{
    SelectedTime = new TimeSpan(14, 15, 00) // Seconds are ignored.
};
```

You can set the time value as an attribute in XAML. This is probably easiest if you're already declaring the `TimePicker` object in XAML and aren't using bindings for the time value. Use a string in the form *Hh:Mm* where *Hh* is hours and can be between 0 and 23 and *Mm* is minutes and can be between 0 and 59.

```xaml
<TimePicker SelectedTime="14:15"/>
```

> **Note:**
> For important info about date and time values, see [DateTime and Calendar values](date-and-time.md#datetime-and-calendar-values) in the *Date and time controls* article.

### Using the time values

To use the time value in your app, you typically use a data binding to the [SelectedTime](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.selectedtime) or [Time](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.time) property, use the time properties directly in your code, or handle the [SelectedTimeChanged](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.selectedtimechanged) or [TimeChanged](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.timechanged) event.

> For an example of using a `DatePicker` and `TimePicker` together to update a single `DateTime` value, see [Calendar, date, and time controls - Use a date picker and time picker together](date-and-time.md#use-a-date-picker-and-time-picker-together).

Here, the `SelectedTime` property is used to compare the selected time to the current time.

Notice that because the `SelectedTime` property is nullable, you have to explicitly cast it to `DateTime`, like this: `DateTime myTime = (DateTime)(DateTime.Today + checkTimePicker.SelectedTime);`. The `Time` property, however, could be used without a cast, like this: `DateTime myTime = DateTime.Today + checkTimePicker.Time;`.

A time picker, button, and text label.

```xaml
<StackPanel>
    <TimePicker x:Name="checkTimePicker"/>
    <Button Content="Check time" Click="{x:Bind CheckTime}"/>
    <TextBlock x:Name="resultText"/>
</StackPanel>
```

```csharp
private void CheckTime()
{
    // Using the Time property.
    // DateTime myTime = DateTime.Today + checkTimePicker.Time;
    // Using the SelectedTime property (nullable requires cast to DateTime).
    DateTime myTime = (DateTime)(DateTime.Today + checkTimePicker.SelectedTime);
    if (DateTime.Now >= myTime)
    {
        resultText.Text = "Your selected time has already past.";
    }
    else
    {
        string hrs = (myTime - DateTime.Now).Hours.ToString();
        string mins = (myTime - DateTime.Now).Minutes.ToString();
        resultText.Text = string.Format("Your selected time is {0} hours, {1} minutes from now.", hrs, mins);
    }
}
```

## Related topics

- [Date and time controls](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/date-and-time.md)
- [Calendar date picker](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/calendar-date-picker.md)
- [Calendar view](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/calendar-view.md)
- [Date picker](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/date-picker.md)
