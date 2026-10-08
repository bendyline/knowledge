# Source code: aspnetcore/fundamentals/openapi/samples/10.x/aspnet-openapi-xml/models/ProjectBoard.cs

Complete source file; linked examples may select a region or line range.

```
namespace Models;

/// <summary>
/// Represents a project board containing todos and related information.
/// </summary>
public class ProjectBoard
{
    /// <summary>
    /// Unique identifier for the project board.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// The name of the project board.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// A description of the project board and its purpose.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// The date when the project board was created.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// The collection of todos associated with this project board.
    /// </summary>
    public List<Todo> Todos { get; set; } = new();
}

```
