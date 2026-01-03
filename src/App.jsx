  // frontend/src/App.jsx
  import { Routes, Route } from 'react-router-dom';
  import { Box } from '@mui/material';
  import Navbar from './components/Navbar';
  import Home from './pages/Home';
  import Search from './pages/Search';
  import Login from './pages/Login';
  import AdminDashboard from './pages/AdminDashboard';
  import AddMovie from './pages/AddMovie';
  import EditMovie from './pages/EditMovie';
  import ProtectedRoute from './components/ProtectedRoute';
  import MovieDetails from './pages/MovieDetails';

  function App() {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Box component="main" sx={{ pt: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-movie"
              element={
                <ProtectedRoute adminOnly>
                  <AddMovie />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-movie/:id"
              element={
                <ProtectedRoute adminOnly>
                  <EditMovie />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    );
  }

  export default App;




//   import { Routes, Route } from "react-router-dom";
// import { Box } from "@mui/material";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Search from "./pages/Search";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import AddMovie from "./pages/AddMovie";
// import EditMovie from "./pages/EditMovie";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//       <Navbar />
//       <Box component="main" sx={{ pt: 3 }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/login" element={<Login />} />

//           {/* Protected Admin Routes */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute adminOnly>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/add-movie"
//             element={
//               <ProtectedRoute adminOnly>
//                 <AddMovie />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/edit-movie/:id"
//             element={
//               <ProtectedRoute adminOnly>
//                 <EditMovie />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Box>
//     </Box>
//   );
// }

// export default App;
