import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* Splash: computer logo + EduVision text; auto-redirect to /greeting */
export default function Splash(){
  const navigate = useNavigate();
  useEffect(()=>{
    const t = setTimeout(()=> navigate('/greeting'), 2200);
    return ()=> clearTimeout(t);
  },[navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-600">
      <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.9 }} className="text-center">
        <img src="/logo.svg" alt="EduVision" className="mx-auto w-28 h-28 mb-4"/>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">EduVision</h1>
        <p className="text-gray-200 mt-2">One-Stop Personalized Career & Education Advisor</p>
      </motion.div>
    </div>
  );
}

