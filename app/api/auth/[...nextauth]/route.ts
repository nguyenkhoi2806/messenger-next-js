import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
