import { openDB } from "idb";

// Initialize the IndexedDB database
const initdb = async () =>
  openDB("jate", 1, {
    // Upgrade function to handle database upgrades
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        // Check if the database already exists
        console.log("jate database already exists");
        return;
      }
      // Create an object store named "jate" with auto-incrementing keys
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  // Open the "jate" database
  const jateDB = await openDB("jate", "1");

  // Start a new read-write transaction
  const tx = jateDB.transaction("jate", "readwrite");

  // Get the object store
  const store = tx.objectStore("jate");

  // Put the content into the object store
  const request = store.put({ id: 1, value: content });

  // Wait for the operation to complete
  const result = await request;
  console.log("data saved to database!");
};

// Method to retrieve all content from the database
export const getDb = async () => {
  // Open the "jate" database
  const jateDB = await openDB("jate", "1");

  // Start a new read-only transaction
  const tx = jateDB.transaction("jate", "readonly");

  // Get the object store
  const store = tx.objectStore("jate");

  // Get all the content from the object store
  const request = store.getAll();

  // Wait for the operation to complete
  const result = await request;
  console.log("data read from database!");
  return result.value;
};

// Initialize the database when the module is imported
initdb();
