# Source code: docs/csharp/asynchronous-programming/snippets/async-return-types/async-returns1a.cs

Complete source file; linked examples may select a region or line range.

```
public class SecondExample
{
    public static async Task ShowTodaysInfoAsync()
    {
        // <StoreTask>
        var getLeisureHoursTask = GetLeisureHoursAsync();

        string message =
            $"Today is {DateTime.Today:D}\n" +
            "Today's hours of leisure: " +
            $"{await getLeisureHoursTask}";

        Console.WriteLine(message);
        // </StoreTask>
    }

    static async Task<int> GetLeisureHoursAsync()
    {
        DayOfWeek today = await Task.FromResult(DateTime.Now.DayOfWeek);

        int leisureHours =
            today is DayOfWeek.Saturday || today is DayOfWeek.Sunday
            ? 16 : 5;

        return leisureHours;
    }
}

```
