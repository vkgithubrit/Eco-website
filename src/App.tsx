// import React, { Suspense, lazy } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { Loader2 } from "lucide-react";
// import Navbar from "./components/Navbar";
// import { useAuthStore } from "./store/authStore";
// import Footer from "./pages/Footer";

// const Home = lazy(() => import("./pages/Home"));
// const Login = lazy(() => import("./pages/Login"));
// const ProductDetails = lazy(() => import("./pages/ProductDetails"));
// const Cart = lazy(() => import("./pages/Cart"));

// const PageTransition = ({ children }: { children: React.ReactNode }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: -20 }}
//     transition={{ duration: 0.3 }}
//   >
//     {children}
//   </motion.div>
// );

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const location = useLocation();

//   if (!isAuthenticated) {
//     // Redirect them to the /login page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// };

// const AnimatedRoutes = () => {
//   const location = useLocation();
//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route
//           path="/login"
//           element={
//             <PageTransition>
//               <Login />
//             </PageTransition>
//           }
//         />

//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <PageTransition>
//                 <Home />
//               </PageTransition>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute>
//               <PageTransition>
//                 <ProductDetails />
//               </PageTransition>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <PageTransition>
//                 <Cart />
//               </PageTransition>
//             </ProtectedRoute>
//           }
//         />

//         {/* Fallback route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </AnimatePresence>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col bg-gray-50">
//         <Navbar />
//         <main className="grow">
//           <Suspense
//             fallback={
//               <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
//                 <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
//                 <p className="text-gray-600 font-medium">Loading page...</p>
//               </div>
//             }
//           >
//             <AnimatedRoutes />
//           </Suspense>
//         </main>
//         <Footer/>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";
import Footer from "./pages/Footer";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile")); // Added

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Home />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ProductDetails />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Cart />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        {/* Added Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Profile />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className="grow">
          <Suspense
            fallback={
              <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium">
                  Loading page...
                </p>
              </div>
            }
          >
            <AnimatedRoutes />
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;