import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth:async()=>{
        try {
           const res=await axiosInstance.get("/auth/check")
            set ({authUser:res.data})
        } catch (error) {
            console.log("Error in checkAuth",error)
            set({authUser:null})
            
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
        set({isSigningUp:true})
        try {
          const res=  await axiosInstance.post("/auth/signup",data)
          toast.success("Account Created Successfully")
          set({authUser:res.data})
            
        } catch (error) {
            console.error("Signup error:", error); // Log the full error for debugging

            // Check if error.response exists before accessing data
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            
        }finally{
            set({isSigningUp:false})
        }

    },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logged out successfully")
            
        } catch (error) {
            toast.error(error.response.data.message)   
        }
    },
    
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
    
          get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      }

}
))