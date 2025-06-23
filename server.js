import express from 'express';
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.js';

const app = express();

app.use(cors({
  origin: "https://ishivaniyadav.github.io",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running. CORS is enabled.");
});

app.use('/api', chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
