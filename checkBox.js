// import React from "react";
// import { useState } from "react";

// function CheckBox() {
//   const [languages, setLanguages] = useState([
//     { id: 1, value: "Hindi", isChecked: false },
//     { id: 2, value: "Gujarati", isChecked: false },
//     { id: 3, value: "English", isChecked: false },
//   ]);

//   const onSubmit = async (e) => {
//     try {
//       var formData = new FormData();
//       let language = [];

//       languages.map((lang) => {
//         if (lang.isChecked) language.push(lang.value);
//       });
//       formData.append("Language", language);

//       console.log("abbc", typeof formData.get("Language"));

//       const res = await axios.post("api call", formDate);
//       history.push("/"); //any were you want
//     } catch (error) {
//       if (error.response) {
//         setData(error.response.data.msg);
//       } else {
//         setData(error.message);
//       }
//       console.log("error", error);
//     }
//   };

//   const handleCheckboxChecked = (event) => {
//     let language = languages;

//     language.forEach((lang) => {
//       if (lang.value === event.target.value)
//         lang.isChecked = event.target.checked;
//     });
//     setLanguages(language);
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
//         <div>
//           {languages.map((language) => {
//             return (
//               <li type="none" key={language.id}>
//                 <input
//                   type="checkbox"
//                   name={language.value}
//                   value={language.value}
//                   onChange={handleCheckboxChecked}
//                 />
//                 <label htmlFor={language.value} className="ml-2">
//                   {language.value}
//                 </label>
//               </li>
//             );
//           })}
//         </div>
//         <button type="submit" className="btn btn-primary btn-block">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CheckBox;
