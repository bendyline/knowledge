# Source code: docs/connect/jdbc/codesnippet/Java/using-savepoints_1.java

Complete source file; linked examples may select a region or line range.

```
public static void executeTransaction(Connection con) {
    try(Statement stmt = con.createStatement();) {
        con.setAutoCommit(false);
        stmt.executeUpdate("INSERT INTO Production.ScrapReason(Name) VALUES('Correct width')");
        Savepoint save = con.setSavepoint();
        stmt.executeUpdate("INSERT INTO Production.ScrapReason(Name) VALUES('Wrong width')");
        con.rollback(save);
        con.commit();
        System.out.println("Transaction succeeded.");
    }
    catch (SQLException ex) {
        ex.printStackTrace();
        try {
            System.out.println("Transaction failed.");
            con.rollback();
        }
        catch (SQLException se) {
            se.printStackTrace();
        }
    }
}

```
