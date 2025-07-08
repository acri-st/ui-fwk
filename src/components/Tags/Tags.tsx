import './Tags.css';
import React, { ReactNode } from 'react';

type IProps = {
    tags: { label: ReactNode, onClick?: () => any }[]
}

const Tags = (props: IProps) => {
    return (
        <div className='tags'>
            {
                props.tags.map((tag, idx) => (
                    <div className='tag' key={idx} onClick={tag.onClick}>
                        { tag.label }
                    </div>
                ))
            }
        </div>
    )
}

export default Tags;