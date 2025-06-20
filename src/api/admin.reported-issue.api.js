import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_REPORTED_ISSUES_URL } = apiUrls;

export function getAdminReportedIssues() {
  const url = `${ADMIN_REPORTED_ISSUES_URL}`;
  return APIMiddleware.get(url);
}

export function getAdminReportedIssueById(id) {
  const url = `${ADMIN_REPORTED_ISSUES_URL}/${id}`;
  return APIMiddleware.get(url);
}

export function readAdminReportedIssue(id) {
  const url = `${ADMIN_REPORTED_ISSUES_URL}/${id}`;
  return APIMiddleware.patch(url);
}
