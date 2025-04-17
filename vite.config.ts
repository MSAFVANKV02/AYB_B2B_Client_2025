// import path from "path"
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   optimizeDeps: {
//     include: ["framer-motion"], // Explicitly include framer-motion
//   },
// })
// =================================================================
// import path from "path";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   optimizeDeps: {
//     include: ["framer-motion"], // Explicitly include framer-motion
//   },
//   build: {
//     chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 KB
//     outDir: 'dist',
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           // Split React and React DOM into separate chunks
//           react: ["react", "react-dom"],
//           // Split large libraries into separate chunks
//           vendor: ["axios", "framer-motion", "lodash"], // Add any other large libraries here
//         },
//       },
//     },
//   },
// });
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          // pdfjs: ['pdfjs-dist/build/pdf.worker.min.js'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-*",
    ],
  },
});



// =================================================================
// import path from "path";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";

// export default defineConfig({
//   plugins: [
//     react(),
//     visualizer({
//       filename: "./dist/stats.html",
//       open: true,
//     }),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   optimizeDeps: {
//     include: ["framer-motion"], // Include specific dependencies to pre-bundle
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           // Split vendor libraries into separate chunks
//           if (id.includes("node_modules")) {
//             if (id.includes("react")) {
//               return "react"; // Separate React into its own chunk
//             }
//             if (id.includes("framer-motion")) {
//               return "framer-motion"; // Separate framer-motion
//             }
//             return "vendor"; // General vendor chunk
//           }
//         },
//       },
//     },
//   },
// });
