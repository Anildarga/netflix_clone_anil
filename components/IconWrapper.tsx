import dynamic from "next/dynamic";

export const AiOutlineInfoCircle = dynamic(() => import("react-icons/ai").then(mod => mod.AiOutlineInfoCircle), { ssr: false, loading: () => <div className="w-5 h-5" /> });
export const AiOutlineClose = dynamic(() => import("react-icons/ai").then(mod => mod.AiOutlineClose), { ssr: false, loading: () => <div className="w-5 h-5" /> });
export const AiOutlineArrowLeft = dynamic(() => import("react-icons/ai").then(mod => mod.AiOutlineArrowLeft), { ssr: false, loading: () => <div className="w-5 h-5" /> });
export const BsFillPlayFill = dynamic(() => import("react-icons/bs").then(mod => mod.BsFillPlayFill), { ssr: false, loading: () => <div className="w-6 h-6" /> });
export const BsChevronDown = dynamic(() => import("react-icons/bs").then(mod => mod.BsChevronDown), { ssr: false, loading: () => <div className="w-5 h-5" /> });
export const BsSearch = dynamic(() => import("react-icons/bs").then(mod => mod.BsSearch), { ssr: false, loading: () => <div className="w-5 h-5" /> });
export const BsBell = dynamic(() => import("react-icons/bs").then(mod => mod.BsBell), { ssr: false, loading: () => <div className="w-5 h-5" /> });
export const FaGithub = dynamic(() => import("react-icons/fa").then(mod => mod.FaGithub), { ssr: false, loading: () => <div className="w-10 h-10" /> });
export const FcGoogle = dynamic(() => import("react-icons/fc").then(mod => mod.FcGoogle), { ssr: false, loading: () => <div className="w-10 h-10" /> });
