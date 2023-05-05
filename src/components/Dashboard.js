import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { env } from '../config';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";


const Dashboard = () => {



  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    //   console.log(token)

    const res = await fetch(`${env.api}/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      navigate("*");
    } else {
      console.log("User Verify");
      setLoginData(data);
      navigate("/dash");
    }
  }

  useEffect(() => {

    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000)

  }, [])
  const movieValidationSchema = yup.object({
    userName: yup.string().required(),
    age: yup.number().required().max(100),
    dateOfBirth: yup.date().required(),
    gender: yup.string().required(),
    mobile: yup.number().required(),
  })

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      userName: "",
      age: "",
      dateOfBirth: "",
      gender: "",
      mobile: "",
    },

    validationSchema: movieValidationSchema,

    onSubmit: (user) => {
      console.log("User Values:", user)
      addUser(user)
    },

  })

  const addUser = (user) => {

    ////-----> Follow 3 step's <-----////

    //// Step's
    //// 1. Method => POST
    //// 2. body => data & JSON(string)
    //// 3. header => JSON 

     fetch(`http://localhost:5000/user`,{
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type" : "application/json" },
     }).then (()=> navigate("/movies"));

  };
  return (
    <>
      {
        data ? (
          <div className='dashboard' >
            <form onSubmit={handleSubmit} className="add-user-form"  >
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                placeholder="Enter a Name"
                value={values.userName}
                onChange={handleChange}
                name="userName"
                onBlur={handleBlur}
                error={touched.userName && errors.userName}
                helperText={touched.userName && errors.userName ? errors.userName : null}
                color="success"

              />


              <TextField
                id="outlined-basic"
                label="Age"
                variant="outlined"
                placeholder="Enter a Poster"
                value={values.age}
                onChange={handleChange}
                name="age"
                onBlur={handleBlur}
                error={touched.age && errors.age}
                helperText={touched.age && errors.age ? errors.age : null}
              />


              <TextField
                id="outlined-basic"
                label="Date OF Birth"
                variant="outlined"
                placeholder="Enter a Trailer"
                value={values.dateOfBirth}
                onChange={handleChange}
                name="dateOfBirth"
                onBlur={handleBlur}
                error={touched.dateOfBirth && errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : null}
              />
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                value={values.gender}
                onChange={handleChange}
                name="gender"
                onBlur={handleBlur}
                error={touched.gender && errors.gender}
                helperText={touched.gender && errors.gender ? errors.gender : null}
              // onChange={handleChange}
              >
                <MenuItem value=""  >--Please choose an option--</MenuItem>
                <MenuItem value="Male" onChange={handleChange} name="gender">Male</MenuItem>
                <MenuItem value="Female" onChange={handleChange} name="gender">Female</MenuItem>
              </Select>


              <TextField
                id="outlined-basic"
                label="Mobile"
                variant="outlined"
                placeholder="Enter a Summary"
                value={values.mobile}
                onChange={handleChange}
                name="mobile"
                onBlur={handleBlur}
                error={touched.mobile && errors.mobile}
                helperText={touched.mobile && errors.mobile ? errors.mobile : null}
              />


              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>

            {/* <select className={`form-control ${formik.errors.grade ? `input-error` : ``}`} value={formik.values.grade} onChange={formik.handleChange} name="grade" >
                            <option value="">--Please choose an option--</option>
                            <option className='form-control'  value="1st" onChange={formik.handleChange} name="grade">1st</option>
                            <option className='form-control'  value="2nd" onChange={formik.handleChange} name="grade">2nd</option>
                            <option className='form-control' value="3rd" onChange={formik.handleChange} name="grade">3rd</option>
                            <option className='form-control'  value="4th" onChange={formik.handleChange} name="grade">4th</option>
                            <option className='form-control'  value="5th" onChange={formik.handleChange} name="grade">5th</option>
                        </select> */}

          </div>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            Loading .....
            <CircularProgress />
          </Box>
        )
      }


    </>
  );
};

export default Dashboard;
