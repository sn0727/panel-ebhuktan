import { toast } from "react-toastify";

export const nameValidation = (name) => {
    let nameReg = /^[a-zA-Z_]+( [a-zA-Z_]+)+$/  //validated name 
    if (name === '') {
        toast.error(`Name feild is required`)
        return false;
    }else if (!nameReg?.test(name)) {
        toast.error(`Name is not valid`);
        return false;
    }
    return true;
}

export const mobileNoValidation = (mobileNo) => {
    let mobileNoReg = /^[0-9]{10}$/  //validated name 
    if (mobileNo === '') {
        toast.error(`Mobile no feild is required`)
        return false;
    }else if (!mobileNoReg?.test(mobileNo)) {
        toast.error(`Mobile no is not valid, 10 digit`);
        return false;
    }
    return true;
}

export const emailValidation = (email) => {
    let emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/  //validated name 
    if (email === '') {
        toast.error(`Email feild is required`)
        return false;
    }else if (!emailReg?.test(email)) {
        toast.error(`Email is not valid`);
        return false;
    }
    return true;
}

export const postalCodeValidation = (postalCode) => {
    let postalReg = /^[0-9]{6}$/  //validated name 
    if (postalCode === '') {
        toast.error(`Postal code feild is required`)
        return false;
    }else if (!postalReg?.test(postalCode)) {
        toast.error(`Postal code is not valid, 6 digits.`);
        return false;
    }
    return true;
}

export const stateValidation = (state) => {
    let stateReg = /^[A-Za-z\s]+$/  //validated name 
    if (state === '') {
        toast.error(`State feild is required`)
        return false;
    }else if (!stateReg?.test(state)) {
        toast.error(`State is not valid.`);
        return false;
    }
    return true;
}

export const AadhaarNoValidation = (aadhaarNo) => {
    let aadhaarReg = /^[0-9]{12}$/  //validated name 
    if (aadhaarNo === '') {
        toast.error(`Aadhaar no feild is required`)
        return false;
    }else if (!aadhaarReg?.test(aadhaarNo)) {
        toast.error(`Aadhaar no is not valid, 12 digits.`);
        return false;
    }
    return true;
}

export const PanNoValidation = (panNo) => {
    let panNoReg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/  //validated name 
    if (panNo === '') {
        toast.error(`Pan no feild is required`)
        return false;
    }else if (!panNoReg?.test(panNo)) {
        toast.error(`Pan no is not valid, 9 digits.`);
        return false;
    }
    return true;
}


// const regexPatterns = {
//     name: /^[a-zA-Z_]+( [a-zA-Z_]+)+$/,  //validated name 
//     email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
//     mobile: /^[0-9]{10}$/,
//     postalCode: /^[0-9]{6}$/,
//     state: /^[A-Za-z\s]+$/,
//     district: /^[A-Za-z\s]+$/,
//     aadhaar: /^[0-9]{12}$/,
//     panCard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
// };

// if (name === '') {
//     toast.error(`Name feild is required`)
// }else if (!regexPatterns?.name?.test(name)) {
//     toast.error(`${name} Name is not valid`)
// }else if (mobileNo === '') {
//     toast.error(`Mobile no feild is required`)
// }else if (!regexPatterns?.mobile?.test(mobileNo)) {
//     toast.error(`${mobileNo} mobile no is not valid`)
// } else if (email === '') {
//     toast.error(`Email feild is required`)
// }else if (!regexPatterns?.email?.test(email)) {
//     toast.error(`${email} your email is not valid`)
// } else if (postalCode === '') {
//     toast.error(`Postal Code feild is required`)
// } else if (!regexPatterns?.postalCode?.test(postalCode)) {
//     toast.error(`${postalCode} your postal code is not valid min 6 digit`)
// } else if (stateValue === '') {
//     toast.error(`State feild is required`)
// }else if (!regexPatterns?.state?.test(stateValue)) {
//     toast.error(`${stateValue} your state is not valid`)
// }else if (aadhaarNo === '') {
//     toast.error(`Aadhaar no feild is required`)
// }else if (!regexPatterns?.aadhaar?.test(aadhaarNo)) {
//     toast.error(`${aadhaarNo} Aadhaar no is not valid, 12 digis`)
// }else if (panNo === '') {
//     toast.error(`Pan no feild is required`)
// }else if (!regexPatterns?.panCard?.test(panNo)) {
//     toast.error(`${panNo} Pan no is not valid`)
// }