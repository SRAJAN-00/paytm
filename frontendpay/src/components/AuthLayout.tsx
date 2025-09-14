import React from "react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 mb-6 text-center">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
};
