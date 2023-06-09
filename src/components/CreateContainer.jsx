import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { Categories } from "../utils/data";
import Loader from "./Loader";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";


function CreateContainer() {

    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlerStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const[{fooditems},dispatch] = useStateValue();


    const uploadImage = (e) => { //upload img to firebase
        setIsloading(true);
        const imageFile = e.target.files[0]
        const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //upfile len filebase quan sat qua trinh tai file len theo %
            },
            (error) => {   //qua trinh tai len loi
                setFields(true);
                setMsg("Error when upload");
                setAlerStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsloading(false);
                }, 3000)
            }, () => {  //qua trinh tai len thanh cong
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    setImageAsset(downloadURL);    //render ra man hinh
                    setIsloading(false);
                    setFields(true);
                    setMsg("Upload success");
                    setAlerStatus("success")
                    setTimeout(() => {
                        setFields(false);
                    }, 3000);
                })
            })
    }
    const deleteImage = () => {
        setIsloading(true);
        const deteleRef = ref(storage, imageAsset);
        deleteObject(deteleRef).then(() => {
            setImageAsset(null);
            setIsloading(false);
            setFields(true);
            setMsg("Delete success");
            setAlerStatus("success")
            setTimeout(() => {
                setFields(false);
            }, 3000);
        })
    }
    const saveDetails = () => {
        setIsloading(true);
        try {
            if ((!title || !calories || !imageAsset || !price || !category)) {
                setFields(true);
                setMsg("Empty");
                setAlerStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsloading(false);
                }, 3000)
            }else{
                const data = {
                    id:`${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    calories: calories,
                    qty:1,
                    price: price,
                }
                saveItem(data)
                setIsloading(false)
                setFields(true);
                    setMsg("Data Upload success");
                    clearData();
                    setAlerStatus("success")
                    setTimeout(() => {
                        setFields(false);
                    }, 3000);
            }
        } catch (error) {
            setFields(true);
            setMsg("Error when upload");
            setAlerStatus("danger");
            setTimeout(() => {
                setFields(false);
                setIsloading(false);
            }, 3000)
        }
        fetchData()
    }

    const clearData = ()=>{
        setTitle("")
        setImageAsset(null)
        setCalories("")
        setPrice("")
        setCategory("")

    };
    const fetchData = async()=>{
        await getAllFoodItems().then(data=>{
          dispatch({
            type: actionType.SET_FOOD_ITEMS,
            fooditems: data,
          })
        })
      }



    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-[75%] border border-gray-200 rounded-1g 
            p-4 flex-col items-center justify-center gap-4">
                {
                    fields && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`w-full p-2 rounded-1g text-center text-1g font-semibold 
                        ${alertStatus === 'danger' ?
                                    'bg-red-400 text-red-800' :
                                    'bg-emerald-400 text-emerald-800'}`}
                        >
                            {msg}
                        </motion.p>
                    )}
                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFastfood className="text-x1 text-gray-700" />
                    <input
                        type="text"
                        required value={title}
                        placeholder="Give me a title..."
                        className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500 text-textColor"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                    >
                        <option value="other" className="bg-white">Select Category
                        </option>
                        {Categories && Categories.map(item => (
                            <option
                                key={item.id}
                                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                                value={item.urlParamName}
                            >{item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
                    {isLoading ? <Loader /> : <>
                        {!imageAsset ? <>
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                    <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
                                </div>
                                <input type="file" name="uploadimage" accept="image/*"
                                    onChange={uploadImage} className="w-0 h-0" />
                            </label>
                        </> : <>
                            <div className="relative h-full">
                                <img
                                    src={imageAsset} alt="uploaded image"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    className=" absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-x1 cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                    onClick={deleteImage}
                                ><MdDelete className="text-white" /></button>
                            </div>
                        </>}
                    </>}
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdFoodBank className="text-gray-700 text-2xl" />
                        <input
                            type="text"
                            required
                            placeholder="Calories"
                            value={calories}
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                            onChange={(e) => setCalories(e.target.value)}
                        />
                    </div>
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdAttachMoney className="text-gray-700 text-2xl" />
                        <input
                            type="text"
                            required
                            placeholder="Price"
                            value={price}
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center w-full">
                    <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-white font-semibold"
                        onClick={saveDetails}
                    >Save</button>
                </div>
            </div>
        </div>
    )
}

export default CreateContainer