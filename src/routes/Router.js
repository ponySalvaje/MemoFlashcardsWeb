import Home from "../pages/home/Home";
import Specialties from "../pages/specialties/Specialties";
import Topics from "../pages/topics/Topics";
import Questionnaire from "../pages/questionnaire/Questionnaire";
import FindCards from "../pages/find-cards/FindCards";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import HowItWorks from "../pages/how-it-works/HowItWorks";
import FAQ from "../pages/faq/FAQ";
import TermsAndConditions from "../pages/terms-and-conditions/TermsAndConditions";
import Protected from "./Protected";
import MyProgress from "../pages/my-progress/MyProgress";
import Suspended from "../pages/suspended/Suspended";
import Profile from "../pages/profile/Profile";
import PlansSection from "../sections/plans/PlansSection";
import Subscription from "../pages/subscription/Subscription";
import CulqiResult from "../components/culqi-result/CulqiResult";
import PageContainer from "./PageContainer";
import AdminSpecialties from "../pages/admin/specialties/AdminSpecialties";
import AdminTopics from "../pages/admin/topics/AdminTopics";
import AdminCards from "../pages/admin/cards/AdminCards";
import AdminSpecialtiesSave from "../pages/admin/specialties/AdminSpecialtiesSave";
import { createBrowserRouter } from "react-router-dom";
import AdminTopicsSave from "../pages/admin/topics/AdminTopicsSave";
import AdminCardsSave from "../pages/admin/cards/AdminCardsSave";
import AdminPageContainer from "./AdminPageContainer";
import AdminUsers from "../pages/admin/users/AdminUsers";
import AdminUsersSave from "../pages/admin/users/AdminUserSave";
import AdminProtected from "./AdminProtected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageContainer element={<Home />} />,
  },
  {
    path: "/home",
    element: <PageContainer element={<Home />} />,
  },
  {
    path: "/specialties",
    element: <PageContainer element={<Specialties />} />,
  },
  {
    path: "/plans",
    element: <PageContainer element={<PlansSection />} />,
  },
  {
    path: "/topics/:id",
    element: <PageContainer element={<Topics />} />,
  },
  {
    path: "/questionnaire/:id",
    element: (
      <Protected>
        <PageContainer element={<Questionnaire />} hideFooter={true} />
      </Protected>
    ),
  },
  {
    path: "/subscription/:id",
    element: (
      <Protected>
        <PageContainer element={<Subscription />} />
      </Protected>
    ),
  },
  {
    path: "/culqi-result",
    element: (
      <Protected>
        <PageContainer element={<CulqiResult />} />
      </Protected>
    ),
  },
  {
    path: "/my-progress",
    element: (
      <Protected>
        <PageContainer element={<MyProgress />} />
      </Protected>
    ),
  },
  {
    path: "/suspended/:id",
    element: <PageContainer element={<Suspended />} />,
  },
  {
    path: "/find-cards",
    element: <PageContainer element={<FindCards />} />,
  },
  {
    path: "/login",
    element: <PageContainer element={<Login />} />,
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <PageContainer element={<Profile />} />
      </Protected>
    ),
  },
  {
    path: "/register",
    element: <PageContainer element={<Register />} />,
  },
  {
    path: "/how-it-works",
    element: <PageContainer element={<HowItWorks />} />,
  },
  {
    path: "/faq",
    element: <PageContainer element={<FAQ />} />,
  },
  {
    path: "/terms-and-conditions",
    element: <PageContainer element={<TermsAndConditions />} />,
  },
  {
    path: "/admin/specialties",
    element: (
      <AdminProtected>
        <AdminPageContainer element={<AdminSpecialties />} />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/specialties/save/:id?",
    element: (
      <AdminProtected>
        <AdminPageContainer element={<AdminSpecialtiesSave />} />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/topics/:id",
    element: (
      <AdminProtected>
        <AdminPageContainer element={<AdminTopics />} />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/topics/save/:id?",
    element: (
      <AdminProtected>
        <AdminPageContainer element={<AdminTopicsSave />} />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/cards/:id",
    element: (
      <AdminProtected>
        <AdminPageContainer element={<AdminCards />} />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/cards/save/:id?",
    element: (
      <AdminProtected>
        <AdminPageContainer element={<AdminCardsSave />} />
      </AdminProtected>
    ),
  },
  {
    path: "admin/users",
    element: (
      <AdminProtected>
        <AdminPageContainer element={<AdminUsers />} />
      </AdminProtected>
    ),
  },
  {
    path: "admin/users/save/:id?",
    element: (
      <AdminProtected>
        <AdminPageContainer element={<AdminUsersSave />} />
      </AdminProtected>
    ),
  },
]);

export default router;
