---
description: "Learn more about: State Machine Activities in WF"
title: "State Machine Activities in WF"
ms.date: "03/30/2017"
ms.assetid: 93312eaf-07e0-4a55-b4f7-4cdbbc4dee2d
---
# State Machine Activities in WF

.NET Framework 4.5 provides several system-provided activities and activity designers for creating state machine workflows.  
  
| Activity type | Description |
| --- | --- |
| [System.Activities.Statements.StateMachine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.StateMachine) | Executes contained activities using the familiar state machine paradigm. |
| [System.Activities.Statements.State](https://learn.microsoft.com/search/?terms=System.Activities.Statements.State) | Represents a state in a state machine. |
| [System.Activities.Core.Presentation.FinalState](https://learn.microsoft.com/search/?terms=System.Activities.Core.Presentation.FinalState) | Represents a terminating state in a state machine. [System.Activities.Core.Presentation.FinalState](https://learn.microsoft.com/search/?terms=System.Activities.Core.Presentation.FinalState) is an activity designer that when used creates a [System.Activities.Statements.State](https://learn.microsoft.com/search/?terms=System.Activities.Statements.State) preconfigured as a terminating state. For more information, see [FinalState Activity Designer](https://learn.microsoft.com/visualstudio/workflow-designer/finalstate-activity-designer). |
| [System.Activities.Statements.Transition](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Transition) | Represents the transition between two states. There is no **Toolbox** item for [System.Activities.Statements.Transition](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Transition); transitions are created on the workflow designer by dragging and dropping a line between two states, or by dropping a state on the triangles that appear when one state is hovered over another. For more information, see [Transition Activity Designer](https://learn.microsoft.com/visualstudio/workflow-designer/transition-activity-designer). |
  
## See also

- [Getting Started Tutorial](getting-started-tutorial.md)
