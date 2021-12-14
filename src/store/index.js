export const timeRefreshToken = 295;

//Data Auth
export let headersadmin = {
  "x-access-token": localStorage.tokenAdmin,
};

export const VUE_APP_API_REFRESH = "tokenAdmin";
export const VUE_APP_LOGOUT_ADMIN = "logoutAdmin";
export const VUE_APP_LOGIN_ADMIN = "adminlogin";

//Data Auth User
export let headersuser = {
  "x-access-token": localStorage.tokenUser,
};
export const VUE_APP_LOGIN_USER = "loginUser";
export const VUE_APP_API_REFRESH_USER = "tokenUser";
export const VUE_APP_LOGOUT_USER = "logoutUser";

//Data User manage Admin
export const VUE_APP_LIST_USER = "api/admin/list";
export const VUE_APP_ADD_USER = "api/admin/addUser";
export const VUE_APP_TIME = "api/admin/date";
export const VUE_INFO_USER = "api/admin";
export const VUE_CHANGE_PASS = "api/admin/permiso";
export const VUE_FILTER_USER = "api/admin/buscar";
export const VUE_DELETE_USER = "api/admin/eliminar";
export const VUE_DONWLOAD_DATA = "api/admin/downloadData";
