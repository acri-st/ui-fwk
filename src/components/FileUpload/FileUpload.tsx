import { ChangeEvent, DragEventHandler, useCallback, useEffect, useRef, useState, DragEvent, HTMLProps } from "react"
import './FileUpload.css';
import { partial } from "filesize";
import classNames from "classnames";
import { confirm, FWKIcons, Logger } from "../../utils";
import { DropzonContent, Dropzone } from "../Dropzone/Dropzone";

const size = partial({ standard: "jedec" });

const logger = new Logger('Components', 'FileUpload');

type IProps = {
    files: File[]
    onChange: (files?: File[])=>any
    disabled?: boolean
    multiple?: boolean
    inputProps?: Partial<HTMLProps<HTMLInputElement>>
}

export const FileUpload = (props: IProps) =>{
    const ref = useRef<HTMLInputElement>(null);
    // const [ files, setFiles ] = useState<File[]>([]);

    const handleAddFiles = useCallback((newFiles: File[])=>{
        try{
            let _files =
                !props.multiple
                ? newFiles.splice(0,1)
                : [ ...props.files, ...newFiles ];
            props.onChange(_files);
        }
        catch(e){
            logger.error("An error has occured during file upload", e)
        }
    }, [ props.files ])

    const removeAll = useCallback(()=>{
        confirm({
            title: 'Remove selected files',
            message: "Are you sure to remove all selected files?",
            onConfirm: ()=>{
                props.onChange([])
            }
        })
    }, [ ])

    
    const onSelectClick = useCallback((e: ChangeEvent<any>)=>{
        e.stopPropagation();
        if(ref.current){
            ref.current.click();
        }
    }, [ ref ])

    
    const onDrop = useCallback((files: FileList)=>{
        logger.info("got files", files)
        handleAddFiles(Array.from(files))
    }, [ props.files ])

    const handleInputChange = useCallback((ev: ChangeEvent<HTMLInputElement> )=>{
        if(!(ev.target.files && ev.target.files.length > 0)) return;
            handleAddFiles(Array.from(ev.target.files));
    }, [ props.files ])

    const removeFile = useCallback((index: number)=>{
        const _files = [...props.files];
        _files.splice(index, 1);
        props.onChange(_files);
    }, [ props.files ])

    return (
        <Dropzone
            disableDrag={props.disabled}
            dropzoneContent={<DropzonContent >DROP FILE(S) HERE</DropzonContent>}
            className="file-upload"
            onDrop={onDrop}
            divProps={{
                onClick: onSelectClick
            }}
            // dragRef={dragRef}
        >
            
            <input 
                ref={ref} className="file-upload-input" type="file"
                onInput={handleInputChange} 
                value={[]} multiple
                disabled={props.disabled}
                {...props.inputProps}
            />
            <div 
                className={classNames({"button themed file-upload-input-button": true, "disabled": props.disabled})}
                onClick={onSelectClick}
            >
                <label>
                    Choose file
                </label>
            </div>
            <div className="upload-file-list">
                {
                    props.files.length > 0
                    ? props.files.map((f,idx)=>(
                        <div className="file-upload-item" key={idx}>
                            <div className="file-upload-item-name-container">
                                <div className="file-upload-item-name" title={f.name}>
                                    { f.name }
                                </div>
                            </div>
                            <div className="file-upload-item-size">
                                { size(f.size) }
                            </div>
                            <div
                                className={classNames({"file-upload-item-remove button red small icon-only inverted operation": true, "disabled": props.disabled })}
                                onClick={(e)=>{ e.stopPropagation(); removeFile(idx); }}
                            >
                                { FWKIcons.delete }
                            </div>
                        </div>
                    ))
                    : <div className="file-upload-no-data">Select or drag and drop file</div>
                }
            </div>
            {
                props.multiple &&
                props.files.length > 0 &&
                <div 
                    className={classNames({"button red inverted file-remove-all-button": true, "disabled": props.disabled})}
                    onClick={removeAll}
                >
                    { FWKIcons.delete } Remove all
                </div>
            }
        </Dropzone>
    )
}