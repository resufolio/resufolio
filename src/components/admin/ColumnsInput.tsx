import React from 'react'

const ColumnsInput: React.FC<{ value: number, onChange: (value: number) => void }> = ({ value, onChange }) => {
    return (
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-10 text-center border border-gray-300 rounded-sm"
        />
    )
}

export default ColumnsInput
