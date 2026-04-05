import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FamilyOverview from './pages/FamilyOverview';
import ChildDashboard from './pages/ChildDashboard';
import ReportDetail from './pages/ReportDetail';
import LearningAction from './pages/LearningAction';
import DataUpload from './pages/DataUpload';
import ChildInsights from './pages/ChildInsights';
import ChildChat from './pages/ChildChat';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<FamilyOverview />} />
          <Route path="/child/:childId" element={<ChildDashboard />} />
          <Route path="/child/:childId/insights" element={<ChildInsights />} />
          <Route path="/reports" element={<ReportDetail />} />
          <Route path="/actions" element={<LearningAction />} />
          <Route path="/upload" element={<DataUpload />} />
        </Route>
        {/* Child Chat — standalone layout (no sidebar) */}
        <Route path="/chat/:childId" element={<ChildChat />} />
      </Routes>
    </BrowserRouter>
  );
}
