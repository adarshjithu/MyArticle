import React, { useState } from "react";

const interestsList = ["Technology", "Programming", "Design", "Writing", "Health", "Business", "Education", "Lifestyle"];

const InterestModal = ({ isOpen, onClose, setIsOpen,selectedInterests,setSelectedInterests }) => {
   
 

    const toggleInterest = (interest) => {
        setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]));
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Select Your Interests</h2>
                    <div className="grid grid-cols-2 gap-4">

                        {interestsList.map((interest) => (
                            <button
                                key={interest}
                                onClick={() => toggleInterest(interest)}
                                className={`flex items-center justify-center border rounded-md p-4 text-gray-700 font-medium ${
                                    selectedInterests.includes(interest) ? "border-green-500 bg-green-50" : "border-gray-300"
                                }`}
                            >
                                {selectedInterests.includes(interest) && <span className="mr-2 text-green-500">✔</span>}
                                {interest}
                            </button>
                        ))}


                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-150"
                        >
                            Save and Close
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default InterestModal;
