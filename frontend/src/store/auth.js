import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../api/axios"; // reuse axios instance

export const useAuthStore = create(
  persist(
    (set, get) => ({
      access: null,
      refresh: null,
      user: null,
      // Store tokens
      setTokens: (access, refresh) => {
        set({ access, refresh });
        get().scheduleRefresh();
      },
      setAccess: (access) => set({ access }),
      setUser: (user) => set({ user }),

      // Logout clears everything
      logout: () => {
        set({ access: null, refresh: null, user: null });
        localStorage.removeItem("auth");
      },

      // 🔁 Refresh tokens
      refreshTokens: async () => {
        try {
          const { refresh } = get();
          if (!refresh) throw new Error("No refresh token");

          const { data } = await API.post("/auth/refresh/", { refresh });
          set({ access: data.access });
          if (data.user) set({ user: data.user });
          get().scheduleRefresh();
          return true;
        } catch (err) {
          console.error("Refresh failed:", err);
          get().logout();
          return false;
        }
      },

      // ⏱️ Background refresh (30s before expiry)
      scheduleRefresh: () => {
        const { access } = get();
        if (!access) return;

        // Decode JWT expiry
        const payload = JSON.parse(atob(access.split(".")[1]));
        const exp = payload.exp * 1000;
        const delay = exp - Date.now() - 30 * 1000; // refresh 30s early

        if (delay > 0) {
          setTimeout(() => {
            get().refreshTokens();
          }, delay);
        }
      },
    }),
    {
      name: "auth", // key in localStorage
      partialize: (state) => ({
        access: state.access,
        refresh: state.refresh,
        user: state.user,
      }),
    }
  )
);
