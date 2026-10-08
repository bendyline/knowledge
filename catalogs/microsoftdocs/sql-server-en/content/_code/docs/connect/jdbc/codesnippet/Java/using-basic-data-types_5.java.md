# Source code: docs/connect/jdbc/codesnippet/Java/using-basic-data-types_5.java

Complete source file; linked examples may select a region or line range.

```
try(CallableStatement cstmt = con.prepareCall("{call employee_jobid(?)}");) {
    String lname = "Brown";
    cstmt.setString(1, lname);
    ResultSet rs = cstmt.executeQuery();
}

```
