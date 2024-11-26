import Country from "./pages/country";
import District from "./pages/district";
import Facility from "./pages/facility";
import Province from "./pages/province";
import Team from "./pages/team";
import Member from "./pages/member";
import Priority from "./pages/priority";
import Module from "./pages/module";
import Project from "./pages/project";
import UserBySystem from "./pages/project/user-by-project";
import Role from "./pages/role";
import ModuleByRole from "./pages/role/module-by-role";
import PrivateRouter from "./router/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login/Login";
import ForgotPass from "./pages/forgot-password";
import RecoveryAdmin from "./pages/admin-recovery";
import NotPermit from "./pages/not-permit/NotPermit";
import NotFound from "./pages/not-found/NotFound";
import Tickets from "./pages/tickets";
import User from "./pages/user";
import UserCreate from "./pages/user/user-create";
import SingleUserView from "./pages/user/user-single-view/SingleUserView";
import TicketSigleView from "./pages/tickets/single-ticket-view";
import UserEditForm from "./pages/user/user-edit/UserEditForm";
import CreateTicket from "./pages/tickets/create-ticket/agent";
import TicketCreationForClient from "./pages/tickets/create-ticket/client-ticket-creation";
import TicketCreationForManger from "./pages/tickets/create-ticket/manager";
import TicketCreationForExperts from "./pages/tickets/create-ticket/experts";
import SystemPermission from "./pages/system-permission/system";
import SystemByRole from "./pages/project/project-by-user";
import ModulePermission from "./pages/module/module-permission";
import MemberPermission from "./pages/member/member-permission";
import TicketEditForCallCenter from "./pages/tickets/edit-ticket/call-center-agent";
import TicketEditForClient from "./pages/tickets/edit-ticket/client";
import TicektEditForManger from "./pages/tickets/edit-ticket/manager";
import TicketEditForExpert from "./pages/tickets/edit-ticket/expert";
import TicketEditForAdmin from "./pages/tickets/edit-ticket/admin";
import SearchIndex from "./pages/tickets/search-index";
import FirstLevelCategory from "./pages/incident-category/first-level";
import SecondLevelCategory from "./pages/incident-category/second-level";
import ThirdLevelCategory from "./pages/incident-category/third-level";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserFromLocal } from "./pages/login/store";
import { getModuleFromLoacl } from "./pages/module/store";
import RuleByModule from "./pages/module/role-by-module";
import AttachmentContext from "./context/AttachMent";

function App() {
  const [attacehMent, setAttacehMent] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModuleFromLoacl());
    dispatch(getUserFromLocal());
  }, [dispatch]);

  return (
    <AttachmentContext.Provider value={{ attacehMent, setAttacehMent }}>
      <Routes>
        {/* login */}
        <Route path={process.env.PUBLIC_URL + "/login"} element={<Login />} />

        {/* forgot password */}
        <Route
          path={process.env.PUBLIC_URL + "/forgot-password"}
          element={<ForgotPass />}
        />
        {/* user view page */}
        <Route path="user/view/:id" element={<SingleUserView />} />

        {/* Not permit page */}
        <Route path="/notpermit" element={<NotPermit />} />

        {/* Home */}
        <Route path="/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="" element={<Home />} />
        </Route>

        {/** ===================== >>>>>> config geography <<< ============**/}
        {/* Country */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="g/country" element={<Country />} />
        </Route>

        {/* District */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="g/district" element={<District />} />
        </Route>

        {/* Facility */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="g/facility" element={<Facility />} />
        </Route>

        {/* Province */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="g/province" element={<Province />} />
        </Route>

        {/**==================>>>>> config  advance <<< ================== **/}
        {/* Team */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/team" element={<Team />} />
        </Route>

        {/* Member */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/team/:id/member" element={<Member />} />
        </Route>
        {/* Role */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/role" element={<Role />} />
        </Route>

        {/* Module by role */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/role/:id/module" element={<ModuleByRole />} />
        </Route>

        {/* system by role */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/project/role/:id" element={<SystemByRole />} />
        </Route>

        {/* category */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/category" element={<FirstLevelCategory />} />
        </Route>

        {/* second level incident category */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/subcategory" element={<SecondLevelCategory />} />
        </Route>

        {/* second level incident category */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route
            path="a/third-level-category"
            element={<ThirdLevelCategory />}
          />
        </Route>

        {/* Module */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/module" element={<Module />} />
        </Route>

        {/* Module */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/module/:id/role" element={<RuleByModule />} />
        </Route>

        {/* recovery */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/admin/recovery" element={<RecoveryAdmin />} />
        </Route>

        {/* Priority */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/priority" element={<Priority />} />
        </Route>

        {/* Module permission */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/module/permission" element={<ModulePermission />} />
        </Route>

        {/* system permission */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/system/permission" element={<SystemPermission />} />
        </Route>

        {/* system permission */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/member/permission" element={<MemberPermission />} />
        </Route>

        {/* Project */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/project" element={<Project />} />
        </Route>

        {/* Project */}
        <Route path="/config/*" element={<PrivateRouter pageId="Settings" />}>
          <Route path="a/project/:id/user" element={<UserBySystem />} />
        </Route>

        {/**==================>>>>> Ticket Routes <<< ================== **/}
        {/* tickets client list */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route path="ticket/client/list" element={<Tickets />} />
        </Route>

        {/* tickets manager list */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route path="ticket/supervisor/list" element={<SearchIndex />} />
        </Route>

        {/* tickets expert list */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route path="ticket/expert/list" element={<SearchIndex />} />
        </Route>

        {/* tickets call center list */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route path="ticket/agent/list" element={<SearchIndex />} />
        </Route>

        {/* tickets call center list */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route path="ticket/administrator/list" element={<SearchIndex />} />
        </Route>

        {/* Todo ticket create admin*/}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/edit/administrator/:id"
            element={<TicketEditForAdmin />}
          />
        </Route>

        {/* ticket edit client*/}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/edit/client/:id"
            element={<TicketEditForClient />}
          />
        </Route>

        {/* ticket create call-center-agent*/}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/edit/agent/:id"
            element={<TicketEditForCallCenter />}
          />
        </Route>

        {/* ticket create manager*/}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/edit/supervisor/:id"
            element={<TicektEditForManger />}
          />
        </Route>

        {/* ticket create expert*/}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/edit/expert/:id"
            element={<TicketEditForExpert />}
          />
        </Route>

        {/* ticket create for client */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/create/client"
            element={<TicketCreationForClient />}
          />
        </Route>

        {/* ticket create for call center */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route path="ticket/create/agent" element={<CreateTicket />} />
        </Route>

        {/* ticket create for expert */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/create/expert"
            element={<TicketCreationForExperts />}
          />
        </Route>

        {/* ticket create for manager */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/create/supervisor"
            element={<TicketCreationForManger />}
          />
        </Route>

        {/* ticket create for admin */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route
            path="ticket/create/administrator"
            element={<TicketCreationForExperts />}
          />
        </Route>

        {/* ticket view */}
        <Route path="/*" element={<PrivateRouter pageId="Ticket" />}>
          <Route path="ticket/view/:id" element={<TicketSigleView />} />
        </Route>

        {/**==================>>>>> User Routes <<< ================== **/}
        {/* user */}
        <Route path="/*" element={<PrivateRouter pageId="User" />}>
          <Route path="user/list" element={<User />} />
        </Route>

        {/* user create */}
        <Route path="/*" element={<PrivateRouter pageId="User" />}>
          <Route path="user/create" element={<UserCreate />} />
        </Route>

        {/* user Edit page */}
        <Route path="/*" element={<PrivateRouter pageId="User" />}>
          <Route path="user/edit/:id" element={<UserEditForm />} />
        </Route>

        {/**==================>>>>> Not Found Routes <<< ================== **/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AttachmentContext.Provider>
  );
}

export default App;
