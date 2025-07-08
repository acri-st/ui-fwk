import { FaCheckCircle, FaDownload, FaEdit, FaExternalLinkAlt, FaPlay, FaPlus, FaPlusSquare, FaPowerOff, FaTimes, FaTrashAlt, FaUpload } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
import { SiJupyter } from "react-icons/si";
import { IoMdSettings, IoMdCheckmark } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { IoBanSharp, IoCloseOutline, IoWarning, IoRefreshOutline  } from "react-icons/io5";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiLogIn, FiUser  } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";


export const FWKIcons = {
    question: <FaCircleQuestion/>,
    info: <FaInfoCircle/>,
    refresh: <IoRefreshOutline/>,
    home: <AiFillHome/>,
    close: <FaTimes/>,
    cancel: <IoBanSharp/>,
    accept: <IoMdCheckmark/>,
    warning: <IoWarning/>,
    create: <TbSquareRoundedPlusFilled/>,
    createButton: <div className="create-button-icon"><FaPlus/></div>,
    jupyter: <SiJupyter />,
    start: <FaPlay />,
    edit: <FaEdit/>,
    logout: <FaPowerOff/>,
    login: <FiLogIn/>,
    user: <FiUser />,
    settings: <IoMdSettings/>,
    confirm: <FaCheckCircle/>,
    upload: <FaUpload/>,
    download: <FaDownload/>,
    delete: <FaTrashAlt/>,
    letterChevronRight: <BsChevronRight />,
    letterChevronLeft: <BsChevronLeft />,
    externalLink: <FaExternalLinkAlt />,
}