"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoCameraOutline } from "react-icons/io5";
import { User, Mail, Phone, MapPin, Calendar, Award, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API base URL =>", apiBaseUrl);

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const PersonalData = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    updatedProfileImage: "",
    firstName: "",
    lastName: "",
    examType: "",
    gender: "",
    dateOfBirth: "",
    emailAddress: "",
    targetYear: "",
    domicileState: "",
    mobileNumber: "",
    pincode: "",
  });

  const [profileImage, setProfileImage] = useState("/profile.jpg");
  const [isEditable, setIsEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) return;

        const response = await axios.get(`${apiBaseUrl}/students/getdata`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.status === 200) {
          const userData = response.data;
          setFormData({
            id: authToken,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            emailAddress: userData.emailAddress || "",
            examType: userData.examType || "",
            gender: userData.gender || "",
            dateOfBirth: userData.dateOfBirth || "",
            targetYear: userData.targetYear || "",
            domicileState: userData.domicileState || "",
            mobileNumber: userData.mobileNumber || "",
            pincode: userData.pincode || "",
          });

          setProfileImage(userData.profileImage || "/profile.jpg");
        }
      } catch (error) {
        console.error("Error fetching personal data:", error);
      }
    };
    fetchPersonalData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload only JPEG or PNG images.");
      e.target.value = "";
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("Image size should be less than 5MB. Please choose a smaller image.");
      e.target.value = "";
      return;
    }

    const img = new Image();
    img.onload = function () {
      if (img.width < 800 || img.height < 800) {
        toast.error("Image should be at least 800x800px. Please choose a larger image.");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("profileImage", reader.result);
        setProfileImage(reader.result);
        toast.success("Profile image updated successfully!");
      };
      reader.readAsDataURL(file);
    };

    img.onerror = function () {
      toast.error("Invalid image file. Please choose a valid image.");
      e.target.value = "";
      return;
    };

    img.src = URL.createObjectURL(file);
  };

  const handleUpdateClick = async () => {
    setIsUpdating(true);

    const mobileNumber = formData.mobileNumber.trim();
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number starting with 6-9.");
      setIsUpdating(false);
      return;
    }

    const pincodeRegex = /^\d{6}$/;
    if (formData.pincode && !pincodeRegex.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      setIsUpdating(false);
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      const decodeJWT = (token) => {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          return JSON.parse(atob(base64));
        } catch (error) {
          console.error("Error decoding JWT:", error);
          return null;
        }
      };

      const decodedToken = decodeJWT(authToken);
      const studentId = decodedToken?.id;

      if (!studentId) {
        throw new Error("Unable to decode student ID from token");
      }

      const updatedProfileImage = localStorage.getItem("profileImage") || profileImage;

      const requestData = {
        id: studentId,
        updatedImageUrl: updatedProfileImage,
        firstName: formData.firstName,
        lastName: formData.lastName,
        examType: formData.examType,
        dateOfBirth: formData.dateOfBirth,
        domicileState: formData.domicileState,
        targetYear: formData.targetYear,
        mobileNumber: formData.mobileNumber,
        gender: formData.gender,
        emailAddress: formData.emailAddress,
        pincode: formData.pincode,
      };

      const response = await axios.post(
        `${apiBaseUrl}/students/newdata`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setShowPopup(true);
        setIsEditable(false);
        setTimeout(() => setShowPopup(false), 3000);
        toast.success("User updated successfully!");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating personal data:", error);
        toast.error("Something went wrong on the server");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await axios.delete(`${apiBaseUrl}/students/delete-account`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.status === 200) {
        toast.success("Account deleted successfully");
        localStorage.removeItem("authToken");
        localStorage.removeItem("profileImage");
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting account:", error);

      if (error.response?.status === 404) {
        toast.error(
          "Delete account feature is not available on the server yet. Please contact administrator to enable this feature."
        );
      } else if (error.response?.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to delete account. Please try again later."
        );
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card with Profile */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-200 overflow-hidden mb-6">
          {/* Gradient Banner */}
          <div className="h-24 md:h-32 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600"></div>

          {/* Profile Section */}
          <div className="px-4 md:px-8 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-12 md:-mt-16">
              {/* Profile Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditable && (
                    <label className="absolute bottom-1 right-1 bg-teal-500 p-2 rounded-full cursor-pointer shadow-lg hover:bg-teal-600 transition-colors">
                      <IoCameraOutline className="text-white text-lg md:text-xl" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>

                {/* Name and Email */}
                <div className="text-center sm:text-left mt-4 sm:mt-0">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                   Dr. {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mt-1 flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4 text-teal-500" />
                    {formData.emailAddress}
                  </p>
                </div>
              </div>

              {/* Edit/Update Button */}
              <button
                onClick={!isEditable ? () => setIsEditable(true) : handleUpdateClick}
                disabled={isUpdating}
                className={`mt-4 md:mt-0 px-6 py-2.5 rounded-lg text-white font-semibold shadow-md transition-all duration-200 ${
                  isEditable
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                    : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isUpdating ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Updating...
                  </span>
                ) : isEditable ? (
                  "Update Profile"
                ) : (
                  "Edit Profile"
                )}
              </button>
            </div>

            {/* Image Upload Instructions */}
            {isEditable && (
              <div className="mt-6 p-4 bg-teal-50 border-2 border-teal-200 rounded-lg">
                <p className="text-sm text-teal-800 font-medium">
                  📸 Profile Image Requirements:
                </p>
                <ul className="text-sm text-teal-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Format: <b>.jpeg or .png</b></li>
                  <li>Minimum size: <b>800x800 pixels</b></li>
                  <li>Maximum file size: <b>5MB</b></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-200 p-6 md:p-8">
          <form>
            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                label="First Name"
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<User className="w-5 h-5 text-teal-500" />}
              />
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<User className="w-5 h-5 text-teal-500" />}
              />

              <SelectField
                label="Exam Type"
                name="examType"
                value={formData.examType}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<Award className="w-5 h-5 text-teal-500" />}
                options={[
                  { value: "", label: "Select exam type" },
                  { value: "JEE", label: "JEE" },
                  { value: "NEET", label: "NEET" },
                  { value: "Both", label: "Both" },
                ]}
              />

              <InputField
                label="Email Address"
                name="emailAddress"
                type="email"
                placeholder="example@example.com"
                value={formData.emailAddress}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<Mail className="w-5 h-5 text-teal-500" />}
              />

              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<User className="w-5 h-5 text-teal-500" />}
                options={[
                  { value: "", label: "Select gender" },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />

              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<Calendar className="w-5 h-5 text-teal-500" />}
              />

              <InputField
                label="Target Year"
                name="targetYear"
                type="text"
                placeholder="2024"
                value={formData.targetYear}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<Award className="w-5 h-5 text-teal-500" />}
              />

              <SelectField
                label="State (Domicile)"
                name="domicileState"
                value={formData.domicileState}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<MapPin className="w-5 h-5 text-teal-500" />}
                options={[
                  { value: "", label: "Select state" },
                  ...INDIAN_STATES.map(state => ({ value: state, label: state }))
                ]}
              />

              <InputField
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                placeholder="9876543210"
                value={formData.mobileNumber}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<Phone className="w-5 h-5 text-teal-500" />}
              />

              <InputField
                label="Pincode"
                name="pincode"
                type="text"
                placeholder="400001"
                value={formData.pincode}
                onChange={handleChange}
                isEditable={isEditable}
                icon={<MapPin className="w-5 h-5 text-teal-500" />}
                maxLength={6}
              />
            </div>
          </form>

          {/* Delete Account Section */}
          <div className="mt-8 pt-6 border-t-2 border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-red-500" />
                  Danger Zone
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md whitespace-nowrap"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border-2 border-red-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trash2 className="w-6 h-6" />
                  Delete Account
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 text-sm leading-relaxed">
                    ⚠️ <b>Warning:</b> This action cannot be undone. All your data, including your
                    profile, test history, and progress will be permanently deleted.
                  </p>
                </div>
                <p className="text-gray-700 text-sm">
                  Are you absolutely sure you want to proceed with deleting your account?
                </p>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isDeleting}
                  className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-semibold rounded-lg transition-colors duration-200 border-2 border-gray-300 hover:border-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:bg-red-400 disabled:cursor-not-allowed shadow-md"
                >
                  {isDeleting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Deleting...
                    </span>
                  ) : (
                    "Yes, Delete My Account"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, type, placeholder, value, onChange, isEditable, icon, maxLength }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-800 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={!isEditable}
      maxLength={maxLength}
      className="bg-gray-50 border-2 border-teal-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 block w-full p-3 disabled:bg-gray-100 disabled:text-gray-600 transition-all duration-200"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, isEditable, icon, options }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-800 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={!isEditable}
      className="bg-gray-50 border-2 border-teal-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 block w-full p-3 disabled:bg-gray-100 disabled:text-gray-600 transition-all duration-200"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default PersonalData;