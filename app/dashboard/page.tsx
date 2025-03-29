'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  // Aquí podrías agregar lógica de autenticación para proteger la ruta
  useEffect(() => {
    // Por ahora solo mostramos un mensaje de bienvenida
    console.log('Bienvenido al dashboard');
  }, []);

  return (
    <div className="min-h-screen bg-background-light p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-apple-green mb-6">
          Bienvenido a tu Dashboard
        </h1>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-text-secondary">
            Aquí podrás ver tu información de salud y gestionar tu diabetes tipo 1.
          </p>
        </div>
      </div>
    </div>
  );
} 