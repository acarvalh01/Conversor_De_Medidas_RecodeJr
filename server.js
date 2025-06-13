import express from 'express'
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

// ROTA POST DE USUÁRIOS
app.post('/users', async (req, res) => {
  try {
    // TRANSFORMAR SENHA EM HASH
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
      }
    });

    // REMOVER HASH DE SENHA DA RESPOSTA
    const { password, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// ROTA GET DE USUÁRIOS
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  });

  res.json(users);
});

// ROTA DE LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// MIDDLEWARE DE AITENTICAÇÃO
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // BEARER TOKEN

  if (!token) return res.status(401).json({ message: 'Token ausente' });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.userId = payload.userId;
    next();
  });
}

// ROTA POST PARA HISTÓRICO
app.post('/history', authenticateToken, async (req, res) => {
  const { action, details } = req.body;

  try {
    const newHistory = await prisma.history.create({
      data: {
        userId: req.userId,
        action,
        details,
      }
    });
    res.status(201).json(newHistory);
  } catch (error) {
    console.error("Erro ao salvar histórico:", error);
    res.status(500).json({ message: 'Erro ao salvar histórico' });
  }
});

// ROTA GET PARA HISTÓRICO
app.get('/history', authenticateToken, async (req, res) => {
  try {
    const history = await prisma.history.findMany({
      where: { userId: req.userId },
      orderBy: { timestamp: 'desc' },
    });

    res.json(history);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    res.status(500).json({ message: 'Erro ao buscar histórico' });
  }
});



// ROTA PROTEGIDA
app.get('/profile', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true }
  });

  res.json(user);
});


app.listen(3000)

/*
comandos utilizados

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

npm init -y

node --watch server.js
*/