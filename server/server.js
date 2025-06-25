import Fastify from "fastify";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import MongoStore from "connect-mongo";
import fastifyHelmet from "@fastify/helmet";
import cors from "@fastify/cors";

// Routes
import { auth } from "./routes/authRoutes.js";
import { agenda } from "./routes/agendaRoutes.js";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster.krnbot3.mongodb.net/agendeja?retryWrites=true&w=majority&appName=cluster`
  )
  .then(() => console.log("Mongoose conectado"))
  .catch((err) => console.error("Erro ao conectar com o MongoDB:", err));

await fastify.register(cors, {
  origin: "http://localhost:8080",
  credentials: true,
});
await fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
});
await fastify.register(fastifySession, {
  rolling: true,
  cookieName: 'sessionId',
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster.krnbot3.mongodb.net/session?retryWrites=true&w=majority&appName=cluster`,
    collectionName: "sessions",
  }),
  rolling: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    secure: false,
  },
  saveUninitialized: false,
  resave: false,
});

// Security
fastify.register(fastifyHelmet, {
  global: true,
  contentSecurityPolicy: false, // desative se estiver em dev e der erro com CSP
});

// Routes
fastify.register(auth, { prefix: "/autenticar" });
fastify.register(agenda, { prefix: "/agenda" });

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
