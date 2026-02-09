import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import QueryProvider from "./app/providers/QueryProvider";
import ThemeProvider from "./app/providers/ThemeProvider";
import MotionProvider from "./app/providers/MotionProvider";
import { AuthProvider } from "./auth/context/AuthProvider";

export default function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <QueryProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
