import { Express, Request, Response } from "express";
import authRoutes from './Authroutes'
import userRoutes from './UserRoutes'
import bookRoutes from './Bookroutes'

export function registerRoutes(app:Express){
    
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is running properly" });
});

    app.use("/auth", authRoutes);
    app.use("/users", userRoutes)
    app.use("/book", bookRoutes)
}

