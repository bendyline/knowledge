### Some WorkFlow drag-and-drop APIs are obsolete

#### Details

This WorkFlow drag-and-drop API is obsolete and will cause compiler warnings if the app is rebuilt against 4.5.

#### Suggestion

New [System.Activities.Presentation.DragDropHelper](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.DragDropHelper) APIs that support operations with multiple objects should be used instead. Alternatively, the build warnings can be suppressed or they can be avoided by using an older compiler. The APIs are still supported.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Retargeting |

#### Affected APIs

- [System.Activities.Presentation.DragDropHelper.DoDragMove(System.Activities.Presentation.WorkflowViewElement,System.Windows.Point)](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.DragDropHelper.DoDragMove(System.Activities.Presentation.WorkflowViewElement%2CSystem.Windows.Point))
- [System.Activities.Presentation.DragDropHelper.GetCompositeView(System.Windows.DragEventArgs)](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.DragDropHelper.GetCompositeView(System.Windows.DragEventArgs))
- [System.Activities.Presentation.DragDropHelper.GetDraggedModelItem(System.Windows.DragEventArgs)](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.DragDropHelper.GetDraggedModelItem(System.Windows.DragEventArgs))
- [System.Activities.Presentation.DragDropHelper.GetDroppedObject(System.Windows.DependencyObject,System.Windows.DragEventArgs,System.Activities.Presentation.EditingContext)](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.DragDropHelper.GetDroppedObject(System.Windows.DependencyObject%2CSystem.Windows.DragEventArgs%2CSystem.Activities.Presentation.EditingContext))
