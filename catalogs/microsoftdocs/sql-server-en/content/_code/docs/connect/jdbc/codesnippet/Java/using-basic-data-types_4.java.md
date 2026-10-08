# Source code: docs/connect/jdbc/codesnippet/Java/using-basic-data-types_4.java

Complete source file; linked examples may select a region or line range.

```
try(PreparedStatement pstmt = con.prepareStatement("UPDATE employee SET fname = ? WHERE (lname = 'Brown')");) {
    String name = "Bob";
    pstmt.setString(1, name);
    int rowCount = pstmt.executeUpdate();
}

```
