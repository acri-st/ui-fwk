import classNames from "classnames"
import { HTMLProps, ReactNode, RefObject, useCallback, useEffect, useRef, useState, DragEvent } from "react";
import './Dropzone.css';
import { getImageFromFile, Logger } from "../../utils";
import { toast } from "react-toastify";
import { partial } from "filesize";

const logger = new Logger('Component', 'DropZone')
const size = partial({ standard: "jedec" });

export type IDropzoneLimits = {
    dimensions?: {
        width: number
        height: number
    }
    size?: {
        min?: number
        max?: number
    }
}


export const checkFilesLimits = (limits: IDropzoneLimits, _files: FileList|File[] ) =>{
    let files = !Array.isArray(_files) ? Array.from(_files) : _files;
    for(let file of files){
        if(limits.size){
            if(limits.size.min && file.size < limits.size.min){
                toast(<>
                    The image size is too small ({size(file.size)}).
                    <br/> 
                    <br/> 
                    Requirements:
                    <br/> 
                    { limits.size.min && <>Min. {size(limits.size.min)}{" "}</> } { limits.size.max && <>Max. {size(limits.size.max)}{" "}</> }
                    </>, { type: 'warning' }
                )
                throw new Error(`Image size too small. Got ${size(file.size)} and limits are ${ limits.size.min && size(limits.size.min) } ${ limits.size.max && size(limits.size.max) }`)
            }
            if(limits.size.max && file.size > limits.size.max){
                toast(<>
                    The image size is too large ({size(file.size)}).
                    <br/> 
                    <br/> 
                    Requirements:
                    <br/> 
                    { limits.size.min && <>Min. {size(limits.size.min)}{" "}</> } { limits.size.max && <>Max. {size(limits.size.max)}{" "}</> }
                    </>, { type: 'warning' }
                )
                throw new Error(`Image size too large. Got ${size(file.size)} and limits are ${ limits.size.min && size(limits.size.min) } ${ limits.size.max && size(limits.size.max) }`)
            }
        }
    }
}
export const checkImageLimits = async(limits: IDropzoneLimits, file: File) =>{

    if(limits.dimensions){
        let image = await getImageFromFile(file);
        if(image.width < limits.dimensions.width || image.width < limits.dimensions.height){
            toast(<>
                The image dimensions are too small ({image.width}x{image.height}).
                <br/> 
                <br/> 
                Minimum requirements:
                <br/> 
                Width: {limits.dimensions.width} Height: {limits .dimensions.height}
                </>, { type: 'warning' }
            )
            throw new Error(`Image dimensions are not in limits. Got ${image.width}x${image.height} and limits are ${limits.dimensions.width}x${limits.dimensions.height}`)
        }
    }
    checkFilesLimits(limits, [file])
}

export const checkSupportedFormats = (supportedFormats: string[], file: File) =>{
    if(supportedFormats){
        if(!supportedFormats.includes(file.type)){
            toast(<>
                The file format {file.type} is not supported.
                <br/>
                <br/>
                Supported formats: {supportedFormats.map((format)=>(format.split('/')[1])).join(', ')}
            </>, { type: 'warning' })
            throw new Error(`File format is not supported. Got ${file.type} and limits are ${supportedFormats.join(', ')}`);
        }
    }
}
type IProps = {
    dragRef?: RefObject<any>
    id?: string
    className?: string
    children?: ReactNode
    divProps?: Partial<HTMLProps<HTMLDivElement>>
    disableDrag?: boolean
    onDrop: (files: FileList)=>any
    dropzoneContent: ReactNode|((dragging: boolean)=>ReactNode)
    dropzoneAreaClick?: ()=>any
    pointerEvents?: boolean
    supportedFormats?: string[]

    image?: boolean

    limits?: IDropzoneLimits
}
let timeout: any;

export const Dropzone = (props: IProps) =>{
    const [ dragging, setDragging ] = useState(false);
    const [ draggingOver, setDraggingOver ] = useState(false);

    const onDragEnter = useCallback((ev: DragEvent)=>{ 
        if(props.disableDrag) return;
        
        setDragging(true); 
        if(timeout) clearTimeout(timeout)
        timeout = setTimeout(()=>{
            setDragging(false)
        }, 2000);
    }, [ props.disableDrag ])

    useEffect(()=>{
        if(props.dragRef){
            props.dragRef.current?.addEventListener("dragover", onDragEnter, true);

            return ()=>{
                props.dragRef?.current?.removeEventListener("dragover", onDragEnter, true);
            }
        }
    }, [props.dragRef, props.disableDrag]);


    return (
        <div
            className={classNames({ "dropzone": true, [props.className || '']: true })}
            id={props.id}
            {...props.divProps}
            onDrop={async(ev)=>{
                ev.preventDefault();
                let files = ev.dataTransfer.files;
                if(!props.disableDrag){
                    
                    if(props.limits && files){
                        try{
                            if(files[0]){
                                try{
                                    if(props.supportedFormats) checkSupportedFormats(props.supportedFormats, files[0]);
                                    if(props.limits.dimensions){
                                        await checkImageLimits(props.limits, files[0]);
                                    }
                                    else{
                                        await checkFilesLimits(props.limits, files)
                                    }
                                }
                                catch(e){
                                    setDragging(false)
                                    setDraggingOver(false)
                                    return;
                                }
                            }
                        }
                        catch(e){
                            setDragging(false)
                            setDraggingOver(false)
                            toast(<>An error has occured during file upload</>, { type: "error" })
                            return;
                        }
                    }

                    setDragging(false);
                    setDraggingOver(false);
                    props.onDrop(files);
                }
            }}
            onDragOver={(event)=>{
                event.preventDefault();
                if(!props.dragRef) onDragEnter(event);
                setDraggingOver(true);
            }}
            onDragLeave={() => { setDraggingOver(false); }}
            onDragEnd={()=>{ setDraggingOver(false); }}

        >
            <div 
                className={classNames({ 
                    "dropzone-area": true, "dragging": dragging, "dragging-over": draggingOver, 
                    "clickable": props.dropzoneAreaClick && !props.disableDrag,
                    // "warning": props.limits && ,
                    // "good": props.limits &&
                })}
                style={(dragging || props.pointerEvents) ? { pointerEvents: 'all' } : undefined}
                onClick={props.dropzoneAreaClick}
            >
                { typeof props.dropzoneContent === 'function' ? props.dropzoneContent(dragging) : props.dropzoneContent }

            </div>
            {
                props.children
            }
        </div>
    )
}


export type IDropzoneContentProps = {
    children?: ReactNode
    limits?: IDropzoneLimits
    short?: boolean
}
export const DropzonContent = (props: IDropzoneContentProps) =>(
    <div className="dropzone-content">
        <div className="dropzone-content-message">
            { props.children }
        </div>
        {
            props.limits &&
            <div className="dropzone-content-limits">
                {
                    props.limits.dimensions &&
                    <div className="dropzone-content-dimensions">
                        {
                            props.short
                            ? <>
                                Min: { props.limits.dimensions?.width }x{ props.limits.dimensions?.height }
                            </>
                            : <>
                                Minimum dimensions.<br/>
                                Width: { props.limits.dimensions?.width } Height: { props.limits.dimensions?.height }
                            </>
                        }
                    </div>
                }
                {
                    props.limits.size &&
                    <div className="dropzone-content-size">
                        {
                            !props.short && <>Size requirements: </> 
                        } 
                        { 
                            props.limits.size.min && 
                            <div className="dropzone-content-size-requirement">
                                Min: { size(props.limits.size.min) } 
                            </div>
                        }
                        { 
                            props.limits.size.max && 
                            <div className="dropzone-content-size-requirement">
                                Max: { size(props.limits.size.max) } 
                            </div>
                        }
                    </div>
                }
            </div>

        }
    
    </div>
)