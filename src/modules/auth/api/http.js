import makeApiRequest from "@/common/api/http/make-api-request";

export async function getUser() {
  return await makeApiRequest("/ums/user", "GET");
}

export async function login(data) {
  return await makeApiRequest("/ums/auth/signIn", "POST", { data });
}

export async function logout() {
  return await makeApiRequest("/ums/auth/logout", "POST");
}

export async function register(data) {
  const result = await makeApiRequest("/ums/auth/signUp", "POST", { data });

  if (!result.succeed && typeof result.content === "string") {
    const field = result.content.split(" ").includes("email") ? "email" : "username";
    result.content = { [field]: result.content };
  }

  return result;
}

export async function sendMail(email) {
  return await makeApiRequest(`/ums/auth/send/${email}`, "POST");
}

export async function sendCode({ email, code }) {
  return await makeApiRequest(`/ums/auth/confirm/${email}?code=${code}`, "POST");
}

const NAME_REGEXP = new RegExp(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Zа-яА-Я0-9._]+(?<![_.])$/);
const PASSWORD_REGEXP = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/);
const EMAIL_REGEXP = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");

export function validateRegistrationData(data) {
  const errorMessages = {
    username: "Невалидное имя пользователя",
    email: "Невалидный адрес электронной почты",
    firstName: "Имя должен иметь длину от 4 до 20",
    lastName: "Фамилия должен иметь длину от 4 до 20",
    password: "Пароль должен иметь длину от 8 до 26 и содержать хотя бы 1 букву и цифру",
    passwordMatch: "Пароли не совпадают",
  };

  const result = [];

  if (!NAME_REGEXP.test(data.username)) {
    result.push({ field: "username", message: errorMessages.username });
  }

  if (!EMAIL_REGEXP.test(data.email)) {
    result.push({ field: "email", message: errorMessages.email });
  }

  if (!NAME_REGEXP.test(data.firstName)) {
    result.push({ field: "firstName", message: errorMessages.firstName });
  }

  if (!NAME_REGEXP.test(data.lastName)) {
    result.push({ field: "lastName", message: errorMessages.lastName });
  }

  if (!PASSWORD_REGEXP.test(data.password)) {
    result.push({ field: "password", message: errorMessages.password });
  }

  if (data.password !== data.passwordConfirmation) {
    result.push({ field: "passwordMatch", message: errorMessages.passwordMatch });
  }

  return result;
}
