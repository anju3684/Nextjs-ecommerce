import { userdata } from "../state"
const valid = ({name, email, password, cf_password}:userdata) => {
    // console.log(password,name,email)
    if (!name || !email || !password) {
        return 'Please add all fields.'
    }

    if (!validateEmail(email)) {
        return 'Invalid emails.'
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters.'
    }
    if (password !== cf_password) {
        return 'Confirm password did not match.'
    }
}


function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid


// const validateEmail = (email: String) => {
//     return String(email)
//       .toLowerCase()
//       .match(
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       );
//   };
  
//   const valid = (name: String, email: String, password: String, cf_password: String) => {
//     if(!name || !email || !password || !cf_password) {
//       return 'All the fields are mendatory';
//     } else if(!validateEmail(email)) {
//       return 'Invalid Email';
//     } else if (password.length < 6) {
//       return 'Password should contain atleast 6 characters';
//     } else if(password !== cf_password) {
//       return 'password & confirm password should be same';
//     }
//   }
  
//   export default valid;