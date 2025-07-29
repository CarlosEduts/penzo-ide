"use client";
import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { getMyProjects } from "@/services/project";

// Página de demonstração e teste
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      await login(email, password);
      // router.push("/dashboard");
      const projects = await getMyProjects(); // Teste de requisição
      console.log(projects)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </>
  );
}
