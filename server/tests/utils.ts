import database from "../src/database";

export async function initAndClearDatabase() {
  if (!database.isInitialized) {
    await database.initialize();
  }

  const entities_names = database.entityMetadatas.map(entity => '"' + entity.tableName + '"').join(", ");
  console.log("TRUNCATE " + entities_names + " CASCADE;");
  await database.query("TRUNCATE " + entities_names + " CASCADE;");
}
