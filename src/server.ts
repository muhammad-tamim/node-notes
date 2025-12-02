import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString:
        "postgresql://neondb_owner:npg_im9BKnCTq3Wh@ep-withered-hill-a1myvxbl-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)`)
}
initDB()

// CREATE note
app.post("/notes", async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;

        const result = await pool.query(
            "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET all notes
app.get("/notes", async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET single note
app.get("/notes/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// PATCH note
app.patch("/notes/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        const result = await pool.query(
            "UPDATE notes SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *",
            [title, content, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// PUT note
app.put("/notes/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        const result = await pool.query(
            "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
            [title, content, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// DELETE note
app.delete("/notes/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        await pool.query("DELETE FROM notes WHERE id = $1", [id]);

        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ error });
    }
});


app.get("/", (req: Request, res: Response) => {
    res.send("PostgreSQL + TypeScript API is running!");
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Route not found",
        path: req.originalUrl,
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
