import { useCallback, useEffect, useState } from "react"
import { FWKReduxState } from "../redux"
import { useSelector } from "react-redux"

export const useTermsAndConditionsLink = () => {
    const terms_and_conditions = useSelector((state:FWKReduxState)=> state.versions.versions?.terms_and_conditions)
    const getTandC = useCallback(()=> 
        `/static_documents/Terms-and-Conditions-for-DestinE-Users-Granted-Upgraded-Access_${terms_and_conditions || '1.0.0'}.pdf`,  
        [ terms_and_conditions ]
    )
    const [ tandc, setTandc ] = useState(getTandC())

    useEffect(()=>{
        setTandc(getTandC())
    }, [ terms_and_conditions ])

    return tandc;

}