# Source code: samples/snippets/tsql/VS_Snippets_Data/dp l2e maptodbfunction/tsql/create_avgstudentgrade.sql

Complete source file; linked examples may select a region or line range.

```
--<snippet1>
USE [School]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[AvgStudentGrade](@studentId INT)
RETURNS DECIMAL(3,2)
AS
	BEGIN
	DECLARE @avg DECIMAL(3,2);
	SELECT @avg = avg(Grade) FROM StudentGrade WHERE StudentID = @studentId;

	RETURN @avg;
END
--</snippet1>
```
