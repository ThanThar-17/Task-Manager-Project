import express from 'express';
import cors from 'cors';

import authRoutes from './routers/auth.routes.js';
import taskRoutes from './routers/task.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
