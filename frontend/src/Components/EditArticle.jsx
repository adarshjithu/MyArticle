import React, { useState } from "react";
import axios from "axios";
import { uploadUserArticle } from "../Services/apiService/userServices";
import axiosInstance from "../Services/api";
import LoadingCircle from "./LoadingCircle";

const EditArticleMocal = ({ isEdiOpen,setIsEditOpen,articleData,setArticles,setLoad}) => {
  
    const [title, setTitle] = useState(articleData.title);
    const [description, setDescription] = useState(articleData.description);
  
    const [images, setImages] = useState(articleData?.images||[]);
    
    const [tags, setTags] = useState(String(articleData.tags));
    const [category, setCategory] = useState(articleData?.category);
    const [loading,setLoading] = useState(false)

    const categories = ["Technology", "Health", "Business", "Lifestyle", "Education", "Writing", "Designing", "Education"];

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // // Prepare form data
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("_id",articleData._id)

        // Convert tags to an array and send as a JSON string
        const tagsArray = tags.split(",").map((tag) => tag.trim());
        formData.append("tags", JSON.stringify(tagsArray));

        // Append each image file to formData
        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });

        const uploadArticle = async () => {
            setLoading(true)
            const res = await axiosInstance.put("/articles", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false)
            if (res?.data?.success) {

              setLoad((prev)=>!prev)
         
             
                setIsEditOpen(false)
            }
        };

        uploadArticle();
    };

    return (
      
        <div className="overflow-scroll fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 mt-5 mb-5 rounded-lg shadow-lg max-w-lg w-full">
                <h2  className="text-2xl font-semibold text-gray-800 mb-6">Add New Article</h2>

                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                            placeholder="Enter article title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                            rows={5}
                            placeholder="Enter article description"
                            required
                        />
                    </div>

                    {/* Multiple Images */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Images</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            multiple
                            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {images?.length > 0 &&
                                images.map((image, index) => (
                                
                                    <img
                                        key={index}
                                        src={typeof(image)=='object'?URL.createObjectURL(image):image}
                                        alt={`preview-${index}`}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                            placeholder="Enter tags separated by commas (e.g., #React, #JavaScript)"
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline">
                           {loading?<LoadingCircle/>: 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticleMocal;
