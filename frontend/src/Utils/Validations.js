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



  export const articleCartImage = "data:image/jpeg;base64,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"