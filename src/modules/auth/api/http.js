import makeApiRequest from "@/common/api/http/make-api-request";

export async function login(data) {
  return await makeApiRequest("/auth/signIn", "POST", { data });
}

export async function logout() {
  return await makeApiRequest("/auth/signOut", "POST");
}

export async function register(data) {
  return await makeApiRequest("/auth/signUp", "POST", { query: data });
}

export async function sendMail(email) {
  return await makeApiRequest(`/auth/send/${email}`, "POST");
}

export async function sendCode({ email, code }) {
  return await makeApiRequest(`/auth/confirm/${email}`, "POST", { query: { code } });
}

const NAME_REGEXP = new RegExp(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Zа-яА-Я0-9._]+(?<![_.])$/);
const PASSWORD_REGEXP = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/);
const EMAIL_REGEXP = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");
const CONFIRM_CODE_REGEXP = new RegExp(/^\d{6}$/);

export const validation = {
  isNameValid(name) {
    return NAME_REGEXP.test(name);
  },

  isPasswordValid(password) {
    return PASSWORD_REGEXP.test(password);
  },

  isEmailValid(email) {
    return EMAIL_REGEXP.test(email);
  },

  isConfirmCodeValid(code) {
    return CONFIRM_CODE_REGEXP.test(code);
  },
};
