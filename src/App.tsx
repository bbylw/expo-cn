import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DocPage from './pages/DocPage';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs/:slug" element={<DocPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
