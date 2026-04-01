import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FamilyOverview from './pages/FamilyOverview';
import ChildDashboard from './pages/ChildDashboard';
import ReportDetail from './pages/ReportDetail';
import LearningAction from './pages/LearningAction';
import DataUpload from './pages/DataUpload';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<FamilyOverview />} />
          <Route path="/child/:childId" element={<ChildDashboard />} />
          <Route path="/reports" element={<ReportDetail />} />
          <Route path="/actions" element={<LearningAction />} />
          <Route path="/upload" element={<DataUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
