import React from "react"

interface PanelProps {
  char: string;
  title: string;
}

const Panel: React.FC<PanelProps> = ({ char, title }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 h-[236px] w-full flex flex-col justify-end p-4 relative mb-[90px]">
      <div className="translate-y-5 container max-w-[1200px] mx-auto px-6 relative">
        <div className="absolute top-[100%] -translate-y-2/4">
          <p className="m-0 text-[78px]">{char}</p>
          <h1 className="text-[40px] font-semibold text-gray-800 dark:text-white">{title}</h1>
        </div>
      </div>
    </div>
  )
}

export default Panel