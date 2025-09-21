import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    dob: "",
    gender: "",
    phone: "",
    country: "",
    profession: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMsg("❌ Passwords do not match!");
      return;
    }

    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Update displayName
      await updateProfile(user, { displayName: formData.fullName });

      // Save profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: formData.fullName,
        email: formData.email,
        username: formData.username,
        dob: formData.dob,
        gender: formData.gender,
        phone: formData.phone,
        country: formData.country,
        profession: formData.profession,
        role: "user",
        createdAt: serverTimestamp(),
      });

      setMsg("✅ Registration successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMsg("❌ " + err.message);
    }
  };

  return (
      <div className="bg-white w-[400px] p-8 rounded-lg shadow-lg relative">
        <h1 className="text-2xl text-center font-[Spirax] mb-6 text-gray-800">
          Create Account
        </h1>

        {msg && (
          <div className="bg-blue-500 text-white py-2 px-3 rounded mb-4 text-sm">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium">Country</label>
                <select
                  name="country"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Country</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Profession</label>
                <input
                  type="text"
                  name="profession"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit ✅
                </button>
              </div>
            </>
          )}
        </form>
      </div>
  );
};

export default Signup;
