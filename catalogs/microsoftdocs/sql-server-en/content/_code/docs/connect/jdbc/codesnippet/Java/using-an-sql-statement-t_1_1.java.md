# Source code: docs/connect/jdbc/codesnippet/Java/using-an-sql-statement-t_1_1.java

Complete source file; linked examples may select a region or line range.

```
public static void executeUpdateStatement(Connection con) {
    try(Statement stmt = con.createStatement();) {
        String SQL = "INSERT INTO TestTable (Col2, Col3) VALUES ('a', 10)";
        int count = stmt.executeUpdate(SQL);
        System.out.println("ROWS AFFECTED: " + count);
    }
    // Handle any errors that may have occurred.
    catch (SQLException e) {
        e.printStackTrace();
    }
}

```
