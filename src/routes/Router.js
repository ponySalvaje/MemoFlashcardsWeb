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
import { createBrowserRouter } from "react-router-dom";
import Protected from "./Protected";
import MyProgress from "../pages/my-progress/MyProgress";
import Suspended from "../pages/suspended/Suspended";
import Profile from "../pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/specialties",
    element: <Specialties />,
  },
  {
    path: "/topics/:id",
    element: <Topics />,
  },
  {
    path: "/questionnaire/:id",
    element: (
      <Protected>
        <Questionnaire />
      </Protected>
    ),
  },
  {
    path: "/my-progress",
    element: <MyProgress />,
  },
  {
    path: "/suspended/:id",
    element: <Suspended />,
  },
  {
    path: "/find-cards",
    element: <FindCards />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
]);

export default router;
