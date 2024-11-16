import Cookies from "js-cookie";
import instance from "./api";

export const getAuthToken = async ({
  name,
  pass,
}: {
  name: string;
  pass: string;
}) => {
  return instance("/users")
    .then(res => {
      if (
        res.data.find(
          (el: {name: string; pass: string}) =>
            el.name.toLowerCase() === name.toLowerCase() &&
            el.pass.toLowerCase() === pass.toLowerCase(),
        )
      ) {
        const gettedToken = res.data.filter(
          (el: {name: string; pass: string; token: string}) =>
            el.name.toLowerCase() === name.toLowerCase() &&
            el.pass.toLowerCase() === pass.toLowerCase(),
        )[0].token;

        Cookies.set("aCsTkn", gettedToken, {expires: 1 / 24 / 2});
        return {
          success: true,
          status: res.status,
          message: "Success",
        };
      }
      Cookies.remove("aCsTkn");
      return {
        success: false,
        status: res.status,
        message: "Wrong data",
      };
    })
    .catch(err => err.response.data);
};
