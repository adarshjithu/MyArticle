import * as yup from "yup";
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ' -]+[A-Za-zÀ-ÖØ-ÿ]*$/;
const phoneNumberRegex = /^(\+?[1-9]\d{1,14})$/;
const hasIdenticalDigits = (value) => {
    return value.split("").every((digit) => digit === value[0]);
};
export const signupSchema = yup.object().shape({
    firstname: yup
        .string()
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be at most 50 characters")
        .matches(nameRegex, "Invalid name format")
        .required("Required")
        .trim(),
    lastname: yup
        .string()
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be at most 50 characters")
        .matches(nameRegex, "Invalid name format")
        .required("Required")
        .trim(),
    email: yup.string().required("Required").email("Invalid email format"),
    phonenumber: yup
        .string()
        .required("Required") // Ensure the field is not empty
        .max(10, "Enter a valid phonenumber")
        .min(10, "Enter a valid phonenumber")
        .test("no-identical-digits", "Invalid Phonenumber", (value) => {
            if (!value) return false;
            return !hasIdenticalDigits(value);
        })
        .matches(phoneNumberRegex, "Invalid Phonenumber"),
    password: yup
        .string()
        .min(6, "Password must be atlest 6 characters")
        .max(12, "Password maximum length exceeded")
        .required("Required")
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/, "Must contain one uppercase,special charector,number"),
    confirmpassword: yup
        .string()
        .min(6, "Password must be atlest 6 characters")
        .max(12, "Password maximum length exceeded")
        .required("Required")
        .oneOf([yup.ref("password")], "Password must match"),
});



export function getDayDifference(commentDate) {
    const commentDateObj = new Date(commentDate);
    const currentDate = new Date();
    const timeDiff = currentDate - commentDateObj;
  
    // Calculate day difference
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    // If the day difference is 0, calculate hour difference
    if (dayDiff === 0) {
      const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // Calculate hour difference
      if (hourDiff === 0) {
        const minuteDiff = Math.floor(timeDiff / (1000 * 60)); // Less than an hour, show minutes
        return `${minuteDiff} minutes `;
      }
      return `${hourDiff} hours `;
    }
  
    return `${dayDiff} days `;
  }