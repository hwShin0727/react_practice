import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Index = () => {

    const nav = useNavigate();

    useEffect(() => {    
        const today = new Date();
        nav(`/${today.getFullYear()}/${today.getMonth() + 1}`, {replace : true});
    }, [nav]);
};

export default Index;