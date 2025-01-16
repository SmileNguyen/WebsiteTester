const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Tùy chọn (nếu bạn gặp lỗi SSL)
    },
});

// Hàm kiểm tra kết nối
const testConnection = async () => {
    try {
        await pool.connect();
        console.log("Kết nối thành công đến PostgreSQL!");
    } catch (err) {
        console.error("Lỗi kết nối PostgreSQL:", err);
    }
};

testConnection();

const Product = {
    getAll: async () => {
        const client = await pool.connect();
        try {
            const result = await client.query("SELECT * FROM Products");
            return result.rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            client.release();
        }
    },
    getById: async (id) => {
        const client = await pool.connect();
        try {
            const result = await client.query(
                "SELECT * FROM Products WHERE id = $1",
                [id],
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    },
    create: async (name, price, description) => {
        const client = await pool.connect();
        try {
            await client.query(
                "INSERT INTO Products (name, price, description) VALUES ($1, $2, $3)",
                [name, price, description],
            );
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    },
    update: async (id, name, price, description) => {
        const client = await pool.connect();
        try {
            await client.query(
                "UPDATE Products SET name = $1, price = $2, description = $3 WHERE id = $4",
                [name, price, description, id],
            );
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    },
    delete: async (id) => {
        const client = await pool.connect();
        try {
            await client.query("DELETE FROM Products WHERE id = $1", [id]);
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    },
};

module.exports = Product;
