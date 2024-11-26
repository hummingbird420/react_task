// import reducer from other folder
import country from "../pages/country/store";
import district from "../pages/district/store";
import facility from "../pages/facility/store";
import province from "../pages/province/store";
import team from "../pages/team/store";
import priority from "../pages/priority/store";
import module from "../pages/module/store";
import project from "../pages/project/store";
import role from "../pages/role/store";
import login from "../pages/login/store";
import user from "../pages/user/store";
import ticket from "../pages/tickets/store";
import incidentCategory from "../pages/incident-category/store";
import message from "../pages/message/store";
import member from "../pages/member/store";
import systemPermission from "../pages/system-permission/store";

const rootReducer = {
  country,
  district,
  facility,
  province,
  team,
  priority,
  module,
  project,
  role,
  login,
  user,
  ticket,
  incidentCategory,
  message,
  member,
  systemPermission,
};

export default rootReducer;
