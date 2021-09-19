import User from "./User";
import Diagnosis from "@/api/Diagnosis";

const UserApi = new User({ entityUrl: "/user" });
const DiagnosisApi = new Diagnosis({ entityUrl: "/quiz" });

export default {
  User: UserApi,
  Diagnosis: DiagnosisApi,
};
