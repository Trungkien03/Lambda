import Class from "@app/stores/models/Class.model";
import SQLite from "react-native-sqlite-storage";

class Database {
  private static instance: Database; // Singleton instance
  private db: SQLite.SQLiteDatabase;

  private constructor() {
    this.db = SQLite.openDatabase(
      {
        name: "CartDB",
        location: "default",
      },
      () => {
        console.log("Database opened");
        this.initializeCartTable();
      },
      (err) => {
        console.error("Error opening database:", err);
      },
    );
  }

  // Singleton getInstance method
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Initialize the cart table
  private initializeCartTable() {
    this.db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS cart (
          id TEXT PRIMARY KEY,
          title TEXT,
          description TEXT,
          image_url TEXT,
          price REAL,
          date TEXT,
          time TEXT,
          capacity INTEGER,
          class_type_id TEXT
        )`,
        [],
        () => {
          console.log("Cart table initialized");
        },
        (err) => {
          console.error("Error initializing cart table:", err);
        },
      );
    });
  }

  // Add a class to the cart
  public addToCart(classItem: Class): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn) => {
        txn.executeSql(
          `SELECT id FROM cart WHERE id = ?`,
          [classItem.id],
          (_, result) => {
            if (result.rows.length > 0) {
              console.log(`Class ${classItem.id} is already in the cart`);
              resolve(false); // Return false if the class is already in the cart
            } else {
              txn.executeSql(
                `INSERT INTO cart (id, title, description, image_url, price, date, time, capacity, class_type_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  classItem.id,
                  classItem.title,
                  classItem.description,
                  classItem.image_url,
                  classItem.price,
                  classItem.date,
                  classItem.time,
                  classItem.capacity,
                  classItem.class_type_id,
                ],
                () => {
                  console.log(`Class ${classItem.id} added to cart`);
                  resolve(true);
                },
                (err) => {
                  console.error("Error adding to cart:", err);
                  reject(err);
                },
              );
            }
          },
          (err) => {
            console.error("Error checking cart:", err);
            reject(err);
          },
        );
      });
    });
  }

  // Get the list of cart items
  public getCart(): Promise<Class[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn) => {
        txn.executeSql(
          `SELECT * FROM cart`,
          [],
          (_, result) => {
            const rows = result.rows;
            const cartItems: Class[] = [];
            for (let i = 0; i < rows.length; i++) {
              cartItems.push(rows.item(i));
            }
            resolve(cartItems);
          },
          (err) => {
            console.error("Error fetching cart items:", err);
            reject(err);
          },
        );
      });
    });
  }

  // Delete a class from the cart
  public deleteFromCart(classId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn) => {
        txn.executeSql(
          `DELETE FROM cart WHERE id = ?`,
          [classId],
          () => {
            console.log(`Class ${classId} deleted from cart`);
            resolve();
          },
          (err) => {
            console.error("Error deleting from cart:", err);
            reject(err);
          },
        );
      });
    });
  }

  // Delete multiple classes from the cart based on a list of IDs
  public deleteMultipleFromCart(classIds: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (classIds.length === 0) {
        console.log("No IDs provided for deletion.");
        resolve();
        return;
      }

      const placeholders = classIds.map(() => "?").join(", ");
      this.db.transaction((txn) => {
        txn.executeSql(
          `DELETE FROM cart WHERE id IN (${placeholders})`,
          classIds,
          () => {
            console.log(
              `Classes with IDs [${classIds.join(", ")}] deleted from cart`,
            );
            resolve();
          },
          (err) => {
            console.error("Error deleting multiple items from cart:", err);
            reject(err);
          },
        );
      });
    });
  }
}

export default Database;
