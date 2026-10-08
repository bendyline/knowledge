# Source code: docs/connect/jdbc/codesnippet/Java/using-an-sql-statement-w_1_1.java

Complete source file; linked examples may select a region or line range.

```
public static void executeStatement(Connection con) {
    try(PreparedStatement pstmt = con.prepareStatement("SELECT LastName, FirstName FROM Person.Contact WHERE LastName = ?");) {
        pstmt.setString(1, "Smith");
        ResultSet rs = pstmt.executeQuery();

        while (rs.next()) {
            System.out.println(rs.getString("LastName") + ", " + rs.getString("FirstName"));
        }
    }
    // Handle any errors that may have occurred.
    catch (SQLException e) {
        e.printStackTrace();
    }
}

```
