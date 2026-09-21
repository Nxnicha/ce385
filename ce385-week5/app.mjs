import express from "express";

const app = express();
app.use(express.json());

const TODOS = [
  { id: "1", title: "อ่านสไลด์สัปดาห์ที่ 5", done: false, priority: "high" },
  { id: "2", title: "ติดตั้ง Express", done: false, priority: "medium" },
  { id: "3", title: "ทำ WorkShop 4", done: true, priority: "low" },
  { id: "4", title: "เตรียมสอบกลางภาค", done: true, priority: "low" }
];

const PRIORITIES = ["high", "normal", "low"];

function validateTodo(req, res, next) {
  const { title, priority } = req.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "ต้องมี title เป็นข้อความ" });
  }
  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: "priority ไม่ถูกต้อง" });
  }
  return next();
}

const todoRouter = express.Router();

todoRouter.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

todoRouter.get("/", (req, res) => {
  res.json(TODOS.map((t) => ({ ...t })));
});

const handleCreateTodo = (req, res) => {
  const created = {
    id: String(TODOS.length + 1),
    title: req.body.title,
    done: false,
    priority: req.body.priority ?? "normal",
  };
  TODOS.push(created);
  res.status(201).json({ ...created });
};

todoRouter.post("/", validateTodo, handleCreateTodo);
todoRouter.post("/todos", validateTodo, handleCreateTodo);

todoRouter.get("/:id", (req, res) => {
  const todo = TODOS.find((t) => t.id === req.params.id);

  if (!todo) {
    return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
  }

  return res.json({ ...todo });
});

app.use("/api/v1/todos", todoRouter);

app.listen(3000, () => {
  console.log("เซิร์ฟเวอร์ทำงานที่ http://localhost:3000");
});