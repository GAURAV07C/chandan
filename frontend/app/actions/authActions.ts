import {
    // CHECK_CREDENTIALS_URL,
   
    REGISTER_URL,
  } from "@/lib/apiEndPoints";
  import axios, { AxiosError } from "axios";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   export async function loginAction(prevState: any, formData: FormData) {
//     try {
//       await axios.post( {
//         email: formData.get("email"),
//         password: formData.get("password"),
//       });
//       return {
//         status: 200,
//         message: "Credentials matched loging you shortly!",
//         errors: {},
//         data: {
//           email: formData.get("email"),
//           password: formData.get("password"),
//         },
//       };
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (error.response?.status === 422) {
//           return {
//             status: 422,
//             message: error.response?.data?.message,
//             errors: error.response?.data?.errors,
//           };
//         }
//       }
//       return {
//         status: 500,
//         message: "Something went wrong.please try again!",
//         errors: {},
//         data: {},
//       };
//     }
//   }
  
  export async function registerAction(prevState: unknown, formData: FormData) {
    try {
      await axios.post(REGISTER_URL, {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
        role:formData.get('role')
      });
      return {
        status: 200,
        message:
          "Account created successfully! Please check your email and verify your email.",
        errors: {},
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          return {
            status: 422,
            message: error.response?.data?.message,
            errors: error.response?.data?.errors,
          };
        }
      }
      return {
        status: 500,
        message: "Something went wrong.please try again!",
        errors: {},
      };
    }
  }
  
  
