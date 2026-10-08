---
title: "Flowchart Workflows"
description: This article describes the Flowchart activity, which is typically used to implement non-sequential workflows in Workflow Foundation.
ms.date: "03/30/2017"
ms.assetid: b0a3475c-d22f-49eb-8912-973c960aebf5
---
# Flowchart Workflows

A flowchart is a well-known paradigm for designing programs. The Flowchart activity is typically used to implement non-sequential workflows, but can be used for sequential workflows if no `FlowDecision` nodes are used.

## Flowchart workflow structure

 A Flowchart activity is an activity that contains a collection of activities to be executed.  Flowcharts also contain flow control elements such as [System.Activities.Statements.FlowDecision](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowDecision) and [System.Activities.Statements.FlowSwitch`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowSwitch%601) that direct execution between contained activities based on the values of variables.

## Types of flow nodes

 Different types of elements are used depending on the type of flow control required when the element executes. Types of flowchart elements include:

- `FlowStep` - Models one step of execution in the flowchart.

- `FlowDecision` - Branches execution based on a Boolean condition, similar to [System.Activities.Statements.If](https://learn.microsoft.com/search/?terms=System.Activities.Statements.If).

- `FlowSwitch` – Branches execution based on an exclusive switch, similar to [System.Activities.Statements.Switch`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Switch%601).

Each link has an `Action` property that defines a [System.Activities.ActivityAction](https://learn.microsoft.com/search/?terms=System.Activities.ActivityAction) that can be used to execute child activities, and one or more `Next` properties that define which element or elements to execute when the current element finishes execution.

### Creating a basic activity sequence with a FlowStep node

To model a basic sequence in which two activities execute in turn, the `FlowStep` element is used. In the following example, two `FlowStep` elements are used to execute two activities in sequence.

```xml
<Flowchart>
  <FlowStep>
    <Assign DisplayName="Get Name">
      <Assign.To>
        <OutArgument x:TypeArguments="x:String">[result]</OutArgument>
      </Assign.To>
      <Assign.Value>
        <InArgument x:TypeArguments="x:String">["User"]</InArgument>
      </Assign.Value>
    </Assign>
    <FlowStep.Next>
      <FlowStep>
        <WriteLine Text="Hello, " & [result]/>
      </FlowStep>
    </FlowStep.Next>
  </FlowStep>
</Flowchart>
```

### Creating a conditional flowchart with a FlowDecision node

To model a conditional flow node in a flowchart workflow (that is, to create a link that functions as a traditional flowchart's decision symbol), a [System.Activities.Statements.FlowDecision](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowDecision) node is used. The [System.Activities.Statements.FlowDecision.Condition](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowDecision.Condition) property of the node is set to an expression that defines the condition, and the [System.Activities.Statements.FlowDecision.True*](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowDecision.True*) and [System.Activities.Statements.FlowDecision.False](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowDecision.False) properties are set to [System.Activities.Statements.FlowNode](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowNode) instances to be executed if the expression evaluates to `true` or `false`. The following example shows how to define a workflow that uses a [System.Activities.Statements.FlowDecision](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowDecision) node.

```xml
<Flowchart>
  <FlowStep>
    <Read Result="[s]"/>
    <FlowStep.Next>
      <FlowDecision>
        <IsEmpty Input="[s]" />
        <FlowDecision.True>
          <FlowStep>
            <Write Text="Empty"/>
          </FlowStep>
        </FlowDecision.True>
        <FlowDecision.False>
          <FlowStep>
            <Write Text="Non-Empty"/>
          </FlowStep>
        </FlowDecision.False>
      </FlowDecision>
    </FlowStep.Next>
  </FlowStep>
</Flowchart>
```

### Creating an exclusive switch with a FlowSwitch node

To model a flowchart in which one exclusive path is selected based on a matching value, the [System.Activities.Statements.FlowSwitch`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowSwitch%601) node is used. The [System.Activities.Statements.FlowSwitch`1.Expression](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowSwitch%601.Expression) property is set to a [System.Activities.Activity`1](https://learn.microsoft.com/search/?terms=System.Activities.Activity%601) with a type parameter of [System.Object](https://learn.microsoft.com/search/?terms=System.Object) that defines the value to match choices against. The [System.Activities.Statements.FlowSwitch`1.Cases](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowSwitch%601.Cases) property defines a dictionary of keys and [System.Activities.Statements.FlowNode](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowNode) objects to match against the conditional expression, and a set of [System.Activities.Statements.FlowNode](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowNode) objects that define how execution should flow if the given case matches the conditional expression. The [System.Activities.Statements.FlowSwitch`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowSwitch%601) also defines a [System.Activities.Statements.FlowSwitch`1.Default](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowSwitch%601.Default) property that defines how execution should flow if no cases match the condition expression. The following example demonstrates how to define a workflow that uses a [System.Activities.Statements.FlowSwitch`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.FlowSwitch%601) element.

```xml
<Flowchart>
  <FlowSwitch>
    <FlowStep x:Key="Red">
      <WriteRed/>
    </FlowStep>
    <FlowStep x:Key="Blue">
      <WriteBlue/>
    </FlowStep>
    <FlowStep x:Key="Green">
      <WriteGreen/>
    </FlowStep>
  </FlowSwitch>
</Flowchart>
```
