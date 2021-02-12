import {object, string as yupString } from "yup";

 const DodajPrzedmiotValidationSchema =object().shape({
    nazwa: yupString().required('To pole jest wymagane'),
    miasto: yupString().required('To pole jest wymagane'),
    działy: yupString().required('To pole jest wymagane'),
    opisPrzedmiotu: yupString().required('To pole jest wymagane')
});

const DodajUzytkownikaValidationSchema =object().shape({
    imie:yupString().required('To pole jest wymagane'),
    nazwisko:yupString().required('To pole jest wymagane'),
    email:yupString().required('To pole jest wymagane'),
    hasło:yupString().required('To pole jest wymagane'),
    numerTelefonu:yupString().required('To pole jest wymagane'),
});
export default DodajPrzedmiotValidationSchema;