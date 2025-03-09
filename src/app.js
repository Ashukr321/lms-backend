import express from "express";
import cors from "cors";
import envConfig from "./config/envConfig.js";
import path from "path";
import { fileURLToPath } from 'url';

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get("/", (req, res) => {
    // You can pass data to your EJS template here
    const pageData = {
        title: "LMS - Learning Management System",
        description: "Empower your learning journey with our comprehensive Learning Management System",
        features: [
            {
                icon: "fa-laptop-code",
                title: "Interactive Learning",
                description: "Engage with interactive content and real-time assessments to enhance your learning experience"
            },
            {
                icon: "fa-chart-line",
                title: "Progress Tracking",
                description: "Monitor your learning progress with detailed analytics and performance insights"
            },
            {
                icon: "fa-users",
                title: "Expert Support",
                description: "Get personalized help from experienced instructors and mentors whenever you need"
            }
        ]
    };
    
    res.render('index', pageData);
});

// Health check route
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running"
    });
});

const port = envConfig.port || 3000;

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}/`);
    console.log(`🔥 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 