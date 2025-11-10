import { useEffect, useRef, useState } from "react";



    interface PinGenrationProps {
        onComplete:(pin:string)=>void
        isVisible: boolean;
        onCancel: () => void;
        error?: string;
        loading?: boolean;
        
      }
      export const PinInput:React.FC<PinGenrationProps>=
      ({
        onComplete,
        isVisible,
        onCancel,
        error="",
        loading=false
    })=>{
        const [pin,setPin]=useState(["","","",""])
        const inputRefs=useRef<(HTMLInputElement|null)[]>([])
        

        useEffect(()=>{
            if(isVisible&&inputRefs.current[0]){
                inputRefs.current[0].focus()
            }
        },[isVisible])

        const handleChange=(index:number,value:string)=>{
                if(value.length>1)return;
                   if (!/^\d*$/.test(value)) return;


                const newPin=[...pin]
                newPin[index]=value;
                setPin(newPin)
                if (value&&index<3){
                    inputRefs.current[index+1]?.focus()
                }
                if(newPin.every(digit=>digit!=="")){
                    onComplete(newPin.join(""))
                }
        }
        const handleSubmit=()=>{
            if(pin.every(digit=>digit!=="")){
                onComplete(pin.join(""))
            }

        }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
        
      if(!isVisible)return null;


      return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Enter PIN</h3>
          <p className="text-gray-600 text-sm">Please enter your 4-digit PIN to confirm the transaction</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el }}
              type="password"
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              maxLength={1}
              disabled={loading}
            />
          ))}
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            Cancel
             </button>
          <button
            onClick={handleSubmit}
            disabled={pin.some(digit => digit === "") || loading}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Verifying..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  )
}

