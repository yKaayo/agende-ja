import Fastify from "fastify";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import MongoStore from "connect-mongo";
import fastifyHelmet from "@fastify/helmet";

// Routes
import { auth } from "./routes/authRoutes.js";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster.krnbot3.mongodb.net/?retryWrites=true&w=majority&appName=cluster`
);

// Cookie
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster.krnbot3.mongodb.net/?retryWrites=true&w=majority&appName=cluster`,
  }),
  saveUninitialized: false,
  resave: false,
  rolling: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: false,
  },
});

// Security
fastify.register(fastifyHelmet, {
  global: true,
  contentSecurityPolicy: false, // desative se estiver em dev e der erro com CSP
});

// Routes
fastify.register(auth, { prefix: "/autenticar" });

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
