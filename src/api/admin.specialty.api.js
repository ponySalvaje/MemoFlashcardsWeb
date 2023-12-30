import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_SPECIALTIES_URL } = apiUrls;

export function getAdminSpecialties() {
  const url = `${ADMIN_SPECIALTIES_URL}/list`;
  return APIMiddleware.get(url);
}

export function getAdminSpecialty(id) {
  const url = `${ADMIN_SPECIALTIES_URL}/${id}`;
  return APIMiddleware.get(url);
}

export function createAdminSpecialty(specialty) {
  const url = `${ADMIN_SPECIALTIES_URL}`;
  return APIMiddleware.post(url, { data: { title: specialty.title } });
}

export function updateAdminSpecialty(id, specialty) {
  const url = `${ADMIN_SPECIALTIES_URL}/${id}`;
  return APIMiddleware.put(url, { data: { title: specialty.title } });
}

export function removeAdminSpecialty(id) {
  const url = `${ADMIN_SPECIALTIES_URL}/${id}`;
  return APIMiddleware.delete(url);
}
