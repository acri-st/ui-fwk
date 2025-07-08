import { useEffect, useState } from "react";
import { v4 } from 'uuid';

/**
 * Sleeps for x milliseconds
 * @param ms Number of milliseconds to sleep. Default: 1000ms
 * @returns Promise<void>
 */
export const sleep = async(ms:number = 1000): Promise<void>=>{
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(), ms);
    })
}

/**
 * Generate a random ID
 * @returns number
 */
export const randomID = () => Math.random();


export const useRefresh = (seconds: number = 5) =>{
    const [ refresh, setRefresh ] = useState<string>(v4());
    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh(v4());
        }, seconds * 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    return refresh;
}

/**
 * Hook that executes a callback function at a specified interval
 * @param intervalTime Time in milliseconds between each callback execution
 * @param callback Function to execute at each interval. Make sure this function is a useCallback since it will force the recreation of the interval
 * @returns void
 * 
 * @example
 * ```tsx
 * // Refresh data every 5 seconds
 * useInterval(5000, () => {
 *   fetchData();
 * });
 * ```
 */

export const useInterval = ( intervalTime: number, callback: () => void) =>{
    const [ loopInterval, setLoopInterval ] = useState<NodeJS.Timeout | undefined>();

    useEffect(()=>{
        // console.log("useInterval", intervalTime, callback)
        if(loopInterval) clearInterval(loopInterval);

        const newLoopInterval = setInterval(callback, intervalTime);
        setLoopInterval(newLoopInterval);

        return ()=>{
            clearInterval(loopInterval)
        }
    }, [ intervalTime, callback ])

}

/**
 * Fast way to pas start a string or number, used typically for dates
 * @param n The number to pad start
 * @param count the pad start count (default 2)
 * @returns string
 */
export const p = (n: string|number, count: number = 2) => (typeof n === 'string' ? n : n.toString() ).padStart(count, '0')


/**
 * 
 */
export const gitURLRegex = /^http(s){0,1}:\/\/.+\.git$/;


export const URLRegex = /^(http(s)?):\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=\-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

export const getImageFromFile = (file: File): Promise<HTMLImageElement> => {
    if (!file.type.startsWith('image/')) { 
        throw new Error('File is not an image');
    }

    return new Promise((resolve, reject)=>{

        const reader = new FileReader();
    
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.src = e.target?.result as string; 
        }
    
        reader.readAsDataURL(file); 
    })
}
