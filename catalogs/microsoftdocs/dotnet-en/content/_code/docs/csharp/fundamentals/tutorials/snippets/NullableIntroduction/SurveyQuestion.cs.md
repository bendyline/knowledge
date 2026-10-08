# Source code: docs/csharp/fundamentals/tutorials/snippets/NullableIntroduction/SurveyQuestion.cs

Complete source file; linked examples may select a region or line range.

```
namespace NullableIntroduction;

public enum QuestionType
{
    YesNo,
    Number,
    Text
}

public class SurveyQuestion(QuestionType typeOfQuestion, string text)
{
    public string QuestionText { get; } = text;
    public QuestionType TypeOfQuestion { get; } = typeOfQuestion;
}

```
