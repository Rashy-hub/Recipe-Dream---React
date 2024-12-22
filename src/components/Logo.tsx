import { useNavigate } from 'react-router'
import React from 'react'

const Logo: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center gap-2 w-[50px] h-[50px] cursor-pointer">
            <img onClick={() => navigate('/')} src="/recipe.png" className="w-full h-full"></img>
            <div className="text-lg font-bold font-special text-red-900">Recipe Dream</div>
        </div>
    )
}

export default Logo
