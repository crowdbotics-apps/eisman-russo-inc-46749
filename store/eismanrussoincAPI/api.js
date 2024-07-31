import axios from "axios"
const eismanrussoincAPI = axios.create({
  baseURL: "https://eisman-russo-inc-46749.botics.co",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})
function api_docs_schema_retrieve(payload) {
  return eismanrussoincAPI.get(`/api-docs/schema/`, {
    params: { lang: payload.lang }
  })
}
function api_v1_signup_create(payload) {
  return eismanrussoincAPI.post(`/api/v1/signup/`, payload)
}
function rest_auth_login_create(payload) {
  return eismanrussoincAPI.post(`/rest-auth/login/`, payload)
}
function rest_auth_logout_create(payload) {
  return eismanrussoincAPI.post(`/rest-auth/logout/`)
}
function rest_auth_password_change_create(payload) {
  return eismanrussoincAPI.post(`/rest-auth/password/change/`, payload)
}
function rest_auth_password_reset_create(payload) {
  return eismanrussoincAPI.post(`/rest-auth/password/reset/`, payload)
}
function rest_auth_password_reset_confirm_create(payload) {
  return eismanrussoincAPI.post(`/rest-auth/password/reset/confirm/`, payload)
}
function rest_auth_registration_create(payload) {
  return eismanrussoincAPI.post(`/rest-auth/registration/`, payload)
}
function rest_auth_registration_resend_email_create(payload) {
  return eismanrussoincAPI.post(
    `/rest-auth/registration/resend-email/`,
    payload
  )
}
function rest_auth_registration_verify_email_create(payload) {
  return eismanrussoincAPI.post(
    `/rest-auth/registration/verify-email/`,
    payload
  )
}
function rest_auth_user_retrieve(payload) {
  return eismanrussoincAPI.get(`/rest-auth/user/`)
}
function rest_auth_user_update(payload) {
  return eismanrussoincAPI.put(`/rest-auth/user/`, payload)
}
function rest_auth_user_partial_update(payload) {
  return eismanrussoincAPI.patch(`/rest-auth/user/`, payload)
}
function ticketing_debris_list(payload) {
  return eismanrussoincAPI.get(`/ticketing/debris/`, {
    params: {
      is_active: payload.is_active,
      ordering: payload.ordering,
      page: payload.page,
      page_size: payload.page_size,
      search: payload.search
    }
  })
}
function ticketing_debris_create(payload) {
  return eismanrussoincAPI.post(`/ticketing/debris/`, payload)
}
function ticketing_debris_retrieve(payload) {
  return eismanrussoincAPI.get(`/ticketing/debris/${payload.id}/`)
}
function ticketing_debris_update(payload) {
  return eismanrussoincAPI.put(`/ticketing/debris/${payload.id}/`, payload)
}
function ticketing_debris_partial_update(payload) {
  return eismanrussoincAPI.patch(`/ticketing/debris/${payload.id}/`, payload)
}
function ticketing_debris_destroy(payload) {
  return eismanrussoincAPI.delete(`/ticketing/debris/${payload.id}/`)
}
function ticketing_event_list(payload) {
  return eismanrussoincAPI.get(`/ticketing/event/`, {
    params: {
      event_date: payload.event_date,
      is_active: payload.is_active,
      ordering: payload.ordering,
      page: payload.page,
      page_size: payload.page_size,
      search: payload.search
    }
  })
}
function ticketing_event_create(payload) {
  return eismanrussoincAPI.post(`/ticketing/event/`, payload)
}
function ticketing_event_retrieve(payload) {
  return eismanrussoincAPI.get(`/ticketing/event/${payload.id}/`)
}
function ticketing_event_update(payload) {
  return eismanrussoincAPI.put(`/ticketing/event/${payload.id}/`, payload)
}
function ticketing_event_partial_update(payload) {
  return eismanrussoincAPI.patch(`/ticketing/event/${payload.id}/`, payload)
}
function ticketing_event_destroy(payload) {
  return eismanrussoincAPI.delete(`/ticketing/event/${payload.id}/`)
}
function users_login_create(payload) {
  return eismanrussoincAPI.post(`/users/login/`, payload)
}
function users_position_list(payload) {
  return eismanrussoincAPI.get(`/users/position/`, {
    params: {
      ordering: payload.ordering,
      page: payload.page,
      page_size: payload.page_size,
      platform_type: payload.platform_type,
      role: payload.role,
      search: payload.search
    }
  })
}
function users_position_create(payload) {
  return eismanrussoincAPI.post(`/users/position/`, payload)
}
function users_position_retrieve(payload) {
  return eismanrussoincAPI.get(`/users/position/${payload.id}/`)
}
function users_position_update(payload) {
  return eismanrussoincAPI.put(`/users/position/${payload.id}/`, payload)
}
function users_position_partial_update(payload) {
  return eismanrussoincAPI.patch(`/users/position/${payload.id}/`, payload)
}
function users_position_destroy(payload) {
  return eismanrussoincAPI.delete(`/users/position/${payload.id}/`)
}
function users_profile_list(payload) {
  return eismanrussoincAPI.get(`/users/profile/`, {
    params: {
      is_active: payload.is_active,
      ordering: payload.ordering,
      page: payload.page,
      page_size: payload.page_size,
      position: payload.position,
      role: payload.role,
      search: payload.search
    }
  })
}
function users_profile_create(payload) {
  return eismanrussoincAPI.post(`/users/profile/`, payload)
}
function users_profile_retrieve(payload) {
  return eismanrussoincAPI.get(`/users/profile/${payload.id}/`)
}
function users_profile_update(payload) {
  return eismanrussoincAPI.put(`/users/profile/${payload.id}/`, payload)
}
function users_profile_partial_update(payload) {
  return eismanrussoincAPI.patch(`/users/profile/${payload.id}/`, payload)
}
function users_profile_destroy(payload) {
  return eismanrussoincAPI.delete(`/users/profile/${payload.id}/`)
}
function users_profile_change_password_create(payload) {
  return eismanrussoincAPI.post(`/users/profile/change_password/`, payload)
}
function users_profile_details_retrieve(payload) {
  return eismanrussoincAPI.get(`/users/profile/details/`)
}
function users_role_list(payload) {
  return eismanrussoincAPI.get(`/users/role/`, {
    params: {
      can_add_positions: payload.can_add_positions,
      ordering: payload.ordering,
      search: payload.search
    }
  })
}
function users_role_retrieve(payload) {
  return eismanrussoincAPI.get(`/users/role/${payload.id}/`)
}
export const apiService = {
  api_docs_schema_retrieve,
  api_v1_signup_create,
  rest_auth_login_create,
  rest_auth_logout_create,
  rest_auth_password_change_create,
  rest_auth_password_reset_create,
  rest_auth_password_reset_confirm_create,
  rest_auth_registration_create,
  rest_auth_registration_resend_email_create,
  rest_auth_registration_verify_email_create,
  rest_auth_user_retrieve,
  rest_auth_user_update,
  rest_auth_user_partial_update,
  ticketing_debris_list,
  ticketing_debris_create,
  ticketing_debris_retrieve,
  ticketing_debris_update,
  ticketing_debris_partial_update,
  ticketing_debris_destroy,
  ticketing_event_list,
  ticketing_event_create,
  ticketing_event_retrieve,
  ticketing_event_update,
  ticketing_event_partial_update,
  ticketing_event_destroy,
  users_login_create,
  users_position_list,
  users_position_create,
  users_position_retrieve,
  users_position_update,
  users_position_partial_update,
  users_position_destroy,
  users_profile_list,
  users_profile_create,
  users_profile_retrieve,
  users_profile_update,
  users_profile_partial_update,
  users_profile_destroy,
  users_profile_change_password_create,
  users_profile_details_retrieve,
  users_role_list,
  users_role_retrieve
}
